"use client"
import React, { useEffect, useState } from 'react';
import './AuroraMesh.css';

const AuroraMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="aurora-container">
      <div className="aurora-wrapper">
        <div className="aurora-ball aurora-1"></div>
        <div className="aurora-ball aurora-2"></div>
        <div className="aurora-ball aurora-3"></div>
        <div className="aurora-ball aurora-4"></div>
        <div className="aurora-ball aurora-5"></div>
      </div>
      <div className="aurora-noise"></div>
      <div className="aurora-content">
        <div className="aurora-tag">AURORA COLLECTION</div>
        <h1 className="aurora-title">
          Northern <span>Lights</span>
        </h1>
        <p className="aurora-desc">
          Ethereal animated mesh gradients inspired by the aurora borealis.
        </p>
        <button className="aurora-btn">Discover More</button>
      </div>
    </div>
  );
};

export default AuroraMesh;
