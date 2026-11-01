import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const MONO = '"Space Mono", monospace';
const DISPLAY = '"Ojuju", "Space Grotesk", sans-serif';

function wrap(ctx, text, maxWidth) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * BoardPlane — a museum information board with real rows (LabelPlane draws
 * single-purpose plaques; workshop and studio walls need structured lists).
 */
export default function BoardPlane({
  position,
  rotation,
  size = [3.0, 2.0],
  kicker,
  title,
  rows = [],
  footer,
  accent = "#ff5c00",
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 660;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "#131109");
      bg.addColorStop(0.55, "#0c0b09");
      bg.addColorStop(1, "#161210");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(244, 243, 239, .14)";
      ctx.lineWidth = 3;
      ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

      ctx.fillStyle = accent;
      ctx.fillRect(46, 52, 8, 66);

      ctx.font = `700 26px ${MONO}`;
      drawTracked(ctx, kicker || "", 74, 76, 2);
      ctx.font = `500 58px ${DISPLAY}`;
      ctx.fillStyle = "#f4f3ef";
      ctx.fillText(title || "", 74, 116);

      let y = 196;
      rows.forEach((row) => {
        if (y > canvas.height - 96) return;
        if (row.rule !== false) {
          ctx.strokeStyle = "rgba(244, 243, 239, .1)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(48, y - 26);
          ctx.lineTo(canvas.width - 48, y - 26);
          ctx.stroke();
        }
        ctx.fillStyle = "#f4f3ef";
        ctx.font = `700 27px ${MONO}`;
        ctx.fillText(row.label, 52, y);
        y += 34;

        ctx.fillStyle = "#a7a294";
        ctx.font = `400 22px ${MONO}`;
        for (const line of wrap(ctx, row.body, canvas.width - 130)) {
          ctx.fillText(line, 52, y);
          y += 28;
        }
        y += 26;
      });

      if (footer) {
        ctx.fillStyle = "#6e6a62";
        ctx.font = `400 19px ${MONO}`;
        drawTracked(ctx, footer, 52, canvas.height - 54, 1.5);
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(canvas.width - 62, canvas.height - 58, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const next = new THREE.CanvasTexture(canvas);
    next.colorSpace = THREE.SRGBColorSpace;
    next.anisotropy = 8;
    next.needsUpdate = true;
    return next;
  }, [kicker, title, rows, footer, accent]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.014]} castShadow>
        <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.03]} />
        <meshStandardMaterial color="#14110d" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function drawTracked(ctx, text, x, y, tracking) {
  let cursor = x;
  for (const character of String(text)) {
    ctx.fillText(character, cursor, y);
    cursor += ctx.measureText(character).width + tracking;
  }
}
