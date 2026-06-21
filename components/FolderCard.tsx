"use client"

import Link from "next/link";
import Image from "next/image";
import { ApiPhotoFolder } from "@/app/api/folders/route";

export default function FolderCard({ folder }: { folder: ApiPhotoFolder }) {
  return (
    <Link
      href={`/work/photo/${folder.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-neutral-900"
    >
      <Image
        src={folder.coverUrl}
        alt={folder.name}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-white/30" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
        <span className="text-sm tracking-[0.2em] uppercase text-white">
          {folder.name}
        </span>
        <span className="text-xs tracking-wide text-white/50">
          {folder.count}
        </span>
      </div>
    </Link>
  );
}