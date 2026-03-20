"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Radio } from 'lucide-react';
import './NeuralGlass.css';

const DATA = [
  { id: 1, title: "GENESIS", img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200", color: "#00ffcc" },
  { id: 2, title: "SYNAPSE", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200", color: "#ff0055" },
  { id: 3, title: "KINETIC", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200", color: "#6600ff" },
];

const NeuralGlass: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DATA.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="neural-wrapper">
      {/* Background Layer: Slow Zoom Out */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`bg-${index}`}
          className="background-fixed"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ backgroundImage: `url(${DATA[index].img})` }}
        />
      </AnimatePresence>

      <div className="main-viewport">
        <div className="side-nav">
          <Fingerprint size={24} color={DATA[index].color} />
          <div className="vertical-line"></div>
          <span className="index-num">0{index + 1}</span>
        </div>

        <div className="content-core">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="glass-portal"
              initial={{ rotate: -10, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={DATA[index].img} alt="neural" />
              <div className="portal-overlay" style={{ border: `1px solid ${DATA[index].color}44` }}></div>
            </motion.div>
          </AnimatePresence>

          <div className="text-overlay">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={DATA[index].title}
                initial={{ letterSpacing: "40px", opacity: 0, filter: "blur(10px)" }}
                animate={{ letterSpacing: "10px", opacity: 1, filter: "blur(0px)" }}
                exit={{ letterSpacing: "-20px", opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {DATA[index].title}
              </motion.h1>
            </AnimatePresence>
            <div className="status-bar">
              <Radio size={14} className="pulse-icon" />
              <span>NEURAL LINK ESTABLISHED // SECTOR {DATA[index].id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="grid-lines"></div>
    </div>
  );
};

export default NeuralGlass;