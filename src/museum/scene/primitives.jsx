import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function SoftShadow({
  position = [0, 0.012, 0],
  scale = [1, 1],
  opacity = 0.5,
  texture,
  rotation = [-Math.PI / 2, 0, 0],
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={[scale[0], scale[1], 1]}
      renderOrder={1}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
        color="#000000"
      />
    </mesh>
  );
}

export function RoundedBox({
  size = [1, 1, 1],
  radius = 0.03,
  segments = 3,
  children,
  ...props
}) {
  const geometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        size[0],
        size[1],
        size[2],
        segments,
        Math.min(radius, Math.min(size[0], size[1], size[2]) / 2)
      ),
    [size[0], size[1], size[2], segments, radius]
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}

export function LightFixture({ position = [0, 0, 0], color = "#ffd7b0" }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.26, 10]} />
        <meshStandardMaterial color="#241f18" roughness={0.45} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.015, 0]}>
        <cylinderGeometry args={[0.082, 0.058, 0.17, 18]} />
        <meshStandardMaterial color="#14110d" roughness={0.34} metalness={0.68} />
      </mesh>
      <mesh position={[0, -0.105, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.055, 18]} />
        <meshBasicMaterial color={color} transparent opacity={0.82} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function SpotFixture({
  position,
  target = [0, 0, 0],
  color = "#ffd7b0",
  intensity = 180,
  angle = 0.4,
  penumbra = 0.82,
  distance = 8,
  decay = 1.4,
  castShadow = false,
  shadowMapSize = 1024,
  fixture = true,
}) {
  const lightRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!lightRef.current || !targetRef.current) return;
    lightRef.current.target = targetRef.current;
    targetRef.current.updateMatrixWorld();
  }, []);

  return (
    <group>
      <spotLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={intensity}
        angle={angle}
        penumbra={penumbra}
        distance={distance}
        decay={decay}
        castShadow={castShadow}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-bias={-0.00025}
        shadow-normalBias={0.018}
        shadow-camera-near={0.4}
        shadow-camera-far={distance}
      />
      <object3D ref={targetRef} position={target} />
      {fixture && <LightFixture position={position} color={color} />}
    </group>
  );
}

export function makeSoftShadowMaterial(texture, opacity = 0.5) {
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity,
    depthWrite: false,
    toneMapped: false,
    color: "#000000",
  });
}
