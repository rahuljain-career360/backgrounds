
"use client";
import React, { useState, useEffect } from 'react';
import styles from './FlipMaster.module.css';

const FlipUnit = ({ value }: { value: number }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setPrevValue(value);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  // <p>1) Manage the all Money First When not money then atleast first 
  //   work on the which task that not use money 
  // </p>

  return (
    <div className={styles.flipUnit}>
      {/* Static Top (Next Value) */}
      <div className={styles.upper}>
        <span>{value}</span>
      </div>

      {/* Static Bottom (Current Value) */}
      <div className={styles.lower}>
        <span>{prevValue}</span>
      </div>

      {/* Flipping Top (Current Value moving to Next) */}
      <div className={`${styles.flipCard} ${isFlipping ? styles.animate : ''}`}>
        <span>{prevValue}</span>
      </div>
      
      {/* The back of the flipping card shows the next value */}
      {/* Note: Simplified for 2D, but for true 3D you'd need a 'back' face */}
    </div>
  );
};

export const FlipMaster = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => setCount(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  const tens = Math.floor(count / 10);
  const units = count % 10;

  return (
    <div className={styles.fullPage}>
      <div className={styles.flipContainer}>
        <FlipUnit value={tens} />
        <FlipUnit value={units} />
      </div>
    </div>
  );
};