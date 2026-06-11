import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ target, duration = 1.2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const ProofStrip = () => {
  const stats = [
    { target: 5, staticText: null, suffix: '+', label: 'Products Shipped' },
    { target: 18, staticText: null, suffix: '', label: 'Learning Tracks Built' },
    { target: 1, staticText: null, suffix: '', label: 'Springer Presenter' },
    { target: null, staticText: '🇳🇬 → 🌍', suffix: '', label: 'Nigeria. Global Reach.' }
  ];

  return (
    <section className="w-full bg-surface border-t border-b border-border py-10">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center relative px-4 ${
                idx !== stats.length - 1 ? 'md:border-r md:border-border' : ''
              }`}
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
                {stat.staticText ? (
                  <span>{stat.staticText}</span>
                ) : (
                  <Counter target={stat.target} suffix={stat.suffix} />
                )}
              </div>
              <p className="font-body text-xs sm:text-sm text-text-secondary mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
