"use client";
import React, { useState } from "react";
import styles from "./LiquidBtn.module.css";

const buttons = [
  { icon: "~", label: "Fluid", color: "#06b6d4", intensity: 1 },
  { icon: "≈", label: "Wave", color: "#8b5cf6", intensity: 2 },
  { icon: "∫", label: "Flow", color: "#ec4899", intensity: 3 },
  { icon: "∇", label: "Drift", color: "#22c55e", intensity: 1 },
  { icon: "∞", label: "Merge", color: "#f59e0b", intensity: 2 },
  { icon: "∿", label: "Sway", color: "#ef4444", intensity: 3 },
  { icon: "≋", label: "Ripple", color: "#3b82f6", intensity: 1 },
  { icon: "∝", label: "Morph", color: "#a855f7", intensity: 2 },
];

const LiquidBtn: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Liquid <span className={styles.thin}>Buttons</span></h1>
      <p className={styles.desc}>Hover to see the gooey liquid fill effect</p>
      <div className={styles.grid}>
        {buttons.map((b) => (
          <button
            key={b.label}
            className={`${styles.btn} ${hovered === b.label ? styles.liquidHover : ""}`}
            style={{ "--liquid": b.color } as React.CSSProperties}
            onMouseEnter={() => setHovered(b.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.liquidBg}>
              <span className={styles.blob} style={{ animationDuration: `${1.5 + b.intensity * 0.3}s` }} />
              <span className={styles.blob} style={{ animationDuration: `${2 + b.intensity * 0.2}s`, animationDelay: "0.3s" }} />
              <span className={styles.blob} style={{ animationDuration: `${1.8 + b.intensity * 0.25}s`, animationDelay: "0.6s" }} />
            </span>
            <span className={styles.content}>
              <span className={styles.icon}>{b.icon}</span>
              <span className={styles.label}>{b.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiquidBtn;
