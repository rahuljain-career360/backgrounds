// components/AnimatedOrganicShapesBackground.tsx
import React from 'react';
import styles from './AnimatedOrganicShapesBackground.module.css';

interface AnimatedOrganicShapesBackgroundProps {
  children?: React.ReactNode; 
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const AnimatedOrganicShapesBackground: React.FC<AnimatedOrganicShapesBackgroundProps> = ({ 
  children,
 
}) => {
  return (
    <div className={styles.container}>
      {/* Animated Organic Shapes */}
      {/* Har shape ko ek unique class aur dynamic CSS variables se style kiya gaya hai */}
      <div className={`${styles.organicShape} ${styles.shape1}`}></div>
      <div className={`${styles.organicShape} ${styles.shape2}`}></div>
      <div className={`${styles.organicShape} ${styles.shape3}`}></div>
      <div className={`${styles.organicShape} ${styles.shape4}`}></div>
      {/* More shapes can be added here with unique classes */}

      {/* Content Card with Glassmorphism and Gradient Border */}
      <div className={styles.contentCard}>
        {children ? (
          children
        ) : (
          <>
          
          </>
        )}
      </div>
    </div>
  );
};