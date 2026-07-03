"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (group.current) group.current.rotation.y += delta * 0.08;
    if (shell.current) {
      shell.current.rotation.x += delta * 0.12;
      shell.current.rotation.z -= delta * 0.09;
    }
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.18;
  });

  return (
    <group ref={group} position={[1.7, -0.1, -1.5]}>
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshBasicMaterial color="#66f7ff" wireframe transparent opacity={0.17} />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0.8]}>
          <torusKnotGeometry args={[1.02, 0.025, 140, 12]} />
          <meshBasicMaterial color="#d5ff57" transparent opacity={0.75} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.65, 2]} />
          <meshStandardMaterial color="#79ffbb" emissive="#1fcf87" emissiveIntensity={1.5} wireframe />
        </mesh>
      </Float>
      <Sparkles count={reducedMotion ? 20 : 72} scale={[7, 5, 4]} size={1.3} speed={reducedMotion ? 0 : 0.25} color="#79ffbb" opacity={0.55} />
    </group>
  );
}

export function EnergyCore({ reducedMotion, dayMode }: { reducedMotion: boolean; dayMode: boolean }) {
  return (
    <div className="scene-layer" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={dayMode ? 1.4 : 0.45} />
        <pointLight position={[2, 2, 3]} intensity={dayMode ? 2 : 4} color="#79ffbb" />
        <pointLight position={[-3, -2, 1]} intensity={2.5} color="#ffb84d" />
        <Core reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
