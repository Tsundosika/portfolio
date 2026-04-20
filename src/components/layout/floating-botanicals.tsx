"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function WildFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} fill="none" aria-hidden>
      <path d="M30,118 C29,90 31,60 30,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="30" cy="72" rx="10" ry="6" fill="currentColor" opacity="0.7" transform="rotate(-30 30 72)" />
      <ellipse cx="30" cy="52" rx="10" ry="6" fill="currentColor" opacity="0.65" transform="rotate(25 30 52)" />
      <ellipse cx="48" cy="18" rx="6" ry="10" fill="currentColor" opacity="0.6" transform="rotate(40 48 18)" />
      <ellipse cx="12" cy="14" rx="6" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-40 12 14)" />
      <ellipse cx="38" cy="6" rx="6" ry="10" fill="currentColor" opacity="0.6" transform="rotate(15 38 6)" />
      <ellipse cx="22" cy="4" rx="6" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-15 22 4)" />
      <ellipse cx="30" cy="2" rx="6" ry="10" fill="currentColor" opacity="0.65" />
      <circle cx="30" cy="14" r="7" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function FernLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" className={className} fill="none" aria-hidden>
      <path d="M40,158 C39,120 41,80 38,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {[130, 110, 90, 70, 50, 35, 22].map((y, i) => (
        <g key={y}>
          <path
            d={`M${40 - i * 0.5},${y} C${28 - i},${y - 10} ${18 - i},${y - 2} ${22 - i},${y + 8}`}
            stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity={0.55 + i * 0.03}
          />
          <path
            d={`M${40 + i * 0.5},${y} C${52 + i},${y - 10} ${62 + i},${y - 2} ${58 + i},${y + 8}`}
            stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity={0.55 + i * 0.03}
          />
        </g>
      ))}
    </svg>
  );
}

function CloverLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 100" className={className} fill="none" aria-hidden>
      <path d="M35,98 C34,78 35,60 35,40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="35" cy="28" rx="14" ry="18" fill="currentColor" opacity="0.7" />
      <ellipse cx="18" cy="42" rx="14" ry="18" fill="currentColor" opacity="0.65" transform="rotate(-50 18 42)" />
      <ellipse cx="52" cy="42" rx="14" ry="18" fill="currentColor" opacity="0.65" transform="rotate(50 52 42)" />
      <circle cx="35" cy="38" r="6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function TinyBlossom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className} fill="none" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="25" cy="11" rx="6" ry="10"
          fill="currentColor" opacity="0.65"
          transform={`rotate(${deg} 25 25)`}
        />
      ))}
      <circle cx="25" cy="25" r="8" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

type BotanicalDef = {
  id: string;
  x: string;
  y: string;
  w: number;
  opacity: number;
  baseRotate: number;
  swayDeg: number;
  swayDur: number;
  swayDelay: number;
  bobPx: number;
  shape: "flower" | "fern" | "clover" | "blossom";
};

const BOTANICALS: BotanicalDef[] = [
  { id: "a", x: "1%",  y: "10%", w: 90,  opacity: 0.13, baseRotate: -8,  swayDeg: 5,  swayDur: 6,   swayDelay: 0,    bobPx: 6,  shape: "fern"    },
  { id: "b", x: "91%", y: "5%",  w: 75,  opacity: 0.11, baseRotate: 12,  swayDeg: 6,  swayDur: 7,   swayDelay: 1.2,  bobPx: 7,  shape: "flower"  },
  { id: "c", x: "0%",  y: "52%", w: 80,  opacity: 0.12, baseRotate: -5,  swayDeg: 4,  swayDur: 8,   swayDelay: 0.6,  bobPx: 5,  shape: "clover"  },
  { id: "d", x: "93%", y: "48%", w: 68,  opacity: 0.10, baseRotate: 6,   swayDeg: 7,  swayDur: 6.5, swayDelay: 2,    bobPx: 8,  shape: "fern"    },
  { id: "e", x: "3%",  y: "82%", w: 60,  opacity: 0.11, baseRotate: -12, swayDeg: 5,  swayDur: 7.5, swayDelay: 0.4,  bobPx: 6,  shape: "blossom" },
  { id: "f", x: "88%", y: "78%", w: 70,  opacity: 0.10, baseRotate: 10,  swayDeg: 6,  swayDur: 6.8, swayDelay: 1.8,  bobPx: 7,  shape: "flower"  },
  { id: "g", x: "45%", y: "0%",  w: 55,  opacity: 0.08, baseRotate: 0,   swayDeg: 4,  swayDur: 9,   swayDelay: 3,    bobPx: 4,  shape: "blossom" },
];

const ShapeMap = {
  flower:  WildFlower,
  fern:    FernLeaf,
  clover:  CloverLeaf,
  blossom: TinyBlossom,
};

export function FloatingBotanicals() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      BOTANICALS.forEach((b, i) => {
        const el = refs.current[i];
        if (!el) return;

        gsap.set(el, { rotation: b.baseRotate, transformOrigin: "50% 100%" });

        gsap.to(el, {
          rotation: b.baseRotate + b.swayDeg,
          y: b.bobPx,
          duration: b.swayDur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: b.swayDelay,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {BOTANICALS.map((b, i) => {
        const Shape = ShapeMap[b.shape];
        return (
          <div
            key={b.id}
            ref={(el) => { refs.current[i] = el; }}
            className="absolute text-forest will-change-transform"
            style={{ left: b.x, top: b.y, width: b.w, opacity: b.opacity }}
          >
            <Shape className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}
