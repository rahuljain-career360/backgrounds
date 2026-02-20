"use client"
import { notFound } from "next/navigation"; 
import { effectBackgrounds } from "@/app/data/effectBackgrounds";

// 1. Params ko Promise define karein
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Params ko await karein
  const { slug } = await params;
  
  console.log("Slug value:", slug);

  const bg = effectBackgrounds[slug as keyof typeof effectBackgrounds];

  if (!bg) {
    notFound();
  }

  const EffectiveBackground = bg.Component;
  return <EffectiveBackground />;
}