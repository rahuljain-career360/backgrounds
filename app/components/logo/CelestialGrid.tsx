import React from 'react';
import { motion } from 'framer-motion';

const CelestialGrid: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Layer 1: Stars/Particles (Using SVG pattern for sharpness) */}
      <div style={styles.starsLayer} />

      {/* Layer 2: Deep Nebula Glows */}
      <div style={styles.nebulaContainer}>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)', top: '-20%', right: '10%' }}
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', bottom: '-20%', left: '5%' }}
        />
      </div>

      {/* Layer 3: 3D Perspective Grid */}
      <div style={styles.perspectiveSystem}>
        <div style={styles.gridFloor} />
      </div>

      {/* Layer 4: Floating Cyber-Frames (High Quality Design Elements) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={styles.floatingFrame}
      >
        <div style={styles.frameLine} />
        <div style={styles.frameContent}>
          <span style={styles.frameText}>COORD: 42.001 // STATUS: STABLE</span>
        </div>
      </motion.div>

      {/* Layer 5: Main Content */}
      <div style={styles.content}>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={styles.mainTitle}
        >
          CELESTIAL
        </motion.h1>
        <div style={styles.scanlineEffect} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#020205',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1200px',
  },
  starsLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    backgroundImage: `radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), 
                      radial-gradient(1.5px 1.5px at 40px 70px, #fff, rgba(0,0,0,0)),
                      radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0))`,
    backgroundSize: '150px 150px',
    opacity: 0.2,
  },
  nebulaContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    filter: 'blur(120px)',
  },
  glow: {
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    borderRadius: '50%',
  },
  perspectiveSystem: {
    position: 'absolute',
    inset: 0,
    zIndex: 3,
    transform: 'rotateX(65deg)',
    transformOrigin: 'center bottom',
  },
  gridFloor: {
    width: '200%',
    height: '200%',
    marginLeft: '-50%',
    backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '80px 80px',
    maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
  },
  floatingFrame: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  frameLine: {
    width: '120px',
    height: '1px',
    background: 'linear-gradient(90deg, #0ea5e9, transparent)',
  },
  frameText: {
    fontSize: '10px',
    color: '#0ea5e9',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    opacity: 0.8,
  },
  content: {
    position: 'relative',
    zIndex: 20,
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: 'clamp(3rem, 12vw, 8rem)',
    fontWeight: 900,
    color: 'white',
    margin: 0,
    letterSpacing: '1.5rem',
    textIndent: '1.5rem',
    background: 'linear-gradient(to bottom, #fff 50%, rgba(255,255,255,0.1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'system-ui, sans-serif',
  },
  scanlineEffect: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    opacity: 0.1,
  }
};

export default CelestialGrid;