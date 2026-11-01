import React from "react";
import { ATRIUM_COLUMNS, DOORS } from "./plan.js";
import { LabelPlane } from "../scene/labels.jsx";
import { SoftShadow } from "../scene/primitives.jsx";
import { useWorld } from "./shell.jsx";

/**
 * The Arrival Court keeps the identity of the original room (medallion,
 * columns, benches, lamp glow) but now acts as a wayfinding hub: a brass
 * spoke in the floor runs from the medallion to every doorway, and the two
 * solid wall spans each carry a wing plaque pointing to its room.
 */
export function AtriumWayfinding() {
  const { materials, shadowTexture } = useWorld();

  // Spokes: from the medallion ring to each doorway threshold.
  const spokes = [];
  const spokeTargets = [
    { x: 0, z: -5.35 },
    { x: 5.35, z: 0 },
    { x: -5.35, z: 0 },
    { x: 0, z: 5.35 },
    { x: 3.22, z: 5.35 },
  ];
  for (const target of spokeTargets) {
    const length = Math.hypot(target.x, target.z) - 2.72;
    if (length < 0.4) continue;
    const angle = Math.atan2(target.x, target.z);
    const distance = 2.72 + length / 2;
    spokes.push({
      key: `spoke-${target.x},${target.z}`,
      position: [(target.x / Math.hypot(target.x, target.z)) * distance, 0.014, (target.z / Math.hypot(target.x, target.z)) * distance],
      rotation: [0, angle, 0],
      length,
    });
  }

  return (
    <group>
      {/* Medallion, kept from the original court design. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} receiveShadow>
        <circleGeometry args={[2.34, 64]} />
        <primitive object={materials.stoneDark} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[2.36, 2.4, 96]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.013, 0]}>
        <ringGeometry args={[2.45, 2.47, 96]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
        <ringGeometry args={[1.34, 1.37, 96]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <mesh
            key={`pin-${index}`}
            position={[Math.sin(angle) * 0.75, 0.014, Math.cos(angle) * 0.75]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.018, 0.006, 0.62]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.1, 0.13, 48]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      {spokes.map((spoke) => (
        <mesh key={spoke.key} position={spoke.position} rotation={spoke.rotation} receiveShadow>
          <boxGeometry args={[0.05, 0.008, spoke.length]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      ))}

      {/* Column bases need contact shadows the same way exhibits did. */}
      {ATRIUM_COLUMNS.map((column) => (
        <SoftShadow
          key={`col-shadow-${column.x}-${column.z}`}
          position={[column.x, 0.011, column.z]}
          scale={[1.8, 1.8]}
          opacity={0.42}
          texture={shadowTexture}
        />
      ))}
    </group>
  );
}

export function AtriumSignage() {
  return (
    <group>
      {/* Wordmark high on the solid span beside the contact doorway. */}
      <LabelPlane
        position={[-3.85, 4.4, 5.99]}
        rotation={[0, Math.PI, 0]}
        size={[2.6, 0.68]}
        kicker="AWESOME AKOKAYO"
        title="Selected work"
        subtitle="FULL-STACK ENGINEER / 3D MUSEUM"
        variant="title"
      />

      {/* Wing plaques on the two solid spans of the north wall. */}
      <LabelPlane
        position={[-4.2, 3.0, -5.99]}
        size={[1.7, 0.46]}
        kicker="ROOM 03 / EAST WING"
        title="The Collection"
        footer="HERITAGE VITRINES / THROUGH THE EAST DOOR"
        variant="panel"
        lit
      />
      <LabelPlane
        position={[4.2, 3.0, -5.99]}
        size={[1.7, 0.46]}
        kicker="ROOM 02 / NORTH WING"
        title="The Works Gallery"
        footer="FOUR PROJECT EXHIBITS ON VIEW"
        variant="panel"
        lit
      />

      {/* East and west solid spans face their wings directly. */}
      <LabelPlane
        position={[5.99, 3.0, 3.7]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[1.7, 0.46]}
        kicker="ROOM 03"
        title="The Collection"
        footer="HERITAGE VITRINES"
        variant="panel"
        accent="#c9a26a"
        lit
      />
      <LabelPlane
        position={[-5.99, 3.0, 3.7]}
        rotation={[0, Math.PI / 2, 0]}
        size={[1.7, 0.46]}
        kicker="ROOM 04"
        title="The Workshop"
        footer="EXPERIENCE / TOOLKIT"
        variant="panel"
        accent="#ffb06b"
        lit
      />

      {/* South wall: the contact door is flanked by its plaque, and the */}
      {/* labelled classic-portfolio exit sits on the right-hand span.   */}
      <LabelPlane
        position={[-3.3, 3.0, 5.99]}
        rotation={[0, Math.PI, 0]}
        size={[1.7, 0.46]}
        kicker="ROOM 05"
        title="Contact Studio"
        footer="EMAIL / WHATSAPP / LET'S TALK"
        variant="panel"
        accent="#9fe0c1"
        lit
      />
      <LabelPlane
        position={[4.9, 3.0, 5.99]}
        rotation={[0, Math.PI, 0]}
        size={[1.7, 0.46]}
        kicker="THE EXIT"
        title="Classic Portfolio"
        footer="THE FULL WEBSITE / IF YOU PREFER"
        variant="panel"
        accent="#dd7f28"
        lit
      />
    </group>
  );
}
