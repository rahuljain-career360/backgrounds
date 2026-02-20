import React from 'react';
import styles from './SplitHorizonBackground.module.css';

export const SplitHorizonBackground: React.FC = () => {
  // 20 lines generate kar rahe hain
  const lines = Array.from({ length: 20 });

  return (
    <div className={styles.container}>
      {/* Background Lines Loop */}
      <div className={styles.linesContainer}>
        {lines.map((_, i) => (
          <div 
            key={i} 
            className={styles.vLine} 
            style={{ 
              '--duration': `${Math.random() * 5 + 3}s`, // Random speed
              '--delay': `${Math.random() * 5}s`         // Random start time
            } as React.CSSProperties}
          />
        ))}
      </div>

     
    </div>
  );
};