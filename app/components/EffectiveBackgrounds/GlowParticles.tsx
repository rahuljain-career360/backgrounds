import React, { useMemo } from 'react';
import './GlowParticles.css';

const GlowParticles: React.FC = () => {
  const particleCount = 25; // Kam particles zyada premium lagte hain

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 150 + 50, // 50px se 200px (Bade soft blobs)
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${20 + Math.random() * 20}s`, // Bahut hi slow movement
      delay: `${Math.random() * -20}s`,
      // Light gradient colors
      color: i % 2 === 0 ? 'rgba(173, 216, 230, 0.3)' : 'rgba(221, 160, 221, 0.3)', 
    }));
  }, []);

  return (
    <div className="glow-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="glow-orb"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default GlowParticles;