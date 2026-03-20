"use client"
import React, { useEffect, useRef, useState } from 'react';
import './GlassBubbles.css';

interface Bubble {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  gradient: string;
}

const GlassBubbles: React.FC = () => {
  const [bubblesData, setBubblesData] = useState<Bubble[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const numBubbles = 75; // Zyada balls
    
    // Bubble gradients: Glassy and Vibrant
    const gradients = [
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 0, 150, 0.4) 50%, rgba(100, 0, 255, 0.7) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 212, 255, 0.4) 50%, rgba(9, 9, 121, 0.7) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(121, 255, 154, 0.4) 50%, rgba(0, 150, 100, 0.7) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 200, 0, 0.4) 50%, rgba(255, 80, 0, 0.7) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0.4) 100%)'
    ];

    const initialBubbles: Bubble[] = Array.from({ length: numBubbles }).map((_, i) => ({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * 3, // Speed
      dy: (Math.random() - 0.5) * 3,
      size: Math.random() * 80 + 40, // 40px to 120px
      gradient: gradients[i % gradients.length],
    }));

    setBubblesData(initialBubbles);
    let animationBubbles = [...initialBubbles];

    const animate = () => {
      animationBubbles.forEach((bubble, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Bounce wall collision
        if (bubble.x + bubble.size > window.innerWidth || bubble.x < 0) bubble.dx *= -1;
        if (bubble.y + bubble.size > window.innerHeight || bubble.y < 0) bubble.dy *= -1;

        el.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
      });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="glass-container">
      <div className="center-content">
        <h1>Premium Glass Orbs</h1>
        <p>Dynamic 3D Bubbles</p>
      </div>
      
      {bubblesData.map((bubble, i) => (
        <div
          key={i}
          ref={(el) => { elementsRef.current[i] = el; }}
          className="glass-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: bubble.gradient,
            boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.2), 5px 10px 20px rgba(0,0,0,0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default GlassBubbles;