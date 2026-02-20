"use client"
import { notFound } from "next/navigation"; 
import { backgrounds } from "../../data/backgrounds";

// 1. Params ko Promise define karein
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Params ko await karein
  const { slug } = await params;
  
  console.log("Slug value:", slug);

  const bg = backgrounds[slug as keyof typeof backgrounds];

  if (!bg) {
    notFound();
  }

  const Background = bg.Component;
  return <Background />;
}