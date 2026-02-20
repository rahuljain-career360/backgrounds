import React, { useMemo } from 'react';
import './ElectricityEffect.css';

const ElectricityEffect: React.FC = () => {
  const lineCount = 20; // Itni lines kaafi hain chaos create karne ke liye

  const lines = useMemo(() => {
    return Array.from({ length: lineCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 100 + 50}px`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.1 + Math.random() * 0.2}s`, // Fast flickering
    }));
  }, []);

  return (
    <div className="electricity-wrapper">
      <div className="glow-overlay" />
      {lines.map((line) => (
        <div
          key={line.id}
          className="electric-line"
          style={{
            left: line.left,
            height: line.height,
            animationDelay: line.delay,
            animationDuration: line.duration,
          }}
        />
      ))}
      <div className="content-shield" />
    </div>
  );
};

export default ElectricityEffect;