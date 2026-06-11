import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, FADE_UP } from '../../hooks/useScrollReveal';
import SectionLabel from '../ui/SectionLabel';
import AccentButton from '../ui/AccentButton';

export const InvestorSignal = () => {
  const { ref, isInView } = useScrollReveal(0.15);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
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

  const leftColumnPoints = [
    "Full-stack execution",
    "AI product experience",
    "Founder mindset",
    "Published researcher",
    "Community leadership",
    "Faith & long-term thinking"
  ];

  const rightColumnPoints = [
    "EmoHabit — SaaS habit tool",
    "TechSkillHub — EdTech Africa",
    "NaviPro — Career mentorship",
    "More ideas in the pipeline"
  ];

  return (
    <section 
      id="investor-signal" 
      className="w-full bg-surface border-t border-border py-24 px-6 overflow-hidden"
    >
      <div className="max-w-[900px] mx-auto" ref={ref}>
        <motion.div
          variants={prefersReducedMotion ? {} : FADE_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-start"
        >
          <SectionLabel>FOR INVESTORS</SectionLabel>
          
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-text-primary leading-[1.1] mb-8 text-left">
            Africa's tech market is a<br />
            <span className="text-accent">$180B opportunity by 2025.</span><br />
            I'm already building in it.
          </h2>

          <div className="space-y-6 font-body text-[16px] sm:text-[17px] text-text-secondary leading-[1.85] mb-12 text-left">
            <p>
              The African tech ecosystem is not a future bet — it is a present reality. 
              500M+ internet users. The youngest median population on earth. A generation 
              that is skipping legacy systems entirely and building digital-first. The 
              infrastructure is arriving. The developers are arriving. I am one of them.
            </p>
            <p>
              I have shipped four products. Two are live today. I've built AI integrations, 
              full-stack mobile apps, and a free education platform with 17 learning tracks 
              already in use by students across the continent. I have published research at 
              a Springer international conference. I move fast, I think in systems, and I 
              build things that earn user trust.
            </p>
            <p>
              If you invest in builders — not just ideas, but people who execute — then 
              this conversation is worth having. I'm looking for the right relationship, 
              not just funding. I build long-term, and I'm looking for partners who think 
              the same way.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left">
            {/* Left Column Card */}
            <div className="bg-base border border-border rounded-xl p-8">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                What I bring
              </h3>
              <hr className="border-border mb-6" />
              <ul className="space-y-3.5">
                {leftColumnPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[14px] font-body text-text-secondary">
                    <span className="text-accent select-none">◆</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column Card */}
            <div className="bg-base border border-border rounded-xl p-8">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                What I'm building toward
              </h3>
              <hr className="border-border mb-6" />
              <ul className="space-y-3.5">
                {rightColumnPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[14px] font-body text-text-secondary">
                    <span className="text-accent select-none">◆</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA at Bottom */}
          <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
            <AccentButton href="#contact" onClick={handleContactClick}>
              Start the Conversation →
            </AccentButton>
            <span className="font-body text-[13px] text-text-muted mt-2 text-center sm:text-left">
              This isn't a pitch deck. This is context. Reach out and I'll send you everything you need.
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default InvestorSignal;
