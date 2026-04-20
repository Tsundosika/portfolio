"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { Artwork } from "@/types/artwork";

function Lightbox({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10"
      style={{ animation: "fade-in 0.18s ease-out both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/78 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl flex flex-col max-h-[90vh] bg-parchment border-2 border-ink/20 rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden"
        style={{ animation: "scale-in 0.22s cubic-bezier(0.32,0.72,0,1) both" }}
      >
        {/* Image */}
        <div className="relative flex-1 min-h-0 bg-parchment-dark/20 overflow-hidden">
          <div className="absolute inset-4 border border-brown/10 rounded-xs pointer-events-none z-10" />
          <Image
            src={artwork.url}
            alt={artwork.title}
            width={1200}
            height={900}
            className="w-full h-full object-contain"
            style={{ maxHeight: "62vh" }}
            sizes="(max-width: 768px) 95vw, 42rem"
            priority
          />
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-t-2 border-ink/10 bg-parchment">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-ink leading-tight truncate">{artwork.title}</p>
            <p className="text-sm font-semibold text-terracotta mt-0.5">{artwork.medium}</p>
            {artwork.description && (
              <p className="text-sm text-ink/50 mt-1 line-clamp-1">{artwork.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-2 border-ink/20 text-ink/45 hover:text-ink hover:border-ink/60 transition-colors duration-150 text-base"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group cursor-pointer" onClick={() => setOpen(true)}>
        <div className="relative border-2 border-ink/55 rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] shadow-[4px_4px_0_0_rgba(30,19,10,0.14),-1px_-1px_0_0_rgba(30,19,10,0.07)] hover:shadow-[5px_5px_0_0_rgba(30,19,10,0.2)] hover:-translate-y-1 transition-all duration-200 overflow-hidden bg-parchment-dark/40">
          <div className="relative aspect-4/5">
            <Image
              src={artwork.url}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-3 border border-brown/15 rounded-xs pointer-events-none" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-200" />
          </div>
        </div>
        <div className="mt-3 px-1">
          <h3 className="text-xl font-semibold text-ink group-hover:text-forest transition-colors duration-200">
            {artwork.title}
          </h3>
          <p className="text-base font-medium text-terracotta">{artwork.medium}</p>
        </div>
      </article>

      {open && <Lightbox artwork={artwork} onClose={() => setOpen(false)} />}
    </>
  );
}
