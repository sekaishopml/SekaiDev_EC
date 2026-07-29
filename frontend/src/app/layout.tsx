import type { Metadata } from "next";
import "./globals.css";

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
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
