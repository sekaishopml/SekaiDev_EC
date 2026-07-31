"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { useViewport } from "@/hooks/useViewport";
import CameraController from "./CameraController";

interface BonsaiProps {
  onLoaded?: () => void;
  scale?: number;
  position?: [number, number, number];
}

function Bonsai({ onLoaded, scale = BONSAI_CONFIG.bonsai.scale, position = BONSAI_CONFIG.bonsai.position }: BonsaiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * BONSAI_CONFIG.animation.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <primitive
          object={clonedScene}
          rotation={BONSAI_CONFIG.bonsai.rotation}
          scale={scale}
        />
      </Center>
    </group>
  );
}

interface Scene3DProps {
  onLoaded?: () => void;
  scale?: number;
}

/**
 * 3D canvas for the sakura bonsai. Loads the compressed GLB with Draco
 * and notifies the parent when it is ready. Scales the model and camera
 * responsively for mobile, tablet and desktop viewports.
 */
export default function Scene3D({ onLoaded, scale: scaleProp }: Scene3DProps) {
  const width = useViewport();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const baseScale = scaleProp ?? BONSAI_CONFIG.bonsai.scale;

  const { scale, cameraConfig } = useMemo(() => {
    const scale = isMobile ? baseScale * 0.6 : isTablet ? baseScale * 0.8 : baseScale;
    const cameraY = isMobile ? 6.5 : BONSAI_CONFIG.camera.position[1];
    return {
      scale,
      cameraConfig: {
        ...BONSAI_CONFIG.camera,
        position: [0, cameraY, 0.2] as [number, number, number],
      },
    };
  }, [isMobile, isTablet, baseScale]);

  const { lights } = BONSAI_CONFIG;

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: cameraConfig.position,
          fov: cameraConfig.fov,
          near: cameraConfig.near,
          far: cameraConfig.far,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <CameraController cameraConfig={cameraConfig} />
        <ambientLight intensity={lights.ambient.intensity} />
        {lights.directional.map((light, index) => (
          <directionalLight key={index} position={light.position} intensity={light.intensity} />
        ))}
        {lights.point.map((light, index) => (
          <pointLight key={index} position={light.position} intensity={light.intensity} />
        ))}
        <Suspense fallback={null}>
          <Bonsai onLoaded={onLoaded} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
