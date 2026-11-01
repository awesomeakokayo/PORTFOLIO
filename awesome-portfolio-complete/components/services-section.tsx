"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { siteContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";

function ServiceGlyph({ kind }: { kind: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "phone") {
    return <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><rect {...common} x="9" y="3" width="14" height="26" rx="2" /><path {...common} d="M13 7h6M14 24h4" /></svg>;
  }
  if (kind === "orbit") {
    return <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><ellipse {...common} cx="16" cy="16" rx="12" ry="5" transform="rotate(-35 16 16)" /><ellipse {...common} cx="16" cy="16" rx="12" ry="5" transform="rotate(35 16 16)" /><circle cx="16" cy="16" r="2.5" fill="currentColor" /></svg>;
  }
  if (kind === "layers") {
    return <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path {...common} d="m16 4 12 7-12 7L4 11l12-7Z" /><path {...common} d="m4 16 12 7 12-7M4 21l12 7 12-7" /></svg>;
  }
  return <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><rect {...common} x="3" y="5" width="26" height="22" rx="2" /><path {...common} d="M3 11h26M8 8h.1M12 8h.1" /></svg>;
}

function ServiceTile({ service }: { service: (typeof siteContent.services.items)[number] }) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      className={`service-tile${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={() => setActive((value) => !value)}
      onBlur={() => setActive(false)}
      data-cursor-label={siteContent.nav.cursorExplore}
    >
      <motion.span className="service-tile__inner" whileTap={{ scale: 0.985 }}>
        <span className="service-tile__face service-tile__front">
          <span className="service-tile__number">{service.number}</span>
          <span className="service-tile__name">{service.name}</span>
        </span>
        <span className="service-tile__face service-tile__back">
          <span className="service-tile__number">{service.number} / {service.name}</span>
          <span className="service-tile__description">{service.description}</span>
          <motion.span
            className="service-tile__icon"
            animate={{ rotate: active ? 45 : 0 }}
            whileHover={{ rotate: 45 }}
            whileFocus={{ rotate: 45 }}
            whileTap={{ rotate: 45 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServiceGlyph kind={service.icon} />
          </motion.span>
        </span>
      </motion.span>
    </button>
  );
}

export function ServicesSection() {
  const services = siteContent.services;

  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="section-shell">
        <Reveal className="services-section__heading-row">
          <p className="section-kicker">{services.eyebrow}</p>
          <h2 className="section-heading" id="services-title">{services.title}</h2>
          <p className="section-intro">{services.intro}</p>
        </Reveal>
        <div className="services-grid">
          {services.items.map((service, index) => (
            <Reveal key={service.number} delay={index * 0.06} amount={0.12}>
              <ServiceTile service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
