import { GradientBackground, WavesBackground } from "../components/Backgrounds";
import { DotsBackground } from "../components/Background/DotsBackground";
import { PremiumBackground } from "../components/Background/PremiumBackground";
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
} as const;
