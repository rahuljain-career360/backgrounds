"use client"
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const M4BlogUI: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const blogs = [
    { id: '01', title: 'The 3nm Revolution', category: 'Hardware', time: '5 min' },
    { id: '02', title: 'Neural Engine Optimization', category: 'AI', time: '12 min' },
    { id: '03', title: 'Thermal Dynamics in M4', category: 'Engineering', time: '8 min' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#080808] text-[#e0e0e0] selection:bg-cyan-500/30">
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Progress Bar (Top) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="relative z-10 px-10 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <span className="text-xs font-mono uppercase tracking-[0.5em] text-cyan-400">Journal / Series v.1</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter">INSIGHTS.</h1>
        </motion.div>
      </header>

      <main className="relative z-10 px-10 pb-40">
        <div className="flex flex-col gap-2">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-t border-white/10 py-12 transition-all hover:bg-white/[0.02]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                {/* Index & Category */}
                <div className="flex items-center gap-10">
                  <span className="text-sm font-mono text-white/30">{blog.id}</span>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-cyan-500 mb-1">{blog.category}</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500 italic">
                      {blog.title}
                    </h2>
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-white/40">{blog.time} read</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Hover Image Preview (The "Apple" Effect) */}
              <div className="pointer-events-none absolute right-[20%] top-1/2 h-0 w-64 -translate-y-1/2 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 opacity-0 transition-all duration-500 group-hover:h-40 group-hover:opacity-100 group-hover:rotate-6" />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Footer Stats */}
      <footer className="fixed bottom-10 left-10 z-50 flex gap-10 text-[10px] font-mono tracking-widest text-white/20 uppercase">
        <div>Total_Articles: 42</div>
        <div>System_Status: Stable</div>
      </footer>
    </div>
  );
};

export default M4BlogUI;