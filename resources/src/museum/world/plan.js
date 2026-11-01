/**
 * plan.js — the whole museum floor plan in plain data.
 *
 * Everything about navigation is derived from this file: wall geometry,
 * collisions, auto doors, travel destinations, exhibit positions and the
 * walkability grid used for path finding. Rooms are organised around the
 * Arrival Court atrium with four addressed connections plus a labelled
 * classic-portfolio exit, exactly like a visitor would read a real museum.
 *
 * Coordinates: world space in metres. The camera spawns at (0, 1.68, 4.75)
 * looking toward -Z. Wall rectangles are axis-aligned AABBs, so the render
 * geometry and the collision model can never drift apart.
 */

export const WALL_THICKNESS = 0.36;
export const DOOR_HEIGHT = 3.15;
export const DOOR_WIDTH = 1.35;

/**
 * Rooms. `corridor` rooms are circulation space. `interactive` marks the
 * labelled classic-portfolio alcove. `ceiling` is the visible ceiling
 * height; wall frames always rise to the atrium height (5.4) above it.
 */
export const ROOMS = [
  { id: "atrium", label: "Arrival Court", shortLabel: "Arrival Court", kicker: "ROOM 01", x0: -6.2, z0: -6.2, x1: 6.2, z1: 6.2, ceiling: 5.4 },
  { id: "corrN", label: "North Corridor", x0: -2.18, z0: -9.4, x1: 2.18, z1: -6.02, corridor: true, ceiling: 3.5 },
  { id: "works", label: "The Works Gallery", shortLabel: "Works", kicker: "ROOM 02", x0: -7.4, z0: -17.4, x1: 7.4, z1: -9.4, ceiling: 4.6 },
  { id: "corrE", label: "East Corridor", x0: 6.02, z0: -1.38, x1: 9.4, z1: 1.38, corridor: true, ceiling: 3.5 },
  { id: "heritage", label: "The Collection", shortLabel: "Collection", kicker: "ROOM 03", x0: 9.4, z0: -7.6, x1: 17.4, z1: 7.6, ceiling: 4.6 },
  { id: "corrW", label: "West Corridor", x0: -9.4, z0: -1.38, x1: -6.02, z1: 1.38, corridor: true, ceiling: 3.5 },
  { id: "workshop", label: "The Workshop", shortLabel: "Workshop", kicker: "ROOM 04", x0: -17.4, z0: -7.6, x1: -9.4, z1: 7.6, ceiling: 4.3 },
  { id: "corrS", label: "South Corridor", x0: -2.18, z0: 6.02, x1: 2.18, z1: 9.4, corridor: true, ceiling: 3.5 },
  { id: "contact", label: "Contact Studio", shortLabel: "Contact", kicker: "ROOM 05", x0: -5.98, z0: 9.22, x1: 5.98, z1: 14.98, ceiling: 4.3 },
  { id: "vestibule", label: "Classic Portfolio", shortLabel: "Classic", kicker: "EXIT", x0: 2.46, z0: 6.02, x1: 3.99, z1: 8.5, ceiling: 3.3 },
];

export function roomAt(x, z) {
  for (const room of ROOMS) {
    if (x >= room.x0 && x <= room.x1 && z >= room.z0 && z <= room.z1) return room;
  }
  // Doorway stitching: a few centimetres of overlap find the room you are
  // travelling into while crossing a threshold.
  if (z >= -6.38 && z <= -6.02 && x >= -1.82 && x <= 1.82) return ROOMS[1];
  if (x >= 6.02 && x <= 6.56 && z >= -1.38 && z <= 1.38) return ROOMS[3];
  if (x >= -6.56 && x <= -6.02 && z >= -1.38 && z <= 1.38) return ROOMS[5];
  if (z >= 6.02 && z <= 6.38) {
    if (x >= -1.82 && x <= 1.82) return ROOMS[7];
    if (x > 2.55 && x < 3.9) return ROOMS[9];
  }
  if (z >= -9.58 && z <= -9.22 && x >= -1.82 && x <= 1.82) return ROOMS[2];
  if (x >= 9.22 && x <= 9.58 && z >= -1.2 && z <= 1.2) return ROOMS[4];
  if (x >= -9.58 && x <= -9.22 && z >= -1.2 && z <= 1.2) return ROOMS[6];
  if (z >= 9.22 && z <= 9.58 && x >= -1.82 && x <= 1.82) return ROOMS[8];
  return null;
}

