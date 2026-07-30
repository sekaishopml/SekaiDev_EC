"use client";

import { useEffect } from "react";

interface LoadingControllerProps {
  loaded: boolean;
}

/**
 * Animates the server-rendered #sekaidev-loader splash screen once `loaded`
 * becomes true:
 * 1. Fade the black "SEKAIDEV" text to reveal the bonsai through the SVG mask.
 * 2. Fade the entire loader out.
 * The markup lives in `app/layout.tsx` so it appears instantly on first paint.
 */
export default function LoadingController({ loaded }: LoadingControllerProps) {
  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    const text = document.getElementById("sekaidev-loader-text");
    if (!loader || !loaded) return;

    // Step 1: fade the solid text to expose the masked, letter-shaped holes.
    if (text) {
      text.classList.add("opacity-0");
    }

    // Step 2: fade the whole loader overlay after the text transition finishes.
    const t = setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => loader.remove(), 800);
    }, 700);

    return () => clearTimeout(t);
  }, [loaded]);

  return null;
}
