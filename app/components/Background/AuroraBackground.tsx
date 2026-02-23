import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-slate-950">
      {/* Container for the animated gradients */}
      <div className="relative h-full w-full">
        
        {/* Deep Blue Blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-[10%] -top-[10%] h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[120px]"
        />

        {/* Soft Purple Blob */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -150, 0],
            y: [0, 200, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[120px]"
        />

        {/* Cyan Accents */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[100px]"
        />
      </div>

      {/* Subtle Grain Overlay for 4K Texture */}
      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] contrast-150 brightness-100 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default AuroraBackground;