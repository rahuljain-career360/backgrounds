"use client";
import React, { useState } from "react";
import styles from "./GlassBtn.module.css";

const buttons = [
  { icon: "⊹", label: "Glass", size: "md", blur: 12 },
  { icon: "✦", label: "Frost", size: "md", blur: 16 },
  { icon: "✧", label: "Crystal", size: "md", blur: 20 },
  { icon: "◇", label: "Diamond", size: "lg", blur: 14 },
  { icon: "○", label: "Sphere", size: "sm", blur: 10 },
  { icon: "▽", label: "Prism", size: "lg", blur: 18 },
];

const sizeMap: Record<string, { padding: string; fontSize: string }> = {
  sm: { padding: "10px 20px", fontSize: "12px" },
  md: { padding: "16px 32px", fontSize: "15px" },
  lg: { padding: "20px 44px", fontSize: "17px" },
};

const GlassBtn: React.FC = () => {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Glass <span className={styles.thin}>Buttons</span></h1>
      <p className={styles.desc}>Frosted glass with backdrop blur &mdash; premium, depth, elegance</p>
      <div className={styles.grid}>
        {buttons.map((b) => {
          const sz = sizeMap[b.size];
          return (
            <button
              key={b.label}
              className={`${styles.btn} ${clicked === b.label ? styles.ripple : ""}`}
              style={
                {
                  padding: sz.padding,
                  fontSize: sz.fontSize,
                  "--blur": `${b.blur}px`,
                  "--b": b.blur,
                } as React.CSSProperties
              }
              onClick={(e) => {
                setClicked(b.label);
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--rx", `${x}px`);
                e.currentTarget.style.setProperty("--ry", `${y}px`);
              }}
              onAnimationEnd={() => setClicked(null)}
            >
              <span className={styles.shine} />
              <span className={styles.borderGlow} />
              <span className={styles.content}>
                <span className={styles.icon}>{b.icon}</span>
                <span className={styles.label}>{b.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GlassBtn;
