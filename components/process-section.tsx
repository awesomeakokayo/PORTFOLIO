"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const process = siteContent.process;
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section className={`process-section${reducedMotion ? " process-section--reduced" : ""}`} id="process" aria-labelledby="process-title">
      <div className="process-desktop">
        <div className="process-pin-track" ref={sectionRef}>
          <div className="process-pin-inner">
            <div className="process-pin-inner__top">
              <div>
                <p className="section-kicker">{process.eyebrow}</p>
                <h2 className="section-heading" id="process-title">{process.title}</h2>
              </div>
              <span className="mono-label">{process.hint}</span>
            </div>

            <motion.div
              className="process-track"
              style={{ x: reducedMotion ? "0%" : x }}
            >
              {process.steps.map((step) => (
                <article className="process-panel" key={step.number}>
                  <span className="process-panel__number">{step.number} / {String(process.steps.length).padStart(2, "0")}</span>
                  <h3 className="process-panel__word">{step.word}</h3>
                  <p className="process-panel__sentence">{step.sentence}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="process-mobile">
        <div className="section-shell">
          <Reveal className="process-section__heading">
            <p className="section-kicker">{process.eyebrow}</p>
            <h2 className="section-heading">{process.mobileTitle}</h2>
          </Reveal>
          <div className="process-mobile__list">
            {process.steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04} amount={0.16}>
                <article className="process-mobile__item">
                  <span className="process-mobile__number">{step.number}</span>
                  <div>
                    <h3 className="process-mobile__word">{step.word}</h3>
                    <p className="process-mobile__sentence">{step.sentence}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
