import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/loading/LoadingScreen";
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
        <LoadingScreen />
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
