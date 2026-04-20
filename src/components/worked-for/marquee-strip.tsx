"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Client } from "@/data/clients";

export function MarqueeStrip({ clients }: { clients: Client[] }) {
  const [paused, setPaused] = useState(false);
  const needed = clients.length < 6 ? Math.ceil(12 / clients.length) : 2;
  const repeated = Array.from({ length: needed }, () => clients).flat();

  return (
    <div
      className="flex gap-8 w-max"
      style={{
        animation: "marquee 18s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {repeated.map(({ name, href, avatar }, i) => (
        <Link
          key={`${name}-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full border-2 border-ink/20 group-hover:border-terracotta overflow-hidden transition-colors duration-200 shadow-[2px_2px_0_0_rgba(30,19,10,0.08)]">
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-semibold text-ink/50 group-hover:text-terracotta transition-colors duration-200">
            {name}
          </span>
        </Link>
      ))}
    </div>
  );
}
