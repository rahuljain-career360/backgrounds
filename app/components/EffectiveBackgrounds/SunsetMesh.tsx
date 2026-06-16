"use client"
import React, { useEffect, useState } from 'react';
import './SunsetMesh.css';

const SunsetMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="sunset-container">
      <div className="sunset-wrapper">
        <div className="sunset-ball sunset-1"></div>
        <div className="sunset-ball sunset-2"></div>
        <div className="sunset-ball sunset-3"></div>
        <div className="sunset-ball sunset-4"></div>
      </div>
      <div className="sunset-noise"></div>
      <div className="sunset-content">
        <div className="sunset-tag">GOLDEN HOUR</div>
        <h1 className="sunset-title">
          Warm <span>Radiance</span>
        </h1>
        <p className="sunset-desc">
          Golden and crimson mesh gradients that capture the warmth of sunset.
        </p>
        <button className="sunset-btn">Experience Glow</button>
      </div>
    </div>
  );
};

export default SunsetMesh;
