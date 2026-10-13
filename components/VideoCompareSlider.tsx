"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";

interface VideoCompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  poster?: string;
  initialPosition?: number;
  loader?: ReactNode;
}

export default function VideoCompareSlider({
  beforeSrc,
  afterSrc,
  poster,
  initialPosition = 50,
  loader,
}: VideoCompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const [beforeReady, setBeforeReady] = useState(false);
  const [afterReady, setAfterReady] = useState(false);
  const isReady = beforeReady && afterReady;

  // Ekranga yaqinlashganda yuklash, ekrandan chiqqanda pauza (CPU/batareya tejaladi)
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fallback timeout (iOS va xatolar uchun loader qotib qolmasin)
  useEffect(() => {
    if (!shouldLoad) return;
    const t = setTimeout(() => {
      setBeforeReady(true);
      setAfterReady(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [shouldLoad]);

  // Ikkala video sinxron
  useEffect(() => {
    const before = beforeVideoRef.current;
    const after = afterVideoRef.current;
    if (!before || !after) return;

    const syncTime = () => {
      if (Math.abs(after.currentTime - before.currentTime) > 0.15) {
        after.currentTime = before.currentTime;
      }
    };
    const onPlay = () => after.play().catch(() => {});
    const onPause = () => after.pause();

    before.addEventListener("timeupdate", syncTime);
    before.addEventListener("seeked", syncTime);
    before.addEventListener("play", onPlay);
    before.addEventListener("pause", onPause);
    return () => {
      before.removeEventListener("timeupdate", syncTime);
      before.removeEventListener("seeked", syncTime);
      before.removeEventListener("play", onPlay);
      before.removeEventListener("pause", onPause);
    };
  }, []);

  // Ikkalasi tayyor va ko'rinib turganda o'ynash (after video "play"/"pause" orqali sinxron)
  useEffect(() => {
    const before = beforeVideoRef.current;
    if (!isReady || !before) return;
    if (inView) before.play().catch(() => {});
    else before.pause();
  }, [isReady, inView]);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Pointer Events: sichqoncha + touch bitta joyda
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) updatePosition(e.clientX);
  };
  const onPointerUp = () => setIsDragging(false);

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: isReady ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 12,
        userSelect: "none",
        touchAction: "pan-y", // vertikal scroll ishlaydi, gorizontal surish slider'ga
        cursor: "ew-resize",
        background: "#000",
      }}
    >
      {/* AFTER */}
      <video
        ref={afterVideoRef}
        src={shouldLoad ? afterSrc : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setAfterReady(true)}
        onError={() => setAfterReady(true)}
        style={videoStyle}
      />

      {/* BEFORE — clip-path bilan kesilgan, o'lchami o'zgarmaydi */}
      <video
        ref={beforeVideoRef}
        src={shouldLoad ? beforeSrc : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setBeforeReady(true)}
        onError={() => setBeforeReady(true)}
        style={{
          ...videoStyle,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Loader */}
      {!isReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: poster ? `#000 url(${poster}) center / cover` : "#000",
          }}
        >
          {loader ?? (
            <>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.25)",
                  borderTopColor: "#fff",
                  animation: "vcs-spin 0.8s linear infinite",
                }}
              />
              <style>{`@keyframes vcs-spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: 2,
          background: "#fff",
          transform: "translateX(-1px)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          ↔
        </div>
      </div>
    </div>
  );
}