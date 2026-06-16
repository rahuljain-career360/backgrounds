"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./CrystalTimer.module.css";

interface Props {
  initialSeconds?: number;
}

const CrystalTimer: React.FC<Props> = ({ initialSeconds = 15 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
  const display = timeLeft;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgShapes}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
      </div>
      <div className={styles.container} onClick={toggle}>
        <div className={styles.facet1} style={{ opacity: pct / 100 }} />
        <div className={styles.facet2} style={{ opacity: pct / 100 }} />
        <div className={styles.facet3} style={{ opacity: pct / 100 }} />
        <div className={styles.crystal}>
          <div className={`${styles.shine} ${isActive ? styles.shineActive : ""}`} />
          <div className={styles.inner}>
            <span className={styles.display}>
              {timeLeft === 0 ? "✦" : display}
            </span>
            <span className={styles.sub}>
              {timeLeft === 0 ? "COMPLETE" : isActive ? "• RUNNING" : "TAP"}
            </span>
          </div>
        </div>
      </div>
      <button onClick={reset} className={styles.btn}>↻ RESET</button>
    </div>
  );
};

export default CrystalTimer;
