"use client";

import { useTransition } from "react";
import { setCommissionsOpen } from "@/app/actions/settings";

export function CommissionsToggle({ open }: { open: boolean }) {
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(() => { setCommissionsOpen(!open); });
  }

  return (
    <div className="flex items-center justify-between p-5 border-2 border-ink/10 rounded-tl rounded-tr-xl rounded-br-sm rounded-bl-xl">
      <div>
        <p className="text-lg font-semibold text-ink">Commission status</p>
        <p className="text-sm text-ink/50 mt-0.5">
          {open ? "Visible on the contact form — accepting requests." : "Contact form shows a closed notice."}
        </p>
      </div>

      <button
        onClick={toggle}
        disabled={pending}
        aria-pressed={open}
        className="flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={`text-sm font-semibold transition-colors ${open ? "text-forest" : "text-ink/40"}`}>
          {open ? "Open" : "Closed"}
        </span>
        <div className={`relative w-12 h-6 rounded-full border-2 transition-colors duration-200 ${open ? "bg-forest/20 border-forest/50" : "bg-ink/10 border-ink/25"}`}>
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${open ? "left-6 bg-forest" : "left-0.5 bg-ink/35"}`}
          />
        </div>
      </button>
    </div>
  );
}
