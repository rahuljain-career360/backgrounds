import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const NeuralPulse: React.FC = () => {
  // 20 unique streams for the background
  const streams = Array.from({ length: 25 });

  return (
    <div style={styles.container}>
      {/* Background Noise Layer */}
      <div style={styles.noise} />

      {/* Cyber Grid Base */}
      <div style={styles.gridBase} />

      {/* Animated Data Streams */}
      <div style={styles.streamContainer}>
        {streams.map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ 
              y: "100vh", 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              ...styles.stream,
              left: `${(100 / streams.length) * i}%`,
              // Random brightness for each stream
              filter: `drop-shadow(0 0 8px rgba(0, 242, 255, ${Math.random() * 0.5}))`,
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={styles.statusBadge}>
            <span style={styles.pulseDot} />
            ENCRYPTED CONNECTION
          </div>
          <h1 style={styles.heroText}>NEURAL<br/><span style={styles.blueText}>PULSE</span></h1>
          <p style={styles.subText}>V.2026 // SYSTEM CORE ACTIVE</p>
        </motion.div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#020205',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
  },
  noise: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    opacity: 0.05,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  },
  gridBase: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    backgroundImage: `linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px), 
                      linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px)`,
    backgroundSize: '50px 50px',
  },
  streamContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 3,
  },
  stream: {
    position: 'absolute',
    width: '1.5px',
    height: '30vh',
    background: 'linear-gradient(to bottom, transparent, #00f2ff, transparent)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#fff',
  },
  statusBadge: {
    fontSize: '10px',
    letterSpacing: '3px',
    color: '#00f2ff',
    border: '1px solid rgba(0, 242, 255, 0.3)',
    padding: '6px 15px',
    borderRadius: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    background: 'rgba(0, 242, 255, 0.05)',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#00f2ff',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00f2ff',
  },
  heroText: {
    fontSize: 'clamp(3rem, 10vw, 6rem)',
    fontWeight: 900,
    margin: 0,
    lineHeight: 0.9,
    letterSpacing: '-2px',
  },
  blueText: {
    color: '#00f2ff',
    textShadow: '0 0 30px rgba(0, 242, 255, 0.5)',
  },
  subText: {
    marginTop: '20px',
    fontSize: '0.8rem',
    opacity: 0.4,
    letterSpacing: '5px',
  }
};

export default NeuralPulse;