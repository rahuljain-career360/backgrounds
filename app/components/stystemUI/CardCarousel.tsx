import React from 'react';
import './CardCarousel.css';

const CardCarousel: React.FC = () => {
  const cardData = [
    { title: "Neon City", img: "https://picsum.photos/id/101/400/600" },
    { title: "Ocean Mist", img: "https://picsum.photos/id/102/400/600" },
    { title: "Desert Sun", img: "https://picsum.photos/id/103/400/600" },
    { title: "Mountain Peak", img: "https://picsum.photos/id/104/400/600" },
    { title: "Forest Path", img: "https://picsum.photos/id/105/400/600" },
    { title: "Starry Night", img: "https://picsum.photos/id/106/400/600" },
  ];

  return (
    <div className="scene">
      <div className="carousel">
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className="card-item"
            style={{ 
              transform: `rotateY(${index * 60}deg) translateZ(450px)` 
            }}
          >
            <div className="card-content">
              <img src={card.img} alt={card.title} />
              <div className="card-overlay">
                <h3>{card.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;