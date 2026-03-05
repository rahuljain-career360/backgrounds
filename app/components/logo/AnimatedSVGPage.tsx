import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSVGPage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Background SVG */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={styles.svgBackground}
      >
        {/* Animated Blob 1 */}
        <motion.path
          initial={{ d: "M200,500 Q300,300 500,200 T800,500 T500,800 T200,500" }}
          animate={{
            d: [
              "M200,500 Q300,300 500,200 T800,500 T500,800 T200,500",
              "M250,450 Q400,200 600,300 T750,550 T450,750 T250,450",
              "M200,500 Q300,300 500,200 T800,500 T500,800 T200,500"
            ],
            fill: ["#4f46e5", "#7c3aed", "#4f46e5"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Floating Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r={Math.random() * 20 + 10}
            fill="rgba(255, 255, 255, 0.2)"
            animate={{
              x: [Math.random() * 1000, Math.random() * 1000],
              y: [Math.random() * 1000, Math.random() * 1000],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>

      {/* Content Layer */}
      <div style={styles.content}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={styles.title}
        >
          SVG Animation
        </motion.h1>
        <p style={styles.subtitle}>React + Framer Motion + SVG Paths</p>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={styles.button}
        >
          Explore More
        </motion.button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui, sans-serif',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: '4rem',
    margin: 0,
    fontWeight: '800',
    textShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.8,
    marginTop: '10px',
  },
  button: {
    marginTop: '30px',
    padding: '12px 30px',
    fontSize: '1rem',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#0f172a',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
  }
};

export default AnimatedSVGPage;