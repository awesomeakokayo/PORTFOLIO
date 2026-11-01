"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { siteContent, type Project } from "@/lib/content";
import { ProjectMockup } from "@/components/project-mockup";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 });
  const visualX = useSpring(0, { stiffness: 120, damping: 24, mass: 0.7 });
  const visualY = useSpring(0, { stiffness: 120, damping: 24, mass: 0.7 });
  const titleClass = project.name.length > 12 ? " project-card__title--small" : "";

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(x * 4.4);
    rawY.set(y * -4.4);
    visualX.set(x * 40);
    visualY.set(y * 40);
  };

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
    visualX.set(0);
    visualY.set(0);
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
          <span className="project-card__category">{project.category}</span>
        </div>

        <motion.div className="project-card__visual" style={{ x: visualX, y: visualY }}>
          <ProjectMockup project={project} />
        </motion.div>

        <h3 className={`project-card__title${titleClass}`}>{project.name}</h3>

        <div className="project-card__hover-info">
          <p className="project-card__description">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="project-card__tags" aria-label={siteContent.work.tagsLabel}>
              {project.tags.map((tag) => (
                <span className="project-card__tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <span className="project-card__view" aria-hidden="true">{siteContent.work.viewLabel}</span>
        <Link
          className="project-card__link"
          href={project.href || siteContent.work.fallbackLink}
          aria-label={`${siteContent.work.viewLabel} ${project.name}`}
          data-cursor="view"
          data-cursor-label={siteContent.work.viewLabel}
        >
          {`${siteContent.work.viewLabel} ${project.name}`}
        </Link>
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
