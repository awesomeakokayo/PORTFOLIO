import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  DOOR_OPEN_DISTANCE,
  DOORS,
  EYE_HEIGHT,
  PLAYER_RADIUS,
  SPAWN,
  TRAVELS,
  WALK_SPEED,
  STRAFE_SPEED,
  doorDistance,
  findPath,
  nearestInteractive,
  roomAt,
  solidRects,
} from "./plan.js";

export const TURN_SPEED = 2.35;

/** The mutable controller state, created once by MuseumExperience. */
export function createEngineState() {
  return {
    move: { forward: false, back: false, left: false, right: false },
    joystick: { x: 0, y: 0 },
    yaw: SPAWN.yaw,
    pitch: SPAWN.pitch,
    yawTarget: SPAWN.yaw,
    pitchTarget: SPAWN.pitch,
    velocity: { x: 0, z: 0 },
    bobPhase: 0,
    path: null,
    paused: false,
    readingPose: null,
    locked: false,
    touch: false,
    near: null,
    doorsClosed: [],
    posX: SPAWN.x,
    posZ: SPAWN.z,
    api: null,
  };
}

function dampAngle(current, target, alpha) {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * alpha;
}

function fieldBlocked(x, z, rects) {
  for (const rect of rects) {
    if (
      x > rect.x0 - PLAYER_RADIUS &&
      x < rect.x1 + PLAYER_RADIUS &&
      z > rect.z0 - PLAYER_RADIUS &&
      z < rect.z1 + PLAYER_RADIUS
    ) {
      return true;
    }
  }
  return false;
}

function yawToward(ex, ez, tx, tz) {
  return Math.atan2(ex - tx, ez - tz);
}

/**
 * MuseumController — first-person presence on top of plan.js. Handles
 * vector movement with strafing, BFS-guided travel, auto door state,
 * nearest-interaction detection, room tracking, and reading poses.
 * DOM input (keys, pointer lock, touch joystick) is wired in
 * MuseumExperience; travel is exposed via engine.current.api for the HUD.
 */
