import { useEffect, useRef, useCallback } from "react";

// Overlay singleton — barcha hook instancelar bitta overlayni ishlatadi
let globalOverlay: HTMLDivElement | null = null;
let glitching = false;

function randInt(a: number, b: number) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function runGlitch(intensity: "idle" | "transition", onDone?: () => void) {
  if (glitching && intensity === "idle") return;
  glitching = true;

  if (!globalOverlay) return;
  const overlay = globalOverlay;

  const cfg =
    intensity === "transition"
      ? { maxFrames: 55, lines: 16, shift: 20 }
      : { maxFrames: 17, lines: 6, shift: 8 };

  // Freeze effekti
    if (intensity === "transition") {
    const s = overlay.style as CSSStyleDeclaration & { webkitBackdropFilter: string };
    s.backdropFilter = "contrast(1.5) brightness(1.15)";
    s.webkitBackdropFilter = "contrast(1.5) brightness(1.15)";
    setTimeout(() => {
        s.backdropFilter = "";
        s.webkitBackdropFilter = "";
    }, 150);
    }

  let frame = 0;

  // Transition da navigate qilish — 600ms dan keyin (glitch o'rtasida)
  if (intensity === "transition" && onDone) {
    setTimeout(onDone, 600);
  }

  function tick() {
    if (frame >= cfg.maxFrames) {
      overlay.innerHTML = "";
      glitching = false;
      return;
    }

    if (frame % (intensity === "transition" ? 2 : 5) === 0) {
      overlay.innerHTML = "";

      const n = randInt(intensity === "transition" ? 6 : 1, cfg.lines);

      for (let i = 0; i < n; i++) {
        const line = document.createElement("div");
        const isRed = Math.random() > 0.6;
        const isCyan = !isRed && Math.random() > 0.5;
        const h = intensity === "transition" ? randInt(2, 24) : randInt(1, 3);

        line.style.cssText = `
          position: absolute; left: 0; right: 0;
          top: ${randInt(0, 100)}%;
          height: ${h}px;
          transform: translateX(${randInt(-cfg.shift * 4, cfg.shift * 4)}px);
          background: ${
            isRed
              ? "rgba(255,30,30,0.35)"
              : isCyan
              ? "rgba(0,240,255,0.25)"
              : "rgba(255,255,255,0.15)"
          };
        `;
        overlay.appendChild(line);
      }

      if (intensity === "transition" && frame % 6 === 0) {
        const block = document.createElement("div");
        block.style.cssText = `
          position: absolute; left: 0; right: 0;
          top: ${randInt(10, 80)}%;
          height: ${randInt(20, 80)}px;
          transform: translateX(${randInt(-40, 40)}px);
          background: rgba(255,255,255,0.03);
          mix-blend-mode: difference;
        `;
        overlay.appendChild(block);
      }

      const rgb = document.createElement("div");
      rgb.style.cssText = `
        position: absolute; inset: 0;
        background: ${
          Math.random() > 0.5 ? "rgba(255,0,0,0.05)" : "rgba(0,255,255,0.05)"
        };
      `;
      overlay.appendChild(rgb);
    }

    frame++;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Idle glitch — layout da ishlatiladigan hook
export function useGlitch() {
  useEffect(() => {
    if (!globalOverlay) {
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0; pointer-events: none;
        z-index: 99998; overflow: hidden;
      `;
      document.body.appendChild(overlay);
      globalOverlay = overlay;
    }

    const timer = setInterval(() => runGlitch("idle"), 5000);
    const first = setTimeout(() => runGlitch("idle"), 1500);

    // return () => {
    //   clearInterval(timer);
    //   clearTimeout(first);
    // };
  }, []);
}

// Transition glitch — TransitionLink da ishlatiladigan hook
export function useGlitchTrigger() {
  return useCallback((onDone: () => void) => {
    runGlitch("transition", onDone);
  }, []);
}