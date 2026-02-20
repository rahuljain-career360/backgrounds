import React, { useMemo } from 'react';
import './StarField.css';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
}

const StarField: React.FC = () => {
  const starCount = 150;

  const stars = useMemo(() => {
    const tempStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      tempStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3, // Random size between 0 and 3px
        duration: `${2 + Math.random() * 4}s`, // Varied speed for parallax
        delay: `${Math.random() * 5}s`,
      });
    }
    return tempStars;
  }, []);

  return (
    <div className="star-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;