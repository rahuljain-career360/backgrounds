"use client";
import React, { useState, useRef, useCallback } from "react";
import styles from "./ImageEnhancer.module.css";

const QUALITY_PRESETS = [
  { label: "HD (1920×1080)", w: 1920, h: 1080 },
  { label: "2K (2560×1440)", w: 2560, h: 1440 },
  { label: "4K (3840×2160)", w: 3840, h: 2160 },
  { label: "Original Size", w: 0, h: 0 },
] as const;

const FORMATS = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
] as const;

function sharpened(ctx: CanvasRenderingContext2D, w: number, h: number, strength: number = 0.3): void {
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const data = src.data;
  const out = dst.data;
  const kernel = [
    0, -strength, 0,
    -strength, 1 + 4 * strength, -strength,
    0, -strength, 0,
  ];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = (y * w + x) * 4;
      let r = 0, g = 0, b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * w + (x + kx)) * 4;
          const k = kernel[(ky + 1) * 3 + (kx + 1)];
          r += data[idx] * k;
          g += data[idx + 1] * k;
          b += data[idx + 2] * k;
        }
      }
      out[i] = Math.max(0, Math.min(255, r));
      out[i + 1] = Math.max(0, Math.min(255, g));
      out[i + 2] = Math.max(0, Math.min(255, b));
      out[i + 3] = 255;
    }
  }
  ctx.putImageData(dst, 0, 0);
}

function enhanceContrast(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number = 1.1): void {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.max(0, Math.min(255, (d[i] - 128) * amount + 128));
    d[i + 1] = Math.max(0, Math.min(255, (d[i + 1] - 128) * amount + 128));
    d[i + 2] = Math.max(0, Math.min(255, (d[i + 2] - 128) * amount + 128));
  }
  ctx.putImageData(img, 0, 0);
}

function processImage(
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
  format: string
): string {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  let dw = targetW;
  let dh = targetH;
  if (targetW === 0 || targetH === 0) {
    dw = iw;
    dh = ih;
  } else {
    const scale = Math.min(targetW / iw, targetH / ih);
    dw = Math.round(iw * scale);
    dh = Math.round(ih * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = dw;
  canvas.height = dh;
  const ctx = canvas.getContext("2d")!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(img, 0, 0, dw, dh);

  if (dw > 100 && dh > 100) {
    sharpened(ctx, dw, dh, 0.25);
    enhanceContrast(ctx, dw, dh, 1.08);
  }

  switch (format) {
    case "jpeg":
      return canvas.toDataURL("image/jpeg", 0.95);
    case "webp":
      return canvas.toDataURL("image/webp", 0.92);
    default:
      return canvas.toDataURL("image/png");
  }
}

const ImageEnhancer: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{ w: number; h: number } | null>(null);
  const [enhancedSrc, setEnhancedSrc] = useState<string | null>(null);
  const [qualityIdx, setQualityIdx] = useState(2);
  const [format, setFormat] = useState("png");
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setOriginalSrc(src);
      setEnhancedSrc(null);
      setStatus("idle");
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ w: img.naturalWidth, h: img.naturalHeight });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleEnhance = useCallback(() => {
    if (!originalSrc) return;
    setStatus("processing");
    const q = QUALITY_PRESETS[qualityIdx];
    const img = new Image();
    img.onload = () => {
      const dataUrl = processImage(img, q.w, q.h, format);
      setEnhancedSrc(dataUrl);
      setStatus("done");
    };
    img.src = originalSrc;
  }, [originalSrc, qualityIdx, format]);

  const handleDownload = useCallback(() => {
    if (!enhancedSrc) return;
    const q = QUALITY_PRESETS[qualityIdx];
    const label = q.label.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const link = document.createElement("a");
    link.download = `enhanced-${label}.${format}`;
    link.href = enhancedSrc;
    link.click();
  }, [enhancedSrc, qualityIdx, format]);

  const quality = QUALITY_PRESETS[qualityIdx];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Image Enhancer</h1>
        <p className={styles.desc}>Upscale & enhance images to HD, 2K & 4K quality</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {!originalSrc ? (
            <div
              className={`${styles.dropZone} ${dragOver ? styles.dropActive : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                className={styles.hiddenInput}
              />
              <div className={styles.dropIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className={styles.dropText}>Drop an image here or click to browse</p>
              <p className={styles.dropHint}>Supports JPG, PNG, WebP</p>
            </div>
          ) : null}

          {originalSrc && (
            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>Target Quality</label>
                <select
                  className={styles.select}
                  value={qualityIdx}
                  onChange={(e) => setQualityIdx(Number(e.target.value))}
                >
                  {QUALITY_PRESETS.map((q, i) => (
                    <option key={i} value={i}>{q.label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>Format</label>
                <select
                  className={styles.select}
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  {FORMATS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <button
                className={styles.enhanceBtn}
                onClick={handleEnhance}
                disabled={status === "processing"}
              >
                {status === "processing" ? (
                  <>⏳ Processing...</>
                ) : (
                  <>✨ Enhance Image</>
                )}
              </button>

              {enhancedSrc && (
                <button className={styles.downloadBtn} onClick={handleDownload}>
                  ↓ Download {format.toUpperCase()}
                </button>
              )}

              <button
                className={styles.resetBtn}
                onClick={() => {
                  setOriginalSrc(null);
                  setOriginalSize(null);
                  setEnhancedSrc(null);
                  setStatus("idle");
                }}
              >
                × Choose Another Image
              </button>
            </div>
          )}
        </div>

        <div className={styles.main}>
          <div className={styles.panels}>
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Original</span>
                {originalSize && (
                  <span className={styles.panelSize}>{originalSize.w} × {originalSize.h}</span>
                )}
              </div>
              <div className={styles.panelBody}>
                {originalSrc ? (
                  <img src={originalSrc} alt="Original" className={styles.previewImg} />
                ) : (
                  <div className={styles.placeholder}>No image selected</div>
                )}
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Enhanced</span>
                {enhancedSrc && quality.w > 0 && (
                  <span className={styles.panelSize}>{quality.w} × {quality.h}</span>
                )}
              </div>
              <div className={styles.panelBody}>
                {enhancedSrc ? (
                  <img src={enhancedSrc} alt="Enhanced" className={styles.previewImg} />
                ) : originalSrc ? (
                  <div className={styles.placeholder}>Click "Enhance Image" to process</div>
                ) : (
                  <div className={styles.placeholder}>Upload an image to get started</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancer;
