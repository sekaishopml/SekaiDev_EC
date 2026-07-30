"use client";

import { useEffect } from "react";

interface LoadingControllerProps {
  loaded: boolean;
}

/**
 * Animates the server-rendered #sekaidev-loader splash screen once `loaded`
 * becomes true:
 * 1. Fade the black "SEKAIDEV" text to reveal the bonsai through the SVG mask
 *    (the flowers cover the letter-shaped holes). Subtitle and blossom spinner
 *    stay visible during the hold pause.
 * 2. Pause to hold that knockout view.
 * 3. Fade the entire loader out and present the web.
 */
export default function LoadingController({ loaded }: LoadingControllerProps) {
  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    const texts = [
      document.getElementById("sekaidev-loader-text"),
      document.getElementById("sekaidev-loader-text-desktop"),
    ];

    if (!loader || !loaded) return;
    // Step 1: fade only the solid SEKAIDEV text to expose the knockout.
    // The subtitle and blossom spinner stay visible during the hold pause.
    texts.forEach((el) => {
      if (el) el.classList.add("opacity-0");
    });

    // Step 2: hold the knockout view, then fade the whole loader overlay.
    const holdMs = 4000;
    const t = setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => loader.remove(), 1000);
    }, holdMs);

    return () => clearTimeout(t);
  }, [loaded]);

  return null;
}
