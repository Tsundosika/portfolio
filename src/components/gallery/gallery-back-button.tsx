"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function GalleryBackButton() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <button
      onClick={() => ready && router.push("/#gallery")}
      className="text-xl text-ink/55 hover:text-ink border-b-2 border-transparent hover:border-terracotta transition-colors duration-200 pb-0.5"
    >
      ← Home
    </button>
  );
}
