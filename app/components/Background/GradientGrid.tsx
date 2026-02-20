"use client";
import React, { useState, useEffect, useMemo } from 'react';
import styles from './GradientGrid.module.css';

export const GradientGrid = () => {
  const totalBoxes = 512; // Exactly 512 boxes as requested
  const [tick, setTick] = useState(0);

  // Generate 512 unique gradients once
  const colorPalette = useMemo(() => {
    return Array.from({ length: totalBoxes }).map(() => ({
      c1: `hsl(${Math.random() * 360}, 80%, 60%)`, // Random vibrant color
      c2: `hsl(${Math.random() * 360}, 80%, 40%)`, // Another random color
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000); // Transitions every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {colorPalette.map((colors, i) => {
        // Even-Odd logic with a twist: 
        // We add 'tick' so they keep swapping every second
        const isActive = (i + tick) % 2 === 0;

        return (
          <div 
            key={i} 
            className={`${styles.box} ${isActive ? styles.active : styles.inactive}`}
            style={{ 
              '--color-1': colors.c1, 
              '--color-2': colors.c2 
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};