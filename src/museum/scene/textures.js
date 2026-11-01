import { useEffect, useMemo } from "react";
import * as THREE from "three";

function mulberry32(seed) {
  let value = seed;

  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCanvas(width, height = width) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function finishTexture(canvas, { repeat = [1, 1], srgb = true } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function fillNoise(ctx, size, random, count, alpha, light = false) {
  for (let index = 0; index < count; index += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = 0.4 + random() * 1.4;
    ctx.fillStyle = light
      ? `rgba(255, 242, 220, ${alpha * random()})`
      : `rgba(0, 0, 0, ${alpha * random()})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function makeFloorTextures(size) {
  const random = mulberry32(7319);
  const color = makeCanvas(size);
  const bump = makeCanvas(size);
  const colorCtx = color.getContext("2d");
  const bumpCtx = bump.getContext("2d");
  const slabs = 4;
  const slab = size / slabs;

  colorCtx.fillStyle = "#2a251e";
  colorCtx.fillRect(0, 0, size, size);
  bumpCtx.fillStyle = "#101010";
  bumpCtx.fillRect(0, 0, size, size);

  for (let row = 0; row < slabs; row += 1) {
    for (let column = 0; column < slabs; column += 1) {
      const x = column * slab + 3;
      const y = row * slab + 3;
      const width = slab - 6;
      const height = slab - 6;
      const shade = 64 + Math.floor(random() * 14);
      const warm = Math.floor(random() * 4);

      colorCtx.fillStyle = `rgb(${shade + warm}, ${shade + warm - 2}, ${shade - 3})`;
      colorCtx.fillRect(x, y, width, height);

      bumpCtx.fillStyle = `rgb(${126 + Math.floor(random() * 24)}, ${126 + Math.floor(random() * 24)}, ${126 + Math.floor(random() * 24)})`;
      bumpCtx.fillRect(x, y, width, height);

      for (let vein = 0; vein < 8; vein += 1) {
        colorCtx.strokeStyle = `rgba(${random() > 0.5 ? "188, 168, 138" : "6, 6, 5"}, ${0.025 + random() * 0.05})`;
        colorCtx.lineWidth = 0.6 + random() * 1.4;
        colorCtx.beginPath();
        const startX = x + random() * width;
        const startY = y + random() * height;
        colorCtx.moveTo(startX, startY);
        colorCtx.bezierCurveTo(
          startX + (random() - 0.5) * 90,
          startY + (random() - 0.5) * 90,
          startX + (random() - 0.5) * 150,
          startY + (random() - 0.5) * 150,
          startX + (random() - 0.5) * 210,
          startY + (random() - 0.5) * 210
        );
        colorCtx.stroke();
      }

      colorCtx.strokeStyle = "rgba(244, 238, 224, .055)";
      colorCtx.lineWidth = 1;
      colorCtx.strokeRect(x + 1, y + 1, width - 2, height - 2);
    }
  }

  fillNoise(colorCtx, size, random, Math.floor(size * 7), 0.09, true);
  fillNoise(colorCtx, size, random, Math.floor(size * 9), 0.12, false);
  fillNoise(bumpCtx, size, random, Math.floor(size * 10), 0.22, false);

  return {
    map: finishTexture(color, { repeat: [2.2, 2.2] }),
    bumpMap: finishTexture(bump, { repeat: [2.2, 2.2], srgb: false }),
  };
}

function makePlasterTextures(size) {
  const random = mulberry32(9021);
  const color = makeCanvas(size);
  const bump = makeCanvas(size);
  const colorCtx = color.getContext("2d");
  const bumpCtx = bump.getContext("2d");

  colorCtx.fillStyle = "#6f5a44";
  colorCtx.fillRect(0, 0, size, size);
  bumpCtx.fillStyle = "#7d7d7d";
  bumpCtx.fillRect(0, 0, size, size);

  for (let patch = 0; patch < 34; patch += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = 12 + random() * size * 0.22;
    const gradient = colorCtx.createRadialGradient(x, y, 0, x, y, radius);
    const light = random() > 0.55;
    gradient.addColorStop(0, light ? "rgba(126, 103, 74, .10)" : "rgba(4, 4, 3, .10)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    colorCtx.fillStyle = gradient;
    colorCtx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  for (let stroke = 0; stroke < 130; stroke += 1) {
    colorCtx.strokeStyle = `rgba(${random() > 0.5 ? "196, 169, 126" : "0, 0, 0"}, ${0.015 + random() * 0.04})`;
    colorCtx.lineWidth = 0.5 + random() * 1.2;
    colorCtx.beginPath();
    const x = random() * size;
    const y = random() * size;
    colorCtx.moveTo(x, y);
    colorCtx.quadraticCurveTo(x + (random() - 0.5) * 80, y + random() * 40, x + (random() - 0.5) * 140, y + random() * 80);
    colorCtx.stroke();
  }

  fillNoise(colorCtx, size, random, Math.floor(size * 8), 0.11, true);
  fillNoise(colorCtx, size, random, Math.floor(size * 8), 0.14, false);
  fillNoise(bumpCtx, size, random, Math.floor(size * 14), 0.28, false);

  return {
    map: finishTexture(color, { repeat: [2, 1.4] }),
    bumpMap: finishTexture(bump, { repeat: [2, 1.4], srgb: false }),
  };
}

function makeWoodTextures(size) {
  const random = mulberry32(4431);
  const color = makeCanvas(size, size / 2);
  const bump = makeCanvas(size, size / 2);
  const colorCtx = color.getContext("2d");
  const bumpCtx = bump.getContext("2d");
  const height = size / 2;

  colorCtx.fillStyle = "#6b4f35";
  colorCtx.fillRect(0, 0, size, height);
  bumpCtx.fillStyle = "#8a8a8a";
  bumpCtx.fillRect(0, 0, size, height);

  for (let line = 0; line < 120; line += 1) {
    const x = random() * size;
    const width = 0.5 + random() * 2.4;
    const light = random() > 0.48;
    colorCtx.strokeStyle = light
      ? `rgba(142, 104, 62, ${0.05 + random() * 0.13})`
      : `rgba(15, 9, 5, ${0.08 + random() * 0.18})`;
    colorCtx.lineWidth = width;
    colorCtx.beginPath();
    colorCtx.moveTo(x, 0);
    colorCtx.bezierCurveTo(
      x + (random() - 0.5) * 22,
      height * 0.33,
      x + (random() - 0.5) * 26,
      height * 0.66,
      x + (random() - 0.5) * 18,
      height
    );
    colorCtx.stroke();

    bumpCtx.strokeStyle = light ? "rgba(255, 255, 255, .18)" : "rgba(0, 0, 0, .22)";
    bumpCtx.lineWidth = width;
    bumpCtx.beginPath();
    bumpCtx.moveTo(x, 0);
    bumpCtx.bezierCurveTo(
      x + (random() - 0.5) * 22,
      height * 0.33,
      x + (random() - 0.5) * 26,
      height * 0.66,
      x + (random() - 0.5) * 18,
      height
    );
    bumpCtx.stroke();
  }

  for (let knot = 0; knot < 4; knot += 1) {
    const x = random() * size;
    const y = random() * height;
    const radius = 6 + random() * 12;
    const gradient = colorCtx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(8, 5, 3, .34)");
    gradient.addColorStop(0.6, "rgba(96, 66, 37, .16)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    colorCtx.fillStyle = gradient;
    colorCtx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  return {
    map: finishTexture(color, { repeat: [1, 1.6] }),
    bumpMap: finishTexture(bump, { repeat: [1, 1.6], srgb: false }),
  };
}

function makeFabricTexture(size = 256) {
  const random = mulberry32(1187);
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#6b513b";
  ctx.fillRect(0, 0, size, size);

  for (let x = 0; x < size; x += 3) {
    ctx.fillStyle = `rgba(255, 220, 180, ${0.018 + random() * 0.025})`;
    ctx.fillRect(x, 0, 1, size);
  }

  for (let y = 0; y < size; y += 3) {
    ctx.fillStyle = `rgba(0, 0, 0, ${0.02 + random() * 0.03})`;
    ctx.fillRect(0, y, size, 1);
  }

  fillNoise(ctx, size, random, 2600, 0.08, true);
  fillNoise(ctx, size, random, 2200, 0.1, false);

  return finishTexture(canvas, { repeat: [2.4, 2.4] });
}

function makeShadowTexture(size = 256) {
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(0, 0, 0, .68)");
  gradient.addColorStop(0.32, "rgba(0, 0, 0, .46)");
  gradient.addColorStop(0.62, "rgba(0, 0, 0, .18)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function useRoomTextures(quality = "high") {
  const textures = useMemo(() => {
    const floorSize = quality === "low" ? 512 : 1024;
    const surfaceSize = quality === "low" ? 256 : 512;
    return {
      floor: makeFloorTextures(floorSize),
      plaster: makePlasterTextures(surfaceSize),
      wood: makeWoodTextures(surfaceSize),
      fabric: makeFabricTexture(256),
      shadow: makeShadowTexture(256),
    };
  }, [quality]);

  useEffect(
    () => () => {
      [textures.floor, textures.plaster, textures.wood].forEach((group) => {
        Object.values(group).forEach((texture) => texture?.dispose?.());
      });
      textures.fabric.dispose();
      textures.shadow.dispose();
    },
    [textures]
  );

  return textures;
}
