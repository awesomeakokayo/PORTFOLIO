import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#stack' },
    { label: 'About', href: '#about' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of the navbar
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

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-bg-glass border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1100px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '#top')}
            className="font-display font-bold text-2xl tracking-tight text-text-primary"
            aria-label="Awesome Akokayo Home"
          >
            A<span className="text-accent">A</span>
          </a>

          {/* Links Center - Desktop */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Right - Desktop */}
          <div className="hidden sm:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center font-display font-semibold text-sm text-white bg-accent rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--accent-glow)] cursor-pointer"
            >
              Let's Work →
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-text-primary focus:outline-none p-1"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface flex flex-col justify-center px-8 sm:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : idx * 0.05 + 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display font-bold text-3xl text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                className="mt-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="inline-flex items-center justify-center font-display font-semibold text-lg text-white bg-accent rounded-full px-8 py-3.5 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--accent-glow)] cursor-pointer"
                >
                  Let's Work →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
