"use client";
import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import styles from "./PremiumColors.module.css";

interface Color {
  hex: string;
  name: string;
}

interface Palette {
  name: string;
  desc: string;
  colors: Color[];
}

const palettes: Palette[] = [
  {
    name: "Neon Noir",
    desc: "Electric vibes for dark mode interfaces",
    colors: [
      { hex: "#ff0055", name: "Neon Rose" },
      { hex: "#00ffaa", name: "Cyber Mint" },
      { hex: "#7c3aed", name: "Ultra Violet" },
      { hex: "#f59e0b", name: "Signal Amber" },
      { hex: "#06b6d4", name: "Cyan Pulse" },
    ],
  },
  {
    name: "Earth & Clay",
    desc: "Warm organic tones grounded in nature",
    colors: [
      { hex: "#8B5A2B", name: "Terracotta" },
      { hex: "#D2B48C", name: "Warm Sand" },
      { hex: "#556B2F", name: "Olive Grove" },
      { hex: "#A0522D", name: "Sienna Clay" },
      { hex: "#F5DEB3", name: "Desert Wheat" },
    ],
  },
  {
    name: "Ocean Depths",
    desc: "Deep blues inspired by the abyss",
    colors: [
      { hex: "#001a2e", name: "Abyss" },
      { hex: "#003d5a", name: "Deep Water" },
      { hex: "#0077b6", name: "Lagoon" },
      { hex: "#00b4d8", name: "Coral Edge" },
      { hex: "#90e0ef", name: "Foam" },
    ],
  },
  {
    name: "Royal Velvet",
    desc: "Luxurious jewel tones for premium brands",
    colors: [
      { hex: "#2d1b4e", name: "Midnight Plum" },
      { hex: "#6b3fa0", name: "Royal Purple" },
      { hex: "#d4af37", name: "Gold Leaf" },
      { hex: "#8a2be2", name: "Amethyst" },
      { hex: "#e8d5f5", name: "Lavender Mist" },
    ],
  },
  {
    name: "Pastel Dream",
    desc: "Soft ethereal hues for gentle aesthetics",
    colors: [
      { hex: "#f8c8dc", name: "Blush" },
      { hex: "#b8e6d0", name: "Matcha" },
      { hex: "#c8d8f0", name: "Sky Lite" },
      { hex: "#f0d8f8", name: "Orchid" },
      { hex: "#f8e8c8", name: "Vanilla" },
    ],
  },
  {
    name: "Midnight Chrome",
    desc: "Metallic dark tones with a futuristic edge",
    colors: [
      { hex: "#0a0a0f", name: "Carbon" },
      { hex: "#1a1a2e", name: "Gunmetal" },
      { hex: "#2a2a4a", name: "Slate" },
      { hex: "#c0c0d0", name: "Silver Frost" },
      { hex: "#e8e8f0", name: "Pearl" },
    ],
  },
  {
    name: "Forest Canopy",
    desc: "Rich greens from rainforest to moss",
    colors: [
      { hex: "#0d3b2e", name: "Pine Needle" },
      { hex: "#1a6b4a", name: "Emerald" },
      { hex: "#4a8a5a", name: "Sage" },
      { hex: "#8aba7a", name: "Moss" },
      { hex: "#d4e8c0", name: "New Leaf" },
    ],
  },
  {
    name: "Sunset Boulevard",
    desc: "Golden hour palette with warm gradients",
    colors: [
      { hex: "#ff6b35", name: "Sunset Orange" },
      { hex: "#ff8c42", name: "Golden Ray" },
      { hex: "#d4508f", name: "Dusk Rose" },
      { hex: "#7b2d8e", name: "Twilight" },
      { hex: "#2d1b4e", name: "Nightfall" },
    ],
  },
  {
    name: "Arctic Frost",
    desc: "Cool icy tones for minimal & clean designs",
    colors: [
      { hex: "#d8e8f8", name: "Ice" },
      { hex: "#a0c4e8", name: "Frost Blue" },
      { hex: "#6a9ac8", name: "Glacier" },
      { hex: "#3a6a9a", name: "Deep Freeze" },
      { hex: "#1a2a4a", name: "Polar Night" },
    ],
  },
  {
    name: "Candy Pop",
    desc: "Bold vibrant colors for playful brands",
    colors: [
      { hex: "#ff0066", name: "Hot Pink" },
      { hex: "#ffcc00", name: "Lemon" },
      { hex: "#00ccaa", name: "Mint Pop" },
      { hex: "#6644ff", name: "Cosmic Blue" },
      { hex: "#ff6622", name: "Tangerine" },
    ],
  },
];

