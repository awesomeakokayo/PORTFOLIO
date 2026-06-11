import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Twitter/X — removed from lucide-react; inline SVG replacement
const Twitter = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { useScrollReveal, FADE_UP, STAGGER } from '../../hooks/useScrollReveal';
import { ventures } from '../../data/ventures';
import SectionLabel from '../ui/SectionLabel';
import TechBadge from '../ui/TechBadge';
import GhostButton from '../ui/GhostButton';
import StatusDot from '../ui/StatusDot';

export const Ventures = () => {
  const { ref, isInView } = useScrollReveal(0.15);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const featuredVentures = ventures.filter(v => v.featured);
  const regularVentures = ventures.filter(v => !v.featured);

  return (
    <section 
      id="ventures" 
      ref={ref}
      className="py-24 max-w-[1100px] mx-auto px-6 overflow-hidden"
    >
      <motion.div
        variants={prefersReducedMotion ? {} : FADE_UP}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12"
      >
        <SectionLabel>VENTURES</SectionLabel>
        <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-primary leading-[1.1]">
          Things I've built.<br />
          Things I'm building.
        </h2>
      </motion.div>

      {/* Featured Ventures (Stacked, Full Width) */}
      <div className="space-y-8 mb-8">
        {featuredVentures.map((venture) => (
          <motion.div
            key={venture.id}
            variants={prefersReducedMotion ? {} : FADE_UP}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-surface border border-border rounded-2xl p-6 sm:p-10 hover:border-border-lit transition-all duration-200"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="font-display font-bold text-2xl sm:text-[28px] text-text-primary">
                {venture.name}
              </h3>
              <div className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-elevated border border-border-lit rounded-full text-xs font-body text-text-secondary select-none">
                <StatusDot status={venture.status} />
                <span>{venture.statusLabel}</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="font-body text-[13px] sm:text-sm font-medium text-text-secondary tracking-wide uppercase mb-4">
              {venture.tagline}
            </p>

            {/* Description */}
            <p className="font-body text-[15px] sm:text-[16px] text-text-secondary leading-relaxed max-w-[640px] mb-6">
              {venture.description}
            </p>

            {/* Problem block */}
            <div className="bg-[rgba(255,98,0,0.04)] border-l-2 border-accent rounded-r-md px-4 py-3 mb-6 max-w-[640px]">
              <p className="font-body text-[14px] text-text-secondary">
                <span className="text-accent font-semibold">Problem:</span> {venture.problem}
              </p>
            </div>

            {/* Stack badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {venture.stack.map((badge) => (
                <TechBadge key={badge} label={badge} />
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {venture.links.twitter && (
                <GhostButton href={venture.links.twitter}>
                  <Twitter size={16} className="mr-2" /> Follow @Emo_habits
                </GhostButton>
              )}
              {venture.links.live && (
                <GhostButton href={venture.links.live}>
                  Visit techskillhub.cv <ArrowUpRight size={16} className="ml-1" />
                </GhostButton>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Regular Ventures (2-Column Grid) */}
      <motion.div
        variants={prefersReducedMotion ? {} : STAGGER}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {regularVentures.map((venture) => (
          <motion.div
            key={venture.id}
            variants={prefersReducedMotion ? {} : FADE_UP}
            className="bg-surface border border-border rounded-2xl p-6 sm:p-8 hover:border-border-lit transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  {venture.name}
                </h3>
                <div className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-elevated border border-border-lit rounded-full text-xs font-body text-text-secondary select-none">
                  <StatusDot status={venture.status} />
                  <span>{venture.statusLabel}</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-body text-xs sm:text-[13px] font-medium text-text-secondary tracking-wide uppercase mb-4">
                {venture.tagline}
              </p>

              {/* Description */}
              <p className="font-body text-[14px] sm:text-[15px] text-text-secondary leading-relaxed mb-6">
                {venture.description}
              </p>

              {/* Problem block */}
              <div className="bg-[rgba(255,98,0,0.04)] border-l-2 border-accent rounded-r-md px-4 py-3 mb-6">
                <p className="font-body text-[13px] text-text-secondary">
                  <span className="text-accent font-semibold">Problem:</span> {venture.problem}
                </p>
              </div>
            </div>

            <div>
              {/* Stack badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {venture.stack.map((badge) => (
                  <TechBadge key={badge} label={badge} />
                ))}
              </div>

              {/* Links if any */}
              {Object.keys(venture.links).length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {venture.links.live && (
                    <GhostButton href={venture.links.live}>
                      Visit Website <ArrowUpRight size={16} className="ml-1" />
                    </GhostButton>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Ventures;
