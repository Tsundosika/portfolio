"use client";

import { useActionState } from "react";

import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-xl font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoFocus
          className="w-full px-4 py-3 text-xl bg-parchment-light border-2 border-ink/40 focus:border-forest focus:outline-none rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] placeholder:text-ink/30 transition-colors duration-200"
          placeholder="Enter admin password"
        />
      </div>

      {state?.error && (
        <p className="text-terracotta text-lg font-medium">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-8 py-3 text-xl font-semibold bg-forest text-parchment-light rounded-tl-sm rounded-tr-lg rounded-br rounded-bl-xl hover:bg-forest-light disabled:opacity-60 transition-colors duration-200 shadow-[3px_3px_0_0_rgba(30,19,10,0.18)]"
      >
        {isPending ? "Logging in…" : "Enter Studio"}
      </button>
    </form>
  );
}
