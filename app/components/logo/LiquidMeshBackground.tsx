import React from 'react';
import { motion } from 'framer-motion';

const LiquidMeshBackground: React.FC = () => {
  // Vibrant but professional color palette
  const colors = ["#4F46E5", "#7C3AED", "#EC4899", "#06B6D4"];

  return (
    <div style={styles.container}>
      {/* Liquid Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" 
            result="goo" 
          />
        </filter>
      </svg>

      <div style={styles.gradientWrapper}>
        {colors.map((color, i) => (
          <motion.div
            key={i}
            style={{
              ...styles.blob,
              backgroundColor: color,
            }}
            animate={{
              x: [
                Math.random() * 200 - 100, 
                Math.random() * 400 - 200, 
                Math.random() * 200 - 100
              ],
              y: [
                Math.random() * 200 - 100, 
                Math.random() * 400 - 200, 
                Math.random() * 200 - 100
              ],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Optional: Subtle Noise Overlay for Texture */}
      <div style={styles.noiseOverlay} />

      {/* Foreground Content */}
      <div style={styles.content}>
        <h1 style={styles.heroText}>Deep Liquid</h1>
        <p style={styles.subText}>Ultra-high quality mesh animation</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#020617', // Dark slate background
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    filter: 'url(#goo)', // Applying the SVG Liquid Filter
    opacity: 0.7,
  },
  blob: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    top: '25%',
    left: '30%',
    mixBlendMode: 'screen', // This blends colors beautifully
    filter: 'blur(40px)',
  },
  noiseOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    opacity: 0.05,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
  },
  heroText: {
    fontSize: '5rem',
    fontWeight: 900,
    letterSpacing: '-2px',
    margin: 0,
    background: 'linear-gradient(to bottom, #fff, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subText: {
    fontSize: '1.2rem',
    opacity: 0.5,
    marginTop: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  }
};

export default LiquidMeshBackground;