/**
 * Doors. The four gallery doors are automatic: they read the visitor's
 * distance in the engine and part in the middle. The classic-portfolio door
 * is a deliberate, labelled exit that only responds to interaction — it
 * never auto-opens and never becomes a walk-through.
 */
export const DOORS = [
  { id: "north", axis: "z", at: -6.2, from: -1.82, to: 1.82, kicker: "ROOM 02", label: "The Works Gallery", auto: true },
  { id: "east", axis: "x", at: 6.2, from: -1.2, to: 1.2, kicker: "ROOM 03", label: "The Collection", auto: true },
  { id: "west", axis: "x", at: -6.2, from: -1.2, to: 1.2, kicker: "ROOM 04", label: "The Workshop", auto: true },
  { id: "south", axis: "z", at: 6.2, from: -1.2, to: 1.2, kicker: "ROOM 05", label: "Contact Studio", auto: true },
  { id: "classic", axis: "z", at: 6.2, from: 2.55, to: 3.9, kicker: "EXIT", label: "Classic Portfolio", auto: false },
];

/** Distance at which an automatic door starts opening. */
export const DOOR_OPEN_DISTANCE = 2.9;

export function doorRect(door, thickness = 0.2) {
  if (door.axis === "z") {
    return { x0: door.from, x1: door.to, z0: door.at - thickness / 2, z1: door.at + thickness / 2 };
  }
  return { x0: door.at - thickness / 2, x1: door.at + thickness / 2, z0: door.from, z1: door.to };
}

export function doorCenter(door) {
  if (door.axis === "z") {
    return { x: (door.from + door.to) / 2, z: door.at };
  }
  return { x: door.at, z: (door.from + door.to) / 2 };
}

/** Point-to-door-line distance used for auto-opening and prompts. */
export function doorDistance(door, x, z) {
  if (door.axis === "z") {
    if (x >= door.from && x <= door.to) return Math.abs(z - door.at);
    const dx = x < door.from ? door.from - x : x - door.to;
    return Math.hypot(dx, z - door.at);
  }
  if (z >= door.from && z <= door.to) return Math.abs(x - door.at);
  const dz = z < door.from ? door.from - z : z - door.to;
  return Math.hypot(x - door.at, dz);
}

/**
 * Wall segments as axis-aligned boxes; collision uses the same list.
 * Doorways are gaps, never solid rects: a closed door's collision comes
 * from its own rect (below), so auto doors can never trap a visitor.
 */
