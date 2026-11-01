import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LightFixture, RoundedBox, SoftShadow } from "./primitives.jsx";
import { LabelPlane } from "./labels.jsx";

const MONO = '"Space Mono", monospace';
const DISPLAY = '"Ojuju", "Space Grotesk", sans-serif';

function useCanvasTexture(width, height, draw, deps) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx, width, height);
    const next = new THREE.CanvasTexture(canvas);
    next.colorSpace = THREE.SRGBColorSpace;
    next.anisotropy = 8;
    next.needsUpdate = true;
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPaper(ctx, width, height, side) {
  const random = seededRandom(side === "left" ? 1181 : 9187);

  ctx.fillStyle = "#e8e0d0";
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < 2600; index += 1) {
    ctx.fillStyle = random() > 0.5
      ? `rgba(255, 250, 238, ${0.08 + random() * 0.1})`
      : `rgba(94, 78, 55, ${0.035 + random() * 0.055})`;
    ctx.fillRect(random() * width, random() * height, 1 + random() * 2, 1);
  }

  ctx.fillStyle = "rgba(55, 44, 32, .72)";
  ctx.fillRect(54, 66, 92 + random() * 80, 7);

  ctx.fillStyle = "rgba(255, 252, 244, .38)";
  ctx.fillRect(54, 84, width - 108, 1);

  let y = 112;
  while (y < height - 64) {
    const lineWidth = (0.42 + random() * 0.5) * (width - 110);
    ctx.fillStyle = `rgba(48, 42, 34, ${0.3 + random() * 0.32})`;
    ctx.fillRect(54, y, lineWidth, 2 + random() * 2);
    y += 17 + random() * 8;
  }

  const gutter = ctx.createLinearGradient(
    side === "left" ? width - 70 : 0,
    0,
    side === "left" ? width : 70,
    0
  );
  gutter.addColorStop(0, "rgba(38, 27, 17, 0)");
  gutter.addColorStop(1, "rgba(38, 27, 17, .24)");
  ctx.fillStyle = gutter;
  ctx.fillRect(side === "left" ? width - 70 : 0, 0, 70, height);

  ctx.fillStyle = "rgba(68, 55, 40, .55)";
  ctx.font = `400 16px ${MONO}`;
  ctx.textAlign = "center";
  ctx.fillText(side === "left" ? "42" : "43", width / 2, height - 24);
  ctx.textAlign = "left";
}

function drawKeyboard(ctx, width, height) {
  ctx.fillStyle = "#161513";
  ctx.fillRect(0, 0, width, height);

  const rows = [
    { y: 18, keys: 14 },
    { y: 62, keys: 14 },
    { y: 106, keys: 13 },
    { y: 150, keys: 12 },
    { y: 194, keys: 7 },
  ];
  const padding = 16;
  const gap = 6;

  rows.forEach((row, rowIndex) => {
    const available = width - padding * 2 - gap * (row.keys - 1);
    const keyWidth = available / row.keys;
    for (let key = 0; key < row.keys; key += 1) {
      const x = padding + key * (keyWidth + gap);
      ctx.fillStyle = rowIndex === 4 && key === 3 ? "#24221e" : "#292723";
      roundedRect(ctx, x, row.y, keyWidth, 34, 4);
      ctx.fill();
      ctx.fillStyle = "rgba(244, 243, 239, .2)";
      ctx.fillRect(x + 4, row.y + 3, keyWidth - 8, 1);
      if (keyWidth > 20) {
        ctx.fillStyle = "rgba(244, 243, 239, .28)";
        ctx.font = `400 7px ${MONO}`;
        ctx.fillText(String.fromCharCode(65 + ((rowIndex * 5 + key) % 26)), x + 6, row.y + 17);
      }
    }
  });

  ctx.fillStyle = "#1d1b18";
  roundedRect(ctx, 150, 238, 212, 22, 5);
  ctx.fill();
}

