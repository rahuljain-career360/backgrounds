import React from 'react';
import './LiquidNebula.css';

const LiquidNebula: React.FC = () => {
  return (
    <div className="nebula-wrapper">
      {/* Background Layer */}
      <div className="nebula-bg" />
      
      {/* Animated Color Blobs */}
      <div className="blob purple" />
      <div className="blob blue" />
      <div className="blob pink" />
      <div className="blob cyan" />
      
      {/* Glass Overlay for Premium Finish */}
      <div className="glass-surface" />
    </div>
  );
};

export default LiquidNebula;