export function MuseumController({
  engine,
  reducedMotion,
  onNearChange,
  onRoomChange,
  onDoorChange,
}) {
  const { camera, gl, scene } = useThree();
  const scratch = useMemo(
    () => ({
      target: new THREE.Vector3(),
      forward: new THREE.Vector3(),
      right: new THREE.Vector3(),
    }),
    []
  );
  const nearRef = useRef(null);
  const roomRef = useRef(null);
  const doorRef = useRef("");
  const rectsCache = useRef({ key: "", rects: null });

  useEffect(() => {
    camera.position.set(SPAWN.x, SPAWN.y, SPAWN.z);
    camera.rotation.order = "YXZ";

    const state = engine.current;
    const snapTo = (x, z, yaw = state.yaw, pitch = state.pitch) => {
      state.path = null;
      camera.position.set(x, EYE_HEIGHT, z);
      state.yawTarget = yaw;
      state.pitchTarget = pitch;
      state.yaw = yaw;
      state.pitch = pitch;
    };

    const travel = (roomId) => {
      const destination = TRAVELS[roomId];
      if (!destination) return false;
      const stateNow = engine.current;

      if (reducedMotion) {
        snapTo(destination.x, destination.z, destination.yaw, destination.pitch);
        stateNow.path = null;
        return true;
      }

      const points = findPath(stateNow.posX, stateNow.posZ, destination.x, destination.z);
      if (!points) {
        snapTo(destination.x, destination.z, destination.yaw, destination.pitch);
        return true;
      }
      stateNow.path = {
        points,
        index: 0,
        pose: { yaw: destination.yaw, pitch: destination.pitch },
        destination: roomId,
      };
      return true;
    };

    const goTo = (x, z) => {
      const stateNow = engine.current;
      const points = findPath(stateNow.posX, stateNow.posZ, x, z);
      if (!points) {
        snapTo(x, z);
        return;
      }
      stateNow.path = { points, index: 0, pose: null };
    };

    state.api = { travel, goTo, snapTo };

    if (import.meta.env.DEV) {
      window.__museumCamera = camera;
      window.__museumEngine = engine;
      window.__museumGl = gl;
      window.__museumScene = scene;
    }

    return () => {
      if (import.meta.env.DEV) {
        delete window.__museumCamera;
        delete window.__museumEngine;
        delete window.__museumGl;
        delete window.__museumScene;
      }
    };
  }, [camera, engine, gl, scene, reducedMotion]);

  useFrame((_, delta) => {
    const state = engine.current;
    const dt = Math.min(delta, 0.05);
    const cam = camera.position;

    /* ------------------------------------------------ doors */
    const closedAutoDoors = [];
    for (const door of DOORS) {
      // The labelled classic door is never automatic: it stays solid so no
      // visitor can drift through it. Auto doors switch open by distance.
      if (!door.auto) {
        closedAutoDoors.push(door.id);
        continue;
      }
      const distance = doorDistance(door, cam.x, cam.z);
      const autoOpen = distance < DOOR_OPEN_DISTANCE;
      if (!autoOpen) closedAutoDoors.push(door.id);
    }
    const doorKey = closedAutoDoors.join("|");
    if (doorKey !== doorRef.current) {
      doorRef.current = doorKey;
      state.doorsClosed = closedAutoDoors;
      onDoorChange?.(closedAutoDoors);
    }

    /* solids — rebuilt only when the door state flips */
    if (rectsCache.current.key !== doorKey) {
      rectsCache.current = { key: doorKey, rects: solidRects(closedAutoDoors) };
    }
    const rects = rectsCache.current.rects;

    /* ------------------------------------------------ room + interactions */
    const room = roomAt(cam.x, cam.z);
    if (room && room.id !== roomRef.current?.id) {
      roomRef.current = room;
      onRoomChange?.(room);
    }

    state.posX = cam.x;
    state.posZ = cam.z;

    const near = nearestInteractive(cam.x, cam.z);
    if ((near?.id || null) !== (nearRef.current?.id || null)) {
      nearRef.current = near;
      state.near = near;
      onNearChange?.(near);
    }

    /* ------------------------------------------------ reading pose */
    if (state.paused) {
      state.velocity.x = 0;
      state.velocity.z = 0;

      if (state.readingPose) {
        const pose = state.readingPose;
        const alpha = reducedMotion ? 1 : 1 - Math.exp(-5.4 * dt);
        scratch.target.set(pose.position[0], pose.position[1], pose.position[2]);
        cam.lerp(scratch.target, alpha);
        state.yawTarget = pose.yaw;
        state.pitchTarget = pose.pitch ?? -0.02;
      }
    } else if (state.path) {
      /* ------------------------------------------------ path travel */
      const path = state.path;
      const point = path.points[path.index];

      if (!point) {
        state.path = null;
      } else {
        const dx = point.x - cam.x;
        const dz = point.z - cam.z;
        const distance = Math.hypot(dx, dz);
        const speed = WALK_SPEED * 1.12;

        if (distance < 0.14) {
          path.index += 1;
          if (path.index >= path.points.length) {
            state.path = null;
            if (path.pose) {
              state.yawTarget = path.pose.yaw;
              state.pitchTarget = path.pose.pitch ?? -0.02;
            }
          }
        } else {
          const step = Math.min(speed * dt, distance);
          const nextX = cam.x + (dx / distance) * step;
          const nextZ = cam.z + (dz / distance) * step;

          if (!fieldBlocked(nextX, cam.z, rects)) cam.x = nextX;
          if (!fieldBlocked(cam.x, nextZ, rects)) cam.z = nextZ;

          const aheadDistance = Math.min(path.index + 1, path.points.length - 1);
          const lookAhead = distance < 0.35 ? path.points[aheadDistance] : point;
          state.yawTarget = yawToward(cam.x, cam.z, lookAhead.x, lookAhead.z);
          if (path.pose) {
            state.pitchTarget = THREE.MathUtils.damp(
              state.pitchTarget,
              path.pose.pitch ?? -0.02,
              4,
              dt
            );
          }
          state.bobPhase += speed * dt * 4.0;
          state.velocity.x = (dx / distance) * speed;
          state.velocity.z = (dz / distance) * speed;
        }
      }
    } else {
      /* ------------------------------------------------ free movement */
      const strafe = state.locked || state.touch;

      let forwardInput =
        (state.move.forward ? 1 : 0) - (state.move.back ? 1 : 0) - state.joystick.y;
      let strafeInput = strafe
        ? (state.move.right ? 1 : 0) - (state.move.left ? 1 : 0) + state.joystick.x
        : 0;
      const turnInput = strafe
        ? 0
        : (state.move.right ? 1 : 0) - (state.move.left ? 1 : 0);

      forwardInput = Math.max(-1, Math.min(1, forwardInput));
      strafeInput = Math.max(-1, Math.min(1, strafeInput));

      scratch.forward.set(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
      scratch.right.set(Math.cos(state.yaw), 0, -Math.sin(state.yaw));

      let targetVX =
        (scratch.forward.x * forwardInput + scratch.right.x * strafeInput) *
        (strafeInput !== 0 && forwardInput === 0 ? STRAFE_SPEED : WALK_SPEED);
      let targetVZ =
        (scratch.forward.z * forwardInput + scratch.right.z * strafeInput) *
        (strafeInput !== 0 && forwardInput === 0 ? STRAFE_SPEED : WALK_SPEED);

      // Straight-line envelope for diagonal movement.
      const targetLength = Math.hypot(targetVX, targetVZ);
      if (targetLength > WALK_SPEED) {
        targetVX = (targetVX / targetLength) * WALK_SPEED;
        targetVZ = (targetVZ / targetLength) * WALK_SPEED;
      }

      const currentLength = Math.hypot(state.velocity.x, state.velocity.z);
      const dampRate = targetLength < 0.02 && currentLength < 0.03 ? 13 : 9.5;
      state.velocity.x = THREE.MathUtils.damp(state.velocity.x, targetVX, dampRate, dt);
      state.velocity.z = THREE.MathUtils.damp(state.velocity.z, targetVZ, dampRate, dt);

      state.yawTarget += turnInput * TURN_SPEED * dt;

      const moving = Math.hypot(state.velocity.x, state.velocity.z);
      if (moving > 0.004) {
        const nextX = cam.x + state.velocity.x * dt;
        const nextZ = cam.z + state.velocity.z * dt;

        if (!fieldBlocked(nextX, cam.z, rects)) cam.x = nextX;
        else state.velocity.x *= 0.2;
        if (!fieldBlocked(cam.x, nextZ, rects)) cam.z = nextZ;
        else state.velocity.z *= 0.2;

        state.bobPhase += Math.min(moving, WALK_SPEED) * dt * 4.2;
      }
    }

    /* ------------------------------------------------ look smoothing */
    if (Math.abs(state.yawTarget) > Math.PI * 4) {
      const wrap = Math.round(state.yawTarget / (Math.PI * 2)) * Math.PI * 2;
      state.yawTarget -= wrap;
      state.yaw -= wrap;
    }

    const lookAlpha = reducedMotion ? 1 : 1 - Math.exp(-14 * dt);
    state.yaw = dampAngle(state.yaw, state.yawTarget, lookAlpha);
    state.pitch += (state.pitchTarget - state.pitch) * lookAlpha;
    state.pitch = Math.max(-0.82, Math.min(0.6, state.pitch));

    const speedNow = Math.hypot(state.velocity.x, state.velocity.z);
    const bobbing =
      !reducedMotion && !state.paused && !state.path && speedNow > 0.1
        ? Math.sin(state.bobPhase) * 0.005
        : 0;

    camera.position.y = EYE_HEIGHT + bobbing;
    camera.rotation.set(state.pitch, state.yaw, 0);
  });

  return null;
}
