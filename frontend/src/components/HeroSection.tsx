"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";

interface HeroSectionProps {
  onBonsaiLoaded?: () => void;
}

export default function HeroSection({ onBonsaiLoaded }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bonsaiFrameRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const leftFrameRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = heroRef.current;
    const bonsaiFrame = bonsaiFrameRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    const leftFrame = leftFrameRef.current;
    const labels = labelsRef.current;
    const arc = arcRef.current;
    if (
      !section ||
      !bonsaiFrame ||
      !canvasWrapper ||
      !leftFrame ||
      !labels ||
      !arc
    )
      return;

    const w = window.innerWidth;
    const isMobile = w < 768;

    const bonsaiClip = isMobile
      ? "inset(12% 5% 33% 5% round 4px)"
      : "inset(12.5% 5% 12.5% 53% round 4px)";

    const bonsaiTransform = isMobile
      ? { x: "0%", y: "-10.5%", scale: 0.9 }
      : { x: "24%", y: "0%", scale: 0.75 };

    const leftTarget = isMobile
      ? { top: "10%", left: "5%", width: "90vw", height: "36vh" }
      : { top: "12.5%", left: "5%", width: "42vw", height: "75vh" };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          snap: {
            snapTo: (value: number, self?: { direction?: number }) => {
              if (!self || self.direction === 0 || self.direction === undefined)
                return value;
              return self.direction < 0 ? 0 : 1;
            },
            duration: { min: 0.2, max: 0.4 },
            delay: 0,
            ease: "power2.inOut",
          },
        },
      });

      // Bonsai becomes a clipped rectangle on the right.
      // The canvas wrapper is transformed (scale/translate) and clipped by the
      // parent frame, so the WebGL canvas never resizes during the transition.
      tl.fromTo(
        bonsaiFrame,
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        { clipPath: bonsaiClip, ease: "power2.inOut" },
        0
      );

      tl.fromTo(
        canvasWrapper,
        { x: "0%", y: "0%", scale: 1, transformOrigin: "center center" },
        { ...bonsaiTransform, transformOrigin: "center center", ease: "power2.inOut" },
        0
      );

      // Left empty rectangle fades/slides in (desktop only)
      if (!isMobile) {
        tl.fromTo(
          leftFrame,
          { ...leftTarget, autoAlpha: 0, x: -60, scale: 0.96 },
          { ...leftTarget, autoAlpha: 1, x: 0, scale: 1, ease: "power2.out" },
          0.1
        );
      } else {
        gsap.set(leftFrame, { autoAlpha: 0 });
      }

      // Top/bottom labels fade
      tl.fromTo(
        labels,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: "power2.inOut" },
        0
      );

      // Rainbow arc softens
      tl.fromTo(
        arc,
        { opacity: 1 },
        { opacity: 0.25, ease: "power2.inOut" },
        0
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

      {/* Left empty rectangle placeholder */}
      <div
        ref={leftFrameRef}
        className="absolute z-0 border border-foreground/20 bg-background/40 backdrop-blur-sm opacity-0 invisible"
        style={{
          top: "12.5%",
          left: "5%",
          width: "42vw",
          height: "75vh",
          borderRadius: "4px",
        }}
      />

      {/* Bonsai frame: clips the transformed, full-resolution canvas */}
      <div
        ref={bonsaiFrameRef}
        className="absolute inset-0 z-10"
        style={{ contain: "layout paint" }}
      >
        <div
          ref={canvasWrapperRef}
          className="absolute inset-0 will-change-transform"
        >
          <Scene3D onLoaded={onBonsaiLoaded} />
        </div>
      </div>
    </section>
  );
}
