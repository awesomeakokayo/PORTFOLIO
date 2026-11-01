import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBox, SoftShadow, SpotFixture } from "./primitives.jsx";
import { LabelPlane } from "./labels.jsx";

function InstancedBoxes({
  transforms,
  geometryArgs,
  material,
  castShadow = false,
  receiveShadow = false,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();

    transforms.forEach((transform, index) => {
      dummy.position.set(...transform.position);
      dummy.rotation.set(...(transform.rotation || [0, 0, 0]));
      dummy.scale.set(...(transform.scale || [1, 1, 1]));
      dummy.updateMatrix();
      ref.current.setMatrixAt(index, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, transforms.length]}
      material={material}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <boxGeometry args={geometryArgs} />
    </instancedMesh>
  );
}

const COLUMN_Z = [-4.8, -1.6, 1.6, 4.8];

export function Columns({ side, materials }) {
  const baseTransforms = useMemo(
    () => COLUMN_Z.map((z) => ({ position: [side * 5.75, 0.09, z] })),
    [side]
  );
  const mouldingTransforms = useMemo(
    () => COLUMN_Z.map((z) => ({ position: [side * 5.75, 0.25, z] })),
    [side]
  );
  const shaftTransforms = useMemo(
    () => COLUMN_Z.map((z) => ({ position: [side * 5.75, 2.56, z] })),
    [side]
  );
  const capitalTransforms = useMemo(
    () => COLUMN_Z.map((z) => ({ position: [side * 5.75, 4.87, z] })),
    [side]
  );
  const abacusTransforms = useMemo(
    () => COLUMN_Z.map((z) => ({ position: [side * 5.75, 5.0, z] })),
    [side]
  );
  const revealTransforms = useMemo(
    () =>
      COLUMN_Z.map((z) => ({
        position: [side * 5.56, 2.56, z],
      })),
    [side]
  );

  return (
    <group>
      <InstancedBoxes
        transforms={baseTransforms}
        geometryArgs={[0.8, 0.18, 0.8]}
        material={materials.stone}
        castShadow
        receiveShadow
      />
      <InstancedBoxes
        transforms={mouldingTransforms}
        geometryArgs={[0.68, 0.14, 0.68]}
        material={materials.woodDark}
        castShadow
      />
      <InstancedBoxes
        transforms={shaftTransforms}
        geometryArgs={[0.34, 4.45, 0.34]}
        material={materials.plaster}
        castShadow
        receiveShadow
      />
      <InstancedBoxes
        transforms={capitalTransforms}
        geometryArgs={[0.64, 0.18, 0.64]}
        material={materials.woodDark}
        castShadow
      />
      <InstancedBoxes
        transforms={abacusTransforms}
        geometryArgs={[0.76, 0.14, 0.76]}
        material={materials.stone}
        castShadow
      />
      <InstancedBoxes
        transforms={revealTransforms}
        geometryArgs={[0.012, 4.0, 0.035]}
        material={materials.brassDark}
      />
      <mesh position={[side * 5.75, 5.17, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.3, 12.6]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>
    </group>
  );
}

const FIN_Z = Array.from({ length: 11 }, (_, index) => -5.4 + index * 1.08);
const STILE_Z = Array.from({ length: 8 }, (_, index) => -5.25 + index * 1.5);

export function AtriumSideWall({ side, materials }) {
  const finTransforms = useMemo(
    () =>
      FIN_Z.map((z) => ({
        position: [side * 6.01, 2.95, z],
      })),
    [side]
  );
  const stileTransforms = useMemo(
    () =>
      STILE_Z.map((z) => ({
        position: [side * 5.97, 0.58, z],
      })),
    [side]
  );

  return (
    <group>
      <mesh position={[side * 6.2, 2.7, 0]} receiveShadow>
        <boxGeometry args={[0.3, 5.4, 12.5]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>

      <mesh position={[side * 6.02, 0.58, 0]} receiveShadow>
        <boxGeometry args={[0.08, 1.0, 11.9]} />
        <primitive object={materials.wood} attach="material" />
      </mesh>
      <mesh position={[side * 5.99, 0.08, 0]}>
        <boxGeometry args={[0.15, 0.16, 12.2]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>
      <mesh position={[side * 5.98, 1.1, 0]}>
        <boxGeometry args={[0.13, 0.07, 12.05]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>

      <InstancedBoxes
        transforms={stileTransforms}
        geometryArgs={[0.045, 0.86, 0.08]}
        material={materials.woodDark}
      />

      <InstancedBoxes
        transforms={finTransforms}
        geometryArgs={[0.06, 3.55, 0.16]}
        material={materials.woodDark}
        castShadow
      />

      <mesh position={[side * 5.94, 4.92, 0]}>
        <boxGeometry args={[0.035, 0.022, 11.85]} />
        <primitive object={materials.cove} attach="material" />
      </mesh>
    </group>
  );
}

const NICHE_SLAT_X = Array.from({ length: 11 }, (_, index) => -1.85 + index * 0.37);

function BackWall({ materials }) {
  const slatTransforms = useMemo(
    () => NICHE_SLAT_X.map((x) => ({ position: [x, 2.18, -6.4] })),
    []
  );

  return (
    <group>
      <mesh position={[-4.15, 2.7, -6.28]} receiveShadow>
        <boxGeometry args={[4.3, 5.4, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[4.15, 2.7, -6.28]} receiveShadow>
        <boxGeometry args={[4.3, 5.4, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[0, 4.9, -6.28]} receiveShadow>
        <boxGeometry args={[4.0, 1.1, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>

      <mesh position={[0, 2.2, -6.52]} receiveShadow>
        <boxGeometry args={[4.0, 4.4, 0.2]} />
        <primitive object={materials.plasterDark} attach="material" />
      </mesh>
      <mesh position={[-2.0, 2.2, -6.35]} receiveShadow>
        <boxGeometry args={[0.22, 4.4, 0.5]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[2.0, 2.2, -6.35]} receiveShadow>
        <boxGeometry args={[0.22, 4.4, 0.5]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>

      <InstancedBoxes
        transforms={slatTransforms}
        geometryArgs={[0.06, 4.12, 0.075]}
        material={materials.woodDark}
      />

      <mesh position={[-1.92, 2.2, -6.2]}>
        <boxGeometry args={[0.025, 4.22, 0.045]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
      <mesh position={[1.92, 2.2, -6.2]}>
        <boxGeometry args={[0.025, 4.22, 0.045]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
      <mesh position={[0, 4.31, -6.2]}>
        <boxGeometry args={[3.86, 0.025, 0.045]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      <mesh position={[0, 0.08, -6.05]}>
        <boxGeometry args={[12.4, 0.16, 0.12]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>

      <LabelPlane
        position={[0, 4.82, -6.08]}
        size={[3.35, 0.78]}
        kicker="ROOM 01 / SELECTED WORK"
        title="The Arrival Court"
        subtitle="FOUR PROJECTS / ONE ROOM"
        variant="title"
      />
    </group>
  );
}

function EntryWall({ materials }) {
  return (
    <group>
      <mesh position={[-4.2, 2.7, 6.38]} receiveShadow>
        <boxGeometry args={[4.4, 5.4, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[4.2, 2.7, 6.38]} receiveShadow>
        <boxGeometry args={[4.4, 5.4, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[0, 4.75, 6.38]} receiveShadow>
        <boxGeometry args={[4.0, 1.3, 0.34]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>

      <mesh position={[0, 1.8, 6.56]} receiveShadow>
        <boxGeometry args={[4.0, 3.6, 0.18]} />
        <primitive object={materials.plasterDark} attach="material" />
      </mesh>
      <mesh position={[-1.98, 1.8, 6.42]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.4]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>
      <mesh position={[1.98, 1.8, 6.42]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.4]} />
        <primitive object={materials.plaster} attach="material" />
      </mesh>

      <mesh position={[-1.82, 1.8, 6.19]}>
        <boxGeometry args={[0.035, 3.58, 0.04]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
      <mesh position={[1.82, 1.8, 6.19]}>
        <boxGeometry args={[0.035, 3.58, 0.04]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
      <mesh position={[0, 3.58, 6.19]}>
        <boxGeometry args={[3.67, 0.035, 0.04]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      <mesh position={[0, 0.08, 6.16]}>
        <boxGeometry args={[12.4, 0.16, 0.12]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>

      {[-3.15, 3.15].map((x) => (
        <group key={x} position={[x, 2.55, 6.18]}>
          <mesh>
            <boxGeometry args={[0.11, 0.72, 0.05]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.045, 0.56, 0.012]} />
            <primitive object={materials.cove} attach="material" />
          </mesh>
        </group>
      ))}

      <LabelPlane
        position={[0, 4.58, 6.2]}
        rotation={[0, Math.PI, 0]}
        size={[2.9, 0.72]}
        kicker="AWESOME AKOKAYO"
        title="Selected work"
        subtitle="FULL-STACK ENGINEER / LAGOS"
        variant="title"
      />
    </group>
  );
}

const CROSS_BEAM_Z = [-4.2, 0, 4.2];
const LONG_BEAM_X = [-4.2, 0, 4.2];

function Ceiling({ materials }) {
  return (
    <group>
      <mesh position={[0, 5.34, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12.6, 12.6]} />
        <primitive object={materials.stoneDark} attach="material" />
      </mesh>

      {CROSS_BEAM_Z.map((z) => (
        <group key={z}>
          <mesh position={[0, 5.18, z]} castShadow>
            <boxGeometry args={[12.6, 0.2, 0.28]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
          <mesh position={[0, 5.065, z]}>
            <boxGeometry args={[11.8, 0.018, 0.04]} />
            <primitive object={materials.cove} attach="material" />
          </mesh>
        </group>
      ))}

      {LONG_BEAM_X.map((x) => (
        <mesh key={x} position={[x, 5.2, 0]} castShadow>
          <boxGeometry args={[0.24, 0.18, 12.6]} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>
      ))}

      <group position={[0, 5.29, 3.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.86, 48]} />
          <primitive object={materials.skylight} attach="material" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.035, 12, 48]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

function Floor({ materials, exhibits }) {
  const radialLines = useMemo(
    () =>
      exhibits.map((exhibit) => {
        const dx = exhibit.position[0];
        const dz = exhibit.position[2];
        const length = Math.hypot(dx, dz);
        const start = 2.55;
        const end = Math.max(start + 0.2, length - 0.95);
        const mid = (start + end) / 2;
        const angle = Math.atan2(dx / length, dz / length);

        return {
          key: exhibit.project.slug,
          position: [(dx / length) * mid, 0.009, (dz / length) * mid],
          rotation: [0, angle, 0],
          length: end - start,
        };
      }),
    [exhibits]
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[13.2, 13.2]} />
        <primitive object={materials.floor} attach="material" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <circleGeometry args={[2.34, 72]} />
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
        const distance = 0.7;

        return (
          <mesh
            key={`spoke-${index}`}
            position={[
              Math.sin(angle) * distance,
              0.014,
              Math.cos(angle) * distance,
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.018, 0.006, 1.1]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
        );
      })}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.1, 0.13, 48]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      {radialLines.map((line) => (
        <mesh
          key={line.key}
          position={line.position}
          rotation={line.rotation}
          receiveShadow
        >
          <boxGeometry args={[0.035, 0.008, line.length]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      ))}

      {[
        { position: [0, 0.009, 4.55], size: [0.035, 0.008, 1.7] },
        { position: [-5.85, 0.009, 0], size: [0.04, 0.008, 11.7] },
        { position: [5.85, 0.009, 0], size: [0.04, 0.008, 11.7] },
        { position: [0, 0.009, -5.85], size: [11.7, 0.008, 0.04] },
        { position: [0, 0.009, 5.85], size: [11.7, 0.008, 0.04] },
      ].map((strip) => (
        <mesh key={strip.position.join(",")} position={strip.position}>
          <boxGeometry args={strip.size} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function Benches({ materials, shadowTexture }) {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 4.7, 0, 5.25]} rotation={[0, Math.PI / 2, 0]}>
          <RoundedBox
            size={[1.78, 0.15, 0.62]}
            radius={0.035}
            segments={4}
            position={[0, 0.47, 0]}
            castShadow
            receiveShadow
          >
            <primitive object={materials.fabric} attach="material" />
          </RoundedBox>

          <RoundedBox
            size={[1.84, 0.08, 0.66]}
            radius={0.018}
            segments={2}
            position={[0, 0.37, 0]}
            castShadow
          >
            <primitive object={materials.wood} attach="material" />
          </RoundedBox>

          {[-0.72, 0.72].map((x) =>
            [-0.22, 0.22].map((z) => (
              <group key={`${x}-${z}`} position={[x, 0.17, z]}>
                <mesh castShadow>
                  <boxGeometry args={[0.09, 0.32, 0.09]} />
                  <primitive object={materials.woodDark} attach="material" />
                </mesh>
                <mesh position={[0, -0.16, 0]}>
                  <boxGeometry args={[0.1, 0.025, 0.1]} />
                  <primitive object={materials.brassDark} attach="material" />
                </mesh>
              </group>
            ))
          )}

          <SoftShadow
            position={[0, 0.014, 0]}
            scale={[2.35, 1.25]}
            opacity={0.5}
            texture={shadowTexture}
          />
        </group>
      ))}
    </group>
  );
}

function RoomLights({ quality }) {
  return (
    <group>
      <pointLight
        position={[0, 4.95, 3.4]}
        color="#ffe1b5"
        intensity={quality === "low" ? 28 : 38}
        distance={9.5}
        decay={1.3}
      />
      <pointLight
        position={[0, 3.35, 5.1]}
        color="#ffd3a0"
        intensity={quality === "low" ? 11 : 16}
        distance={7.5}
        decay={1.4}
      />
      <pointLight
        position={[0, 3.1, 1.1]}
        color="#ffd8ae"
        intensity={quality === "low" ? 9 : 13}
        distance={6.5}
        decay={1.5}
      />
      {quality !== "low" && (
        <pointLight
          position={[0, 4.4, -5.3]}
          color="#ffc993"
          intensity={22}
          distance={7.5}
          decay={1.45}
        />
      )}
    </group>
  );
}

export { Benches, RoomLights as AtriumLights };

export default function Architecture({ materials, shadowTexture, exhibits, quality }) {
  return (
    <group>
      <Floor materials={materials} exhibits={exhibits} />
      <AtriumSideWall side={-1} materials={materials} />
      <AtriumSideWall side={1} materials={materials} />
      <BackWall materials={materials} />
      <EntryWall materials={materials} />
      <Ceiling materials={materials} />
      <Columns side={-1} materials={materials} />
      <Columns side={1} materials={materials} />
      <Benches materials={materials} shadowTexture={shadowTexture} />
      <RoomLights quality={quality} />

      <SpotFixture
        position={[0, 4.92, -5.05]}
        target={[0, 4.6, -6.32]}
        color="#ffd8aa"
        intensity={quality === "low" ? 8 : 14}
        angle={0.62}
        penumbra={1}
        distance={4.2}
        fixture
      />
    </group>
  );
}
