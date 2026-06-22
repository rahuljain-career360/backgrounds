"use client";
import React, { useState, useRef, useCallback } from "react";
import styles from "./ColorMaker.module.css";
import { ColorStop, GradientType, PatternConfig, DEFAULT_PATTERN_CONFIG, PatternType, SIZES, FORMATS, GRADIENT_TYPES, DIRECTIONS, PRESETS, PATTERN_PRESETS } from "./types";
import { parseGradientString } from "./utils/parser";
import { gradientCss, buildGradient, detectColorFormat } from "./utils/gradient";
import { patternCss, drawPattern } from "./utils/patterns";

const PATTERN_TYPES: { value: PatternType; label: string }[] = [
  { value: "dots", label: "Dots" },
  { value: "stripes", label: "Stripes" },
  { value: "checkerboard", label: "Checker" },
  { value: "grid", label: "Grid" },
  { value: "waves", label: "Waves" },
  { value: "noise", label: "Noise" },
  { value: "crosshatch", label: "Cross" },
  { value: "plaid", label: "Plaid" },
  { value: "zigzag", label: "Zigzag" },
  { value: "brick", label: "Brick" },
  { value: "honeycomb", label: "Hex" },
  { value: "waveflow", label: "Flow" },
];

function getRgbFromColor(color: string): { r: number; g: number; b: number } {
  if (typeof document === "undefined") return { r: 0, g: 0, b: 0 };
  const c = document.createElement("canvas");
  c.width = 1; c.height = 1;
  const ctx = c.getContext("2d");
  if (!ctx) return { r: 0, g: 0, b: 0 };
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return { r: d[0], g: d[1], b: d[2] };
}

function effectiveColor(cs: ColorStop): string {
  if (cs.opacity >= 1) return cs.value;
  const { r, g, b } = getRgbFromColor(cs.value);
  return `rgba(${r}, ${g}, ${b}, ${cs.opacity})`;
}

