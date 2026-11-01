"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const nav = siteContent.nav;

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const closeAndRestoreFocus = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return (
    <>
      <header className="site-nav" aria-label="Main navigation">
        <Link
          href="/"
          className="brand-mark"
          aria-label={`${nav.brandName}, home`}
          data-cursor-label={nav.cursorHome}
        >
          <span className="brand-mark__symbol">
            {nav.brand.slice(0, 2)}<span>.</span>
          </span>
          <span className="brand-mark__name">{nav.brandName}</span>
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          {nav.links.map((item) => (
            <Link
              className="nav-link"
              key={item.href}
              href={item.href}
              data-cursor-label={nav.cursorGo}
            >
              <span className="nav-link__viewport">
                <motion.span
                  className="nav-link__track"
                  initial={{ y: "0%" }}
                  whileHover={{ y: "-50%" }}
                  transition={{ duration: 0.32, ease }}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">{item.label}</span>
                </motion.span>
              </span>
            </Link>
          ))}
        </nav>

        <motion.div
          className="site-nav__desktop-cta-wrap"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link className="site-nav__cta" href="/#contact" data-cursor-label={nav.cursorTalk}>
            {nav.talk}
            <span className="site-nav__cta-arrow" aria-hidden="true">↗</span>
          </Link>
        </motion.div>

        <button
          ref={menuButtonRef}
          className="site-nav__menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? nav.closeLabel : nav.menuLabel}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{nav.menu}</span>
          <span className={`site-nav__menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={dialogRef}
            id="mobile-navigation"
            className="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={nav.dialogLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="menu-overlay__topbar">
              <span className="menu-overlay__eyebrow">{nav.brandName}</span>
              <button
                ref={closeButtonRef}
                className="menu-overlay__close"
                type="button"
                onClick={closeAndRestoreFocus}
                aria-label={nav.closeLabel}
              >
                <span>{nav.close}</span>
                <span className="menu-overlay__close-icon" aria-hidden="true">×</span>
              </button>
            </div>

            <nav className="menu-overlay__links" aria-label="Mobile primary">
              {nav.links.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.07 }}
                >
                  <Link className="menu-overlay__link" href={item.href} onClick={closeMenu}>
                    <span className="menu-overlay__number">0{index + 1}</span>
                    <span>{item.label}</span>
                    <span className="menu-overlay__arrow" aria-hidden="true">↗</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="menu-overlay__bottom">
              <span className="menu-overlay__eyebrow">{siteContent.contact.eyebrow}</span>
              <Link className="menu-overlay__contact" href="/#contact" onClick={closeMenu}>
                {nav.talk} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
