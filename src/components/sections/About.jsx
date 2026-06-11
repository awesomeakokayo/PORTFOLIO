import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, FADE_UP } from '../../hooks/useScrollReveal';
import SectionLabel from '../ui/SectionLabel';

export const About = () => {
  const { ref, isInView } = useScrollReveal(0.15);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const bulletPoints = [
    "Full-Stack Developer & AI Builder",
    "Founder — EmoHabit · TechSkillHub · NaviPro",
    "Springer ETMIS 2025 — Presenter",
    "NACOS Vice President — Coal City University",
    "Final Year Computer Science, Coal City University",
    "Community Driven.",
    "Based in Nigeria · Remote-Ready Worldwide"
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-24 max-w-[1100px] mx-auto px-6 overflow-hidden"
    >
      <motion.div
        variants={prefersReducedMotion ? {} : FADE_UP}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between"
      >
        {/* Left Column - Copy (60% width) */}
        <div className="w-full lg:w-[60%] flex flex-col items-start">
          <SectionLabel>ABOUT</SectionLabel>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-primary leading-[1.1] mb-8">
            From Nigeria.<br />
            Building for the world.
          </h2>
          
          <div className="space-y-6 font-body text-[16px] sm:text-[18px] text-text-secondary leading-[1.85]">
            <p>
              I'm Awesome Akokayo — a full-stack developer and AI builder who turns ideas into 
              production-grade software. My stack is React Native, React.js, FastAPI, PostgreSQL, 
              Firebase, and AI APIs. I don't just write code — I architect systems, make product 
              decisions, and ship things that actually work.
            </p>
            <p>
              I build because Africa deserves world-class software built by Africans who understand 
              the context. The problems here are real, the market is massive, and the window is open. 
              I've founded EmoHabit (an AI-powered habit tracker), launched TechSkillHub (free tech 
              education for over 18 tracks of African learners), and presented research at a Springer 
              international conference. I move fast and I build to last.
            </p>
            <p className="text-text-primary font-medium">
              I'm currently available for freelance projects, contract development, and co-founder 
              conversations. If you're an investor looking for someone building in the African tech 
              space — I'm worth a conversation. If you know someone who needs a builder, I'd love 
              the introduction.
            </p>
          </div>
        </div>

        {/* Right Column - Identifiers Card (40% width) */}
        <motion.div 
          variants={prefersReducedMotion ? {} : FADE_UP}
          transition={prefersReducedMotion ? {} : { delay: 0.12 }}
          className="w-full lg:w-[40%] bg-surface border border-border rounded-2xl p-8 lg:sticky lg:top-28"
        >
          <ul className="space-y-4">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-[15px] font-body text-text-secondary leading-relaxed">
                <span className="text-accent shrink-0 select-none mt-1">◆</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
