"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type VineDef = {
  id: string;
  left: string;
  height: number;
  swayDeg: number;
  swayDur: number;
  swayDelay: number;
  driftDir: 1 | -1;
  opacity: number;
  leaves: { y: number; side: 1 | -1; size: number }[];
};

const VINES: VineDef[] = [
  {
    id: "v1", left: "6%", height: 380, swayDeg: 9, swayDur: 5.5, swayDelay: 0,
    driftDir: -1, opacity: 0.22,
    leaves: [
      { y: 90,  side: 1,  size: 1.0 },
      { y: 170, side: -1, size: 0.9 },
      { y: 250, side: 1,  size: 0.85 },
      { y: 320, side: -1, size: 0.75 },
    ],
  },
  {
    id: "v2", left: "22%", height: 260, swayDeg: 7, swayDur: 6.8, swayDelay: 1.4,
    driftDir: -1, opacity: 0.16,
    leaves: [
      { y: 80,  side: -1, size: 0.9 },
      { y: 160, side: 1,  size: 0.85 },
      { y: 220, side: -1, size: 0.75 },
    ],
  },
  {
    id: "v3", left: "41%", height: 440, swayDeg: 6, swayDur: 7.2, swayDelay: 0.7,
    driftDir: 1, opacity: 0.14,
    leaves: [
      { y: 100, side: 1,  size: 0.95 },
      { y: 200, side: -1, size: 0.9 },
      { y: 300, side: 1,  size: 0.8 },
      { y: 390, side: -1, size: 0.7 },
    ],
  },
  {
    id: "v4", left: "62%", height: 300, swayDeg: 8, swayDur: 5.9, swayDelay: 2.1,
    driftDir: 1, opacity: 0.17,
    leaves: [
      { y: 85,  side: -1, size: 0.95 },
      { y: 175, side: 1,  size: 0.85 },
      { y: 260, side: -1, size: 0.75 },
    ],
  },
  {
    id: "v5", left: "80%", height: 350, swayDeg: 10, swayDur: 6.3, swayDelay: 0.3,
    driftDir: 1, opacity: 0.20,
    leaves: [
      { y: 95,  side: 1,  size: 1.0 },
      { y: 185, side: -1, size: 0.9 },
      { y: 275, side: 1,  size: 0.8 },
      { y: 340, side: -1, size: 0.7 },
    ],
  },
  {
    id: "v6", left: "93%", height: 200, swayDeg: 7, swayDur: 7.5, swayDelay: 1.8,
    driftDir: 1, opacity: 0.15,
    leaves: [
      { y: 70,  side: -1, size: 0.9 },
      { y: 150, side: 1,  size: 0.8 },
    ],
  },
];

function VineSvg({ vine }: { vine: VineDef }) {
  const vw = 60;
  const cx = vw / 2;

  const stemPoints = [0, ...vine.leaves.map((l) => l.y), vine.height];
  const dParts = stemPoints.map((y, i) => {
    if (i === 0) return `M${cx},0`;
    const prev = stemPoints[i - 1];
    const mid = (prev + y) / 2;
    const wobble = i % 2 === 0 ? 4 : -4;
    return `C${cx + wobble},${mid} ${cx - wobble},${mid} ${cx},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${vw} ${vine.height}`}
      width={vw}
      height={vine.height}
      fill="none"
      aria-hidden
      className="text-forest"
      style={{ display: "block" }}
    >
      <path
        d={dParts.join(" ")}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {vine.leaves.map((leaf, i) => {
        const lx = cx + leaf.side * 22 * leaf.size;
        const ly = leaf.y;
        const angle = leaf.side * -35;
        return (
          <g key={i} transform={`rotate(${angle} ${cx} ${ly})`}>
            <path
              d={`M${cx},${ly} C${cx - 12 * leaf.size},${ly - 14 * leaf.size} ${cx - 22 * leaf.size},${ly - 8 * leaf.size} ${lx},${ly + 4 * leaf.size} C${cx - 10 * leaf.size},${ly + 10 * leaf.size} ${cx},${ly + 6 * leaf.size} ${cx},${ly} Z`}
              fill="currentColor"
              opacity="0.85"
            />
            <path
              d={`M${cx},${ly} L${lx},${ly + 4 * leaf.size}`}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.4"
            />
          </g>
        );
      })}

      <path
        d={`M${cx - 8},${vine.height - 10} C${cx - 4},${vine.height - 20} ${cx + 4},${vine.height - 18} ${cx + 8},${vine.height - 8}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
    </svg>
  );
}

export function HangingVines() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const vineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      VINES.forEach((vine, i) => {
        const el = vineRefs.current[i];
        if (!el) return;

        gsap.set(el, { transformOrigin: "50% 0%", rotation: 0 });

        gsap.to(el, {
          rotation: vine.swayDeg,
          duration: vine.swayDur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: vine.swayDelay,
        });
      });

      const quickSetters = vineRefs.current.map((el, i) =>
        el
          ? {
              opacity: gsap.quickTo(el, "opacity", { duration: 0.3 }),
              x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power1.out" }),
            }
          : null
      );

      const FADE_START = 80;
      const FADE_END = 500;

      const onScroll = () => {
        const sy = window.scrollY;
        const t = Math.max(0, Math.min(1, (sy - FADE_START) / (FADE_END - FADE_START)));

        VINES.forEach((vine, i) => {
          const qs = quickSetters[i];
          if (!qs) return;
          qs.opacity(vine.opacity * (1 - t));
          qs.x(vine.driftDir * t * 60);
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 inset-x-0 pointer-events-none z-10"
      aria-hidden
    >
      {VINES.map((vine, i) => (
        <div
          key={vine.id}
          ref={(el) => { vineRefs.current[i] = el; }}
          className="absolute top-0 will-change-transform"
          style={{ left: vine.left, opacity: vine.opacity }}
        >
          <VineSvg vine={vine} />
        </div>
      ))}
    </div>
  );
}