const ColorMaker: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"gradient" | "pattern">("gradient");
  const [colors, setColors] = useState<ColorStop[]>([
    { value: "#ff006e", format: "hex", opacity: 1 },
    { value: "#7b2ff7", format: "hex", opacity: 1 },
  ]);
  const [gradType, setGradType] = useState<GradientType>("linear");
  const [direction, setDirection] = useState("to bottom right");
  const [patternConfig, setPatternConfig] = useState<PatternConfig>({ ...DEFAULT_PATTERN_CONFIG });
  const [format, setFormat] = useState("png");
  const [sizeIdx, setSizeIdx] = useState(2);
  const [status, setStatus] = useState<"idle" | "rendering" | "done">("idle");
  const [activeTab, setActiveTab] = useState<"editor" | "presets">("editor");
  const [parserInput, setParserInput] = useState("");
  const [showParser, setShowParser] = useState(false);

  const size = SIZES[sizeIdx];

  const gradient = gradientCss(colors, gradType, direction);
  const pattern = patternCss(patternConfig);
  const previewCss = mode === "gradient" ? gradient : pattern;

  const updateColor = (i: number, val: string) => {
    const next = [...colors];
    next[i] = { ...next[i], value: val, format: detectColorFormat(val) };
    setColors(next);
  };

  const updateOpacity = (i: number, opacity: number) => {
    const next = [...colors];
    next[i] = { ...next[i], opacity };
    setColors(next);
  };

  const addColor = () => setColors([...colors, { value: "#ffffff", format: "hex", opacity: 1 }]);
  const removeColor = (i: number) => {
    if (colors.length > 1) setColors(colors.filter((_, idx) => idx !== i));
  };

  const applyPreset = (p: typeof PRESETS[0]) => {
    setColors(p.colors.map((c) => ({ value: c, format: detectColorFormat(c) as "hex" | "rgba" | "hsla", opacity: 1 })));
    setGradType(p.type);
    setDirection(p.dir);
    setMode("gradient");
  };

  const applyPatternPreset = (p: typeof PATTERN_PRESETS[0]) => {
    setPatternConfig({ ...p.config });
    setMode("pattern");
  };

  const handleParse = () => {
    const parsed = parseGradientString(parserInput);
    if (parsed) {
      setColors(parsed.colors);
      setGradType(parsed.type);
      setDirection(parsed.direction);
      setMode("gradient");
      setShowParser(false);
      setParserInput("");
    }
  };

  const updatePatternConfig = (key: keyof PatternConfig, val: number | string) => {
    setPatternConfig((prev) => ({ ...prev, [key]: val }));
  };

  const capture = useCallback(async () => {
    setStatus("rendering");
    try {
      const c = document.createElement("canvas");
      c.width = size.w;
      c.height = size.h;
      const ctx = c.getContext("2d");
      if (!ctx) { setStatus("idle"); return; }

      if (mode === "gradient") {
        const stops = colors.map(effectiveColor);
        const grad = buildGradient(ctx as any, colors.map((cs, i) => ({ ...cs, value: stops[i] })), gradType, direction, size.w, size.h);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size.w, size.h);
      } else {
        drawPattern(ctx as any, patternConfig, size.w, size.h);
      }

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
      link.download = `${mode}-${size.suffix}.${format}`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Capture failed:", err);
      setStatus("idle");
    }
  }, [format, sizeIdx, size, colors, gradType, direction, mode, patternConfig]);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Color Maker</h1>
          <p className={styles.sidebarDesc}>Create & export gradient & pattern backgrounds</p>
        </div>

        <div className={styles.modeGroup}>
          <button
            className={`${styles.modeBtn} ${mode === "gradient" ? styles.modeActive : ""}`}
            onClick={() => setMode("gradient")}
          >
            Gradient
          </button>
          <button
            className={`${styles.modeBtn} ${mode === "pattern" ? styles.modeActive : ""}`}
            onClick={() => setMode("pattern")}
          >
            Pattern
          </button>
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
          mode === "gradient" ? (
            <div className={styles.editor}>
              <button className={styles.parserToggle} onClick={() => setShowParser(!showParser)}>
                {showParser ? "−" : "+"} Paste CSS Gradient
              </button>

              {showParser && (
                <div className={styles.parserBox}>
                  <textarea
                    className={styles.parserInput}
                    placeholder="linear-gradient(45deg, #ff0000, rgba(0,255,0,0.5), blue)"
                    value={parserInput}
                    onChange={(e) => setParserInput(e.target.value)}
                    rows={3}
                  />
                  <button className={styles.parserBtn} onClick={handleParse} disabled={!parserInput.trim()}>
                    Parse & Apply
                  </button>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Colors</label>
                <div className={styles.colorList}>
                  {colors.map((c, i) => (
                    <div key={i} className={styles.colorRow}>
                      <input
                        type="color"
                        value={
                          c.value.startsWith("#") && c.value.length >= 7
                            ? c.value.slice(0, 7)
                            : "#000000"
                        }
                        onChange={(e) => updateColor(i, e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={c.value}
                        onChange={(e) => updateColor(i, e.target.value)}
                        className={styles.colorInput}
                        placeholder="#000000"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={c.opacity}
                        onChange={(e) => updateOpacity(i, parseFloat(e.target.value))}
                        className={styles.opacitySlider}
                        title={`Opacity: ${Math.round(c.opacity * 100)}%`}
                      />
                      <span className={styles.opacityLabel}>{Math.round(c.opacity * 100)}%</span>
                      {colors.length > 1 && (
                        <button className={styles.removeBtn} onClick={() => removeColor(i)}>✕</button>
                      )}
                    </div>
                  ))}
                  <button className={styles.addBtn} onClick={addColor}>+ Add Color</button>
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
            <div className={styles.editor}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Pattern Type</label>
                <div className={styles.chipGroup}>
                  {PATTERN_TYPES.map((t) => (
                    <button
                      key={t.value}
                      className={`${styles.chip} ${patternConfig.type === t.value ? styles.chipActive : ""}`}
                      onClick={() => updatePatternConfig("type", t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Foreground</label>
                <div className={styles.colorRow}>
                  <input
                    type="color"
                    value={patternConfig.fgColor}
                    onChange={(e) => updatePatternConfig("fgColor", e.target.value)}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    value={patternConfig.fgColor}
                    onChange={(e) => updatePatternConfig("fgColor", e.target.value)}
                    className={styles.colorInput}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Background</label>
                <div className={styles.colorRow}>
                  <input
                    type="color"
                    value={patternConfig.bgColor}
                    onChange={(e) => updatePatternConfig("bgColor", e.target.value)}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    value={patternConfig.bgColor}
                    onChange={(e) => updatePatternConfig("bgColor", e.target.value)}
                    className={styles.colorInput}
                  />
                </div>
              </div>

              {patternConfig.type === "dots" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Dot Size: {patternConfig.dotSize}px</label>
                  <input type="range" min="2" max="30" value={patternConfig.dotSize} onChange={(e) => updatePatternConfig("dotSize", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Spacing: {patternConfig.dotSpacing}px</label>
                  <input type="range" min="10" max="100" value={patternConfig.dotSpacing} onChange={(e) => updatePatternConfig("dotSpacing", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "stripes" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Width: {patternConfig.stripeWidth}px</label>
                  <input type="range" min="5" max="100" value={patternConfig.stripeWidth} onChange={(e) => updatePatternConfig("stripeWidth", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Angle: {patternConfig.stripeAngle}°</label>
                  <input type="range" min="-90" max="90" value={patternConfig.stripeAngle} onChange={(e) => updatePatternConfig("stripeAngle", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "checkerboard" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Cell Size: {patternConfig.cellSize}px</label>
                  <input type="range" min="10" max="80" value={patternConfig.cellSize} onChange={(e) => updatePatternConfig("cellSize", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "grid" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Grid Size: {patternConfig.gridSize}px</label>
                  <input type="range" min="10" max="100" value={patternConfig.gridSize} onChange={(e) => updatePatternConfig("gridSize", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Line Width: {patternConfig.lineWidth}px</label>
                  <input type="range" min="1" max="10" value={patternConfig.lineWidth} onChange={(e) => updatePatternConfig("lineWidth", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "waves" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Amplitude: {patternConfig.waveAmplitude}px</label>
                  <input type="range" min="5" max="60" value={patternConfig.waveAmplitude} onChange={(e) => updatePatternConfig("waveAmplitude", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Frequency</label>
                  <input type="range" min="0.005" max="0.1" step="0.001" value={patternConfig.waveFrequency} onChange={(e) => updatePatternConfig("waveFrequency", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "noise" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Intensity: {Math.round(patternConfig.noiseIntensity * 100)}%</label>
                  <input type="range" min="0.02" max="0.5" step="0.01" value={patternConfig.noiseIntensity} onChange={(e) => updatePatternConfig("noiseIntensity", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "crosshatch" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Foreground 2</label>
                  <div className={styles.colorRow}>
                    <input type="color" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorPicker} />
                    <input type="text" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorInput} />
                  </div>
                  <label className={styles.fieldLabel}>Angle: {patternConfig.stripeAngle}°</label>
                  <input type="range" min="0" max="90" value={patternConfig.stripeAngle} onChange={(e) => updatePatternConfig("stripeAngle", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Spacing: {patternConfig.gridSize}px</label>
                  <input type="range" min="10" max="80" value={patternConfig.gridSize} onChange={(e) => updatePatternConfig("gridSize", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Line: {patternConfig.lineWidth}px</label>
                  <input type="range" min="0.5" max="5" step="0.5" value={patternConfig.lineWidth} onChange={(e) => updatePatternConfig("lineWidth", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "plaid" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Foreground 2</label>
                  <div className={styles.colorRow}>
                    <input type="color" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorPicker} />
                    <input type="text" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorInput} />
                  </div>
                  <label className={styles.fieldLabel}>Band Width: {patternConfig.stripeWidth}px</label>
                  <input type="range" min="5" max="60" value={patternConfig.stripeWidth} onChange={(e) => updatePatternConfig("stripeWidth", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Spacing: {patternConfig.gridSize}px</label>
                  <input type="range" min="20" max="200" value={patternConfig.gridSize} onChange={(e) => updatePatternConfig("gridSize", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "zigzag" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Width: {patternConfig.dotSpacing}px</label>
                  <input type="range" min="10" max="80" value={patternConfig.dotSpacing} onChange={(e) => updatePatternConfig("dotSpacing", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Height: {patternConfig.waveAmplitude}px</label>
                  <input type="range" min="5" max="50" value={patternConfig.waveAmplitude} onChange={(e) => updatePatternConfig("waveAmplitude", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Line: {patternConfig.lineWidth}px</label>
                  <input type="range" min="1" max="5" value={patternConfig.lineWidth} onChange={(e) => updatePatternConfig("lineWidth", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "brick" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Brick Width: {patternConfig.brickWidth}px</label>
                  <input type="range" min="20" max="120" value={patternConfig.brickWidth} onChange={(e) => updatePatternConfig("brickWidth", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Brick Height: {patternConfig.brickHeight}px</label>
                  <input type="range" min="10" max="60" value={patternConfig.brickHeight} onChange={(e) => updatePatternConfig("brickHeight", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Mortar: {patternConfig.lineWidth}px</label>
                  <input type="range" min="1" max="5" value={patternConfig.lineWidth} onChange={(e) => updatePatternConfig("lineWidth", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "honeycomb" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Cell Size: {patternConfig.honeycombSize}px</label>
                  <input type="range" min="10" max="60" value={patternConfig.honeycombSize} onChange={(e) => updatePatternConfig("honeycombSize", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Line: {patternConfig.lineWidth}px</label>
                  <input type="range" min="1" max="5" value={patternConfig.lineWidth} onChange={(e) => updatePatternConfig("lineWidth", Number(e.target.value))} className={styles.slider} />
                </div>
              )}

              {patternConfig.type === "waveflow" && (
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Foreground 2</label>
                  <div className={styles.colorRow}>
                    <input type="color" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorPicker} />
                    <input type="text" value={patternConfig.fgColor2} onChange={(e) => updatePatternConfig("fgColor2", e.target.value)} className={styles.colorInput} />
                  </div>
                  <label className={styles.fieldLabel}>Layers: {patternConfig.waveLayers}</label>
                  <input type="range" min="2" max="10" value={patternConfig.waveLayers} onChange={(e) => updatePatternConfig("waveLayers", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Amplitude: {patternConfig.waveAmplitude}px</label>
                  <input type="range" min="20" max="200" value={patternConfig.waveAmplitude} onChange={(e) => updatePatternConfig("waveAmplitude", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Frequency</label>
                  <input type="range" min="0.003" max="0.04" step="0.001" value={patternConfig.waveFrequency} onChange={(e) => updatePatternConfig("waveFrequency", Number(e.target.value))} className={styles.slider} />
                  <label className={styles.fieldLabel}>Scatter: {Math.round(patternConfig.waveScatter * 100)}%</label>
                  <input type="range" min="0" max="1" step="0.05" value={patternConfig.waveScatter} onChange={(e) => updatePatternConfig("waveScatter", Number(e.target.value))} className={styles.slider} />
                </div>
              )}
            </div>
          )
        ) : (
          <div className={styles.presets}>
            {mode === "gradient"
              ? PRESETS.map((p, i) => (
                  <button key={i} className={styles.presetCard} onClick={() => applyPreset(p)}>
                    <div className={styles.presetSwatch} style={{ background: gradientCss(p.colors.map((c) => ({ value: c, format: "hex" as const, opacity: 1 })), p.type, p.dir) }} />
                    <span className={styles.presetName}>{p.name}</span>
                  </button>
                ))
              : PATTERN_PRESETS.map((p, i) => (
                  <button key={i} className={styles.presetCard} onClick={() => applyPatternPreset(p)}>
                    <div className={styles.presetSwatch} style={{ background: patternCss(p.config) }} />
                    <span className={styles.presetName}>{p.name}</span>
                  </button>
                ))}
          </div>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.previewArea}>
          <div ref={previewRef} className={styles.preview} style={{ background: previewCss }} />
          <div className={styles.previewInfo}>
            <code className={styles.cssCode}>
              {mode === "gradient" ? `background: ${gradient};` : `/* ${patternConfig.type} pattern */`}
            </code>
          </div>
        </div>

        <div className={styles.bar}>
          <div className={styles.barInner}>
            <div className={styles.control}>
              <label className={styles.controlLabel}>Format</label>
              <select className={styles.select} value={format} onChange={(e) => setFormat(e.target.value)}>
                {FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.control}>
              <label className={styles.controlLabel}>Resolution</label>
              <select className={styles.select} value={sizeIdx} onChange={(e) => setSizeIdx(Number(e.target.value))}>
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
