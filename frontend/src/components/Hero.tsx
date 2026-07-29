"use client";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-2 flex flex-col gap-6 text-[10px] md:text-xs tracking-widest font-medium">
          <div className="border border-foreground/20 p-4 inline-flex items-center gap-3">
            <span>SOFTWARE STUDIO</span>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="text-accent">
              <circle cx="9" cy="5" r="4.5" stroke="currentColor" />
              <circle cx="9" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="flex gap-3">
            <span className="text-vertical text-muted tracking-widest">DEV 01</span>
            <p className="max-w-[140px] leading-relaxed">
              BUILDING SCALABLE PRODUCTS / HELPING BRANDS STAND OUT
            </p>
          </div>
        </div>

        <div className="md:col-span-8 relative flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[90%] aspect-[2/1] rounded-[50%] border border-foreground/10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-foreground/20">
              <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" />
            </svg>
          </div>
          <svg viewBox="0 0 400 400" className="w-full max-w-md md:max-w-lg aspect-square text-accent drop-shadow-2xl">
            <defs>
              <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5c1a33" />
                <stop offset="100%" stopColor="#8f3b5c" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M200 40 C260 60, 330 120, 330 210 C330 300, 260 360, 200 360 C140 360, 70 300, 70 210 C70 120, 140 60, 200 40 Z"
              fill="url(#shapeGrad)"
              filter="url(#glow)"
            />
            <path
              d="M150 150 C180 130, 230 140, 240 180 C250 220, 210 260, 170 250 C130 240, 110 190, 150 150 Z"
              fill="#2a0a18"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="md:col-span-2 hidden md:flex justify-end">
          <div className="border border-foreground/20 p-4">
            <p className="text-[10px] tracking-widest text-muted">NEXT PROJECT</p>
            <p className="text-sm font-medium mt-2">PORTFOLIO 2025</p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-8">
        <div className="w-24 h-1 bg-foreground" />
        <a href="#about" className="group flex items-center gap-4 text-[10px] tracking-widest font-medium">
          <span>SCROLL DOWN TO EXPLORE</span>
          <span className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 1v10M7 11l4-4M7 11l-4-4" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
