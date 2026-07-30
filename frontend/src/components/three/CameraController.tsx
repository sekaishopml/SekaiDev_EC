"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";

export default function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    const { position, target } = BONSAI_CONFIG.camera;
    camera.position.set(...position);
    if (target) {
      camera.lookAt(new THREE.Vector3(...target));
    }
  }, [camera]);

  return null;
}
