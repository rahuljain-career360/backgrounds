"use client"
import React, { useState } from 'react';
import './CarouselDesign.css';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  { id: 1, title: "Ethereal Design", subtitle: "Crafting digital experiences with precision.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Modern Aesthetic", subtitle: "Minimalism meets functional elegance.", image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Premium Motion", subtitle: "Fluid transitions for the modern web.", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" },
];

const  CarouselDesign: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-wrapper">
      {/* Premium Gradient Background */}
      <div className="bg-mesh"></div>

      <div className="carousel-container">
        <button className="nav-btn prev" onClick={prevSlide}>&larr;</button>
        
        <div className="carousel-content">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slide ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="glass-card">
                <img src={slide.image} alt={slide.title} className="slide-image" />
                <div className="text-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <button className="cta-btn">Explore More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn next" onClick={nextSlide}>&rarr;</button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span 
            key={i} 
            className={`dot ${i === activeIndex ? 'active-dot' : ''}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CarouselDesign;