function drawTechScreen(ctx, width, height) {
  ctx.fillStyle = "#0b1512";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#101f1a";
  ctx.fillRect(0, 0, width, 44);
  ctx.fillStyle = "#9fe0c1";
  ctx.beginPath();
  ctx.arc(28, 22, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f4f3ef";
  ctx.font = `700 14px ${MONO}`;
  ctx.fillText("TECHSKILLHUB", 44, 27);
  ctx.fillStyle = "#71837a";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("LEARNING PATHS", width - 118, 27);

  ctx.fillStyle = "#0d1915";
  ctx.fillRect(0, 44, 108, height - 44);
  ["Dashboard", "My path", "Projects", "Progress", "Library"].forEach((label, index) => {
    if (index === 1) {
      ctx.fillStyle = "rgba(159, 224, 193, .14)";
      ctx.fillRect(12, 62 + index * 32, 84, 24);
    }
    ctx.fillStyle = index === 1 ? "#d9f5e7" : "#708078";
    ctx.font = `400 9px ${MONO}`;
    ctx.fillText(label, 22, 78 + index * 32);
  });

  ctx.fillStyle = "#f4f3ef";
  ctx.font = `600 23px ${DISPLAY}`;
  ctx.fillText("Your path to shipping.", 128, 92);
  ctx.fillStyle = "#8fa59a";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("CONTINUE WHERE YOU LEFT OFF", 128, 110);

  const cards = [
    { x: 128, y: 128, title: "Frontend systems", progress: 0.72, accent: "#9fe0c1" },
    { x: 306, y: 128, title: "Product thinking", progress: 0.44, accent: "#e4c99c" },
  ];

  cards.forEach((card) => {
    ctx.fillStyle = "#12231d";
    roundedRect(ctx, card.x, card.y, 162, 118, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(159, 224, 193, .14)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#f4f3ef";
    ctx.font = `600 13px ${DISPLAY}`;
    ctx.fillText(card.title, card.x + 14, card.y + 28);
    ctx.fillStyle = "#7f9389";
    ctx.font = `400 7px ${MONO}`;
    ctx.fillText("STRUCTURED PATH / SAVED PROGRESS", card.x + 14, card.y + 44);
    ctx.fillStyle = "rgba(255,255,255,.08)";
    roundedRect(ctx, card.x + 14, card.y + 62, 132, 5, 3);
    ctx.fill();
    ctx.fillStyle = card.accent;
    roundedRect(ctx, card.x + 14, card.y + 62, 132 * card.progress, 5, 3);
    ctx.fill();
    ctx.fillStyle = card.accent;
    ctx.font = `700 8px ${MONO}`;
    ctx.fillText("SAVED PROGRESS", card.x + 14, card.y + 92);
  });

  ctx.fillStyle = "#12231d";
  roundedRect(ctx, 128, 260, 340, 44, 8);
  ctx.fill();
  ctx.fillStyle = "#9fe0c1";
  ctx.font = `700 9px ${MONO}`;
  ctx.fillText("NEXT SESSION / BUILD A REAL INTERFACE", 144, 286);
  ctx.strokeStyle = "rgba(159, 224, 193, .25)";
  ctx.beginPath();
  ctx.arc(442, 282, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#9fe0c1";
  ctx.beginPath();
  ctx.arc(442, 282, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawFloodScreen(ctx, width, height) {
  ctx.fillStyle = "#0a1514";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#102320";
  ctx.fillRect(0, 0, width, 42);
  ctx.fillStyle = "#ffb06b";
  ctx.beginPath();
  ctx.arc(26, 21, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f4f3ef";
  ctx.font = `700 13px ${MONO}`;
  ctx.fillText("SOUTHWEST / FLOOD MONITOR", 42, 26);
  ctx.fillStyle = "#6e8a82";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("LIVE RISK LAYER", width - 108, 26);

  ctx.fillStyle = "#0e1d1a";
  roundedRect(ctx, 16, 54, 286, 236, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 176, 107, .12)";
  ctx.stroke();

  ctx.strokeStyle = "rgba(137, 184, 168, .22)";
  ctx.lineWidth = 1;
  for (let ring = 0; ring < 5; ring += 1) {
    ctx.beginPath();
    ctx.ellipse(158, 172, 34 + ring * 23, 22 + ring * 16, -0.2, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = "#6fb8a8";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(40, 214);
  ctx.bezierCurveTo(96, 160, 150, 220, 196, 160);
  ctx.bezierCurveTo(224, 124, 250, 148, 276, 106);
  ctx.stroke();

  ctx.fillStyle = "#ffb06b";
  [[102, 180], [190, 158], [244, 126]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 176, 107, .2)";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffb06b";
  });

  ctx.fillStyle = "#6e8a82";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("COMMUNITY REPORTS / 24H", 30, 276);

  ctx.fillStyle = "#122622";
  roundedRect(ctx, 314, 54, 182, 106, 8);
  ctx.fill();
  ctx.fillStyle = "#ffb06b";
  ctx.font = `700 8px ${MONO}`;
  ctx.fillText("RISK SIGNAL", 330, 76);
  ctx.fillStyle = "#f4f3ef";
  ctx.font = `600 28px ${DISPLAY}`;
  ctx.fillText("Risk layer", 330, 108);
  ctx.fillStyle = "#8aa39b";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("COMMUNITY REPORTS / REVIEW", 330, 128);

  ctx.fillStyle = "#122622";
  roundedRect(ctx, 314, 174, 182, 116, 8);
  ctx.fill();
  ctx.fillStyle = "#7f978e";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("RAINFALL / 7 DAYS", 330, 196);
  [18, 32, 24, 46, 38, 54, 44].forEach((value, index) => {
    const x = 330 + index * 21;
    ctx.fillStyle = index > 4 ? "#ffb06b" : "#6fb8a8";
    ctx.fillRect(x, 268 - value, 10, value);
  });
}

function drawElroiScreen(ctx, width, height) {
  ctx.fillStyle = "#efe5d5";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#211b15";
  ctx.fillRect(0, 0, width, 42);
  ctx.fillStyle = "#f4f3ef";
  ctx.font = `700 15px ${MONO}`;
  ctx.fillText("ELROI", 24, 27);
  ctx.fillStyle = "#b8ab99";
  ctx.font = `400 8px ${MONO}`;
  ["WORK", "STUDIO", "CONTACT"].forEach((label, index) => {
    ctx.fillText(label, width - 196 + index * 62, 26);
  });

  ctx.fillStyle = "#211b15";
  ctx.font = `500 34px ${DISPLAY}`;
  ctx.fillText("Objects with a", 24, 108);
  ctx.fillText("point of view.", 24, 146);

  ctx.fillStyle = "#756958";
  ctx.font = `400 8px ${MONO}`;
  ctx.fillText("BRAND / DIGITAL / SPACES", 26, 174);
  ctx.fillStyle = "#c9a26a";
  ctx.fillRect(26, 192, 58, 3);

  const cards = [
    { x: 26, color: "#b86a4b", label: "OBJECTS" },
    { x: 188, color: "#d6c4a7", label: "IDENTITY" },
    { x: 350, color: "#2d302a", label: "SPACES" },
  ];

  cards.forEach((card) => {
    ctx.fillStyle = card.color;
    roundedRect(ctx, card.x, 218, 136, 76, 4);
    ctx.fill();
    ctx.fillStyle = card.color === "#2d302a" ? "#efe5d5" : "#211b15";
    ctx.font = `700 8px ${MONO}`;
    ctx.fillText(card.label, card.x + 10, 244);
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.fillRect(card.x + 10, 262, 52, 1);
  });

  ctx.strokeStyle = "#c9a26a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(462, 112, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#c9a26a";
  ctx.font = `700 7px ${MONO}`;
  ctx.fillText("ELROI / STUDIO", 430, 115);
}

function Screen({ texture, size = [0.7, 0.42], position, rotation, materials }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        size={[size[0] + 0.05, size[1] + 0.05, 0.022]}
        radius={0.008}
        segments={2}
        position={[0, 0, -0.012]}
      >
        <primitive object={materials.blackMetal} attach="material" />
      </RoundedBox>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function OpenBooksArtifact({ materials, accent, active, quality, shadowTexture }) {
  const leftPage = useCanvasTexture(512, 512, (ctx, width, height) => drawPaper(ctx, width, height, "left"), []);
  const rightPage = useCanvasTexture(512, 512, (ctx, width, height) => drawPaper(ctx, width, height, "right"), []);

  return (
    <group>
      <SoftShadow position={[0, 0.009, 0]} scale={[1.02, 0.76]} opacity={0.5} texture={shadowTexture} />

      <RoundedBox size={[0.94, 0.016, 0.68]} radius={0.02} segments={2} position={[0, 0.012, 0]}>
        <meshStandardMaterial color="#201b15" roughness={0.9} metalness={0.04} />
      </RoundedBox>

      <group position={[0, 0.03, 0]} rotation={[0, 0.05, 0]}>
        <RoundedBox
          size={[0.58, 0.075, 0.42]}
          radius={0.012}
          segments={2}
          position={[-0.02, 0.045, 0.02]}
          castShadow
        >
          <meshStandardMaterial color="#223a31" roughness={0.7} metalness={0.08} />
        </RoundedBox>
        <RoundedBox
          size={[0.53, 0.045, 0.38]}
          radius={0.009}
          segments={2}
          position={[0.03, 0.105, 0.01]}
          castShadow
        >
          <meshStandardMaterial color="#d8cbb4" roughness={0.92} />
        </RoundedBox>
        <RoundedBox
          size={[0.55, 0.016, 0.4]}
          radius={0.006}
          segments={2}
          position={[0.03, 0.136, 0.01]}
          castShadow
        >
          <meshStandardMaterial color="#5d3022" roughness={0.66} metalness={0.06} />
        </RoundedBox>

        <group position={[0, 0.165, 0]} rotation={[0.04, 0, 0]}>
          <group position={[-0.195, 0.018, 0]} rotation={[0, 0, 0.09]}>
            <RoundedBox size={[0.4, 0.022, 0.52]} radius={0.006} segments={2} castShadow>
              <meshStandardMaterial color="#4c2b20" roughness={0.66} metalness={0.05} />
            </RoundedBox>
            <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.37, 0.49]} />
              <meshStandardMaterial map={leftPage} roughness={0.94} metalness={0} />
            </mesh>
          </group>

          <group position={[0.195, 0.018, 0]} rotation={[0, 0, -0.09]}>
            <RoundedBox size={[0.4, 0.022, 0.52]} radius={0.006} segments={2} castShadow>
              <meshStandardMaterial color="#4c2b20" roughness={0.66} metalness={0.05} />
            </RoundedBox>
            <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.37, 0.49]} />
              <meshStandardMaterial map={rightPage} roughness={0.94} metalness={0} />
            </mesh>
          </group>

          <mesh position={[0, 0.014, 0]}>
            <boxGeometry args={[0.038, 0.06, 0.52]} />
            <meshStandardMaterial color="#3b2118" roughness={0.72} />
          </mesh>

          <mesh position={[0.09, 0.026, 0.25]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.06, 0.006, 0.17]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={active ? 0.8 : 0.4}
              roughness={0.48}
            />
          </mesh>
        </group>
      </group>

      {quality !== "low" && (
        <mesh position={[0.35, 0.024, 0.22]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.12, 0.006, 0.03]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      )}
    </group>
  );
}

function TechSkillHubArtifact({ materials, accent, active, quality, shadowTexture }) {
  const screen = useCanvasTexture(512, 320, drawTechScreen, []);
  const keyboard = useCanvasTexture(512, 256, drawKeyboard, []);

  return (
    <group>
      <SoftShadow position={[0, 0.009, 0]} scale={[1.02, 0.8]} opacity={0.48} texture={shadowTexture} />

      <group position={[0, 0.018, 0]}>
        <RoundedBox size={[0.78, 0.03, 0.5]} radius={0.012} segments={3} position={[0, 0.015, 0]} castShadow>
          <primitive object={materials.blackMetal} attach="material" />
        </RoundedBox>
        <mesh position={[0, 0.032, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.68, 0.34]} />
          <meshStandardMaterial map={keyboard} roughness={0.62} metalness={0.16} />
        </mesh>
        <RoundedBox size={[0.18, 0.004, 0.1]} radius={0.005} segments={2} position={[0, 0.034, 0.17]}>
          <meshStandardMaterial color="#2a2824" roughness={0.3} metalness={0.52} />
        </RoundedBox>

        <group position={[0, 0.03, -0.235]} rotation={[-0.28, 0, 0]}>
          <RoundedBox size={[0.78, 0.5, 0.024]} radius={0.012} segments={3} position={[0, 0.25, 0]} castShadow>
            <primitive object={materials.blackMetal} attach="material" />
          </RoundedBox>
          <Screen texture={screen} size={[0.7, 0.42]} position={[0, 0.25, 0.014]} materials={materials} />
          <mesh position={[0, 0.25, 0.017]}>
            <circleGeometry args={[0.007, 12]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {quality !== "low" && (
        <group position={[-0.44, 0.03, 0.06]} rotation={[0, 0.25, 0]}>
          <RoundedBox size={[0.24, 0.01, 0.32]} radius={0.005} segments={2} position={[0, 0.02, 0]}>
            <meshStandardMaterial color="#e7dfd1" roughness={0.86} />
          </RoundedBox>
          <RoundedBox
            size={[0.23, 0.008, 0.31]}
            radius={0.005}
            segments={2}
            position={[0.02, 0.032, 0.01]}
            rotation={[0, 0.08, 0]}
          >
            <meshStandardMaterial color="#9fe0c1" roughness={0.58} metalness={0.08} />
          </RoundedBox>
          <mesh position={[0.02, 0.037, 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.18, 0.05]} />
            <meshBasicMaterial color="#0d1b18" toneMapped={false} />
          </mesh>
        </group>
      )}

      {quality !== "low" && (
        <mesh position={[0.34, 0.035, 0.16]} rotation={[0, 0.4, Math.PI / 2]}>
          <cylinderGeometry args={[0.006, 0.006, 0.26, 8]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      )}
    </group>
  );
}

const CONTOUR_POINTS = [
  [-0.38, -0.16],
  [-0.3, -0.25],
  [-0.12, -0.27],
  [0.06, -0.24],
  [0.22, -0.28],
  [0.36, -0.2],
  [0.38, -0.05],
  [0.32, 0.1],
  [0.18, 0.2],
  [0.02, 0.24],
  [-0.16, 0.22],
  [-0.3, 0.16],
  [-0.38, 0.04],
];

function ContourLayer({ scale, y, color, active }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    CONTOUR_POINTS.forEach(([x, z], index) => {
      const px = x * scale;
      const pz = z * scale;
      if (index === 0) shape.moveTo(px, pz);
      else shape.lineTo(px, pz);
    });
    shape.closePath();
    const next = new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: false,
      steps: 1,
    });
    next.rotateX(-Math.PI / 2);
    return next;
  }, [scale]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} position={[0, y, 0.02]} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.88}
        metalness={0.04}
        emissive={color}
        emissiveIntensity={active ? 0.08 : 0.025}
      />
    </mesh>
  );
}

