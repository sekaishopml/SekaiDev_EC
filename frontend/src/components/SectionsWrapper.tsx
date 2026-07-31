"use client";

import { useRef, useEffect, useCallback, Children } from "react";
import gsap from "gsap";
import { useSections } from "./SectionContext";

interface SectionsWrapperProps {
  children: React.ReactNode;
}

export default function SectionsWrapper({ children }: SectionsWrapperProps) {
  const { setCurrent, registerGoTo } = useSections();
  const innerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const wheelLock = useRef(false);
  const touchStart = useRef<{ y: number; t: number } | null>(null);
  const windowHeightRef = useRef(0);
  const prefersReducedMotion = useRef(false);

  const total = Children.count(children);

  const goTo = useCallback((index: number) => {
    if (
      index < 0 ||
      index >= total ||
      isAnimating.current ||
      index === currentIndex.current
    )
      return;

    isAnimating.current = true;
    currentIndex.current = index;
    setCurrent(index);

    gsap.to(innerRef.current, {
      y: -(index * windowHeightRef.current),
      duration: prefersReducedMotion.current ? 0 : 1,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [total, setCurrent]);

  useEffect(() => {
    windowHeightRef.current = window.innerHeight;
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateSize = () => {
      windowHeightRef.current = window.innerHeight;
      gsap.set(innerRef.current, {
        y: -(currentIndex.current * windowHeightRef.current),
      });
    };
    window.addEventListener("resize", updateSize);

    registerGoTo(goTo, total);

    const onWheel = (e: WheelEvent) => {
      if (wheelLock.current || isAnimating.current) return;
      wheelLock.current = true;
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 80);

      if (Math.abs(e.deltaY) < 20) return;

      e.preventDefault();
      if (e.deltaY > 0) goTo(currentIndex.current + 1);
      else if (e.deltaY < 0) goTo(currentIndex.current - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { y: e.touches[0].clientY, t: Date.now() };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || isAnimating.current || wheelLock.current) return;
      const endY = e.changedTouches[0].clientY;
      const deltaY = touchStart.current.y - endY;
      const deltaT = Date.now() - touchStart.current.t;
      if (Math.abs(deltaY) > 40 && deltaT < 600) {
        wheelLock.current = true;
        window.setTimeout(() => {
          wheelLock.current = false;
        }, 500);
        if (deltaY > 0) goTo(currentIndex.current + 1);
        else goTo(currentIndex.current - 1);
      }
      touchStart.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(currentIndex.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentIndex.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [goTo, registerGoTo, total]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden touch-none">
      <div ref={innerRef} className="absolute inset-0 w-full" style={{ willChange: "transform" }}>
        {Children.map(children, (child, i) => (
          <div
            key={i}
            className="absolute left-0 w-full h-screen overflow-hidden"
            style={{ top: `${i * 100}vh` }}
          >
            {child}
          </div>
        ))}
      </div>
      <DotNav total={total} goTo={goTo} />
    </div>
  );
}

function DotNav({ total, goTo }: { total: number; goTo: (i: number) => void }) {
  const { current } = useSections();
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to section ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === current
              ? "bg-foreground scale-150"
              : "bg-foreground/30 hover:bg-foreground/60"
          }`}
        />
      ))}
    </div>
  );
}
