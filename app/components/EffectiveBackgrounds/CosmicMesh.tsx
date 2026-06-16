"use client"
import React, { useEffect, useState } from 'react';
import './CosmicMesh.css';

const CosmicMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="cosmic-container">
      <div className="cosmic-wrapper">
        <div className="cosmic-ball cosmic-1"></div>
        <div className="cosmic-ball cosmic-2"></div>
        <div className="cosmic-ball cosmic-3"></div>
        <div className="cosmic-ball cosmic-4"></div>
        <div className="cosmic-ball cosmic-5"></div>
        <div className="cosmic-ball cosmic-6"></div>
      </div>
      <div className="cosmic-noise"></div>
      <div className="cosmic-content">
        <div className="cosmic-tag">NEBULA CORE</div>
        <h1 className="cosmic-title">
          Cosmic <span>Dreams</span>
        </h1>
        <p className="cosmic-desc">
          Deep space mesh gradients with celestial energy.
        </p>
        <button className="cosmic-btn">Explore Space</button>
      </div>
    </div>
  );
};

export default CosmicMesh;
