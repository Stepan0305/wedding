"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function InterlockedRings() {
  const groupRef = useRef<THREE.Group | null>(null);
  const leftRingRef = useRef<THREE.Mesh | null>(null);
  const rightRingRef = useRef<THREE.Mesh | null>(null);

  const geometry = useMemo(() => new THREE.TorusGeometry(1.18, 0.12, 42, 160), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d8bb7b",
        metalness: 0.95,
        roughness: 0.18,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [],
  );

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.22;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.1;
    }

    if (leftRingRef.current) {
      leftRingRef.current.rotation.z = Math.sin(elapsed * 0.7) * 0.12;
    }

    if (rightRingRef.current) {
      rightRingRef.current.rotation.z = -Math.sin(elapsed * 0.7) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh
          ref={leftRingRef}
          geometry={geometry}
          material={material}
          rotation={[0.9, 0.35, 0.2]}
          position={[-0.82, 0.04, 0]}
        />
      </Float>
      <Float speed={1.6} rotationIntensity={0.22} floatIntensity={0.46}>
        <mesh
          ref={rightRingRef}
          geometry={geometry}
          material={material}
          rotation={[0.95, -0.4, -0.16]}
          position={[0.82, -0.04, 0]}
        />
      </Float>
      <Sparkles
        count={34}
        scale={[6, 4, 3]}
        size={2.4}
        speed={0.2}
        color="#fff1cf"
        opacity={0.9}
      />
    </group>
  );
}

export function LuxuryHeroCanvas() {
  return (
    <Canvas
      className="luxury-hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.8], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.15} color="#fff7ea" />
      <directionalLight position={[5, 4, 6]} intensity={3.4} color="#fff4da" />
      <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#c89f55" />
      <pointLight position={[0, 1, 2]} intensity={1.8} color="#ffffff" />
      <InterlockedRings />
    </Canvas>
  );
}
