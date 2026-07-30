// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.

export const BONSAI_CONFIG = {
  // Camera settings
  // Position and target point control framing
  camera: {
    position: [0, 3, 3] as [number, number, number],
    // Look at the flower canopy so the model sits higher in the frame
    target: [0, 1.2, 0] as [number, number, number],
    fov: 22,
    near: 0.1,
    far: 100,
  },

  // Main model transform
  bonsai: {
    // Starting position (x, y, z)
    // Lifted and centered higher in the frame
    position: [0, 1.2, 0] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    // Scale (uniform) — made larger to fill the frame
    scale: 6.5,
  },

  // Auto-rotation
  // Cylindrical / turntable rotation around the vertical Y axis
  animation: {
    rotationSpeed: 0.15,
  },

  // Lights
  lights: {
    ambient: { intensity: 0.8 },
    directional: [
      { position: [5, 8, 5] as [number, number, number], intensity: 1.5 },
      { position: [-5, 4, -5] as [number, number, number], intensity: 0.6 },
    ],
    point: [
      { position: [0, 4, 0] as [number, number, number], intensity: 0.8 },
    ],
  },
} as const;
