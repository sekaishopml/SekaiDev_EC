// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.

export const BONSAI_CONFIG = {
  // Camera settings
  camera: {
    position: [0, 1.2, 3.8] as [number, number, number],
    fov: 35,
    near: 0.1,
    far: 100,
  },

  // Main model transform
  bonsai: {
    // Starting position (x, y, z)
    // Lower Y hides the pot below the frame while keeping flowers in view
    position: [0, -1.2, 0] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // X = tilt forward like a hanging branch
    // Y = rotate so flowers face the camera
    rotation: [-0.6, Math.PI, 0] as [number, number, number],

    // Scale (uniform)
    scale: 4,
  },

  // Auto-rotation
  animation: {
    // Rotation speed around Y axis in radians per second
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
