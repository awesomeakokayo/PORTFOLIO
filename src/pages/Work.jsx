import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

const workProjects = projects
  .filter((p) => p.featured)
  .map((p) => ({
    category: p.tech.slice(0, 2).join(' · '),
    name: p.title,
    clientType: p.role,
    description: p.summary,
    result: p.impact,
    challenge: p.description.split('.')[0] + '.',
    approach: p.highlights[0],
    image: p.images[1] || p.images[0],
    liveLink: p.links.live,
    repoLink: p.links.frontend || p.links.repo,
    tech: p.tech.slice(0, 4),
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

const Work = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)] text-center">
          <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block">
            PORTFOLIO
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="font-['Fraunces'] text-[48px] md:text-[64px] font-[700] text-[#1D1D1F] leading-[1.05] mb-4"
          >
            My Work
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="font-['Manrope'] text-[18px] text-[#6E6E73] max-w-xl mx-auto leading-relaxed"
          >
            Selected projects. Each built with a specific business goal in mind.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {workProjects.map((project) => (
              <motion.div
                key={project.name}
                {...staggerItem}
                className="bg-white rounded-2xl overflow-hidden border border-[#D2D2D7]"
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]">
                      <span className="font-['Fraunces'] text-3xl font-bold text-white">{project.name}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-[#EFF6FF] text-[#2563EB] text-[12px] font-[600] rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-['Fraunces'] text-[22px] font-[600] text-[#1D1D1F] mb-1">
                    {project.name}
                  </h2>
                  <p className="font-['Manrope'] text-[14px] text-[#6E6E73] mb-3 uppercase tracking-wide">
                    {project.clientType}
                  </p>

                  <p className="font-['Manrope'] text-[15px] text-[#6E6E73] mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Challenge & Approach */}
                  <div className="mb-4 space-y-3">
                    <div>
                      <h4 className="font-['Manrope'] text-[12px] uppercase tracking-wider font-[600] text-[#A1A1A6] mb-1">
                        Challenge
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#1D1D1F]">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-['Manrope'] text-[12px] uppercase tracking-wider font-[600] text-[#A1A1A6] mb-1">
                        Approach
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#1D1D1F]">
                        {project.approach}
                      </p>
                    </div>
                  </div>

                  {/* Result Callout */}
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 mt-4 mb-4">
                    <span className="text-[11px] font-[700] uppercase tracking-[0.1em] text-[#16A34A] block mb-1">
                      Result
                    </span>
                    <span className="font-['Manrope'] text-[14px] font-[500] text-[#15803D]">
                      {project.result}
                    </span>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Manrope'] text-[14px] font-[600] text-[#2563EB] inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View Live Site <ArrowRight size={14} />
                      </a>
                    )}
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Manrope'] text-[14px] font-[500] text-[#A1A1A6] hover:text-[#1D1D1F] transition-colors"
                      >
                        View Code →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Work;
