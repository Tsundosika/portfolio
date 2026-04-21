"use client";

import { useEffect, useState } from "react";

type Status = "accepted" | "declined" | null;

function getCommissionCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)commission_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function CommissionStatus() {
  const [status, setStatus] = useState<Status>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    const id = getCommissionCookie();
    if (!id) return;
    if (localStorage.getItem(`commission_seen_${id}`)) return;

    setRequestId(id);

    const es = new EventSource(`/api/commission-status/${id}/stream`);

    es.onmessage = (e) => {
      try {
        const data: { status: string } = JSON.parse(e.data);
        if (data.status === "accepted" || data.status === "declined") {
          setStatus(data.status as Status);
          es.close();
        }
      } catch { /* ignore parse errors */ }
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  function dismiss() {
    if (requestId) localStorage.setItem(`commission_seen_${requestId}`, "1");
    setStatus(null);
  }

  if (!status) return null;

  const accepted = status === "accepted";

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-md animate-[fade-in_0.4s_ease_forwards]">
      <div className={`border-2 rounded-tl-xl rounded-tr-md rounded-br-xl rounded-bl-md shadow-[6px_6px_0_0_rgba(30,19,10,0.1)] px-5 py-4 flex items-start gap-4 bg-parchment ${accepted ? "border-forest/40" : "border-terracotta/40"}`}>
        <span className="text-2xl shrink-0 mt-0.5">{accepted ? "✅" : "❌"}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-base ${accepted ? "text-forest" : "text-terracotta"}`}>
            {accepted ? "Commission accepted!" : "Commission declined"}
          </p>
          <p className="text-sm text-ink/55 mt-0.5 leading-snug">
            {accepted
              ? "Ren accepted your request — they'll reach out to you soon."
              : "Ren isn't able to take this commission right now."}
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-ink/35 hover:text-ink/70 transition-colors text-lg leading-none mt-0.5"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
