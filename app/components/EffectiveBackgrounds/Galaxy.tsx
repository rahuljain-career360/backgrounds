import React, { useMemo } from 'react';
import './Galaxy.css';

interface Star {
  id: number;
  angle: number;       // Position in the circle
  distance: number;    // Distance from center
  size: number;
  duration: string;
  color: string;
}

const Galaxy: React.FC = () => {
  const starCount = 400;
  const colors = ['#61dafb', '#da70d6', '#b0c4de', '#ffffff'];

  const stars = useMemo(() => {
    const tempStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      tempStars.push({
        id: i,
        angle: Math.random() * 360,
        distance: 50 + Math.random() * 450, // Spread stars outward
        size: Math.random() * 3 + 1,
        duration: `${10 + Math.random() * 20}s`, // Slow, majestic rotation
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return tempStars;
  }, []);

  return (
    <div className="galaxy-viewport">
      <div className="galaxy-core" />
      <div className="nebula-cloud" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="galaxy-star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 8px ${star.color}`,
            // We use custom properties for the CSS animation to pick up
            '--angle': `${star.angle}deg`,
            '--distance': `${star.distance}px`,
            animationDuration: star.duration,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Galaxy;

