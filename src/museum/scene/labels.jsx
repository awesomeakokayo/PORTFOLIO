import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const MONO = '"Space Mono", monospace';
const DISPLAY = '"Ojuju", "Space Grotesk", sans-serif';

function setFittedFont(ctx, text, maxWidth, startSize, weight = 700, family = MONO) {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${family}`;

  while (size > 18 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }

  return size;
}

function drawTrackedText(ctx, text, x, y, tracking) {
  let cursor = x;
  for (const character of text) {
    ctx.fillText(character, cursor, y);
    cursor += ctx.measureText(character).width + tracking;
  }
}

function makeLabelTexture({
  kicker,
  title,
  subtitle,
  footer,
  variant = "panel",
  accent = "#ff5c00",
}) {
  const isTitle = variant === "title";
  const isPlaque = variant === "plaque";
  const isNumber = variant === "number";

  const canvas = document.createElement("canvas");
  canvas.width = isNumber ? 512 : 1024;
  canvas.height = isNumber ? 512 : 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isNumber) {
    ctx.fillStyle = "rgba(10, 9, 7, .82)";
    ctx.beginPath();
    ctx.arc(256, 256, 246, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(256, 256, 228, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f4f3ef";
    setFittedFont(ctx, kicker || "01", 360, 190, 700, MONO);
    ctx.textAlign = "center";
    ctx.fillText(kicker || "01", 256, 318);
    ctx.textAlign = "left";
    return canvas;
  }

  if (!isTitle) {
    const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, "#12110e");
    background.addColorStop(0.55, "#0c0b09");
    background.addColorStop(1, "#15130f");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(512, 200, 0, 512, 200, 540);
    glow.addColorStop(0, "rgba(201, 162, 106, .07)");
    glow.addColorStop(1, "rgba(201, 162, 106, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(244, 243, 239, .12)";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  }

  if (isPlaque) {
    ctx.fillStyle = accent;
    ctx.fillRect(56, 84, 7, 220);

    ctx.fillStyle = accent;
    ctx.font = `700 27px ${MONO}`;
    drawTrackedText(ctx, kicker || "", 86, 126, 1.4);

    ctx.fillStyle = "#f4f3ef";
    setFittedFont(ctx, title || "", 890, 98, 700, DISPLAY);
    ctx.fillText(title || "", 84, 262);

    if (subtitle) {
      ctx.fillStyle = "#a7a39a";
      setFittedFont(ctx, subtitle, 850, 27, 400, MONO);
      ctx.fillText(subtitle, 86, 322);
    }

    ctx.strokeStyle = "rgba(244, 243, 239, .16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(86, 386);
    ctx.lineTo(938, 386);
    ctx.stroke();

    ctx.fillStyle = "#77736a";
    ctx.font = `400 21px ${MONO}`;
    drawTrackedText(ctx, footer || "AWESOME AKOKAYO / ARRIVAL COURT", 86, 434, 1.2);

    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(916, 426, 7, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  }

  if (isTitle) {
    ctx.fillStyle = accent;
    ctx.font = `700 25px ${MONO}`;
    drawTrackedText(ctx, kicker || "", 8, 96, 5);

    ctx.fillStyle = "#f4f3ef";
    setFittedFont(ctx, title || "", 990, 138, 500, DISPLAY);
    ctx.fillText(title || "", 4, 266);

    if (subtitle) {
      ctx.fillStyle = "#8f8a80";
      ctx.font = `400 24px ${MONO}`;
      drawTrackedText(ctx, subtitle, 8, 344, 3);
    }

    ctx.fillStyle = accent;
    ctx.fillRect(8, 390, 128, 3);

    return canvas;
  }

  ctx.fillStyle = accent;
  ctx.font = `700 27px ${MONO}`;
  drawTrackedText(ctx, kicker || "", 54, 96, 2);

  ctx.fillStyle = "#f4f3ef";
  setFittedFont(ctx, title || "", 910, 96, 700, DISPLAY);
  ctx.fillText(title || "", 50, 246);

  if (subtitle) {
    ctx.fillStyle = "#aaa59b";
    setFittedFont(ctx, subtitle, 880, 26, 400, MONO);
    ctx.fillText(subtitle, 54, 322);
  }

  ctx.fillStyle = "#6e6a62";
  ctx.font = `400 21px ${MONO}`;
  drawTrackedText(ctx, footer || "AWESOME AKOKAYO / ARRIVAL COURT", 54, 440, 1.2);

  return canvas;
}

export function useLabelTexture(options) {
  const texture = useMemo(() => {
    const canvas = makeLabelTexture(options);
    const next = new THREE.CanvasTexture(canvas);
    next.colorSpace = THREE.SRGBColorSpace;
    next.anisotropy = 8;
    next.needsUpdate = true;
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.kicker,
    options.title,
    options.subtitle,
    options.footer,
    options.variant,
    options.accent,
  ]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

export function LabelPlane({
  position,
  rotation = [0, 0, 0],
  size = [2.6, 1.3],
  kicker,
  title,
  subtitle,
  footer,
  variant = "panel",
  accent = "#ff5c00",
  lit = false,
}) {
  const texture = useLabelTexture({ kicker, title, subtitle, footer, variant, accent });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      {lit ? (
        <meshStandardMaterial
          map={texture}
          roughness={0.58}
          metalness={0.08}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.12}
          side={THREE.FrontSide}
        />
      ) : (
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  );
}
