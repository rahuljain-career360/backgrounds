import NeonGlow from "../components/Buttons/NeonGlow";
import MorphButton from "../components/Buttons/MorphButton";
import HologramBtn from "../components/Buttons/HologramBtn";
import LiquidBtn from "../components/Buttons/LiquidBtn";
import GlassBtn from "../components/Buttons/GlassBtn";

export const buttons = {
  NeonGlow: {
    name: "Neon Glow Buttons",
    Component: NeonGlow,
  },
  MorphButton: {
    name: "Morph Buttons",
    Component: MorphButton,
  },
  HologramBtn: {
    name: "Hologram Buttons",
    Component: HologramBtn,
  },
  LiquidBtn: {
    name: "Liquid Buttons",
    Component: LiquidBtn,
  },
  GlassBtn: {
    name: "Glass Buttons",
    Component: GlassBtn,
  },
} as const;
