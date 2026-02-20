"use client";

import React, { useEffect, useState } from "react";
import "./AnimatedDarkBackground.css";

interface Circle {
  id: number;
  size: number;
  left: number;
  duration: number;
}

const AnimatedDarkBackground: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCircle: Circle = {
        id: Date.now(),
        size: Math.random() * 120 + 60,
        left: Math.random() * 100,
        duration: Math.random() * 6 + 6,
      };

      setCircles((prev) => [...prev, newCircle]);

      setTimeout(() => {
        setCircles((prev) =>
          prev.filter((circle) => circle.id !== newCircle.id)
        );
      }, newCircle.duration * 1000);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-container">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="circle"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.left}%`,
            animationDuration: `${circle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedDarkBackground;
