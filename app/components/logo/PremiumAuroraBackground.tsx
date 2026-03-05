import React from 'react';
import { motion } from 'framer-motion';

const PremiumAuroraBackground: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Layer 1: Base Ambient Color */}
      <div style={styles.ambientBase} />

      {/* Layer 2: Animated High-Definition Blobs */}
      <div style={styles.blobContainer}>
        {/* Deep Purple Blob */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, background: '#4c1d95', top: '10%', left: '15%' }}
        />
        
        {/* Electric Blue Blob */}
        <motion.div
          animate={{
            x: [0, -150, 50, 0],
            y: [0, 150, -50, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ ...styles.blob, background: '#1e40af', bottom: '15%', right: '10%', width: '600px', height: '600px' }}
        />

        {/* Soft Pink Highlight */}
        <motion.div
          animate={{
            x: [0, 200, -100, 0],
            y: [0, 50, 150, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, background: '#831843', top: '40%', left: '40%', opacity: 0.4 }}
        />
      </div>

      {/* Layer 3: The Glass Overlay (The "Premium" Secret) */}
      <div style={styles.glassOverlay}>
        <div style={styles.grainTexture} />
      </div>

      {/* Layer 4: Content */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 style={styles.title}>AURORA</h1>
          <div style={styles.divider} />
          <p style={styles.subtitle}>2026 High-Fidelity Render</p>
        </motion.div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ambientBase: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #000 100%)',
    zIndex: 1,
  },
  blobContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    filter: 'blur(80px)', // High blur for that smooth aurora look
  },
  blob: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    opacity: 0.6,
    mixBlendMode: 'screen',
  },
  glassOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 3,
    // Layered glass effect
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    backdropFilter: 'contrast(120%) brightness(110%)',
  },
  grainTexture: {
    position: 'absolute',
    inset: 0,
    opacity: 0.15,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: '"Inter", sans-serif',
  },
  title: {
    fontSize: '6vw',
    fontWeight: 200,
    letterSpacing: '1.5rem',
    margin: 0,
    textIndent: '1.5rem',
    opacity: 0.9,
  },
  divider: {
    width: '60px',
    height: '1px',
    background: 'white',
    margin: '20px auto',
    opacity: 0.3,
  },
  subtitle: {
    fontSize: '0.9rem',
    letterSpacing: '4px',
    opacity: 0.4,
    textTransform: 'uppercase',
  }
};

export default PremiumAuroraBackground;