"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion, useMotionValue, useSpring, motion } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { siteContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";

function MagneticButton() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.35 });
  const reducedMotion = useReducedMotion();
  const contact = siteContent.contact;
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * 0.18);
    rawY.set(dy * 0.18);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      className="magnetic-button"
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      data-cursor-label={siteContent.nav.cursorSend}
    >
      <span>{contact.button}</span>
      <span className="magnetic-button__arrow" aria-hidden="true">
        <ArrowUpRight size="1em" strokeWidth={2.2} />
      </span>
    </motion.a>
  );
}

export function ContactSection() {
  const contact = siteContent.contact;

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__inner">
        <Reveal>
          <p className="section-kicker">{contact.eyebrow}</p>
          <h2 className="contact-section__title" id="contact-title">
            <span>{contact.lineOne}</span>
            <span>{contact.lineTwo}</span>
          </h2>
        </Reveal>

        <div className="contact-section__action-row">
          <p className="contact-section__email-note">{contact.emailNote}</p>
          <Reveal delay={0.12}>
            <MagneticButton />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <nav className="contact-links" aria-label="Contact and social links">
            {contact.links
              .filter((item) => Boolean(item.href))
              .map((item) => (
                <Link
                  className="contact-link"
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  data-cursor-label="OPEN"
                >
                  {item.label}{" "}
                  <span className="contact-link__arrow" aria-hidden="true">
                    <ArrowUpRight size="1em" strokeWidth={2.2} />
                  </span>
                </Link>
              ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
