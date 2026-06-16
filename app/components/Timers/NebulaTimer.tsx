"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./NebulaTimer.module.css";

interface Props {
  initialSeconds?: number;
}

const NebulaTimer: React.FC<Props> = ({ initialSeconds = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number; hue: number; life: number }[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((p) => p - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particlesRef.current.push({
        x: w / 2 + (Math.random() - 0.5) * w * 0.4,
        y: h / 2 + (Math.random() - 0.5) * h * 0.4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2,
        r: Math.random() * 3 + 1,
        hue: 240 + Math.random() * 120,
        life: 1,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      const t = timeLeft / initialSeconds;
      grad.addColorStop(0, `hsla(270, 80%, 60%, ${0.15 * t})`);
      grad.addColorStop(0.5, `hsla(210, 80%, 50%, ${0.1 * t})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      if (isActive && timeLeft > 0 && Math.random() > 0.7) spawnParticle();

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        p.r *= 0.998;
        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.life * 0.6})`;
        ctx.fill();

        ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, ${p.life * 0.4})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.life * 0.15})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isActive, timeLeft, initialSeconds]);

  const toggle = useCallback(() => {
    if (timeLeft > 0) setIsActive((p) => !p);
  }, [timeLeft]);

  const reset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={`${styles.orb} ${isActive ? styles.activeOrb : ""}`} onClick={toggle}>
        <div className={styles.orbInner}>
          <span className={styles.display}>{timeLeft === 0 ? "✨" : display}</span>
          <span className={styles.sub}>
            {timeLeft === 0 ? "COMPLETE" : isActive ? "RUNNING" : "TAP"}
          </span>
        </div>
      </div>
      <button onClick={reset} className={styles.resetBtn}>↻ RESET</button>
    </div>
  );
};

export default NebulaTimer;
