import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

export interface ApiVideo {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
}

export async function GET() {
  try {
    const files = await imagekit.listFiles({
      path: "/videos",
      type: "file",
      limit: 1000,
      sort: "ASC_CREATED", // ImageKit'dagi sort sozlamangizga mos
    });

    const videoFiles = files.filter(
      (f: any) =>
        f.fileType === "video" || /\.(mp4|mov|webm|mkv)$/i.test(f.name)
    );

    const videos: ApiVideo[] = videoFiles.map((v: any) => {
      // v.url ichida ?updatedAt=... kabi query parametr bo'lishi mumkin,
      // shuning uchun /ik-thumbnail.jpg ni query'dan OLDIN qo'shish kerak
      const [baseUrl, query] = v.url.split("?");
      const thumbnailUrl = `${baseUrl}/ik-thumbnail.jpg${query ? `?${query}` : ""}`;

      return {
        fileId: v.fileId,
        name: v.name,
        url: v.url,
        thumbnailUrl,
      };
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("ImageKit video fetch error:", error);
    return NextResponse.json(
      { error: "Videolarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}