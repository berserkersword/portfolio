"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import LoaderIcon from "@/components/loaderIcon";
import type { ApiVideo } from "@/app/api/videos/route";

export default function VideoPage() {
  const router = useRouter();

  const [videos, setVideos] = useState<ApiVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox]);

  if (loading) {
    return <LoaderIcon />;
  }

  if (error || videos.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-10 text-white">
        <p className="text-sm tracking-wide text-white/60">
          Videolar topilmadi yoki bo'sh.
        </p>
        <button
          onClick={() => router.push("/work")}
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
          Video
        </h1>
        <span className="text-xs tracking-wide text-white/40">
          {videos.length} video
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videos.map((video, i) => (
          <div
            key={video.fileId}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-[9/16] overflow-hidden bg-neutral-900 cursor-pointer group"
          >
            <Image
              src={video.thumbnailUrl}
              alt={video.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Play tugmasi ikonkasi */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/70 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6 ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <VideoLightbox
          video={videos[activeIndex]}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

function VideoLightbox({
  video,
  onClose,
}: {
  video: ApiVideo;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const qualityLevelsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [qualities, setQualities] = useState<number[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<number | "auto">(
    "auto"
  );
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  useEffect(() => {
    // Agar pleer allaqachon mavjud bo'lsa, faqat manbani yangilaymiz
    // (React Strict Mode'da effekt ikki marta ishga tushishining oldini oladi)
    if (playerRef.current) {
      return;
    }

    if (!containerRef.current) return;

    // video.js elementini o'zimiz DOM'ga qo'shamiz - React ref orqali emas,
    // shunda video.js va React bir-biriga xalaqit bermaydi
    const videoElement = document.createElement("video-js");
    videoElement.classList.add(
      "vjs-default-skin",
      "vjs-big-play-centered",
      "vjs-custom-theme"
    );
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    containerRef.current.appendChild(videoElement);

    // video.url ichida ?updatedAt=... kabi query parametr bo'lishi mumkin,
    // shuning uchun /ik-master.m3u8 ni query'dan OLDIN qo'shish kerak
    const [baseUrl] = video.url.split("?");
    const hlsSrc = `${baseUrl}/ik-master.m3u8?tr=sr-240_360_480_720_1080`;

    const player = videojs(
      videoElement,
      {
        controls: true,
        autoplay: true,
        muted: true, // brauzer avtomatik ijro qilishi uchun shart
        preload: "auto",
        fill: true,
        sources: [
          {
            src: hlsSrc,
            type: "application/x-mpegURL",
          },
        ],
      },
      () => {
        setIsLoading(false);
      }
    );

    player.on("canplay", () => {
      setIsLoading(false);
    });

    player.on("error", () => {
      setIsLoading(false);
      setHasError(true);
      console.error("Video.js error:", player.error());
    });

    // Sifat darajalarini kuzatish (videojs-contrib-quality-levels API orqali)
    const qualityLevelList = (player as any).qualityLevels();
    qualityLevelsRef.current = qualityLevelList;

    const updateQualityList = () => {
      const heights = new Set<number>();
      for (let i = 0; i < qualityLevelList.length; i++) {
        heights.add(qualityLevelList[i].height);
      }
      setQualities(Array.from(heights).sort((a, b) => b - a));
    };

    qualityLevelList.on("addqualitylevel", updateQualityList);
    qualityLevelList.on("removequalitylevel", updateQualityList);

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [video]);

  const selectQuality = (quality: number | "auto") => {
    const qualityLevelList = qualityLevelsRef.current;
    if (!qualityLevelList) return;

    for (let i = 0; i < qualityLevelList.length; i++) {
      const level = qualityLevelList[i];
      level.enabled = quality === "auto" ? true : level.height === quality;
    }

    setSelectedQuality(quality);
    setShowQualityMenu(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
        aria-label="Yopish"
      >
        ✕
      </button>

      <div
        className="relative h-[85vh] max-h-[85vh] aspect-[9/16] max-w-[95vw] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div data-vjs-player className="h-full w-full">
          <div ref={containerRef} className="h-full w-full" />
        </div>

        {/* Sifat tanlash tugmasi */}
        {qualities.length > 0 && !isLoading && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQualityMenu((prev) => !prev);
              }}
              className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/70 transition-colors"
            >
              {selectedQuality === "auto" ? "Auto" : `${selectedQuality}p`}
            </button>

            {showQualityMenu && (
              <div
                className="absolute top-full right-0 mt-2 bg-black/85 backdrop-blur-sm rounded-lg overflow-hidden min-w-[100px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => selectQuality("auto")}
                  className={`w-full text-left px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors ${
                    selectedQuality === "auto" ? "bg-white/15" : ""
                  }`}
                >
                  Auto
                </button>
                {qualities.map((q) => (
                  <button
                    key={q}
                    onClick={() => selectQuality(q)}
                    className={`w-full text-left px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors ${
                      selectedQuality === q ? "bg-white/15" : ""
                    }`}
                  >
                    {q}p
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none">
            <LoaderIcon />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <p className="text-white/60 text-sm text-center px-6">
              Video yuklanmadi. Qayta urinib ko'ring.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .vjs-custom-theme .vjs-control-bar {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 60%,
            transparent 100%
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 0 0 1rem 1rem;
          height: 4em;
          padding: 0 0.5em;
          display: flex;
          align-items: center;
        }

        .vjs-custom-theme .vjs-play-progress {
          background-color: #ffffff;
        }

        .vjs-custom-theme .vjs-progress-holder {
          height: 0.3em;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.25);
        }

        .vjs-custom-theme .vjs-load-progress {
          background: rgba(255, 255, 255, 0.15);
        }

        .vjs-custom-theme .vjs-big-play-button {
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 3em;
          height: 3em;
          line-height: 3em;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .vjs-custom-theme .vjs-big-play-button:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .vjs-custom-theme .vjs-button > .vjs-icon-placeholder:before {
          font-size: 1.6em;
          line-height: 2.2;
        }

        .vjs-custom-theme .vjs-time-control {
          line-height: 4em;
          font-size: 0.85em;
          opacity: 0.8;
        }

        .vjs-custom-theme .vjs-volume-panel,
        .vjs-custom-theme .vjs-fullscreen-control {
          display: flex;
          align-items: center;
        }

        .vjs-custom-theme .vjs-http-source-selector {
          display: flex;
          align-items: center;
        }

        .vjs-custom-theme .vjs-menu-button-popup .vjs-menu {
          bottom: 3.5em;
        }

        .vjs-custom-theme .vjs-menu-content {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .vjs-custom-theme .vjs-menu-item {
          font-size: 0.8em;
        }

        .vjs-custom-theme .vjs-menu-item.vjs-selected {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}