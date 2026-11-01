import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import SceneFrame from "./SceneFrame.jsx";
import { roundedSlabGeometry } from "./geometry.js";

/* The hero object is a physical thing, not a diagram: a matte sage capsule with
   a raised rim and a black button carrying an etched arrow. Everything is built
   from primitives so there is no model download on first paint. */

const BODY_W = 2.0;
const BODY_H = 3.62;
const BODY_D = 0.46;
const BEVEL = 0.11;
const BUTTON_R = 0.66;
const BUTTON_TRAVEL = 0.42;

function letterTexture(letter, color = "#e8ece4") {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.clearRect(0, 0, size, size);
  context.fillStyle = color;
  context.font = "600 62px 'Instrument Sans', Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(letter, size / 2, size / 2 + 3);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function CompassLetters() {
  const letters = useMemo(
    () =>
      [
        { char: "N", angle: 0 },
        { char: "E", angle: Math.PI / 2 },
        { char: "S", angle: Math.PI },
        { char: "W", angle: (3 * Math.PI) / 2 },
      ].map(({ char, angle }) => ({
        char,
        x: Math.sin(angle) * 0.47,
        y: Math.cos(angle) * 0.47,
        texture: letterTexture(char),
      })),
    []
  );

  useEffect(
    () => () => letters.forEach((letter) => letter.texture?.dispose()),
    [letters]
  );

  return letters.map(({ char, x, y, texture }) =>
    texture ? (
      <mesh key={char} position={[x, y, 0.012]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    ) : null
  );
}

function roundedRectShape(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function rimGeometry() {
  const outerW = BODY_W - 0.42;
  const outerH = BODY_H - 0.42;
  const thickness = 0.055;
  const outer = roundedRectShape(outerW, outerH, outerW / 2);
  const inner = roundedRectShape(
    outerW - thickness * 2,
    outerH - thickness * 2,
    (outerW - thickness * 2) / 2
  );
  outer.holes.push(inner);

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth: 0.05,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    curveSegments: 48,
  });
  geometry.center();
  return geometry;
}

function buttonGeometry() {
  /* A lathe profile gives the button the soft shoulder of a moulded plastic
     part instead of a hard cylinder edge. */
  const r = BUTTON_R;
  const half = 0.1;
  const edge = 0.045;
  const points = [
    new THREE.Vector2(0, -half),
    new THREE.Vector2(r - edge, -half),
    new THREE.Vector2(r - edge * 0.35, -half + edge * 0.55),
    new THREE.Vector2(r, -half + edge),
    new THREE.Vector2(r, half - edge),
    new THREE.Vector2(r - edge * 0.35, half - edge * 0.55),
    new THREE.Vector2(r - edge, half),
    new THREE.Vector2(0, half),
  ];
  const geometry = new THREE.LatheGeometry(points, 96);
  geometry.rotateX(Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function CompassNeedle({ silverMaterial, accentMaterial }) {
  /* 3D faceted compass needle matching the brand logo */
  const needleGeomA = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.44);
    shape.lineTo(0.13, -0.40);
    shape.lineTo(0, -0.28);
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.025,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008,
    });
    geom.center();
    return geom;
  }, []);

  const needleGeomB = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.44);
    shape.lineTo(-0.13, -0.40);
    shape.lineTo(0, -0.28);
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.025,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008,
    });
    geom.center();
    return geom;
  }, []);

  useEffect(() => {
    return () => {
      needleGeomA.dispose();
      needleGeomB.dispose();
    };
  }, [needleGeomA, needleGeomB]);

  return (
    <group scale={0.92}>
      <mesh geometry={needleGeomA} material={accentMaterial} castShadow={false} />
      <mesh geometry={needleGeomB} material={silverMaterial} castShadow={false} />
      <mesh position={[0, -0.06, 0.025]}>
        <cylinderGeometry args={[0.038, 0.038, 0.03, 24]} />
        <primitive object={silverMaterial} attach="material" />
      </mesh>
    </group>
  );
}

