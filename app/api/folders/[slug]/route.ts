import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const files = await imagekit.listFiles({
      path: `/photos/${slug}`,
      type: "file",
      limit: 1000,
      sort: "ASC_CREATED",
    });

    const imageUrls = files
      .filter(
        (f: any) =>
          f.fileType === "image" || /\.(jpe?g|png|webp|avif)$/i.test(f.name)
      )
      .map((f: any) => f.url);

    // CDN'da 5 daqiqa keshlanadi, keyin fonda yangilanadi
    return NextResponse.json(imageUrls, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error("ImageKit fetch error:", error);
    return NextResponse.json(
      { error: "Rasmlarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}