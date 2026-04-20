import Link from "next/link";

import { Nav } from "@/components/layout/nav/nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden relative">
        <WiltedFlower className="absolute left-4 bottom-12 w-40 md:w-56 text-forest opacity-20" />
        <WiltedFlower className="absolute right-4 top-12 w-40 md:w-56 text-terracotta opacity-15 [transform:scaleX(-1)_rotate(20deg)]" />

        <div className="relative z-10 text-center max-w-lg">
          <p className="text-ochre text-2xl font-semibold mb-2">oh no —</p>
          <h1 className="text-[8rem] md:text-[11rem] font-bold text-ink leading-none mb-3">
            404
          </h1>
          <p className="text-ink/60 text-2xl md:text-3xl mb-3 font-semibold">
            Page not found
          </p>
          <p className="text-ink/45 text-xl mb-12 leading-relaxed">
            Looks like this page wandered off into the woods. It happens to the
            best of us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 text-xl font-semibold bg-forest text-parchment-light rounded-tl-sm rounded-tr-lg rounded-br rounded-bl-xl hover:bg-forest-light transition-colors duration-200 shadow-[3px_3px_0_0_rgba(30,19,10,0.18)]"
            >
              ← Back home
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-3 text-xl font-semibold border-2 border-terracotta text-terracotta rounded-tl-xl rounded-tr-sm rounded-br-lg rounded-bl hover:bg-terracotta hover:text-parchment-light transition-colors duration-200"
            >
              View gallery
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function WiltedFlower({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M60,315 C57,270 64,220 55,170 C46,120 60,80 55,40"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M55,230 C38,215 18,222 20,240 C22,255 42,256 55,230 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M56,170 C72,155 88,162 85,178 C82,192 66,194 56,170 Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M55,110 C38,96 20,103 23,120 C26,134 44,135 55,110 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M54,55 C68,40 82,47 79,62 C76,75 62,77 54,55 Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M55,40 C50,28 44,18 48,8 C52,16 58,10 56,22 C54,10 62,14 58,26"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <circle cx="55" cy="5" r="5" fill="currentColor" opacity="0.5" />
      <circle cx="46" cy="10" r="3.5" fill="currentColor" opacity="0.4" />
      <circle cx="64" cy="10" r="3.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
