// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.

export const BONSAI_CONFIG = {
  // Camera settings
  // Top-down view like the reference image
  camera: {
    position: [0, 4.5, 0.1] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 22,
    near: 0.1,
    far: 100,
  },

  // Main model transform
  bonsai: {
    // Keep the centered top-down position, shifted up in the frame
    position: [0, -0.6, -0.8] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    // Scale (uniform) — larger to fill the frame but same position
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
