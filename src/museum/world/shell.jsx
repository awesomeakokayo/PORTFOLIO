import React, { createContext, useContext, useMemo } from "react";
import * as THREE from "three";
import {
  ATRIUM_CEILING,
  DOORS,
  DOOR_HEIGHT,
  HEADERS,
  ROOMS,
  WALL_RECTS,
  WALL_THICKNESS,
  roomAt,
} from "./plan.js";
import { LabelPlane } from "../scene/labels.jsx";

/** Materials/textures shared by every room component. */
export const WorldContext = createContext(null);

export function useWorld() {
  const world = useContext(WorldContext);
  if (!world) throw new Error("World components must render inside WorldContext.");
  return world;
}

/* ---------------------------------------------------------------- */
/* Walls + ceilings built straight from plan data                     */
/* ---------------------------------------------------------------- */

function useWallVolumes() {
  return useMemo(() => {
    return WALL_RECTS.map((rect) => {
      const width = rect.x1 - rect.x0;
      const depth = rect.z1 - rect.z0;
      return {
        key: `${rect.x0},${rect.z0},${rect.x1},${rect.z1}`,
        center: [rect.x0 + width / 2, ATRIUM_CEILING / 2, rect.z0 + depth / 2],
        size: [width, ATRIUM_CEILING, depth],
      };
    });
  }, []);
}

export function WallFabric() {
  const { materials } = useWorld();
  const volumes = useWallVolumes();

  return (
    <group>
      {volumes.map((volume) => (
        <mesh
          key={`wall-${volume.key}`}
          position={volume.center}
          castShadow
          receiveShadow
        >
          <boxGeometry args={volume.size} />
          <primitive object={materials.plaster} attach="material" />
        </mesh>
      ))}
      <Skirting />
    </group>
  );
}

/**
 * Skirting reads the plan too: a wall face gets a wood base and a brass
 * inlay only when a visitor can actually stand on the other side of it.
 */
