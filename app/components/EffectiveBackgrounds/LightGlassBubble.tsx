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

const LightGlassBubble: React.FC = () => {
  const [bubblesData, setBubblesData] = useState<Bubble[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const numBubbles = 60; // Thoda optimize rakha hai performance ke liye
    
    // Transparent Glassy Gradients - Alpha (0.1 - 0.3) rakha hai transparency ke liye
    const gradients = [
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, rgba(255, 0, 150, 0.1) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, rgba(0, 212, 255, 0.1) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, rgba(121, 255, 154, 0.1) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.02) 70%, rgba(255, 255, 255, 0.1) 100%)'
    ];

    const initialBubbles: Bubble[] = Array.from({ length: numBubbles }).map((_, i) => ({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      size: Math.random() * 100 + 40,
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
        <h1>Crystal Mesh</h1>
        <p>Light Transparent Orbs</p>
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
          }}
        />
      ))}
    </div>
  );
};

export default LightGlassBubble;