"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface VideoCompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  /** Initial slider position in percent (0-100) */
  initialPosition?: number;
}

/**
 * Before/After video comparison slider.
 *
 * Usage:
 * <VideoCompareSlider
 *   beforeSrc="/videos/before.mp4"
 *   afterSrc="/videos/after.mp4"
 * />
 */
export default function VideoCompareSlider({
  beforeSrc,
  afterSrc,
  initialPosition = 50,
}: VideoCompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Keep both videos in sync (play/pause/time)
  useEffect(() => {
    const before = beforeVideoRef.current;
    const after = afterVideoRef.current;
    if (!before || !after) return;

    const sync = (source: HTMLVideoElement, target: HTMLVideoElement) => () => {
      if (Math.abs(target.currentTime - source.currentTime) > 0.15) {
        target.currentTime = source.currentTime;
      }
    };
    const play = (target: HTMLVideoElement) => () => {
      target.play().catch(() => {});
    };
    const pause = (target: HTMLVideoElement) => () => target.pause();

    const onTimeUpdate = sync(before, after);
    const onPlay = play(after);
    const onPause = pause(after);
    const onSeeked = sync(before, after);

    before.addEventListener("timeupdate", onTimeUpdate);
    before.addEventListener("play", onPlay);
    before.addEventListener("pause", onPause);
    before.addEventListener("seeked", onSeeked);

    return () => {
      before.removeEventListener("timeupdate", onTimeUpdate);
      before.removeEventListener("play", onPlay);
      before.removeEventListener("pause", onPause);
      before.removeEventListener("seeked", onSeeked);
    };
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.min(100, Math.max(0, pct));
    setPosition(pct);
  }, []);

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updatePosition(clientX);
    },
    [isDragging, updatePosition]
  );

  useEffect(() => {
    if (!isDragging) return;

    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handlePointerMove]);

  const togglePlay = () => {
    const before = beforeVideoRef.current;
    if (!before) return;
    if (before.paused) before.play();
    else before.pause();
  };

  return (
    <div
      ref={containerRef}
      // onClick={togglePlay}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 12,
        userSelect: "none",
        cursor: "pointer",
        background: "#000",
      }}
    >
      {/* AFTER video — full width, sits underneath */}
      <video
        ref={afterVideoRef}
        autoPlay
        src={afterSrc}
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* BEFORE video — clipped to slider position, sits on top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${position}%`,
          overflow: "hidden",
        }}
      >
        <video
          ref={beforeVideoRef}
          src={beforeSrc}
          muted
          autoPlay
          loop
          playsInline
          style={{
            width: `${(100 / position) * 100}%`,
            height: "100%",
            objectFit: "cover",
            maxWidth: "none",
          }}
        />
      </div>

      {/* Divider handle */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: 2,
          background: "#fff",
          transform: "translateX(-1px)",
          cursor: "ew-resize",
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
