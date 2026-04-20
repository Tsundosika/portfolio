"use client";

import { useEffect, useRef, useState } from "react";

const delayClass: Record<string, string> = {
  "0": "",
  "100": "delay-100",
  "200": "delay-200",
  "300": "delay-300",
};

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: "0" | "100" | "200" | "300";
};

export function ScrollReveal({ children, className = "", delay = "0" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${delayClass[delay]} ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
