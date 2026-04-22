const skills = [
  "Digital Art",
  "Ink & Pen",
  "Mixed Media",
  "Graphite",
  "Gouache",
];

export function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-20 max-w-3xl mx-auto w-full text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-ink mb-14">
        About <span className="text-terracotta">Me</span>
      </h2>

      <div className="space-y-6 mb-10">
        <p className="text-xl text-ink/75 leading-relaxed">
        Hi im ren
        </p>
        <p className="text-xl text-ink/75 leading-relaxed">
        i didnt have time yet for a proper about me
        </p>
        <blockquote className="mx-auto max-w-xl border-l-[3px] border-terracotta/55 pl-5 text-left text-xl italic text-ink/60">
          Just do it instead of thinking about it - Musa
        </blockquote>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-base bg-parchment-dark border border-forest/45 text-forest rounded-tl-sm rounded-tr-lg rounded-br-sm rounded-bl-lg"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
