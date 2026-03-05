"use client"
import React, { useRef, useEffect, CSSProperties } from 'react';

const BackgroundGenerator: React.FC = () => {
  // Specify the type of the ref as HTMLCanvasElement
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Configuration for 4K
  const width = 3840;
  const height = 2160;
  const squareSize = 240; 

  const drawBackground = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill the grid with random colored squares
    for (let x = 0; x < width; x += squareSize) {
      for (let y = 0; y < height; y += squareSize) {
        const hue = Math.floor(Math.random() * 360);
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.fillRect(x, y, squareSize, squareSize);
        
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.strokeRect(x, y, squareSize, squareSize);
      }
    }
  };

  useEffect(() => {
    drawBackground();
  }, []);

  const downloadPNG = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'background-4k.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.previewNote}>4K Preview (Scaled to Fit Viewport)</div>
      
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        style={styles.canvasPreview} 
      />

      <div style={styles.controls}>
        <button onClick={drawBackground} style={styles.secondaryBtn}>
          🔀 Regenerate Colors
        </button>
        <button onClick={downloadPNG} style={styles.primaryBtn}>
          💾 Download 4K PNG
        </button>
      </div>
    </div>
  );
};

// Typed styles object using React.CSSProperties
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    fontFamily: 'system-ui, sans-serif',
    padding: '20px'
  },
  canvasPreview: {
    maxWidth: '100%',
    maxHeight: '70vh',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    border: '4px solid #333',
    borderRadius: '8px',
    backgroundColor: '#000'
  },
  previewNote: { 
    marginBottom: '10px', 
    fontSize: '14px', 
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  controls: { 
    marginTop: '30px', 
    display: 'flex', 
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryBtn: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  secondaryBtn: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }
};

export default BackgroundGenerator;