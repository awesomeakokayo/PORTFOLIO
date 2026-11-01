import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MuseumWorld from "./world/MuseumWorld.jsx";
import MuseumHud from "./MuseumHud.jsx";
import { createEngineState } from "./world/engine.jsx";
import { getInteractiveReadingPose, INTERACTIVES } from "./world/plan.js";
import { HERITAGE, WORKSHOP, STUDIO } from "./world/content.js";
import { projects } from "../data/projects.js";
import { trackMuseumEvent } from "./analytics.js";
import "./museum.css";

const KEY_MAP = {
  w: "forward",
  arrowup: "forward",
  s: "back",
  arrowdown: "back",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right",
};

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  });

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useDocumentVisible() {
  const [visible, setVisible] = useState(() => {
    if (typeof document === "undefined") return true;
    return document.visibilityState !== "hidden";
  });

  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

function getRenderQuality() {
  if (typeof window === "undefined") return "high";

  const mobile = window.matchMedia?.("(max-width: 900px)")?.matches ?? false;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;

  return mobile || cores <= 4 || memory <= 4 ? "low" : "high";
}

function WebGLFallback({ onExit }) {
  return (
    <div className="museum-fallback" role="document">
      <p className="museum-fallback-kicker">3D MUSEUM</p>
      <h2 id="museum-title">The museum needs WebGL.</h2>
      <p>
        This browser or device could not start the interactive 3D galleries. The standard
        portfolio is still here, with the same selected work, experience and contact details.
      </p>
      <button type="button" className="museum-fallback-button" onClick={onExit} autoFocus>
        Return to the portfolio
      </button>
    </div>
  );
}

export default function MuseumExperience({ onExit }) {
  const dialogRef = useRef(null);
  const viewportRef = useRef(null);
  const previousFocusRef = useRef(null);
  const panelRef = useRef(null);
  const nearRef = useRef(null);
  const dragRef = useRef(null);
  const interactivesRef = useRef({});
  const reducedMotion = useReducedMotion();
  const documentVisible = useDocumentVisible();
  const [webglSupported] = useState(canUseWebGL);
  const [quality] = useState(getRenderQuality);
  const [nearInteractive, setNearInteractive] = useState(null);
  const [room, setRoom] = useState(null);
  const [hoverProject, setHoverProject] = useState(null);
  const [panel, setPanel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [locked, setLocked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  const engine = useRef(createEngineState());

  /* ---------------------------------------------------------- helpers */
  const clearMovement = useCallback(() => {
    engine.current.move = { forward: false, back: false, left: false, right: false };
    engine.current.joystick.x = 0;
    engine.current.joystick.y = 0;
  }, []);

  const releasePointer = useCallback(() => {
    if (document.pointerLockElement) document.exitPointerLock?.();
  }, []);

  const openPanel = useCallback(
    (next) => {
      if (panelRef.current) return;
      panelRef.current = next;
      engine.current.paused = true;
      engine.current.readingPose = next.pose ?? null;
      engine.current.path = null;
      clearMovement();
      releasePointer();
      setPanel(next);
      trackMuseumEvent("museum_panel_open", { kind: next.kind, id: next.id ?? null });
    },
    [clearMovement, releasePointer]
  );

  const closePanel = useCallback(() => {
    if (!panelRef.current) return;
    panelRef.current = null;
    engine.current.paused = false;
    engine.current.readingPose = null;
    setPanel(null);
    window.requestAnimationFrame(() => viewportRef.current?.focus());
  }, []);

  const interactWith = useCallback((interactive) => {
    if (!interactive) return;
    const id = interactive.id;
    const pose = getInteractiveReadingPose(id);

    if (interactive.kind === "project") {
      const project = projects.find((entry) => entry.slug === id);
      if (!project) return;
      openPanel({ kind: "project", id, project, pose });
      return;
    }
    if (interactive.kind === "heritage") {
      openPanel({ kind: "heritage", id, content: HERITAGE, pose });
      return;
    }
    if (interactive.kind === "workshop") {
      openPanel({ kind: "workshop", id, content: WORKSHOP, pose });
      return;
    }
    if (interactive.kind === "contact") {
      openPanel({ kind: "contact", id, content: STUDIO, pose });
      return;
    }
    if (interactive.kind === "exit") {
      openPanel({ kind: "exit", id, pose: null });
    }
  }, [openPanel]);

  const handleNearChange = useCallback((interactive) => {
    nearRef.current = interactive;
    setNearInteractive(interactive);
  }, []);

  const handleRoomChange = useCallback((nextRoom) => {
    if (!nextRoom) return;
    setRoom(nextRoom);
    trackMuseumEvent("museum_room_enter", { room: nextRoom.id });
  }, []);

  const handleSelectProjectForClick = useCallback(
    (project) => {
      if (!project || panelRef.current || menu) return;
      const interactive = interactivesRef.current[project.slug];
      if (!interactive) return;

      if (nearRef.current?.id === project.slug) {
        interactWith(interactive);
        return;
      }
      // Far away: walk to the exhibit instead of opening a panel remotely.
      const api = engine.current.api;
      api?.goTo?.(interactive.x, interactive.z);
      trackMuseumEvent("museum_approach", { exhibit: project.slug });
    },
    [interactWith, menu]
  );

  const travel = useCallback(
    (roomId) => {
      if (panelRef.current) closePanel();
      setMenu(false);
      clearMovement();
      const api = engine.current.api;
      const moved = api?.travel?.(roomId);
      trackMuseumEvent("museum_travel", { to: roomId, animated: Boolean(moved) });
      window.requestAnimationFrame(() => viewportRef.current?.focus());
    },
    [clearMovement, closePanel]
  );

  const approachExhibit = useCallback(
    (slug) => {
      const interactive = interactivesRef.current[slug];
      if (!interactive) return;
      if (panelRef.current) closePanel();
      setHoverProject(null);
      clearMovement();
      const api = engine.current.api;
      api?.goTo?.(interactive.x, interactive.z);
      trackMuseumEvent("museum_approach", { exhibit: slug });
      window.requestAnimationFrame(() => viewportRef.current?.focus());
    },
    [clearMovement, closePanel]
  );

  const exitMuseum = useCallback(() => {
    trackMuseumEvent("museum_exit");
    engine.current.paused = true;
    engine.current.path = null;
    engine.current.readingPose = null;
    releasePointer();
    clearMovement();
    if (dialogRef.current?.open) dialogRef.current.close();
    onExit();
  }, [clearMovement, onExit, releasePointer]);

  /* ---------------------------------------------------------- engine plumbing */
  const registerInteractives = useCallback(() => {
    // Approach targets for the HUD's exhibit index, straight from the plan.
    for (const interactive of INTERACTIVES) {
      interactivesRef.current[interactive.id] = interactive;
    }
  }, []);

  useEffect(() => {
    registerInteractives();
  }, [registerInteractives]);

  /* ---------------------------------------------------------- dialog lifecycle */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    previousFocusRef.current = document.activeElement;
    if (!dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    trackMuseumEvent("museum_open");

    const focusFrame = window.requestAnimationFrame(() => {
      dialog.querySelector("[data-museum-heading]")?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (document.pointerLockElement) document.exitPointerLock?.();
      if (dialog.open) dialog.close();
      const previous = previousFocusRef.current;
      if (previous instanceof HTMLElement && document.contains(previous)) previous.focus();
    };
  }, []);

  useEffect(() => {
    if (!webglSupported) trackMuseumEvent("museum_fallback", { reason: "webgl" });
  }, [webglSupported]);

  /* ---------------------------------------------------------- keyboard */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();

      if (key === "e") {
        if (!panelRef.current && !menu && nearRef.current) {
          event.preventDefault();
          interactWith(nearRef.current);
        }
        return;
      }

      if (panelRef.current || menu) return;
      const direction = KEY_MAP[key];
      if (!direction) return;

      event.preventDefault();
      engine.current.path = null;
      engine.current.move[direction] = true;
      setHintDismissed(true);
    };

    const onKeyUp = (event) => {
      const direction = KEY_MAP[event.key.toLowerCase()];
      if (direction) engine.current.move[direction] = false;
    };

    const onBlur = () => clearMovement();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [clearMovement, interactWith, menu]);

  /* ---------------------------------------------------------- pointer lock */
  useEffect(() => {
    const onLockChange = () => {
      const active = Boolean(document.pointerLockElement);
      setLocked(active);
      engine.current.locked = active;
      if (!active) clearMovement();
    };

    document.addEventListener("pointerlockchange", onLockChange);
    return () => document.removeEventListener("pointerlockchange", onLockChange);
  }, [clearMovement]);

  const requestLookMode = useCallback(() => {
    if (panelRef.current || menu) return;
    if (document.pointerLockElement) return;
    viewportRef.current?.requestPointerLock?.();
  }, [menu]);

  /* ---------------------------------------------------------- pointer look */
  const handlePointerDown = (event) => {
    if (panelRef.current || menu) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (locked || document.pointerLockElement) return;

    engine.current.path = null;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: 0,
      time: performance.now(),
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    if (panelRef.current || menu) return;

    if (document.pointerLockElement) {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      engine.current.yawTarget -= movementX * 0.00245;
      engine.current.pitchTarget = Math.max(
        -0.82,
        Math.min(0.6, engine.current.pitchTarget - movementY * 0.0021)
      );
      return;
    }

    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.moved += Math.abs(deltaX) + Math.abs(deltaY);

    engine.current.yawTarget -= deltaX * 0.0029;
    engine.current.pitchTarget = Math.max(
      -0.82,
      Math.min(0.6, engine.current.pitchTarget - deltaY * 0.0023)
    );
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);

    // A short, still pointer is a click: interact when something is near,
    // otherwise engage pointer-lock look mode on desktop.
    const quick = performance.now() - drag.time < 380;
    if (drag.moved > 30) setHintDismissed(true);
    if (quick && drag.moved < 7) {
      if (event.pointerType === "touch") {
        if (nearRef.current) interactWith(nearRef.current);
        return;
      }
      if (nearRef.current) {
        interactWith(nearRef.current);
        return;
      }
      requestLookMode();
    }
  };

  const handleJoystick = useCallback((x, y, active) => {
    engine.current.touch = active;
    engine.current.joystick.x = x;
    engine.current.joystick.y = y;
    if (active) {
      engine.current.path = null;
      setHintDismissed(true);
    }
  }, []);

  const handleCancel = useCallback(
    (event) => {
      event.preventDefault();
      if (panelRef.current) closePanel();
      else setMenu((open) => !open);
    },
    [closePanel]
  );

  const handleCanvasClick = useCallback(() => {
    if (!document.pointerLockElement) return;
    if (panelRef.current || menu) return;
    if (nearRef.current) interactWith(nearRef.current);
  }, [interactWith, menu]);

  /* lock pointer automatically after clicking "look mode" hint on desktop */
  useEffect(() => {
    if (!locked || hintDismissed) return;
    setHintDismissed(true);
  }, [locked, hintDismissed]);

  const canvasClassName =
    "museum-canvas" +
    (dragging ? " is-dragging" : "") +
    (hoverProject ? " is-over-exhibit" : "") +
    (locked ? " is-locked" : "");

  return (
    <dialog
      ref={dialogRef}
      className="museum-dialog"
      aria-labelledby="museum-title"
      onCancel={handleCancel}
    >
      <div className="museum-shell">
        {webglSupported ? (
          <>
            <div
              ref={viewportRef}
              className={canvasClassName}
              tabIndex={-1}
              aria-label="Interactive 3D museum. Move with WASD or the joystick, look around, press E to read exhibits."
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={endDrag}
              onPointerLeave={() => setHoverProject(null)}
              onClick={handleCanvasClick}
            >
              <Canvas
                aria-hidden="true"
                dpr={quality === "low" ? [1, 1.25] : [1, 1.75]}
                frameloop={documentVisible ? "always" : "never"}
                shadows={quality === "high" ? "soft" : false}
                camera={{ position: [0, 1.68, 4.75], fov: 58, near: 0.08, far: 62 }}
                gl={{
                  antialias: quality === "high",
                  powerPreference: "high-performance",
                  alpha: false,
                  stencil: false,
                }}
                onCreated={({ gl }) => {
                  gl.setClearColor("#0a0908", 1);
                  gl.toneMappingExposure = 1.26;
                }}
              >
                <MuseumWorld
                  engine={engine}
                  reducedMotion={reducedMotion}
                  quality={quality}
                  onNearChange={handleNearChange}
                  onRoomChange={handleRoomChange}
                  hoverProject={hoverProject}
                  nearInteractive={nearInteractive}
                  onHoverProject={setHoverProject}
                  onSelectProject={handleSelectProjectForClick}
                />
              </Canvas>
            </div>
            <MuseumHud
              room={room}
              locked={locked}
              menu={menu}
              panel={panel}
              nearInteractive={nearInteractive}
              hoverProject={hoverProject}
              showHint={!hintDismissed && !panel && !menu}
              onInteract={interactWith}
              onTravel={travel}
              onApproachExhibit={approachExhibit}
              onClosePanel={closePanel}
              onToggleMenu={() => setMenu((open) => !open)}
              onExit={exitMuseum}
              onJoystick={handleJoystick}
            />
          </>
        ) : (
          <WebGLFallback onExit={exitMuseum} />
        )}
      </div>
    </dialog>
  );
}
