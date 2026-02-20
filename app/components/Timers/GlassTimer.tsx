"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./GlassTimer.module.css";

interface GlassTimerProps {
  duration?: number;
}

const GlassTimer: React.FC<GlassTimerProps> = ({ duration = 12 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsStarted(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, timeLeft]);

  const handleInteraction = () => {
    if (timeLeft > 0) setIsStarted(true);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarted(false);
    setTimeLeft(duration);
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.timerWrapper} onClick={handleInteraction}>
        {/* Background Glass Plate */}
        <div className={styles.glassBase} />

        {/* The Animated Shrinking Glass Circle */}
        <div
          className={`${styles.shrinkingGlass} ${isStarted ? styles.activeShadow : ""}`}
          style={{
            width: `${percentage}%`,
            height: `${percentage}%`,
            // Background switches to warm glow when low
            background: timeLeft <= 3 && timeLeft > 0
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.1))"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))"
          }}
        >
          <span className={styles.timerValue}>{timeLeft}</span>
          {timeLeft > 0 && <span className={styles.label}>Remain</span>}
        </div>
      </div>

      <button 
        onClick={reset}
        className="mt-10 px-10 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md"
      >
        RELOAD
      </button>
    </div>
  );
};

export default GlassTimer;