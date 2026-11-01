"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { siteContent } from "@/lib/content";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 620, damping: 46, mass: 0.35 });
  const y = useSpring(pointerY, { stiffness: 620, damping: 46, mass: 0.35 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState(siteContent.nav.cursorDefault);

  useEffect(() => {
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const root = document.documentElement;

    const syncAvailability = () => {
      const shouldEnable = finePointer.matches && !reducedMotion.matches;
      root.classList.toggle("has-custom-cursor", shouldEnable);
      setEnabled(shouldEnable);
      if (!shouldEnable) {
        setVisible(false);
        setInteractive(false);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!root.classList.contains("has-custom-cursor")) return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>("[data-cursor], a, button, [role='button']");
      if (!element) {
        setInteractive(false);
        return;
      }
      setInteractive(true);
      setLabel(element.dataset.cursorLabel || (element.dataset.cursor === "view" ? siteContent.work.viewLabel : siteContent.nav.cursorDefault));
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };
    const handleBlur = () => setVisible(false);

    syncAvailability();
    finePointer.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleBlur);

    return () => {
      finePointer.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleBlur);
      root.classList.remove("has-custom-cursor");
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="site-cursor"
      style={{ x, y }}
      initial={false}
      animate={{
        width: interactive ? 68 : 7,
        height: interactive ? 68 : 7,
        opacity: visible ? 1 : 0,
        backgroundColor: interactive ? "var(--color-accent)" : "var(--color-foreground)",
      }}
      transition={{
        width: { type: "spring", stiffness: 360, damping: 28 },
        height: { type: "spring", stiffness: 360, damping: 28 },
        opacity: { duration: 0.16 },
        backgroundColor: { duration: 0.16 },
      }}
    >
      <motion.span
        className="site-cursor__label"
        initial={false}
        animate={{ opacity: interactive ? 1 : 0, scale: interactive ? 1 : 0.7 }}
        transition={{ duration: 0.14 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
