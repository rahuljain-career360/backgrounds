// // import React, { useMemo } from 'react';
// // import './BubbleEffect.css';

// // interface Bubble {
// //   id: number;
// //   size: number;
// //   left: string;
// //   duration: string;
// //   delay: string;
// //   blur: string;
// // }

// // const BubbleEffect: React.FC = () => {
// //   const bubbleCount = 25; // Keep it low for a clean look

// //   const bubbles = useMemo(() => {
// //     const temp: Bubble[] = [];
// //     for (let i = 0; i < bubbleCount; i++) {
// //       const size = Math.random() * 60 + 20; // Size between 20px and 80px
// //       temp.push({
// //         id: i,
// //         size: size,
// //         left: `${Math.random() * 100}%`,
// //         duration: `${Math.random() * 10 + 10}s`, // Slow floating up
// //         delay: `${Math.random() * 5}s`,
// //         blur: Math.random() > 0.8 ? '2px' : '0px', // Some bubbles are slightly out of focus
// //       });
// //     }
// //     return temp;
// //   }, []);

// //   return (
// //     <div className="bubble-container">
// //       {bubbles.map((b) => (
// //         <div
// //           key={b.id}
// //           className="bubble"
// //           style={{
// //             width: `${b.size}px`,
// //             height: `${b.size}px`,
// //             left: b.left,
// //             filter: `blur(${b.blur})`,
// //             animationDuration: b.duration,
// //             animationDelay: b.delay,
// //           } as React.CSSProperties}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default BubbleEffect;

// import React, { useMemo } from 'react';
// import './BubbleEffect.css';

// interface Bubble {
//   id: number;
//   size: number;
//   left: string;
//   duration: string;
//   delay: string;
//   color: string;
// }

// const BubbleEffect: React.FC = () => {
//   const bubbleCount = 30;
//   // Light gradient colors (Pastel shades)
//   const colors = [
//     'rgba(173, 216, 230, 0.4)', // Light Blue
//     'rgba(255, 182, 193, 0.4)', // Light Pink
//     'rgba(221, 160, 221, 0.4)', // Plum
//     'rgba(144, 238, 144, 0.4)', // Light Green
//   ];

//   const bubbles = useMemo(() => {
//     const temp: Bubble[] = [];
//     for (let i = 0; i < bubbleCount; i++) {
//       temp.push({
//         id: i,
//         size: Math.random() * 50 + 30, // 30px to 80px
//         left: `${Math.random() * 100}%`,
//         duration: `${8 + Math.random() * 12}s`,
//         delay: `${Math.random() * 10}s`,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       });
//     }
//     return temp;
//   }, []);

//   return (
//     <div className="bubble-container">
//       {bubbles.map((b) => (
//         <div
//           key={b.id}
//           className="bubble"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             left: b.left,
//             animationDuration: b.duration,
//             animationDelay: b.delay,
//             '--bubble-color': b.color, // Passing color as CSS variable
//           } as React.CSSProperties}
//         />
//       ))}
//     </div>
//   );
// };

// export default BubbleEffect;

import React, { useMemo } from 'react';
import './BubbleEffect.css';

interface Bubble {
  id: number;
  size: number;
  left: string;
  duration: string;
  delay: string;
}

const BubbleEffect: React.FC = () => {
  const bubbleCount = 20; // Fewer bubbles look more "expensive" and clean

  const bubbles = useMemo(() => {
    const temp: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      temp.push({
        id: i,
        size: Math.random() * 80 + 40, // Larger bubbles show the glass effect better
        left: `${Math.random() * 100}%`,
        duration: `${15 + Math.random() * 15}s`, // Very slow and graceful
        delay: `${Math.random() * -20}s`, // Negative delay so some start mid-screen
      });
    }
    return temp;
  }, []);

  return (
    <div className="bubble-container">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleEffect;