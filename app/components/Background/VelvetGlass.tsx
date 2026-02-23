"use client"
import React, { useEffect, useState } from 'react';
import './VelvetGlass.css';

const VelvetGlass: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="velvet-container">
      {/* Dynamic Animated Mesh Blobs */}
      <div className="mesh-layer">
        <div className="orb orb-ruby"></div>
        <div className="orb orb-sapphire"></div>
        <div className="orb orb-emerald"></div>
      </div>

      {/* Main Glass Pane (The frosted effect) */}
      <div className="frosted-overlay"></div>

      {/* Texture Noise (Asli quality secret) */}
      <div className="grain-layer"></div>

      {/* Content Area */}
      <div className="velvet-content">
        <div className="glass-badge">ESTABLISHED 2026</div>
        <h1 className="velvet-title">
          VELVET <br /> <span>TEXTURE</span>
        </h1>
        <p className="velvet-sub">Crafted with precision, designed for luxury.</p>
        <div className="velvet-actions">
            <button className="primary-glass-btn">Get Started</button>
            <button className="secondary-link">Learn More →</button>
        </div>
      </div>
    </div>
  );
};

export default VelvetGlass;