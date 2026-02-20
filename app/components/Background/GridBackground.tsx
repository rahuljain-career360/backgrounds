"use client";
import React, { useState, useEffect } from 'react';
import styles from './GridBackground.module.css';

export const AutoGridBackground = () => {
  const [isEvenTurn, setIsEvenTurn] = useState(true);
  // Hum kaafi saare boxes rakhenge taaki poori screen cover ho jaye
  const totalBoxes = 200; 

  useEffect(() => {
    const interval = setInterval(() => {
      // Har second state flip hogi: true -> false -> true
      setIsEvenTurn(prev => !prev);
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {Array.from({ length: totalBoxes }).map((_, i) => {
        // Alternative logic: 
        // Agar Even turn hai toh even index wale active honge
        // Agar Odd turn hai toh odd index wale active honge
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