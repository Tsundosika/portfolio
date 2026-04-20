function Botanical({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 420"
      className={`w-full h-full ${flip ? "[transform:scaleX(-1)]" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50,415 C47,368 54,316 48,264 C42,212 53,160 47,108 C41,56 50,24 48,6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M48,348 C64,328 82,334 79,352 C76,368 60,370 48,348 Z"
        fill="currentColor"
        opacity="0.82"
      />
      <line x1="48" y1="348" x2="79" y2="352" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />

      <path
        d="M49,290 C32,272 14,278 17,295 C20,310 37,312 49,290 Z"
        fill="currentColor"
        opacity="0.76"
      />
      <line x1="49" y1="290" x2="17" y2="295" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />

      <path
        d="M48,228 C64,210 80,216 77,233 C74,248 59,250 48,228 Z"
        fill="currentColor"
        opacity="0.82"
      />
      <line x1="48" y1="228" x2="77" y2="233" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />

      <path
        d="M48,168 C31,150 13,158 16,174 C19,188 36,190 48,168 Z"
        fill="currentColor"
        opacity="0.76"
      />
      <line x1="48" y1="168" x2="16" y2="174" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />

      <path
        d="M48,106 C62,90 76,96 73,111 C70,124 57,126 48,106 Z"
        fill="currentColor"
        opacity="0.82"
      />

      <circle cx="48" cy="26" r="6" fill="currentColor" opacity="0.52" />
      <ellipse cx="48" cy="14" rx="4" ry="6" fill="currentColor" opacity="0.42" />
      <ellipse
        cx="59"
        cy="20"
        rx="4"
        ry="6"
        fill="currentColor"
        opacity="0.42"
        transform="rotate(72 59 20)"
      />
      <ellipse
        cx="55"
        cy="34"
        rx="4"
        ry="6"
        fill="currentColor"
        opacity="0.42"
        transform="rotate(144 55 34)"
      />
      <ellipse
        cx="41"
        cy="34"
        rx="4"
        ry="6"
        fill="currentColor"
        opacity="0.42"
        transform="rotate(216 41 34)"
      />
      <ellipse
        cx="37"
        cy="20"
        rx="4"
        ry="6"
        fill="currentColor"
        opacity="0.42"
        transform="rotate(288 37 20)"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-36 xl:w-52 h-[420px] text-forest opacity-22 hidden lg:block"
        aria-hidden
      >
        <Botanical />
      </div>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-36 xl:w-52 h-[420px] text-forest opacity-22 hidden lg:block"
        aria-hidden
      >
        <Botanical flip />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <p className="text-ochre text-2xl md:text-3xl mb-1 font-semibold tracking-wide">
          Hello, I&apos;m
        </p>
        <h1 className="text-[7rem] md:text-[11rem] xl:text-[13rem] font-bold text-ink leading-none mb-2">
          Ren
        </h1>
        <p className="text-terracotta text-2xl md:text-4xl font-semibold mb-7">
          aka Tsundosika
        </p>
        <p className="text-ink/60 text-xl md:text-2xl mb-14 leading-relaxed max-w-md mx-auto">
          Artist & Coder, digital, ink on paper and programming
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#gallery"
            className="px-8 py-3 text-xl font-semibold bg-forest text-parchment-light rounded-tl-sm rounded-tr-lg rounded-br rounded-bl-xl hover:bg-forest-light transition-colors duration-200 shadow-[3px_3px_0_0_rgba(30,19,10,0.18)]"
          >
            View My Art
          </a>
          <a
            href="#about"
            className="px-8 py-3 text-xl font-semibold border-2 border-terracotta text-terracotta rounded-tl-xl rounded-tr-sm rounded-br-lg rounded-bl hover:bg-terracotta hover:text-parchment-light transition-colors duration-200"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}
