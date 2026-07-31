"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";

interface HeroProps {
  onBonsaiLoaded?: () => void;
}

const TopLabels = () => (
  <div className="hero-label absolute top-6 md:top-8 left-6 right-6 z-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs tracking-widest text-muted/90 uppercase pointer-events-none drop-shadow-sm">
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
  <div className="hero-label absolute bottom-4 md:bottom-8 left-6 right-6 z-10 grid grid-cols-2 gap-4 items-end pointer-events-none">
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

const messages = [
  { text: "Diseño web de alto impacto", side: "left" as const },
  { text: "Desarrollo a medida", side: "right" as const },
  { text: "Experiencias digitales memorables", side: "left" as const },
  { text: "Scroll controlado con animaciones cinematográficas", side: "right" as const },
];

export default function Hero({ onBonsaiLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-label", {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=40%",
          scrub: true,
        },
      });

      messageRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 80, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[360vh] overflow-hidden bg-background">
      <div className="sticky top-0 h-screen w-full z-0">
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] border border-foreground/10 overflow-hidden">
            <RainbowArc />

            <div className="absolute inset-0 z-0">
              <Scene3D onLoaded={onBonsaiLoaded} />
            </div>

            <TopLabels />
            <BottomLabels />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full min-h-[360vh] pointer-events-none">
        {messages.map((msg, i) => {
          const top = 110 + i * 60;
          return (
            <div
              key={i}
              ref={(el) => { messageRefs.current[i] = el; }}
              className={`absolute ${msg.side === "right" ? "right-6 md:right-24" : "left-6 md:left-24"} max-w-xs md:max-w-md pointer-events-auto`}
              style={{ top: `${top}vh` }}
            >
              <div className={`relative p-6 md:p-8 border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-sm ${msg.side === "right" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"}`}>
                <p className="text-lg md:text-2xl font-display font-bold tracking-tighter leading-tight text-foreground">
                  {msg.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
