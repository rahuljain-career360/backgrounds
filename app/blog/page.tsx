"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    tag: "Technology",
    title: "The Future of AI in Everyday Life",
    desc: "Exploring how artificial intelligence is reshaping the way we work, create, and connect.",
    date: "Jun 12, 2026",
    read: "8 min",
    color: "from-cyan-500 to-blue-600",
  },
  {
    tag: "Design",
    title: "Minimalism in Modern UI Design",
    desc: "Why less is more when crafting digital experiences that users love.",
    date: "Jun 10, 2026",
    read: "6 min",
    color: "from-purple-500 to-pink-600",
  },
  {
    tag: "Engineering",
    title: "Building Scalable Microservices",
    desc: "A practical guide to architecting services that grow with your user base.",
    date: "Jun 8, 2026",
    read: "12 min",
    color: "from-amber-500 to-orange-600",
  },
  {
    tag: "Creative",
    title: "The Art of Data Visualization",
    desc: "Turning complex datasets into compelling visual stories.",
    date: "Jun 5, 2026",
    read: "10 min",
    color: "from-emerald-500 to-teal-600",
  },
  {
    tag: "Culture",
    title: "Remote Work: Two Years Later",
    desc: "How distributed teams have evolved and what the future holds.",
    date: "Jun 3, 2026",
    read: "7 min",
    color: "from-rose-500 to-red-600",
  },
  {
    tag: "Science",
    title: "Quantum Computing Breakthroughs",
    desc: "Recent advances that bring quantum computers closer to practical reality.",
    date: "May 28, 2026",
    read: "15 min",
    color: "from-violet-500 to-indigo-600",
  },
];

const categories = [
  "All", "Technology", "Design", "Engineering", "Creative", "Culture", "Science",
];

export default function BlogLanding() {
  return (
    <div className="min-h-screen w-full bg-[#06060a] text-[#e0e0e0] selection:bg-cyan-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] h-[700px] w-[700px] rounded-full bg-cyan-600/8 blur-[200px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/8 blur-[200px]" />
        <div className="absolute top-[40%] right-[20%] h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[150px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span className="text-xl font-black tracking-tight">BLOG.</span>
        <div className="flex items-center gap-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>Categories</span>
          <span>About</span>
          <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-all">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-8 pt-24 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400">
            The Journal
          </span>
          <h1 className="mt-6 text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Where ideas
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
              take shape
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/40 max-w-xl leading-relaxed">
            Explorations in technology, design, and the creative process.
            Thoughtful articles from people building the future.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-5 py-2 rounded-full text-sm border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Featured Grid */}
      <section className="relative z-10 px-8 pb-32 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Featured Articles</h2>
          <span className="text-sm text-white/30 font-mono">06 articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              {/* Gradient accent bar */}
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${post.color} mb-5 transition-all duration-500 group-hover:w-full`}
              />

              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  {post.tag}
                </span>
                <span className="text-[10px] text-white/20">/</span>
                <span className="text-[10px] font-mono text-white/20">{post.read}</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                {post.desc}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/20">{post.date}</span>
                <span className="text-xs font-medium text-white/30 group-hover:text-white transition-colors duration-300">
                  Read more &rarr;
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 border-t border-white/5">
        <div className="px-8 py-20 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Stay in the loop
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Get the latest articles delivered to your inbox every week.
              No spam, ever.
            </p>
            <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button className="px-6 py-3 rounded-xl bg-white/10 text-white/80 text-sm font-medium hover:bg-white/20 transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="px-8 py-8 max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-white/20">
          <span>&copy; 2026 Blog. All rights reserved.</span>
          <div className="flex gap-6">
            <span>Twitter</span>
            <span>GitHub</span>
            <span>RSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
