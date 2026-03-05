"use client"
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const PremiumCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse positions tracker
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid movement
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transformation logic for 3D rotation
  // -15 to 15 degree rotation based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate relative position (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={styles.wrapper}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...styles.card,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shine/Glare Effect Overlay */}
        <motion.div 
          style={{
            ...styles.glare,
            background: useTransform(
              mouseXSpring, 
              [-0.5, 0.5], 
              ["radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)", 
               "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 70%)"]
            )
          }}
        />

        <div style={{ ...styles.content, transform: "translateZ(50px)" }}>
          <div style={styles.chip} />
          <h2 style={styles.cardType}>NEURAL NODE</h2>
          <div style={styles.number}>**** **** **** 2026</div>
          <div style={styles.footer}>
            <div>
              <p style={styles.label}>HOLDER</p>
              <p style={styles.value}>GEMINI USER</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={styles.label}>EXPIRES</p>
              <p style={styles.value}>12/99</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
    perspective: '1000px', // Crucial for 3D depth
  },
  card: {
    width: '400px',
    height: '250px',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  glare: {
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  content: {
    padding: '30px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
    fontFamily: '"JetBrains Mono", monospace',
  },
  chip: {
    width: '50px',
    height: '40px',
    background: 'linear-gradient(135deg, #ffd700, #b8860b)',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  cardType: { fontSize: '14px', letterSpacing: '4px', opacity: 0.6 },
  number: { fontSize: '22px', letterSpacing: '2px', margin: '20px 0' },
  footer: { display: 'flex', justifyContent: 'space-between' },
  label: { fontSize: '10px', opacity: 0.5, marginBottom: '4px' },
  value: { fontSize: '14px', fontWeight: 'bold' }
};

export default PremiumCard;