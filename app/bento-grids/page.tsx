"use client";
import React, { useRef, useCallback, useState } from "react";
import * as htmlToImage from "html-to-image";

const PATTERNS = [
  {
    name: "Sapphire Grid",
    bg: "#080c1a",
    line: "#f6c90e",
    cell1: "linear-gradient(135deg, #f6c90e22, #ff8c0011)",
    cell2: "linear-gradient(135deg, #ff8c0022, #f6c90e11)",
    accent: "#f6c90e",
    css: `.bg {
  background: #080c1a;
  background-image: linear-gradient(#f6c90e20 1px, transparent 0),
    linear-gradient(90deg, #f6c90e20 1px, transparent 0);
  background-size: 24px 24px;
}`,
  },
  {
    name: "Emerald Grid",
    bg: "#0a1410",
    line: "#00e676",
    cell1: "linear-gradient(135deg, #00e67622, #00bcd411)",
    cell2: "linear-gradient(135deg, #00bcd422, #00e67611)",
    accent: "#00e676",
    css: `.bg {
  background: #0a1410;
  background-image: linear-gradient(#00e67620 1px, transparent 0),
    linear-gradient(90deg, #00e67620 1px, transparent 0);
  background-size: 24px 24px;
}`,
  },
  {
    name: "Crimson Grid",
    bg: "#140a0a",
    line: "#ff4757",
    cell1: "linear-gradient(135deg, #ff475722, #ff6b8111)",
    cell2: "linear-gradient(135deg, #ff6b8122, #ff475711)",
    accent: "#ff4757",
    css: `.bg {
  background: #140a0a;
  background-image: linear-gradient(#ff475720 1px, transparent 0),
    linear-gradient(90deg, #ff475720 1px, transparent 0);
  background-size: 24px 24px;
}`,
  },
  {
    name: "Violet Grid",
    bg: "#0e0a16",
    line: "#b388ff",
    cell1: "linear-gradient(135deg, #b388ff22, #7c4dff11)",
    cell2: "linear-gradient(135deg, #7c4dff22, #b388ff11)",
    accent: "#b388ff",
    css: `.bg {
  background: #0e0a16;
  background-image: linear-gradient(#b388ff20 1px, transparent 0),
    linear-gradient(90deg, #b388ff20 1px, transparent 0);
  background-size: 24px 24px;
}`,
  },
  {
    name: "Ocean Grid",
    bg: "#060e1a",
    line: "#00bcd4",
    cell1: "linear-gradient(135deg, #00bcd422, #00968811)",
    cell2: "linear-gradient(135deg, #00968822, #00bcd411)",
    accent: "#00bcd4",
    css: `.bg {
  background: #060e1a;
  background-image: linear-gradient(#00bcd420 1px, transparent 0),
    linear-gradient(90deg, #00bcd420 1px, transparent 0);
  background-size: 24px 24px;
}`,
  },
];

const SIZES = [
  { label: "HD", w: 1920, h: 1080, suffix: "hd" },
  { label: "2K", w: 2560, h: 1440, suffix: "2k" },
  { label: "4K", w: 3840, h: 2160, suffix: "4k" },
];

const BASE_W = 640;
const BASE_H = 360;

export default function BentoGridsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#05070a", color: "#e0e0e0", fontFamily: "system-ui, sans-serif", padding: "32px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px", background: "linear-gradient(135deg, #f6c90e, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Bento Grids
      </h1>
      <p style={{ color: "#6b7280", margin: "0 0 32px", fontSize: "0.9rem" }}>
        Select a bento grid background. Click to download.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "24px" }}>
        {PATTERNS.map((p, idx) => (
          <PatternCard key={idx} pattern={p} />
        ))}
      </div>
    </div>
  );
}

function PatternCard({ pattern }: { pattern: (typeof PATTERNS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "rendering" | "done">("idle");
  const [sizeIdx, setSizeIdx] = useState(2);

  const bgStyle: React.CSSProperties = {
    background: pattern.bg,
    backgroundImage: `linear-gradient(${pattern.line}20 1px, transparent 0), linear-gradient(90deg, ${pattern.line}20 1px, transparent 0)`,
    backgroundSize: "24px 24px",
    borderRadius: "12px",
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
  };

  const capture = useCallback(async () => {
    if (!ref.current) return;
    setStatus("rendering");
    try {
      const size = SIZES[sizeIdx];
      const pr = Math.round(size.w / BASE_W);
      const dataUrl = await htmlToImage.toPng(ref.current, {
        width: BASE_W, height: BASE_H, pixelRatio: pr,
        backgroundColor: pattern.bg,
      });
      const link = document.createElement("a");
      link.download = `${pattern.name.toLowerCase().replace(/\s+/g, "-")}-${size.suffix}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    } catch { setStatus("idle"); }
  }, [sizeIdx, pattern]);

  return (
    <div style={{ background: "#0b0e14", borderRadius: "16px", border: "1px solid #1e2430", overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <div ref={ref} style={{ width: `${BASE_W}px`, height: `${BASE_H}px`, position: "relative", overflow: "hidden", margin: "0 auto" }}>
          <div style={bgStyle} />
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: "8px", padding: "12px" }}>
            <div style={{ background: pattern.cell1, borderRadius: "10px", border: `1px solid ${pattern.line}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, border: `2px solid ${pattern.accent}55`, borderRadius: "50%" }} />
            </div>
            <div style={{ background: pattern.cell2, borderRadius: "10px", border: `1px solid ${pattern.line}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, background: pattern.accent, borderRadius: "50%", opacity: 0.6 }} />
            </div>
            <div style={{ background: pattern.cell2, borderRadius: "10px", border: `1px solid ${pattern.line}25`, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
              {[0,1,2,3].map(i => <div key={i} style={{ width: 3, height: 10 + i * 4, background: pattern.accent, borderRadius: 2, opacity: 0.4 + 0.1 * i }} />)}
            </div>
            <div style={{ background: pattern.cell1, borderRadius: "10px", border: `1px solid ${pattern.line}25`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: pattern.accent, opacity: 0.7, lineHeight: 1 }}>128</span>
              <span style={{ fontSize: "0.5rem", letterSpacing: "0.1em", color: "#fff", opacity: 0.25, textTransform: "uppercase" }}>total</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{pattern.name}</h3>
        <pre style={{ background: "#05070a", borderRadius: 8, padding: 12, fontSize: "0.7rem", color: "#9ca3af", overflow: "auto", margin: "12px 0 0", maxHeight: 100 }}>{pattern.css}</pre>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <select
            value={sizeIdx}
            onChange={(e) => setSizeIdx(Number(e.target.value))}
            style={{ background: "#11161f", border: "1px solid #1e2430", borderRadius: 6, padding: "6px 10px", color: "#e0e0e0", fontSize: "0.8rem", cursor: "pointer" }}
          >
            {SIZES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
          </select>

          <button
            onClick={capture}
            disabled={status === "rendering"}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "8px 16px", border: "none", borderRadius: 8,
              background: status === "rendering" ? "#4b5563" : `linear-gradient(135deg, ${pattern.accent}, ${pattern.accent}cc)`,
              color: "#fff", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
              opacity: status === "rendering" ? 0.6 : 1,
            }}
          >
            {status === "rendering" ? "⏳" : status === "done" ? "✓" : "↓"}{" "}
            {status === "rendering" ? "Rendering..." : status === "done" ? "Downloaded!" : `Download ${SIZES[sizeIdx].label}`}
          </button>
        </div>
      </div>
    </div>
  );
}
