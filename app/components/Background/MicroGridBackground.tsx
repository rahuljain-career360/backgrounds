"use client";
import React, { useState, useEffect, useMemo } from 'react';
import styles from './MicroGrid.module.css';

export const MicroGridBackground = () => {
  const [isEvenTurn, setIsEvenTurn] = useState(true);

  // Screen size ke hisaab se calculate karein kitne boxes chahiye
  // 5px box + 1px gap = 6px total space per box
  const boxCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      const cols = Math.ceil(window.innerWidth / 6);
      const rows = Math.ceil(window.innerHeight / 6);
      return cols * rows;
    }
    return 1000; // Fallback for SSR
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEvenTurn(prev => !prev);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {Array.from({ length: boxCount }).map((_, i) => {
        const isActive = isEvenTurn ? i % 2 === 0 : i % 2 !== 0;

        return (
          <div 
            key={i} 
            className={`${styles.box} ${isActive ? styles.active : ''}`}
          />
        );
      })}
    </div>
  );
};