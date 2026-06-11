import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const FinalCTASection = () => {
  return (
    <section className="py-[5rem] md:py-[7.5rem] text-center px-[clamp(1.5rem,5vw,4rem)]" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-[680px] mx-auto">
        {/* H2 */}
        <motion.h2
          {...fadeUp}
          className="font-['Fraunces'] text-[36px] md:text-[52px] lg:text-[64px] font-[700] text-[#F5F5F7] leading-[1.1]"
        >
          Your next client is looking for you right now. Make sure they find something worth staying for.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="font-['Manrope'] text-[18px] leading-relaxed mt-6 max-w-[480px] mx-auto"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Book a free 30-minute call. No sales pitch. I'll tell you exactly what I'd build and why.
        </motion.p>

        {/* Button */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-white text-[#000000] rounded-full px-10 py-4 text-[16px] font-[700] hover:bg-[#F5F5F7] transition-colors"
          >
            Book Free Strategy Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
