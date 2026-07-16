"use client"

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import LoaderIcon from "@/components/loaderIcon";

export default function PhotoFolderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/folders/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  if (loading) {
    return <LoaderIcon />;
  }

  if (error || images.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-10 text-white">
        <p className="text-sm tracking-wide text-white/60">
          Bu papka topilmadi yoki bo'sh.
        </p>
        <button
          onClick={() => router.push("/work/photo")}
          className="text-sm tracking-[0.2em] uppercase underline underline-offset-4"
        >
          Orqaga
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-10">
      <div className="flex items-center justify-between mt-4 mb-8">
        <button
          onClick={() => router.push("/work")}
          className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
        >
          ← Work
        </button>
        <h1 className="text-sm tracking-[0.2em] uppercase text-white">
          {params.slug}
        </h1>
        <span className="text-xs tracking-wide text-white/40">
          {images.length} photo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-[4/5] overflow-hidden bg-neutral-900 cursor-zoom-in group"
          >
            <Image
              src={src}
              alt={`${params.slug} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
            aria-label="Yopish"
          >
            ✕
          </button>

          <span className="absolute top-7 left-6 text-white/50 text-xs tracking-[0.2em] uppercase">
            {activeIndex + 1} / {images.length}
          </span>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-2 z-10"
              aria-label="Oldingi rasm"
            >
              ‹
            </button>
          )}

          <div
            className="relative w-full h-full flex items-center justify-center p-6 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl">
              <Image
                src={images[activeIndex]}
                alt={`${params.slug} ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-2 z-10"
              aria-label="Keyingi rasm"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}