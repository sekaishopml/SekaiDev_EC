"use client";

import { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import {
  BonsaiCanvas,
  BonsaiScene,
  type TrackMetrics,
} from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";
import { Suspense } from "react";

interface HeroSectionProps {
  onBonsaiLoaded?: () => void;
}

export default function HeroSection({ onBonsaiLoaded }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const rightFrameRef = useRef<HTMLDivElement>(null);
  const bonsaiWrapRef = useRef<HTMLDivElement>(null);
  const leftFrameRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const [bonsaiVisible, setBonsaiVisible] = useState(true);
  const heroActiveRef = useRef(true);
  const lookActiveRef = useRef(false);
  const updateBonsaiVisibility = useCallback(
    () => setBonsaiVisible(heroActiveRef.current || lookActiveRef.current),
    []
  );
  const trackMetricsRef = useRef<TrackMetrics>({
    width: typeof window !== "undefined" ? window.innerWidth : 1,
    height: typeof window !== "undefined" ? window.innerHeight : 1,
    ratioW: 1,
    ratioH: 1,
  });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = heroRef.current;
    const viewEl = viewRef.current;
    const rightFrame = rightFrameRef.current;
    const leftFrame = leftFrameRef.current;
    const labels = labelsRef.current;
    const arc = arcRef.current;
    if (!section || !viewEl || !rightFrame || !leftFrame || !labels || !arc) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;

    const updateMetrics = () => {
      const rect = viewEl.getBoundingClientRect();
      trackMetricsRef.current = {
        width: rect.width,
        height: rect.height,
        ratioW: rect.width / w,
        ratioH: rect.height / h,
      };
    };

    const viewTarget = isMobile
      ? { x: "10vw", y: "14vh", scaleX: 0.8, scaleY: 0.45 }
      : { x: "58vw", y: "10vh", scaleX: 0.32, scaleY: 0.38 };

    const leftTarget = isMobile
      ? { top: "14vh", left: "5%", width: "80vw", height: "30vh" }
      : { top: "10vh", left: "5%", width: "46vw", height: "42vh" };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=70%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // View track transforms from full-screen to the right rectangle.
      // The bonsai is rendered inside the track via drei View, with scissor,
      // so the canvas never resizes and only the rectangle area is drawn.
      tl.fromTo(
        viewEl,
        {
          x: "0vw",
          y: "0vh",
          scaleX: 1,
          scaleY: 1,
          borderRadius: "0px",
          transformOrigin: "top left",
        },
        {
          ...viewTarget,
          borderRadius: "4px",
          transformOrigin: "top left",
          ease: "none",
        },
        0
      );

      // Black backing rectangle behind the bonsai follows the same track.
      tl.fromTo(
        rightFrame,
        {
          x: "0vw",
          y: "0vh",
          scaleX: 1,
          scaleY: 1,
          borderRadius: "0px",
          opacity: 0,
          transformOrigin: "top left",
        },
        {
          ...viewTarget,
          borderRadius: "4px",
          opacity: 1,
          transformOrigin: "top left",
          ease: "none",
        },
        0
      );

      // Keep the bonsai scale in sync with the track size every frame.
      tl.eventCallback("onUpdate", updateMetrics);

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
        { opacity: 0, y: -20, ease: "none" },
        0
      );

      // Rainbow arc softens
      tl.fromTo(
        arc,
        { opacity: 1 },
        { opacity: 0.25, ease: "none" },
        0
      );

      // Keep the fixed bonsai visible during the hero and the Look section,
      // hide it once the Look section leaves the viewport.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          console.log('[bonsai] hero toggle', self.isActive);
          heroActiveRef.current = self.isActive;
          updateBonsaiVisibility();
        },
      });
    }, section);

    // Ensure the initial metrics match the full-screen state.
    updateMetrics();

    return () => ctx.revert();
  }, [updateBonsaiVisibility]);

  // Create the Look-section visibility trigger after the Look section has
  // mounted in the DOM (it's a sibling rendered after HeroSection).
  useEffect(() => {
    const createLookTrigger = () => {
      const lookEl = document.querySelector<HTMLElement>("#look");
      console.log('[bonsai] lookEl', lookEl, 'ScrollTrigger?', typeof ScrollTrigger);
      if (!lookEl) {
        requestAnimationFrame(createLookTrigger);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: lookEl,
        start: "top 20%",
        end: "+=90vh",
        onToggle: (self) => {
          console.log('[bonsai] look toggle', self.isActive);
          lookActiveRef.current = self.isActive;
          updateBonsaiVisibility();
        },
      });

      console.log('[bonsai] look trigger created', st.start, st.end, st.isActive);
      ScrollTrigger.refresh();

      return () => st.kill();
    };

    const cleanup = createLookTrigger();
    return cleanup;
  }, [updateBonsaiVisibility]);

  return (
    <>
      <BonsaiCanvas />
      <div
        ref={bonsaiWrapRef}
        className="fixed inset-0 z-[4] pointer-events-none"
        style={{ opacity: bonsaiVisible ? 1 : 0 }}
      >
        {/* Black backing rectangle for the bonsai (seen through transparent canvas) */}
        <div
          ref={rightFrameRef}
          className="absolute inset-0 z-[3] bg-black opacity-0"
          style={{ pointerEvents: "none" }}
        />

        {/* View track: the visible rectangle the bonsai is rendered into */}
        <View
          ref={viewRef}
          className="absolute inset-0 z-[10] pointer-events-none"
          visible={bonsaiVisible}
        >
          <Suspense fallback={null}>
            <BonsaiScene
              onLoaded={onBonsaiLoaded}
              trackRef={trackMetricsRef}
            />
          </Suspense>
        </View>
      </div>

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
          className="absolute z-[2] border border-foreground/20 bg-background/60 opacity-0 invisible"
          style={{
            top: "10vh",
            left: "5%",
            width: "46vw",
            height: "42vh",
            borderRadius: "4px",
          }}
        />
      </section>
    </>
  );
}
