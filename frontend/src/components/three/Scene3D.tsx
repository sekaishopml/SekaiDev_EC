"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import CameraController from "./CameraController";

interface BonsaiProps {
  onLoaded?: () => void;
}

function Bonsai({ onLoaded }: BonsaiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * BONSAI_CONFIG.animation.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={BONSAI_CONFIG.bonsai.position}>
      <Center>
        <primitive
          object={scene}
          rotation={BONSAI_CONFIG.bonsai.rotation}
          scale={BONSAI_CONFIG.bonsai.scale}
        />
      </Center>
    </group>
  );
}

interface Scene3DProps {
  onLoaded?: () => void;
}

/**
 * 3D canvas for the sakura bonsai. Loads the compressed GLB with Draco
 * and notifies the parent when it is ready.
 */
export default function Scene3D({ onLoaded }: Scene3DProps) {
  const { camera, lights } = BONSAI_CONFIG;

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: camera.position,
          fov: camera.fov,
          near: camera.near,
          far: camera.far,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <CameraController />
        <ambientLight intensity={lights.ambient.intensity} />
        {lights.directional.map((light, index) => (
          <directionalLight key={index} position={light.position} intensity={light.intensity} />
        ))}
        {lights.point.map((light, index) => (
          <pointLight key={index} position={light.position} intensity={light.intensity} />
        ))}
        <Suspense fallback={null}>
          <Bonsai onLoaded={onLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
