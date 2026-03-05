"use client"
import React, { useEffect, useRef, useState } from 'react';
import './TrendyGlassBubbles.css';

interface Bubble {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  borderColor: string;
}

const TrendyGlassBubbles: React.FC = () => {
  const [bubblesData, setBubblesData] = useState<Bubble[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const numBubbles = 45; 
    
    // Trendy Colors and their matching border colors
    const themes = [
      { bg: 'rgba(0, 112, 243, 0.15)', border: 'rgba(22, 120, 233, 0.4)' },   // Blue
      { bg: 'rgba(255, 0, 128, 0.15)', border: 'rgba(255, 0, 128, 0.4)' },  // Pink
      { bg: 'rgba(255, 77, 77, 0.15)', border: 'rgba(255, 77, 77, 0.4)' },   // Red
      { bg: 'rgba(121, 40, 202, 0.15)', border: 'rgba(147, 84, 209, 0.4)' }, // Purple
      { bg: 'rgba(0, 223, 216, 0.15)', border: 'rgba(0, 223, 216, 0.4)' }    // Cyan
    ];

    const initialBubbles: Bubble[] = Array.from({ length: numBubbles }).map((_, i) => {
      const theme = themes[i % themes.length];
      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 120 + 100,
        color: theme.bg,
        borderColor: theme.border
      };
    });

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
    <div className="trendy-wrapper">
      <div className="hero-section">
        <h1 className="main-title">Modern Glass</h1>
        <p className="sub-title">Gradient Borders • Pure White Canvas</p>
      </div>
      
      {bubblesData.map((bubble, i) => (
        <div
          key={bubble.id}
          ref={(el) => { elementsRef.current[i] = el; }}
          className="glass-orb"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.color,
            border: `1.5px solid ${bubble.borderColor}`,
            boxShadow: `0 8px 32px 0 ${bubble.borderColor.replace('0.4', '0.1')}`,
          }}
        />
      ))}
    </div>
  );
};

export default TrendyGlassBubbles;