function FloodMonitorArtifact({ materials, accent, active, quality, shadowTexture }) {
  const screen = useCanvasTexture(512, 320, drawFloodScreen, []);
  const riverGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.34, 0.122, -0.08),
      new THREE.Vector3(-0.16, 0.122, 0.02),
      new THREE.Vector3(0.02, 0.122, 0.07),
      new THREE.Vector3(0.2, 0.122, -0.02),
      new THREE.Vector3(0.34, 0.122, 0.1),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.011, 6, false);
  }, []);

  useEffect(() => () => riverGeometry.dispose(), [riverGeometry]);

  return (
    <group>
      <SoftShadow position={[0, 0.009, 0]} scale={[1.04, 0.82]} opacity={0.5} texture={shadowTexture} />

      <RoundedBox
        size={[0.82, 0.055, 0.58]}
        radius={0.012}
        segments={3}
        position={[0, 0.032, 0.02]}
        castShadow
        receiveShadow
      >
        <primitive object={materials.stoneDark} attach="material" />
      </RoundedBox>

      <ContourLayer scale={1} y={0.06} color="#4d4232" active={active} />
      <ContourLayer scale={0.78} y={0.078} color="#665743" active={active} />
      <ContourLayer scale={0.56} y={0.096} color="#7d6a50" active={active} />

      <mesh geometry={riverGeometry} castShadow>
        <meshStandardMaterial
          color="#6fb8a8"
          emissive="#2b6b60"
          emissiveIntensity={active ? 1 : 0.55}
          roughness={0.24}
          metalness={0.12}
        />
      </mesh>

      {quality !== "low" &&
        [
          [-0.22, 0.12, 0.1],
          [0.1, 0.12, -0.12],
          [0.26, 0.12, 0.05],
        ].map(([x, y, z], index) => (
          <group key={index} position={[x, y, z]}>
            <mesh>
              <cylinderGeometry args={[0.008, 0.012, 0.06, 8]} />
              <primitive object={materials.brass} attach="material" />
            </mesh>
            <mesh position={[0, 0.034, 0]}>
              <sphereGeometry args={[0.012, 10, 10]} />
              <meshStandardMaterial
                color={accent}
                emissive={accent}
                emissiveIntensity={active ? 1.2 : 0.7}
                roughness={0.35}
              />
            </mesh>
          </group>
        ))}

      <group position={[0.27, 0.05, -0.34]}>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.009, 0.012, 0.18, 8]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.016, 16]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
        <group position={[0, 0.26, 0]} rotation={[0, -0.16, 0]}>
          <Screen texture={screen} size={[0.31, 0.21]} materials={materials} />
        </group>
      </group>
    </group>
  );
}

