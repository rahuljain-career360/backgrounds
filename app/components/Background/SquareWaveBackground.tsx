import React from 'react';
import styles from './SquareWaveBackground.module.css';

export const SquareWaveBackground: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Three layers of waves for depth */}
      <div className={styles.waveWrapper} style={{ animationDuration: '8s', opacity: 0.2 }}></div>
      <div className={styles.waveWrapper} style={{ animationDuration: '12s', top: '20px', opacity: 0.1 }}></div>
      
     
    </div>
  );
};