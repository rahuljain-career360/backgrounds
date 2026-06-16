"use client"
import React, { useEffect, useState } from 'react';
import './OceanMesh.css';

const OceanMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="ocean-container">
      <div className="ocean-wrapper">
        <div className="ocean-ball ocean-1"></div>
        <div className="ocean-ball ocean-2"></div>
        <div className="ocean-ball ocean-3"></div>
        <div className="ocean-ball ocean-4"></div>
        <div className="ocean-ball ocean-5"></div>
      </div>
      <div className="ocean-noise"></div>
      <div className="ocean-content">
        <div className="ocean-tag">DEEP BLUE</div>
        <h1 className="ocean-title">
          Ocean <span>Depths</span>
        </h1>
        <p className="ocean-desc">
          Fluid mesh gradients inspired by the ever-moving ocean.
        </p>
        <button className="ocean-btn">Dive In</button>
      </div>
    </div>
  );
};

export default OceanMesh;
