import AnimatedSVGPage from "../components/logo/AnimatedSVGPage";
import CelestialGrid from "../components/logo/CelestialGrid";
import EventHorizon from "../components/logo/EventHorizon";
import GlassmorphicCrystal from "../components/logo/GlassmorphicCrystal";
import GlassPortal from "../components/logo/GlassPortal";
import KineticGrid from "../components/logo/KineticGrid";
import LiquidMeshBackground from "../components/logo/LiquidMeshBackground";
import NeuralPulse from "../components/logo/NeuralPulse";
import ObsidianFlow from "../components/logo/ObsidianFlow";
import PremiumAuroraBackground from "../components/logo/PremiumAuroraBackground";
import PremiumCard from "../components/logo/PremiumCard";
import PremiumLogo from "../components/logo/PremiumLogo";
import WarpTunnel from "../components/logo/WarpTunnel";
import ProductPage from "../components/Product/ProductPage";
import DeepClock from "../components/Timers/DeepClock";
import { FlipMaster } from "../components/Timers/FlipMaster";
import GlassTimer from "../components/Timers/GlassTimer";
import GradientTimer from "../components/Timers/GradientTimer";
import LuxuryTimer from "../components/Timers/LuxuryTimer";
import PremiumTimer from "../components/Timers/PremiumTimer";
import ShrinkingTimer from "../components/Timers/ShrinkingTimer";

export const timers = {
  TimerOne: {
    name: "First Timer",
    Component: FlipMaster,
  },
  ShrikTimer: {
    name: "Shrik Timer",
    Component: ShrinkingTimer,
  },
  PremiumTimer: {
    name: "Premium Timer",
    Component: PremiumTimer,
  },
  GlassTimer: {
    name: "Glass Timer",
    Component: GlassTimer,
  },
  LuxuryTimer: {
    name: "Luxury Timer",
    Component: LuxuryTimer,
  },
  GradientTimer: {
    name: "Gradient Timer",
    Component: GradientTimer,
  },
  DeepClock: {
    name: "Deep Clock",
    Component: DeepClock,
  },
  ProductPage: {
    name: "Product Page",
    Component: ProductPage,
  },

  PremiumLogo: {
    name: "Premium Logo Page",
    Component: PremiumLogo,
  },
  AnimatedSVGPageDesign: {
    name: "AnimatedSVGDesign Page",
    Component: AnimatedSVGPage,
  },
  PremiumSvgCard: {
    name: "Premium Card Page",
    Component: PremiumCard,
  },
  LiquidMesh: {
    name: "Liquid Mesh Card Page",
    Component: LiquidMeshBackground,
  },

  PremiumAurora: {
    name: "Premium Aurora Background",
    Component: PremiumAuroraBackground,
  },
  KineticGrid: {
    name: "Kinetic Grid Background",
    Component: KineticGrid,
  },
  ObsidianFlow: {
    name: "Obsidian Flow Grid Background",
    Component: ObsidianFlow,
  },
  EventHorizonBg: {
    name: "EventHorizon Flow Grid Background",
    Component: EventHorizon,
  },
  CelestialGrid: {
    name: "Celestial Grid Background",
    Component: CelestialGrid,
  },
  WarpTunnelPage: {
    name: "WarpTunnel Page Grid Background",
    Component: WarpTunnel,
  },
  NeuralPulsePage: {
    name: "NeuralPulse Page Background",
    Component: NeuralPulse,
  },
  GlassPortalPage: {
    name: "GlassPortal Page Background",
    Component: GlassPortal,
  },

  GlassmorphicCrystalPage: {
    name: "GlassmorphicCrystalPage Page Background",
    Component: GlassmorphicCrystal,
  },
} as const;
