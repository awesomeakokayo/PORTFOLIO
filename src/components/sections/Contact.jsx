import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Wrench, ClipboardList, Users, BriefcaseBusiness, Mic, GitFork } from 'lucide-react';

// lucide-react dropped the Github icon; use an inline SVG instead
const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// Twitter/X — removed from lucide-react; inline SVG replacement
const TwitterIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LinkedIn — removed from lucide-react; inline SVG replacement
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

import { useScrollReveal, FADE_UP } from '../../hooks/useScrollReveal';
import SectionLabel from '../ui/SectionLabel';
import AccentButton from '../ui/AccentButton';
import GhostButton from '../ui/GhostButton';

export const Contact = () => {
  const { ref, isInView } = useScrollReveal(0.15);
  const [showToast, setShowToast] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('awesomeakokayo@gmail.com');
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const availabilityCards = [
    { icon: Wrench,           text: "Freelance Projects" },
    { icon: ClipboardList,    text: "Contract Work" },
    { icon: Users,            text: "Co-Founder Talks" },
    { icon: BriefcaseBusiness,text: "Remote Full-Time" },
    { icon: Mic,              text: "Speaking Gigs" },
    { icon: GitFork,          text: "Open Source Collab" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/awesomeakokayo", icon: GithubIcon },
    { name: "Twitter/X", href: "https://twitter.com/awesomeakokayo", icon: TwitterIcon },
    { name: "LinkedIn", href: "https://linkedin.com/in/awesomeakokayo", icon: LinkedinIcon },
    { name: "TechSkillHub", href: "https://techskillhub.cv", icon: Globe }
  ];

  return (
    <section 
      id="contact" 
      ref={ref}
      className="min-h-[90vh] py-24 flex flex-col justify-center items-center bg-base px-6 overflow-hidden relative"
    >
      <div className="max-w-[700px] w-full mx-auto text-center flex flex-col items-center">
        <motion.div
          variants={prefersReducedMotion ? {} : FADE_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center w-full"
        >
          <SectionLabel>LET'S WORK</SectionLabel>

          {/* Section Heading */}
          <h2 className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight text-text-primary leading-[1.05] mb-6">
            Have an idea?<br />
            <span className="text-accent font-extrabold">I build things.</span>
          </h2>

          {/* Body Text */}
          <p className="font-body text-[16px] sm:text-[17px] text-text-secondary leading-[1.85] max-w-[560px] mb-12">
            Whether you need a product built from scratch, a developer 
            to join your team, or you're an investor curious about what 
            I'm working on — the door is open.<br /><br />
            Not looking to hire directly? If you know someone who needs 
            a builder, I'd love the introduction. Referrals are how good 
            work finds good people.
          </p>

          {/* Availability grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mb-16 max-w-[600px]">
            {availabilityCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3 text-left hover:border-border-lit transition-colors duration-200"
                >
                  <Icon size={16} className="shrink-0 text-accent" />
                  <span className="font-body text-[13px] sm:text-[14px] text-text-secondary truncate">
                    {card.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center">
            <a
              href="mailto:awesomeakokayo@gmail.com"
              className="inline-flex items-center justify-center font-display font-semibold text-[15px] text-white bg-accent rounded-full px-8 py-4 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--accent-glow)] cursor-pointer"
            >
              Send me an email
            </a>
            
            <a
              href="https://linkedin.com/in/awesomeakokayo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-display font-medium text-[15px] text-text-secondary border border-border-lit rounded-full px-8 py-4 transition-all duration-200 hover:border-accent hover:text-text-primary cursor-pointer"
            >
              Connect on LinkedIn
            </a>
          </div>

          {/* Visible Copy Email */}
          <button 
            onClick={handleCopyEmail}
            className="font-body text-[15px] text-text-muted hover:text-text-secondary transition-colors duration-200 mb-12 flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-label="Copy email address"
          >
            awesomeakokayo@gmail.com
            <span className="text-xs text-accent uppercase font-mono tracking-wider font-semibold">
              (click to copy)
            </span>
          </button>

          {/* Social Links Row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary hover:underline transition-all duration-200"
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

        </motion.div>
      </div>

      {/* Copy Email Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 50, x: '-50%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: '-50%' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 50, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-full shadow-lg font-body text-sm font-semibold z-50 select-none whitespace-nowrap"
          >
            Email copied ✓
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
