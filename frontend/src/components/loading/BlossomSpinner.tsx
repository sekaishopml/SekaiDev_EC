"use client";

export default function BlossomSpinner() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <style>{`
        @keyframes draw-vine {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bloom {
          0%, 55% { transform: scale(0) rotate(-18deg); opacity: 0; }
          85% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .blossom-vine {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-vine 2.6s ease-in-out forwards;
        }
        .blossom-flower {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          opacity: 0;
          animation: bloom 1s ease-out forwards;
        }
      `}</style>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
        </defs>

        {/* Main organic wreath branch — draws from a line into a full circle */}
        <path
          d="M50,6 A45,45 0 1,1 49.99,6"
          pathLength="100"
          stroke="url(#branchGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="blossom-vine"
        />

        {/* Left-side thorny twigs */}
        {THORNS.map((t, i) => (
          <path
            key={i}
            d={t.d}
            pathLength="100"
            stroke="#f43f5e"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="blossom-vine"
            style={{ animationDelay: `${t.delay}s` }}
          />
        ))}

        {/* Small twigs around the smooth part */}
        {TWIGS.map((t, i) => (
          <path
            key={i}
            d={t.d}
            pathLength="100"
            stroke="#f43f5e"
            strokeWidth="1.1"
            strokeLinecap="round"
            className="blossom-vine"
            style={{ animationDelay: `${t.delay}s` }}
          />
        ))}

        {/* Flowers and buds bloom in sequence */}
        {BLOSSOMS.map((b, i) => (
          <g
            key={i}
            className="blossom-flower"
            style={{ animationDelay: `${b.delay}s` }}
          >
            <g transform={`translate(${b.x},${b.y}) scale(${b.scale})`}>
              {b.variant === "m" && <FlowerMedium />}
              {b.variant === "s" && <FlowerSmall />}
              {b.variant === "bud" && <Bud />}
            </g>
          </g>
        ))}
      </svg>

      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] tracking-[0.25em] uppercase text-rose-400/80 whitespace-nowrap">
        blossom
      </span>
    </div>
  );
}

const THORNS = [
  { d: "M20 36 L8 30", delay: 0.2 },
  { d: "M17 50 L4 50", delay: 0.3 },
  { d: "M20 64 L8 70", delay: 0.4 },
  { d: "M28 26 L16 18", delay: 0.5 },
  { d: "M28 74 L16 82", delay: 0.6 },
];

const TWIGS = [
  { d: "M50 6 L57 2", delay: 0.55 },
  { d: "M83 24 L91 20", delay: 0.7 },
  { d: "M91 50 L98 54", delay: 0.85 },
  { d: "M83 76 L91 82", delay: 1.0 },
  { d: "M50 93 L44 98", delay: 1.15 },
];

const BLOSSOMS = [
  { x: 50, y: 6, scale: 1, variant: "m" as const, delay: 0.45 },
  { x: 69, y: 13, scale: 0.9, variant: "bud" as const, delay: 0.55 },
  { x: 85, y: 26, scale: 1, variant: "s" as const, delay: 0.65 },
  { x: 92, y: 42, scale: 0.9, variant: "bud" as const, delay: 0.75 },
  { x: 92, y: 50, scale: 1, variant: "m" as const, delay: 0.85 },
  { x: 91, y: 59, scale: 0.9, variant: "bud" as const, delay: 0.95 },
  { x: 84, y: 74, scale: 1, variant: "s" as const, delay: 1.05 },
  { x: 69, y: 87, scale: 0.9, variant: "bud" as const, delay: 1.15 },
  { x: 50, y: 93, scale: 1, variant: "m" as const, delay: 1.25 },
  { x: 33, y: 87, scale: 1, variant: "s" as const, delay: 1.35 },
  { x: 20, y: 76, scale: 0.9, variant: "bud" as const, delay: 1.45 },
  { x: 13, y: 59, scale: 0.9, variant: "bud" as const, delay: 1.55 },
  { x: 13, y: 41, scale: 0.9, variant: "bud" as const, delay: 1.65 },
  { x: 20, y: 25, scale: 0.9, variant: "bud" as const, delay: 1.75 },
];

function FlowerMedium() {
  return (
    <>
      <ellipse cx="0" cy="-4" rx="2" ry="4" fill="#f43f5e" />
      <ellipse cx="3.8" cy="-1.2" rx="2" ry="4" fill="#f43f5e" transform="rotate(72)" />
      <ellipse cx="2.3" cy="3.2" rx="2" ry="4" fill="#f43f5e" transform="rotate(144)" />
      <ellipse cx="-2.3" cy="3.2" rx="2" ry="4" fill="#f43f5e" transform="rotate(216)" />
      <ellipse cx="-3.8" cy="-1.2" rx="2" ry="4" fill="#f43f5e" transform="rotate(288)" />
      <circle r="1.3" fill="#fecdd3" />
    </>
  );
}

function FlowerSmall() {
  return (
    <>
      <ellipse cx="0" cy="-3" rx="1.5" ry="2.8" fill="#f43f5e" />
      <ellipse cx="2.8" cy="-0.9" rx="1.5" ry="2.8" fill="#f43f5e" transform="rotate(72)" />
      <ellipse cx="1.7" cy="2.3" rx="1.5" ry="2.8" fill="#f43f5e" transform="rotate(144)" />
      <ellipse cx="-1.7" cy="2.3" rx="1.5" ry="2.8" fill="#f43f5e" transform="rotate(216)" />
      <ellipse cx="-2.8" cy="-0.9" rx="1.5" ry="2.8" fill="#f43f5e" transform="rotate(288)" />
      <circle r="1" fill="#fecdd3" />
    </>
  );
}

function Bud() {
  return (
    <>
      <circle r="1.4" fill="#fda4af" />
      <ellipse cx="-1.1" cy="-0.4" rx="0.5" ry="1.2" fill="#f43f5e" transform="rotate(-35)" />
      <ellipse cx="1.1" cy="-0.4" rx="0.5" ry="1.2" fill="#f43f5e" transform="rotate(35)" />
    </>
  );
}
