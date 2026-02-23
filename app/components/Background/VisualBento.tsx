"use client"
import React from 'react';
import './VisualBento.css';

const VisualBento: React.FC = () => {
  return (
    <div className="v-bento-wrapper">
      {/* Background Deep Glow */}
      <div className="v-bento-bg">
        <div className="v-orb v-orb-1"></div>
        <div className="v-orb v-orb-2"></div>
      </div>

      {/* Grid Layout */}
      <div className="v-grid-container">
        {/* Box 1: Animated Border & Fill */}
        <div className="v-item v-item-1">
          <div className="v-liquid-fill"></div>
        </div>

        {/* Box 2: Pulse Center */}
        <div className="v-item v-item-2">
          <div className="v-pulse-core"></div>
        </div>

        {/* Box 3: Gradient Stroke Only */}
        <div className="v-item v-item-3">
          <div className="v-border-runner"></div>
        </div>

        {/* Box 4: Large Mesh Interior */}
        <div className="v-item v-item-4">
          <div className="v-inner-mesh"></div>
        </div>

        {/* Box 5: Scanline Effect */}
        <div className="v-item v-item-5">
           <div className="v-scan-line"></div>
        </div>

        {/* Box 6: Glowing Dot */}
        <div className="v-item v-item-6">
           <div className="v-glow-dot"></div>
        </div>
      </div>

      <div className="v-noise"></div>
    </div>
  );
};

export default VisualBento;