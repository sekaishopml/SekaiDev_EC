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
          animation: draw-vine 2.6s ease-in-out forwards;
        }
        .blossom-flower {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          opacity: 0;
          animation: bloom 0.9s ease-out forwards;
        }
      `}</style>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>

          <Petal id="petal" />
        </defs>

        {/* Main organic wreath branch */}
        <path
          d="M50,5 C29,5 11,26 11,50 C11,72 29,94 50,94 C71,94 91,73 91,50 C91,27 72,5 50,5"
          pathLength="100"
          stroke="url(#branchGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blossom-vine"
        />

        {/* A couple of short curved twigs on the left side */}
        {TWIGS.map((t, i) => (
          <path
            key={i}
            d={t.d}
            pathLength="100"
            stroke="#f43f5e"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
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
              {b.variant === "sakura" && <Sakura />}
              {b.variant === "tiny" && <TinyFlower />}
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

const TWIGS = [
  { d: "M17 40 Q6 34 5 42", delay: 0.35 },
  { d: "M17 60 Q6 66 5 58", delay: 0.45 },
];

const BLOSSOMS = [
  { x: 50, y: 5, scale: 0.92, variant: "sakura" as const, delay: 0.45 },
  { x: 75, y: 13, scale: 0.45, variant: "bud" as const, delay: 0.55 },
  { x: 89, y: 32, scale: 0.72, variant: "sakura" as const, delay: 0.65 },
  { x: 93, y: 45, scale: 0.46, variant: "tiny" as const, delay: 0.75 },
  { x: 91, y: 57, scale: 0.82, variant: "sakura" as const, delay: 0.85 },
  { x: 84, y: 72, scale: 0.55, variant: "sakura" as const, delay: 0.95 },
  { x: 71, y: 87, scale: 0.42, variant: "bud" as const, delay: 1.05 },
  { x: 50, y: 94, scale: 0.78, variant: "sakura" as const, delay: 1.15 },
  { x: 31, y: 87, scale: 0.52, variant: "sakura" as const, delay: 1.25 },
  { x: 17, y: 72, scale: 0.38, variant: "bud" as const, delay: 1.35 },
  { x: 9, y: 55, scale: 0.36, variant: "bud" as const, delay: 1.45 },
  { x: 10, y: 38, scale: 0.36, variant: "bud" as const, delay: 1.55 },
  { x: 22, y: 22, scale: 0.42, variant: "bud" as const, delay: 1.65 },
];

function Petal({ id }: { id: string }) {
  return (
    <path
      id={id}
      d="M0,0.8 C-2.1,0 -3.4,-3 -2.5,-6 C-1.6,-8 0,-8.6 0,-8.6 C0,-8.6 1.6,-8 2.5,-6 C3.4,-3 2.1,0 0,0.8"
      fill="#ffe4e6"
      stroke="#f43f5e"
      strokeWidth="0.3"
    />
  );
}

function Sakura() {
  return (
    <>
      <use href="#petal" />
      <use href="#petal" transform="rotate(72)" />
      <use href="#petal" transform="rotate(144)" />
      <use href="#petal" transform="rotate(216)" />
      <use href="#petal" transform="rotate(288)" />
      <circle r="1.1" fill="#f43f5e" />
    </>
  );
}

function TinyFlower() {
  return (
    <>
      <use href="#petal" transform="scale(0.65)" />
      <use href="#petal" transform="rotate(72) scale(0.65)" />
      <use href="#petal" transform="rotate(144) scale(0.65)" />
      <use href="#petal" transform="rotate(216) scale(0.65)" />
      <use href="#petal" transform="rotate(288) scale(0.65)" />
      <circle r="0.7" fill="#f43f5e" />
    </>
  );
}

function Bud() {
  return (
    <>
      <circle r="1.6" fill="#fda4af" stroke="#f43f5e" strokeWidth="0.3" />
      <ellipse cx="-1.1" cy="-0.4" rx="0.6" ry="1.4" fill="#f43f5e" transform="rotate(-35)" />
      <ellipse cx="1.1" cy="-0.4" rx="0.6" ry="1.4" fill="#f43f5e" transform="rotate(35)" />
    </>
  );
}
