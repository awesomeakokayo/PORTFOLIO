"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteContent } from "@/lib/content";
import { HeroVisual } from "@/components/hero-visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const hero = siteContent.hero;
  const reducedMotion = useReducedMotion();
  const lineTransition = (index: number) => ({
    duration: 1.05,
    ease,
    delay: reducedMotion ? 0 : index * 0.08,
  });

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__inner">
        <motion.p
          className="hero-section__kicker"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {hero.kicker}
        </motion.p>

        <h1 id="hero-title" className="hero-section__title">
          <span className="hero-line-mask">
            <motion.span className="hero-line" initial={reducedMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={lineTransition(0)}>
              {hero.lineOne} <span className="accent-text">{hero.accentWord}</span>
            </motion.span>
          </span>
          <span className="hero-line-mask">
            <motion.span className="hero-line" initial={reducedMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={lineTransition(1)}>
              {hero.lineTwo}
            </motion.span>
          </span>
          <span className="hero-line-mask">
            <motion.span className="hero-line hero-section__serif" initial={reducedMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={lineTransition(2)}>
              {hero.serifWord}
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-section__description"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: reducedMotion ? 0 : 0.38 }}
        >
          {hero.description}
        </motion.p>
        <motion.p
          className="hero-section__tag"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: reducedMotion ? 0 : 0.44 }}
        >
          {hero.availability}
        </motion.p>
        <motion.p
          className="hero-section__meta"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reducedMotion ? 0 : 0.52 }}
        >
          {hero.location}
        </motion.p>
      </div>

      <div className="hero-section__visual">
        <HeroVisual />
      </div>

      <motion.a
        className="hero-section__scroll"
        href="#work"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reducedMotion ? 0 : 0.9 }}
      >
        <span>{hero.scroll}</span>
        <span className="hero-section__scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
