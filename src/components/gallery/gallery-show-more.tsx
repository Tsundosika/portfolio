"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function GalleryShowMore({ show }: { show: boolean }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!show || !ready) return null;

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={() => router.push("/gallery")}
        className="px-8 py-3 text-xl font-semibold border-2 border-forest text-forest rounded-tl-xl rounded-tr-sm rounded-br-lg rounded-bl hover:bg-forest hover:text-parchment-light transition-colors duration-200 shadow-[3px_3px_0_0_rgba(30,19,10,0.12)]"
      >
        View Full Gallery →
      </button>
    </div>
  );
}
