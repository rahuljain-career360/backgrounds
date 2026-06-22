import { ColorStop, GradientType } from "../types";

export function gradientCss(
  colors: ColorStop[],
  type: GradientType,
  dir: string
): string {
  if (colors.length === 0) return "#000";
  if (colors.length === 1) return colors[0].value;
  const stops = colors.map((c) => c.value).join(", ");
  switch (type) {
    case "radial":
      return `radial-gradient(circle at center, ${stops})`;
    case "conic":
      return `conic-gradient(from 0deg at center, ${stops})`;
    default:
      return `linear-gradient(${dir}, ${stops})`;
  }
}

export function buildGradient(
  ctx: CanvasRenderingContext2D,
  colors: ColorStop[],
  type: GradientType,
  dir: string,
  w: number,
  h: number
): CanvasGradient {
  const stops = colors.length;
  if (stops === 0) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#000");
    return g;
  }
  if (stops === 1) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, colors[0].value);
    g.addColorStop(1, colors[0].value);
    return g;
  }

  let grad: CanvasGradient;

  switch (type) {
    case "radial":
      grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
      break;
    case "conic":
      grad = ctx.createConicGradient(0, w / 2, h / 2);
      break;
    default: {
      let x0 = 0, y0 = 0, x1 = w, y1 = h;
      switch (dir) {
        case "to right": x0 = 0; y0 = 0; x1 = w; y1 = 0; break;
        case "to left": x0 = w; y0 = 0; x1 = 0; y1 = 0; break;
        case "to bottom": x0 = 0; y0 = 0; x1 = 0; y1 = h; break;
        case "to top": x0 = 0; y0 = h; x1 = 0; y1 = 0; break;
        case "to bottom right": x0 = 0; y0 = 0; x1 = w; y1 = h; break;
        case "to bottom left": x0 = w; y0 = 0; x1 = 0; y1 = h; break;
        case "to top right": x0 = 0; y0 = h; x1 = w; y1 = 0; break;
        case "to top left": x0 = w; y0 = h; x1 = 0; y1 = 0; break;
        default: {
          const angleDeg = parseFloat(dir);
          if (!isNaN(angleDeg)) {
            const angle = (angleDeg * Math.PI) / 180;
            const cx = w / 2, cy = h / 2;
            const len = Math.max(w, h);
            x0 = cx - len * Math.cos(angle);
            y0 = cy - len * Math.sin(angle);
            x1 = cx + len * Math.cos(angle);
            y1 = cy + len * Math.sin(angle);
          }
          break;
        }
      }
      grad = ctx.createLinearGradient(x0, y0, x1, y1);
      break;
    }
  }

  for (let i = 0; i < stops; i++) {
    grad.addColorStop(i / (stops - 1), colors[i].value);
  }

  return grad;
}

export function detectColorFormat(value: string): "hex" | "rgba" | "hsla" {
  const s = value.trim().toLowerCase();
  if (s.startsWith("rgb")) return "rgba";
  if (s.startsWith("hsl")) return "hsla";
  if (s.startsWith("#")) return "hex";
  if (s.startsWith("oklch")) return "hsla";
  return "hex";
}

export function rgbaToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgba(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
