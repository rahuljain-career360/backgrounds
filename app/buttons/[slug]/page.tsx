"use client"
import { notFound } from "next/navigation";
import { buttons } from "@/app/data/buttons";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const btn = buttons[slug as keyof typeof buttons];

  if (!btn) {
    notFound();
  }

  const Component = btn.Component;
  return <Component />;
}
