"use client"
import React, { useEffect, useRef, useState } from 'react';
import './ModernGlassBubbles.css';

interface Bubble {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  gradient: string;
}

const ModernGlassBubbles: React.FC = () => {
  const [bubblesData, setBubblesData] = useState<Bubble[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const numBubbles = 50; 
    
    // Trendy Neon Colors: Blue, Pink, Red, Purple (High transparency)
    const gradients = [
      'radial-gradient(circle at 30% 30%, rgba(0, 112, 243, 0.2), rgba(0, 112, 243, 0.05))', // Blue
      'radial-gradient(circle at 30% 30%, rgba(255, 0, 128, 0.2), rgba(255, 0, 128, 0.05))', // Pink
      'radial-gradient(circle at 30% 30%, rgba(255, 77, 77, 0.2), rgba(255, 77, 77, 0.05))',  // Red
      'radial-gradient(circle at 30% 30%, rgba(121, 40, 202, 0.2), rgba(121, 40, 202, 0.05))', // Purple
      'radial-gradient(circle at 30% 30%, rgba(0, 223, 216, 0.2), rgba(0, 223, 216, 0.05))'   // Cyan
    ];

    const initialBubbles: Bubble[] = Array.from({ length: numBubbles }).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 1.5, // Slow & Classy movement
      dy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 150 + 80, // Bigger bubbles for better look
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
    <div className="modern-container">
      <div className="main-content">
        <h1 className="hero-title">Trendy Minimal</h1>
        <p className="hero-subtitle">Clean Design • Vibrant Accents</p>
      </div>
      
      {bubblesData.map((bubble, i) => (
        <div
          key={i}
          ref={(el) => { elementsRef.current[i] = el; }}
          className="modern-bubble"
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

export default ModernGlassBubbles;