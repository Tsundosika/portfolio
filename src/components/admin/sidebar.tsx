"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logout } from "@/app/actions/auth";

const NAV = [
  {
    href: "/admin/commissions",
    label: "Commissions",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <path d="M6 7h8M6 10h8M6 13h4" />
      </svg>
    ),
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r-2 border-ink/8 min-h-screen py-10 px-4">
      <div className="mb-10 px-2">
        <p className="text-ochre text-sm font-semibold">Studio</p>
        <p className="text-2xl font-bold text-ink leading-tight">Ren&apos;s Admin</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ href, label, icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-tl rounded-tr-lg rounded-br-sm rounded-bl-lg text-base font-medium transition-colors duration-150 ${
                active
                  ? "bg-ink text-parchment"
                  : "text-ink/60 hover:text-ink hover:bg-ink/6"
              }`}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      <form action={logout} className="mt-4">
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-3 py-2.5 text-base font-medium text-ink/40 hover:text-terracotta transition-colors duration-150 rounded-lg"
        >
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M13 15l4-5-4-5M17 10H7" />
            <path d="M7 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3" />
          </svg>
          Log out
        </button>
      </form>
    </aside>
  );
}
