import AnimatedDarkBackground from "../components/EffectiveBackgrounds/AnimatedDarkBackground";
import BouncingBlobs from "../components/EffectiveBackgrounds/BouncingBlobs";
import BubbleEffect from "../components/EffectiveBackgrounds/BubbleEffect";
import DynamicGlassScene from "../components/EffectiveBackgrounds/DynamicGlassScene";
import ElectricityEffect from "../components/EffectiveBackgrounds/ElectricityEffect";
import FloatingParticles from "../components/EffectiveBackgrounds/FloatingParticles";
import Galaxy from "../components/EffectiveBackgrounds/Galaxy";
import GlassBubbles from "../components/EffectiveBackgrounds/GlassBubbles";
import GlowParticles from "../components/EffectiveBackgrounds/GlowParticles";
import LiquidBackground from "../components/EffectiveBackgrounds/LiquidBackground";
import LiquidNebula from "../components/EffectiveBackgrounds/LiquidNebula";
import LiquidSquares from "../components/EffectiveBackgrounds/LiquidSquares";
import RainEffect from "../components/EffectiveBackgrounds/RainEffect";
import StarField from "../components/EffectiveBackgrounds/StarField";
import { FlipMaster } from "../components/Timers/FlipMaster";

export const effectBackgrounds = {
  TimerOne: {
    name: "First Timer",
    Component: FlipMaster,
  },
  RainEffect: {
    name: "Rain Effect",
    Component: RainEffect,
  },
   StarEffect: {
    name: "Star Effect",
    Component: StarField,
  },
  GalaxyEffect: {
    name: "Galaxy Effect",
    Component: Galaxy,
  },
  BubbleEffect: {
    name: "Bubble Effect",
    Component: BubbleEffect,
  },
  ElectricEffect: {
    name: "Electric Effect",
    Component: ElectricityEffect,
  },
   FlotingPartiicals: {
    name: "Floting Partical Effect",
    Component: FloatingParticles,
  },
   GlowPartiicals: {
    name: "Glow Partical Effect",
    Component: GlowParticles,
  },
  liquidNUbula: {
    name: "liquid NUbula Effect",
    Component: LiquidNebula,
  },
  square: {
    name: "Animated Square Effect",
    Component: AnimatedDarkBackground,
  },
   LiquidBg: {
    name: "Liquid Background Effect",
    Component: LiquidBackground,
  },
   BounceBg: {
    name: "Bounce Background Effect",
    Component: BouncingBlobs,
  },
  GlassBubble: {
    name: "Glass Bubble Effect",
    Component: GlassBubbles,
  },
  DynamicGlass: {
    name: "Dynamic Glass  Effect",
    Component: DynamicGlassScene,
  },
   LiquidSquare: {
    name: "Liquid Square  Effect",
    Component: LiquidSquares,
  },


 
 
 
  
} as const;
