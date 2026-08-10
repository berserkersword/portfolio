"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";

interface VideoCompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  /** Initial slider position in percent (0-100) */
  initialPosition?: number;
  /**
   * Optional custom loader to show while both videos are buffering.
   * Pass your own component, e.g. <LoaderIcon />.
   * If omitted, a small built-in spinner is used.
   */
  loader?: ReactNode;
}

/**
 * Before/After video comparison slider.
 *
 * Usage:
 * <VideoCompareSlider
 *   beforeSrc="/videos/before.mp4"
 *   afterSrc="/videos/after.mp4"
 *   loader={<LoaderIcon />}
 * />
 */
export default function VideoCompareSlider({
  beforeSrc,
  afterSrc,
  initialPosition = 50,
  loader,
}: VideoCompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Track when each video has buffered enough to play through without stalling
  const [beforeReady, setBeforeReady] = useState(false);
  const [afterReady, setAfterReady] = useState(false);
  const isReady = beforeReady && afterReady;

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

  // Once BOTH videos have buffered enough, start them together.
  // This is what prevents one from starting before the other.
  useEffect(() => {
    if (!isReady) return;
    beforeVideoRef.current?.play().catch(() => {});
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 12,
        userSelect: "none",
        background: "#000",
      }}
    >
      {/* AFTER video — full width, sits underneath */}
      <video
        ref={afterVideoRef}
        src={afterSrc}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setAfterReady(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.3s ease",
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
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setBeforeReady(true)}
          style={{
            width: `${(100 / position) * 100}%`,
            height: "100%",
            objectFit: "cover",
            maxWidth: "none",
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Loader — shown until both videos can play through without buffering.
          Pass your own via the `loader` prop; falls back to a built-in spinner. */}
      {!isReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
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
              <style>{`
                @keyframes vcs-spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </>
          )}
        </div>
      )}

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
