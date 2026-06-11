import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, AppWindow, Smartphone, Layers } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    outcome: 'A site that positions you as the premium choice and books calls automatically.',
  },
  {
    icon: AppWindow,
    title: 'Web Applications',
    outcome: 'Custom platforms built around how your business actually works.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    outcome: 'iOS and Android apps your customers will actually want to use.',
  },
  {
    icon: Layers,
    title: 'Redesigns & UI',
    outcome: 'Transform an outdated site into something that finally reflects your value.',
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
    visible: { transition: { staggerChildren: 0.08 } },
  },
};

const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const ServicesSection = () => {
  return (
    <section className="bg-[#F5F5F7] py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        {/* Section Label */}
        <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block text-center">
          WHAT I BUILD
        </motion.span>

        {/* H2 */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] text-center leading-[1.1] max-w-[680px] mx-auto"
        >
          Every product I build has one job: to grow your business.
        </motion.h2>

        {/* Service Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              {...staggerItem}
              className="bg-white rounded-2xl p-8 border border-[#D2D2D7]"
            >
              <service.icon size={28} style={{ color: '#2563EB' }} />
              <h3 className="font-['Fraunces'] text-[22px] font-[600] text-[#1D1D1F] mt-6 mb-3">
                {service.title}
              </h3>
              <p className="font-['Manrope'] text-[16px] text-[#6E6E73] leading-relaxed">
                {service.outcome}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="font-['Manrope'] text-[16px] text-[#6E6E73] mb-2">
            Not sure which one you need?
          </p>
          <Link
            to="/contact"
            className="font-['Manrope'] font-[600] text-[15px] text-[#2563EB] hover:opacity-70 transition-opacity"
          >
            Let's figure it out together →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
