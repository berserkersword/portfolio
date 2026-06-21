"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import LoaderIcon from "@/components/loaderIcon";

export default function PhotoFolderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  if (loading) {
    return (
      // <div className="w-full flex flex-col p-10">
      //   <p className="text-sm tracking-wide text-white/40 mt-4">
      //     Yuklanmoqda...
      //   </p>
      // </div>
      <LoaderIcon />
    );
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
          <div key={i} className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
            <Image
              src={src}
              alt={`${params.slug} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}