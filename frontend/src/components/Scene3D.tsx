"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface BonsaiProps {
  onLoaded?: () => void;
}

function Bonsai({ onLoaded }: BonsaiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/sakura_bonsai.glb", "/draco/");

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={3} />
      </Center>
    </group>
  );
}

export default function Scene3D({ onLoaded }: { onLoaded?: () => void }) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 35, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, 4, -5]} intensity={0.6} />
        <pointLight position={[0, 4, 0]} intensity={0.8} />
        <Suspense fallback={null}>
          <Bonsai onLoaded={onLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
