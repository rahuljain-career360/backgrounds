"use client"
import { notFound } from "next/navigation"; 
import { timers } from "@/app/data/timers";

// 1. Params ko Promise define karein
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Params ko await karein
  const { slug } = await params;
  
  console.log("Slug value:", slug);

  const timer = timers[slug as keyof typeof timers];

  if (!timer) {
    notFound();
  }

  const TimerComponent = timer.Component;
  return <TimerComponent />;
}