"use client"
import React, { useEffect, useState } from 'react';
import './TropicalMesh.css';

const TropicalMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="tropical-container">
      <div className="tropical-wrapper">
        <div className="tropical-ball tropical-1"></div>
        <div className="tropical-ball tropical-2"></div>
        <div className="tropical-ball tropical-3"></div>
        <div className="tropical-ball tropical-4"></div>
        <div className="tropical-ball tropical-5"></div>
      </div>
      <div className="tropical-noise"></div>
      <div className="tropical-content">
        <div className="tropical-tag">PARADISE FOUND</div>
        <h1 className="tropical-title">
          Tropical <span>Vibes</span>
        </h1>
        <p className="tropical-desc">
          Lush vibrant mesh gradients inspired by tropical paradises.
        </p>
        <button className="tropical-btn">Escape Now</button>
      </div>
    </div>
  );
};

export default TropicalMesh;
