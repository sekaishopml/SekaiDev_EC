"use client";

import Link from "next/link";

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

/**
 * Fixed header. Its explicit height (h-20 / md:h-24) is consumed by Hero
 * so the 3D scene can start exactly below it.
 */
export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 px-6 md:px-12 bg-background">
      <div className="grid grid-cols-3 items-center h-full gap-4">
        <Link href="#home" className="flex items-center gap-2 md:gap-3 font-display text-2xl md:text-3xl font-bold leading-none tracking-tighter text-foreground">
          <img
            src="/spinner-logo-black.svg"
            alt=""
            className="h-14 md:h-16 w-auto object-contain"
          />
          <span>
            SEKAI<br />DEV
          </span>
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
      </div>
    </header>
  );
}
