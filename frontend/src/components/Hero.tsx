import Scene3D from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";

interface HeroProps {
  onBonsaiLoaded?: () => void;
}

const TopLabels = () => (
  <div className="absolute top-24 md:top-28 left-6 right-6 z-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs tracking-widest text-muted/90 uppercase pointer-events-none drop-shadow-sm">
    <div className="flex flex-col gap-1">
      <span>Software Studio</span>
      <span>Dev 01</span>
    </div>
    <div className="hidden md:block md:col-span-2" />
    <div className="text-right flex flex-col gap-1 md:text-right">
      <span>Portfolio 2025</span>
      <span>Next Project</span>
    </div>
  </div>
);

const BottomLabels = () => (
  <div className="absolute bottom-4 md:bottom-8 left-6 right-6 z-10 grid grid-cols-2 gap-4 items-end pointer-events-none">
    <p className="text-xs md:text-sm tracking-widest uppercase text-foreground/80 max-w-md drop-shadow-sm">
      Building scalable products / helping brands stand out
    </p>
    <div className="flex flex-col items-end gap-1 text-[10px] md:text-xs tracking-widest text-muted/90 drop-shadow-sm">
      <span>99%</span>
      <span className="flex items-center gap-2">
        Scroll down to explore
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 1v14M8 14l-4-4M8 14l4-4" />
        </svg>
      </span>
    </div>
  </div>
);

export default function Hero({ onBonsaiLoaded }: HeroProps) {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <RainbowArc />
      <TopLabels />

      <div className="absolute inset-0 z-0">
        <Scene3D onLoaded={onBonsaiLoaded} />
      </div>

      <BottomLabels />
    </section>
  );
}
