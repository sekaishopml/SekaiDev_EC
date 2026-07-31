"use client";

import Scene3D from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";

const messages = [
  { text: "E-COMMERCE", side: "left" as const },
  { text: "CRM DASHBOARD", side: "right" as const },
  { text: "LANDING PAGES", side: "left" as const },
  { text: "APP SOFTWARE", side: "right" as const },
];

export default function BonsaiShowcase() {
  return (
    <section
      id="showcase"
      className="relative h-full w-full flex items-center justify-center px-6 md:px-12 bg-background"
    >
      <div className="relative w-full h-[80vh] max-w-6xl border border-foreground/10 overflow-hidden bg-background/50">
        <RainbowArc />

        <div className="absolute inset-0 z-10">
          <Scene3D scale={9} />
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`absolute z-20 ${
              msg.side === "right" ? "right-4 md:right-12" : "left-4 md:left-12"
            } max-w-[10rem] md:max-w-xs pointer-events-none`}
            style={{ top: `${16 + i * 18}%` }}
          >
            <div className="relative p-4 md:p-6 border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-sm rounded-2xl">
              <p className="text-sm md:text-xl font-display font-bold tracking-tighter leading-tight text-foreground">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 text-[10px] md:text-xs tracking-widest text-muted uppercase pointer-events-none">
        <span>02 — Showcase</span>
      </div>
    </section>
  );
}
