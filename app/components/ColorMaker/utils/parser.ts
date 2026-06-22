import { ColorStop, GradientType, ParsedGradient } from "../types";

const NAMED_COLORS: Record<string, string> = {
  red: "#ff0000", blue: "#0000ff", green: "#008000", yellow: "#ffff00",
  black: "#000000", white: "#ffffff", gray: "#808080", grey: "#808080",
  purple: "#800080", orange: "#ffa500", pink: "#ffc0cb", cyan: "#00ffff",
  magenta: "#ff00ff", lime: "#00ff00", teal: "#008080", navy: "#000080",
  maroon: "#800000", olive: "#808000", silver: "#c0c0c0", aqua: "#00ffff",
  fuchsia: "#ff00ff", indigo: "#4b0082", violet: "#ee82ee", tomato: "#ff6347",
  gold: "#ffd700", coral: "#ff7f50", salmon: "#fa8072", khaki: "#f0e68c",
  plum: "#dda0dd", orchid: "#da70d6", tan: "#d2b48c", sienna: "#a0522d",
  chocolate: "#d2691e", crimson: "#dc143c", firebrick: "#b22222", brown: "#a52a2a",
  darkred: "#8b0000", darkblue: "#00008b", darkgreen: "#006400", darkcyan: "#008b8b",
  darkmagenta: "#8b008b", darkorange: "#ff8c00", darkviolet: "#9400d3",
  deeppink: "#ff1493", deepskyblue: "#00bfff", dodgerblue: "#1e90ff",
  hotpink: "#ff69b4", lightblue: "#add8e6", lightcoral: "#f08080",
  lightgreen: "#90ee90", lightpink: "#ffb6c1", lightyellow: "#ffffe0",
  palegreen: "#98fb98", paleturquoise: "#afeeee", rosybrown: "#bc8f8f",
  royalblue: "#4169e1", slateblue: "#6a5acd", steelblue: "#4682b4",
  transparent: "#00000000",
};

function parseColorStop(raw: string): { value: string; opacity: number } | null {
  let s = raw.trim();

  if (s.startsWith("#")) {
    const hex = s.slice(0, 7);
    if (/^#[0-9a-fA-F]{6}$/.test(hex) || /^#[0-9a-fA-F]{3}$/.test(hex)) {
      return { value: hex, opacity: 1 };
    }
    if (/^#[0-9a-fA-F]{8}$/.test(hex)) {
      return { value: hex.slice(0, 7), opacity: 1 };
    }
    return null;
  }

  if (s.startsWith("rgba(") || s.startsWith("rgba (")) {
    const m = s.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (m) {
      const opacity = m[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(m[4]))) : 1;
      return { value: `rgb(${m[1]}, ${m[2]}, ${m[3]})`, opacity };
    }
  }

  if (s.startsWith("rgb(") || s.startsWith("rgb (")) {
    const m = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (m) {
      return { value: `rgb(${m[1]}, ${m[2]}, ${m[3]})`, opacity: 1 };
    }
  }

  if (s.startsWith("hsla(") || s.startsWith("hsla (")) {
    const m = s.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (m) {
      const opacity = m[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(m[4]))) : 1;
      return { value: `hsl(${m[1]}, ${m[2]}, ${m[3]})`, opacity };
    }
  }

  if (s.startsWith("hsl(") || s.startsWith("hsl (")) {
    const m = s.match(/hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*\)/);
    if (m) {
      return { value: `hsl(${m[1]}, ${m[2]}, ${m[3]})`, opacity: 1 };
    }
  }

  if (s.startsWith("oklch(")) {
    const m = s.match(/oklch\s*\(([^)]+)\)/);
    if (m) return { value: `oklch(${m[1]})`, opacity: 1 };
  }

  const lower = s.toLowerCase();
  if (NAMED_COLORS[lower]) {
    return { value: NAMED_COLORS[lower], opacity: 1 };
  }

  return null;
}

function extractColorStops(args: string): { value: string; opacity: number }[] {
  const parts = args.split(",");
  const stops: { value: string; opacity: number }[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const maybeColor = trimmed.replace(/\s+\d+%$/, "").replace(/\s+\d+px$/, "").trim();
    const parsed = parseColorStop(maybeColor);
    if (parsed) {
      stops.push(parsed);
    }
  }

  return stops;
}

export function parseGradientString(input: string): ParsedGradient | null {
  const s = input.trim();

  let m: RegExpMatchArray | null;

  m = s.match(/^linear-gradient\s*\((.+)\)\s*$/i);
  if (m) {
    const args = m[1];
    let direction = "to bottom";
    let colorArgs = args;

    const dirMatch = args.match(/^\s*(to\s+\w+(?:\s+\w+)?)\s*,\s*(.*)/i);
    if (dirMatch) {
      direction = dirMatch[1].trim();
      colorArgs = dirMatch[2];
    } else {
      const angleMatch = args.match(/^\s*([\d.]+(?:deg|turn|rad|grad))\s*,\s*(.*)/i);
      if (angleMatch) {
        direction = angleMatch[1].trim();
        colorArgs = angleMatch[2];
      }
    }

    const stops = extractColorStops(colorArgs);
    if (stops.length === 0) return null;

    return {
      type: "linear",
      direction,
      colors: stops.map((s) => ({ value: s.value, format: s.value.startsWith("hsl") ? "hsla" : s.value.startsWith("rgb") ? "rgba" : "hex", opacity: s.opacity })),
    };
  }

  m = s.match(/^radial-gradient\s*\((.+)\)\s*$/i);
  if (m) {
    const args = m[1];
    let direction = "center";
    let colorArgs = args;

    const posMatch = args.match(/^(circle\s+at\s+[\w%]+\s+[\w%]+)\s*,\s*(.*)/i);
    if (posMatch) {
      direction = "center";
      colorArgs = posMatch[2];
    } else if (/^(circle|ellipse|closest-side|farthest-side|closest-corner|farthest-corner)/i.test(args)) {
      const shapeMatch = args.match(/^[^,]+,\s*(.*)/);
      if (shapeMatch) colorArgs = shapeMatch[1];
    }

    const stops = extractColorStops(colorArgs);
    if (stops.length === 0) return null;

    return {
      type: "radial",
      direction,
      colors: stops.map((s) => ({ value: s.value, format: s.value.startsWith("hsl") ? "hsla" : s.value.startsWith("rgb") ? "rgba" : "hex", opacity: s.opacity })),
    };
  }

  m = s.match(/^conic-gradient\s*\((.+)\)\s*$/i);
  if (m) {
    const args = m[1];
    let colorArgs = args;

    const fromMatch = args.match(/^(from\s+[\d.]+(?:deg|turn|rad|grad)(?:\s+at\s+[\w%]+\s+[\w%]+)?)\s*,\s*(.*)/i);
    if (fromMatch) {
      colorArgs = fromMatch[2];
    }

    const stops = extractColorStops(colorArgs);
    if (stops.length === 0) return null;

    return {
      type: "conic",
      direction: "center",
      colors: stops.map((s) => ({ value: s.value, format: s.value.startsWith("hsl") ? "hsla" : s.value.startsWith("rgb") ? "rgba" : "hex", opacity: s.opacity })),
    };
  }

  return null;
}
