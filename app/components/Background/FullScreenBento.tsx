"use client"
import React from 'react';
import './FullScreenBento.css';

const FullScreenBento: React.FC = () => {
  return (
    <div className="fs-bento-wrapper">
      {/* Dynamic Background Mesh */}
      <div className="fs-ambient-layer">
        <div className="fs-orb fs-orb-1"></div>
        <div className="fs-orb fs-orb-2"></div>
        <div className="fs-orb fs-orb-3"></div>
      </div>

      {/* Main Grid: Covering 100% Viewport */}
      <div className="fs-grid-layout">
        <div className="fs-cell span-2-2">
            <div className="fs-inner-glow cyan"></div>
        </div>
        <div className="fs-cell">
            <div className="fs-border-shine"></div>
        </div>
        <div className="fs-cell">
            <div className="fs-liquid-content"></div>
        </div>
        <div className="fs-cell span-wide">
            <div className="fs-scanline"></div>
        </div>
        <div className="fs-cell">
            <div className="fs-pulse-dot"></div>
        </div>
        <div className="fs-cell span-tall">
            <div className="fs-inner-glow purple"></div>
        </div>
        <div className="fs-cell">
            <div className="fs-static-noise"></div>
        </div>
      </div>

      {/* Finishing Texture */}
      <div className="fs-grain"></div>
    </div>
  );
};

export default FullScreenBento;