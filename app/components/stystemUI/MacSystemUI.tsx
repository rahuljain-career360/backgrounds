"use client"
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MacSystemUI: React.FC = () => {
  // Mouse parallax effect for the main glass card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0a0a0a] font-sans selection:bg-purple-500/30"
    >
      {/* 4K Background Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      {/* Dynamic Island / Top Notch */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 20 }}
        className="absolute top-0 z-50 flex h-10 items-center justify-between rounded-full bg-black/60 px-6 py-2 shadow-2xl backdrop-blur-xl border border-white/10"
      >
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />
        </div>
        <span className="ml-4 text-[10px] font-medium text-white/70 uppercase tracking-widest">M4 Ultra Chip Active</span>
      </motion.div>

      {/* Main Glass Centerpiece */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 h-[60%] w-[80%] max-w-5xl rounded-3xl border border-white/20 bg-white/5 p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <h1 className="bg-gradient-to-br from-white to-white/40 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Welcome to the Future.
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/40">
              Experience the power of the M4 architecture with seamless glass transitions and spatial motion.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
              Get Started
            </button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10">
              Documentation
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating Dock */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: -30 }}
        className="absolute bottom-0 z-50 flex items-center gap-4 rounded-3xl border border-white/10 bg-black/20 p-3 shadow-2xl backdrop-blur-3xl"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.2 }}
            className="h-12 w-12 cursor-pointer rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-inner transition-all hover:border-white/40"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MacSystemUI;