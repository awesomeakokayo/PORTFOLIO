import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DOOR_OPEN_DISTANCE, doorCenter, doorDistance } from "./plan.js";
import { useWorld } from "./shell.jsx";

/**
 * AutoDoor — gallery doors that part in the middle as a visitor approaches,
 * with a status lamp over the header that warms as they start to slide.
 * Motion is part of the world; the engine's collision switches open at the
 * same distance, so a door can never block a visitor at the threshold.
 */
export default function AutoDoor({ door }) {
  const camera = useThree((state) => state.camera);
  const { materials, quality } = useWorld();
  const leavesRef = useRef(null);
  const openRef = useRef(0);
  const center = useMemo(() => doorCenter(door), [door]);

  const lampMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a3a22",
        emissive: "#ffc588",
        emissiveIntensity: 0.3,
        roughness: 0.42,
        metalness: 0.2,
      }),
    []
  );

  useEffect(() => () => lampMaterial.dispose(), [lampMaterial]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const distance = doorDistance(door, camera.position.x, camera.position.z);
    const goal = distance < DOOR_OPEN_DISTANCE ? 1 : 0;
    const alpha = quality === "low" ? 1 : 1 - Math.exp(-7.5 * dt);
    openRef.current += (goal - openRef.current) * alpha;

    if (leavesRef.current) {
      const leafTravel = (door.to - door.from) / 2;
      const travel = leafTravel * 0.94 * openRef.current;
      const alongX = door.axis === "z";
      leavesRef.current.children.forEach((leaf, index) => {
        if (alongX) {
          leaf.position.x = (index === 0 ? -1 : 1) * (leafTravel / 2 + travel / 2);
          leaf.position.z = 0;
        } else {
          leaf.position.z = (index === 0 ? -1 : 1) * (leafTravel / 2 + travel / 2);
          leaf.position.x = 0;
        }
      });
    }

    lampMaterial.emissiveIntensity = THREE.MathUtils.damp(
      lampMaterial.emissiveIntensity,
      goal === 1 ? 1.7 : 0.3,
      6,
      dt
    );
  });

  const alongX = door.axis === "z";
  const span = door.to - door.from;
  const leafSize = alongX
    ? [span / 2 - 0.045, 3.0, 0.08]
    : [0.08, 3.0, span / 2 - 0.045];

  // Status lamp sits on the atrium side of the header.
  const lamp = alongX
    ? [0, 3.44, door.at < 0 ? 0.34 : -0.34]
    : [door.at > 0 ? -0.34 : 0.34, 3.44, 0];

  return (
    <group position={[center.x, 0, center.z]}>
      {/* Leaves with brass pull stiles so the panels read as real doors. */}
      <group ref={leavesRef}>
        {[0, 1].map((index) => (
          <group key={index}>
            <mesh castShadow position={[0, 1.52, 0]}>
              <boxGeometry args={leafSize} />
              <primitive object={materials.wood} attach="material" />
            </mesh>
            <mesh
              position={
                alongX
                  ? [index === 0 ? 0.34 : -0.34, 0.46, 0]
                  : [0, 0.46, index === 0 ? 0.34 : -0.34]
              }
            >
              <boxGeometry args={alongX ? [0.05, 0.86, 0.055] : [0.055, 0.86, 0.05]} />
              <primitive object={materials.brassDark} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={lamp} material={lampMaterial}>
        <boxGeometry args={alongX ? [0.3, 0.07, 0.1] : [0.1, 0.07, 0.3]} />
      </mesh>
    </group>
  );
}
