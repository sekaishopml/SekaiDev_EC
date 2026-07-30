"use client";

import { useEffect } from "react";

interface LoadingScreenProps {
  loaded: boolean;
}

export default function LoadingScreen({ loaded }: LoadingScreenProps) {
  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    if (!loader) return;

    if (loaded) {
      loader.classList.add("opacity-0", "pointer-events-none");
      const t = setTimeout(() => loader.remove(), 800);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  return null;
}
