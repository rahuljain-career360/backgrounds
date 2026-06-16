"use client";
import React, { useState, useEffect } from "react";
import styles from "./MacColorBackground.module.css";

type ThemeId =
  | "sonoma"
  | "sequoia"
  | "ventura"
  | "monterey"
  | "bigsur"
  | "sierra"
  | "catalina"
  | "mojave";

interface Theme {
  name: string;
  colors: string[];
  desc: string;
}

const themes: Record<ThemeId, Theme> = {
  sonoma: {
    name: "Sonoma Sunset",
    desc: "Warm amber to deep violet",
    colors: ["#ff6b35", "#ff8c42", "#d4508f", "#7b2d8e", "#2d1b4e"],
  },
  sequoia: {
    name: "Sequoia Pine",
    desc: "Deep forest to midnight",
    colors: ["#0d3b2e", "#1a6b4a", "#2d8c5a", "#1a4a3a", "#0a1a12"],
  },
  ventura: {
    name: "Ventura Ocean",
    desc: "Cyan depths to abyss",
    colors: ["#0a1628", "#0d2b4e", "#1a5a8a", "#0d3b6e", "#060e1a"],
  },
  monterey: {
    name: "Monterey Mist",
    desc: "Lavender haze to slate",
    colors: ["#1a1a2e", "#2d2d4e", "#6a4a8a", "#8a6aaa", "#4a3a5a"],
  },
  bigsur: {
    name: "Big Sur Coast",
    desc: "Golden hour over Pacific",
    colors: ["#1a0e08", "#4a2a0a", "#c47a2a", "#e8a84a", "#8a5a1a"],
  },
  sierra: {
    name: "Sierra Alpine",
    desc: "Glacial blue to peak white",
    colors: ["#0a0a18", "#1a2a4a", "#4a7aaa", "#8abae8", "#c0d8f0"],
  },
  catalina: {
    name: "Catalina Sky",
    desc: "Sunset over the channel",
    colors: ["#1a0a18", "#4a1a4a", "#c04a6a", "#e88a6a", "#f0c08a"],
  },
  mojave: {
    name: "Mojave Desert",
    desc: "Terracotta to sand dune",
    colors: ["#1a0e0a", "#4a2a1a", "#8a5a3a", "#c08a5a", "#dab88a"],
  },
};

const MacColorBackground: React.FC = () => {
  const [themeId, setThemeId] = useState<ThemeId>("sonoma");
  const [animPhase, setAnimPhase] = useState(0);
  const theme = themes[themeId];
  const c = theme.colors;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimPhase((p) => (p + 1) % 100);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const t = animPhase / 100;

  const gradients = [
    { p1: [c[0], c[1], 0, 0, 1], p2: [c[2], c[3], 1, 1, 1 - t] },
    { p1: [c[2], c[3], 0, 1, t], p2: [c[4], c[0], 1, 0, 0.5 + t * 0.5] },
    { p1: [c[4], c[0], 0.5, 0, 0.3 + t * 0.4], p2: [c[1], c[2], 0.5, 1, 0.7 - t * 0.4] },
    { p1: [c[1], c[4], 0, 0.5, 0.6 + t * 0.3], p2: [c[3], c[0], 1, 0.5, 0.4 - t * 0.3] },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.stage}>
        <div className={styles.bgLayer}>
          {gradients.map((g, i) => (
            <div
              key={i}
              className={styles.gradBlob}
              style={{
                background: `radial-gradient(ellipse at ${g.p1[2] * 100}% ${g.p1[3] * 100}%, ${g.p1[0]} 0%, ${g.p1[1]} ${30 + g.p1[4] * 40}%, transparent 70%)`,
                top: `${10 + Math.sin(t * Math.PI * 2 + i * 1.5) * 20}%`,
                left: `${10 + Math.cos(t * Math.PI * 2 + i * 2) * 20}%`,
                width: `${50 + Math.sin(t * Math.PI + i * 1.2) * 20}%`,
                height: `${50 + Math.cos(t * Math.PI * 1.5 + i * 0.8) * 20}%`,
                opacity: 0.4 + Math.sin(t * Math.PI * 2 + i) * 0.15,
              }}
            />
          ))}
          {gradients.map((g, i) => (
            <div
              key={`b-${i}`}
              className={styles.gradBlob}
              style={{
                background: `radial-gradient(ellipse at ${50 + Math.sin(t * 2 + i * 2.5) * 30}% ${50 + Math.cos(t * 1.7 + i * 1.8) * 30}%, ${g.p2[0]} 0%, ${g.p2[1]} ${30 + g.p2[4] * 40}%, transparent 70%)`,
                top: `${60 + Math.cos(t * Math.PI * 2 + i * 2) * 15}%`,
                left: `${60 + Math.sin(t * Math.PI * 2 + i * 1.3) * 15}%`,
                width: `${40 + Math.cos(t * Math.PI + i * 1.5) * 15}%`,
                height: `${40 + Math.sin(t * Math.PI * 1.3 + i) * 15}%`,
                opacity: 0.3 + Math.cos(t * Math.PI * 2 + i * 1.5) * 0.1,
              }}
            />
          ))}
        </div>

        <div className={styles.noise} />
        <div className={styles.vignette} />

        <div className={styles.content}>
          <div className={styles.badge}>macOS INSPIRED</div>
          <h1 className={styles.title}>{theme.name}</h1>
          <p className={styles.desc}>{theme.desc}</p>

          <div className={styles.swatches}>
            {(Object.entries(themes) as [ThemeId, Theme][]).map(([id, th]) => (
              <button
                key={id}
                className={`${styles.swatch} ${id === themeId ? styles.swatchActive : ""}`}
                onClick={() => setThemeId(id)}
                title={th.name}
              >
                <span className={styles.swatchBar} style={{ background: `linear-gradient(135deg, ${th.colors.slice(0, 3).join(", ")})` }} />
                <span className={styles.swatchName}>{th.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacColorBackground;
