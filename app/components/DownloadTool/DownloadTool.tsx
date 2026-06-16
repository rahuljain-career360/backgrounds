"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import styles from "./DownloadTool.module.css";

const SIZES = [
  { label: "HD (1920×1080)", w: 1920, h: 1080, suffix: "hd" },
  { label: "2K (2560×1440)", w: 2560, h: 1440, suffix: "2k" },
  { label: "4K (3840×2160)", w: 3840, h: 2160, suffix: "4k" },
  { label: "8K (7680×4320)", w: 7680, h: 4320, suffix: "8k" },
];

const FORMATS = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
];

interface Props {
  children: React.ReactNode;
  fileName?: string;
}

const DownloadTool: React.FC<Props> = ({ children, fileName = "background" }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState("png");
  const [sizeIdx, setSizeIdx] = useState(2);
  const [status, setStatus] = useState<"idle" | "rendering" | "done">("idle");
  const [vp, setVp] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    const h = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const size = SIZES[sizeIdx];

  const capture = useCallback(async () => {
    if (!viewerRef.current) return;
    setStatus("rendering");
    try {
      const pr = Math.ceil(size.w / vp.w);

      let dataUrl: string;
      switch (format) {
        case "jpeg":
          dataUrl = await htmlToImage.toJpeg(viewerRef.current, {
            width: vp.w, height: vp.h,
            pixelRatio: pr, quality: 0.95,
            backgroundColor: "#000000",
          });
          break;
        case "webp": {
          const png = await htmlToImage.toPng(viewerRef.current, {
            width: vp.w, height: vp.h,
            pixelRatio: pr,
            backgroundColor: "#000000",
          });
          const c = document.createElement("canvas");
          c.width = size.w; c.height = size.h;
          const ctx = c.getContext("2d");
          if (ctx) {
            const img = new Image();
            await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = png; });
            ctx.drawImage(img, 0, 0, size.w, size.h);
            dataUrl = c.toDataURL("image/webp", 0.92);
          } else { dataUrl = png; }
          break;
        }
        default:
          dataUrl = await htmlToImage.toPng(viewerRef.current, {
            width: vp.w, height: vp.h,
            pixelRatio: pr,
            backgroundColor: "#000000",
          });
      }

      const link = document.createElement("a");
      link.download = `${fileName}-${size.suffix}.${format}`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Capture failed:", err);
      setStatus("idle");
    }
  }, [format, sizeIdx, size, vp, fileName]);

  return (
    <div className={styles.wrapper}>
      <div ref={viewerRef} className={styles.viewer}>
        {children}
      </div>

      <div className={styles.bar}>
        <div className={styles.barInner}>
          <div className={styles.control}>
            <label className={styles.label}>Format</label>
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

          <div className={styles.control}>
            <label className={styles.label}>Resolution</label>
            <select
              className={styles.select}
              value={sizeIdx}
              onChange={(e) => setSizeIdx(Number(e.target.value))}
            >
              {SIZES.map((s, i) => (
                <option key={s.suffix} value={i}>{s.label}</option>
              ))}
            </select>
          </div>

          <button
            className={`${styles.downloadBtn} ${status === "rendering" ? styles.loading : ""}`}
            onClick={capture}
            disabled={status === "rendering"}
          >
            {status === "rendering" ? "⏳" : status === "done" ? "✓" : "↓"}{" "}
            {status === "rendering" ? "Rendering..." : status === "done" ? "Downloaded!" : `Download ${format.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadTool;
