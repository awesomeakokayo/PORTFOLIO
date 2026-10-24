import { useEffect, useRef } from "react";

export default function CurtainReveal({ children, className = "" }) {
  const wrapperRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!wrapper || !left || !right) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        left.style.transform = "translate3d(-112%, 0, 0)";
        right.style.transform = "translate3d(112%, 0, 0)";
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const start = viewport * 0.86;
      const end = viewport * -0.14;
      const raw = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const progress = raw * raw * (3 - 2 * raw);
      const shift = 112 * progress;
      const fold = (1 - progress) * 9;

      left.style.transform = "translate3d(-" + shift.toFixed(2) + "%, 0, 0) rotateY(" + fold.toFixed(2) + "deg)";
      right.style.transform = "translate3d(" + shift.toFixed(2) + "%, 0, 0) rotateY(-" + fold.toFixed(2) + "deg)";
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reducedMotion.addEventListener?.("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener?.("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={"curtain-reveal " + className}>
      {children}
      <div ref={leftRef} className="curtain-panel curtain-panel-left" aria-hidden="true">
        <span className="curtain-fold" />
      </div>
      <div ref={rightRef} className="curtain-panel curtain-panel-right" aria-hidden="true">
        <span className="curtain-fold" />
      </div>
    </div>
  );
}
