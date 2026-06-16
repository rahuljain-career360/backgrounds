"use client";
import React, { useState, useRef, useCallback } from "react";
import styles from "./ColorMaker.module.css";

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

const GRADIENT_TYPES = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
  { value: "conic", label: "Conic" },
];

const DIRECTIONS = [
  { value: "to right", label: "→" },
  { value: "to left", label: "←" },
  { value: "to bottom", label: "↓" },
  { value: "to top", label: "↑" },
  { value: "to bottom right", label: "↘" },
  { value: "to bottom left", label: "↙" },
  { value: "to top right", label: "↗" },
  { value: "to top left", label: "↖" },
];

const PRESETS = [
  { colors: ["#ff006e", "#7b2ff7", "#00f5a0"], type: "linear", dir: "to bottom right", name: "Neon Aurora" },
  { colors: ["#ff6b35", "#ff2e63", "#ffd700"], type: "linear", dir: "to right", name: "Warm Sunset" },
  { colors: ["#03045e", "#0077b6", "#48cae4"], type: "linear", dir: "to bottom", name: "Ocean Deep" },
  { colors: ["#0d3b2e", "#1a6b4a", "#4a8a5a"], type: "linear", dir: "to bottom right", name: "Forest Canopy" },
  { colors: ["#2d1b4e", "#6b3fa0", "#d4af37"], type: "linear", dir: "to right", name: "Royal Velvet" },
  { colors: ["#ff006e", "#00f5a0"], type: "radial", dir: "center", name: "Radial Pop" },
  { colors: ["#7b2ff7", "#f200ff", "#4361ee"], type: "linear", dir: "to bottom", name: "Cosmic Dream" },
  { colors: ["#0a0a18", "#1a2a4a", "#8abae8"], type: "linear", dir: "to bottom", name: "Arctic Frost" },
  { colors: ["#f8c8dc", "#b8e6d0", "#c8d8f0"], type: "linear", dir: "to right", name: "Pastel Dream" },
  { colors: ["#06d6a0", "#ffd166", "#ef476f"], type: "conic", dir: "center", name: "Tropical Burst" },
];

function gradientCss(colors: string[], type: string, dir: string): string {
  if (colors.length === 0) return "#000";
  if (colors.length === 1) return colors[0];
  const stops = colors.join(", ");
  switch (type) {
    case "radial":
      return `radial-gradient(circle at center, ${stops})`;
    case "conic":
      return `conic-gradient(from 0deg at center, ${stops})`;
    default:
      return `linear-gradient(${dir}, ${stops})`;
  }
}

const ColorMaker: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<string[]>(["#ff006e", "#7b2ff7"]);
  const [gradType, setGradType] = useState("linear");
  const [direction, setDirection] = useState("to bottom right");
  const [format, setFormat] = useState("png");
  const [sizeIdx, setSizeIdx] = useState(2);
  const [status, setStatus] = useState<"idle" | "rendering" | "done">("idle");
  const [activeTab, setActiveTab] = useState<"editor" | "presets">("editor");

  const gradient = gradientCss(colors, gradType, direction);
  const size = SIZES[sizeIdx];

  const updateColor = (i: number, val: string) => {
    const next = [...colors];
    next[i] = val;
    setColors(next);
  };

  const addColor = () => setColors([...colors, "#ffffff"]);
  const removeColor = (i: number) => {
    if (colors.length > 1) setColors(colors.filter((_, idx) => idx !== i));
  };

  const applyPreset = (p: typeof PRESETS[0]) => {
    setColors(p.colors);
    setGradType(p.type);
    setDirection(p.dir);
  };

  const capture = useCallback(async () => {
    setStatus("rendering");
    try {
      const c = document.createElement("canvas");
      c.width = size.w;
      c.height = size.h;
      const ctx = c.getContext("2d");
      if (!ctx) { setStatus("idle"); return; }

      const grad = buildGradient(ctx, colors, gradType, direction, size.w, size.h);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size.w, size.h);

      let dataUrl: string;
      switch (format) {
        case "jpeg":
          dataUrl = c.toDataURL("image/jpeg", 0.95);
          break;
        case "webp":
          dataUrl = c.toDataURL("image/webp", 0.92);
          break;
        default:
          dataUrl = c.toDataURL("image/png");
      }

      const link = document.createElement("a");
      link.download = `gradient-${size.suffix}.${format}`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Capture failed:", err);
      setStatus("idle");
    }
  }, [format, sizeIdx, size, colors, gradType, direction]);

