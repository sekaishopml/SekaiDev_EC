"use client";

import { useRef, useEffect, useMemo, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { useViewport } from "@/hooks/useViewport";
import CameraController from "./CameraController";

export interface TrackMetrics {
  width: number;
  height: number;
  ratioW: number;
  ratioH: number;
}

interface BonsaiProps {
  onLoaded?: () => void;
  baseScale?: number;
  position?: [number, number, number];
  trackRef?: RefObject<TrackMetrics | null>;
}

export function Bonsai({
  onLoaded,
  baseScale = BONSAI_CONFIG.bonsai.scale,
  position = BONSAI_CONFIG.bonsai.position,
  trackRef,
}: BonsaiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  const targetScaleVec = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Scale the model so it fills the View track (object-fit: cover).
    // HeroSection updates trackRef in the GSAP onUpdate, so the bonsai
    // stays sized correctly as the rectangle animates.
    const metrics = trackRef?.current ?? {
      width: viewportWidth,
      height: viewportHeight,
      ratioW: 1,
      ratioH: 1,
    };
    const ratioW = metrics.ratioW ?? metrics.width / viewportWidth;
    const ratioH = metrics.ratioH ?? metrics.height / viewportHeight;
    const coverFactor = Math.max(ratioW, ratioH) * 1.35;

    const targetScale = baseScale * coverFactor;

    targetScaleVec.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(targetScaleVec, 0.3);

    // Shift the model up as it shrinks into the top rectangle so it stays
    // anchored near the top of the frame instead of floating in the center.
    const baseZ = position[2];
    const maxRatio = Math.max(ratioW, ratioH);
    const targetZ = baseZ - (1 - maxRatio) * 0.55;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.3
    );

    groupRef.current.rotation.y +=
      delta * BONSAI_CONFIG.animation.rotationSpeed;
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <primitive
          object={clonedScene}
          rotation={BONSAI_CONFIG.bonsai.rotation}
          scale={1}
        />
      </Center>
    </group>
  );
}

interface BonsaiSceneProps {
  onLoaded?: () => void;
  trackRef?: RefObject<TrackMetrics | null>;
}

export function BonsaiScene({ onLoaded, trackRef }: BonsaiSceneProps) {
  const width = useViewport();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const { scale: baseScale, cameraConfig } = useMemo(() => {
    const scale = isMobile
      ? BONSAI_CONFIG.bonsai.scale * 0.65
      : isTablet
      ? BONSAI_CONFIG.bonsai.scale * 0.85
      : BONSAI_CONFIG.bonsai.scale;
    const cameraY = isMobile ? 6.5 : BONSAI_CONFIG.camera.position[1];
    return {
      scale,
      cameraConfig: {
        ...BONSAI_CONFIG.camera,
        position: [0, cameraY, 0.2] as [number, number, number],
      },
    };
  }, [isMobile, isTablet]);

  const { lights } = BONSAI_CONFIG;

  return (
    <>
      <CameraController cameraConfig={cameraConfig} />
      <ambientLight intensity={lights.ambient.intensity} />
      {lights.directional.map((light, index) => (
        <directionalLight
          key={index}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      {lights.point.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      <Bonsai onLoaded={onLoaded} baseScale={baseScale} trackRef={trackRef} />
    </>
  );
}

/**
 * A fixed, full-screen WebGL canvas. The actual bonsai is rendered via
 * @react-three/drei `<View>` portals, so only the visible rectangle is drawn
 * (gl.scissor), avoiding full-viewport fill-rate while the view resizes/moves.
 */
export function BonsaiCanvas() {
  return (
    <Canvas
      frameloop="always"
      camera={{
        fov: BONSAI_CONFIG.camera.fov,
        near: BONSAI_CONFIG.camera.near,
        far: BONSAI_CONFIG.camera.far,
      }}
      dpr={[1, 1]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <View.Port />
    </Canvas>
  );
}
