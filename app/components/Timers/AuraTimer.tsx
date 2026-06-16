"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AuraTimer.module.css";

interface Props {
  initialSeconds?: number;
}

const AuraTimer: React.FC<Props> = ({ initialSeconds = 40 }) => {
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
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isDone = timeLeft === 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.ambientBg} />
      <div className={styles.auraLayer}>
        <div
          className={`${styles.auraRing} ${styles.aura1} ${isActive ? styles.auraActive : ""}`}
          style={{ width: `${40 + pct * 0.6}%`, height: `${40 + pct * 0.6}%` }}
        />
        <div
          className={`${styles.auraRing} ${styles.aura2} ${isActive ? styles.auraActive : ""}`}
          style={{ width: `${30 + pct * 0.5}%`, height: `${30 + pct * 0.5}%` }}
        />
        <div
          className={`${styles.auraRing} ${styles.aura3} ${isActive ? styles.auraActive : ""}`}
          style={{ width: `${20 + pct * 0.4}%`, height: `${20 + pct * 0.4}%` }}
        />
      </div>
      <div className={styles.container} onClick={toggle}>
        <div className={styles.innerCircle}>
          <div className={`${styles.corePulse} ${isActive ? styles.pulseActive : ""}`} />
          <div className={styles.textGroup}>
            <span className={`${styles.display} ${isDone ? styles.done : ""}`}>
              {isDone ? "∞" : display}
            </span>
            <span className={styles.sub}>
              {isDone ? "TIMELESS" : isActive ? "NOW" : "START"}
            </span>
          </div>
        </div>
      </div>
      <button onClick={reset} className={styles.btn}>↻ RESET</button>
    </div>
  );
};

export default AuraTimer;
