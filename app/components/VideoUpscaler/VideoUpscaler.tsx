"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import styles from './VideoUpscaler.module.css'
import { Lang, translate as _t } from './i18n'

const QUALITIES = [
  { labelKey: 'quality720' as const, w: 1280, h: 720, suffix: 'hd' },
  { labelKey: 'quality1080' as const, w: 1920, h: 1080, suffix: 'fhd' },
  { labelKey: 'quality1440' as const, w: 2560, h: 1440, suffix: '2k' },
  { labelKey: 'quality2160' as const, w: 3840, h: 2160, suffix: '4k' },
]

const FORMATS = [
  { value: 'mp4', labelKey: 'formatMp4' as const, codec: 'libx264', ext: 'mp4', mime: 'video/mp4' },
  { value: 'webm', labelKey: 'formatWebm' as const, codec: 'libvpx-vp9', ext: 'webm', mime: 'video/webm' },
  { value: 'mov', labelKey: 'formatMov' as const, codec: 'libx264', ext: 'mov', mime: 'video/quicktime' },
  { value: 'avi', labelKey: 'formatAvi' as const, codec: 'libx264', ext: 'avi', mime: 'video/x-msvideo' },
]

const AUDIO_FORMATS = [
  { value: 'mp3', labelKey: 'audioMp3' as const, codec: 'libmp3lame', ext: 'mp3', mime: 'audio/mpeg' },
  { value: 'wav', labelKey: 'audioWav' as const, codec: 'pcm_s16le', ext: 'wav', mime: 'audio/wav' },
]

const AUDIO_BITRATES = [
  { labelKey: 'bitrate128' as const, value: '128k' },
  { labelKey: 'bitrate192' as const, value: '192k' },
  { labelKey: 'bitrate320' as const, value: '320k' },
]

const FORMAT_ALL_INDEX = 0

interface VideoMeta {
  w: number
  h: number
  duration: number
  durStr: string
}

interface VideoEntry {
  id: string
  file: File
  name: string
  url: string
  meta: VideoMeta | null
  targetQualityIdx: number
  enhancement: number
  selectedFormats: boolean[]
  trimStart: number
  trimEnd: number
  extractAudio: boolean
  audioFormatIdx: number
  audioBitrateIdx: number
  outputs: OutputEntry[]
  status: 'pending' | 'processing' | 'done' | 'error'
  progress: number
  errorMsg: string
}

interface OutputEntry {
  fmt: string
  qualitySuffix: string
  url: string
  blob: Blob | null
  label: string
  done: boolean
  error: string
}

interface Job {
  videoId: string
  formatIdx: number
  formatVal: string
  qualityIdx: number
  isAudio: boolean
  audioFormatIdx: number
  audioBitrateIdx: number
}

let idCounter = 0
function uid() { return `v${++idCounter}_${Date.now()}` }

