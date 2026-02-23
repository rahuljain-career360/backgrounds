"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const VideoConverter: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    setStatus('Loading FFmpeg Engines...');
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;

    // Listen for progress events
    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    // Listen for log messages (optional but helpful for debugging)
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
      if (message.includes('error')) setStatus('Error in processing');
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
    setStatus('Ready to Upscale');
  };

  const processVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setStatus('Analyzing Video...');
    const ffmpeg = ffmpegRef.current;
    
    await ffmpeg.writeFile('input.mp4', await fetchFile(file));

    setStatus('Rendering 4K Output (M4 Powered)...');
    
    // Command optimized for 4K quality
    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-vf', 'scale=3840:2160:force_original_aspect_ratio=decrease,pad=3840:2160:(ow-iw)/2:(oh-ih)/2',
      '-c:v', 'libx264', 
      '-crf', '18', 
      '-preset', 'ultrafast', // High speed for testing; use 'medium' for better quality
     '-pix_fmt', 'yuv420p', // Standard for high compatibility 4K
        '-b:v', '50M',       // Target 50Mbps bitrate (true 4K standard)
      'output.mp4'
    ]);

    const data = await ffmpeg.readFile('output.mp4');
    const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
    
    setVideoUrl(url);
    setProcessing(false);
    setStatus('4K Processing Complete!');
    setProgress(100);
  };

  return (
    <div className="converter-card">
      <h2 className="title">M4 Video Upscaler</h2>
      <p className="status-text">{status}</p>

      {!loaded ? (
        <button className="main-button" onClick={load}>
          Start Media Engine
        </button>
      ) : (
        <div className="upload-section">
          <input 
            type="file" 
            id="file-upload" 
            accept="video/*" 
            onChange={processVideo} 
            disabled={processing}
          />
          <label htmlFor="file-upload" className={`upload-label ${processing ? 'disabled' : ''}`}>
            {processing ? 'Processing...' : 'Choose Video for 4K Export'}
          </label>

          {processing && (
            <div className="progress-container">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="percentage">{progress}%</span>
            </div>
          )}

          {videoUrl && !processing && (
            <div className="preview-container">
              <video src={videoUrl} controls className="video-preview" />
              <a href={videoUrl} download="m4_upscaled_4k.mp4" className="download-btn">
                Download 4K Master
              </a>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .converter-card {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .title { font-weight: 600; letter-spacing: -0.5px; margin-bottom: 5px; }
        .status-text { font-size: 14px; color: #aaa; margin-bottom: 25px; }
        
        .main-button, .upload-label, .download-btn {
          background: #fff;
          color: #000;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .main-button:hover, .upload-label:hover { transform: scale(1.02); background: #f0f0f0; }
        
        .upload-section input { display: none; }
        .upload-label.disabled { opacity: 0.5; cursor: not-allowed; }

        .progress-container { margin-top: 30px; width: 100%; }
        .progress-bar-bg {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #007AFF, #00C7FF);
          transition: width 0.3s ease;
        }
        .percentage { font-size: 18px; font-weight: bold; }

        .preview-container { margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
        .video-preview { width: 100%; border-radius: 12px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1); }
        .download-btn { background: #32D74B; color: white; text-decoration: none; width: 100%; box-sizing: border-box; text-align: center; }
      `}</style>
    </div>
  );
};

export default VideoConverter;