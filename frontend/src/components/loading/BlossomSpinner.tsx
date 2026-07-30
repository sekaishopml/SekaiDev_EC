"use client";

export default function BlossomSpinner() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <div className="relative w-full h-full">
        {/* Base rose logo */}
        <img
          src="/spinner-logo.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Black fill overlay, revealed from left to right as progress grows */}
        <img
          id="blossom-spinner-fill"
          src="/spinner-logo-black.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        />
      </div>

      <span
        id="blossom-spinner-counter"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] text-black/80 whitespace-nowrap"
      >
        0%
      </span>
    </div>
  );
}
