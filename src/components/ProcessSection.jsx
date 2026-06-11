import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: '30 minutes, no pressure. I learn about your business and goals. You leave with clarity.',
  },
  {
    number: '02',
    title: 'Proposal & Plan',
    description: 'Fixed scope, fixed price, exact timeline. No hidden costs. Ever.',
  },
  {
    number: '03',
    title: 'Build & Communicate',
    description: 'Clear milestones. Regular updates. You always know what\'s happening.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'We launch together. I stay available for questions, fixes, and updates.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const staggerContainer = {
  whileInView: "visible",
  initial: "hidden",
  viewport: { once: true, margin: "-60px" },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
};

const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const ProcessSection = () => {
  return (
    <section className="bg-white py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        {/* Section Label */}
        <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block text-center">
          HOW IT WORKS
        </motion.span>

        {/* H2 */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] text-center leading-[1.1] max-w-[680px] mx-auto"
        >
          Simple, transparent, built around you.
        </motion.h2>

        {/* Steps */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-16 relative"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              {...staggerItem}
              className="relative pt-8 md:border-t-2 md:border-[#D2D2D7] hover:md:border-t-[#2563EB] transition-colors duration-300 md:px-4 first:md:pl-0 last:md:pr-0"
            >
              {/* Step Number (decorative, behind) */}
              <div
                className="font-['Fraunces'] text-[72px] font-[700] leading-none -mb-6"
                style={{ color: '#F5F5F7' }}
              >
                {step.number}
              </div>
              {/* Title (overlapping number) */}
              <h3 className="font-['Fraunces'] text-[20px] font-[600] text-[#1D1D1F] relative z-[1]">
                {step.title}
              </h3>
              {/* Description */}
              <p className="font-['Manrope'] text-[15px] text-[#6E6E73] mt-3 max-w-[200px] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 font-['Manrope'] font-[600] text-[15px] text-white rounded-full transition-all duration-200 hover:bg-[#1D4ED8]"
            style={{ backgroundColor: '#2563EB' }}
          >
            Book Free Strategy Call →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
