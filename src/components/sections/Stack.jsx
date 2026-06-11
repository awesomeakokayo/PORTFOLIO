import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Rocket } from 'lucide-react';
import { useScrollReveal, FADE_UP, STAGGER } from '../../hooks/useScrollReveal';
import { capabilities } from '../../data/stack';
import SectionLabel from '../ui/SectionLabel';
import TechBadge from '../ui/TechBadge';

const iconMap = {
  Smartphone: Smartphone,
  Brain: Brain,
  Rocket: Rocket
};

export const Stack = () => {
  const { ref, isInView } = useScrollReveal(0.15);
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <section 
      id="stack" 
      ref={ref}
      className="py-24 max-w-[1100px] mx-auto px-6"
    >
      <motion.div
        variants={prefersReducedMotion ? {} : FADE_UP}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12"
      >
        <SectionLabel>WHAT I BUILD</SectionLabel>
        <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-primary leading-[1.1]">
          End-to-end. AI-native.<br />
          No handoffs needed.
        </h2>
      </motion.div>

      {/* Grid of Cards */}
      <motion.div
        variants={prefersReducedMotion ? {} : STAGGER}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {capabilities.map((cap) => {
          const IconComponent = iconMap[cap.iconName];
          return (
            <motion.div
              key={cap.id}
              variants={prefersReducedMotion ? {} : FADE_UP}
              className="bg-surface border border-border rounded-2xl p-8 hover:border-border-lit hover:bg-elevated transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Icon */}
                <div className="text-accent mb-5 inline-block">
                  {IconComponent && <IconComponent size={40} className="stroke-[1.5]" />}
                </div>
                
                {/* Title */}
                <h3 className="font-display font-semibold text-[22px] text-text-primary mb-3">
                  {cap.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-[15px] text-text-secondary leading-[1.75] mb-6">
                  {cap.body}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cap.badges.map((badge) => (
                  <TechBadge key={badge} label={badge} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Stack;
