import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function makeEnvironmentCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, "#241f18");
  sky.addColorStop(0.28, "#3d2f21");
  sky.addColorStop(0.52, "#6b4b2f");
  sky.addColorStop(0.7, "#2a2118");
  sky.addColorStop(1, "#090806");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const lights = [
    [70, 58, 92, 0.5],
    [190, 42, 64, 0.38],
    [338, 62, 108, 0.44],
    [458, 48, 72, 0.32],
    [258, 104, 140, 0.2],
  ];

  for (const [x, y, radius, alpha] of lights) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, `rgba(255, 226, 181, ${alpha})`);
    glow.addColorStop(0.28, `rgba(255, 199, 133, ${alpha * 0.5})`);
    glow.addColorStop(1, "rgba(255, 190, 120, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const floorGlow = ctx.createLinearGradient(0, 150, 0, 256);
  floorGlow.addColorStop(0, "rgba(88, 60, 36, 0)");
  floorGlow.addColorStop(0.45, "rgba(88, 60, 36, .18)");
  floorGlow.addColorStop(1, "rgba(18, 13, 9, 0)");
  ctx.fillStyle = floorGlow;
  ctx.fillRect(0, 150, canvas.width, 106);

  return canvas;
}

export default function RoomEnvironment({ intensity = 0.34 }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const canvas = makeEnvironmentCanvas();
    const source = new THREE.CanvasTexture(canvas);
    source.mapping = THREE.EquirectangularReflectionMapping;
    source.colorSpace = THREE.SRGBColorSpace;
    source.needsUpdate = true;

    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const target = pmrem.fromEquirectangular(source);
    const environment = target.texture;

    scene.environment = environment;
    scene.environmentIntensity = intensity;

    source.dispose();
    pmrem.dispose();

    return () => {
      if (scene.environment === environment) scene.environment = null;
      scene.environmentIntensity = 1;
      environment.dispose();
      target.dispose();
    };
  }, [gl, scene, intensity]);

  return null;
}
