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
    name: "Depp Clock",
    Component: DeepClock,
  },
    ProductPage: {
    name: "Product Page",
    Component: ProductPage,
  },
} as const;
