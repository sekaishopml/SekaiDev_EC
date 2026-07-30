"use client";

export default function BlossomSpinner() {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      <style>{`
        @keyframes draw-circle {
          0% { stroke-dashoffset: 100; }
          50% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bloom {
          0%, 55% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .blossom-vine {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-circle 2.4s ease-in-out infinite;
        }
        .blossom-flower {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          opacity: 0;
          animation: bloom 2.4s ease-out infinite;
        }
      `}</style>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="vineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
        </defs>

        {/* Main vine draws from a line into a full blossom wreath */}
        <path
          d="M50,6 A44,44 0 1,1 49.99,6"
          pathLength="100"
          stroke="url(#vineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="blossom-vine"
        />

        {/* Twigs sprout at the cardinal points */}
        <path
          d="M50 6 L64 14"
          pathLength="100"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          className="blossom-vine"
          style={{ animationDelay: "0.25s" }}
        />
        <path
          d="M94 50 L86 64"
          pathLength="100"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          className="blossom-vine"
          style={{ animationDelay: "0.45s" }}
        />
        <path
          d="M50 94 L36 86"
          pathLength="100"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          className="blossom-vine"
          style={{ animationDelay: "0.65s" }}
        />
        <path
          d="M6 50 L14 36"
          pathLength="100"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          className="blossom-vine"
          style={{ animationDelay: "0.85s" }}
        />

        {/* Flowers bloom along the wreath */}
        <g className="blossom-flower" style={{ animationDelay: "0.5s" }}>
          <FivePetal cx={50} cy={6} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "0.75s" }}>
          <FivePetal cx={82} cy={20} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "1.0s" }}>
          <FivePetal cx={94} cy={50} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "1.25s" }}>
          <FivePetal cx={82} cy={80} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "1.5s" }}>
          <FivePetal cx={50} cy={94} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "1.75s" }}>
          <FivePetal cx={18} cy={80} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "2.0s" }}>
          <FivePetal cx={6} cy={50} />
        </g>
        <g className="blossom-flower" style={{ animationDelay: "2.25s" }}>
          <FivePetal cx={18} cy={20} />
        </g>
      </svg>

      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-rose-400/80 whitespace-nowrap">
        blossom
      </span>
    </div>
  );
}

function FivePetal({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 50},${cy - 50})`}>
      <ellipse cx="50" cy="41" rx="4.5" ry="8" fill="#f43f5e" />
      <ellipse
        cx="56.5"
        cy="46"
        rx="4.5"
        ry="8"
        fill="#f43f5e"
        transform="rotate(72 56.5 46)"
      />
      <ellipse
        cx="54"
        cy="54.5"
        rx="4.5"
        ry="8"
        fill="#f43f5e"
        transform="rotate(144 54 54.5)"
      />
      <ellipse
        cx="46"
        cy="54.5"
        rx="4.5"
        ry="8"
        fill="#f43f5e"
        transform="rotate(216 46 54.5)"
      />
      <ellipse
        cx="43.5"
        cy="46"
        rx="4.5"
        ry="8"
        fill="#f43f5e"
        transform="rotate(288 43.5 46)"
      />
      <circle cx="50" cy="50" r="2" fill="#fecdd3" />
    </g>
  );
}