function CardinalTicks({ material, radius = 0.72 }) {
  /* 8 cardinal and intercardinal compass markers */
  const ticks = [
    { angle: 0, major: true, isNorth: true },       // N
    { angle: Math.PI / 4, major: false },          // NE
    { angle: Math.PI / 2, major: true },           // E
    { angle: (3 * Math.PI) / 4, major: false },    // SE
    { angle: Math.PI, major: true },               // S
    { angle: (5 * Math.PI) / 4, major: false },    // SW
    { angle: (3 * Math.PI) / 2, major: true },     // W
    { angle: (7 * Math.PI) / 4, major: false },    // NW
  ];

  return (
    <group>
      {ticks.map((t, i) => {
        const x = Math.sin(t.angle) * radius;
        const y = Math.cos(t.angle) * radius;
        const len = t.major ? 0.09 : 0.055;
        const width = t.isNorth ? 0.032 : t.major ? 0.022 : 0.014;
        return (
          <mesh
            key={i}
            position={[x, y, 0.008]}
            rotation={[0, 0, -t.angle]}
          >
            <boxGeometry args={[width, len, 0.015]} />
            <primitive object={material} attach="material" />
          </mesh>
        );
      })}
    </group>
  );
}

function StudioEnvironment({ intensity = 0.55 }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.035);
    scene.environment = env.texture;
    scene.environmentIntensity = intensity;

    return () => {
      if (scene.environment === env.texture) scene.environment = null;
      scene.environmentIntensity = 1;
      env.texture.dispose();
      pmrem.dispose();
      room.dispose?.();
    };
  }, [gl, scene, intensity]);

  return null;
}

function HeroEntity({ progressRef, reduced, dark, narrow }) {
  const tilt = useRef(null);
  const button = useRef(null);
  const arrow = useRef(null);
  const float = useRef(null);

  const bodyGeometry = useMemo(
    () => roundedSlabGeometry(BODY_W, BODY_H, BODY_D, BODY_W / 2),
    []
  );
  const bodyFront = useMemo(() => {
    bodyGeometry.computeBoundingBox();
    return bodyGeometry.boundingBox.max.z;
  }, [bodyGeometry]);
  const rim = useMemo(rimGeometry, []);
  const buttonShape = useMemo(buttonGeometry, []);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: dark ? "#8cae79" : "#9dbc8b",
        roughness: 0.66,
        metalness: 0,
        clearcoat: 0.18,
        clearcoatRoughness: 0.62,
        sheen: 0.5,
        sheenColor: new THREE.Color("#d8e6c9"),
        sheenRoughness: 0.75,
        envMapIntensity: 0.72,
      }),
    [dark]
  );

  const rimMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: dark ? "#a2c18f" : "#b0cb9d",
        roughness: 0.48,
        metalness: 0,
        clearcoat: 0.35,
        clearcoatRoughness: 0.45,
        envMapIntensity: 0.85,
      }),
    [dark]
  );

  const buttonMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#12150f",
        roughness: 0.38,
        metalness: 0.06,
        clearcoat: 0.5,
        clearcoatRoughness: 0.32,
        envMapIntensity: 1.05,
      }),
    []
  );

  const silverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f2f5ed",
        roughness: 0.26,
        metalness: 0.85,
        envMapIntensity: 1.2,
      }),
    []
  );

  const needleAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#28332a",
        roughness: 0.4,
        metalness: 0.45,
        envMapIntensity: 0.95,
      }),
    []
  );

  const tickMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: dark ? "#bfd4b2" : "#607a56",
        roughness: 0.48,
        metalness: 0.25,
      }),
    [dark]
  );

  /* Release GPU resources on unmount and replace materials when the theme
     flips, so repeated appearance changes do not accumulate on the device. */
  useEffect(() => {
    return () => {
      bodyGeometry.dispose();
      rim.dispose();
      buttonShape.dispose();
    };
  }, [bodyGeometry, rim, buttonShape]);

  useEffect(() => () => bodyMaterial.dispose(), [bodyMaterial]);
  useEffect(() => () => rimMaterial.dispose(), [rimMaterial]);
  useEffect(() => {
    return () => {
      buttonMaterial.dispose();
      silverMaterial.dispose();
      needleAccentMaterial.dispose();
      tickMaterial.dispose();
    };
  }, [buttonMaterial, silverMaterial, needleAccentMaterial, tickMaterial]);

  useFrame((state, delta) => {
    const raw = reduced ? 1 : THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const smooth = raw * raw * (3 - 2 * raw);
    const speed = reduced ? 60 : 3.2;

    if (tilt.current) {
      /* The object keeps its resting angle. Only the dial and needle move. */
      tilt.current.rotation.z = THREE.MathUtils.damp(
        tilt.current.rotation.z,
        narrow ? 0 : -0.42,
        speed,
        delta
      );
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, 0.06, speed, delta);
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, 0, speed, delta);
    }

    if (float.current) {
      float.current.position.y = reduced
        ? 0
        : Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
    }

    if (button.current) {
      /* Gravitational pull: starts at the top, accelerates downwards with scroll */
      const fallProgress = Math.min(1, Math.pow(raw, 1.35));
      const topY = narrow ? 1.06 : 1.10;
      const bottomY = narrow ? -1.06 : -1.10;
      const yTarget = THREE.MathUtils.lerp(topY, bottomY, fallProgress);
      button.current.position.y = THREE.MathUtils.damp(button.current.position.y, yTarget, speed, delta);
    }

    if (arrow.current) {
      /* The needle settles like a physical compass as the dial travels. */
      const startAngle = narrow ? 0 : -0.58;
      const endAngle = narrow ? Math.PI : -1.2;
      const targetAngle = THREE.MathUtils.lerp(startAngle, endAngle, smooth);

      arrow.current.rotation.z = THREE.MathUtils.damp(
        arrow.current.rotation.z,
        targetAngle,
        reduced ? 60 : 3.8,
        delta
      );
    }
  });

  return (
    <group ref={float} scale={narrow ? 0.95 : 0.92}>
      <group ref={tilt} rotation={[0.06, 0, narrow ? 0 : -0.42]}>
        <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow receiveShadow />

        <mesh
          geometry={rim}
          material={rimMaterial}
          position={[0, 0, bodyFront + 0.012]}
        />

        {/* The engraved rose at the end of the dial's travel. */}
        <group position={[0, narrow ? -1.06 : -1.10, bodyFront + 0.015]} scale={0.9}>
          <CardinalTicks material={tickMaterial} radius={0.76} />
          <mesh>
            <torusGeometry args={[0.84, 0.0045, 8, 96]} />
            <primitive object={tickMaterial} attach="material" />
          </mesh>
        </group>

        {/* Gravitational sliding compass dial */}
        <group ref={button} position={[0, narrow ? 1.06 : 1.10, bodyFront + 0.1]}>
          <mesh geometry={buttonShape} material={buttonMaterial} castShadow />
          <group position={[0, 0, 0.01]}>
            <CardinalTicks material={tickMaterial} radius={BUTTON_R - 0.055} />
          </group>
          <CompassLetters />
          <group
            ref={arrow}
            position={[0, 0, 0.118]}
            rotation={[0, 0, narrow ? 0 : -0.58]}
          >
            <CompassNeedle silverMaterial={silverMaterial} accentMaterial={needleAccentMaterial} />
          </group>
        </group>
      </group>
    </group>
  );
}

