import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";

// ImageKit'ga har so'rovda N+1 chaqiruv qilmaslik uchun 5 daqiqa kesh (ISR)
export const revalidate = 300;

export interface ApiPhotoFolder {
  slug: string;
  name: string;
  coverUrl: string;
  count: number;
  pinned: boolean;
}

export async function GET() {
  try {
    // 1. Root papkalarni olish (faqat type: folder)
    const folderItems = await imagekit.listFiles({
      path: "/photos",
      type: "folder",
      limit: 100,
    });

    // 2. Har bir papka uchun ichidagi fayllarni olib, cover + count tayyorlash
    const folders: ApiPhotoFolder[] = await Promise.all(
      folderItems.map(async (folder: any) => {
        const files = await imagekit.listFiles({
          path: folder.folderPath, // folderPath allaqachon to'liq yo'l
          type: "file",
          limit: 1000,
          sort: "ASC_CREATED",
        });

        const imageFiles = files.filter(
          (f: any) =>
            f.fileType === "image" || /\.(jpe?g|png|webp|avif)$/i.test(f.name)
        );

        const coverImage = (imageFiles.find((f: any) =>
          f.name.toLowerCase().startsWith("cover-")
        ) ?? imageFiles[0]) as any;

        // Papka nomi oxirida "-pin" bo'lsa, ro'yxatda tepaga qadaladi
        const isPinned = /-pin$/i.test(folder.name);

        return {
          slug: folder.name, // o'zgartirmang: /photos/${slug} yo'li uchun kerak
          name: folder.name.replace(/-pin$/i, ""), // ekranda "-pin" ko'rinmaydi
          coverUrl: coverImage?.url ?? "",
          count: imageFiles.length,
          pinned: isPinned,
        };
      })
    );

    // bo'sh papkalarni chiqarib tashlash
    const nonEmptyFolders = folders.filter((f) => f.count > 0);

    // Pinned birinchi, qolgan tartib saqlanadi
    const sorted = [
      ...nonEmptyFolders.filter((f) => f.pinned),
      ...nonEmptyFolders.filter((f) => !f.pinned),
    ];

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("ImageKit fetch error:", error);
    return NextResponse.json(
      { error: "Papkalarni olib bo'lmadi" },
      { status: 500 }
    );
  }
}
