import { useEffect } from "react";

export default function FramerMotionLayer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const selectors = [
      "#work > div > div:last-child article",
      "#services > div > div:last-child > div",
      "#about > div > div > div",
      "#contact > div > *",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.style.setProperty("--motion-delay", `${Math.min(index * 90, 360)}ms`);
      });
    });

    document.querySelectorAll("#work h2, #services h2, #about h2, #contact h2").forEach((element) => {
      element.classList.add("motion-reveal", "motion-reveal-side");
    });

    const nav = document.querySelector("header");
    nav?.classList.add("motion-nav");

    const hero = document.querySelector("main > section:first-child");
    hero?.querySelector("h1")?.classList.add("hero-title-reveal");
    hero?.querySelectorAll("p, a").forEach((element, index) => {
      element.classList.add("hero-item-reveal");
      element.style.setProperty("--motion-delay", `${220 + index * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".motion-reveal").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
