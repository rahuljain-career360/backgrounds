import AnimatedDarkBackground from "../components/EffectiveBackgrounds/AnimatedDarkBackground";
import BubbleEffect from "../components/EffectiveBackgrounds/BubbleEffect";
import ElectricityEffect from "../components/EffectiveBackgrounds/ElectricityEffect";
import FloatingParticles from "../components/EffectiveBackgrounds/FloatingParticles";
import Galaxy from "../components/EffectiveBackgrounds/Galaxy";
import GlowParticles from "../components/EffectiveBackgrounds/GlowParticles";
import LiquidNebula from "../components/EffectiveBackgrounds/LiquidNebula";
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
 
 
 
  
} as const;
