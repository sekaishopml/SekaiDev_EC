export default function LoadingScreen() {
  return (
    <div
      id="sekaidev-loader"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white transition-opacity duration-700 ease-out"
    >
      <svg
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
        width="100%"
        height="100%"
      >
        <defs>
          <mask
            id="sekaidev-loader-mask"
            x="0"
            y="0"
            width="100%"
            height="100%"
            maskUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              SEKAIDEV
            </text>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="white"
          mask="url(#sekaidev-loader-mask)"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-4 pointer-events-none">
        <span
          id="sekaidev-loader-text"
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-black animate-pulse-scale transition-opacity duration-700 ease-out"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          SEKAIDEV
        </span>
        <span
          id="sekaidev-loader-subtitle"
          className="text-[10px] tracking-[0.3em] uppercase text-black/60 transition-opacity duration-700 ease-out"
        >
          Loading experience
        </span>
      </div>

      <div
        id="sekaidev-loader-spinner"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity duration-700 ease-out"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] border-rose-200 border-t-rose-500 animate-spin" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-rose-400/80">
          blossom
        </span>
      </div>
    </div>
  );
}