function HeroFallback() {
  return (
    <div className="rb-entity-fallback" aria-hidden="true">
      <span className="rb-entity-fallback-pill">
        <span className="rb-entity-fallback-rim" />
        <span className="rb-entity-fallback-button">
          <span className="rb-fallback-rose" aria-hidden="true">
            <i className="is-n">N</i>
            <i className="is-e">E</i>
            <i className="is-s">S</i>
            <i className="is-w">W</i>
          </span>
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M12 20 20 12M13 12h7v7" />
          </svg>
        </span>
      </span>
    </div>
  );
}

export default function HeroScene({ progressRef, active = true, reduced = false, dark = false, narrow = false }) {
  const progress = progressRef ?? { current: 0 };

  return (
    <SceneFrame
      active={active}
      reduced={false}
      shadows={false}
      camera={{ position: [0, 0, narrow ? 7.6 : 9], fov: 30 }}
      fallback={<HeroFallback />}
    >
      <StudioEnvironment intensity={dark ? 0.45 : 0.58} />
      <ambientLight intensity={dark ? 0.42 : 0.62} />
      <hemisphereLight args={[dark ? "#e8f0e2" : "#ffffff", dark ? "#1a241c" : "#cfcab8", 0.45]} />
      <directionalLight
        position={[-3.6, 5.2, 4.6]}
        intensity={dark ? 1.65 : 1.75}
        color="#fffaf0"
      />
      <directionalLight position={[4.4, 1.6, 2.2]} intensity={0.5} color="#e6f2e0" />
      <directionalLight position={[0.6, -2.4, 3.4]} intensity={0.28} color="#dfe8d6" />
      <HeroEntity progressRef={progress} reduced={reduced} dark={dark} narrow={narrow} />
    </SceneFrame>
  );
}