export const WALL_RECTS = [
  // Arrival Court — back wall with the north doorway
  { x0: -6.56, z0: -6.38, x1: -1.82, z1: -6.02 },
  { x0: 1.82, z0: -6.38, x1: 6.56, z1: -6.02 },
  // Arrival Court — east / west walls with the collection and workshop doorways
  { x0: -6.56, z0: -6.38, x1: -6.02, z1: -1.2 },
  { x0: -6.56, z0: 1.2, x1: -6.02, z1: 6.38 },
  { x0: 6.02, z0: -6.38, x1: 6.56, z1: -1.2 },
  { x0: 6.02, z0: 1.2, x1: 6.56, z1: 6.38 },
  // Arrival Court — front wall with the contact doorway and the exit alcove
  { x0: -6.56, z0: 6.02, x1: -1.2, z1: 6.38 },
  { x0: 1.2, z0: 6.02, x1: 2.55, z1: 6.38 },
  { x0: 3.9, z0: 6.02, x1: 6.56, z1: 6.38 },
  // North corridor side walls
  { x0: -2.18, z0: -9.4, x1: -1.82, z1: -6.02 },
  { x0: 1.82, z0: -9.4, x1: 2.18, z1: -6.02 },
  // Works gallery shell
  { x0: -7.58, z0: -9.58, x1: -1.82, z1: -9.22 },
  { x0: 1.82, z0: -9.58, x1: 7.58, z1: -9.22 },
  { x0: -7.58, z0: -17.58, x1: -7.22, z1: -9.22 },
  { x0: 7.22, z0: -17.58, x1: 7.58, z1: -9.22 },
  { x0: -7.58, z0: -17.58, x1: 7.58, z1: -17.22 },
  // East corridor side walls
  { x0: 6.02, z0: 1.02, x1: 9.4, z1: 1.38 },
  { x0: 6.02, z0: -1.38, x1: 9.4, z1: -1.02 },
  // Collection gallery shell
  { x0: 9.22, z0: -7.78, x1: 9.58, z1: -1.2 },
  { x0: 9.22, z0: 1.2, x1: 9.58, z1: 7.78 },
  { x0: 9.22, z0: -7.78, x1: 17.4, z1: -7.42 },
  { x0: 9.22, z0: 7.42, x1: 17.4, z1: 7.78 },
  { x0: 17.22, z0: -7.78, x1: 17.58, z1: 7.78 },
  // West corridor side walls
  { x0: -9.4, z0: 1.02, x1: -6.02, z1: 1.38 },
  { x0: -9.4, z0: -1.38, x1: -6.02, z1: -1.02 },
  // Workshop shell
  { x0: -9.58, z0: -7.78, x1: -9.22, z1: -1.2 },
  { x0: -9.58, z0: 1.2, x1: -9.22, z1: 7.78 },
  { x0: -17.4, z0: -7.78, x1: -9.22, z1: -7.42 },
  { x0: -17.4, z0: 7.42, x1: -9.22, z1: 7.78 },
  { x0: -17.58, z0: -7.78, x1: -17.22, z1: 7.78 },
  // South corridor side walls
  { x0: -2.18, z0: 6.02, x1: -1.82, z1: 9.4 },
  { x0: 1.82, z0: 6.02, x1: 2.18, z1: 9.4 },
  // Contact studio shell
  { x0: -5.98, z0: 9.22, x1: -1.82, z1: 9.58 },
  { x0: 1.82, z0: 9.22, x1: 5.98, z1: 9.58 },
  { x0: -5.98, z0: 9.22, x1: -5.62, z1: 14.98 },
  { x0: 5.62, z0: 9.22, x1: 5.98, z1: 14.98 },
  { x0: -5.98, z0: 14.62, x1: 5.98, z1: 14.98 },
  // Classic portfolio vestibule — a labelled alcove, entered only by choice
  { x0: 2.46, z0: 6.38, x1: 2.64, z1: 8.5 },
  { x0: 3.81, z0: 6.38, x1: 3.99, z1: 8.5 },
  { x0: 2.46, z0: 8.32, x1: 3.99, z1: 8.5 },
];

/** Doorway lintels — geometry only, so arches read as arches and not slots. */
export const HEADERS = [
  { axis: "z", at: -6.2, from: -1.82, to: 1.82, y0: 3.15, y1: 5.4 },
  { axis: "x", at: 6.2, from: -1.2, to: 1.2, y0: 3.15, y1: 5.4 },
  { axis: "x", at: -6.2, from: -1.2, to: 1.2, y0: 3.15, y1: 5.4 },
  { axis: "z", at: 6.2, from: -1.2, to: 1.2, y0: 3.15, y1: 5.4 },
  { axis: "z", at: 6.2, from: 2.55, to: 3.9, y0: 2.9, y1: 5.4 },
  { axis: "z", at: -9.4, from: -1.82, to: 1.82, y0: 3.15, y1: 5.4 },
  { axis: "x", at: 9.4, from: -1.2, to: 1.2, y0: 3.15, y1: 5.4 },
  { axis: "x", at: -9.4, from: -1.2, to: 1.2, y0: 3.15, y1: 5.4 },
  { axis: "z", at: 9.4, from: -1.82, to: 1.82, y0: 3.15, y1: 5.4 },
];

export const ATRIUM_CEILING = 5.4;

/** Static furniture that visitors collide with but cannot pass through. */
export const FURNITURE_RECTS = [
  { x0: -5.2, z0: 4.25, x1: -4.2, z1: 6.2 },
  { x0: 4.2, z0: 4.25, x1: 5.2, z1: 6.2 },
  { x0: -14.35, z0: -0.6, x1: -12.65, z1: 0.6 },
  // Workshop stools sit at the table's short ends.
  { x0: -15.21, z0: -0.26, x1: -14.69, z1: 0.26 },
  { x0: -12.42, z0: -0.26, x1: -11.9, z1: 0.26 },
  { x0: 15.85, z0: -4.95, x1: 17.15, z1: -3.75 },
  { x0: 15.85, z0: -0.65, x1: 17.15, z1: 0.65 },
  { x0: 15.85, z0: 3.75, x1: 17.15, z1: 4.95 },
  { x0: -1.35, z0: 12.4, x1: 1.35, z1: 13.45 },
  { x0: -2.72, z0: 10.02, x1: -1.52, z1: 11.02 },
  { x0: 1.52, z0: 10.02, x1: 2.72, z1: 11.02 },
  // Contact studio plant pot.
  { x0: -4.82, z0: 13.38, x1: -4.38, z1: 13.82 },
];

