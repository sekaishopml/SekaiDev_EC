"use client";

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden border-y border-foreground/10 py-4 md:py-6 bg-foreground/5">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="text-sm md:text-base tracking-widest uppercase text-muted px-6"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
