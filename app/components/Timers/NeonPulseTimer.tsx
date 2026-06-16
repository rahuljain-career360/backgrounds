"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./NeonPulseTimer.module.css";

interface Props {
  initialSeconds?: number;
}

const NeonPulseTimer: React.FC<Props> = ({ initialSeconds = 20 }) => {
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
  const circumference = 2 * Math.PI * 120;
  const offset = circumference - (pct / 100) * circumference;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isLow = timeLeft <= 5 && timeLeft > 0;
  const isDone = timeLeft === 0;

  const neonHue = isDone ? 0 : isLow ? 45 : 280;

  return (
    <div className={styles.wrapper}>
      <div className={styles.rings} onClick={toggle}>
        <svg className={styles.svg} viewBox="0 0 260 260">
          <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
          <circle
            cx="130" cy="130" r="120"
            fill="none"
            stroke={`hsl(${neonHue}, 100%, 60%)`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 130 130)"
            className={styles.progress}
            style={{ filter: `drop-shadow(0 0 12px hsl(${neonHue}, 100%, 60%))` }}
          />
          <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle
            cx="130" cy="130" r="100"
            fill="none"
            stroke={`hsl(${neonHue + 40}, 100%, 60%)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.5}
            strokeDashoffset={offset * 0.7}
            transform="rotate(-90 130 130)"
            className={styles.progressInner}
            style={{ filter: `drop-shadow(0 0 8px hsl(${neonHue + 40}, 100%, 60%))` }}
          />
        </svg>
        <div className={styles.center}>
          <span className={`${styles.display} ${isDone ? styles.done : isLow ? styles.low : ""}`}>
            {display}
          </span>
          <span className={styles.sub}>
            {isDone ? "COMPLETE" : isActive ? "PAUSE TO" : "TAP TO START"}
          </span>
        </div>
      </div>
      <button onClick={reset} className={styles.btn}>↻ RESET</button>
    </div>
  );
};

export default NeonPulseTimer;
