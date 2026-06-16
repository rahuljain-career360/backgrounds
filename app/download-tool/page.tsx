"use client";
import React, { useState } from "react";
import DownloadTool from "../components/DownloadTool/DownloadTool";
import { backgrounds } from "../data/backgrounds";
import { effectBackgrounds } from "../data/effectBackgrounds";

const allItems = [
  ...Object.entries(backgrounds).map(([slug, b]) => ({ slug, name: b.name, Component: b.Component, type: "bg" as const })),
  ...Object.entries(effectBackgrounds).map(([slug, b]) => ({ slug, name: b.name, Component: b.Component, type: "effect" as const })),
];

allItems.sort((a, b) => a.name.localeCompare(b.name));

const DownloadToolPage: React.FC = () => {
  const [active, setActive] = useState(allItems[0]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "Inter, sans-serif" }}>
      <DownloadTool fileName={active.slug}>
        <active.Component />
      </DownloadTool>

      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 60 }}>
        <button
          onClick={() => setSelectorOpen((p) => !p)}
          style={{
            padding: "8px 18px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: 0.5,
            transition: "all 0.2s",
          }}
        >
          {active.name} ▾
        </button>

        {selectorOpen && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: -1 }}
              onClick={() => setSelectorOpen(false)}
            />
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: 6,
              background: "rgba(10,10,20,0.9)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: 8,
              maxHeight: 360,
              overflowY: "auto",
              minWidth: 220,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}>
              {allItems.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => { setActive(item); setSelectorOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "none",
                    background: active.slug === item.slug ? "rgba(160,124,255,0.1)" : "transparent",
                    color: active.slug === item.slug ? "rgba(200,180,255,0.9)" : "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    letterSpacing: 0.3,
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadToolPage;
