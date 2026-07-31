export default function RainbowArc() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
    >
      <img
        src="/rainbow-arc.svg"
        alt=""
        className="w-full h-full object-fill"
        aria-hidden="true"
      />
      <div
        className="frame-grain absolute inset-0 opacity-20"
        aria-hidden="true"
      />
    </div>
  );
}
