import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const featuredProjects = projects
  .filter((p) => p.featured)
  .slice(0, 3)
  .map((p) => ({
    name: p.title,
    description: p.summary,
    result: p.impact,
    image: p.images[1] || p.images[0],
    link: p.links.live || '#',
    tech: p.tech.slice(0, 3),
  }));

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

const PortfolioSection = () => {
  return (
    <section id="work" className="bg-[#F5F5F7] py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        {/* Section Label */}
        <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block text-center">
          SELECTED WORK
        </motion.span>

        {/* H2 */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] text-center leading-[1.1] max-w-[680px] mx-auto"
        >
          Projects that shipped. Results that lasted.
        </motion.h2>

        {/* Project Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.name} {...staggerItem}>
              <a
                href={project.link}
                className="group bg-white rounded-2xl overflow-hidden border border-[#D2D2D7] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 block"
              >
                {/* Image */}
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]">
                      <span className="font-['Fraunces'] text-2xl font-bold text-white">{project.name}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-[#EFF6FF] text-[#2563EB] text-[12px] font-[600] rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-['Fraunces'] text-[22px] font-[600] text-[#1D1D1F]">
                    {project.name}
                  </h3>
                  <p className="font-['Manrope'] text-[15px] text-[#6E6E73] mt-1 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Result Callout */}
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4">
                    <span className="text-[11px] font-[700] uppercase tracking-[0.1em] text-[#16A34A] block mb-1">
                      Result
                    </span>
                    <span className="font-['Manrope'] text-[14px] font-[500] text-[#15803D]">
                      {project.result}
                    </span>
                  </div>

                  {/* Link */}
                  <span className="font-['Manrope'] text-[14px] font-[600] text-[#2563EB] mt-5 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Live Site <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/work"
            className="inline-flex items-center justify-center border border-[#1D1D1F] text-[#1D1D1F] rounded-full px-7 py-3 text-[15px] font-[600] hover:bg-[#1D1D1F] hover:text-white transition-all duration-200"
          >
            See All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
