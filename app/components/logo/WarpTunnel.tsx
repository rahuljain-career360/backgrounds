import React from 'react';
import { motion } from 'framer-motion';

const WarpTunnel: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Layer 1: The Infinite Tunnel */}
      <div style={styles.scene}>
        <motion.div 
          animate={{ 
            translateZ: ['0px', '200px'],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={styles.tunnelContainer}
        >
          {/* Wall 1: Top */}
          <div style={{ ...styles.wall, ...styles.wallTop }} />
          {/* Wall 2: Bottom */}
          <div style={{ ...styles.wall, ...styles.wallBottom }} />
          {/* Wall 3: Left */}
          <div style={{ ...styles.wall, ...styles.wallLeft }} />
          {/* Wall 4: Right */}
          <div style={{ ...styles.wall, ...styles.wallRight }} />
        </motion.div>
      </div>

      {/* Layer 2: Central Light Source */}
      <div style={styles.coreGlow} />

      {/* Layer 3: HUD Overlay (High-End HUD) */}
      <div style={styles.hudWrapper}>
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={styles.cornerTopLeft} 
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          style={styles.cornerBottomRight} 
        />
      </div>

      {/* Content */}
      <div style={styles.content}>
        <motion.h1 
          initial={{ letterSpacing: '2px', opacity: 0 }}
          animate={{ letterSpacing: '18px', opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={styles.heroText}
        >
          WARP SPEED
        </motion.h1>
        <p style={styles.statusText}>ENGINE STATUS: OVERDRIVE</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '800px',
  },
  scene: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
  },
  tunnelContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
  },
  wall: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '100px 100px',
    boxShadow: 'inset 0 0 100px rgba(0, 255, 255, 0.05)',
  },
  wallTop: { transform: 'rotateX(90deg) translateZ(50vh)' },
  wallBottom: { transform: 'rotateX(-90deg) translateZ(50vh)' },
  wallLeft: { transform: 'rotateY(-90deg) translateZ(50vw)' },
  wallRight: { transform: 'rotateY(90deg) translateZ(50vw)' },
  
  coreGlow: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
    filter: 'blur(50px)',
    zIndex: 2,
  },
  hudWrapper: {
    position: 'absolute',
    inset: '50px',
    zIndex: 10,
    pointerEvents: 'none',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderTop: '2px solid cyan',
    borderLeft: '2px solid cyan',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '40px',
    height: '40px',
    borderBottom: '2px solid cyan',
    borderRight: '2px solid cyan',
  },
  content: {
    position: 'relative',
    zIndex: 100,
    textAlign: 'center',
    color: '#fff',
    fontFamily: '"Syncopate", sans-serif',
  },
  heroText: {
    fontSize: '5vw',
    fontWeight: 900,
    margin: 0,
    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
  },
  statusText: {
    fontSize: '12px',
    letterSpacing: '4px',
    opacity: 0.5,
    marginTop: '20px',
    color: 'cyan'
  }
};

export default WarpTunnel;