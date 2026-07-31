"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";

interface HeroSectionProps {
  onBonsaiLoaded?: () => void;
}

const messages = [
  { text: "E-COMMERCE", side: "left" as const },
  { text: "CRM DASHBOARD", side: "left" as const },
  { text: "LANDING PAGES", side: "right" as const },
  { text: "APP SOFTWARE", side: "right" as const },
];

export default function HeroSection({ onBonsaiLoaded }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bonsaiFrameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = heroRef.current;
    const frame = bonsaiFrameRef.current;
    const title = titleRef.current;
    const labels = labelsRef.current;
    const cards = cardsRef.current;
    const arc = arcRef.current;
    if (!section || !frame || !title || !labels || !cards || !arc) return;

    const w = window.innerWidth;
    const isMobile = w < 768;
    const isTablet = w < 1024;

    const frameTarget = isMobile
      ? { width: "85vw", height: "55vh", top: "15%", left: "50%", xPercent: -50, borderRadius: "4px" }
      : isTablet
      ? { width: "360px", height: "480px", top: "18%", left: "55%", xPercent: 0, borderRadius: "4px" }
      : { width: "480px", height: "600px", top: "18%", left: "55%", xPercent: 0, borderRadius: "4px" };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Bonsai frame shrinks from full-screen to a fixed rectangle
      tl.fromTo(
        frame,
        {
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
          xPercent: 0,
          borderRadius: "0px",
        },
        {
          ...frameTarget,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Hero title fades out and lifts
      tl.fromTo(
        title,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -60, scale: 0.96, ease: "power2.inOut" },
        0
      );

      // 3. Top/bottom labels fade
      tl.fromTo(
        labels,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: "power2.inOut" },
        0
      );

      // 4. Rainbow arc softens
      tl.fromTo(
        arc,
        { opacity: 1 },
        { opacity: 0.25, ease: "power2.inOut" },
        0
      );

      // 5. Secondary cards stagger in
      const cardEls = cards.querySelectorAll("[data-card]");
      tl.fromTo(
        cardEls,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.25
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div ref={arcRef} className="absolute inset-0 z-0 pointer-events-none">
        <RainbowArc />
      </div>

      {/* Large hero title */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <h1 className="font-display text-[14vw] md:text-[11vw] font-bold tracking-tighter text-foreground/90 leading-none select-none">
          SEKAI
          <br />
          DEV
        </h1>
      </div>

      {/* Top / bottom labels */}
      <div
        ref={labelsRef}
        className="absolute inset-0 z-30 pointer-events-none"
      >
        <div className="absolute top-24 md:top-28 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs tracking-widest text-muted/90 uppercase drop-shadow-sm">
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
        <div className="absolute bottom-4 md:bottom-8 left-6 right-6 grid grid-cols-2 gap-4 items-end">
          <p className="text-xs md:text-sm tracking-widest uppercase text-foreground/80 max-w-md drop-shadow-sm">
            Building scalable products / helping brands stand out
          </p>
          <div className="flex flex-col items-end gap-1 text-[10px] md:text-xs tracking-widest text-muted/90 drop-shadow-sm">
            <span>99%</span>
            <span className="flex items-center gap-2">
              Scroll down to explore
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 1v14M8 14l-4-4M8 14l4-4" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Secondary content cards */}
      <div
        ref={cardsRef}
        className="absolute inset-0 z-40 pointer-events-none"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            data-card
            className={`absolute hidden md:block max-w-[10rem] md:max-w-xs ${
              msg.side === "right"
                ? "right-[6%] md:right-[10%]"
                : "left-[6%] md:left-[10%]"
            }`}
            style={{ top: `${18 + i * 16}%` }}
          >
            <div className="p-4 md:p-5 border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-sm rounded-2xl">
              <p className="text-sm md:text-lg font-display font-bold tracking-tighter leading-tight text-foreground">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bonsai frame */}
      <div
        ref={bonsaiFrameRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 border-0"
      >
        <Scene3D onLoaded={onBonsaiLoaded} />
      </div>
    </section>
  );
}