function Skirting() {
  const { materials } = useWorld();
  const strips = useMemo(() => {
    const result = [];
    const probe = 0.28;

    for (const rect of WALL_RECTS) {
      // Which sides of each wall volume face an interior space?
      const sides = [
        { normal: [0, -1], point: [(rect.x0 + rect.x1) / 2, rect.z0] },
        { normal: [0, 1], point: [(rect.x0 + rect.x1) / 2, rect.z1] },
        { normal: [-1, 0], point: [rect.x0, (rect.z0 + rect.z1) / 2] },
        { normal: [1, 0], point: [rect.x1, (rect.z0 + rect.z1) / 2] },
      ];

      sides.forEach(({ normal, point }, index) => {
        const axisX = normal[1] === 0;
        const sign = axisX ? normal[0] : normal[1];
        const probeX = axisX ? point[0] + sign * probe : point[0];
        const probeZ = axisX ? point[1] : point[1] + sign * probe;
        if (!roomAt(probeX, probeZ)) return;

        if (axisX) {
          result.push({
            key: `${rect.x0},${rect.z0},${rect.x1},${rect.z1}-base${index}`,
            position: [point[0] + sign * (probe / 2), 0.09, point[1]],
            size: [0.24, 0.18, rect.z1 - rect.z0 - 0.02],
            material: materials.woodDark,
          });
          result.push({
            key: `${rect.x0},${rect.z0},${rect.x1},${rect.z1}-inlay${index}`,
            position: [point[0] + sign * (probe / 2), 1.02, point[1]],
            size: [0.055, 0.05, rect.z1 - rect.z0 + 0.004],
            material: materials.brassDark,
          });
        } else {
          result.push({
            key: `${rect.x0},${rect.z0},${rect.x1},${rect.z1}-base${index}`,
            position: [point[0], 0.09, point[1] + sign * (probe / 2)],
            size: [rect.x1 - rect.x0 - 0.02, 0.18, 0.24],
            material: materials.woodDark,
          });
          result.push({
            key: `${rect.x0},${rect.z0},${rect.x1},${rect.z1}-inlay${index}`,
            position: [point[0], 1.02, point[1] + sign * (probe / 2)],
            size: [rect.x1 - rect.x0 + 0.004, 0.05, 0.055],
            material: materials.brassDark,
          });
        }
      });
    }

    return result;
  }, [materials]);

  return (
    <group>
      {strips.map((strip) => (
        <mesh key={strip.key} position={strip.position}>
          <boxGeometry args={strip.size} />
          <primitive object={strip.material} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

export function RoomCeilings() {
  const { materials } = useWorld();

  return (
    <group>
      {ROOMS.map((room) => {
        const width = room.x1 - room.x0;
        const depth = room.z1 - room.z0;
        const ceilingY = room.ceiling;

        return (
          <group key={`ceiling-${room.id}`}>
            <mesh
              position={[
                room.x0 + width / 2,
                ceilingY + 0.16,
                room.z0 + depth / 2,
              ]}
            >
              <boxGeometry args={[width, 0.32, depth]} />
              <primitive object={materials.stoneDark} attach="material" />
            </mesh>

            {/* Cove light wells run along every edge that still has wall. */}
            {width > 3.2 && depth > 1.9 ? (
              <CoveEdge roomId={room.id} room={room} ceilingY={ceilingY} materials={materials} />
            ) : null}
          </group>
        );
      })}
    </group>
  );
}

function CoveEdge({ roomId, room, ceilingY, materials }) {
  const segments = useMemo(() => {
    const inset = 0.44;
    const result = [];

    const sides = [
      {
        axis: "x",
        fixed: room.z0 + inset,
        from: room.x0 + 0.9,
        to: room.x1 - 0.9,
        outward: [0, -1],
      },
      {
        axis: "x",
        fixed: room.z1 - inset,
        from: room.x0 + 0.9,
        to: room.x1 - 0.9,
        outward: [0, 1],
      },
      {
        axis: "z",
        fixed: room.x0 + inset,
        from: room.z0 + 0.9,
        to: room.z1 - 0.9,
        outward: [-1, 0],
      },
      {
        axis: "z",
        fixed: room.x1 - inset,
        from: room.z0 + 0.9,
        to: room.z1 - 0.9,
        outward: [1, 0],
      },
    ];

    const SEGMENT = 1.06;
    for (const side of sides) {
      for (let value = side.from; value < side.to - 0.3; value += SEGMENT) {
        const end = Math.min(value + SEGMENT - 0.06, side.to);
        const mid = (value + end) / 2;
        const probeX = mid + side.outward[0] * 0.75;
        const probeZ = mid + side.outward[1] * 0.75;
        // A doorway reads as "another room on the far side" — no cove there.
        if (roomAt(probeX, probeZ)) continue;

        const length = end - value;
        if (length < 0.5) continue;
        result.push({
          key: `${roomId}-${side.axis}-${side.fixed.toFixed(2)}-${value.toFixed(2)}`,
          position: side.axis === "x" ? [mid, ceilingY - 0.22, side.fixed] : [side.fixed, ceilingY - 0.22, mid],
          size: side.axis === "x" ? [length, 0.055, 0.09] : [0.09, 0.055, length],
        });
      }
    }

    return result;
  }, [roomId, room, ceilingY]);

  return (
    <group>
      {segments.map((segment) => (
        <mesh key={segment.key} position={segment.position}>
          <boxGeometry args={segment.size} />
          <primitive object={materials.cove} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Doorways: frames, lintels, and signs readable from both sides      */
/* ---------------------------------------------------------------- */

const SIGN_ROTATIONS = {
  "-z": 0,
  "x+": Math.PI / 2,
  "x-": -Math.PI / 2,
  z: Math.PI,
};

function doorwayOrientation(door) {
  // The atrium-facing sign looks back across the doorway toward the court.
  if (door.axis === "z") return door.at < 0 ? SIGN_ROTATIONS["-z"] : SIGN_ROTATIONS.z;
  return door.at > 0 ? SIGN_ROTATIONS["x-"] : SIGN_ROTATIONS["x+"];
}

export function DoorwayFrames() {
  const { materials } = useWorld();

  return (
    <group>
      {HEADERS.map((header) => {
        const thickness = WALL_THICKNESS + 0.08;
        const span = header.to - header.from;
        const alongX = header.axis === "z";
        const height = header.y1 - header.y0;
        return (
          <mesh
            key={`header-${header.axis}-${header.at}-${header.from}`}
            position={[
              alongX ? (header.from + header.to) / 2 : header.at - Math.sign(header.at) * 0.02,
              (header.y0 + header.y1) / 2,
              alongX ? header.at - Math.sign(header.at) * 0.02 : (header.from + header.to) / 2,
            ]}
            castShadow
          >
            <boxGeometry
              args={
                alongX
                  ? [span, height, thickness + 0.34]
                  : [thickness + 0.34, height, span]
              }
            />
            <primitive object={materials.plaster} attach="material" />
          </mesh>
        );
      })}

      {DOORS.map((door) => (
        <DoorwayTrim key={`trim-${door.id}`} door={door} materials={materials} />
      ))}

      {DOORS.map((door) => (
        <DoorSign key={`sign-${door.id}`} door={door} />
      ))}
    </group>
  );
}

function DoorwayTrim({ door, materials }) {
  const alongX = door.axis === "z";
  const halfSpan = (door.to - door.from) / 2;
  const centerX = alongX ? (door.from + door.to) / 2 : door.at;
  const centerZ = alongX ? door.at : (door.from + door.to) / 2;
  const postSize = alongX ? [0.14, DOOR_HEIGHT, WALL_THICKNESS + 0.16] : [WALL_THICKNESS + 0.16, DOOR_HEIGHT, 0.14];

  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            alongX ? centerX + side * halfSpan : centerX,
            DOOR_HEIGHT / 2,
            alongX ? centerZ : centerZ + side * halfSpan,
          ]}
        >
          <boxGeometry args={postSize} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>
      ))}

      <mesh
        position={[
          alongX ? centerX : centerX,
          DOOR_HEIGHT + 0.05,
          alongX ? centerZ : centerZ,
        ]}
      >
        <boxGeometry
          args={
            alongX
              ? [door.to - door.from + 0.32, 0.1, WALL_THICKNESS + 0.2]
              : [WALL_THICKNESS + 0.2, 0.1, door.to - door.from + 0.32]
          }
        />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>
    </group>
  );
}

function DoorSign({ door }) {
  const facing = doorwayOrientation(door);
  const alongX = door.axis === "z";
  const width = alongX ? Math.min(2.6, door.to - door.from - 0.12) : 2.0;
  const offset = 0.31;

  const base = {
    x: alongX ? (door.from + door.to) / 2 : door.at,
    z: alongX ? door.at : (door.from + door.to) / 2,
  };

  const signX = alongX
    ? base.x
    : base.x + (facing === SIGN_ROTATIONS["x-"] ? -offset : offset);
  const signZ = alongX
    ? base.z + (facing === SIGN_ROTATIONS.z ? -offset : offset)
    : base.z;

  // Return signage reads from the far side of the same header.
  const backX = alongX ? base.x : 2 * base.x - signX;
  const backZ = alongX ? 2 * base.z - signZ : base.z;

  return (
    <group>
      <LabelPlane
        position={[signX, DOOR_HEIGHT + 0.52, signZ]}
        rotation={[0, facing, 0]}
        size={[width, 0.6]}
        kicker={door.kicker}
        title={door.label}
        subtitle={
          door.auto
            ? "WALK UP — THE DOOR OPENS"
            : door.id === "classic"
              ? "PRESS E TO OPEN THE CLASSIC SITE"
              : "PRESS E TO CONTINUE"
        }
        variant="plaque"
        accent={door.id === "classic" ? "#dd7f28" : "#c9a26a"}
        lit
      />

      <LabelPlane
        position={[backX, DOOR_HEIGHT + 0.5, backZ]}
        rotation={[0, facing + Math.PI, 0]}
        size={[width, 0.55]}
        kicker="BACK TO"
        title="The Arrival Court"
        variant="title"
      />
    </group>
  );
}
