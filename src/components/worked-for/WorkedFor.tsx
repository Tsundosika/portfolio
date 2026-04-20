import { clients } from "@/data/clients";
import { MarqueeStrip } from "./marquee-strip";

export function WorkedFor() {
  return (
    <section id="clients" className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2 text-center">
        Worked <span className="text-ochre">For</span>
      </h2>
      <p className="text-ink/50 text-lg text-center mb-10">
        People I&apos;ve had the pleasure creating for.
      </p>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-parchment to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-parchment to-transparent pointer-events-none" />
        <MarqueeStrip clients={clients} />
      </div>
    </section>
  );
}
