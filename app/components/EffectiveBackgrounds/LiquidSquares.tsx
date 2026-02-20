"use client"
import React, { useEffect, useRef, useState } from 'react';
import './LiquidSquares.css';

interface Square {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  gradient: string;
  rotation: number;
  rotSpeed: number;
}

const LiquidSquares: React.FC = () => {
  const [squares, setSquares] = useState<Square[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const count = 65;
    const gradients = [
      '#ff0080', '#7928ca', '#0070f3', '#00dfd8', '#f9cb28', '#ff4d4d',
      '#50e3c2', '#7b61ff', '#ff00d6', '#12c2e9', '#c471ed', '#f64f59', '#7b61ff', '#ff00d6', '#12c2e9', '#c471ed', '#f64f59'
    ];

    const initialData: Square[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      size: Math.random() * 80 + 60,
      gradient: gradients[i % gradients.length],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
    }));

    setSquares(initialData);
    let animationData = [...initialData];

    const animate = () => {
      animationData.forEach((sq, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        sq.x += sq.dx;
        sq.y += sq.dy;
        sq.rotation += sq.rotSpeed;

        if (sq.x + sq.size > window.innerWidth || sq.x < 0) sq.dx *= -1;
        if (sq.y + sq.size > window.innerHeight || sq.y < 0) sq.dy *= -1;

        el.style.transform = `translate3d(${sq.x}px, ${sq.y}px, 0) rotate(${sq.rotation}deg)`;
      });
      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="liquid-square-container">
      <div className="content-box">
        <h1>SQUARE LIQUID</h1>
        <p>Merging Geometry Variant</p>
      </div>

      {/* Gooey Engine for Squares */}
      <div className="gooey-engine">
        {squares.map((sq, i) => (
          <div
            key={sq.id}
            ref={(el) => { elementsRef.current[i] = el; }}
            className="liquid-square"
            style={{
              width: `${sq.size}px`,
              height: `${sq.size}px`,
              backgroundColor: sq.gradient,
            }}
          />
        ))}
      </div>

      {/* The Secret SVG Filter */}
      <svg className="svg-filter-hidden">
        <defs>
          <filter id="square-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LiquidSquares;