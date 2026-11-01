"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { HeroVisualFallback } from "@/components/hero-visual-fallback";

const LazyHeroCanvas = dynamic(
  () => import("@/components/hero-canvas").then((module) => module.HeroCanvas),
  {
    ssr: false,
    loading: () => <HeroVisualFallback />,
  },
);

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }


  render() {
    if (this.state.failed) return <HeroVisualFallback />;
    return this.props.children;
  }
}

export function HeroVisual() {
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency || 8;
    const canvas = document.createElement("canvas");
    let webglAvailable = false;

    try {
      webglAvailable = Boolean(
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
          canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
      );
    } catch {
      webglAvailable = false;
    }

    const lowEnd = (typeof memory === "number" && memory <= 4) || cores <= 2;
    setUseFallback(reducedMotion || lowEnd || !webglAvailable);
  }, []);

  return (
    <CanvasBoundary>
      {useFallback ? <HeroVisualFallback /> : <LazyHeroCanvas />}
    </CanvasBoundary>
  );
}