/** Atrium columns match the Columns scene component's world placement. */
export const ATRIUM_COLUMNS = [-4.8, -1.6, 1.6, 4.8].flatMap((z) => [
  { x: -5.75, z },
  { x: 5.75, z },
]);

export const PLAYER_RADIUS = 0.38;

/** Camera and collision tuning. */
export const WALK_SPEED = 2.35;
export const STRAFE_SPEED = 2.0;
export const EYE_HEIGHT = 1.68;
export const SPAWN = { x: 0, y: EYE_HEIGHT, z: 4.75, yaw: 0, pitch: -0.015 };

/* ---------------------------------------------------------------- */
/* Exhibits (project gallery)                                        */
/* ---------------------------------------------------------------- */

export const EXHIBITS = [
  {
    slug: "openbooks",
    position: [-2.45, 0, -15.9],
    rotation: 0,
    size: [1.7, 1.0, 1.4],
    accent: "#ff5c00",
  },
  {
    slug: "techskillhub",
    position: [-5.95, 0, -13.25],
    rotation: Math.PI / 2,
    size: [1.3, 1.0, 1.0],
    accent: "#9fe0c1",
  },
  {
    slug: "southwest-flood-monitor",
    position: [5.95, 0, -13.25],
    rotation: -Math.PI / 2,
    size: [1.3, 1.0, 1.0],
    accent: "#ffb06b",
  },
  {
    slug: "elroi-hub",
    position: [2.45, 0, -15.9],
    rotation: 0,
    size: [1.2, 1.0, 1.0],
    accent: "#c9a26a",
  },
];

/** Heritage vitrines. The centre case carries the researched exhibit. */
export const HERITAGE_CASES = [
  { id: "case-context", kind: "context", center: [16.5, -4.35], rect: FURNITURE_RECTS[3] },
  { id: "case-exhibit", kind: "exhibit", center: [16.5, 0], rect: FURNITURE_RECTS[4] },
  { id: "case-sources", kind: "sources", center: [16.5, 4.35], rect: FURNITURE_RECTS[5] },
];

/*
 * Approach spots and collision footprints are derived once, here, so the
 * engine, the path finder and the scene all read the same numbers.
 */
for (const exhibit of EXHIBITS) {
  const rotated = Math.abs(Math.sin(exhibit.rotation)) > 0.5;
  const footprintX = rotated ? exhibit.size[2] : exhibit.size[0];
  const footprintZ = rotated ? exhibit.size[0] : exhibit.size[2];
  const halfX = footprintX / 2 + 0.2;
  const halfZ = footprintZ / 2 + 0.2;

  // The artwork reads from the +local-z side. Rotate that into world space:
  // rotation 0 faces +Z, +90° faces +X, -90° faces -X, 180° faces -Z.
  const facing = Math.round(exhibit.rotation / (Math.PI / 2)) * (Math.PI / 2);
  const fx = Math.round(Math.sin(facing));
  const fz = Math.round(Math.cos(facing));

  exhibit.approachX = exhibit.position[0] + fx * (footprintX / 2 + 1.25);
  exhibit.approachZ = exhibit.position[2] + fz * (footprintZ / 2 + 1.25);
  exhibit.facingYaw = getFaceYaw(exhibit.position[0], exhibit.position[2], exhibit.approachX, exhibit.approachZ);
  exhibit.obstacle = {
    x0: exhibit.position[0] - halfX,
    x1: exhibit.position[0] + halfX,
    z0: exhibit.position[2] - halfZ,
    z1: exhibit.position[2] + halfZ,
  };
}

export const OBSTACLES = [
  ...EXHIBITS.map((exhibit) => exhibit.obstacle),
  ...FURNITURE_RECTS,
  ...ATRIUM_COLUMNS.map((column) => ({
    x0: column.x - 0.41,
    x1: column.x + 0.41,
    z0: column.z - 0.41,
    z1: column.z + 0.41,
  })),
];

