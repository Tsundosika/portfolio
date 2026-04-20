"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { deleteArtwork } from "@/app/actions/gallery";
import type { Artwork } from "@/types/artwork";

export function ArtworkAdminList({ artworks: initial }: { artworks: Artwork[] }) {
  const [artworks, setArtworks] = useState(initial);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteArtwork(id);
      if (result.success) {
        setArtworks((prev) => prev.filter((a) => a.id !== id));
        router.refresh();
      }
    });
  }

  if (artworks.length === 0) {
    return <p className="text-ink/45 text-lg">No artworks yet -upload your first piece above.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="group relative">
          <div className="relative aspect-[4/5] border-2 border-ink/40 rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] overflow-hidden bg-parchment-dark/40">
            <Image
              src={artwork.url}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="20vw"
            />
            <button
              onClick={() => handleDelete(artwork.id)}
              disabled={pending}
              className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/50 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            >
              <span className="text-parchment-light text-lg font-semibold px-3 py-1 border border-parchment-light/60 rounded">
                Delete
              </span>
            </button>
          </div>
          <p className="mt-1.5 text-base font-semibold text-ink truncate">{artwork.title}</p>
          <p className="text-sm text-terracotta">{artwork.medium}</p>
        </div>
      ))}
    </div>
  );
}
