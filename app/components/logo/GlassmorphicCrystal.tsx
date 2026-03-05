import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const GlassmorphicCrystal: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Background Animated Blobs (Colors jo glass ke peeche chamkenge) */}
      <div style={styles.backgroundBlobs}>
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, backgroundColor: '#ff0080', top: '10%', left: '10%' }}
        />
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [100, -100, 100],
            scale: [1.2, 0.8, 1.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, backgroundColor: '#7928ca', bottom: '10%', right: '10%' }}
        />
        <motion.div
          animate={{
            y: [0, -200, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.blob, backgroundColor: '#0070f3', top: '40%', left: '40%' }}
        />
      </div>

      {/* Main Glassmorphic Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.glassCard}
      >
        {/* Shine/Reflective Line on the Glass */}
        <div style={styles.glassShine} />

        <div style={styles.content}>
          <div style={styles.iconBox}>
            <div style={styles.dot} />
            <span style={styles.iconText}>PREMIUM ACCESS</span>
          </div>
          
          <h1 style={styles.title}>GLASS <br/> <span style={styles.boldText}>MORPHISM</span></h1>
          
          <p style={styles.description}>
            Elevating UI with real-time refraction, multi-layered blur, and frosted glass aesthetics.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.glassButton}
          >
            Explore Design
          </motion.button>
        </div>
      </motion.div>

      {/* Subtle Floating Elements */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={styles.floatingCircle} 
      />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0a0a0a',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  backgroundBlobs: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    filter: 'blur(80px)',
  },
  blob: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    opacity: 0.4,
  },
  glassCard: {
    width: 'min(90%, 500px)',
    padding: '60px 40px',
    zIndex: 10,
    position: 'relative',
    borderRadius: '32px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(30px) saturate(160%) contrast(110%)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    textAlign: 'center',
  },
  glassShine: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent)',
    transform: 'rotate(25deg)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    color: 'white',
  },
  iconBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '8px 16px',
    borderRadius: '20px',
    marginBottom: '30px',
  },
  dot: {
    width: '8px',
    height: '8px',
    background: '#00f2ff',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00f2ff',
  },
  iconText: {
    fontSize: '11px',
    letterSpacing: '2px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '3rem',
    margin: 0,
    lineHeight: 1,
    fontWeight: 300,
    letterSpacing: '-1px',
  },
  boldText: {
    fontWeight: 800,
    background: 'linear-gradient(to right, #fff, #888)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    marginTop: '20px',
    fontSize: '1rem',
    lineHeight: '1.6',
    opacity: 0.6,
    padding: '0 20px',
  },
  glassButton: {
    marginTop: '40px',
    padding: '14px 40px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  floatingCircle: {
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(5px)',
    zIndex: 5,
  }
};

export default GlassmorphicCrystal;