/* ---------------------------------------------------------------- */
/* Walkability                                                        */
/* ---------------------------------------------------------------- */

export const WALK_BOUNDS = { minX: -17.58, maxX: 17.58, minZ: -17.58, maxZ: 14.98 };

/**
 * Solids visible to movement at a position. `closedDoors` is a Set (or array)
 * of door ids made solid because the door leaf is not open yet.
 */
export function solidRects(closedDoors = []) {
  const doorSolids = [];
  for (const door of DOORS) {
    if (closedDoors.includes(door.id)) doorSolids.push(doorRect(door, 0.24));
  }
  return doorSolids.length
    ? [...WALL_RECTS, ...OBSTACLES, ...doorSolids]
    : [...WALL_RECTS, ...OBSTACLES];
}

export function blockedAt(x, z, radius = PLAYER_RADIUS, closedDoors = [], rects = null) {
  if (
    x < WALK_BOUNDS.minX + radius ||
    x > WALK_BOUNDS.maxX - radius ||
    z < WALK_BOUNDS.minZ + radius ||
    z > WALK_BOUNDS.maxZ - radius
  ) {
    return true;
  }
  const list = rects || solidRects(closedDoors);
  for (const rect of list) {
    if (
      x > rect.x0 - radius &&
      x < rect.x1 + radius &&
      z > rect.z0 - radius &&
      z < rect.z1 + radius
    ) {
      return true;
    }
  }
  return false;
}

/* ---------------------------------------------------------------- */
/* Travel destinations + path finding                                 */
/* ---------------------------------------------------------------- */

export const TRAVELS = {
  atrium: { x: 0, z: 4.6, yaw: 0, pitch: -0.02 },
  works: { x: 0, z: -10.8, yaw: 0, pitch: -0.02 },
  heritage: { x: 10.9, z: 0, yaw: -Math.PI / 2, pitch: -0.03 },
  workshop: { x: -10.9, z: 0, yaw: Math.PI / 2, pitch: -0.03 },
  contact: { x: 0, z: 10.6, yaw: Math.PI, pitch: -0.02 },
};

export const TRAVEL_LABELS = {
  atrium: "Arrival Court",
  works: "The Works Gallery",
  heritage: "The Collection",
  workshop: "The Workshop",
  contact: "Contact Studio",
};

/** Yaw that turns a camera at (fromX, fromZ) to face (toX, toZ). */
export function getFaceYaw(fromX, fromZ, toX, toZ) {
  return Math.atan2(toX - fromX, toZ - fromZ);
}

/**
 * Reading pose a few steps right and back of an approach point, facing the
 * exhibit — reused for every interactive panel so the framing is consistent.
 */
export function getReadingPose(approachX, approachZ, lookX, lookZ, eye = EYE_HEIGHT) {
  const facing = getFaceYaw(lookX, lookZ, approachX, approachZ);
  const rightX = Math.cos(facing);
  const rightZ = -Math.sin(facing);
  const backX = Math.sin(facing);
  const backZ = Math.cos(facing);
  const x = approachX + rightX * 0.5 + backX * 0.18;
  const z = approachZ + rightZ * 0.5 + backZ * 0.18;

  const dx = lookX - x;
  const dz = lookZ - z;
  const horizontal = Math.max(0.1, Math.hypot(dx, dz));
  const yaw = Math.atan2(-dx, -dz);
  return { position: [x, eye, z], yaw };
}

const PATH_STEP = 0.45;

/* Precomputed walkability grid. Built once from the same solids the engine
 * uses, with the classic-portfolio door treated as permanently closed. */
const GRID = (function buildGrid() {
  const columns = Math.ceil((WALK_BOUNDS.maxX - WALK_BOUNDS.minX) / PATH_STEP) + 1;
  const rows = Math.ceil((WALK_BOUNDS.maxZ - WALK_BOUNDS.minZ) / PATH_STEP) + 1;
  const grid = new Uint8Array(columns * rows);
  const rects = solidRects([DOORS.find((door) => !door.auto).id]);
  const worldX = (gx) => WALK_BOUNDS.minX + gx * PATH_STEP;
  const worldZ = (gz) => WALK_BOUNDS.minZ + gz * PATH_STEP;

  for (let gz = 0; gz < rows; gz += 1) {
    for (let gx = 0; gx < columns; gx += 1) {
      grid[gz * columns + gx] = blockedAt(worldX(gx), worldZ(gz), PLAYER_RADIUS, [], rects) ? 0 : 1;
    }
  }
  return { columns, rows, grid };
})();

