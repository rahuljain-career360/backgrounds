import React from 'react';
import styles from './PremiumBackground.module.css';

interface BackgroundProps {
  title?: string;
  price?: string;
}

export const PremiumBackground: React.FC<BackgroundProps> = ({ 
  title = "Abstract Dream #01", 
  price = "$4.99" 
}) => {
  return (
    <div className={styles.backgroundContainer}>
      {/* Animated Background Elements */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
    </div>
  );
};