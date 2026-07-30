import FadeIn from "./FadeIn";

const projects = [
  { id: "01", title: "CYTAXI PLATFORM", tags: "Go · Next.js · Postgres" },
  { id: "02", title: "SEKAI ECOMMERCE", tags: "Next.js · Stripe · Tailwind" },
  { id: "03", title: "AI DASHBOARD", tags: "Python · React · FastAPI" },
  { id: "04", title: "FINTECH API", tags: "Go · PostgreSQL · gRPC" },
];

export default function Works() {
  return (
    <section id="works" className="min-h-screen px-6 md:px-12 py-24">
      <FadeIn>
        <div className="mb-16">
          <span className="text-muted text-xs tracking-widest">02 — SELECTED WORKS</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold mt-4">PROJECTS</h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.1}>
            <div className="group border border-foreground/20 p-8 hover:border-accent hover:bg-foreground/5 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-muted text-xs tracking-widest">{p.id}</span>
                <span className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 13L13 1M13 1H4M13 1v9" />
                  </svg>
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-12">{p.title}</h3>
              <p className="text-muted text-sm tracking-widest mt-4">{p.tags}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
