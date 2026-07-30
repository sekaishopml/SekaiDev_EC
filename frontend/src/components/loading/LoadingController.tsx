"use client";

import { useEffect } from "react";

interface LoadingControllerProps {
  loaded: boolean;
}

/**
 * Hides the server-rendered #sekaidev-loader splash screen once `loaded`
 * becomes true. The markup lives in `app/layout.tsx` so it appears instantly.
 */
export default function LoadingController({ loaded }: LoadingControllerProps) {
  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    if (!loader || !loaded) return;

    loader.classList.add("opacity-0", "pointer-events-none");
    const t = setTimeout(() => loader.remove(), 800);
    return () => clearTimeout(t);
  }, [loaded]);

  return null;
}
