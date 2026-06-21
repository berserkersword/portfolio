import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

export interface ApiPhotoFolder {
  slug: string;
  name: string;
  coverUrl: string;
  count: number;
}

export async function GET() {
  try {
    // 1. Root papkalarni olish (faqat type: folder)
    const folderItems = await imagekit.listFiles({
      path: "/",
      type: "folder",
      limit: 100,
    });

    // 2. Har bir papka uchun ichidagi fayllarni olib, cover + count tayyorlash
    const folders: ApiPhotoFolder[] = await Promise.all(
      folderItems.map(async (folder: any) => {
        const files = await imagekit.listFiles({
          path: folder.folderPath,
          type: "file",
          limit: 1000,
          sort: "ASC_CREATED",
        });

        const imageFiles = files.filter((f: any) =>
          f.fileType === "image" || /\.(jpe?g|png|webp|avif)$/i.test(f.name)
        );
        const coverImage =
                imageFiles.find((f: any) => f.name.toLowerCase().startsWith("cover-")) ??
                imageFiles[0];

        return {
          slug: folder.name,
          name: folder.name,
          coverUrl: coverImage?.url ?? "",
          count: imageFiles.length,
};
      })
    );

    // bo'sh papkalarni chiqarib tashlash
    const nonEmptyFolders = folders.filter((f) => f.count > 0);

    return NextResponse.json(nonEmptyFolders);
  } catch (error) {
    console.error("ImageKit fetch error:", error);
    return NextResponse.json(
      { error: "Papkalarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}
