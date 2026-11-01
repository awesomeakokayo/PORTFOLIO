"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, MathUtils, type Group } from "three";

function readColorToken(token: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || fallback;
}

function WireObject() {
  const group = useRef<Group | null>(null);
  const colors = useMemo(() => ({
    foreground: new Color(readColorToken("--color-foreground", "#F5F5F0")),
    accent: new Color(readColorToken("--color-accent", "#FF5A1F")),
    muted: new Color(readColorToken("--color-muted", "#8A8A85")),
  }), []);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      pointer.y * 0.42,
      3.2,
      delta,
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.58 + 0.18,
      3.2,
      delta,
    );
    group.current.rotation.z += delta * 0.035;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.34, 1]} />
        <meshBasicMaterial color={colors.foreground} wireframe />
      </mesh>
      <mesh rotation={[0.4, 0.15, 0.6]}>
        <torusGeometry args={[1.72, 0.006, 4, 100]} />
        <meshBasicMaterial color={colors.accent} />
      </mesh>
      <mesh rotation={[-0.3, 0.55, -0.2]}>
        <torusGeometry args={[1.9, 0.004, 4, 100]} />
        <meshBasicMaterial color={colors.muted} />
      </mesh>
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <WireObject />
      </Canvas>
    </div>
  );
}
