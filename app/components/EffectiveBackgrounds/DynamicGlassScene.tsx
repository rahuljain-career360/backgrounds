"use client"
import React, { useEffect, useRef, useState } from 'react';
import './DynamicGlass.css';

interface Shape {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  type: 'circle' | 'square';
  gradient: string;
  rotation: number;
  rotSpeed: number;
}

const DynamicGlassScene: React.FC = () => {
  const [shapesData, setShapesData] = useState<Shape[]>([]);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const numShapes = 30; // 30 total elements for a full page
  const gradients = [
      'linear-gradient(135deg, #ff0080 0%, #7928ca 100%)', // Neon Purple-Pink
      'linear-gradient(135deg, #0070f3 0%, #00dfd8 100%)', // Electric Blue
      'linear-gradient(135deg, #f9cb28 0%, #ff4d4d 100%)', // Sunset Orange
      'linear-gradient(135deg, #7928ca 0%, #ff0080 100%)', // Deep Violet
      'linear-gradient(135deg, #00dfd8 0%, #0070f3 100%)', // Cyan-Blue
      'linear-gradient(135deg, #50e3c2 0%, #009688 100%)', // Seafoam
      'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)', // Fire
      'linear-gradient(135deg, #3291ff 0%, #000000 100%)', // Midnight Blue
      'linear-gradient(135deg, #7b61ff 0%, #00d1ff 100%)', // Aurora
      'linear-gradient(135deg, #ff00d6 0%, #ff4d4d 100%)', // Hot Pink
      'linear-gradient(135deg, #12c2e9 0%, #c471ed 100%, #f64f59 100%)', // JShine
      'radial-gradient(circle at 30% 30%, #ffffff 0%, #8a2be2 100%)' // Pearl Purple
    ];
    const initialShapes: Shape[] = Array.from({ length: numShapes }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      size: Math.random() * 80 + 40,
      type: i % 2 === 0 ? 'circle' : 'square', // Half circles, half squares
      gradient: gradients[i % gradients.length],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
    }));

    setShapesData(initialShapes);
    let animationShapes = [...initialShapes];

    const animate = () => {
      animationShapes.forEach((shape, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        // Position Logic
        shape.x += shape.dx;
        shape.y += shape.dy;
        shape.rotation += shape.rotSpeed;

        // Boundary Check
        if (shape.x + shape.size > window.innerWidth || shape.x < 0) shape.dx *= -1;
        if (shape.y + shape.size > window.innerHeight || shape.y < 0) shape.dy *= -1;

        // Apply Transform
        el.style.transform = `translate3d(${shape.x}px, ${shape.y}px, 0) rotate(${shape.rotation}deg)`;
      });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="scene-container">
      <div className="glass-card">
        <h1>DYNAMIC MESH</h1>
        <p>Mixed Geometry Variant</p>
      </div>
      
      {shapesData.map((shape, i) => (
        <div
          key={i}
          ref={(el) => { elementsRef.current[i] = el; }}
          className={`shape ${shape.type}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            background: shape.gradient,
          }}
        />
      ))}
    </div>
  );
};

export default DynamicGlassScene;