function buildGradient(
  ctx: CanvasRenderingContext2D,
  colors: string[],
  type: string,
  dir: string,
  w: number,
  h: number
): CanvasGradient {
  const stops = colors.length;
  if (stops === 0) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#000");
    return g;
  }
  if (stops === 1) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, colors[0]);
    g.addColorStop(1, colors[0]);
    return g;
  }

  let grad: CanvasGradient;

  switch (type) {
    case "radial": {
      grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
      break;
    }
    case "conic": {
      grad = ctx.createConicGradient(0, w / 2, h / 2);
      break;
    }
    default: {
      let x0 = 0, y0 = 0, x1 = w, y1 = h;
      switch (dir) {
        case "to right": x0 = 0; y0 = 0; x1 = w; y1 = 0; break;
        case "to left": x0 = w; y0 = 0; x1 = 0; y1 = 0; break;
        case "to bottom": x0 = 0; y0 = 0; x1 = 0; y1 = h; break;
        case "to top": x0 = 0; y0 = h; x1 = 0; y1 = 0; break;
        case "to bottom right": x0 = 0; y0 = 0; x1 = w; y1 = h; break;
        case "to bottom left": x0 = w; y0 = 0; x1 = 0; y1 = h; break;
        case "to top right": x0 = 0; y0 = h; x1 = w; y1 = 0; break;
        case "to top left": x0 = w; y0 = h; x1 = 0; y1 = 0; break;
        default: x0 = 0; y0 = 0; x1 = w; y1 = h; break;
      }
      grad = ctx.createLinearGradient(x0, y0, x1, y1);
      break;
    }
  }

  for (let i = 0; i < stops; i++) {
    grad.addColorStop(i / (stops - 1), colors[i]);
  }

  return grad;
}

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Color Maker</h1>
          <p className={styles.sidebarDesc}>Create & export gradient backgrounds</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "editor" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
          <button
            className={`${styles.tab} ${activeTab === "presets" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("presets")}
          >
            Presets
          </button>
        </div>

        {activeTab === "editor" ? (
          <div className={styles.editor}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Colors</label>
              <div className={styles.colorList}>
                {colors.map((c, i) => (
                  <div key={i} className={styles.colorRow}>
                    <input
                      type="color"
                      value={c}
                      onChange={(e) => updateColor(i, e.target.value)}
                      className={styles.colorPicker}
                    />
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => updateColor(i, e.target.value)}
                      className={styles.colorInput}
                      placeholder="#000000"
                    />
                    {colors.length > 1 && (
                      <button className={styles.removeBtn} onClick={() => removeColor(i)}>
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button className={styles.addBtn} onClick={addColor}>
                  + Add Color
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Type</label>
              <div className={styles.chipGroup}>
                {GRADIENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    className={`${styles.chip} ${gradType === t.value ? styles.chipActive : ""}`}
                    onClick={() => setGradType(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {gradType === "linear" && (
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Direction</label>
                <div className={styles.dirGrid}>
                  {DIRECTIONS.map((d) => (
                    <button
                      key={d.value}
                      className={`${styles.dirBtn} ${direction === d.value ? styles.dirActive : ""}`}
                      onClick={() => setDirection(d.value)}
                      title={d.value}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.presets}>
            {PRESETS.map((p, i) => (
              <button
                key={i}
                className={styles.presetCard}
                onClick={() => applyPreset(p)}
              >
                <div
                  className={styles.presetSwatch}
                  style={{ background: gradientCss(p.colors, p.type, p.dir) }}
                />
                <span className={styles.presetName}>{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.previewArea}>
          <div ref={previewRef} className={styles.preview} style={{ background: gradient }} />

          <div className={styles.previewInfo}>
            <code className={styles.cssCode}>background: {gradient};</code>
          </div>
        </div>

        <div className={styles.bar}>
          <div className={styles.barInner}>
            <div className={styles.control}>
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

            <div className={styles.control}>
              <label className={styles.controlLabel}>Resolution</label>
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
    </div>
  );
};

export default ColorMaker;
