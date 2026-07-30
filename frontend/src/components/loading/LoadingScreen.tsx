export default function LoadingScreen() {
  return (
    <div
      id="sekaidev-loader"
      className="fixed inset-0 z-[100] overflow-hidden transition-opacity duration-1000 ease-out"
    >
      {/* Knockout SVG: white overlay with SEKAIDEV-shaped holes */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
      >
        <defs>
          <mask
            id="sekaidev-loader-mask"
            x="0"
            y="0"
            width="100"
            height="100"
            maskUnits="userSpaceOnUse"
            mask-type="luminance"
          >
            <rect width="100" height="100" fill="white" />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="12"
              fontFamily="var(--font-oswald)"
              fontWeight="700"
              letterSpacing="-0.05"
            >
              SEKAIDEV
            </text>
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          fill="white"
          mask="url(#sekaidev-loader-mask)"
        />

        {/* Solid SEKAIDEV text on top, fades out to reveal the knockout */}
        <text
          id="sekaidev-loader-text"
          x="50"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="12"
          fontFamily="var(--font-oswald)"
          fontWeight="700"
          letterSpacing="-0.05"
          className="transition-opacity duration-1000 ease-out"
        >
          SEKAIDEV
        </text>
      </svg>

      <span
        id="sekaidev-loader-subtitle"
        className="absolute top-[62%] left-0 right-0 z-10 text-center text-[10px] tracking-[0.3em] uppercase text-black/60 transition-opacity duration-1000 ease-out"
      >
        Loading experience
      </span>

      <div
        id="sekaidev-loader-spinner"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity duration-1000 ease-out"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] border-rose-200 border-t-rose-500 animate-spin" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-rose-400/80">
          blossom
        </span>
      </div>
    </div>
  );
}
