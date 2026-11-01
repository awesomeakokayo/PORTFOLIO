"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { siteContent, type Project } from "@/lib/content";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 });
  const nameClass = project.name.length > 12 ? " project-card__name--small" : "";
  const work = siteContent.work;

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(x * 3);
    rawY.set(y * -3);
  };

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.article
      className="project-card-shell"
      style={{ top: `calc(var(--stack-base, 92px) + ${index * 13}px)`, rotateX, rotateY, perspective: 1400 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      initial={reducedMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease, delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.18) }}
    >
      <div className={`project-card project-card--${project.theme}`}>
        <div className="project-card__top">
          <span className="project-card__index">
            {String(index + 1).padStart(2, "0")} / {String(siteContent.projects.length).padStart(2, "0")}
          </span>
          <span className="project-card__category">{project.category}</span>
        </div>

        <div className="project-card__center">
          <span className="project-card__logo">
            <Image
              className="project-card__logo-image"
              src={project.logo.src}
              alt={project.logo.alt}
              fill
              sizes="(max-width: 640px) 160px, 260px"
            />
          </span>
          <h3 className={`project-card__name${nameClass}`}>{project.name}</h3>
          <p className="project-card__note">{project.description}</p>
        </div>

        <div className="project-card__meta">
          <span className="project-card__pill">{project.year}</span>
          <span className="project-card__pill">{project.discipline}</span>
        </div>

        {project.href && (
          <>
            <span className="project-card__view" aria-hidden="true">{work.viewLabel}</span>
            <a
              className="project-card__link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${work.viewLabel} ${project.name} in a new tab`}
              data-cursor-label={work.viewLabel}
            />
          </>
        )}
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  const work = siteContent.work;

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-shell work-section__heading-row">
        <div className="work-section__heading-copy">
          <Reveal>
            <p className="section-kicker">{work.eyebrow}</p>
            <h2 className="section-heading" id="work-title">{work.title}</h2>
            <p className="section-intro">{work.intro}</p>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="work-section__side-note">{work.sideNote.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
        </Reveal>
      </div>

      <div className="work-stack">
        {siteContent.projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
