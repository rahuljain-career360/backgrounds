"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./HologramTimer.module.css";

interface Props {
  initialSeconds?: number;
}

const HologramTimer: React.FC<Props> = ({ initialSeconds = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((p) => p - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const toggle = useCallback(() => {
    if (timeLeft > 0) setIsActive((p) => !p);
  }, [timeLeft]);

  const reset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const pct = (timeLeft / initialSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} />
      <div className={styles.container} onClick={toggle}>
        <div
          className={`${styles.ring} ${isActive ? styles.ringActive : ""}`}
          style={{
            clipPath: `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`,
          }}
        />
        <div className={styles.holoCard}>
          <div className={`${styles.scanline} ${isActive ? styles.scanActive : ""}`} ref={scanRef} />
          <div className={styles.content}>
            <span className={styles.display}>
              {timeLeft === 0 ? "•••" : display}
            </span>
            <span className={styles.status}>
              {timeLeft === 0 ? "SIGNAL LOST" : isActive ? "LIVE" : "INIT"}
            </span>
          </div>
          <div className={styles.cornerTL} />
          <div className={styles.cornerTR} />
          <div className={styles.cornerBL} />
          <div className={styles.cornerBR} />
        </div>
      </div>
      <button onClick={reset} className={styles.btn}>REBOOT</button>
    </div>
  );
};

export default HologramTimer;
