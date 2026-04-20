import { Nav } from "@/components/layout/nav/nav";
import { Hero } from "@/components/hero/Hero";
import { Gallery } from "@/components/gallery/Gallery";
import { About } from "@/components/about/About";
import { WorkedFor } from "@/components/worked-for/WorkedFor";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { readSettings } from "@/lib/gallery";

function Divider() {
  return (
    <div className="flex items-center justify-center py-2 px-8" aria-hidden>
      <svg
        viewBox="0 0 400 40"
        className="w-full max-w-2xl text-forest/28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,20 C50,10 100,30 150,20 C200,10 250,30 300,20 C350,10 380,25 400,20"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M191,18 C190,10 196,5 200,9 C204,5 210,10 209,18"
          fill="currentColor"
          opacity="0.65"
        />
        <circle cx="200" cy="20" r="4" fill="currentColor" opacity="0.45" />
        <path d="M182,20 C180,13 184,9 188,12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M218,20 C220,13 216,9 212,12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

async function ContactSection() {
  const { commissionsOpen } = await readSettings();
  return (
    <section id="contact" className="px-6 md:px-12 py-20 max-w-3xl mx-auto w-full text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-ink mb-4">
        Let&apos;s <span className="text-ochre">Connect</span>
      </h2>
      <p className="text-ink/60 text-xl mb-10 max-w-md mx-auto leading-relaxed">
        Open for commissions, collaborations, and just good conversations about art.
      </p>
      <ContactForm open={commissionsOpen} />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Divider />
        <ScrollReveal>
          <Gallery />
        </ScrollReveal>
        <Divider />
        <ScrollReveal delay="100">
          <WorkedFor />
        </ScrollReveal>
        <Divider />
        <ScrollReveal delay="100">
          <About />
        </ScrollReveal>
        <Divider />
        <ScrollReveal delay="100">
          <ContactSection />
        </ScrollReveal>
      </main>
      <footer className="py-7 border-t-2 border-ink/10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/tsundosika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ink/35 hover:text-ochre transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://github.com/Tsundosika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-ink/35 hover:text-ochre transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
          <p className="text-ink/35 text-sm">© 2026 Ren · Tsundosika · All artwork rights reserved</p>
        </div>
      </footer>
    </>
  );
}
