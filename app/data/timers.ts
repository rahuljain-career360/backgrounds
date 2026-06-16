import CyberShardGrid from "../components/grid/CyberShardGrid";
import PremiumInsightGrid from "../components/grid/PremiumInsightGrid";
import BentoCarousel from "../components/login/BentoCarousel";
import HyperMesh from "../components/login/HyperMesh";
import InfinityCarousel from "../components/login/InfinityCarousel";
import KineticPortal from "../components/login/KineticPortal";
import KineticShard from "../components/login/KineticShard";
import LiquidSlider from "../components/login/LiquidSlider";
import NeuralGlass from "../components/login/NeuralGlass";
import StackCarousel from "../components/login/StackCarousel";
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
import FullscreenTimer from "../components/Timers/FullscreenTimer";
import NebulaTimer from "../components/Timers/NebulaTimer";
import HologramTimer from "../components/Timers/HologramTimer";
import NeonPulseTimer from "../components/Timers/NeonPulseTimer";
import CrystalTimer from "../components/Timers/CrystalTimer";
import AuraTimer from "../components/Timers/AuraTimer";

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
  FullscreenTimer: {
    name: "Fullscreen Timer",
    Component: FullscreenTimer,
  },
  NebulaTimer: {
    name: "Nebula Timer",
    Component: NebulaTimer,
  },
  HologramTimer: {
    name: "Hologram Timer",
    Component: HologramTimer,
  },
  NeonPulseTimer: {
    name: "Neon Pulse Timer",
    Component: NeonPulseTimer,
  },
  CrystalTimer: {
    name: "Crystal Timer",
    Component: CrystalTimer,
  },
  AuraTimer: {
    name: "Aura Timer",
    Component: AuraTimer,
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
   InfinityCarouselPage: {
    name: "Infinity Carousel Page Background",
    Component: InfinityCarousel,
  },
    StackCarouselPage: {
    name: "Stack Carousel Page Background",
    Component: StackCarousel,
  },
  BentoCarouselPage: {
    name: "Bento Carousel Page Background",
    Component: BentoCarousel,
  },

   LiquidSliderPage: {
    name: "LiquidSlider Carousel Page",
    Component: LiquidSlider,
  },

  KineticPortalPage: {
    name: "KineticPortal Carousel Page",
    Component: KineticPortal,
  },

   KineticShardPage: {
    name: "KineticShard Carousel Page",
    Component: KineticShard,
  },
   NeuralGlassPage: {
    name: "NeuralGlass Carousel Page",
    Component: NeuralGlass,
  },
   HyperMeshPage: {
    name: "HyperMesh Carousel Page",
    Component: HyperMesh,
  },
   CyberShardGridPage: {
    name: "CyberShard Grid Page",
    Component: CyberShardGrid,
  },
   PremiumInsightGridPage: {
    name: "PremiumInsight Grid  Page",
    Component: PremiumInsightGrid,
  }
  
} as const;
