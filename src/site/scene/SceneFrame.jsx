import React, { useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

function canUseWebGL() {
  if (typeof window === "undefined") return false;
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

class SceneBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    /* A failed WebGL context should never take the page down. */
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function ContextGuard({ onLost }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (event) => {
      /* Let the browser know we want the context restored rather than
         leaving a permanently blank canvas behind. */
      event.preventDefault();
      onLost();
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [gl, onLost]);

  return null;
}

export default function SceneFrame({
  children,
  fallback,
  active = true,
  reduced = false,
  shadows = true,
  camera = { position: [0, 1.3, 6.4], fov: 30 },
  className = "",
}) {
  const [supported] = useState(canUseWebGL);
  const [failed, setFailed] = useState(false);
  const handleLost = useCallback(() => setFailed(true), []);

  if (!supported || failed) {
    return <div className={"rb-scene-fallback " + className}>{fallback}</div>;
  }

  return (
    <SceneBoundary fallback={<div className={"rb-scene-fallback " + className}>{fallback}</div>}>
      <Canvas
        className={"rb-canvas " + className}
        camera={camera}
        shadows={shadows}
        dpr={[1, 1.5]}
        frameloop={!active ? "never" : reduced ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
      >
        <ContextGuard onLost={handleLost} />
        {children}
      </Canvas>
    </SceneBoundary>
  );
}
