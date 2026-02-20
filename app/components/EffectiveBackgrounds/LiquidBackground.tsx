// import React, { useMemo } from 'react';
// import './LiquidBackground.css';

// const LiquidBackground: React.FC = () => {
//   // Generate 10 blobs with randomized initial properties
//   const blobs = useMemo(() => {
//     const colors = [
//       '#FF0080', '#7928CA', '#0070F3', '#00DFD8', 
//       '#FF4D4D', '#F9CB28', '#BCCAFF', '#2DFFC4',
//       '#4F46E5', '#EC4899'
//     ];
    
//     return Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       size: Math.floor(Math.random() * (400 - 200 + 1) + 200), // Random size between 200-400
//       color: colors[i % colors.length],
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       duration: `${Math.random() * (30 - 15) + 15}s`, // Random speed
//     }));
//   }, []);

//   return (
//     <div className="full-page-wrapper">
//       <div className="content-overlay">
//         <h1>Vibrant Fluids</h1>
//         <p>Full-screen Liquid Interaction</p>
//       </div>

//       <div className="goo-filter-container">
//         {blobs.map((blob) => (
//           <div
//             key={blob.id}
//             className={`liquid-blob blob-anim-${(blob.id % 3) + 1}`}
//             style={{
//               width: `${blob.size}px`,
//               height: `${blob.size}px`,
//               backgroundColor: blob.color,
//               left: blob.left,
//               top: blob.top,
//               animationDuration: blob.duration,
//             }}
//           />
//         ))}
//       </div>

//       {/* The invisible engine for the "melt" effect */}
//       <svg className="svg-hidden">
//         <defs>
//           <filter id="gooey-effect">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
//             <feColorMatrix 
//               in="blur" 
//               mode="matrix" 
//               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12" 
//             />
//           </filter>
//         </defs>
//       </svg>
//     </div>
//   );
// };

// export default LiquidBackground;


import React, { useMemo } from 'react';
import './LiquidBackground.css';

const LiquidBackground: React.FC = () => {
  const blobCount = 20; // Zyada blobs se poora page bhar jayega

  const blobs = useMemo(() => {
    const colors = [
      '#FF0080', '#7928CA', '#0070F3', '#00DFD8', 
      '#FF4D4D', '#F9CB28', '#BCCAFF', '#2DFFC4',
      '#4F46E5', '#EC4899', '#8B5CF6', '#10B981'
    ];
    
    return Array.from({ length: blobCount }, (_, i) => ({
      id: i,
      size: Math.random() * (450 - 150) + 150, // 150px se 450px ke beech random size
      color: colors[i % colors.length],
      // Random initial position
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      // Random speed taaki organic lage
      duration: `${Math.random() * (25 - 12) + 12}s`,
      delay: `${Math.random() * -20}s`, // Negative delay taaki start mein hi movement dikhe
    }));
  }, []);

  return (
    <div className="lava-container">
      {/* Background blobs */}
      <div className="gooey-wrapper">
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className={`liquid-element anim-type-${(blob.id % 4) + 1}`}
            style={{
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              backgroundColor: blob.color,
              left: blob.left,
              top: blob.top,
              animationDuration: blob.duration,
              animationDelay: blob.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-text">
        <h1>FULL PAGE FLUID</h1>
        <p>Dynamic Gooey Background</p>
      </div>

      {/* The Liquid Engine */}
      <svg className="svg-engine">
        <defs>
          <filter id="gooey-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -18" 
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LiquidBackground;