"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./FullscreenTimer.module.css";

interface FullscreenTimerProps {
  initialSeconds?: number;
}

const FullscreenTimer: React.FC<FullscreenTimerProps> = ({ initialSeconds = 60 }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsActive(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleToggle = () => {
    if (timeLeft === 0) return;
    setIsActive((prev) => !prev);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(initialSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const percentage = (timeLeft / initialSeconds) * 100;
  const isWarning = timeLeft <= 10 && timeLeft > 0;
  const isDanger = timeLeft === 0;

  const circumference = 2 * Math.PI * 140;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOrb} />
      <div className={styles.backgroundOrbTwo} />

      <div className={styles.clockWrapper} onClick={handleToggle}>
        <svg className={styles.ring} viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke={isDanger ? "#ef4444" : isWarning ? "#f59e0b" : "#06b6d4"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 150 150)"
            className={styles.progressRing}
          />
        </svg>

        <div className={styles.timeDisplay}>
          <span className={`${styles.digits} ${isDanger ? styles.danger : isWarning ? styles.warning : ""}`}>
            {isDanger ? "00:00" : display}
          </span>
          <span className={styles.status}>
            {isDanger ? "TIME'S UP" : isActive ? "RUNNING" : "TAP TO START"}
          </span>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleToggle} className={styles.controlBtn}>
          {isActive ? "PAUSE" : "START"}
        </button>
        <button onClick={handleReset} className={styles.controlBtn}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default FullscreenTimer;
