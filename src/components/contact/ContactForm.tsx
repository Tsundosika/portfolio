"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import { submitContact, ContactState } from "@/app/actions/contact";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const INITIAL: ContactState = { status: "idle" };

const BUDGETS = [
  "Under $25",
  "$25 – $50",
  "$50 – $100",
  "$100 – $200",
  "$200+",
  "Let's discuss",
];

const PLATFORMS = ["Instagram", "Discord", "Twitter / X", "Email", "Other"];

export function ContactForm({ open }: { open: boolean }) {
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col gap-5">
        <div>
          <div className="text-sm font-semibold text-ink/70 tracking-wide uppercase mb-1.5 h-4">
            <Skeleton width="40%" />
          </div>
          <Skeleton height={40} />
        </div>

        <div>
          <div className="text-sm font-semibold text-ink/70 tracking-wide uppercase mb-1.5 h-4">
            <Skeleton width="50%" />
          </div>
          <Skeleton height={100} />
        </div>

        <div>
          <div className="text-sm font-semibold text-ink/70 tracking-wide uppercase mb-1.5 h-4">
            <Skeleton width="45%" />
          </div>
          <Skeleton height={40} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-semibold text-ink/70 tracking-wide uppercase mb-1.5 h-4">
              <Skeleton width="50%" />
            </div>
            <Skeleton height={40} />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink/70 tracking-wide uppercase mb-1.5 h-4">
              <Skeleton width="55%" />
            </div>
            <Skeleton height={40} />
          </div>
        </div>

        <Skeleton height={45} />
      </div>
    );
  }

  if (!open) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 animate-[fade-in_0.5s_ease_forwards]">
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden>
          <circle cx="24" cy="24" r="22" stroke="#C8943A" strokeWidth="2" fill="#C8943A" fillOpacity="0.1" />
          <path d="M24 14v12M24 32v2" stroke="#C8943A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <p className="text-xl font-semibold text-ochre">Commissions closed</p>
        <p className="text-ink/55 text-base max-w-xs">
          Not accepting new requests right now
        </p>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 animate-[fade-in_0.5s_ease_forwards]">
        <svg viewBox="0 0 48 48" width="52" height="52" fill="none" aria-hidden>
          <circle cx="24" cy="24" r="22" stroke="#4A6B3C" strokeWidth="2" fill="#4A6B3C" fillOpacity="0.12" />
          <path d="M14 25l7 7 13-14" stroke="#4A6B3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-xl font-semibold text-forest">Request sent!</p>
        <p className="text-ink/60 text-base">Ren will respond to you soon.</p>
        <button
          onClick={() => formRef.current?.reset()}
          type="button"
          className="mt-2 text-sm text-ink/40 underline underline-offset-2 hover:text-ink/70 transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="w-full max-w-lg mx-auto flex flex-col gap-5 text-left">
      <Field label="Your name" hint="optional">
        <input
          name="name"
          type="text"
          placeholder="Ren"
          className={input()}
        />
      </Field>

      <Field label="What would you like?" required>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Describe your commission — style, subject, size, anything special…"
          className={input("resize-none")}
        />
      </Field>

      <Field label="Budget range" required>
        <select name="budget" required defaultValue="" className={input()}>
          <option value="" disabled>Select a range…</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Platform" required>
          <select name="platform" required defaultValue="" className={input()}>
            <option value="" disabled>Pick one…</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Field>

        <Field label="Handle / address" required>
          <input
            name="handle"
            type="text"
            required
            placeholder="@username"
            className={input()}
          />
        </Field>
      </div>

      {state.status === "error" && (
        <p className="text-red-500/80 text-sm -mt-1">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 px-8 py-3 text-lg font-semibold border-2 border-ink/55 text-ink rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md shadow-[4px_4px_0_0_rgba(30,19,10,0.12)] hover:bg-ink hover:text-parchment disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}

function input(...extra: string[]) {
  return [
    "w-full bg-parchment/60 dark:bg-ink/10 border border-ink/25 rounded-tl rounded-tr-md rounded-br-sm rounded-bl-md",
    "px-4 py-2.5 text-ink placeholder:text-ink/35 text-base",
    "focus:outline-none focus:border-ochre/70 focus:ring-1 focus:ring-ochre/40",
    "transition-colors duration-150",
    ...extra,
  ].join(" ");
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink/70 tracking-wide uppercase">
        {label}
        {hint && <span className="ml-1.5 font-normal normal-case tracking-normal text-ink/40">({hint})</span>}
        {required && <span className="ml-0.5 text-ochre">*</span>}
      </span>
      {children}
    </label>
  );
}
