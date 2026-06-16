"use client"
import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import styles from './VideoExporter.module.css';

const QUALITIES = [
  { label: 'HD (720p)', w: 1280, h: 720, suffix: 'hd', bitrate: '5M', crf: '22' },
  { label: 'FHD (1080p)', w: 1920, h: 1080, suffix: 'fhd', bitrate: '12M', crf: '20' },
  { label: '2K (1440p)', w: 2560, h: 1440, suffix: '2k', bitrate: '25M', crf: '18' },
  { label: '4K (2160p)', w: 3840, h: 2160, suffix: '4k', bitrate: '50M', crf: '17' },
];

const FORMATS = [
  { value: 'mp4', label: 'MP4', codec: 'libx264', ext: 'mp4' },
  { value: 'webm', label: 'WebM', codec: 'libvpx-vp9', ext: 'webm' },
  { value: 'mov', label: 'MOV', codec: 'libx264', ext: 'mov' },
  { value: 'avi', label: 'AVI', codec: 'libx264', ext: 'avi' },
];

const VideoExporter: React.FC = () => {
  const [ffLoadState, setFfLoadState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [outputUrl, setOutputUrl] = useState<string>('');
  const [inputName, setInputName] = useState('');
  const [qualityIdx, setQualityIdx] = useState(3);
  const [formatIdx, setFormatIdx] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const inputRef = useRef<HTMLInputElement>(null);

  const quality = QUALITIES[qualityIdx];
  const fmt = FORMATS[formatIdx];

  const loadFFmpeg = async () => {
    setFfLoadState('loading');
    setStatus('Loading FFmpeg engine...');
    try {
      const base = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ff = ffmpegRef.current;

      ff.on('progress', ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });

      await ff.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setFfLoadState('ready');
      setStatus('Ready — drop a video to start');
    } catch {
      setFfLoadState('error');
      setStatus('Failed to load FFmpeg');
    }
  };

  const processFile = async (file: File) => {
    if (ffLoadState !== 'ready' || processing) return;
    setProcessing(true);
    setProgress(0);
    setOutputUrl('');
    setInputName(file.name);
    setStatus('Reading file...');

    try {
      const ff = ffmpegRef.current;
      const inExt = file.name.split('.').pop() || 'mp4';
      const inName = `input.${inExt}`;
      const outName = `output.${fmt.ext}`;

      await ff.writeFile(inName, await fetchFile(file));

      setStatus(`Converting to ${quality.label} ${fmt.label.toUpperCase()}...`);

      const scaleFilter = `scale=${quality.w}:${quality.h}:force_original_aspect_ratio=decrease,pad=${quality.w}:${quality.h}:(ow-iw)/2:(oh-ih)/2,setsar=1`;

      const args = [
        '-i', inName,
        '-vf', scaleFilter,
        '-c:v', fmt.codec,
        '-crf', quality.crf,
        '-preset', 'slow',
        '-b:v', quality.bitrate,
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        outName,
      ];

      await ff.exec(args);

      const data = await ff.readFile(outName);
      const blob = new Blob([(data as any).buffer], { type: `video/${fmt.ext}` });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setStatus('Conversion complete!');
      setProgress(100);

      await ff.deleteFile(inName);
      await ff.deleteFile(outName);
    } catch (err) {
      console.error(err);
      setStatus('Conversion failed');
    }
    setProcessing(false);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setStatus('Please select a video file');
      return;
    }
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClickUpload = () => inputRef.current?.click();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Video Exporter</h1>
          <p className={styles.sub}>Upscale & convert to any quality</p>
        </div>

        {ffLoadState === 'idle' && (
          <button className={styles.loadBtn} onClick={loadFFmpeg}>
            Initialize Engine
          </button>
        )}

        {ffLoadState === 'loading' && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <span>{status}</span>
          </div>
        )}

        {ffLoadState === 'ready' && (
          <>
            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <label className={styles.ctrlLabel}>Quality</label>
                <select
                  className={styles.select}
                  value={qualityIdx}
                  onChange={(e) => setQualityIdx(Number(e.target.value))}
                  disabled={processing}
                >
                  {QUALITIES.map((q, i) => (
                    <option key={q.suffix} value={i}>{q.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.controlGroup}>
                <label className={styles.ctrlLabel}>Format</label>
                <select
                  className={styles.select}
                  value={formatIdx}
                  onChange={(e) => setFormatIdx(Number(e.target.value))}
                  disabled={processing}
                >
                  {FORMATS.map((f, i) => (
                    <option key={f.value} value={i}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''} ${processing ? styles.disabled : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={processing ? undefined : handleClickUpload}
            >
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleInput}
                style={{ display: 'none' }}
              />
              <span className={styles.dropIcon}>
                {processing ? '⏳' : '🎬'}
              </span>
              <span className={styles.dropText}>
                {processing ? 'Processing...' : dragOver ? 'Drop it!' : 'Drop video or click to browse'}
              </span>
              {inputName && <span className={styles.fileName}>{inputName}</span>}
            </div>

            <div className={styles.statusBar}>
              <span className={`${styles.statusText} ${processing ? '' : styles.statusIdle}`}>
                {status}
              </span>
              {(ffLoadState === 'ready' && !processing && !outputUrl) && (
                <span className={styles.qualityHint}>
                  {quality.label} · {fmt.label.toUpperCase()}
                </span>
              )}
            </div>

            {processing && (
              <div className={styles.progressWrap}>
                <div className={styles.progressBg}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <span className={styles.progressPct}>{progress}%</span>
              </div>
            )}

            {outputUrl && !processing && (
              <div className={styles.output}>
                <video src={outputUrl} controls className={styles.preview} />
                <div className={styles.outputInfo}>
                  <span className={styles.outputLabel}>
                    {quality.label} · {fmt.label.toUpperCase()}
                  </span>
                  <div className={styles.outputActions}>
                    <a
                      href={outputUrl}
                      download={`converted-${quality.suffix}.${fmt.ext}`}
                      className={styles.downloadBtn}
                    >
                      ↓ Download
                    </a>
                    <button
                      className={styles.resetBtn}
                      onClick={() => { setOutputUrl(''); setInputName(''); setStatus('Ready'); }}
                    >
                      Convert Another
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {ffLoadState === 'error' && (
          <div className={styles.errorState}>
            <span>Engine failed to load. Check connection and try again.</span>
            <button className={styles.loadBtn} onClick={loadFFmpeg}>Retry</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoExporter;
