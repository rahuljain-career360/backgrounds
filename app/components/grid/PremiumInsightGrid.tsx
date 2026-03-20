"use client"
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./PremiumInsight.css";

/* ================= TYPES ================= */
interface ShardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  color: string;
  visualizer: "graph" | "pulse" | "nodes";
}

/* ================= UTILITY COMPONENTS ================= */
const MiniVisualizer = ({ type, color }: { type: string, color: string }) => {
  if (type === "graph") {
    return (
      <div className="viz-container">
        {[40, 70, 45, 90, 65].map((h, i) => (
          <motion.div 
            key={i} 
            initial={{ height: 0 }} 
            animate={{ height: `${h}%` }} 
            transition={{ delay: i * 0.1, duration: 1 }}
            className="viz-bar" 
            style={{ backgroundColor: color }} 
          />
        ))}
      </div>
    );
  }
  return <div className="viz-pulse" style={{ borderColor: color }}><div className="pulse-dot" style={{ backgroundColor: color }} /></div>;
};

/* ================= SHARD COMPONENT ================= */
const InsightShard: React.FC<ShardProps> = ({ title, value, trend, description, color, visualizer }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - left);
    y.set(e.clientY - top);
  };

  const glow = useTransform([mouseX, mouseY], ([xV, yV]) => 
    `radial-gradient(300px circle at ${xV}px ${yV}px, ${color}15, transparent 80%)`
  );

  return (
    <motion.div 
      className="insight-card" 
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
    >
      <motion.div className="card-glow" style={{ background: glow }} />
      
      <div className="card-inner">
        <div className="card-top">
          <span className="card-label" style={{ color }}>{title}</span>
          <MiniVisualizer type={visualizer} color={color} />
        </div>

        <div className="card-main">
          <h3 className="card-value">{value}</h3>
          <span className="card-trend">{trend}</span>
        </div>

        <p className="card-desc">{description}</p>
        
        <div className="card-footer">
          <div className="status-indicator"><span style={{ backgroundColor: color }} /> Live Sync</div>
          <button className="card-action">Details →</button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN GRID ================= */
const PremiumInsightGrid: React.FC = () => {
  return (
    <div className="premium-container">
      <div className="header-section">
        <h2 className="premium-title">Strategic <span className="highlight">Intelligence</span></h2>
        <p className="premium-subtitle">High-fidelity data shards for modern enterprise logic.</p>
      </div>

      <div className="insight-grid">
        <InsightShard 
          title="ALGORITHM_EFFICIENCY" 
          value="98.4%" 
          trend="+2.1%" 
          description="Sub-atomic latency optimization for real-time predictions."
          color="#00a3ff"
          visualizer="graph"
        />
        <InsightShard 
          title="NETWORK_INTEGRITY" 
          value="Active" 
          trend="Secure" 
          description="Quantum-encrypted node distribution across global clusters."
          color="#00ff94"
          visualizer="pulse"
        />
        <InsightShard 
          title="DATA_FLUX" 
          value="1.2PB" 
          trend="High" 
          description="Elastic scaling architecture for multi-tenant data processing."
          color="#ff0055"
          visualizer="graph"
        />
      </div>
    </div>
  );
};

export default PremiumInsightGrid;