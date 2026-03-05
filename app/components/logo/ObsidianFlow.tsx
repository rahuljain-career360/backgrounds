import React from 'react';
import { motion } from 'framer-motion';

const ObsidianFlow: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Layer 1: Grainy Base (Using Inline SVG for zero dependencies/errors) */}
      <div style={styles.grainBase} />

      {/* Layer 2: Deep Glows */}
      <div style={styles.glowContainer}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', top: '-10%', left: '10%' }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ ...styles.glow, background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', bottom: '-20%', right: '5%' }}
        />
      </div>

      {/* Layer 3: Floating Glass Orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh' }}
          animate={{ 
            y: '-30vh',
            rotate: 360,
          }}
          transition={{ 
            duration: 20 + i * 7, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 3 
          }}
          style={{
            ...styles.glassOrb,
            left: `${20 + i * 30}%`, // Moved outside initial for stability
            width: `${150 + i * 100}px`,
            height: `${150 + i * 100}px`,
          }}
        />
      ))}

      {/* Layer 4: Minimalist Centerpiece */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, letterSpacing: '2px' }} // Fixed: 'tracking' changed to 'letterSpacing'
          animate={{ opacity: 1, letterSpacing: '12px' }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <h1 style={styles.mainText}>OBSIDIAN</h1>
          <p style={styles.subText}>CRAFTED WITH PRECISION • 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
  grainBase: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    opacity: 0.15,
    pointerEvents: 'none',
    // High-fidelity Inline Noise SVG
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  },
  glowContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    filter: 'blur(100px)', // Slightly reduced blur for better performance
  },
  glow: {
    position: 'absolute',
    width: '600px', // Adjusted size for standard screens
    height: '600px',
    borderRadius: '50%',
  },
  glassOrb: {
    position: 'absolute',
    zIndex: 3,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  mainText: {
    fontSize: 'clamp(3rem, 10vw, 6rem)', // Responsive font size
    fontWeight: 100,
    margin: 0,
    background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1,
  },
  subText: {
    marginTop: '25px',
    fontSize: '0.8rem',
    fontWeight: 400,
    opacity: 0.4,
    letterSpacing: '4px',
  }
};

export default ObsidianFlow;