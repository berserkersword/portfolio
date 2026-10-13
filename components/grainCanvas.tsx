"use client";

import { useEffect, useRef } from "react";

const TILE = 256; // shovqin plitkasi o'lchami (px)
const FRAMES = 3; // oldindan tayyorlanadigan kadrlar soni
const FPS = 24; // kino grain uchun 24fps yetarli

export default function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Shovqinni har kadrda butun ekran uchun emas, bir marta kichik plitkalarga generatsiya qilamiz
    const patterns = Array.from({ length: FRAMES }, () => {
      const tile = document.createElement("canvas");
      tile.width = tile.height = TILE;
      const tctx = tile.getContext("2d")!;
      const imageData = tctx.createImageData(TILE, TILE);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = Math.random() * 80;
      }

      tctx.putImageData(imageData, 0, 0);
      return ctx.createPattern(tile, "repeat")!;
    });

    let animId = 0;
    let frame = 0;
    let last = 0;

    function draw() {
      if (!canvas || !ctx) return;
      // Tasodifiy siljish plitka takrorlanishini ko'rinmas qiladi
      const ox = Math.random() * TILE;
      const oy = Math.random() * TILE;
      ctx.setTransform(1, 0, 0, 1, -ox, -oy);
      ctx.clearRect(ox, oy, canvas.width, canvas.height);
      ctx.fillStyle = patterns[frame];
      ctx.fillRect(ox, oy, canvas.width, canvas.height);
      frame = (frame + 1) % FRAMES;
    }

    function loop(t: number) {
      if (t - last >= 1000 / FPS) {
        last = t;
        draw();
      }
      animId = requestAnimationFrame(loop);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }

    resize();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) animId = requestAnimationFrame(loop);
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
