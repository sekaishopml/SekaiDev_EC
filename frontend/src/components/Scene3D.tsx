"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Shape() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <mesh ref={mesh} scale={1.4}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color="#5c1a33"
        roughness={0.25}
        metalness={0.6}
        emissive="#2a0a18"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#a64d79" />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-[50vh] md:min-h-[70vh]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
        <Lights />
        <Shape />
      </Canvas>
    </div>
  );
}
