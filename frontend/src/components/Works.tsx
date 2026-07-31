const projects = [
  { id: "01", title: "CYTAXI PLATFORM", tags: "Go · Next.js · Postgres" },
  { id: "02", title: "SEKAI ECOMMERCE", tags: "Next.js · Stripe · Tailwind" },
  { id: "03", title: "AI DASHBOARD", tags: "Python · React · FastAPI" },
  { id: "04", title: "FINTECH API", tags: "Go · PostgreSQL · gRPC" },
];

export default function Works() {
  return (
    <section id="works" className="min-h-screen w-full px-6 md:px-12 pt-28 md:pt-32 pb-12 flex flex-col justify-center bg-background">
      <div className="mb-6 md:mb-8">
        <span className="text-muted text-xs tracking-widest">02 — SELECTED WORKS</span>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4">PROJECTS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group border border-foreground/20 p-4 md:p-6 hover:border-accent hover:bg-foreground/5 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-muted text-[10px] md:text-xs tracking-widest">{p.id}</span>
              <span className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 13L13 1M13 1H4M13 1v9" />
                </svg>
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold mt-4 md:mt-6">{p.title}</h3>
            <p className="text-muted text-[10px] md:text-xs tracking-widest mt-2">{p.tags}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
