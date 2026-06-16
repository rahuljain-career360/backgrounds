"use client";
import React, { useState } from "react";
import styles from "./NeonGlow.module.css";

const icons = {
  play: "▶",
  pause: "⏸",
  next: "⏭",
  heart: "♥",
  star: "★",
  bolt: "⚡",
  arrow: "→",
  download: "↓",
  settings: "⚙",
  power: "⏻",
};

const buttons = [
  { icon: "bolt", label: "Ignite", color: "#f59e0b" },
  { icon: "heart", label: "Like", color: "#ef4444" },
  { icon: "star", label: "Favorite", color: "#8b5cf6" },
  { icon: "play", label: "Play", color: "#06b6d4" },
  { icon: "arrow", label: "Next", color: "#22c55e" },
  { icon: "download", label: "Get", color: "#3b82f6" },
  { icon: "settings", label: "Config", color: "#a855f7" },
  { icon: "power", label: "Start", color: "#ec4899" },
  { icon: "next", label: "Skip", color: "#14b8a6" },
  { icon: "pause", label: "Hold", color: "#f97316" },
];

const NeonGlow: React.FC = () => {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Neon Glow <span className={styles.thin}>Buttons</span></h1>
      <p className={styles.desc}>Hover over any button — each pulses with a unique neon hue</p>
      <div className={styles.grid}>
        {buttons.map((b) => (
          <button
            key={b.label}
            className={`${styles.btn} ${clicked === b.label ? styles.clicked : ""}`}
            style={{ "--neon": b.color } as React.CSSProperties}
            onClick={() => setClicked(b.label)}
            onAnimationEnd={() => setClicked(null)}
          >
            <span className={styles.icon}>{icons[b.icon as keyof typeof icons]}</span>
            <span className={styles.label}>{b.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NeonGlow;
