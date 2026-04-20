"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const SCROLL_THRESHOLD = 80;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="19.78" y1="4.22" x2="17.66" y2="6.34" />
      <line x1="6.34" y1="17.66" x2="4.22" y2="19.78" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={`w-7 h-7 ${className ?? ""}`} />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`text-ink/50 hover:text-ink transition-colors duration-200 ${className ?? ""}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isHome = usePathname() === "/";

  const links = [
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Full-width bar — fades out on scroll */}
      <nav
        className={`sticky top-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-parchment/90 backdrop-blur-sm border-b-2 border-ink/10 transition-opacity duration-300 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-forest">Ren</span>
          <span className="text-2xl text-ink/30">·</span>
          <span className="text-xl font-semibold text-terracotta">Tsundosika</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-xl text-ink/65 hover:text-ink border-b-2 border-transparent hover:border-terracotta transition-colors duration-200 pb-0.5"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      {/* Floating island — slides in when scrolled */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="bg-parchment/96 backdrop-blur-md border border-ink/[0.1] shadow-[0_4px_28px_rgba(30,19,10,0.14),_0_1px_6px_rgba(30,19,10,0.06)] rounded-full flex items-center px-5 py-2.5 transition-all duration-300 ease-out">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xl font-bold text-forest">Ren</span>
            <span className="text-lg text-ink/30">·</span>
            <span className="text-sm font-semibold text-terracotta">Tsundosika</span>
          </Link>

          <div
            className={`flex items-center gap-4 overflow-hidden transition-all duration-300 ease-out ${
              hovered ? "max-w-sm opacity-100 ml-4" : "max-w-0 opacity-0 ml-0"
            }`}
          >
            <span className="text-ink/20 text-sm select-none">|</span>
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-ink/60 hover:text-ink whitespace-nowrap transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
            <span className="text-ink/20 text-sm select-none">|</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
