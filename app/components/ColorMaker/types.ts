export type ColorFormat = "hex" | "rgba" | "hsla";

export interface ColorStop {
  value: string;
  format: ColorFormat;
  opacity: number;
}

export type GradientType = "linear" | "radial" | "conic";

export type PatternType =
  | "dots"
  | "stripes"
  | "checkerboard"
  | "grid"
  | "waves"
  | "noise"
  | "crosshatch"
  | "plaid"
  | "zigzag"
  | "brick"
  | "honeycomb"
  | "waveflow"
  | "none";

export interface PatternConfig {
  type: PatternType;
  fgColor: string;
  bgColor: string;
  fgColor2: string;
  dotSize: number;
  dotSpacing: number;
  stripeWidth: number;
  stripeAngle: number;
  cellSize: number;
  gridSize: number;
  lineWidth: number;
  waveAmplitude: number;
  waveFrequency: number;
  noiseIntensity: number;
  brickWidth: number;
  brickHeight: number;
  honeycombSize: number;
  waveLayers: number;
  waveScatter: number;
};

export const DEFAULT_PATTERN_CONFIG: PatternConfig = {
  type: "dots",
  fgColor: "#ff006e",
  bgColor: "#1a0020",
  fgColor2: "#7b2ff7",
  dotSize: 8,
  dotSpacing: 40,
  stripeWidth: 20,
  stripeAngle: 45,
  cellSize: 30,
  gridSize: 40,
  lineWidth: 2,
  waveAmplitude: 100,
  waveFrequency: 0.012,
  noiseIntensity: 0.15,
  brickWidth: 60,
  brickHeight: 30,
  honeycombSize: 30,
  waveLayers: 6,
  waveScatter: 0.65,
};

export interface ParsedGradient {
  type: GradientType;
  direction: string;
  colors: ColorStop[];
}

export const SIZES = [
  { label: "HD (1920×1080)", w: 1920, h: 1080, suffix: "hd" },
  { label: "2K (2560×1440)", w: 2560, h: 1440, suffix: "2k" },
  { label: "4K (3840×2160)", w: 3840, h: 2160, suffix: "4k" },
  { label: "8K (7680×4320)", w: 7680, h: 4320, suffix: "8k" },
] as const;

export const FORMATS = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
] as const;

export const GRADIENT_TYPES: { value: GradientType; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
  { value: "conic", label: "Conic" },
];

export const DIRECTIONS = [
  { value: "to right", label: "→" },
  { value: "to left", label: "←" },
  { value: "to bottom", label: "↓" },
  { value: "to top", label: "↑" },
  { value: "to bottom right", label: "↘" },
  { value: "to bottom left", label: "↙" },
  { value: "to top right", label: "↗" },
  { value: "to top left", label: "↖" },
];

export const PRESETS = [
  { colors: ["#ff006e", "#7b2ff7", "#00f5a0"], type: "linear" as const, dir: "to bottom right", name: "Neon Aurora" },
  { colors: ["#ff6b35", "#ff2e63", "#ffd700"], type: "linear" as const, dir: "to right", name: "Warm Sunset" },
  { colors: ["#03045e", "#0077b6", "#48cae4"], type: "linear" as const, dir: "to bottom", name: "Ocean Deep" },
  { colors: ["#0d3b2e", "#1a6b4a", "#4a8a5a"], type: "linear" as const, dir: "to bottom right", name: "Forest Canopy" },
  { colors: ["#2d1b4e", "#6b3fa0", "#d4af37"], type: "linear" as const, dir: "to right", name: "Royal Velvet" },
  { colors: ["#ff006e", "#00f5a0"], type: "radial" as const, dir: "center", name: "Radial Pop" },
  { colors: ["#7b2ff7", "#f200ff", "#4361ee"], type: "linear" as const, dir: "to bottom", name: "Cosmic Dream" },
  { colors: ["#0a0a18", "#1a2a4a", "#8abae8"], type: "linear" as const, dir: "to bottom", name: "Arctic Frost" },
  { colors: ["#f8c8dc", "#b8e6d0", "#c8d8f0"], type: "linear" as const, dir: "to right", name: "Pastel Dream" },
  { colors: ["#06d6a0", "#ffd166", "#ef476f"], type: "conic" as const, dir: "center", name: "Tropical Burst" },
];

