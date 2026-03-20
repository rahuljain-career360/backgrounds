"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Command } from 'lucide-react';
import './KineticPortal.css';

const DATA = [
  { id: 1, title: "OBLIVION", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000", desc: "The void between dimensions" },
  { id: 2, title: "ZENITH", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000", desc: "Peak of digital evolution" },
  { id: 3, title: "AETHER", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000", desc: "Pure energy in liquid form" },
];

const KineticPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="portal-container" ref={containerRef}>
      <div className="sticky-wrapper">
        {DATA.map((item, index) => {
          // Dynamic Z-axis and Scale based on scroll
          const start = index / DATA.length;
          const end = (index + 1) / DATA.length;
          
          const z = useTransform(scrollYProgress, [start, end], [1000, 0]);
          const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          const scale = useTransform(scrollYProgress, [start, end], [0.5, 1.5]);
          const rotate = useTransform(scrollYProgress, [start, end], [10, -10]);

          return (
            <motion.div 
              key={item.id}
              className="portal-slide"
              style={{ z, opacity, scale, rotateY: rotate }}
            >
              <div className="glass-frame">
                <img src={item.img} alt={item.title} />
                <div className="overlay-content">
                  <div className="header-meta">
                    <Command size={16} /> <span>CORE_SYSTEM_v4.0</span>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="action-btn"
                  >
                    INITIATE <Zap size={14} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Floating HUD Elements */}
        <div className="hud-layer">
          <div className="scan-line"></div>
          <div className="corners top-left"></div>
          <div className="corners bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default KineticPortal;