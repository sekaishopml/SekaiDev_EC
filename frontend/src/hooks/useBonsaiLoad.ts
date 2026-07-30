"use client";

import { useState, useEffect } from "react";
import { LOADER } from "@/lib/constants";

/**
 * Tracks whether the bonsai 3D model has loaded and enforces
 * a minimum / maximum splash-screen duration.
 */
export function useBonsaiLoad() {
  const [bonsaiLoaded, setBonsaiLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [maxTimeElapsed, setMaxTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), LOADER.minDuration);
    const maxTimer = setTimeout(() => setMaxTimeElapsed(true), LOADER.maxDuration);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  const loaded = (bonsaiLoaded && minTimeElapsed) || maxTimeElapsed;

  return { loaded, setBonsaiLoaded };
}
