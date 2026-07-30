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
          0%, 55% { transform: scale(0) rotate(-12deg); opacity: 0; }
          85% { transform: scale(1.15) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .blossom-vine {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-vine 2.8s ease-in-out forwards;
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
          d="M50,5 C29,7 13,27 13,50 C13,70 28,91 50,93 C71,94 90,74 90,50 C90,26 73,5 50,5"
          pathLength="100"
          stroke="url(#branchGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blossom-vine"
        />

        {/* Cherry blossoms and buds bloom in sequence */}
        {BLOSSOMS.map((b, i) => (
          <g
            key={i}
            className="blossom-flower"
            style={{ animationDelay: `${b.delay}s` }}
          >
            <g transform={`translate(${b.x},${b.y}) scale(${b.scale})`}>
              {b.variant === "m" && <Sakura />}
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

const BLOSSOMS = [
  { x: 50, y: 5, scale: 0.9, variant: "m" as const, delay: 0.45 },
  { x: 72, y: 14, scale: 0.6, variant: "bud" as const, delay: 0.55 },
  { x: 86, y: 30, scale: 0.72, variant: "m" as const, delay: 0.65 },
  { x: 91, y: 45, scale: 0.5, variant: "bud" as const, delay: 0.75 },
  { x: 90, y: 55, scale: 0.82, variant: "m" as const, delay: 0.85 },
  { x: 84, y: 70, scale: 0.62, variant: "m" as const, delay: 0.95 },
  { x: 70, y: 86, scale: 0.5, variant: "bud" as const, delay: 1.05 },
  { x: 50, y: 92, scale: 0.82, variant: "m" as const, delay: 1.15 },
  { x: 32, y: 86, scale: 0.58, variant: "m" as const, delay: 1.25 },
  { x: 18, y: 72, scale: 0.48, variant: "bud" as const, delay: 1.35 },
  { x: 12, y: 55, scale: 0.42, variant: "bud" as const, delay: 1.45 },
  { x: 13, y: 38, scale: 0.42, variant: "bud" as const, delay: 1.55 },
  { x: 22, y: 22, scale: 0.48, variant: "bud" as const, delay: 1.65 },
];

function Sakura() {
  return (
    <>
      <ellipse cx="0" cy="-3.6" rx="1.6" ry="3.5" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="0.35" />
      <ellipse
        cx="3.5"
        cy="-1.1"
        rx="1.6"
        ry="3.5"
        fill="#ffe4e6"
        stroke="#f43f5e"
        strokeWidth="0.35"
        transform="rotate(72)"
      />
      <ellipse
        cx="2.2"
        cy="3"
        rx="1.6"
        ry="3.5"
        fill="#ffe4e6"
        stroke="#f43f5e"
        strokeWidth="0.35"
        transform="rotate(144)"
      />
      <ellipse
        cx="-2.2"
        cy="3"
        rx="1.6"
        ry="3.5"
        fill="#ffe4e6"
        stroke="#f43f5e"
        strokeWidth="0.35"
        transform="rotate(216)"
      />
      <ellipse
        cx="-3.5"
        cy="-1.1"
        rx="1.6"
        ry="3.5"
        fill="#ffe4e6"
        stroke="#f43f5e"
        strokeWidth="0.35"
        transform="rotate(288)"
      />
      <circle r="1" fill="#f43f5e" />
    </>
  );
}

function Bud() {
  return (
    <>
      <circle r="1.5" fill="#fda4af" stroke="#f43f5e" strokeWidth="0.3" />
      <ellipse cx="-1.1" cy="-0.4" rx="0.55" ry="1.3" fill="#f43f5e" transform="rotate(-35)" />
      <ellipse cx="1.1" cy="-0.4" rx="0.55" ry="1.3" fill="#f43f5e" transform="rotate(35)" />
    </>
  );
}
