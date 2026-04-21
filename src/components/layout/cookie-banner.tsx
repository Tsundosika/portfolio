"use client";

import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-lg animate-[fade-in_0.4s_ease_forwards]">
      <div className="bg-parchment border-2 border-ink/15 rounded-tl-xl rounded-tr-md rounded-br-xl rounded-bl-md shadow-[6px_6px_0_0_rgba(30,19,10,0.08)] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className="shrink-0 mt-0.5 text-ochre" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="10" r="1.2" fill="currentColor" />
            <circle cx="15.5" cy="10" r="1.2" fill="currentColor" />
            <circle cx="12" cy="7" r="0.8" fill="currentColor" opacity="0.5" />
            <path d="M8 15c1 1.5 7 1.5 8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-ink/65 leading-relaxed">
            This site uses cookies to remember your preferences and track your commission request status. No tracking, no ads.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-3 py-1.5 text-sm text-ink/45 hover:text-ink/70 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-1.5 text-sm font-semibold border-2 border-ink/40 text-ink rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md hover:bg-ink hover:text-parchment transition-colors duration-150"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
