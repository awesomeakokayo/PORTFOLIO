import { useEffect, useMemo } from "react";
import * as THREE from "three";

function standard(options) {
  return new THREE.MeshStandardMaterial(options);
}

export function useRoomMaterials(textures) {
  const materials = useMemo(() => {
    const floor = standard({
      map: textures.floor.map,
      bumpMap: textures.floor.bumpMap,
      bumpScale: 0.022,
      color: "#ffffff",
      roughness: 0.4,
      metalness: 0.14,
      envMapIntensity: 0.9,
    });

    const plaster = standard({
      map: textures.plaster.map,
      bumpMap: textures.plaster.bumpMap,
      bumpScale: 0.028,
      color: "#ffffff",
      roughness: 0.96,
      metalness: 0.015,
      envMapIntensity: 0.26,
    });

    const plasterDark = plaster.clone();
    plasterDark.color = new THREE.Color("#a2947f");
    plasterDark.roughness = 0.98;

    const wood = standard({
      map: textures.wood.map,
      bumpMap: textures.wood.bumpMap,
      bumpScale: 0.018,
      color: "#ffffff",
      roughness: 0.58,
      metalness: 0.08,
      envMapIntensity: 0.34,
    });

    const woodDark = wood.clone();
    woodDark.color = new THREE.Color("#8a7862");
    woodDark.roughness = 0.7;

    const fabric = standard({
      map: textures.fabric,
      color: "#ffffff",
      roughness: 0.98,
      metalness: 0,
      envMapIntensity: 0.12,
    });

    const stone = standard({
      color: "#3a342b",
      roughness: 0.54,
      metalness: 0.12,
      envMapIntensity: 0.5,
    });

    const stoneDark = standard({
      color: "#2b261f",
      roughness: 0.62,
      metalness: 0.1,
      envMapIntensity: 0.4,
    });

    const brass = standard({
      color: "#c9a26a",
      roughness: 0.24,
      metalness: 0.94,
      envMapIntensity: 1.5,
    });

    const brassDark = standard({
      color: "#80643d",
      roughness: 0.4,
      metalness: 0.86,
      envMapIntensity: 1.1,
    });

    const blackMetal = standard({
      color: "#11100e",
      roughness: 0.4,
      metalness: 0.58,
      envMapIntensity: 0.6,
    });

    const cove = standard({
      color: "#5c472c",
      emissive: "#ffb870",
      emissiveIntensity: 0.4,
      roughness: 0.5,
      metalness: 0.2,
      envMapIntensity: 0.2,
    });

    const skylight = new THREE.MeshBasicMaterial({
      color: "#ffe3b8",
      toneMapped: false,
    });

    return {
      floor,
      plaster,
      plasterDark,
      wood,
      woodDark,
      fabric,
      stone,
      stoneDark,
      brass,
      brassDark,
      blackMetal,
      cove,
      skylight,
    };
  }, [textures]);

  useEffect(
    () => () => {
      Object.values(materials).forEach((material) => material.dispose());
    },
    [materials]
  );

  return materials;
}
