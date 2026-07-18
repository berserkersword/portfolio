import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  console.log("=== DEBUG: so'ralgan slug ===", slug);

  try {
    const files = await imagekit.listFiles({
      path: `/photos/${slug}`,
      type: "file",
      limit: 1000,
      sort: "ASC_CREATED",
    });

    console.log("=== DEBUG: ImageKit'dan kelgan fayllar soni ===", files.length);
    console.log("=== DEBUG: birinchi fayl ===", JSON.stringify(files[0], null, 2));

    const imageUrls = files
      .filter(
        (f: any) =>
          f.fileType === "image" || /\.(jpe?g|png|webp|avif)$/i.test(f.name)
      )
      .map((f: any) => f.url);

    console.log("=== DEBUG: filtrlangan rasm URL'lari soni ===", imageUrls.length);

    return NextResponse.json(imageUrls);
  } catch (error) {
    console.log("=== DEBUG: XATO ===", error);
    return NextResponse.json(
      { error: "Rasmlarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}