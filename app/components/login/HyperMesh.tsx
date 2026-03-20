"use client"
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Globe, Infinity } from 'lucide-react';
import './HyperMesh.css';

const SLIDES = [
  { id: 1, title: "NEURAL", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200", icon: <Cpu /> },
  { id: 2, title: "AETHER", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200", icon: <Globe /> },
  { id: 3, title: "VOID", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", icon: <Infinity /> },
];

const HyperMesh: React.FC = () => {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement physics
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const handleMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  return (
    <div className="hyper-wrapper" onMouseMove={handleMove}>
      {/* Dynamic Background Noise */}
      <div className="noise-overlay"></div>
      
      {/* Floating Meta Labels */}
      <div className="floating-ui top-left">SYSTEM_STATUS: ONLINE</div>
      <div className="floating-ui bottom-right">REACTION_ENGINE: ACTIVE</div>

      <div className="main-stage">
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="perspective-box"
        >
          {/* Central Glass Portal */}
          <motion.div 
            key={active}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="central-card"
          >
            <img src={SLIDES[active].img} alt="visual" className="main-img" />
            <div className="glass-lens"></div>
            
            <div className="card-content" style={{ transform: "translateZ(80px)" }}>
                <div className="icon-box">{SLIDES[active].icon}</div>
                <h2>{SLIDES[active].title}</h2>
                <div className="dots-nav">
                    {SLIDES.map((_, i) => (
                        <button 
                            key={i} 
                            className={`dot-btn ${i === active ? 'active' : ''}`}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Background Text (Parallax) */}
        <motion.div 
          style={{ 
            x: useTransform(springX, (v) => v * -0.1),
            y: useTransform(springY, (v) => v * -0.1) 
          }}
          className="bg-title"
        >
          {SLIDES[active].title}
        </motion.div>
      </div>
    </div>
  );
};

export default HyperMesh;