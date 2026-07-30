"use client";

import { useEffect } from "react";

interface LoadingControllerProps {
  loaded: boolean;
}

/**
 * Animates the server-rendered #sekaidev-loader splash screen once `loaded`
 * becomes true:
 * 1. Fade the black "SEKAIDEV" text, subtitle and spinner to reveal the
 *    bonsai through the SVG mask (the flowers cover the letter-shaped holes).
 * 2. Pause to hold that knockout view.
 * 3. Fade the entire loader out and present the web.
 */
export default function LoadingController({ loaded }: LoadingControllerProps) {
  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    const text = document.getElementById("sekaidev-loader-text");
    const subtitle = document.getElementById("sekaidev-loader-subtitle");
    const spinner = document.getElementById("sekaidev-loader-spinner");

    if (!loader || !loaded) return;

    // Step 1: fade the solid elements to expose the masked, letter-shaped holes.
    [text, subtitle, spinner].forEach((el) => {
      if (el) el.classList.add("opacity-0");
    });

    // Step 2: hold the knockout view, then fade the whole loader overlay.
    const holdMs = 1500;
    const t = setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => loader.remove(), 800);
    }, holdMs);

    return () => clearTimeout(t);
  }, [loaded]);

  return null;
}