function gridWalkable(gx, gz) {
  if (gx < 0 || gx >= GRID.columns || gz < 0 || gz >= GRID.rows) return false;
  return GRID.grid[gz * GRID.columns + gx] === 1;
}

function lineOfSight(ax, az, bx, bz) {
  const steps = Math.max(
    2,
    Math.ceil(Math.hypot(bx - ax, bz - az) / (PATH_STEP * 0.5))
  );
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    if (!gridWalkable(
      Math.round((ax + (bx - ax) * t - WALK_BOUNDS.minX) / PATH_STEP),
      Math.round((az + (bz - az) * t - WALK_BOUNDS.minZ) / PATH_STEP)
    )) {
      return false;
    }
  }
  return true;
}

/**
 * Breadth-first search over the walkable grid with diagonal guard (no corner
 * cutting) and string-pull smoothing so the walk reads as a natural line.
 * `extraBlocked` lets the caller treat additional space as solid.
 */
export function findPath(fromX, fromZ, toX, toZ, extraBlocked = []) {
  const { columns, rows } = GRID;
  const toGridX = (x) => Math.max(0, Math.min(columns - 1, Math.round((x - WALK_BOUNDS.minX) / PATH_STEP)));
  const toGridZ = (z) => Math.max(0, Math.min(rows - 1, Math.round((z - WALK_BOUNDS.minZ) / PATH_STEP)));
  const worldX = (gx) => WALK_BOUNDS.minX + gx * PATH_STEP;
  const worldZ = (gz) => WALK_BOUNDS.minZ + gz * PATH_STEP;

  const blockedExtra = (x, z) =>
    extraBlocked.some(
      (rect) => x > rect.x0 - PLAYER_RADIUS && x < rect.x1 + PLAYER_RADIUS && z > rect.z0 - PLAYER_RADIUS && z < rect.z1 + PLAYER_RADIUS
    );

  const start = { x: toGridX(fromX), z: toGridZ(fromZ) };
  const goal = { x: toGridX(toX), z: toGridZ(toZ) };

  let startCell = start;
  if (!gridWalkable(start.x, start.z) || blockedExtra(worldX(start.x), worldZ(start.z))) {
    // Nudge to the nearest open cell so the walk can still begin from a
    // doorway line or a settled collision edge.
    startCell = findNearestOpen(start, columns, rows);
    if (!startCell) return [{ x: fromX, z: fromZ }];
  }
  const goalCell = !gridWalkable(goal.x, goal.z) || blockedExtra(worldX(goal.x), worldZ(goal.z))
    ? findNearestOpen(goal, columns, rows)
    : goal;
  if (!goalCell) return null;

  const index = (gx, gz) => gz * columns + gx;
  const previous = new Int32Array(columns * rows).fill(-2);
  const queue = [index(startCell.x, startCell.z)];
  previous[queue[0]] = -1;
  let head = 0;
  let found = index(goalCell.x, goalCell.z);

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  while (head < queue.length) {
    const current = queue[head];
    if (current === found) break;
    head += 1;
    const cx = current % columns;
    const cz = Math.floor(current / columns);
    for (const [dx, dz] of dirs) {
      const nx = cx + dx;
      const nz = cz + dz;
      if (!gridWalkable(nx, nz)) continue;
      // No corner cutting: diagonal cells need both orthogonal neighbours.
      if (dx !== 0 && dz !== 0 && (!gridWalkable(cx + dx, cz) || !gridWalkable(cx, cz + dz))) continue;
      const wx = worldX(nx);
      const wz = worldZ(nz);
      if (blockedExtra(wx, wz)) continue;
      const next = index(nx, nz);
      if (previous[next] !== -2) continue;
      previous[next] = current;
      queue.push(next);
    }
  }

  if (previous[found] === -2) return null;

  const cells = [];
  let cursor = found;
  while (cursor !== -1) {
    const gx = cursor % columns;
    const gz = Math.floor(cursor / columns);
    cells.unshift({ x: worldX(gx), z: worldZ(gz) });
    cursor = previous[cursor];
  }

  // String-pull: keep the start, then greedily keep the farthest visible cell.
  const path = [{ x: fromX, z: fromZ }];
  let anchor = 0;
  while (anchor < cells.length - 1) {
    let reach = anchor;
    for (let probe = cells.length - 1; probe > anchor; probe -= 1) {
      if (lineOfSight(cells[anchor].x, cells[anchor].z, cells[probe].x, cells[probe].z)) {
        reach = probe;
        break;
      }
    }
    path.push(cells[reach]);
    anchor = reach;
  }
  path.push({ x: toX, z: toZ });

  // Drop the rewritten endpoints when they duplicate or reverse.
  const clean = [path[0]];
  for (let i = 1; i < path.length; i += 1) {
    const prev = clean[clean.length - 1];
    if (Math.hypot(path[i].x - prev.x, path[i].z - prev.z) < 0.06) continue;
    clean.push(path[i]);
  }
  if (clean.length === 1) clean.push({ x: toX, z: toZ });
  return clean;
}

