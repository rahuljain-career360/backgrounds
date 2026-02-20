import React, { useMemo } from 'react';
import './FloatingParticles.css';

const FloatingParticles: React.FC = () => {
  const particleCount = 50; 

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4, // 4px se 12px (Ab bade dikhenge)
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 15}s`,
      delay: `${Math.random() * -20}s`,
    }));
  }, []);

  return (
    <div className="particle-viewport">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;