"use client";

import { useEffect } from "react";

interface LoadingControllerProps {
  loaded: boolean;
  progress: number;
}

/**
 * Animates the server-rendered #sekaidev-loader splash screen:
 * 1. Updates the blossom spinner progress counter and black fill overlay.
 * 2. Fades the solid SEKAIDEV text to reveal the knockout mask.
 * 3. Holds the knockout view, then fades the whole loader out.
 */
export default function LoadingController({ loaded, progress }: LoadingControllerProps) {
  useEffect(() => {
    const counter = document.getElementById("blossom-spinner-counter");
    const fill = document.getElementById("blossom-spinner-fill");

    if (counter) counter.textContent = `${progress}%`;
    if (fill) fill.style.clipPath = `inset(0 ${100 - progress}% 0 0)`;
  }, [progress]);

  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    const texts = [
      document.getElementById("sekaidev-loader-text"),
      document.getElementById("sekaidev-loader-text-desktop"),
    ];

    if (!loader || !loaded) return;

    texts.forEach((el) => {
      if (el) el.classList.add("opacity-0");
    });

    const holdMs = 4000;
    const t = setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => loader.remove(), 1000);
    }, holdMs);

    return () => clearTimeout(t);
  }, [loaded]);

  return null;
}
