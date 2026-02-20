// components/GrainyAuroraBackground.tsx
import React from 'react';
import styles from './GrainyAuroraBackground.module.css';

interface GrainyAuroraBackgroundProps {
  name: string;
  price: string;
  description: string;
  primaryColor: string; // For the top-left gradient
  secondaryColor: string; // For the bottom-right gradient
  baseColor?: string; // Optional: A general background color if gradients don't fill
}

export const GrainyAuroraBackground: React.FC<GrainyAuroraBackgroundProps> = ({ 
  name, 
  price, 
  description, 
  primaryColor, 
  secondaryColor,
  baseColor = '#1a1a2e' // Default dark base
}) => {
  return (
    <>
      {/* SVG Filter Definition for Noise - It needs to be present in the DOM */}
      <svg className="hidden" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" /> {/* Optional: Desaturate the noise */}
          <feComposite operator="in" in2="SourceGraphic" result="grain" />
          <feBlend mode="multiply" in="SourceGraphic" in2="grain" />
        </filter>
      </svg>

      <div 
        className={styles.backgroundContainer}
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
          '--bg-base-color': baseColor,
        } as React.CSSProperties} // Type assertion for CSS variables
      >
        <div className={styles.cardWrapper}>
         
        </div>
      </div>
    </>
  );
};