function ProductCard({ position, rotation, color, accent, materials }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox size={[0.16, 0.24, 0.014]} radius={0.008} segments={2} castShadow>
        <meshStandardMaterial color="#e9e0d2" roughness={0.82} />
      </RoundedBox>
      <mesh position={[0, 0.035, 0.009]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.72} />
      </mesh>
      <mesh position={[0, -0.055, 0.009]}>
        <planeGeometry args={[0.08, 0.004]} />
        <meshBasicMaterial color="#3a342b" toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.074, 0.009]}>
        <planeGeometry args={[0.1, 0.008]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.1, 0.009]}>
        <planeGeometry args={[0.05, 0.003]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>
    </group>
  );
}

function ElroiArtifact({ materials, accent, active, quality, shadowTexture }) {
  const screen = useCanvasTexture(512, 320, drawElroiScreen, []);

  return (
    <group>
      <SoftShadow position={[0, 0.009, 0]} scale={[1.04, 0.8]} opacity={0.5} texture={shadowTexture} />

      <RoundedBox
        size={[0.82, 0.035, 0.44]}
        radius={0.012}
        segments={2}
        position={[0, 0.02, -0.04]}
        castShadow
        receiveShadow
      >
        <primitive object={materials.stoneDark} attach="material" />
      </RoundedBox>

      <RoundedBox
        size={[0.8, 0.5, 0.04]}
        radius={0.012}
        segments={3}
        position={[0, 0.3, -0.19]}
        castShadow
      >
        <primitive object={materials.woodDark} attach="material" />
      </RoundedBox>
      <Screen
        texture={screen}
        size={[0.7, 0.4]}
        position={[0, 0.3, -0.166]}
        materials={materials}
      />

      {[-0.36, 0.36].map((x) => (
        <mesh key={x} position={[x, 0.31, -0.162]}>
          <boxGeometry args={[0.012, 0.44, 0.012]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      ))}
      {[-0.212, 0.212].map((y) => (
        <mesh key={y} position={[0, 0.31 + y, -0.162]}>
          <boxGeometry args={[0.74, 0.012, 0.012]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      ))}

      {[-0.28, 0.28].map((x) => (
        <mesh key={x} position={[x, 0.1, -0.18]}>
          <cylinderGeometry args={[0.012, 0.012, 0.14, 8]} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      ))}

      <ProductCard
        position={[-0.25, 0.135, 0.16]}
        rotation={[0, -0.14, 0]}
        color="#b86a4b"
        accent={accent}
        materials={materials}
      />
      <ProductCard
        position={[0, 0.135, 0.2]}
        rotation={[0, 0, 0]}
        color="#d6c4a7"
        accent={accent}
        materials={materials}
      />
      {quality !== "low" && (
        <>
          <ProductCard
            position={[0.25, 0.135, 0.16]}
            rotation={[0, 0.14, 0]}
            color="#2d302a"
            accent={accent}
            materials={materials}
          />
          <group position={[0.34, 0.07, -0.02]}>
            <RoundedBox size={[0.17, 0.12, 0.15]} radius={0.008} segments={2} castShadow>
              <meshStandardMaterial color="#8a6a4a" roughness={0.88} />
            </RoundedBox>
            <mesh position={[0, 0, 0.076]}>
              <boxGeometry args={[0.025, 0.122, 0.004]} />
              <primitive object={materials.brass} attach="material" />
            </mesh>
            <mesh position={[0.0, 0.02, 0]}>
              <boxGeometry args={[0.172, 0.025, 0.152]} />
              <primitive object={materials.brassDark} attach="material" />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
}

function AnimatedSpot({ position, target, active, castShadow, quality }) {
  const lightRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!lightRef.current || !targetRef.current) return;
    lightRef.current.target = targetRef.current;
    targetRef.current.updateMatrixWorld();
  }, []);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    const goal = active ? 92 : 62;
    lightRef.current.intensity = THREE.MathUtils.damp(
      lightRef.current.intensity,
      goal,
      4.5,
      Math.min(delta, 0.05)
    );
  });

  return (
    <group>
      <spotLight
        ref={lightRef}
        position={position}
        color="#ffe0bb"
        intensity={62}
        angle={0.4}
        penumbra={0.9}
        distance={7}
        decay={1.35}
        castShadow={castShadow}
        shadow-mapSize-width={quality === "low" ? 512 : 1024}
        shadow-mapSize-height={quality === "low" ? 512 : 1024}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
        shadow-camera-near={0.4}
        shadow-camera-far={7}
      />
      <object3D ref={targetRef} position={target} />
      <LightFixture position={position} color="#ffe0bb" />
    </group>
  );
}

