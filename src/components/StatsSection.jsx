import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: '11+', label: 'Projects Completed', numericValue: 11, suffix: '+' },
  { number: '3+', label: 'Years Experience', numericValue: 3, suffix: '+' },
  { number: '100%', label: 'Satisfaction Rate', numericValue: 100, suffix: '%' },
  { number: '48hrs', label: 'First Response', numericValue: 48, suffix: 'hrs' },
];

const useCountUp = (target, duration = 1500, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, startCounting]);

  return count;
};

const StatItem = ({ stat, isVisible, showDivider }) => {
  const count = useCountUp(stat.numericValue, 1500, isVisible);

  const displayValue = () => {
    if (stat.suffix === 'hrs') return `${count}hrs`;
    if (stat.suffix === '%') return `${count}%`;
    return `${count}${stat.suffix || ''}`;
  };

  return (
    <div className="relative text-center px-4">
      {showDivider && (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#D2D2D7]" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="font-['Fraunces'] text-[64px] font-[700] text-[#1D1D1F] leading-none">
          {displayValue()}
        </div>
        <div className="font-['Manrope'] text-[14px] font-[500] text-[#6E6E73] mt-2">
          {stat.label}
        </div>
      </motion.div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} showDivider={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
