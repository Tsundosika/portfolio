"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LiveReload({ intervalMs = 8000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;

    function start() {
      id = setInterval(() => {
        if (!document.hidden) router.refresh();
      }, intervalMs);
    }

    function stop() { clearInterval(id); }

    start();
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stop() : start()
    );

    return stop;
  }, [router, intervalMs]);

  return null;
}
