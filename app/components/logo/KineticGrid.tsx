import React from 'react';
import { motion } from 'framer-motion';

const KineticGrid: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Deep Shadow Overlay for Depth */}
      <div style={styles.vignette} />

      {/* 3D Perspective Wrapper */}
      <div style={styles.perspectiveWrapper}>
        <motion.div 
          initial={{ rotateX: '60deg', y: '-10%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={styles.gridFloor}
        >
          {/* Neon Grid Lines */}
          <div style={styles.gridLines} />
          
          {/* Moving Light Pulse */}
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={styles.lightPulse}
          />
        </motion.div>
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={styles.badge}>SYSTEM ACTIVE</div>
          <h1 style={styles.heroText}>KINETIC <br/> <span style={{color: '#3b82f6'}}>CORE</span></h1>
        </motion.div>
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
    perspective: '1000px',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 20%, #000 80%)',
    zIndex: 5,
    pointerEvents: 'none',
  },
  perspectiveWrapper: {
    position: 'absolute',
    width: '200%',
    height: '100%',
    top: '20%',
    left: '-50%',
    transformStyle: 'preserve-3d',
    zIndex: 1,
  },
  gridFloor: {
    width: '100%',
    height: '200%',
    position: 'relative',
    background: 'rgba(10, 10, 10, 1)',
  },
  gridLines: {
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  },
  lightPulse: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '150px',
    background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent)',
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: '"Syncopate", sans-serif', // Use a tech-style font if available
  },
  badge: {
    fontSize: '10px',
    letterSpacing: '5px',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    padding: '5px 15px',
    display: 'inline-block',
    borderRadius: '20px',
    marginBottom: '20px',
    color: '#3b82f6',
  },
  heroText: {
    fontSize: '5rem',
    fontWeight: 900,
    margin: 0,
    lineHeight: 0.9,
    letterSpacing: '-2px',
  }
};

export default KineticGrid;