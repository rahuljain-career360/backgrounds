import React, { useMemo } from 'react';
import './RainEffect.css';

interface RainDrop {
  id: number;
  left: string;
  duration: string;
  delay: string;
  opacity: number;
}

const RainEffect: React.FC = () => {
  const dropCount = 100; // Adjust for intensity

  // Memoize drops so they don't re-randomize on every re-render
  const drops = useMemo(() => {
    const tempDrops: RainDrop[] = [];
    for (let i = 0; i < dropCount; i++) {
      tempDrops.push({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${0.7 + Math.random() * 0.5}s`, // Speed variation
        delay: `${Math.random() * 2}s`,           // Staggered start
        opacity: Math.random() * 0.5 + 0.2,       // Depth effect
      });
    }
    return tempDrops;
  }, []);

  return (
    <div className="rain-container">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;