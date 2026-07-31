import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, FADE_UP } from '../../hooks/useScrollReveal';
import SectionLabel from '../ui/SectionLabel';
import StatusDot from '../ui/StatusDot';
import GhostButton from '../ui/GhostButton';

export const CurrentlyBuilding = () => {
  const { ref, isInView } = useScrollReveal(0.15);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const buildItems = [
    {
      id: 'ajo',
      name: 'Àjó',
      type: 'Rotating Savings App',
      note: 'Core savings circles live. Payment integrations in progress.',
      stack: ['React Native', 'Expo', 'FastAPI', 'Groq AI'],
      status: 'building',
      statusLabel: 'In active development',
      linkText: null,
      href: null
    },
    {
      id: 'emohabit',
      name: 'EmoHabit',
      type: 'AI Habit Tracker',
      note: 'Core habit scheduling engine complete. Streak system and freeze tokens in testing.',
      status: 'building',
      statusLabel: 'In active development',
      linkText: 'Follow @Emo_habits',
      href: 'https://twitter.com/Emo_habits'
    },
    {
      id: 'techskillhub',
      name: 'TechSkillHub',
      type: 'Free Tech Education for Africa',
      note: '17 tracks live. Guided Path (paid sequential learning) launched. Growing resource library.',
      stack: [],
      status: 'live',
      statusLabel: 'Live',
      linkText: 'Visit techskillhub.cv',
      href: 'https://techskillhub.cv'
    }
  ];

  return (
    <section 
      id="currently-building" 
      ref={ref}
      className="w-full bg-base border-t border-border py-24 px-6 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          variants={prefersReducedMotion ? {} : FADE_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-start"
        >
          <SectionLabel>CURRENTLY BUILDING</SectionLabel>

          {/* Header Row with Title and Live Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 mb-10">
            <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-primary leading-[1.1]">
              Velocity indicators.
            </h2>
            
            {/* Live Indicator */}
            <div className="flex items-center gap-2 font-body text-[12px] text-text-muted self-start sm:self-auto select-none mt-1 sm:mt-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-glow absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
              </span>
              <span>Updated July 31, 2026</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {buildItems.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-border rounded-xl p-6 sm:p-8 hover:border-border-lit transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                {/* Left Side: Info */}
                <div className="flex items-start gap-4">
                  {/* Status Dot */}
                  <div className="mt-1.5 shrink-0">
                    <StatusDot status={item.status} />
                  </div>
                  
                  {/* Text details */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-display font-medium text-[16px] sm:text-[18px] text-text-primary">
                        {item.name}
                      </h3>
                      <span className="font-body text-xs text-text-muted">
                        — {item.type}
                      </span>
                    </div>
                    
                    <p className="font-body text-[14px] text-text-secondary leading-relaxed mt-1">
                      {item.note}
                    </p>

                    {item.stack && item.stack.length > 0 && (
                      <p className="font-body text-xs text-text-muted mt-1">
                        {item.stack.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side: Link Action */}
                {item.href && (
                  <div className="shrink-0 self-start sm:self-auto">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center font-display font-medium text-xs text-text-secondary border border-border-lit rounded-full px-4 py-2 transition-all duration-200 hover:border-accent hover:text-text-primary cursor-pointer whitespace-nowrap"
                    >
                      {item.linkText}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
