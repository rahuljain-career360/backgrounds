"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, Sparkles } from 'lucide-react';
import './LiquidSlider.css';

const SLIDES = [
  { id: 1, title: "PHANTOM", color: "#6366f1", img: "https://picsum.photos/id/101/1200/800" },
  { id: 2, title: "CYBER", color: "#a855f7", img: "https://picsum.photos/id/102/1200/800" },
  { id: 3, title: "NEBULA", color: "#0ea5e9", img: "https://picsum.photos/id/103/1200/800" },
];

const LiquidSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <div className="liquid-wrapper" style={{ '--accent': SLIDES[index].color } as any}>
      {/* SVG Liquid Filter - Ye magic hai! */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
        </filter>
      </svg>

      <div className="main-content">
        <div className="text-section">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            key={`tag-${index}`}
            className="tag"
          >
            <Sparkles size={14} /> PREMIUM EDITION
          </motion.span>
          
          <AnimatePresence mode="wait">
            <motion.h1 
              key={SLIDES[index].title}
              initial={{ opacity: 0, x: -50, skewX: 10 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              exit={{ opacity: 0, x: 50, skewX: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {SLIDES[index].title}
            </motion.h1>
          </AnimatePresence>

          <button className="cta-btn" onClick={nextSlide}>
            NEXT DIMENSION <MoveRight />
          </button>
        </div>

        <div className="visual-section">
          <div className="liquid-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="image-card"
                initial={{ scale: 0.8, filter: "url(#liquid)", opacity: 0 }}
                animate={{ scale: 1, filter: "url(#liquid)", opacity: 1 }}
                exit={{ scale: 1.2, filter: "url(#liquid)", opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src={SLIDES[index].img} alt="visual" />
                <div className="glass-overlay"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Floating 3D Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="floating-orb"
            />
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="progress-bar">
        {SLIDES.map((_, i) => (
          <div key={i} className={`dot ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default LiquidSlider;