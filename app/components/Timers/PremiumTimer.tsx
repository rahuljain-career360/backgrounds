"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./PremiumTimer.module.css";

interface TimerProps {
  initialSeconds?: number;
}

const PremiumTimer: React.FC<TimerProps> = ({ initialSeconds = 10 }) => {
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

  const handleStart = () => {
    if (!isActive && timeLeft > 0) setIsActive(true);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(initialSeconds);
  };

  const percentage = (timeLeft / initialSeconds) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.timerWrapper} onClick={handleStart}>
        
        {/* Neon Glow background */}
        <div className={`${styles.glow} ${isActive ? styles.activeGlow : styles.inactiveGlow}`} />

        {/* The Circle */}
        <div
          className={styles.shrinkingCircle}
          style={{
            width: `${percentage}%`,
            height: `${percentage}%`,
            background: timeLeft === 0 
              ? "linear-gradient(135deg, #f43f5e, #e11d48)" 
              : "linear-gradient(135deg, #06b6d4, #3b82f6)",
            transition: "width 1s linear, height 1s linear, background 0.5s ease",
          }}
        >
          <div className={styles.label}>
            {timeLeft > 0 ? timeLeft : "DONE"}
          </div>
          {timeLeft > 0 && <span className={styles.subLabel}>Secs</span>}
        </div>

        {/* Pulse Hint when idle */}
        {!isActive && timeLeft > 0 && <div className={styles.pulse} />}
      </div>

      <button onClick={handleReset} className={styles.resetBtn}>
        RESTART
      </button>
    </div>
  );
};

export default PremiumTimer;