function findNearestOpen(cell, columns, rows) {
  for (let radius = 1; radius <= 6; radius += 1) {
    for (let dz = -radius; dz <= radius; dz += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        if (Math.abs(dx) !== radius && Math.abs(dz) !== radius) continue;
        const gx = cell.x + dx;
        const gz = cell.z + dz;
        if (gx < 0 || gx >= columns || gz < 0 || gz >= rows) continue;
        if (gridWalkable(gx, gz)) return { x: gx, z: gz };
      }
    }
  }
  return null;
}

/* ---------------------------------------------------------------- */
/* Interactions                                                       */
/* ---------------------------------------------------------------- */

export const INTERACT_RADIUS = {
  project: 2.1,
  heritage: 2.0,
  workshop: 2.2,
  contact: 2.2,
  exit: 1.9,
};

export const INTERACTIVES = [
  ...EXHIBITS.map((exhibit) => ({
    id: exhibit.slug,
    kind: "project",
    slug: exhibit.slug,
    x: exhibit.approachX,
    z: exhibit.approachZ,
    lookX: exhibit.position[0],
    lookZ: exhibit.position[2],
    yaw: exhibit.facingYaw,
    radius: INTERACT_RADIUS.project,
  })),
  ...HERITAGE_CASES.map((item) => ({
    id: item.id,
    kind: "heritage",
    x: item.center[0] - 1.5,
    z: item.center[1],
    lookX: item.center[0],
    lookZ: item.center[1],
    yaw: getFaceYaw(item.center[0], item.center[1], item.center[0] - 1.5, item.center[1]),
    radius: INTERACT_RADIUS.heritage,
  })),
  {
    id: "workshop-boards",
    kind: "workshop",
    x: -13.5,
    z: -1.35,
    lookX: -13.5,
    lookZ: 0,
    yaw: getFaceYaw(-13.5, 0, -13.5, -1.35),
    radius: INTERACT_RADIUS.workshop,
  },
  {
    id: "contact-desk",
    kind: "contact",
    x: 0,
    z: 11.95,
    lookX: 0,
    lookZ: 12.9,
    yaw: getFaceYaw(0, 12.9, 0, 11.95),
    radius: INTERACT_RADIUS.contact,
  },
  {
    id: "classic-exit",
    kind: "exit",
    x: 3.22,
    z: 5.35,
    lookX: 3.22,
    lookZ: 7.0,
    yaw: getFaceYaw(3.22, 7.0, 3.22, 5.35),
    radius: INTERACT_RADIUS.exit,
  },
];

export function nearestInteractive(x, z) {
  let best = null;
  let bestDistance = Infinity;
  for (const item of INTERACTIVES) {
    const distance = Math.hypot(x - item.x, z - item.z);
    if (distance <= item.radius && distance < bestDistance) {
      best = item;
      bestDistance = distance;
    }
  }
  return best;
}

/** A comfortable pose for reading an interactive's panel. */
export function getInteractiveReadingPose(id) {
  const item = INTERACTIVES.find((entry) => entry.id === id);
  if (!item) return null;
  return getReadingPose(item.x, item.z, item.lookX, item.lookZ);
}

export function distance2D(ax, az, bx, bz) {
  return Math.hypot(ax - bx, az - bz);
}
