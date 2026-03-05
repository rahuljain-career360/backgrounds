import React from 'react';
import { motion } from 'framer-motion';

const EventHorizon: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* SVG Filter for Liquid Distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1">
            <animate attributeName="baseFrequency" dur="30s" values="0.01;0.015;0.01" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="80" />
        </filter>
      </svg>

      {/* Background Glows (Blurred & Distorted) */}
      <div style={styles.distortionLayer}>
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #ff0055 0%, transparent 60%)', top: '10%', left: '10%' }}
        />
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.3, 1, 1.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #4400ff 0%, transparent 60%)', bottom: '10%', right: '10%' }}
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #00d4ff 0%, transparent 60%)', top: '40%', left: '40%', width: '400px' }}
        />
      </div>

      {/* Glass Overlay for High Fidelity Finish */}
      <div style={styles.overlay}>
        <div style={styles.scanlines} />
      </div>

      {/* Content */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "circOut" }}
        >
          <h2 style={styles.badge}>QUANTUM FLOW</h2>
          <h1 style={styles.title}>HORIZON</h1>
          <p style={styles.footerText}>SIMULATED ENVIRONMENT // REV-04</p>
        </motion.div>
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
  },
  distortionLayer: {
    position: 'absolute',
    inset: '-10%',
    width: '120%',
    height: '120%',
    filter: 'url(#liquid-filter) blur(60px)', // The magic happens here
    opacity: 0.6,
  },
  glow: {
    position: 'absolute',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    mixBlendMode: 'screen',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 5,
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
    backdropFilter: 'brightness(1.1) contrast(1.2)',
  },
  scanlines: {
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)`,
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: '"Inter", sans-serif',
  },
  badge: {
    fontSize: '12px',
    letterSpacing: '8px',
    opacity: 0.5,
    marginBottom: '10px',
    fontWeight: 300,
  },
  title: {
    fontSize: 'clamp(4rem, 15vw, 8rem)',
    fontWeight: 900,
    margin: 0,
    letterSpacing: '-5px',
    background: 'linear-gradient(to bottom, #fff, #444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 0.8,
  },
  footerText: {
    marginTop: '40px',
    fontSize: '10px',
    letterSpacing: '4px',
    opacity: 0.3,
  }
};

export default EventHorizon;