function formatDuration(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function getScaleFilter(w: number, h: number, enhance: number): string {
  const parts: string[] = []
  if (enhance >= 2) {
    parts.push(`hqdn3d=${enhance === 2 ? '1.5:1.5:2:2' : '2:2:3:3'}`)
  } else if (enhance === 1) {
    parts.push(`hqdn3d=1:1:1.5:1.5`)
  }
  parts.push(`scale=${w}:${h}:flags=lanczos:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`)
  const sharp = enhance === 0 ? '1:0.5:0.5:0.3:0.5:0.3'
    : enhance === 1 ? '1.2:1:0.5:0.5:0.5:0.5'
    : '1.8:1.5:0.5:0.5:0.5:0.5'
  parts.push(`unsharp=${sharp}`)
  if (enhance >= 2) {
    parts.push('eq=brightness=0.03:saturation=1.08:contrast=1.03')
  } else if (enhance >= 1) {
    parts.push('eq=saturation=1.05:contrast=1.02')
  }
  return parts.join(',')
}

function getVideoMeta(url: string): Promise<VideoMeta> {
  return new Promise((resolve, reject) => {
    const v = document.createElement('video')
    v.preload = 'metadata'
    v.onloadedmetadata = () => {
      const w = v.videoWidth, h = v.videoHeight, duration = v.duration
      v.remove()
      resolve({ w, h, duration, durStr: formatDuration(duration) })
    }
    v.onerror = () => { v.remove(); reject(new Error('Failed to load metadata')) }
    v.src = url
  })
}

const VideoUpscaler: React.FC = () => {
  const [lang, setLang] = useState<Lang>('hi')
  const tr = useCallback((key: Parameters<typeof _t>[1], vars?: Record<string, string | number>) => _t(lang, key, vars), [lang])

  const [ffState, setFfState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [videos, setVideos] = useState<VideoEntry[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [statusText, setStatusText] = useState('')
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentJob, setCurrentJob] = useState<{ video: string; fmt: string } | null>(null)

  const ffRef = useRef(new FFmpeg())
  const inputRef = useRef<HTMLInputElement>(null)
  const queueRef = useRef<Job[]>([])
  const cancelledRef = useRef(false)
  const processingRef = useRef(false)

  const loadFF = useCallback(async () => {
    setFfState('loading')
    setStatusText(tr('loadingEngine'))
    try {
      const base = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      const ff = ffRef.current
      ff.on('progress', ({ progress: p }) => {
        setOverallProgress(Math.round(p * 100))
      })
      await ff.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, 'application/wasm'),
      })
      setFfState('ready')
      setStatusText(tr('engineReady'))
    } catch {
      setFfState('error')
      setStatusText(tr('engineError'))
    }
  }, [tr])

  const removeVideo = useCallback((id: string) => {
    setVideos(prev => {
      const entry = prev.find(v => v.id === id)
      if (entry) URL.revokeObjectURL(entry.url)
      return prev.filter(v => v.id !== id)
    })
  }, [])

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('video/'))
    if (arr.length === 0) return

    const newEntries: VideoEntry[] = []

    for (const file of arr) {
      const url = URL.createObjectURL(file)
      let meta: VideoMeta | null = null
      try {
        meta = await getVideoMeta(url)
      } catch { /* ignore */ }

      const qualityIdx = meta ? (meta.h < 720 ? 1 : meta.h < 1080 ? 0 : 0) : 1
      const dur = meta?.duration ?? 0

      newEntries.push({
        id: uid(),
        file,
        name: file.name,
        url,
        meta,
        targetQualityIdx: qualityIdx,
        enhancement: meta && meta.h < 720 ? 2 : 1,
        selectedFormats: FORMATS.map((_, i) => i === 0),
        trimStart: 0,
        trimEnd: dur,
        extractAudio: false,
        audioFormatIdx: 0,
        audioBitrateIdx: 1,
        outputs: [],
        status: 'pending',
        progress: 0,
        errorMsg: '',
      })
    }

    setVideos(prev => [...prev, ...newEntries])
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(e.target.files)
      e.target.value = ''
    }
  }, [addFiles])

  const updateVideo = useCallback((id: string, upd: Partial<VideoEntry>) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...upd } : v))
  }, [])

  const processQueue = useCallback(async () => {
    const ff = ffRef.current
    const jobs = queueRef.current
    if (jobs.length === 0) return

    cancelledRef.current = false
    processingRef.current = true
    setProcessing(true)
    setOverallProgress(0)

    const total = jobs.length
    let done = 0

    for (let i = 0; i < jobs.length; i++) {
      if (cancelledRef.current) break
      const job = jobs[i]
      const video = videos.find(v => v.id === job.videoId)
      if (!video) { done++; continue }

      const fmtLabel = job.isAudio
        ? tr(AUDIO_FORMATS[job.formatIdx].labelKey)
        : tr(FORMATS.find(f => f.value === job.formatVal)!.labelKey)
      setCurrentJob({ video: video.name, fmt: fmtLabel })

      updateVideo(job.videoId, { status: 'processing' })

      try {
        const inExt = video.file.name.split('.').pop() || 'mp4'
        const inName = `input_${job.videoId}.${inExt}`

        await ff.writeFile(inName, await fetchFile(video.file))

        if (job.isAudio) {
          const af = AUDIO_FORMATS[job.audioFormatIdx]
          const br = AUDIO_BITRATES[job.audioBitrateIdx]
          const outName = `audio_${job.videoId}.${af.ext}`
          const args = ['-i', inName, '-vn', '-acodec', af.codec, '-ab', br.value, outName]

          if (video.trimEnd > 0) {
            args.splice(1, 0, '-ss', String(video.trimStart), '-to', String(video.trimEnd))
          }

          await ff.exec(args)
          const data = await ff.readFile(outName)
          const blob = new Blob([(data as any).buffer], { type: af.mime })
          const url = URL.createObjectURL(blob)

          setVideos(prev => prev.map(v => {
            if (v.id !== job.videoId) return v
            return {
              ...v,
              outputs: [...v.outputs, { fmt: af.value, qualitySuffix: 'audio', url, blob, label: `Audio (${af.value.toUpperCase()})`, done: true, error: '' }],
              status: 'done',
            }
          }))

          await ff.deleteFile(outName)
        } else {
          const fmt = FORMATS.find(f => f.value === job.formatVal)!
          const qual = QUALITIES[job.qualityIdx]
          const outName = `out_${job.videoId}_${fmt.ext}`

          const vf = getScaleFilter(qual.w, qual.h, video.enhancement)
          const args = [
            '-i', inName,
            '-vf', vf,
            '-c:v', fmt.codec,
            '-crf', '17',
            '-preset', 'medium',
            '-b:v', `${Math.round(qual.w * qual.h * 0.004)}k`,
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            outName,
          ]

          if (video.trimEnd > 0) {
            args.splice(1, 0, '-ss', String(video.trimStart), '-to', String(video.trimEnd))
          }

          await ff.exec(args)
          const data = await ff.readFile(outName)
          const blob = new Blob([(data as any).buffer], { type: fmt.mime })
          const url = URL.createObjectURL(blob)

          setVideos(prev => prev.map(v => {
            if (v.id !== job.videoId) return v
            return {
              ...v,
              outputs: [...v.outputs, { fmt: fmt.value, qualitySuffix: qual.suffix, url, blob, label: `${qual.labelKey} (${fmt.value.toUpperCase()})`, done: true, error: '' }],
              status: 'done',
              progress: 100,
            }
          }))

          await ff.deleteFile(outName)
        }

        await ff.deleteFile(inName)
      } catch (err) {
        console.error(err)
        setVideos(prev => prev.map(v => {
          if (v.id !== job.videoId) return v
          return { ...v, status: 'error', errorMsg: String(err) }
        }))
      }

      done++
      updateVideo(job.videoId, { progress: Math.round((done / total) * 100) })
    }

    setCurrentJob(null)
    setProcessing(false)
    processingRef.current = false
    setOverallProgress(100)

    if (!cancelledRef.current) {
      setStatusText(tr('complete'))
    }
  }, [videos, updateVideo, tr])

  const startProcessing = useCallback(() => {
    if (ffState !== 'ready' || processing) return

    const jobs: Job[] = []

    for (const video of videos) {
      if (video.status === 'done' || video.status === 'processing') continue

      video.selectedFormats.forEach((sel, i) => {
        if (sel) {
          jobs.push({
            videoId: video.id,
            formatIdx: i,
            formatVal: FORMATS[i].value,
            qualityIdx: video.targetQualityIdx,
            isAudio: false,
            audioFormatIdx: 0,
            audioBitrateIdx: 1,
          })
        }
      })

      if (video.extractAudio) {
        jobs.push({
          videoId: video.id,
          formatIdx: video.audioFormatIdx,
          formatVal: AUDIO_FORMATS[video.audioFormatIdx].value,
          qualityIdx: video.targetQualityIdx,
          isAudio: true,
          audioFormatIdx: video.audioFormatIdx,
          audioBitrateIdx: video.audioBitrateIdx,
        })
      }
    }

    if (jobs.length === 0) return

    setVideos(prev => prev.map(v => ({
      ...v,
      outputs: [],
      status: 'pending',
      progress: 0,
      errorMsg: '',
    })))

    queueRef.current = jobs
    setStatusText(`${tr('processingQueue', { done: 0, total: jobs.length })}`)

    processQueue()
  }, [ffState, processing, videos, tr, processQueue])

  const cancelProcessing = useCallback(() => {
    cancelledRef.current = true
  }, [])

  useEffect(() => {
    if (processing && !processingRef.current) {
      processQueue()
    }
  }, [processing, processQueue])

  const allDone = videos.length > 0 && videos.every(v => v.status === 'done' || v.status === 'error')
  const hasPending = videos.some(v => v.status === 'pending' || v.status === 'processing')
  const totalOutputs = videos.reduce((sum, v) => sum + v.outputs.filter(o => o.done).length, 0)

  const downloadFile = (url: string, name: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
  }

  const downloadAll = () => {
    videos.forEach(v => {
      v.outputs.forEach(o => {
        if (o.done) {
          downloadFile(o.url, `${v.name.replace(/\.[^.]+$/, '')}_${o.qualitySuffix}.${o.fmt}`)
        }
      })
    })
  }

  const toggleFormatAll = (value: boolean) => {
    setVideos(prev => prev.map(v => ({
      ...v,
      selectedFormats: v.selectedFormats.map(() => value),
    })))
  }

  return (
    <div className={styles.page}>
      <div className={styles.langToggle}>
        <button
          className={`${styles.langBtn} ${lang === 'hi' ? styles.langActive : ''}`}
          onClick={() => setLang('hi')}
        >हिंदी</button>
        <button
          className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
          onClick={() => setLang('en')}
        >EN</button>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>🎬</div>
          <h1 className={styles.title}>{tr('title')}</h1>
          <p className={styles.subtitle}>{tr('subtitle')}</p>
        </div>

        {/* Engine Load */}
        {ffState === 'idle' && (
          <div className={styles.engineSection}>
            <button className={styles.primaryBtn} onClick={loadFF}>
              {tr('loadEngine')}
            </button>
          </div>
        )}

        {ffState === 'loading' && (
          <div className={styles.engineSection}>
            <div className={styles.spinner} />
            <span className={styles.statusText}>{statusText}</span>
          </div>
        )}

        {ffState === 'error' && (
          <div className={styles.engineSection}>
            <span className={styles.errorText}>{tr('engineError')}</span>
            <button className={styles.primaryBtn} onClick={loadFF}>{tr('retry')}</button>
          </div>
        )}

        {/* Main UI */}
        {ffState === 'ready' && (
          <>
            {/* Upload Zone */}
            <div
              className={`${styles.dropZone} ${dragOver ? styles.dropActive : ''} ${processing ? styles.disabled : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !processing && inputRef.current?.click()}
            >
              <input ref={inputRef} type="file" multiple accept="video/*" onChange={handleInput} style={{ display: 'none' }} />
              <div className={styles.dropIcon}>
                {dragOver ? '📥' : '📁'}
              </div>
              <div className={styles.dropText}>
                {dragOver ? tr('dropActive') : tr('dropHere')}
              </div>
            </div>

            {/* Videos */}
            {videos.length > 0 && (
              <div className={styles.videoList}>
                {videos.map((video) => (
                  <div key={video.id} className={`${styles.videoCard} ${video.status === 'error' ? styles.cardError : ''}`}>
                    {/* Video Header */}
                    <div className={styles.cardHeader}>
                      <div className={styles.cardTitleRow}>
                        <span className={styles.videoName}>{video.name}</span>
                        <div className={styles.cardActions}>
                          {!processing && (
                            <button
                              className={styles.iconBtn}
                              onClick={() => removeVideo(video.id)}
                              title={tr('remove')}
                            >✕</button>
                          )}
                        </div>
                      </div>
                      {video.meta && (
                        <span className={styles.videoMeta}>
                          {tr('videoInfo', { w: video.meta.w, h: video.meta.h, dur: video.meta.durStr })}
                        </span>
                      )}
                    </div>

                    {/* Settings */}
                    <div className={styles.cardBody}>
                      {/* Quality */}
                      <div className={styles.settingRow}>
                        <label className={styles.settingLabel}>{tr('targetQuality')}</label>
                        <div className={styles.qualityChips}>
                          {QUALITIES.map((q, i) => (
                            <button
                              key={q.suffix}
                              className={`${styles.chip} ${video.targetQualityIdx === i ? styles.chipActive : ''}`}
                              onClick={() => !processing && updateVideo(video.id, { targetQualityIdx: i })}
                              disabled={processing}
                            >{tr(q.labelKey)}</button>
                          ))}
                        </div>
                      </div>

                      {/* Enhancement */}
                      <div className={styles.settingRow}>
                        <label className={styles.settingLabel}>{tr('enhancementMode')}</label>
                        <div className={styles.qualityChips}>
                          {[tr('lightEnhance'), tr('mediumEnhance'), tr('aggressiveEnhance')].map((label, i) => (
                            <button
                              key={i}
                              className={`${styles.chip} ${video.enhancement === i ? styles.chipActive : ''}`}
                              onClick={() => !processing && updateVideo(video.id, { enhancement: i })}
                              disabled={processing}
                            >{label}</button>
                          ))}
                        </div>
                      </div>

                      {/* Formats */}
                      <div className={styles.settingRow}>
                        <label className={styles.settingLabel}>{tr('formats')}</label>
                        <div className={styles.formatGrid}>
                          {FORMATS.map((f, i) => (
                            <label key={f.value} className={styles.checkLabel}>
                              <input
                                type="checkbox"
                                checked={video.selectedFormats[i] ?? false}
                                onChange={() => {
                                  const copy = [...video.selectedFormats]
                                  copy[i] = !copy[i]
                                  updateVideo(video.id, { selectedFormats: copy })
                                }}
                                disabled={processing}
                                className={styles.checkbox}
                              />
                              <span className={styles.checkText}>{tr(f.labelKey)}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Trim */}
                      <div className={styles.settingRow}>
                        <label className={styles.settingLabel}>
                          {tr('trim')}
                          {video.trimEnd > 0 && (
                            <span className={styles.trimInfo}>
                              {formatDuration(video.trimStart)} — {formatDuration(video.trimEnd)}
                            </span>
                          )}
                        </label>
                        <div className={styles.trimRow}>
                          <span className={styles.trimTime}>{formatDuration(video.trimStart)}</span>
                          <div className={styles.trimSliders}>
                            <input
                              type="range"
                              min={0}
                              max={video.meta?.duration || 300}
                              step={0.5}
                              value={video.trimStart}
                              onChange={(e) => {
                                const val = Math.min(Number(e.target.value), video.trimEnd - 1)
                                updateVideo(video.id, { trimStart: val })
                              }}
                              disabled={processing || !video.meta}
                              className={styles.trimSlider}
                            />
                            <input
                              type="range"
                              min={0}
                              max={video.meta?.duration || 300}
                              step={0.5}
                              value={video.trimEnd}
                              onChange={(e) => {
                                const val = Math.max(Number(e.target.value), video.trimStart + 1)
                                updateVideo(video.id, { trimEnd: val })
                              }}
                              disabled={processing || !video.meta}
                              className={styles.trimSlider}
                            />
                          </div>
                          <span className={styles.trimTime}>{formatDuration(video.trimEnd)}</span>
                        </div>
                      </div>

                      {/* Audio Extract */}
                      <div className={styles.settingRow}>
                        <label className={styles.settingLabel}>
                          <label className={styles.checkLabel}>
                            <input
                              type="checkbox"
                              checked={video.extractAudio}
                              onChange={() => updateVideo(video.id, { extractAudio: !video.extractAudio })}
                              disabled={processing}
                              className={styles.checkbox}
                            />
                            <span className={styles.checkText}>{tr('extractAudio')}</span>
                          </label>
                        </label>
                        {video.extractAudio && (
                          <div className={styles.audioRow}>
                            <select
                              className={styles.select}
                              value={video.audioFormatIdx}
                              onChange={(e) => updateVideo(video.id, { audioFormatIdx: Number(e.target.value) })}
                              disabled={processing}
                            >
                              {AUDIO_FORMATS.map((af, i) => (
                                <option key={af.value} value={i}>{tr(af.labelKey)}</option>
                              ))}
                            </select>
                            <select
                              className={styles.select}
                              value={video.audioBitrateIdx}
                              onChange={(e) => updateVideo(video.id, { audioBitrateIdx: Number(e.target.value) })}
                              disabled={processing}
                            >
                              {AUDIO_BITRATES.map((br, i) => (
                                <option key={br.value} value={i}>{tr(br.labelKey)}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Error */}
                    {video.status === 'error' && (
                      <div className={styles.videoError}>{tr('error', { msg: video.errorMsg })}</div>
                    )}

                    {/* Outputs */}
                    {video.outputs.filter(o => o.done).length > 0 && (
                      <div className={styles.outputs}>
                        {video.outputs.filter(o => o.done).map((out, i) => (
                          <button
                            key={i}
                            className={styles.downloadBtn}
                            onClick={() => downloadFile(out.url, `${video.name.replace(/\.[^.]+$/, '')}_${out.qualitySuffix}.${out.fmt}`)}
                          >
                            ↓ {tr('download')} {out.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Processing indicator */}
                    {video.status === 'processing' && (
                      <div className={styles.processingBadge}>
                        <span className={styles.miniSpinner} />
                        {tr('processing')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {videos.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🎥</div>
                <div className={styles.emptyText}>{tr('noVideos')}</div>
                <div className={styles.emptyHint}>{tr('noVideosHint')}</div>
              </div>
            )}

            {/* Overall status */}
            {(processing || statusText) && (
              <div className={styles.globalStatus}>
                {processing && (
                  <>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${overallProgress}%` }} />
                    </div>
                    <div className={styles.progressInfo}>
                      {currentJob && (
                        <span className={styles.progressJob}>
                          {tr('progressFormat', { video: currentJob.video, format: currentJob.fmt, pct: overallProgress })}
                        </span>
                      )}
                    </div>
                  </>
                )}
                {!processing && statusText && (
                  <span className={styles.statusDone}>{statusText}</span>
                )}
              </div>
            )}

            {/* Action buttons */}
            {videos.length > 0 && (
              <div className={styles.actions}>
                {!processing && (
                  <button
                    className={styles.primaryBtn}
                    onClick={startProcessing}
                    disabled={!hasPending || processing}
                  >
                    ▸ {tr('process')} ({videos.filter(v => v.status === 'pending').length} videos)
                  </button>
                )}
                {processing && (
                  <button className={styles.secondaryBtn} onClick={cancelProcessing}>
                    ■ {tr('cancel')}
                  </button>
                )}
                {totalOutputs > 0 && !processing && (
                  <button className={styles.downloadAllBtn} onClick={downloadAll}>
                    ↓ {tr('downloadAllDone', { n: totalOutputs })}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default VideoUpscaler
