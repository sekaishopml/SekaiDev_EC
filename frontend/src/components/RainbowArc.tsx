export default function RainbowArc() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[60vh] z-[-1] pointer-events-none overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 90%)",
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="20%" stopColor="#e879f9" />
            <stop offset="40%" stopColor="#f87171" />
            <stop offset="60%" stopColor="#4ade80" />
            <stop offset="80%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="arcBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="90" />
          </filter>
        </defs>
        <path
          d="M -200 480 Q 720 -160 1640 480"
          fill="none"
          stroke="url(#rainbow)"
          strokeWidth="260"
          strokeLinecap="round"
          filter="url(#arcBlur)"
          opacity="1"
        />
      </svg>
      <div className="frame-grain absolute inset-0 opacity-40 mix-blend-overlay" aria-hidden="true" />
    </div>
  );
}
