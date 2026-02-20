"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./LuxuryTimer.module.css";

interface LuxuryTimerProps {
  initialSeconds?: number;
}

const LuxuryTimer: React.FC<LuxuryTimerProps> = ({ initialSeconds = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const percentage = (timeLeft / initialSeconds) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.outerFrame}>
        {/* Animated Breathing Ring */}
        <div className={styles.glowRing} />

        {/* The Luxury Shrinking Disc */}
        <div
          onClick={handleStart}
          className={styles.luxuryCircle}
          style={{
            width: `${percentage}%`,
            height: `${percentage}%`,
            minWidth: '40px',
            minHeight: '40px',
            // Turn black/gold when finished
            background: timeLeft === 0 ? "#111" : ""
          }}
        >
          {timeLeft > 0 ? (
            <>
              <h1 className={styles.timeText}>{timeLeft}</h1>
              <span className={styles.subText}>Seconds</span>
            </>
          ) : (
            <span className="text-[#d4af37] font-bold tracking-widest">FIN</span>
          )}
        </div>
      </div>

      <button onClick={handleReset} className={styles.restartBtn}>
        Reset Chronometer
      </button>
    </div>
  );
};

export default LuxuryTimer;