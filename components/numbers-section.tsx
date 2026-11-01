"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { siteContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setCount(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reducedMotion, value]);

  return <span ref={ref} className="number-stat__value">{String(count).padStart(2, "0")}{suffix}</span>;
}

export function NumbersSection() {
  const numbers = siteContent.numbers;

  return (
    <section className="numbers-section" aria-labelledby="numbers-title">
      <div className="section-shell">
        <Reveal>
          <p className="section-kicker">{numbers.eyebrow}</p>
          <h2 className="section-heading" id="numbers-title">{numbers.title}</h2>
        </Reveal>
        <div className="numbers-section__grid">
          {numbers.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} amount={0.2}>
              <div className="number-stat">
                <CountUp value={stat.value} suffix={stat.suffix} />
                <span className="number-stat__label">{stat.label}</span>
                <span className="number-stat__detail">{stat.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