function Plinth({ size, materials, accentMaterial, accent, project, shadowTexture }) {
  const [width, height, depth] = size;
  const panelWidth = Math.max(0.62, width - 0.2);
  const panelHeight = height - 0.44;

  return (
    <group>
      <SoftShadow
        position={[0, 0.012, 0]}
        scale={[width + 0.95, depth + 0.95]}
        opacity={0.56}
        texture={shadowTexture}
      />

      <RoundedBox
        size={[width + 0.34, 0.08, depth + 0.34]}
        radius={0.016}
        segments={2}
        position={[0, 0.04, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={materials.stone} attach="material" />
      </RoundedBox>

      <RoundedBox
        size={[width + 0.18, 0.1, depth + 0.18]}
        radius={0.014}
        segments={2}
        position={[0, 0.13, 0]}
        castShadow
      >
        <primitive object={materials.woodDark} attach="material" />
      </RoundedBox>

      <mesh position={[0, 0.18 + (height - 0.24) / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height - 0.24, depth]} />
        <primitive object={materials.stone} attach="material" />
      </mesh>

      <RoundedBox
        size={[panelWidth, panelHeight, 0.024]}
        radius={0.01}
        segments={2}
        position={[0, 0.18 + (height - 0.24) / 2, depth / 2 + 0.012]}
      >
        <primitive object={materials.woodDark} attach="material" />
      </RoundedBox>

      {[
        { position: [0, 0.18 + 0.02, depth / 2 + 0.027], size: [panelWidth, 0.018, 0.012] },
        { position: [0, height - 0.08, depth / 2 + 0.027], size: [panelWidth, 0.018, 0.012] },
        { position: [-panelWidth / 2, 0.18 + panelHeight / 2, depth / 2 + 0.027], size: [0.018, panelHeight, 0.012] },
        { position: [panelWidth / 2, 0.18 + panelHeight / 2, depth / 2 + 0.027], size: [0.018, panelHeight, 0.012] },
      ].map((bar) => (
        <mesh key={bar.position.join(",")} position={bar.position}>
          <boxGeometry args={bar.size} />
          <primitive object={materials.brassDark} attach="material" />
        </mesh>
      ))}

      <mesh position={[0, height - 0.045, depth / 2 + 0.018]}>
        <boxGeometry args={[width - 0.08, 0.012, 0.012]} />
        <primitive object={accentMaterial} attach="material" />
      </mesh>

      <RoundedBox
        size={[width + 0.12, 0.06, depth + 0.12]}
        radius={0.012}
        segments={2}
        position={[0, height + 0.03, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={materials.wood} attach="material" />
      </RoundedBox>

      <group position={[0, 0.62, depth / 2 + 0.03]}>
        <RoundedBox size={[0.9, 0.44, 0.025]} radius={0.008} segments={2} position={[0, 0, 0]}>
          <primitive object={materials.blackMetal} attach="material" />
        </RoundedBox>
        {[
          { position: [0, 0.215, 0.016], size: [0.9, 0.012, 0.012] },
          { position: [0, -0.215, 0.016], size: [0.9, 0.012, 0.012] },
          { position: [-0.445, 0, 0.016], size: [0.012, 0.44, 0.012] },
          { position: [0.445, 0, 0.016], size: [0.012, 0.44, 0.012] },
        ].map((bar) => (
          <mesh key={bar.position.join(",")} position={bar.position}>
            <boxGeometry args={bar.size} />
            <primitive object={materials.brass} attach="material" />
          </mesh>
        ))}
        <LabelPlane
          position={[0, 0, 0.018]}
          size={[0.8, 0.38]}
          kicker={`${project.number} / ${project.category.toUpperCase()}`}
          title={project.name.toUpperCase()}
          subtitle={project.role}
          footer="AWESOME AKOKAYO / SELECTED WORK"
          variant="plaque"
          accent={accent}
          lit
        />
      </group>

      <mesh position={[0, 0.015, depth / 2 + 0.42]}>
        <boxGeometry args={[0.02, 0.006, 0.42]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>
      <LabelPlane
        position={[0, 0.022, depth / 2 + 0.85]}
        rotation={[-Math.PI / 2, 0, 0]}
        size={[0.34, 0.34]}
        kicker={project.number}
        variant="number"
        accent={accent}
      />
    </group>
  );
}

const ARTIFACTS = {
  openbooks: OpenBooksArtifact,
  techskillhub: TechSkillHubArtifact,
  "southwest-flood-monitor": FloodMonitorArtifact,
  "elroi-hub": ElroiArtifact,
};

export default function Exhibit({
  exhibit,
  hovered,
  near,
  onHover,
  onSelect,
  materials,
  quality,
  shadowTexture,
  lightY = 4.9,
  fixedLight = false,
}) {
  const { project, position, rotation, size, accent } = exhibit;
  const Artifact = ARTIFACTS[project.slug] || OpenBooksArtifact;
  const active = hovered || near || fixedLight;
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.18,
        roughness: 0.34,
        metalness: 0.42,
      }),
    [accent]
  );

  useEffect(() => () => accentMaterial.dispose(), [accentMaterial]);

  useFrame((_, delta) => {
    accentMaterial.emissiveIntensity = THREE.MathUtils.damp(
      accentMaterial.emissiveIntensity,
      active ? 0.75 : 0.16,
      5,
      Math.min(delta, 0.05)
    );
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Plinth
        size={size}
        materials={materials}
        accentMaterial={accentMaterial}
        accent={accent}
        project={project}
        shadowTexture={shadowTexture}
      />

      <group position={[0, size[1] + 0.06, 0]}>
        <Artifact
          materials={materials}
          accent={accent}
          active={active}
          quality={quality}
          shadowTexture={shadowTexture}
        />
      </group>

      <AnimatedSpot
        position={[0, lightY, size[2] / 2 + 0.24]}
        target={[0, size[1] + 0.36, 0]}
        active={active}
        castShadow={quality === "high" && Boolean(project.featured)}
        quality={quality}
      />

      <mesh
        position={[0, 1.15, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(project);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHover(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (event.delta > 6) return;
          onSelect(project);
        }}
      >
        <boxGeometry args={[size[0] + 0.38, 2.3, size[2] + 0.38]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
    </group>
  );
}
