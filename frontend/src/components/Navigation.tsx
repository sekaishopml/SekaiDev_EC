"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Typewriter from "./Typewriter";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
];

const socials = [
  { label: "INSTAGRAM", href: "#" },
  { label: "LINKED IN", href: "#" },
  { label: "BEHANCE", href: "#" },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    updateHeader();
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeader);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  const updateHeader = () => {
    const header = headerRef.current;
    const hero = document.getElementById("home");
    const about = document.getElementById("about");
    if (!header || !hero || !about) return;

    const headerHeight = header.getBoundingClientRect().height;
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const aboutTop = about.offsetTop;

    const inHero = scrollY < heroBottom - headerHeight * 2;
    const atAbout = aboutTop - scrollY <= headerHeight;

    // Follow the hero scroll exactly (no transition) to feel static.
    // Hide / reappear with transform and opacity for smoothness.
    if (inHero) {
      header.style.transition = "none";
      header.style.transform = `translateY(-${scrollY}px)`;
      header.style.opacity = "1";
      header.style.pointerEvents = "auto";
    } else if (atAbout) {
      header.style.transition = "opacity 500ms ease-out, transform 500ms ease-out";
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
      header.style.pointerEvents = "auto";
    } else {
      header.style.transition = "opacity 500ms ease-out, transform 500ms ease-out";
      header.style.transform = "translateY(-100%)";
      header.style.opacity = "0";
      header.style.pointerEvents = "none";
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 px-6 md:px-12 bg-background"
      >
        <div className="flex items-center justify-between h-full md:grid md:grid-cols-3 gap-4">
          <Link
            href="#home"
            className="font-display text-2xl md:text-3xl font-bold leading-none tracking-tighter text-foreground whitespace-nowrap"
            onClick={closeMenu}
          >
            SEKAI<br />DEV <span className="hidden md:inline text-xl lg:text-2xl"><Typewriter /></span>
          </Link>

          <nav className="hidden md:flex justify-center gap-8 lg:gap-12 text-[10px] lg:text-xs tracking-widest font-medium">
            {links.map((l, i) => (
              <Link key={l.label} href={l.href} className="group flex items-center gap-2 hover:text-accent transition-colors">
                <span className="text-muted">0{i + 1}</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex flex-col items-end text-right justify-center">
            <div className="flex gap-6 lg:gap-8 text-[10px] lg:text-xs tracking-widest font-medium mb-1">
              {socials.map((s, i) => (
                <a key={s.label} href={s.href} className="group flex items-center gap-2 hover:text-accent transition-colors">
                  <span className="text-muted">0{i + 1}</span>
                  <span className="relative">
                    {s.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              ))}
            </div>
            <a href="#contact" className="text-[10px] lg:text-xs tracking-widest leading-relaxed">
              <span className="text-muted block">AVAILABLE FOR PROJECTS</span>
              <span className="block">HELLO@SEKAIDEV.COM</span>
              <span className="block font-medium hover:text-accent transition-colors">SEND PROJECT INQUIRY</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-foreground transition-transform duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-transform duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-8 mt-8 text-4xl font-display font-bold tracking-tighter">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={closeMenu} className="hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-4 text-xs tracking-widest text-muted">
            {socials.map((s) => (
              <a key={s.label} href={s.href} onClick={closeMenu} className="hover:text-accent transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          <a href="#contact" onClick={closeMenu} className="mt-12 block text-xs tracking-widest">
            <span className="text-muted block">AVAILABLE FOR PROJECTS</span>
            <span className="block text-foreground">HELLO@SEKAIDEV.COM</span>
            <span className="block text-foreground font-medium hover:text-accent transition-colors">SEND PROJECT INQUIRY</span>
          </a>
        </div>
      )}
    </>
  );
}
