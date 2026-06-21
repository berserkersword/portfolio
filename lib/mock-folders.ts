// Vaqtinchalik mock data.
// Backend ulanganda bu fayl o'rniga ImageKit "listFiles" natijasidan
// xuddi shu shaklda (slug, name, coverUrl, count) massiv quriladi.

export interface PhotoFolder {
  slug: string;        // URL uchun: /work/photo/[slug]
  name: string;        // Ko'rinadigan nom
  coverUrl: string;    // Papkadagi 1-rasm (cover sifatida)
  count: number;       // Papkadagi rasmlar soni
}

export const mockFolders: PhotoFolder[] = [
  {
    slug: "city-nights",
    name: "City Nights",
    coverUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    count: 14,
  },
  {
    slug: "portraits",
    name: "Portraits",
    coverUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    count: 22,
  },
  {
    slug: "mountains",
    name: "Mountains",
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    count: 9,
  },
  {
    slug: "street",
    name: "Street",
    coverUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    count: 31,
  },
  {
    slug: "studio",
    name: "Studio",
    coverUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    count: 17,
  },
  {
    slug: "travel",
    name: "Travel",
    coverUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    count: 26,
  },
];

// Bitta papka ichidagi rasmlar uchun mock data
export const mockFolderImages: Record<string, string[]> = {
  "city-nights": [
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1200&q=80",
    "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=80",
  ],
  portraits: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=1200&q=80",
  ],
  mountains: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  ],
  street: [
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=1200&q=80",
  ],
  studio: [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80",
  ],
  travel: [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80",
  ],
};
