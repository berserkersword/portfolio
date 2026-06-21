"use client"

import Image from "next/image";

export interface MarqueeIcon {
  src: string;
  alt: string;
}

interface IconMarqueeProps {
  icons: MarqueeIcon[];
  iconSize?: number; // ikonka o'lchami px
}

export default function IconMarquee({
  icons,
  iconSize = 56,
}: IconMarqueeProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex w-max gap-24 animate-marquee">
        {[...icons, ...icons].map((icon, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
            style={{ width: iconSize, height: iconSize }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={iconSize}
              height={iconSize}
              className="object-contain w-full h-full brightness-0 invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}