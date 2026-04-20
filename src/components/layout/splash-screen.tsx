"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("splash-done")) return;
    setVisible(true);

    let raf: number;

    raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        // Measure all stroked paths for draw-in animation
        const strokes = overlay.querySelectorAll<SVGGeometryElement>(".sp-draw");
        strokes.forEach((el) => {
          const len = el.getTotalLength?.() ?? 200;
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len}`;
        });

        tlRef.current?.kill();
        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem("splash-done", "1");
            setVisible(false);
          },
        });
        tlRef.current = tl;

        gsap.set(".sp-fill", { opacity: 0 });
        gsap.set(".sp-label", { opacity: 0, y: 8 });

        tl
          // 1. Draw stem
          .to(".sp-stem", { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" })
          // 2. Draw leaves
          .to(".sp-leaf", { strokeDashoffset: 0, duration: 0.45, stagger: 0.12, ease: "power2.inOut" }, "-=0.1")
          // 3. Draw petals one by one
          .to(".sp-petal", { strokeDashoffset: 0, duration: 0.38, stagger: 0.1, ease: "power1.inOut" }, "-=0.1")
          // 4. Fill petals
          .to(".sp-fill", { opacity: 1, duration: 0.4, stagger: 0.06, ease: "power1.out" }, "-=0.2")
          // 5. Draw center circle
          .to(".sp-center", { strokeDashoffset: 0, duration: 0.35, ease: "power2.inOut" }, "-=0.15")
          // 6. Label fades in
          .to(".sp-label", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
          // 7. Hold
          .to({}, { duration: 0.9 })
          // 8. Fade out whole overlay
          .to(overlay, { opacity: 0, duration: 0.55, ease: "power2.inOut" });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      tlRef.current?.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-500 flex flex-col items-center justify-center bg-parchment"
    >
      <svg
        viewBox="0 0 200 260"
        width="260"
        height="338"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Stem */}
        <path
          className="sp-draw sp-stem"
          d="M100,255 C99,220 101,195 100,170"
          stroke="#4A6B3C" strokeWidth="2.2" strokeLinecap="round"
        />

        {/* Left leaf */}
        <path
          className="sp-draw sp-leaf"
          d="M100,215 C82,204 70,188 78,174 C84,164 97,170 100,185"
          stroke="#4A6B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Left leaf fill */}
        <path
          className="sp-fill"
          d="M100,215 C82,204 70,188 78,174 C84,164 97,170 100,185"
          stroke="none" fill="#4A6B3C" fillOpacity="0.25"
        />

        {/* Right leaf */}
        <path
          className="sp-draw sp-leaf"
          d="M100,215 C118,204 130,188 122,174 C116,164 103,170 100,185"
          stroke="#4A6B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Right leaf fill */}
        <path
          className="sp-fill"
          d="M100,215 C118,204 130,188 122,174 C116,164 103,170 100,185"
          stroke="none" fill="#4A6B3C" fillOpacity="0.25"
        />

        {/* 6 petals — drawn as outlines then filled */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 110)`}>
            <ellipse
              className="sp-draw sp-petal"
              cx="100" cy="70" rx="13" ry="36"
              stroke="#4A6B3C" strokeWidth="1.4"
            />
            <ellipse
              className="sp-fill"
              cx="100" cy="70" rx="13" ry="36"
              fill="#4A6B3C" fillOpacity="0.18"
            />
          </g>
        ))}

        {/* Petal veins */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line
            key={`v${i}`}
            className="sp-fill"
            x1="100" y1="106" x2="100" y2="42"
            stroke="#2E4A24" strokeWidth="0.7" opacity="0.3"
            transform={`rotate(${angle} 100 110)`}
          />
        ))}

        {/* Center circle */}
        <circle
          className="sp-draw sp-center"
          cx="100" cy="110" r="20"
          stroke="#C8943A" strokeWidth="2"
        />
        <circle className="sp-fill" cx="100" cy="110" r="20" fill="#C8943A" fillOpacity="0.55" />
        <circle className="sp-fill" cx="100" cy="110" r="11" fill="#C8943A" fillOpacity="0.7" />
        <circle className="sp-fill" cx="100" cy="110" r="5"  fill="#1E130A" fillOpacity="0.45" />
      </svg>

      <p className="sp-label mt-5 text-ink/30 text-sm tracking-[0.35em] uppercase select-none">
        Tsundosika
      </p>
    </div>
  );
}
