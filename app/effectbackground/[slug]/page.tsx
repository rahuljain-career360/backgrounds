"use client"
import { notFound } from "next/navigation"; 
import { effectBackgrounds } from "@/app/data/effectBackgrounds";
import DownloadTool from "@/app/components/DownloadTool/DownloadTool";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bg = effectBackgrounds[slug as keyof typeof effectBackgrounds];

  if (!bg) {
    notFound();
  }

  const EffectiveBackground = bg.Component;
  return (
    <DownloadTool fileName={slug}>
      <EffectiveBackground />
    </DownloadTool>
  );
}
