import { GradientBackground, WavesBackground } from "../components/Backgrounds";
import { DotsBackground } from "../components/Background/DotsBackground";
import { PremiumBackground } from "../components/Background/PremiumBackground";
import CosmicNebulaBackground from "../components/Background/CosmicNebulaBackground";
import MacColorBackground from "../components/Background/MacColorBackground";
import { GrainyAuroraBackground } from "../components/Background/GrainyAuroraBackground";
import { AnimatedOrganicShapesBackground } from "../components/Background/AnimatedOrganicShapesBackground";
import { AdvancedLiquidBackground } from "../components/Background/AdvancedLiquidBackground";
import { SquareWaveBackground } from "../components/Background/SquareWaveBackground";
import { SplitHorizonBackground } from "../components/Background/SplitHorizonBackground";
import { CyberHubBackground } from "../components/Background/CyberHubBackground";
import { AutoGridBackground } from "../components/Background/GridBackground";
import { LuxuryGridBackground } from "../components/Background/LuxuryGridBackground";
import { MicroGridBackground } from "../components/Background/MicroGridBackground";
import { GradientGrid } from "../components/Background/GradientGrid";
import { BigGradientGrid } from "../components/Background/BigGradientGrid";
import AuroraPremium from "../components/Background/AuroraPremium";
import LuxuryDarkScene from "../components/Background/LuxuryDarkScene";
import VelvetGlass from "../components/Background/VelvetGlass";
import PremiumBento from "../components/Background/PremiumBento";
import VisualBento from "../components/Background/VisualBento";
import FullScreenBento from "../components/Background/FullScreenBento";
import AuroraBackground from "../components/Background/AuroraBackground";
import MacSystemUI from "../components/stystemUI/MacSystemUI";
import M4NexusUI from "../components/stystemUI/M4NexusUI";
import M4BlogUI from "../components/stystemUI/M4BlogUI";
import Carousel3D from "../components/stystemUI/Carousel3D";
import CardCarousel from "../components/stystemUI/CardCarousel";
import LoginPage from "../components/login/LoginPage";
import PremiumLogin from "../components/login/PremiumLogin";
import GradientLogin from "../components/login/GradientLogin";
import CarouselDesign from "../components/login/CarouselDesign";

export const backgrounds = {
  gradient: {
    name: "Gradient",
    Component: GradientBackground,
  },
  dots: {
    name: "Dots",
    Component: DotsBackground,
  },
  waves: {
    name: "Waves",
    Component: WavesBackground,
  },
  premium: {
    name: "Premium",
    Component: PremiumBackground,
  },
  //   GrainyAurora: {
  //     name: "Grainy_Bg",
  //     Component: GrainyAuroraBackground,
  //   },
  animatedBlob: {
    name: "Animated_Blob",
    Component: AnimatedOrganicShapesBackground,
  },
  liquidBg: {
    name: "liquidBg",
    Component: AdvancedLiquidBackground,
  },
  SquareWaveBg: {
    name: "SquareWaveBg",
    Component: SquareWaveBackground,
  },
  SplitHorizontalBg: {
    name: "Split_horizontal",
    Component: SplitHorizonBackground,
  },
  CyberBg: {
    name: "Cyber_bg",
    Component: CyberHubBackground,
  },
  GridBg: {
    name: "Grid_bg",
    Component: AutoGridBackground,
  },
  LuxuryGridBg: {
    name: "LuxuryGrid_bg",
    Component: LuxuryGridBackground,
  },
  MicroGridBg: {
    name: "MicroGrid_bg",
    Component: MicroGridBackground,
  },
  GradientGridBg: {
    name: "GradientGrid_bg",
    Component: GradientGrid,
  },
  BigGridBg: {
    name: "BigGridBg",
    Component: BigGradientGrid,
  },
  AuoraBackground: {
    name: "Aurora Premium",
    Component: AuroraPremium,
  },
  Luxurydark: {
    name: "Luxury dark Premium",
    Component: LuxuryDarkScene,
  },
  valvetGlass: {
    name: "Valvet Glass Premium",
    Component: VelvetGlass,
  },
  bentogrid: {
    name: "Premium Bento",
    Component: PremiumBento,
  },
  visualBentoGrid: {
    name: "Visual Bento Bento",
    Component: VisualBento,
  },
  fullBentoGrid: {
    name: "Full Screen Bento",
    Component: FullScreenBento,
  },
  AuroraBackground: {
    name: "Aurora Background Bento",
    Component: AuroraBackground,
  },
  MacSystemUI: {
    name: "MacSystem UI Design",
    Component: MacSystemUI,
  },
  M4NexusUI: {
    name: "M4Nexus UI Design",
    Component: M4NexusUI,
  },
  M4BlogUI: {
    name: "M4Blog UI Design",
    Component: M4BlogUI,
  },
  Carousel3D: {
    name: "Carousel3D Design",
    Component: Carousel3D,
  },
  CardCarousel: {
    name: "Card Carousel Design",
    Component: CardCarousel,
  },
  LoginPage: {
    name: "Login Page Design",
    Component: LoginPage,
  },
  PremiumLogin: {
    name: "Premium Login Design",
    Component: PremiumLogin,
  },

  GradientLogin: {
    name: "Gradient Login Design",
    Component: GradientLogin,
  },

  CarouselDesignPage: {
    name: "Carousel Design page",
    Component: CarouselDesign,
  },
  CosmicNebula: {
    name: "Cosmic Nebula",
    Component: CosmicNebulaBackground,
  },
  MacColor: {
    name: "MacBook Colors",
    Component: MacColorBackground,
  },
} as const;
