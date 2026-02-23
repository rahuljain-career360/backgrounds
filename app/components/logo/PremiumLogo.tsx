"use client"
import React from 'react';
import './PremiumLogo.css';

const PremiumLogo: React.FC = () => {
  return (
    <div className="logo-wrapper">
      {/* Logo Glow Aura */}
      <div className="logo-glow"></div>

      <div className="logo-container">
        {/* The Actual Logo SVG with Gradient */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="main-logo-svg"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff22" stopOpacity="0.5" />
            </linearGradient>
            
            <filter id="logo-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
            </filter>
          </defs>

          {/* Abstract Premium Shape (Geometric Diamond/Square) */}
          <rect 
            x="25" y="25" width="50" height="50" 
            rx="12" 
            stroke="url(#logo-grad)" 
            strokeWidth="1.5"
            className="logo-shape-outline"
          />
          <path 
            d="M50 35L65 50L50 65L35 50L50 35Z" 
            fill="url(#logo-grad)"
            className="logo-inner-shape"
          />
        </svg>

        {/* Brand Text */}
        <div className="brand-info">
          <h1 className="brand-name">VELVET<span>CORE</span></h1>
          <p className="brand-tagline">PRECISION DESIGN</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumLogo;