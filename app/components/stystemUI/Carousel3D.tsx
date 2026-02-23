import React from 'react';
import './Carousel3D.css';

const Carousel3D: React.FC = () => {
  const images = [
    "https://picsum.photos/id/10/800/600",
    "https://picsum.photos/id/20/800/600",
    "https://picsum.photos/id/30/800/600",
    "https://picsum.photos/id/40/800/600",
    "https://picsum.photos/id/50/800/600",
    "https://picsum.photos/id/60/800/600",
  ];

  return (
    <div className="page-container">
      <div className="carousel-viewport">
        <div className="carousel-spinner">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="carousel-item"
              style={{ 
                transform: `rotateY(${index * 60}deg) translateZ(400px)` 
              }}
            >
              <img src={src} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="instructions">Hover to Pause | 3D Rotation Active</div>
    </div>
  );
};

export default Carousel3D;