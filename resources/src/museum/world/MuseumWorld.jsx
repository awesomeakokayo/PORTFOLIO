import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { WorldContext, WallFabric, RoomCeilings, DoorwayFrames } from "./shell.jsx";
import AutoDoor from "./doors.jsx";
import { AtriumWayfinding, AtriumSignage } from "./atrium.jsx";
import WorksGallery from "./works.jsx";
import HeritageGallery from "./heritage.jsx";
import Workshop from "./workshop.jsx";
import ContactStudio from "./studio.jsx";
import ClassicExit from "./exit.jsx";
import { MuseumController } from "./engine.jsx";
import { useRoomTextures } from "../scene/textures.js";
import { useRoomMaterials } from "../scene/materials.js";
import RoomEnvironment from "../scene/environment.jsx";
import { Columns, Benches, AtriumLights } from "../scene/architecture.jsx";
import { SpotFixture } from "../scene/primitives.jsx";
import { DOORS } from "./plan.js";

/** Slow ambient drift for the atrium only — disabled for reduced motion. */
function useDrift(ref, enabled, rate) {
  useFrame((_, delta) => {
    if (!enabled || !ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * rate;
  });
}

/** Room lights — deliberately few, warm, and placed like real fittings. */
function RoomLights({ quality }) {
  const strong = quality !== "low";
  return (
    <group>
      {/* Works Gallery */}
      <pointLight position={[-4.4, 4.0, -12.2]} color="#ffe2b4" intensity={strong ? 22 : 30} distance={9} decay={1.5} />
      <pointLight position={[4.4, 4.0, -12.2]} color="#ffe2b4" intensity={strong ? 22 : 30} distance={9} decay={1.5} />
      <pointLight position={[0, 4.0, -16.2]} color="#ffdcac" intensity={strong ? 20 : 28} distance={9} decay={1.5} />

      {/* The Collection */}
      <pointLight position={[12.9, 4.0, -4.3]} color="#ffdfae" intensity={strong ? 18 : 26} distance={8} decay={1.5} />
      <pointLight position={[12.9, 4.0, 0]} color="#ffdfae" intensity={strong ? 18 : 26} distance={8} decay={1.5} />
      <pointLight position={[12.9, 4.0, 4.3]} color="#ffdfae" intensity={strong ? 18 : 26} distance={8} decay={1.5} />

      {/* The Workshop */}
      <pointLight position={[-12.6, 3.6, -4.1]} color="#ffe0b2" intensity={strong ? 18 : 26} distance={8} decay={1.5} />
      <pointLight position={[-12.6, 3.6, 4.1]} color="#ffe0b2" intensity={strong ? 18 : 26} distance={8} decay={1.5} />
      <pointLight position={[-15.6, 3.6, 0]} color="#ffdcac" intensity={strong ? 16 : 24} distance={8} decay={1.5} />

      {/* Contact Studio */}
      <pointLight position={[0, 3.6, 10.9]} color="#ffe4ba" intensity={strong ? 16 : 24} distance={7.5} decay={1.5} />
      <pointLight position={[0, 3.6, 13.2]} color="#ffe0b2" intensity={strong ? 14 : 22} distance={7} decay={1.5} />

      {/* Corridors */}
      <pointLight position={[0, 3.0, -7.8]} color="#ffd9a4" intensity={10} distance={6} decay={1.6} />
      <pointLight position={[0, 3.0, 7.8]} color="#ffd9a4" intensity={10} distance={6} decay={1.6} />
      <pointLight position={[7.7, 3.0, 0]} color="#ffd9a4" intensity={9} distance={6} decay={1.6} />
      <pointLight position={[-7.7, 3.0, 0]} color="#ffd9a4" intensity={9} distance={6} decay={1.6} />
    </group>
  );
}

function Dust({ reducedMotion, quality }) {
  const pointsRef = React.useRef(null);
  const count = quality === "low" ? 46 : 96;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 11.4;
      values[index * 3 + 1] = 0.4 + Math.random() * 4.5;
      values[index * 3 + 2] = (Math.random() - 0.5) * 11.4;
    }
    return values;
  }, [count]);

  useDrift(pointsRef, reducedMotion, 0.0075);

  return (
    <points ref={pointsRef} position={[0, 0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f4f3ef"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.2}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

/**
 * MuseumWorld — the whole museum, assembled from the plan. Rooms stay
 * connected and every wall is rendered from the same rectangles the
 * collision model uses.
 */
export default function MuseumWorld({
  engine,
  reducedMotion,
  quality = "high",
  onNearChange,
  onRoomChange,
  onDoorChange,
  hoverProject,
  nearInteractive,
  onHoverProject,
  onSelectProject,
}) {
  const textures = useRoomTextures(quality);
  const materials = useRoomMaterials(textures);

  const world = useMemo(
    () => ({ materials, textures, shadowTexture: textures.shadow, quality }),
    [materials, textures, quality]
  );

  return (
    <WorldContext.Provider value={world}>
      <color attach="background" args={["#0a0908"]} />
      <fog attach="fog" args={["#0a0908", 9, 30]} />

      <RoomEnvironment intensity={quality === "low" ? 0.26 : 0.4} />

      <ambientLight intensity={quality === "low" ? 0.5 : 0.4} color="#f2e4cf" />
      <hemisphereLight args={["#ffe0b8", "#171009", quality === "low" ? 0.5 : 0.4]} />
      <directionalLight
        position={[1.2, 9.2, 4.4]}
        intensity={1.15}
        color="#ffe1b8"
        castShadow={quality === "high"}
        shadow-mapSize-width={quality === "low" ? 1024 : 2048}
        shadow-mapSize-height={quality === "low" ? 1024 : 2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.5}
        shadow-camera-far={34}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />

      {/* World fabric */}
      <WallFabric />
      <RoomCeilings />
      <DoorwayFrames />
      {DOORS.filter((door) => door.auto).map((door) => (
        <AutoDoor key={door.id} door={door} />
      ))}

      {/* Arrival Court (Room 01) */}
      <AtriumWayfinding />
      <AtriumSignage />
      <Columns side={-1} materials={materials} />
      <Columns side={1} materials={materials} />
      <Benches materials={materials} shadowTexture={textures.shadow} />
      <AtriumLights quality={quality} />
      <SpotFixture
        position={[-3.85, 4.85, 4.7]}
        target={[-3.85, 4.4, 5.99]}
        color="#ffd8aa"
        intensity={quality === "low" ? 6 : 10}
        angle={0.66}
        penumbra={1}
        distance={3.4}
        fixture
      />
      <Dust reducedMotion={reducedMotion} quality={quality} />

      {/* Rooms */}
      <WorksGallery
        hoverProject={hoverProject}
        nearInteractive={nearInteractive}
        onHoverProject={onHoverProject}
        onSelectProject={onSelectProject}
      />
      <HeritageGallery />
      <Workshop />
      <ContactStudio />
      <ClassicExit />

      <RoomLights quality={quality} />

      <MuseumController
        engine={engine}
        reducedMotion={reducedMotion}
        onNearChange={onNearChange}
        onRoomChange={onRoomChange}
        onDoorChange={onDoorChange}
      />
    </WorldContext.Provider>
  );
}
