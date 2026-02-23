"use client"
import React from 'react';
import './LuxuryDarkScene.css';

const LuxuryDarkScene: React.FC = () => {
  return (
    <div className="luxury-wrapper">
      {/* Dynamic Background Elements */}
      <div className="spotlight-container">
        <div className="spotlight light-1"></div>
        <div className="spotlight light-2"></div>
      </div>

      {/* Glassmorphism Mesh Layer */}
      <div className="glass-mesh-overlay"></div>

      {/* Premium Noise Overlay */}
      <div className="texture-layer"></div>

      {/* Content Area */}
      <div className="luxury-content">
        <div className="brand-tag">PREMIUM ACCESS</div>
        <h1 className="title">
          Redefining <br />
          <span className="glow-text">The Interface</span>
        </h1>
        <div className="luxury-stats">
          <div className="stat-item">
            <span>60fps</span>
            <p>Motion</p>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <span>4K</span>
            <p>Visuals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryDarkScene;