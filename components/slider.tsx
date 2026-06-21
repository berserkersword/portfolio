"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Slider({ images }: { images?: { id: number; src: string }[] }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full h-[70vw] max-h-[600px] min-h-[250px] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current].id}
          src={images[current].src}
          className="absolute w-full h-full object-cover object-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="absolute top-1/2 right-3 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}