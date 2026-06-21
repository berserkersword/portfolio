// components/GlitchProvider.tsx
"use client";
import { useGlitch } from "./useGlitch";

export function GlitchProvider() {
  useGlitch();
  return null;
}