export const PATTERN_PRESETS = [
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "dots" as const, fgColor: "#ff006e", bgColor: "#1a0020" }, name: "Neon Dots" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "stripes" as const, fgColor: "#4361ee", bgColor: "#0a0a18", stripeWidth: 15 }, name: "Blue Stripes" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "checkerboard" as const, fgColor: "#7b2ff7", bgColor: "#1a0a2e", cellSize: 25 }, name: "Purple Checker" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "grid" as const, fgColor: "#00f5a0", bgColor: "#0a1a10", gridSize: 35, lineWidth: 1 }, name: "Grid" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waves" as const, fgColor: "#ff6b35", bgColor: "#1a0800", waveAmplitude: 25 }, name: "Waves" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "noise" as const, fgColor: "#ffffff", bgColor: "#08080e", noiseIntensity: 0.12 }, name: "Noise" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "dots" as const, fgColor: "#06d6a0", bgColor: "#002018", dotSize: 4, dotSpacing: 20 }, name: "Tiny Dots" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "stripes" as const, fgColor: "#ef476f", bgColor: "#1a0008", stripeWidth: 30, stripeAngle: -45 }, name: "Diagonal Stripes" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "crosshatch" as const, fgColor: "#4361ee", fgColor2: "#7b2ff7", bgColor: "#0a0a18", gridSize: 25, lineWidth: 1.5 }, name: "Crosshatch" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "plaid" as const, fgColor: "#ff006e", fgColor2: "#4361ee", bgColor: "#0a0a18", stripeWidth: 15, gridSize: 70 }, name: "Plaid" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "zigzag" as const, fgColor: "#00f5a0", bgColor: "#0a1a10", dotSpacing: 40, waveAmplitude: 20 }, name: "Zigzag" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "brick" as const, fgColor: "#ef476f", bgColor: "#1a0008", brickWidth: 60, brickHeight: 30, lineWidth: 2 }, name: "Brick Wall" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "honeycomb" as const, fgColor: "#ffd700", bgColor: "#1a1200", honeycombSize: 25, lineWidth: 2 }, name: "Honeycomb" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waveflow" as const, fgColor: "#ff6b35", fgColor2: "#7b2ff7", bgColor: "#08080e", waveAmplitude: 100, waveFrequency: 0.012, waveLayers: 6, waveScatter: 0.7 }, name: "Solar Flare" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waveflow" as const, fgColor: "#4361ee", fgColor2: "#00f5a0", bgColor: "#08080e", waveAmplitude: 120, waveFrequency: 0.01, waveLayers: 7, waveScatter: 0.6 }, name: "Deep Current" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waveflow" as const, fgColor: "#ef476f", fgColor2: "#ffd700", bgColor: "#08080e", waveAmplitude: 140, waveFrequency: 0.008, waveLayers: 5, waveScatter: 0.8 }, name: "Nebula Drift" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waveflow" as const, fgColor: "#e63946", fgColor2: "#1d3557", bgColor: "#08080e", waveAmplitude: 90, waveFrequency: 0.015, waveLayers: 6, waveScatter: 0.75 }, name: "Crimson Tide" },
  { config: { ...DEFAULT_PATTERN_CONFIG, type: "waveflow" as const, fgColor: "#00b4d8", fgColor2: "#ff006e", bgColor: "#08080e", waveAmplitude: 110, waveFrequency: 0.011, waveLayers: 6, waveScatter: 0.65 }, name: "Electric Pulse" },
];
