"use client"
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";

interface Props {
  children: React.ReactNode;
  fileName?: string;
}

const PremiumCapture4K: React.FC<Props> = ({
  children,
  fileName = "premium-4k.png",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const capture = async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        width: 3840,
        height: 2160,
        pixelRatio: 2, // 🔥 important for ultra sharp
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error capturing image:", err);
    }
  };

  return (
    <>
      {/* TRUE 4K Render */}
      <div
        ref={ref}
        style={{
          width: "3840px",
          height: "2160px",
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      <button
        onClick={capture}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "14px 24px",
          background: "#111",
          color: "#fff",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Download Premium 4K
      </button>
    </>
  );
};

export default PremiumCapture4K;