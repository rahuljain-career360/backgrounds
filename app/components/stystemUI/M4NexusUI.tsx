"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const M4NexusUI: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-end parallax for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-cyan-500/30">
      
      {/* 1. LAYERED BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
        {/* Animated Radial "Core" */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]" 
        />
        
        {/* SVG Grid Overlay - "The Matrix" */}
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
      </div>

      {/* 2. COMPLEX NAV / HUD */}
      <nav className="fixed top-0 z-[100] flex w-full items-center justify-between px-10 py-8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-sm bg-gradient-to-tr from-cyan-400 to-blue-600 rotate-45 border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          <span className="text-xl font-black tracking-tighter uppercase italic">M4_OS</span>
        </div>
        
        <div className="hidden space-x-8 text-[10px] font-bold tracking-[0.3em] uppercase md:flex">
          {['Neural', 'Compute', 'Storage', 'System'].map((item) => (
            <a key={item} href="#" className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400/50 pb-1">
              {item}
            </a>
          ))}
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[12px] font-mono text-cyan-400 backdrop-blur-xl">
          LATENCY: 4ms
        </div>
      </nav>

      {/* 3. THE BENTO GRID (COMPLEX CONTENT) */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Hero Card (Large) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="group relative col-span-12 lg:col-span-8 h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-3xl"
          >
            <div className="absolute top-0 right-0 p-8">
                <div className="h-32 w-32 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
                    <div className="h-24 w-24 rounded-full border-t-2 border-cyan-400" />
                </div>
            </div>
            
            <h2 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl">
                QUANTUM <br /> <span className="text-cyan-400">PROCESSING</span>
            </h2>
            <p className="mt-8 max-w-md text-white/50 text-lg leading-relaxed">
                M4 architecture utilizes 3nm technology to redefine the boundaries of computational physics.
            </p>
          </motion.div>

          {/* Right Sidebar Stats */}
          <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 backdrop-blur-xl">
               <span className="text-xs uppercase tracking-widest text-purple-400">GPU Clusters</span>
               <div className="mt-4 text-4xl font-mono">128-CORE</div>
               <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-purple-500" />
               </div>
            </div>
            
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl flex flex-col justify-between">
                <div className="flex justify-between">
                    <span className="text-xs uppercase tracking-widest text-cyan-400">Security Node</span>
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="text-3xl font-light">Encrypted</div>
            </div>
          </div>

          {/* Bottom Feature Cards */}
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="col-span-12 md:col-span-4 h-64 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.05]"
            >
              <div className="mb-4 h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                0{i}
              </div>
              <h3 className="text-xl font-bold underline decoration-cyan-500/50 underline-offset-8">Subsystem_0{i}</h3>
              <p className="mt-4 text-sm text-white/40">Real-time telemetry and data stream monitoring for sub-atomic calculations.</p>
            </motion.div>
          ))}

        </div>
      </main>

      {/* 4. MOUSE GLOW EFFECT */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(34,211,238,0.1),transparent_25%)]" />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default M4NexusUI;