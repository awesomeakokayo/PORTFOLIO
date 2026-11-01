import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneFrame from "./SceneFrame.jsx";
import { easeInOut, roundedSlabGeometry } from "./geometry.js";

const BASE_Y = [-0.62, -0.28, 0.02];
const EXPLODE_Y = [-0.55, 0.18, 0.9];
const EXPLODE_X = [-0.18, 0.13, -0.07];
const EXPLODE_Z = [0.12, -0.08, 0.03];
const TILT = [-0.08, 0.06, -0.04];

function ProcessAssembly({ progressRef, reduced, dark = false }) {
  const group = useRef(null);
  const slabs = useRef([]);
  const fills = useRef([]);
  const edges = useRef([]);
  const orb = useRef(null);
  const halo = useRef(null);

  const geometries = useMemo(
    () => [
      roundedSlabGeometry(2, 1.24, 0.18, 0.16),
      roundedSlabGeometry(1.58, 0.98, 0.16, 0.14),
      roundedSlabGeometry(1.12, 0.7, 0.14, 0.12),
    ],
    []
  );

  const edgeGeometries = useMemo(
    () => geometries.map((geometry) => new THREE.EdgesGeometry(geometry, 26)),
    [geometries]
  );

  useFrame((state, delta) => {
    const raw = reduced ? 1 : progressRef.current ?? 0;
    const progress = easeInOut(raw);
    const node = group.current;
    if (!node) return;

    const pointerX = reduced ? 0 : state.pointer.x;
    const pointerY = reduced ? 0 : state.pointer.y;

    node.rotation.y = THREE.MathUtils.damp(
      node.rotation.y,
      -0.62 + progress * 0.26 + pointerX * 0.08,
      2.2,
      delta
    );
    node.rotation.x = THREE.MathUtils.damp(
      node.rotation.x,
      0.2 - pointerY * 0.05,
      2.2,
      delta
    );
    node.position.y = reduced
      ? 0
      : Math.sin(state.clock.elapsedTime * 0.55) * 0.028 * progress;

    slabs.current.forEach((slab, index) => {
      if (!slab) return;
      const spread = 1 - progress;
      slab.position.y = BASE_Y[index] + EXPLODE_Y[index] * spread;
      slab.position.x = EXPLODE_X[index] * spread;
      slab.position.z = EXPLODE_Z[index] * spread;
      slab.rotation.z = TILT[index] * spread;
    });

    const fillAmount = easeInOut((raw - 0.1) / 0.58);
    fills.current.forEach((material) => {
      if (!material) return;
      material.opacity = fillAmount;
      material.depthWrite = fillAmount > 0.985;
    });

    const lineAmount = 1 - easeInOut((raw - 0.18) / 0.48);
    edges.current.forEach((material) => {
      if (!material) return;
      material.opacity = 0.08 + lineAmount * 0.92;
    });

    if (orb.current) {
      const orbAmount = easeInOut((raw - 0.54) / 0.34);
      orb.current.scale.setScalar(Math.max(0.001, orbAmount));
      orb.current.position.y = 0.44 + (1 - orbAmount) * 0.45;
    }

    if (halo.current) {
      const haloAmount = easeInOut((raw - 0.62) / 0.3);
      halo.current.material.opacity = haloAmount * 0.55;
      halo.current.scale.setScalar(0.82 + haloAmount * 0.18);
    }
  });

  return (
    <group>
      <group ref={group} rotation={[0.2, -0.62, 0.02]}>
        {geometries.map((geometry, index) => (
          <group
            key={index}
            ref={(node) => {
              slabs.current[index] = node;
            }}
            rotation={[-Math.PI / 2, 0, TILT[index]]}
            position={[EXPLODE_X[index], BASE_Y[index] + EXPLODE_Y[index], EXPLODE_Z[index]]}
          >
            <mesh geometry={geometry} castShadow receiveShadow>
              <meshStandardMaterial
                ref={(material) => {
                  fills.current[index] = material;
                }}
                color={
                  (dark
                    ? ["#d8d5ca", "#4f7a63", "#86d29b"]
                    : ["#efece3", "#cbdbce", "#215042"])[index]
                }
                roughness={[0.92, 0.86, 0.58][index]}
                metalness={index === 2 ? 0.03 : 0}
                transparent
                opacity={0}
              />
            </mesh>
            <lineSegments geometry={edgeGeometries[index]}>
              <lineBasicMaterial
                ref={(material) => {
                  edges.current[index] = material;
                }}
                color={dark ? "#a8e6b8" : "#1f4a3d"}
                transparent
                opacity={0.92}
                depthWrite={false}
              />
            </lineSegments>
          </group>
        ))}

        <mesh ref={orb} position={[0.17, 0.9, 0.05]} scale={0.001} castShadow>
          <sphereGeometry args={[0.26, 48, 48]} />
          <meshPhysicalMaterial
            color="#bd7451"
            roughness={0.5}
            metalness={0.04}
            clearcoat={0.12}
            clearcoatRoughness={0.6}
          />
        </mesh>

        <mesh ref={halo} position={[0, 0.04, -0.9]} rotation={[0, 0, 0]} scale={0.82}>
          <torusGeometry args={[1.18, 0.009, 10, 132]} />
          <meshStandardMaterial
            color="#a98a5c"
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function ProcessFallback() {
  return (
    <div className="rb-stack-fallback rb-stack-fallback-process" aria-hidden="true">
      <span className="rb-stack-layer rb-stack-layer-1" />
      <span className="rb-stack-layer rb-stack-layer-2" />
      <span className="rb-stack-layer rb-stack-layer-3" />
      <span className="rb-stack-orb" />
    </div>
  );
}

export default function ProcessScene({ progressRef, active = true, reduced = false, dark = false }) {
  return (
    <SceneFrame
      active={active}
      reduced={reduced}
      shadows={false}
      camera={{ position: [0, 1.25, 5.9], fov: 30 }}
      fallback={<ProcessFallback />}
    >
      <ambientLight intensity={dark ? 0.62 : 0.88} />
      <hemisphereLight args={["#ffffff", dark ? "#1c2b22" : "#d8d3c6", 0.55]} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={dark ? 1.2 : 1.45}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.32} color="#dce8df" />
      <ProcessAssembly progressRef={progressRef} reduced={reduced} dark={dark} />
    </SceneFrame>
  );
}
