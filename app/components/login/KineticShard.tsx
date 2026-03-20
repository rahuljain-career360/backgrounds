"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import './KineticShard.css';

const SLIDES = [
  { id: 1, title: "AETHER", img: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1000", color: "#00f2ff" },
  { id: 2, title: "VORTEX", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000", color: "#ff007a" },
  { id: 3, title: "PHANTOM", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000", color: "#7000ff" },
];

const KineticShard: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Automatic 2-second logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2500); // 2.5s for smoother feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="shard-wrapper">
      {/* Background Ambient Glow */}
      <motion.div 
        animate={{ background: `radial-gradient(circle at 50% 50%, ${SLIDES[index].color}33 0%, #000 70%)` }}
        className="ambient-bg" 
      />

      <div className="shard-container">
        {/* Left Side: Dynamic Text */}
        <div className="shard-info">
          <motion.div 
            key={`meta-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="meta-tag"
            style={{ color: SLIDES[index].color }}
          >
            <ShieldCheck size={16} /> <span>ENCRYPTED_DATA_v2</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={SLIDES[index].title}
              initial={{ filter: "blur(20px)", opacity: 0, y: 40 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              exit={{ filter: "blur(20px)", opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {SLIDES[index].title}
            </motion.h1>
          </AnimatePresence>

          <div className="timer-bar-container">
            <motion.div 
              key={`bar-${index}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
              className="timer-bar"
              style={{ background: SLIDES[index].color }}
            />
          </div>
        </div>

        {/* Right Side: The Kinetic Shard */}
        <div className="shard-visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="glass-shard"
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="image-wrapper">
                <img src={SLIDES[index].img} alt="kinetic" />
                <div className="scan-overlay"></div>
              </div>
              
              {/* Floating Tech Elements */}
              <div className="shard-border" style={{ borderColor: SLIDES[index].color }}></div>
            </motion.div>
          </AnimatePresence>
          
          <div className="orbit-rings">
            <div className="ring r1"></div>
            <div className="ring r2"></div>
          </div>
        </div>
      </div>

      <div className="footer-status">
        <Zap size={14} /> SYSTEM ACTIVE // AUTO_SYNCING...
      </div>
    </div>
  );
};

export default KineticShard;