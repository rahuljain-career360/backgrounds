"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './InfinityCarousel.css';

// Fake Images Data
const IMAGES = [
  { id: 1, url: "https://picsum.photos/id/10/600/800", title: "Abstract Core" },
  { id: 2, url: "https://picsum.photos/id/20/600/800", title: "Cyber Nebula" },
  { id: 3, url: "https://picsum.photos/id/30/600/800", title: "Deep Echo" },
  { id: 4, url: "https://picsum.photos/id/40/600/800", title: "Silent Peak" },
  { id: 5, url: "https://picsum.photos/id/50/600/800", title: "Neon Pulse" },
  { id: 6, url: "https://picsum.photos/id/60/600/800", title: "Vortex Rift" },
];

const InfinityCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const moveNext = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const movePrev = () => setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="infinity-wrapper">
      <div className="bg-text">DIMENSION</div>
      
      <div className="carousel-scene">
        <AnimatePresence mode="popLayout">
          {IMAGES.map((item, i) => {
            // Logic: Calculate distance from active index
            const distance = i - index;
            // "S-Curve" Math: X and Y coordinates based on sine wave
            const xPos = distance * 180;
            const yPos = Math.sin(distance * 0.8) * 120;
            const zPos = -Math.abs(distance) * 200;
            const rotationY = distance * -30;

            // Only show cards within a certain range for performance
            if (Math.abs(distance) > 2) return null;

            return (
              <motion.div
                key={item.id}
                className="infinity-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1 - Math.abs(distance) * 0.3,
                  x: xPos,
                  y: yPos,
                  z: zPos,
                  rotateY: rotationY,
                  scale: i === index ? 1.1 : 0.85,
                  filter: i === index ? "blur(0px)" : "blur(2px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18
                }}
                style={{ zIndex: 10 - Math.abs(distance) }}
              >
                <div className="card-inner">
                  <img src={item.url} alt={item.title} />
                  <div className="card-info">
                    <span>{item.title}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button onClick={movePrev} className="nav-btn"><ArrowLeft /></button>
        <button onClick={moveNext} className="nav-btn"><ArrowRight /></button>
      </div>
    </div>
  );
};

export default InfinityCarousel;