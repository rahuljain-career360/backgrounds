import { PatternConfig, PatternType } from "../types";

function esc(s: string) {
  return encodeURIComponent(s);
}

function svgPattern(config: PatternConfig): string {
  const { fgColor, bgColor } = config;

  switch (config.type) {
    case "zigzag": {
      const w = config.dotSpacing;
      const h = config.waveAmplitude || 20;
      const lw = config.lineWidth || 2;
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Cpolygon points='0,${h} ${w / 2},0 ${w},${h}' fill='${esc(fgColor)}' stroke='${esc(fgColor)}' stroke-width='${lw}'/%3E%3C/svg%3E") repeat 0 0 / ${w}px ${h}px, ${bgColor}`;
    }
    case "brick": {
      const bw = config.brickWidth || 60;
      const bh = config.brickHeight || 30;
      const lw = config.lineWidth || 2;
      const hbw = bw / 2;
      const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${bw}' height='${bh}'%3E%3Crect x='0' y='0' width='${bw - lw}' height='${bh - lw}' fill='${esc(bgColor)}'/%3E%3Crect x='-${hbw}' y='${bh}' width='${bw - lw}' height='${bh - lw}' fill='${esc(bgColor)}'/%3E%3Crect x='${hbw}' y='${bh}' width='${bw - lw}' height='${bh - lw}' fill='${esc(bgColor)}'/%3E%3C/svg%3E`;
      return `url("data:image/svg+xml,${svg}") repeat 0 0 / ${bw}px ${bh * 2}px, ${fgColor}`;
    }
    case "honeycomb": {
      const s = config.honeycombSize || 30;
      const lw = config.lineWidth || 2;
      const h = s * Math.sqrt(3);
      const points = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        points.push([s + s * Math.cos(a), h / 2 + s * Math.sin(a)]);
      }
      const pts = points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
      const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${s * 3}' height='${h}'%3E%3Cpolygon points='${pts}' fill='${esc(bgColor)}' stroke='${esc(fgColor)}' stroke-width='${lw}'/%3E%3Cpolygon points='${pts}' fill='${esc(bgColor)}' stroke='${esc(fgColor)}' stroke-width='${lw}' transform='translate(${s * 1.5}, ${h / 2})'/%3E%3Cpolygon points='${pts}' fill='${esc(bgColor)}' stroke='${esc(fgColor)}' stroke-width='${lw}' transform='translate(0, ${h})'/%3E%3Cpolygon points='${pts}' fill='${esc(bgColor)}' stroke='${esc(fgColor)}' stroke-width='${lw}' transform='translate(${s * 1.5}, ${h * 1.5})'/%3E%3C/svg%3E`;
      return `url("data:image/svg+xml,${svg}") repeat 0 0 / ${s * 3}px ${h * 2}px, ${bgColor}`;
    }
    default:
      return bgColor;
  }
}

