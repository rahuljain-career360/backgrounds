import React from 'react';
import styles from './CyberHubBackground.module.css';

export const CyberHubBackground: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 1. Rotating Background Rays */}
      <div className={styles.rayContainer}></div>

      {/* 2. Scanning Effect */}
      <div className={styles.scanner}></div>

      {/* 3. Decorative HUD Elements */}
      <div className={`${styles.hudCircle} ${styles.hub1}`}></div>
      <div className={`${styles.hudCircle} ${styles.hub2}`}></div>
    </div>
  );
};