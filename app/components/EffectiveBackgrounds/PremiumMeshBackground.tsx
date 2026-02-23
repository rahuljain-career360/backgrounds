"use client"
import React, { useEffect, useState } from 'react';
import './PremiumMeshBackground.css';

const PremiumMeshBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="premium-container">
      {/* Background Mesh Blobs */}
      <div className="mesh-gradient-wrapper">
        <div className="mesh-ball mesh-1"></div>
        <div className="mesh-ball mesh-2"></div>
        <div className="mesh-ball mesh-3"></div>
        <div className="mesh-ball mesh-4"></div>
      </div>

      {/* Noise Texture Overlay for that 'Grainy' Premium Look */}
      <div className="noise-overlay"></div>

      {/* Center Content with Glassmorphism */}
      <div className="premium-content">
        <div className="glass-tag">NEXT GENERATION UI</div>
        <h1 className="premium-title">
          The Art of <br /> <span>Fluid Motion</span>
        </h1>
        <p className="premium-desc">
          High-fidelity animated mesh gradients designed for modern web experiences.
        </p>
        <button className="premium-btn">Explore Work</button>
      </div>
    </div>
  );
};

export default PremiumMeshBackground;