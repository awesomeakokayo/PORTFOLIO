import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Layers } from 'lucide-react';
import { useScrollReveal, FADE_UP, STAGGER } from '../../hooks/useScrollReveal';
import { credentials } from '../../data/credentials';
import SectionLabel from '../ui/SectionLabel';
import TechBadge from '../ui/TechBadge';

const iconMap = {
  BookOpen: BookOpen,
  Users: Users,
  Layers: Layers
};

export const Credibility = () => {
  const { ref, isInView } = useScrollReveal(0.15);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <section 
      id="credibility" 
      ref={ref}
      className="py-24 max-w-[1100px] mx-auto px-6"
    >
      <motion.div
        variants={prefersReducedMotion ? {} : FADE_UP}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12"
      >
        <SectionLabel>CREDIBILITY</SectionLabel>
        <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-primary leading-[1.1]">
          The receipts.
        </h2>
      </motion.div>

      {/* Receipts Grid */}
      <motion.div
        variants={prefersReducedMotion ? {} : STAGGER}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {credentials.map((cred) => {
          const IconComponent = iconMap[cred.iconName];
          return (
            <motion.div
              key={cred.id}
              variants={prefersReducedMotion ? {} : FADE_UP}
              className="bg-surface border border-border rounded-2xl p-8 hover:border-border-lit hover:bg-elevated transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Icon & Label */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-accent">
                    {IconComponent && <IconComponent size={40} className="stroke-[1.5]" />}
                  </div>
                  <span className="font-body text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                    {cred.label}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-display font-semibold text-[22px] text-text-primary mb-3">
                  {cred.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-[15px] text-text-secondary leading-[1.75] mb-6">
                  {cred.body}
                </p>
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cred.tags.map((tag) => (
                  <TechBadge key={tag} label={tag} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Credibility;