const PremiumColors: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [previewColor, setPreviewColor] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const copy = useCallback(async (hex: string, key: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIdx(key);
    setTimeout(() => setCopiedIdx(null), 1500);
  }, []);

  const downloadPalette = useCallback(async (palette: Palette, e: React.MouseEvent) => {
    e.stopPropagation();
    const el = (e.currentTarget as HTMLElement).closest(`.${styles.paletteCard}`) as HTMLElement;
    if (!el) return;
    try {
      const dataUrl = await toPng(el, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${palette.name.replace(/\s+/g, "-").toLowerCase()}-palette.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      const colorStr = palette.colors.map((c) => c.hex).join(", ");
      const blob = new Blob([colorStr], { type: "text/plain" });
      const link = document.createElement("a");
      link.download = `${palette.name.replace(/\s+/g, "-").toLowerCase()}-palette.txt`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, []);

  const downloadAll = useCallback(async () => {
    const text = palettes
      .map((p) => `${p.name}\n${p.colors.map((c) => `${c.name}: ${c.hex}`).join("\n")}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "premium-colors.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }, []);

  const allHex = palettes.flatMap((p) => p.colors.map((c) => c.hex));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>PREMIUM COLOR COLLECTION</div>
        <h1 className={styles.heroTitle}>Color <span className={styles.heroAccent}>Palettes</span></h1>
        <p className={styles.heroDesc}>Curated premium color palettes — preview, copy, and download</p>
        <button className={styles.downloadAllBtn} onClick={downloadAll}>
          ↓ DOWNLOAD ALL
        </button>
      </div>

      <div className={styles.strip}>
        {allHex.map((hex, i) => (
          <div
            key={i}
            className={styles.stripSwatch}
            style={{ background: hex }}
            onClick={() => setPreviewColor(hex)}
            title={hex}
          />
        ))}
      </div>

      <div className={styles.grid}>
        {palettes.map((palette) => (
          <div
            key={palette.name}
            className={`${styles.paletteCard} ${expanded === palette.name ? styles.expanded : ""}`}
            onClick={() => setExpanded(expanded === palette.name ? null : palette.name)}
          >
            <div className={styles.paletteStrip}>
              {palette.colors.map((c) => (
                <div
                  key={c.hex}
                  className={styles.paletteSwatch}
                  style={{ background: c.hex }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewColor(c.hex);
                  }}
                />
              ))}
            </div>

            <div className={styles.paletteInfo}>
              <div className={styles.paletteHeader}>
                <h2 className={styles.paletteName}>{palette.name}</h2>
                <span className={styles.paletteCount}>{palette.colors.length} colors</span>
              </div>
              <p className={styles.paletteDesc}>{palette.desc}</p>

              <div className={styles.colorList}>
                {palette.colors.map((c) => {
                  const key = `${palette.name}-${c.hex}`;
                  return (
                    <div key={key} className={styles.colorRow}>
                      <div className={styles.colorSwatchMini} style={{ background: c.hex }} />
                      <span className={styles.colorName}>{c.name}</span>
                      <code className={styles.colorHex}>{c.hex}</code>
                      <button
                        className={styles.copyBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          copy(c.hex, key);
                        }}
                      >
                        {copiedIdx === key ? "✓" : "⎘"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className={styles.paletteActions}>
                <button
                  className={styles.actionBtn}
                  onClick={(e) => downloadPalette(palette, e)}
                >
                  ↓ Download PNG
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = palette.colors.map((c) => `${c.hex} /* ${c.name} */`).join("\n");
                    navigator.clipboard.writeText(text);
                    setCopiedIdx(`all-${palette.name}`);
                    setTimeout(() => setCopiedIdx(null), 1500);
                  }}
                >
                  {copiedIdx === `all-${palette.name}` ? "✓ Copied" : "⎘ Copy All"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewColor && (
        <div className={styles.previewOverlay} onClick={() => setPreviewColor(null)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewSwatch} style={{ background: previewColor }} />
            <div className={styles.previewInfo}>
              <code className={styles.previewHex}>{previewColor}</code>
              <button
                className={styles.previewCopyBtn}
                onClick={() => {
                  navigator.clipboard.writeText(previewColor);
                  setCopiedIdx("preview");
                  setTimeout(() => setCopiedIdx(null), 1500);
                }}
              >
                {copiedIdx === "preview" ? "✓ Copied" : "Copy"}
              </button>
              <button className={styles.previewCloseBtn} onClick={() => setPreviewColor(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumColors;
