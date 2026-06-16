"use client";
import React, { useState } from "react";
import styles from "./HologramBtn.module.css";

const buttons = [
  { icon: "⊞", label: "Launch", code: ">_", accent: "#00fff0" },
  { icon: "⌘", label: "Command", code: "⌘+K", accent: "#ff60f0" },
  { icon: "⊡", label: "Deploy", code: "git push", accent: "#60ffa0" },
  { icon: "⟁", label: "Compile", code: "npm run", accent: "#ffd060" },
  { icon: "⬡", label: "Connect", code: "SSH", accent: "#60a0ff" },
  { icon: "⎔", label: "Render", code: "3D", accent: "#ff6080" },
];

const HologramBtn: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Hologram <span className={styles.thin}>Buttons</span></h1>
      <p className={styles.desc}>Hover for scan-line glitch effects &mdash; cyberpunk UI</p>
      <div className={styles.grid}>
        {buttons.map((b) => (
          <button
            key={b.label}
            className={`${styles.btn} ${active === b.label ? styles.active : ""}`}
            style={{ "--accent": b.accent } as React.CSSProperties}
            onClick={() => setActive(b.label)}
            onAnimationEnd={() => setActive(null)}
          >
            <span className={styles.scan} />
            <span className={styles.glitch} data-text={b.label}>{b.label}</span>
            <span className={styles.code}>{b.code}</span>
            <span className={styles.icon}>{b.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HologramBtn;
