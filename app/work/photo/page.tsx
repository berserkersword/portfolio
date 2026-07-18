"use client"

import { useEffect, useState } from "react";
import FolderCard from "@/components/FolderCard";
import { ApiPhotoFolder } from "@/app/api/folders/route";
import LoaderIcon from "@/components/loaderIcon";

export default function PhotoPage() {
  const [folders, setFolders] = useState<ApiPhotoFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/folders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFolders(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-10">
        <LoaderIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col p-10">
        <p className="text-sm tracking-wide text-white/40 mt-4">
          Papkalarni yuklab bo'lmadi. Birozdan keyin qayta urinib ko'ring.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-2 md:p-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1 md:mt-4">
    {folders.map((folder) => (
      <FolderCard key={folder.slug} folder={folder} />
    ))}
  </div>
</div>
  );
}