"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./UltimateTimer.module.css";

const UltimateTimer = ({ initial = 15 }) => {
  const [seconds, setSeconds] = useState(initial);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // SVG Circle Logic
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (seconds / initial) * circumference;

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    if (seconds > 0) setIsActive(!isActive);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setSeconds(initial);
  };

  const isDanger = seconds <= 3 && seconds > 0;
  const percentage = (seconds / initial) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.timerContainer} onClick={toggleTimer}>
        {/* Progress SVG Ring */}
        <svg className={styles.svgRing} viewBox="0 0 260 260">
          <circle className={styles.circleBg} cx="130" cy="130" r={radius} />
          <circle
            className={styles.circleProgress}
            cx="130"
            cy="130"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke={seconds === 0 ? "#ef4444" : isDanger ? "#facc15" : "#22d3ee"}
          />
        </svg>

        {/* The Shrinking Core */}
        <div
          className={`${styles.innerCircle} ${isDanger ? styles.danger : ""}`}
          style={{
            width: `${percentage}%`,
            height: `${percentage}%`,
            minWidth: '20%',
            minHeight: '20%'
          }}
        >
          <h1 className={styles.timeText}>{seconds}</h1>
          {seconds > 0 && <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Seconds</p>}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={reset}
          className="px-8 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl transition-all font-bold text-sm"
        >
          RESET
        </button>
        <p className="text-gray-500 text-[10px] uppercase tracking-tighter">
          {isActive ? "Running" : seconds === 0 ? "Completed" : "Tap to Start"}
        </p>
      </div>
    </div>
  );
};

export default UltimateTimer;