"use client";
import React, { useState, useEffect, useMemo } from 'react';
import styles from './BigGradientGrid.module.css';

export const BigGradientGrid = () => {
  const totalBoxes = 512;
  const [tick, setTick] = useState(0);

  // 512 Unique Premium Gradients generate karte hain
  const colorPalette = useMemo(() => {
    return Array.from({ length: totalBoxes }).map(() => ({
      c1: `hsl(${Math.random() * 360}, 70%, 50%)`,
      c2: `hsl(${Math.random() * 360}, 80%, 30%)`,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1500); // 1.5 Seconds for a relaxed premium feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {colorPalette.map((colors, i) => {
        // Checkerboard Alternative logic
        const isActive = (i + tick) % 2 === 0;

        return (
          <div 
            key={i} 
            className={`${styles.box} ${isActive ? styles.active : ''}`}
            style={{ 
              '--c1': colors.c1, 
              '--c2': colors.c2 
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};