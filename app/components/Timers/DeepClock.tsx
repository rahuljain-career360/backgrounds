"use client"
import React, { useState, useEffect } from 'react';
import './DeepClock.css';

const DeepClock: React.FC = () => {
  const TOTAL_TIME = 0.5 * 60; // 30 Seconds
  const [seconds, setSeconds] = useState(TOTAL_TIME);
  const [isFinished, setIsFinished] = useState(false);
  
  // Customization States
  const [theme, setTheme] = useState('ocean'); // ocean, fire, forest, royal
  const [animation, setAnimation] = useState('rise'); // rise, wave, expand

  const fillPercentage = ((TOTAL_TIME - seconds) / TOTAL_TIME) * 100;

  useEffect(() => {
    let interval: any = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      setIsFinished(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const handleReset = () => {
    setSeconds(TOTAL_TIME);
    setIsFinished(false);
  };

  return (
    <div className={`app-viewport theme-${theme}`}>
      <div className="controls-container">
        <div className="dropdown-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="ocean">🌊 Ocean Blue</option>
            <option value="fire">🔥 Lava Red</option>
            <option value="forest">🌿 Forest Green</option>
            <option value="royal">👑 Royal Gold</option>
          </select>
        </div>

        <div className="dropdown-group">
          <label>Animation</label>
          <select value={animation} onChange={(e) => setAnimation(e.target.value)}>
            <option value="rise">Straight Rise</option>
            <option value="wave">Liquid Wave</option>
            <option value="expand">Center Expand</option>
          </select>
        </div>
      </div>

      <div className={`circle-timer ${isFinished ? 'finished' : ''} anim-${animation}`}>
        
        {/* Fill Layer */}
        <div 
          className="fill-layer" 
          style={animation === 'expand' 
            ? { transform: `scale(${fillPercentage / 100})` } 
            : { height: `${fillPercentage}%` }
          } 
        />

        <div className="content-layer">
          {!isFinished ? (
            <>
              <p className="status-label">WORKING</p>
              <h1 className="timer-text">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</h1>
            </>
          ) : (
            <div className="finish-state">
              <div className="emoji-blast">✨🔥🚀</div>
              <h2 className="finish-title">BOOM!</h2>
              <button className="reset-btn" onClick={handleReset}>RESTART</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepClock;