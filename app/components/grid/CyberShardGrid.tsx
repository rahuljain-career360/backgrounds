"use client"
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { FiCpu, FiActivity, FiZap } from "react-icons/fi";
import { IconType } from "react-icons";
import "./CyberShard.css";

/* ================= TYPES ================= */

interface ShardProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle: string;
  icon: IconType;
  nodeId?: string;
}

interface ShardData {
  title: string;
  subtitle: string;
  icon: IconType;
  nodeId: string;
}

/* ================= SUB-COMPONENT ================= */

const Shard: React.FC<ShardProps> = ({ title, subtitle, icon: Icon, nodeId }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring effect for the glow
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - left);
    y.set(e.clientY - top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([xVal, yVal]) => `radial-gradient(400px circle at ${xVal}px ${yVal}px, rgba(0, 163, 255, 0.15), transparent 80%)`
  );

  return (
    <motion.div
      className="cyber-shard-card"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Dynamic Glow Layer */}
      <motion.div className="shard-glow" style={{ background }} />
      
      <div className="shard-content">
        <div className="shard-header">
          <div className="shard-icon-wrapper">
             {/* Icon render logic with fallback */}
             <Icon className="shard-main-icon" />
          </div>
          <span className="shard-id">{nodeId || "NODE_0x24"}</span>
        </div>
        
        <div className="shard-body">
          <h3 className="shard-title">{title}</h3>
          <p className="shard-desc">{subtitle}</p>
        </div>

        <div className="shard-footer">
          <div className="shard-line" />
          <span className="shard-status">ACTIVE_SYNC</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN COMPONENT ================= */

const CyberShardGrid: React.FC = () => {
  const shards: ShardData[] = [
    { 
      title: "Neural Link", 
      subtitle: "Real-time biometric data synchronization across shards.", 
      icon: FiActivity,
      nodeId: "NODE_0x88"
    },
    { 
      title: "Quantum Core", 
      subtitle: "Sub-atomic processing for high-frequency college predictions.", 
      icon: FiCpu,
      nodeId: "NODE_0x42"
    },
    { 
      title: "Vector Flow", 
      subtitle: "Dynamic geometry mapping for seamless user transitions.", 
      icon: FiZap,
      nodeId: "NODE_0x19"
    },
  ];

  return (
    <div className="cyber-shard-container">
      {/* Background Mesh Decor */}
      <div className="mesh-bg" />
      
      <div className="shard-wrapper">
        <div className="shard-intro">
          <h2 className="main-heading">
            KINETIC <span className="blue-text">SHARDS</span>
          </h2>
          <div className="heading-line" />
        </div>

        <div className="shard-grid">
          {shards.map((item, index) => (
            <Shard 
              key={index} 
              title={item.title} 
              subtitle={item.subtitle} 
              icon={item.icon} 
              nodeId={item.nodeId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberShardGrid;