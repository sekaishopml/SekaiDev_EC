"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

function Bonsai() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/sakura_bonsai.glb", "/draco/");

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={5} />
      </Center>
    </group>
  );
}

function ModelLoader() {
  return (
    <Suspense fallback={null}>
      <Bonsai />
    </Suspense>
  );
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[10px] tracking-widest text-muted uppercase">
        loading bonsai…
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 35, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.6} />
        <Environment preset="studio" />
        <ModelLoader />
      </Canvas>
    </div>
  );
}