export function patternCss(config: PatternConfig): string {
  const { type, fgColor, bgColor, fgColor2 } = config;

  switch (type) {
    case "dots": {
      const s = config.dotSpacing;
      const r = config.dotSize;
      if (s <= 0) return bgColor;
      return `radial-gradient(circle, ${fgColor} ${r}px, transparent ${r}px) 0 0 / ${s}px ${s}px,
radial-gradient(circle, ${fgColor} ${r}px, transparent ${r}px) ${s / 2}px ${s / 2}px / ${s}px ${s}px,
${bgColor}`;
    }

    case "stripes": {
      const w = config.stripeWidth;
      const a = config.stripeAngle;
      return `repeating-linear-gradient(${a}deg, ${fgColor} 0px, ${fgColor} ${w}px, ${bgColor} ${w}px, ${bgColor} ${w * 2}px)`;
    }

    case "checkerboard": {
      const c = config.cellSize;
      if (c <= 0) return bgColor;
      const hs = c / 2;
      return `linear-gradient(0deg, ${fgColor} 50%, transparent 50%) 0 0 / ${c}px ${c}px,
linear-gradient(90deg, ${fgColor} 50%, transparent 50%) ${hs}px ${hs}px / ${c}px ${c}px,
${bgColor}`;
    }

    case "grid": {
      const g = config.gridSize;
      const lw = config.lineWidth;
      return `repeating-linear-gradient(0deg, ${fgColor} 0px, ${fgColor} ${lw}px, transparent ${lw}px, transparent ${g}px),
repeating-linear-gradient(90deg, ${fgColor} 0px, ${fgColor} ${lw}px, transparent ${lw}px, transparent ${g}px),
${bgColor}`;
    }

    case "waves": {
      const amp = config.waveAmplitude;
      const freq = config.waveFrequency || 0.03;
      const w = Math.round(200 / (freq * 100)) || 200;
      const path: string[] = [];
      for (let x = 0; x <= w; x++) {
        const y = 30 + Math.sin(x * freq * Math.PI * 2) * amp;
        path.push(x === 0 ? `M${x} ${y}` : `L${x} ${y}`);
      }
      const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='60'%3E%3Cpath d='${path.join(" ")}' fill='none' stroke='${esc(fgColor)}' stroke-width='2'/%3E%3C/svg%3E`;
      return `url("data:image/svg+xml,${svg}") repeat 0 0 / ${w}px 60px, ${bgColor}`;
    }

    case "noise": {
      const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='${Math.min(1, config.noiseIntensity * 2)}'/%3E%3C/svg%3E`;
      return `${bgColor}, url("data:image/svg+xml,${svg}")`;
    }

    case "crosshatch": {
      const a = config.stripeAngle;
      const s = config.gridSize || 30;
      const lw = config.lineWidth || 1;
      const c2 = fgColor2 || fgColor;
      return `repeating-linear-gradient(${a}deg, ${fgColor} 0px, ${fgColor} ${lw}px, transparent ${lw}px, transparent ${s}px),
repeating-linear-gradient(${-a}deg, ${c2} 0px, ${c2} ${lw}px, transparent ${lw}px, transparent ${s}px),
${bgColor}`;
    }

    case "plaid": {
      const bw = config.stripeWidth || 20;
      const g = config.gridSize || 80;
      const c2 = fgColor2 || fgColor;
      return `repeating-linear-gradient(0deg, ${fgColor} 0px, ${fgColor} ${bw}px, transparent ${bw}px, transparent ${g}px),
repeating-linear-gradient(90deg, ${c2} 0px, ${c2} ${bw}px, transparent ${bw}px, transparent ${g}px),
${bgColor}`;
    }

    case "waveflow": {
      const amp = Math.max(10, config.waveAmplitude || 80);
      const freq = config.waveFrequency || 0.015;
      const layers = Math.max(2, Math.min(10, config.waveLayers || 5));
      const scatter = Math.min(1, Math.max(0, config.waveScatter || 0.6));
      const sw = 800, sh = 450;
      const c1 = fgColor, c2 = fgColor2 || fgColor;
      const defs: string[] = [];
      const paths: string[] = [];
      const samples = 80;
      for (let i = 0; i < layers; i++) {
        const t = i / Math.max(1, layers - 1);
        const yBase = (sh / (layers + 1.5)) * (i + 1.5);
        const bandH = 20 + t * 70;
        const lAmp = amp * (0.25 + t * 0.75);
        const lFreq = freq * (0.5 + t * 1.0);
        const phase = i * 1.5;
        const alpha = 0.35 + t * 0.45;
        const gId = `w${i}`;
        const colA = i % 2 === 0 ? c1 : c2;
        const colB = i % 2 === 0 ? c2 : c1;
        defs.push(`%3ClinearGradient id='${gId}' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='${esc(colA)}'/%3E%3Cstop offset='100%25' stop-color='${esc(colB)}'/%3E%3C/linearGradient%3E`);
        let d = "";
        for (let s = 0; s <= samples; s++) {
          const x = (s / samples) * sw;
          const spread = 1 + scatter * Math.pow(x / sw, 1.5) * 6;
          const y = yBase - bandH / 2 + Math.sin(x * lFreq + phase) * lAmp * spread;
          d += s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`;
        }
        for (let s = samples; s >= 0; s--) {
          const x = (s / samples) * sw;
          const spread = 1 + scatter * Math.pow(x / sw, 1.5) * 5.5;
          const y = yBase + bandH / 2 + Math.sin(x * lFreq + phase + 2.0 + t) * lAmp * 0.6 * spread;
          d += `L${x.toFixed(1)},${y.toFixed(1)}`;
        }
        d += "Z";
        paths.push(`%3Cpath d='${d}' fill='url(%23${gId})' opacity='${alpha.toFixed(2)}'/%3E`);
      }
      const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${sw}' height='${sh}'%3E%3Cdefs%3E${defs.join("")}%3C/defs%3E${paths.join("")}%3C/svg%3E`;
      return `url("data:image/svg+xml,${svg}") no-repeat 50% 50% / cover, ${bgColor}`;
    }

    case "zigzag":
    case "brick":
    case "honeycomb":
      return svgPattern(config);

    default:
      return bgColor;
  }
}

export function drawPattern(
  ctx: CanvasRenderingContext2D,
  config: PatternConfig,
  w: number,
  h: number
): void {
  const { type, fgColor, bgColor, fgColor2 } = config;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  switch (type) {
    case "dots": {
      const s = config.dotSpacing || 40;
      const r = Math.max(1, config.dotSize || 8);
      ctx.fillStyle = fgColor;
      const rows = Math.ceil(h / s) + 2;
      const cols = Math.ceil(w / s) + 2;
      for (let row = 0; row < rows; row++) {
        const y = row * s + s / 2;
        for (let col = 0; col < cols; col++) {
          const x = col * s + (row % 2 === 0 ? s / 2 : 0) + s / 2;
          ctx.beginPath();
          ctx.arc(x - s / 2, y - s / 2, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case "stripes": {
      const sw = Math.max(1, config.stripeWidth || 20);
      const angle = ((config.stripeAngle || 0) * Math.PI) / 180;
      const len = Math.sqrt(w * w + h * h) * 2;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);
      ctx.translate(-w / 2, -h / 2);
      ctx.fillStyle = fgColor;
      for (let x = -len; x < len * 2; x += sw * 2) {
        ctx.fillRect(x, -len, sw, len * 2);
      }
      ctx.restore();
      break;
    }

    case "checkerboard": {
      const c = Math.max(2, config.cellSize || 30);
      ctx.fillStyle = fgColor;
      const cols = Math.ceil(w / c) + 1;
      const rows = Math.ceil(h / c) + 1;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if ((x + y) % 2 === 0) {
            ctx.fillRect(x * c, y * c, c, c);
          }
        }
      }
      break;
    }

    case "grid": {
      const g = Math.max(2, config.gridSize || 40);
      const lw = Math.max(1, config.lineWidth || 2);
      ctx.fillStyle = fgColor;
      for (let x = 0; x <= w; x += g) {
        ctx.fillRect(x, 0, lw, h);
      }
      for (let y = 0; y <= h; y += g) {
        ctx.fillRect(0, y, w, lw);
      }
      break;
    }

    case "waves": {
      const amp = config.waveAmplitude || 20;
      const freq = config.waveFrequency || 0.03;
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = 2;
      for (let row = 0; row < Math.ceil(h / 60) + 1; row++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 1) {
          const y = row * 60 + 30 + Math.sin(x * freq * Math.PI * 2 + row * 2.5) * amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      break;
    }

    case "noise": {
      const intensity = Math.min(1, Math.max(0.01, config.noiseIntensity || 0.15));
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = fgColor;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      break;
    }

    case "crosshatch": {
      const a = ((config.stripeAngle || 45) * Math.PI) / 180;
      const s = Math.max(2, config.gridSize || 30);
      const lw = Math.max(1, config.lineWidth || 1);
      const c2 = fgColor2 || fgColor;
      const len = Math.sqrt(w * w + h * h) * 2;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(a);
      ctx.translate(-w / 2, -h / 2);
      ctx.fillStyle = fgColor;
      for (let x = -len; x < len * 2; x += s) {
        ctx.fillRect(x, -len, lw, len * 2);
      }
      ctx.restore();
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-a);
      ctx.translate(-w / 2, -h / 2);
      ctx.fillStyle = c2;
      for (let x = -len; x < len * 2; x += s) {
        ctx.fillRect(x, -len, lw, len * 2);
      }
      ctx.restore();
      break;
    }

    case "plaid": {
      const bw = Math.max(1, config.stripeWidth || 20);
      const g = Math.max(2, config.gridSize || 80);
      const c2 = fgColor2 || fgColor;
      ctx.fillStyle = fgColor;
      for (let x = 0; x <= w; x += g) {
        ctx.fillRect(x, 0, bw, h);
      }
      ctx.fillStyle = c2;
      for (let y = 0; y <= h; y += g) {
        ctx.fillRect(0, y, w, bw);
      }
      break;
    }

    case "zigzag": {
      const zz = Math.max(4, config.dotSpacing || 40);
      const zh = Math.max(4, config.waveAmplitude || 20);
      const lw = Math.max(1, config.lineWidth || 2);
      ctx.fillStyle = fgColor;
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = lw;
      const cols = Math.ceil(w / zz) + 2;
      const rows = Math.ceil(h / zh) + 2;
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * zh + zh * (row % 2));
        for (let col = 0; col < cols; col++) {
          const x = col * zz;
          const y = row * zh + zh * (row % 2) + (col % 2 === 0 ? 0 : zh);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      break;
    }

    case "brick": {
      const bw = Math.max(4, config.brickWidth || 60);
      const bh = Math.max(4, config.brickHeight || 30);
      const lw = Math.max(1, config.lineWidth || 2);
      ctx.fillStyle = fgColor;
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = lw;
      const cols = Math.ceil(w / bw) + 2;
      const rows = Math.ceil(h / bh) + 4;
      for (let row = 0; row < rows; row++) {
        const off = row % 2 === 0 ? 0 : bw / 2;
        for (let col = -1; col < cols; col++) {
          const x = col * bw + off;
          const y = row * (bh + lw);
          ctx.strokeRect(x, y, bw - lw, bh);
        }
      }
      break;
    }

    case "honeycomb": {
      const s = Math.max(8, config.honeycombSize || 30);
      const lw = Math.max(1, config.lineWidth || 2);
      const hexH = s * Math.sqrt(3);
      const hexW = s * 2;
      const rows = Math.ceil(h / (hexH * 0.75)) + 4;
      const cols = Math.ceil(w / (hexW * 0.75)) + 4;
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = lw;
      for (let row = 0; row < rows; row++) {
        const offX = row % 2 === 0 ? 0 : hexW * 0.375;
        for (let col = 0; col < cols; col++) {
          const cx = col * hexW * 0.75 + offX;
          const cy = row * hexH * 0.75 + hexH / 2;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + s * Math.cos(a);
            const py = cy + s * Math.sin(a);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
      break;
    }

    case "waveflow": {
      const amp = Math.max(10, config.waveAmplitude || 80);
      const freq = config.waveFrequency || 0.015;
      const layers = Math.max(2, Math.min(10, config.waveLayers || 5));
      const scatter = Math.min(1, Math.max(0, config.waveScatter || 0.6));
      const c1 = fgColor, c2 = fgColor2 || fgColor;
      const samples = Math.max(100, Math.round(w / 4));
      for (let i = 0; i < layers; i++) {
        const t = i / Math.max(1, layers - 1);
        const yBase = (h / (layers + 1.5)) * (i + 1.5);
        const bandH = 20 + t * 70;
        const lAmp = amp * (0.25 + t * 0.75);
        const lFreq = freq * (0.5 + t * 1.0);
        const phase = i * 1.5;
        const alpha = 0.35 + t * 0.45;
        const colA = i % 2 === 0 ? c1 : c2;
        const colB = i % 2 === 0 ? c2 : c1;
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, colA);
        grad.addColorStop(1, colB);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        for (let s = 0; s <= samples; s++) {
          const x = (s / samples) * w;
          const spread = 1 + scatter * Math.pow(x / w, 1.5) * 6;
          const y = yBase - bandH / 2 + Math.sin(x * lFreq + phase) * lAmp * spread;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        for (let s = samples; s >= 0; s--) {
          const x = (s / samples) * w;
          const spread = 1 + scatter * Math.pow(x / w, 1.5) * 5.5;
          const y = yBase + bandH / 2 + Math.sin(x * lFreq + phase + 2.0 + t) * lAmp * 0.6 * spread;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    }
  }
}
