"use client";
import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialSeconds?: number;
}

const ShrinkingTimer: React.FC<TimerProps> = ({ 
  initialSeconds = 10 
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Click karte hi timer start hoga
  const handleCircleClick = (): void => {
    if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(initialSeconds);
  };

  const percentage: number = (timeLeft / initialSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-12 bg-black min-h-screen">
      
      {/* Container without border */}
      <div className="relative flex items-center justify-center w-80 h-80">
        
        {/* The Shrinking Circle with Gradient */}
        <button
          onClick={handleCircleClick}
          disabled={isActive && timeLeft > 0}
          style={{
            width: `${percentage}%`,
            height: `${percentage}%`,
            // Dynamic Gradient: Jab khatam hoga toh red tone, chalte waqt vibrant blue/green
            background: timeLeft === 0 
              ? "linear-gradient(135deg, #ff416c, #ff4b2b)" 
              : "linear-gradient(135deg, #00f2fe, #4facfe)",
            transition: "width 1s linear, height 1s linear, background 0.5s ease",
          }}
          className={`flex items-center justify-center rounded-full shadow-[0_0_50px_rgba(79,172,254,0.3)] border-none outline-none
            ${!isActive && timeLeft > 0 ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default"}
          `}
        >
          <span className="text-white font-black text-4xl drop-shadow-md">
            {timeLeft > 0 ? timeLeft : "BYE!"}
          </span>
        </button>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={handleReset}
          className="px-10 py-3 bg-white/10 text-white rounded-full font-bold backdrop-blur-md hover:bg-white/20 transition-all border border-white/20"
        >
          RESTART
        </button>
        
        <p className="text-gray-400 text-sm tracking-widest uppercase italic">
          {isActive ? "Running..." : timeLeft === 0 ? "Time Out" : "Tap circle to start"}
        </p>
      </div>
    </div>
  );
};

export default ShrinkingTimer;