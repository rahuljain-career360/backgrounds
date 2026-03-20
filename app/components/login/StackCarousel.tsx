"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StackCarousel.css';

const DATA = [
  { id: 1, color: "#FF3E00", img: "https://picsum.photos/id/101/600/800", title: "Ignite" },
  { id: 2, color: "#00E5FF", img: "https://picsum.photos/id/102/600/800", title: "Frost" },
  { id: 3, color: "#7000FF", img: "https://picsum.photos/id/103/600/800", title: "Ether" },
  { id: 4, color: "#FF007A", img: "https://picsum.photos/id/104/600/800", title: "Pulse" },
];

const StackCarousel: React.FC = () => {
  const [cards, setCards] = useState(DATA);

  const nextCard = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  return (
    <div className="stack-container">
      <div className="info-layer">
        <h1>NEO-STACK <span>v2.0</span></h1>
        <p>Swipe or Click to reveal the next dimension</p>
      </div>

      <div className="card-stack" onClick={nextCard}>
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={card.id}
                className="stack-card"
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 100) nextCard();
                }}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * -30,
                  z: index * -100,
                  rotateX: index * -5,
                  opacity: 1 - index * 0.2,
                  filter: `blur(${index * 2}px)`,
                }}
                exit={{ 
                  x: 500, 
                  opacity: 0, 
                  rotate: 20,
                  scale: 0.5 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: DATA.length - index }}
              >
                <div className="card-visual">
                  <img src={card.img} alt={card.title} />
                  <div className="glow-edge" style={{ background: card.color }}></div>
                  <div className="card-label">
                    <h3>{card.title}</h3>
                    <div className="badge">PREMIUM</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="cursor-follower"></div>
    </div>
  );
};

export default StackCarousel;