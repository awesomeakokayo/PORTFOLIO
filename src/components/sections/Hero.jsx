import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TechBadge from '../ui/TechBadge';
import AccentButton from '../ui/AccentButton';
import GhostButton from '../ui/GhostButton';

export const Hero = () => {
  const line1 = ["I", "build", "software"];
  const line2 = ["that", "belongs", "in", "the"];
  const line3 = ["future."];

  const totalWords = [...line1, ...line2, ...line3];
  
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Animation settings
  const wordDuration = prefersReducedMotion ? 0 : 0.6;
  const wordStagger = prefersReducedMotion ? 0 : 0.08;
  const fadeUpDuration = prefersReducedMotion ? 0 : 0.5;

  const handleScrollClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-screen relative flex items-center bg-base overflow-hidden px-6 pt-24 pb-16"
      style={{
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(255,98,0,0.05) 0%, transparent 70%)'
      }}
    >
      <div className="max-w-[1100px] w-full mx-auto flex flex-col items-start justify-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeUpDuration, delay: prefersReducedMotion ? 0 : 0.1 }}
          className="font-body text-[11px] font-medium tracking-[0.15em] text-text-secondary uppercase mb-6"
        >
          FULL-STACK DEVELOPER &nbsp;·&nbsp; AI BUILDER &nbsp;·&nbsp; OPEN TO WORK
        </motion.div>

        {/* Main Headline */}
        <h1 
          className="text-[clamp(40px,8.5vw,108px)] font-extrabold tracking-tighter leading-[1.05] text-text-primary mb-8"
          aria-label="I build software that belongs in the future."
        >
          {/* Line 1 */}
          <div className="flex flex-wrap overflow-hidden py-1">
            {line1.map((word, idx) => (
              <motion.span
                key={`word-1-${idx}`}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: wordDuration,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReducedMotion ? 0 : idx * wordStagger,
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap overflow-hidden py-1">
            {line2.map((word, idx) => (
              <motion.span
                key={`word-2-${idx}`}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: wordDuration,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReducedMotion ? 0 : (line1.length + idx) * wordStagger,
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 3 */}
          <div className="flex flex-wrap overflow-hidden py-1">
            {line3.map((word, idx) => (
              <motion.span
                key={`word-3-${idx}`}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: wordDuration,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReducedMotion ? 0 : (line1.length + line2.length + idx) * wordStagger,
                }}
                className="inline-block text-accent font-extrabold"
              >
                <motion.span
                  animate={prefersReducedMotion ? {} : {
                    textShadow: [
                      "0 0 0px rgba(255, 98, 0, 0)",
                      "0 0 18px rgba(255, 98, 0, 0.45)",
                      "0 0 0px rgba(255, 98, 0, 0)"
                    ]
                  }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.8,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  {word}
                </motion.span>
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: fadeUpDuration, delay: prefersReducedMotion ? 0 : 0.8 }}
          className="font-body text-[16px] sm:text-[18px] text-text-secondary leading-relaxed max-w-[560px]"
        >
          React Native. FastAPI. AI APIs. I take your idea from a napkin sketch to a deployed, production-grade product. Based in Nigeria. Available worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: fadeUpDuration, delay: prefersReducedMotion ? 0 : 1.0 }}
          className="flex flex-wrap gap-4 mt-10 w-full sm:w-auto"
        >
          <div className="w-full sm:w-auto">
            <AccentButton href="#contact" onClick={(e) => handleScrollClick(e, '#contact')}>
              Hire Me →
            </AccentButton>
          </div>
          <div className="w-full sm:w-auto">
            <GhostButton href="#ventures" onClick={(e) => handleScrollClick(e, '#ventures')}>
              See My Work
            </GhostButton>
          </div>
        </motion.div>

        {/* Stack Row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeUpDuration, delay: prefersReducedMotion ? 0 : 1.2 }}
          className="mt-16 w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            <span className="font-body text-[12px] text-text-muted shrink-0 uppercase tracking-wider font-semibold">
              Built with:
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full -mx-4 px-4 sm:mx-0 sm:px-0">
              {['React Native', 'FastAPI', 'PostgreSQL', 'Firebase', 'Groq AI', 'Gemini AI'].map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <a 
          href="#about" 
          onClick={(e) => handleScrollClick(e, '#about')}
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="cursor-pointer text-text-muted hover:text-text-secondary transition-colors duration-200"
          >
            <ChevronDown size={24} />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
