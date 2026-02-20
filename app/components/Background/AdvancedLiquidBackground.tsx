import React from 'react';
import styles from './AdvancedLiquidBackground.module.css';

export const AdvancedLiquidBackground = () => {
  return (
    <div className={styles.container}>
      {/* Background Shapes Layer */}
      <div className={styles.liquidWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>
    </div>
  );
};