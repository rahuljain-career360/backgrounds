"use client"
import React, { useEffect, useRef, useState } from 'react';
import './BouncingBlobs.css';

interface Blob {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

const BouncingBlobs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Blobs ka data store karne ke liye
  const [blobsData, setBlobsData] = useState<Blob[]>([]);
  // DOM elements ko track karne ke liye refs ka array
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const colors = ['#FF3E00', '#00E5FF', '#FFD600', '#76FF03', '#D500F9', '#FF0055'];
    const numBlobs = 15;
    
    // 1. Initial Data Setup
    const initialBlobs: Blob[] = Array.from({ length: numBlobs }).map((_, i) => ({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      size: Math.random() * 100 + 50,
      color: colors[i % colors.length],
    }));

    setBlobsData(initialBlobs);
    
    // Mutable copy for animation logic to avoid re-renders
    let animationBlobs = [...initialBlobs];

    const animate = () => {
      animationBlobs.forEach((blob, i) => {
        const el = elementsRef.current[i];
        if (!el) return;

        // Position update
        blob.x += blob.dx;
        blob.y += blob.dy;

        // Boundary Wall Collision
        if (blob.x + blob.size > window.innerWidth || blob.x < 0) {
          blob.dx *= -1;
        }
        if (blob.y + blob.size > window.innerHeight || blob.y < 0) {
          blob.dy *= -1;
        }

        // Direct DOM manipulation (faster for animations)
        el.style.transform = `translate3d(${blob.x}px, ${blob.y}px, 0)`;
      });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bouncing-container" ref={containerRef}>
      <div className="overlay-content">
        <h1>Fixed Variant New</h1>
        <p>No More Flex</p>
      </div>
      
      {blobsData.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { elementsRef.current[i] = el; }}
          className="bouncing-blob"
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            backgroundColor: blob.color,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingBlobs;