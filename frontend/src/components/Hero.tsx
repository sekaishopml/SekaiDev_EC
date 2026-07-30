import Scene3D from "@/components/three/Scene3D";

interface HeroProps {
  onBonsaiLoaded?: () => void;
}

export default function Hero({ onBonsaiLoaded }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-40 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs tracking-widest text-muted uppercase">
        <div className="flex flex-col gap-2">
          <span>Software Studio</span>
          <span>Dev 01</span>
        </div>
        <div className="hidden md:block md:col-span-2" />
        <div className="text-right flex flex-col gap-2 md:text-right">
          <span>Portfolio 2025</span>
          <span>Next Project</span>
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto my-8">
        <div className="frame relative aspect-[4/3] md:aspect-[16/10] w-full">
          <div className="frame-grain absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 border border-foreground/20 p-4 md:p-6">
            <div className="absolute inset-0 border border-foreground/10" />
            <div className="frame-cross absolute inset-0 pointer-events-none" aria-hidden="true">
              <span className="absolute top-1/2 left-0 w-full h-px bg-foreground/10" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-foreground/10" />
              <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-foreground/30" />
              <span className="absolute top-4 right-4 w-8 h-8 border-t border-r border-foreground/30" />
              <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-foreground/30" />
              <span className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-foreground/30" />
            </div>
            <div className="relative w-full h-full z-10">
              <Scene3D onLoaded={onBonsaiLoaded} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <p className="text-xs md:text-sm tracking-widest uppercase text-foreground/70 max-w-md">
          Building scalable products / helping brands stand out
        </p>
        <div className="flex flex-col items-end gap-2 text-[10px] md:text-xs tracking-widest text-muted">
          <span>99%</span>
          <span className="flex items-center gap-2">
            Scroll down to explore
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1v14M8 14l-4-4M8 14l4-4" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
