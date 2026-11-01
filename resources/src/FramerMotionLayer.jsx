import { useEffect } from "react";

export default function FramerMotionLayer() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) return undefined;

    let observer;
    try {
      const elements = Array.from(document.querySelectorAll(".motion-reveal"));
      if (!elements.length) return undefined;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("motion-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      elements.forEach((element, index) => {
        if (element.closest(".project-grid")) {
          element.style.setProperty("--motion-delay", Math.min(index * 70, 210) + "ms");
        }
        observer.observe(element);
      });
      document.documentElement.classList.add("motion-observer-enabled");
    } catch {
      document.documentElement.classList.remove("motion-observer-enabled");
      observer?.disconnect();
      return undefined;
    }

    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove("motion-observer-enabled");
    };
  }, []);

  return null;
}
