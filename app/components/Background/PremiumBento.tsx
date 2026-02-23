"use client"
import React, { useEffect, useState } from 'react';
import './PremiumBento.css';

const PremiumBento: React.FC = () => {
  return (
    <div className="bento-wrapper">
      {/* Background Layer: Animated Mesh */}
      <div className="bento-bg-mesh">
        <div className="bento-orb orb-1"></div>
        <div className="bento-orb orb-2"></div>
      </div>

      {/* Main Bento Grid */}
      <div className="bento-container">
        
        {/* Item 1: Large Featured */}
        <div className="bento-item bento-large">
          <div className="bento-content">
            <span className="bento-tag">Analytics</span>
            <h2>Real-time <br/> Insights</h2>
            <p>Monitor your performance with precision.</p>
          </div>
          <div className="bento-visual">
             <div className="moving-bar"></div>
          </div>
        </div>

        {/* Item 2: Square Medium */}
        <div className="bento-item bento-square">
          <div className="bento-content">
            <span className="bento-tag">Security</span>
            <h3>AES-256</h3>
          </div>
        </div>

        {/* Item 3: Square Medium */}
        <div className="bento-item bento-square color-accent">
          <div className="bento-content">
            <span className="bento-tag">Cloud</span>
            <h3>Infinite Storage</h3>
          </div>
        </div>

        {/* Item 4: Wide Horizontal */}
        <div className="bento-item bento-wide">
          <div className="bento-content flex-row">
            <div>
                <h3>Seamless Integration</h3>
                <p>Connect with 100+ premium tools instantly.</p>
            </div>
            <div className="icon-cloud">⚡</div>
          </div>
        </div>

        {/* Item 5: Small Square */}
        <div className="bento-item bento-small">
             <div className="bento-content center">
                <div className="pulse-dot"></div>
                <span>Live Status</span>
             </div>
        </div>

      </div>

      {/* Quality Grain Layer */}
      <div className="bento-noise"></div>
    </div>
  );
};

export default PremiumBento;