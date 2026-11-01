import React from "react";
import { useWorld } from "./shell.jsx";

/**
 * The Classic Portfolio exit — a deliberate, labelled doorway that is never
 * opened by walking into it. The door reads like furniture with a warm brass
 * handle; the vestibule beyond is deliberately small, like a bookshop
 * threshold. Interaction hands the visitor a clear choice, then back out.
 */
export default function ClassicExit() {
  const { materials } = useWorld();

  return (
    <group>
      {/* The door leaf: closed, brass furniture, a skirting sill. */}
      <group position={[3.22, 0, 6.24]}>
        <mesh castShadow position={[0, 1.48, 0]}>
          <boxGeometry args={[1.3, 2.96, 0.09]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, 1.48, 0.056]}>
            <boxGeometry args={[0.22, 2.5, 0.012]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
        ))}
        <mesh position={[0.42, 1.4, 0.075]}>
          <boxGeometry args={[0.16, 0.05, 0.05]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[0.42, 1.28, 0.075]}>
          <boxGeometry args={[0.03, 0.2, 0.03]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.3, 0.12, 0.14]} />
          <primitive object={materials.stoneDark} attach="material" />
        </mesh>
        {/* A warm threshold glow so the door reads as live, not dead. */}
        <mesh position={[0, 2.86, 0.08]}>
          <boxGeometry args={[1.2, 0.05, 0.03]} />
          <meshStandardMaterial
            color="#5c473c"
            emissive="#ffb870"
            emissiveIntensity={0.9}
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}

