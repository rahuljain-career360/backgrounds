"use client"
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import './BentoCarousel.css';

const CARDS = [
  { id: 1, title: "Neural Network", tag: "AI Tech", img: "https://picsum.photos/id/201/800/800", color: "#6366f1" },
  { id: 2, title: "Deep Space", tag: "Future", img: "https://picsum.photos/id/202/800/800", color: "#a855f7" },
  { id: 3, title: "Oceanic Drift", tag: "Nature", img: "https://picsum.photos/id/203/800/800", color: "#06b6d4" },
  { id: 4, title: "Cyber City", tag: "Urban", img: "https://picsum.photos/id/204/800/800", color: "#f43f5e" },
];

const BentoCard = ({ card }: { card: typeof CARDS[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bento-card"
    >
      <div className="card-content" style={{ transform: "translateZ(50px)" }}>
        <img src={card.img} alt={card.title} className="bento-img" />
        <div className="overlay">
          <div className="badge"><Sparkles size={12} /> {card.tag}</div>
          <h2>{card.title}</h2>
          <button className="explore-btn">
            Explore <ExternalLink size={14} />
          </button>
        </div>
      </div>
      {/* Background Glow */}
      <div className="card-glow" style={{ background: card.color }}></div>
    </motion.div>
  );
};

const BentoCarousel: React.FC = () => {
  return (
    <div className="bento-wrapper">
      <div className="bento-header">
        <span>CURATED COLLECTION</span>
        <h1>Trending Artifacts</h1>
      </div>
      <div className="bento-grid">
        {CARDS.map((card) => (
          <BentoCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default BentoCarousel;