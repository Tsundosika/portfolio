"use client";

import { useTransition, useState } from "react";

import { respondToCommission } from "@/app/actions/commissions";
import type { CommissionRequest } from "@/lib/requests";

type Status = CommissionRequest["status"];

const BADGE: Record<Status, string> = {
  pending:  "text-ochre border-ochre/40 bg-ochre/10",
  accepted: "text-forest border-forest/40 bg-forest/10",
  declined: "text-terracotta border-terracotta/40 bg-terracotta/10",
  done:     "text-ink/40 border-ink/20 bg-ink/5",
};

const LABEL: Record<Status, string> = {
  pending:  "Pending",
  accepted: "Accepted",
  declined: "Declined",
  done:     "Done",
};

function Card({
  r,
  onRespond,
  isPending,
}: {
  r: CommissionRequest;
  onRespond: (id: string, res: "accepted" | "declined" | "done") => void;
  isPending: boolean;
}) {
  return (
    <div className={`border-2 rounded-tl rounded-tr-xl rounded-br-sm rounded-bl-xl p-5 ${
      r.status === "pending" ? "border-ochre/35" : r.status === "accepted" ? "border-forest/30" : "border-ink/10"
    }`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="min-w-0">
          {r.name && <p className="text-base font-semibold text-ink">{r.name}</p>}
          <p className="text-sm text-ink/45 mt-0.5">
            {new Date(r.submittedAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric",
            })}
            {" · "}{r.platform}: <span className="font-medium">{r.handle}</span>
          </p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${BADGE[r.status]}`}>
          {LABEL[r.status]}
        </span>
      </div>

      <p className="text-base text-ink/75 leading-relaxed mb-1">{r.description}</p>
      <p className="text-sm font-semibold text-ochre mb-4">{r.budget}</p>

      <div className="flex gap-2 flex-wrap">
        {r.status === "pending" && (
          <>
            <button onClick={() => onRespond(r.id, "accepted")} disabled={isPending}
              className="px-4 py-1.5 text-sm font-semibold border-2 border-forest/50 text-forest rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md hover:bg-forest hover:text-parchment disabled:opacity-40 transition-colors duration-150">
              ✅ Accept
            </button>
            <button onClick={() => onRespond(r.id, "declined")} disabled={isPending}
              className="px-4 py-1.5 text-sm font-semibold border-2 border-terracotta/50 text-terracotta rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md hover:bg-terracotta hover:text-parchment disabled:opacity-40 transition-colors duration-150">
              ❌ Decline
            </button>
          </>
        )}
        {r.status === "accepted" && (
          <button onClick={() => onRespond(r.id, "done")} disabled={isPending}
            className="px-4 py-1.5 text-sm font-semibold border-2 border-ink/30 text-ink/60 rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md hover:bg-ink hover:text-parchment disabled:opacity-40 transition-colors duration-150">
            ✓ Mark as done
          </button>
        )}
      </div>
    </div>
  );
}

function CollapsedGroup({
  label,
  count,
  items,
  onRespond,
  isPending,
}: {
  label: string;
  count: number;
  items: CommissionRequest[];
  onRespond: (id: string, res: "accepted" | "declined" | "done") => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (count === 0) return null;

  return (
    <div className="border-2 border-ink/10 rounded-tl rounded-tr-xl rounded-br-sm rounded-bl-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-ink/3 transition-colors"
      >
        <span className="text-sm font-semibold text-ink/50">
          {label} <span className="ml-1.5 text-ink/30 font-normal">({count})</span>
        </span>
        <svg
          viewBox="0 0 16 16" width="14" height="14"
          fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          className={`text-ink/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M3 5l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col gap-3 px-4 pb-4 pt-1">
          {items.map((r) => (
            <Card key={r.id} r={r} onRespond={onRespond} isPending={isPending} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommissionList({ requests: initial }: { requests: CommissionRequest[] }) {
  const [requests, setRequests] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function respond(id: string, response: "accepted" | "declined" | "done") {
    startTransition(async () => {
      const { ok } = await respondToCommission(id, response);
      if (ok) setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: response } : r)
      );
    });
  }

  const pending  = requests.filter((r) => r.status === "pending");
  const accepted = requests.filter((r) => r.status === "accepted");
  const declined = requests.filter((r) => r.status === "declined");
  const done     = requests.filter((r) => r.status === "done");

  if (requests.length === 0) {
    return <p className="text-ink/40 text-lg py-4">No commission requests yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Active — always open */}
      {(pending.length > 0 || accepted.length > 0) && (
        <div className="flex flex-col gap-3">
          {[...pending, ...accepted].map((r) => (
            <Card key={r.id} r={r} onRespond={respond} isPending={isPending} />
          ))}
        </div>
      )}

      {pending.length === 0 && accepted.length === 0 && (
        <p className="text-ink/40 text-base py-2">No active requests right now.</p>
      )}

      {/* Collapsed archives */}
      <div className="flex flex-col gap-2">
        <CollapsedGroup label="Declined" count={declined.length} items={declined} onRespond={respond} isPending={isPending} />
        <CollapsedGroup label="Done" count={done.length} items={done} onRespond={respond} isPending={isPending} />
      </div>
    </div>
  );
}
