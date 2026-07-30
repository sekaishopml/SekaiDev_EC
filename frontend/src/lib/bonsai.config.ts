// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.

export const BONSAI_CONFIG = {
  // Camera settings
  camera: {
    // Top-down view with a tighter lens so scale 18 fills the screen
    position: [0, 5.5, 0.2] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    // World -Z points up on screen; +Z moves the model down
    up: [0, 0, -1] as [number, number, number],
    fov: 24,
    near: 0.1,
    far: 100,
  },

  // Main model transform
  bonsai: {
    // Raised slightly toward the top of the viewport while keeping scale 18
    position: [0, -0.6, -0.3] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    // Scale requested by client
    scale: 14,
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
