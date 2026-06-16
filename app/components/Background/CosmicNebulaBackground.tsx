"use client"
import React from 'react';
import styles from './CosmicNebulaBackground.module.css';

const stars = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() > 0.9 ? 'starGlow' : Math.random() > 0.7 ? 'starLarge' : 'star',
  duration: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 5}s`,
}));

const shootingStars = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  left: `${60 + Math.random() * 40}%`,
  top: `${Math.random() * 30}%`,
  duration: `${3 + Math.random() * 3}s`,
  delay: `${i * 4 + Math.random() * 3}s`,
}));

const CosmicNebulaBackground: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nebula}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={`${styles.blob} ${styles.blob4}`} />
      </div>

      <div className={styles.stars}>
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${styles.star} ${styles[star.size]}`}
            style={{
              left: star.left,
              top: star.top,
              '--duration': star.duration,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className={styles.shootingStar}
            style={{
              left: s.left,
              top: s.top,
              '--shoot-duration': s.duration,
              '--shoot-delay': s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.grid} />
      <div className={styles.noise} />

      <div className={styles.content}>
        <span className={styles.badge}>Explore the Universe</span>
        <h1 className={styles.heading}>
          Beyond the <br />
          <span className={styles.gradient}>Cosmic Horizon</span>
        </h1>
        <p className={styles.subtitle}>
          A journey through stars, nebulae, and the infinite void.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>Launch Explorer</button>
          <button className={styles.btnSecondary}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default CosmicNebulaBackground;
