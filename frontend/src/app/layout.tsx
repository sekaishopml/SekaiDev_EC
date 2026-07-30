import type { Metadata } from "next";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "SekaiDev | Software Development Studio",
  description: "Freelance software development company building digital products and helping brands stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div
          id="sekaidev-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ease-out"
        >
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-black animate-pulse-scale"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              SEKAIDEV
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-black/60">
              Loading experience
            </span>
          </div>
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-3">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] border-rose-200 border-t-rose-500 animate-spin" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-rose-400/80">
              blossom
            </span>
          </div>
        </div>
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
