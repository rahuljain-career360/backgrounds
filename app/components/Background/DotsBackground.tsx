import React from 'react';
import styles from './DotsBackground.module.css';

export const DotsBackground: React.FC = () => {
  return (
    <div className={styles.dotsWrapper}>
      {/* Is div ke andar tum apna content daal sakte ho 
         ya isko sirf background ki tarah use kar sakte ho.
      */}
      <div className={styles.content}>
        {/* Tumhara text ya components yahan aayenge */}
      </div>
    </div>
  );
};