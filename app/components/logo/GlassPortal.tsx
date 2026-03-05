import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const GlassPortal: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Layer 1: Moving Nebula Blobs (Peeche ka Layer) */}
      <div style={styles.blobWrapper}>
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 150, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, background: 'linear-gradient(45deg, #ff00cc, #3333ff)', top: '10%', left: '10%' }}
        />
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [150, -50, 150],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, background: 'linear-gradient(45deg, #00dbde, #fc00ff)', bottom: '10%', right: '10%' }}
        />
      </div>

      {/* Layer 2: Interactive Glass Panes (Beech ka Layer) */}
      <div style={styles.glassSystem}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={styles.mainPortal}
        >
          {/* Chote Glass Squares jo portal ke sath ghumenge */}
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ ...styles.miniGlass, transform: `rotate(${i * 90}deg) translateY(-150px)` }} />
          ))}
        </motion.div>
      </div>

      {/* Layer 3: Central Content (Sabse upar) */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
        >
          <h1 style={styles.portalTitle}>PORTAL</h1>
          <div style={styles.divider} />
          <p style={styles.subText}>REFRACTIVE UI // GEN-5</p>
        </motion.div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050505',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blobWrapper: {
    position: 'absolute',
    inset: 0,
    filter: 'blur(60px)',
    zIndex: 1,
  },
  blob: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    opacity: 0.5,
  },
  glassSystem: {
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPortal: {
    width: '400px',
    height: '400px',
    borderRadius: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(25px) saturate(150%)', // Real glass refraction
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
  },
  miniGlass: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
  },
  portalTitle: {
    fontSize: '5rem',
    fontWeight: 900,
    letterSpacing: '20px',
    margin: 0,
    textIndent: '20px',
    background: 'linear-gradient(to bottom, #fff, #666)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  divider: {
    width: '100px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #fff, transparent)',
    margin: '20px auto',
  },
  subText: {
    fontSize: '0.8rem',
    letterSpacing: '5px',
    opacity: 0.4,
  }
};

export default GlassPortal;