"use client";

export default function BlossomSpinner() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <style>{`
        @keyframes draw-vine {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bloom {
          0%, 60% { transform: scale(0) rotate(-20deg); opacity: 0; }
          85% { transform: scale(1.15) rotate(5deg); opacity: 1; }
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
          animation: bloom 1.2s ease-out forwards;
        }
      `}</style>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
        </defs>

        {/* Main wreath branch */}
        <path
          d="M50,5 C28,8 12,28 12,52 C12,74 30,92 50,95 C70,92 88,74 88,52 C88,28 72,8 50,5"
          pathLength="100"
          stroke="url(#branchGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blossom-vine"
        />

        {/* Twigs */}
        {TWIGS.map((t, i) => (
          <path
            key={i}
            d={t.d}
            pathLength="100"
            stroke="#f43f5e"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="blossom-vine"
            style={{ animationDelay: `${t.delay}s` }}
          />
        ))}

        {/* Flowers bloom along the wreath */}
        {FLOWERS.map((f, i) => (
          <g
            key={i}
            className="blossom-flower"
            style={{ animationDelay: `${f.delay}s` }}
          >
            <Flower x={f.x} y={f.y} scale={f.scale} />
          </g>
        ))}
      </svg>

      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-rose-400/80 whitespace-nowrap">
        blossom
      </span>
    </div>
  );
}

const TWIGS = [
  { d: "M50 5 L62 12", delay: 0.15 },
  { d: "M28 18 L18 14", delay: 0.35 },
  { d: "M12 52 L5 46", delay: 0.55 },
  { d: "M28 82 L22 92", delay: 0.75 },
  { d: "M50 95 L40 90", delay: 0.95 },
  { d: "M72 82 L80 92", delay: 1.15 },
  { d: "M88 52 L95 58", delay: 1.35 },
  { d: "M72 18 L80 12", delay: 1.55 },
];

const FLOWERS = [
  { x: 50, y: 5, delay: 0.4, scale: 1 },
  { x: 28, y: 18, delay: 0.55, scale: 0.85 },
  { x: 12, y: 52, delay: 0.7, scale: 1 },
  { x: 28, y: 82, delay: 0.85, scale: 0.9 },
  { x: 50, y: 95, delay: 1.0, scale: 1 },
  { x: 72, y: 82, delay: 1.15, scale: 0.85 },
  { x: 88, y: 52, delay: 1.3, scale: 1 },
  { x: 72, y: 18, delay: 1.45, scale: 0.9 },
  { x: 38, y: 36, delay: 1.05, scale: 0.75 },
  { x: 62, y: 36, delay: 1.2, scale: 0.75 },
  { x: 38, y: 68, delay: 1.35, scale: 0.75 },
  { x: 62, y: 68, delay: 1.5, scale: 0.75 },
];

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const s = scale;
  return (
    <g transform={`translate(${x - 50 * s},${y - 50 * s}) scale(${s})`}>
      {/* leaves */}
      <ellipse cx="58" cy="55" rx="2.5" ry="5" fill="#10b981" opacity="0.8" transform="rotate(45 58 55)" />
      <ellipse cx="42" cy="55" rx="2.5" ry="5" fill="#10b981" opacity="0.8" transform="rotate(-45 42 55)" />

      {/* petals */}
      <Petal cx={50} cy={38} rotate={0} />
      <Petal cx={59} cy={45} rotate={72} />
      <Petal cx={56} cy={57} rotate={144} />
      <Petal cx={44} cy={57} rotate={216} />
      <Petal cx={41} cy={45} rotate={288} />

      {/* center */}
      <circle cx="50" cy="50" r="3" fill="#fecdd3" />
    </g>
  );
}

function Petal({ cx, cy, rotate }: { cx: number; cy: number; rotate: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx="5"
      ry="9"
      fill="#f43f5e"
      transform={`rotate(${rotate} ${cx} ${cy})`}
    />
  );
}
