export default function RainbowArc() {
  return (
    <div className="absolute top-0 left-0 w-full h-[45vh] z-[-1] pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 600"
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="70" />
          </filter>
          <filter id="arcGrain" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="70" result="blur" />
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feBlend in="blur" in2="grayNoise" mode="overlay" />
          </filter>
        </defs>
        <path
          d="M -200 600 Q 720 -200 1640 600 Z"
          fill="url(#rainbow)"
          filter="url(#arcGrain)"
          opacity="0.7"
        />
      </svg>
      <div className="frame-grain absolute inset-0 opacity-30 mix-blend-overlay" aria-hidden="true" />
    </div>
  );
}
