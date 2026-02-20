"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./GradientTimer.module.css";

interface Props {
  time?: number;
  maxBorderSize?: number; // Maximum thickness of border in pixels
}

const GradientTimer: React.FC<Props> = ({ time = 10, maxBorderSize = 10 }) => {
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (seconds === 0) setIsActive(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds]);

  const handleToggle = () => {
    if (seconds > 0) setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setSeconds(time);
  };

  // Calculate border thickness based on time left
  const currentBorderSize = (seconds / time) * maxBorderSize;

  return (
    <div className={styles.container}>
      <div className={styles.timerWrapper} onClick={handleToggle}>
        
        {/* Border Wrapper: Radius remains fixed, padding shrinks */}
        <div 
          className={styles.gradientBackground} 
          style={{ 
            padding: `${currentBorderSize}px`,
            opacity: seconds === 0 ? 0.2 : 1
          }}
        >
          {/* Inner Black Circle */}
          <div className={styles.innerCore}>
            <h2 className={styles.timerValue}>
              {seconds > 0 ? seconds : "0"}
            </h2>
            <span className={styles.statusLabel}>
              {seconds === 0 ? "Ended" : "Running"}
            </span>
          </div>
        </div>

      </div>

      <button onClick={reset} className={styles.restartBtn}>
        RESTART
      </button>
    </div>
  );
};

export default GradientTimer;