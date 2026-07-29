export default function About() {
  return (
    <section id="about" className="min-h-screen px-6 md:px-12 py-24 flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-muted text-xs tracking-widest">01 — ABOUT</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold mt-4 leading-tight">
            WE BUILD<br />DIGITAL REALITIES
          </h2>
        </div>
        <div className="text-lg md:text-xl leading-relaxed text-foreground/80">
          <p className="mb-6">
            SekaiDev is a freelance software development company crafting high-performance web applications, APIs, and digital experiences.
          </p>
          <p>
            We combine clean architecture with bold design to help startups and established brands launch products that scale.
          </p>
        </div>
      </div>
    </section>
  );
}
