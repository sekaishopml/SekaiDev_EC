export default function About() {
  return (
    <section id="about" className="min-h-screen w-full px-6 md:px-12 pt-28 md:pt-32 pb-12 flex flex-col justify-center bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <span className="text-muted text-xs tracking-widest">01 — ABOUT</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            WE BUILD<br />DIGITAL REALITIES
          </h2>
        </div>
        <div className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/80">
          <p className="mb-4">
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
