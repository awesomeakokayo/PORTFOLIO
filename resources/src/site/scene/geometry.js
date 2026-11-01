import * as THREE from "three";

/**
 * A rounded rectangular slab, extruded on Z.
 * The caller rotates it -90deg on X to lay it flat in the scene.
 */
export function roundedSlabGeometry(width, height, depth, radius) {
  const x = -width / 2;
  const y = -height / 2;

  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: Math.min(radius * 0.7, depth * 0.42),
    bevelThickness: Math.min(radius * 0.7, depth * 0.42),
    curveSegments: 10,
  });

  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

export function easeInOut(value) {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}
