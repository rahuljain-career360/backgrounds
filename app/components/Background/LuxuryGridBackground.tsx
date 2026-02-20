"use client";
import React, { useState, useEffect } from 'react';
import styles from './LuxuryGrid.module.css';

export const LuxuryGridBackground = () => {
  const [isEvenTurn, setIsEvenTurn] = useState(true);
  // Grid density ke hisaab se boxes adjust karein
  const totalBoxes = 150; 

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEvenTurn(prev => !prev);
    }, 1500); // 1.5s for a more relaxed, premium feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {Array.from({ length: totalBoxes }).map((_, i) => {
        // Alternative Logic for Checkerboard
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