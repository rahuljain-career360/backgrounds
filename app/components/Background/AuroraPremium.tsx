"use client"
import React from 'react';
import './AuroraPremium.css';

const AuroraPremium: React.FC = () => {
  return (
    <div className="aurora-container">
      {/* Layer 1: The Core Glows */}
      <div className="aurora-blobs">
        <div className="aurora-blob blue"></div>
        <div className="aurora-blob pink"></div>
        <div className="aurora-blob purple"></div>
      </div>

      {/* Layer 2: The Glass Grid Overlay */}
      <div className="aurora-grid"></div>

      {/* Layer 3: Quality Noise Texture */}
      <div className="aurora-noise"></div>

      {/* Main Content */}
      <div className="aurora-content">
        <span className="badge">New Release 2.0</span>
        <h1 className="main-heading">
          Elevate Your <br />
          <span className="text-gradient">Digital Presence</span>
        </h1>
        <div className="cta-group">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">View Demo</button>
        </div>
      </div>
    </div>
  );
};

export default AuroraPremium;