"use client"
import { notFound } from "next/navigation"; 
import { backgrounds } from "@/app/data/backgrounds";
import DownloadTool from "@/app/components/DownloadTool/DownloadTool";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bg = backgrounds[slug as keyof typeof backgrounds];

  if (!bg) {
    notFound();
  }

  const Background = bg.Component;
  return (
    <DownloadTool fileName={slug}>
      <Background />
    </DownloadTool>
  );
}
