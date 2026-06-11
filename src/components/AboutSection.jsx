import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="rounded-2xl overflow-hidden ring-1 ring-[#D2D2D7] max-w-[400px] mx-auto">
              <img
                src="/assets/AwesomeAkokayoPortfolio.jpg"
                alt="Awesome Akokayo"
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block">
              ABOUT
            </span>
            <h2 className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] leading-[1.1] mb-6">
              I build for business, not for portfolios.
            </h2>

            <div className="space-y-5">
              <p className="font-['Manrope'] text-[17px] text-[#6E6E73] leading-[1.75]">
                I'm Awesome Akokayo — a full-stack developer based in Lagos, Nigeria.
                For the past 3 years I've been helping businesses stop losing clients
                to poorly built websites and start winning them back with software
                that actually works.
              </p>
              <p className="font-['Manrope'] text-[17px] text-[#6E6E73] leading-[1.75]">
                Every project I take on has one measure of success: does it make my
                client money? If it doesn't, it isn't done.
              </p>
            </div>

            {/* Differentiators */}
            <div className="mt-8 space-y-4">
              {[
                'Results-first development — I measure success by outcomes, not deliverables.',
                'Direct communication — no middlemen, no project managers, just me.',
                'Fixed pricing — you\'ll know the full cost before I write a single line of code.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#2563EB' }} />
                  <span className="font-['Manrope'] text-[15px] font-[500] text-[#1D1D1F]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-8 px-7 py-3.5 font-['Manrope'] font-[600] text-[15px] text-white rounded-full transition-all duration-200 hover:bg-[#1D4ED8]"
              style={{ backgroundColor: '#2563EB' }}
            >
              Work With Me →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
