// Centralized configuration for static assets and loader timing.
export const ASSETS = {
  model: "/models/sakura_bonsai.glb",
  dracoPath: "/draco/",
} as const;

export const LOADER = {
  // Minimum time the splash screen stays visible (ms)
  minDuration: 1800,
  // Safety timeout so the loader never blocks the UI forever (ms)
  maxDuration: 10000,
} as const;
