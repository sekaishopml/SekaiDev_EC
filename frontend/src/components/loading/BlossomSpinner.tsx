"use client";

export default function BlossomSpinner() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <style>{`
        @keyframes blossom-reveal {
          0% {
            clip-path: circle(0% at 50% 50%);
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            clip-path: circle(75% at 50% 50%);
            opacity: 1;
            transform: scale(1);
          }
        }
        .blossom-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: blossom-reveal 2.6s ease-in-out forwards;
        }
      `}</style>
      <img
        src="/spinner-logo.svg"
        alt="blossom"
        className="blossom-logo"
      />
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] tracking-[0.25em] uppercase text-rose-400/80 whitespace-nowrap">
        blossom
      </span>
    </div>
  );
}
