"use client";
import React, { useState } from "react";
import styles from "./MorphButton.module.css";

const buttons = [
  { icon: "✦", label: "Premium", shape: "pill" },
  { icon: "◆", label: "Pro", shape: "diamond" },
  { icon: "⬟", label: "Ultra", shape: "hexagon" },
  { icon: "◈", label: "Elite", shape: "octagon" },
  { icon: "★", label: "Gold", shape: "star" },
  { icon: "●", label: "Core", shape: "circle" },
  { icon: "▣", label: "Grid", shape: "square" },
  { icon: "◉", label: "Target", shape: "shield" },
];

const shapeStyles: Record<string, React.CSSProperties> = {
  pill: { borderRadius: "50px" },
  diamond: { borderRadius: "4px", transform: "rotate(45deg) scale(0.85)", padding: "20px 20px" },
  hexagon: { borderRadius: "12px", clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
  octagon: { borderRadius: "8px", clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" },
  star: { borderRadius: "4px", clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", padding: "16px" },
  circle: { borderRadius: "50%", width: "80px", height: "80px", padding: "0" },
  square: { borderRadius: "8px" },
  shield: { borderRadius: "8px", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" },
};

const innerContent: Record<string, React.CSSProperties> = {
  diamond: { transform: "rotate(-45deg)" },
  hexagon: { display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 18px" },
  star: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" },
  shield: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" },
};

const MorphButton: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Morph <span className={styles.thin}>Buttons</span></h1>
      <p className={styles.desc}>Each button has a unique geometric shape — hover to morph</p>
      <div className={styles.grid}>
        {buttons.map((b) => (
          <button
            key={b.label}
            className={`${styles.btn} ${hovered === b.label ? styles.hovered : ""}`}
            style={shapeStyles[b.shape]}
            onMouseEnter={() => setHovered(b.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.wrapper} style={innerContent[b.shape] || {}}>
              <span className={`${styles.icon} ${hovered === b.label ? styles.iconHover : ""}`}>{b.icon}</span>
              <span className={styles.label}>{b.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MorphButton;
