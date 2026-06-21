"use client";

export function LensOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9000,
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(1px)",
        maskImage: "radial-gradient(ellipse at center, transparent 15%, black 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 45%, black 80%)",
      }}
    />
  );
}