"use client";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
// import type { Metadata } from "next";
import "./globals.css";
import {useEffect, useRef} from "react";
import Footer from "@/components/footer";
import { GlitchProvider } from "@/components/glitchProvider";
import TestComp from "@/components/test";

function MeshBackground() {
  return (
    <div className="mesh-background">
      <div className="mesh-orb mesh-orb-1"></div>
      <div className="mesh-orb mesh-orb-2"></div>
      <div className="mesh-orb mesh-orb-3"></div>

      <div className="mesh-vignette"></div>
    </div>
  )
    }

// graining
function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawGrain() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = Math.random() * 80; // opacity: 0–35
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    }

    resize();
    drawGrain();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    />
  );
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="relative bg-[#0a0a0a] min-h-scree ">
        {/* <MeshBackground /> */}
        {/* <LensOverlay /> */}
        <GrainCanvas />
        <GlitchProvider />
        <div className="relative z-10">
          <TestComp />
          <Navbar/>
          {children}
          <Analytics />
        <Footer />
        </div>
      </body>
    </html>
  );
}
