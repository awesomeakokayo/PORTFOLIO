import { motion } from 'framer-motion';

const painPoints = [
  {
    quote: "I don't even know where to start.",
    attribution: "A client who's been talking about launching for a year.",
  },
  {
    quote: "My last developer vanished after taking my money.",
    attribution: "A business owner who's been burned.",
  },
  {
    quote: "I paid a lot and got very little in return.",
    attribution: "Someone who trusted the wrong team.",
  },
  {
    quote: "My site looks broken on a phone and I don't know why.",
    attribution: "An owner losing clients daily.",
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

const ProblemSection = () => {
  return (
    <section className="bg-white py-[5rem] md:py-[7.5rem] relative z-[1]">
      <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        {/* Section Label */}
        <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block text-center">
          THE REAL PROBLEM
        </motion.span>

        {/* H2 */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] text-center leading-[1.1] max-w-[600px] mx-auto"
        >
          Most websites don't fail because of the tech. They fail because nobody designed them to win.
        </motion.h2>

        {/* Pain-point Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.quote}
              {...staggerItem}
              className="border border-[#D2D2D7] rounded-2xl p-8 bg-white hover:border-[#2563EB] transition-colors duration-300"
            >
              <p className="font-['Fraunces'] italic text-[20px] text-[#1D1D1F]">
                &ldquo;{point.quote}&rdquo;
              </p>
              <p className="font-['Manrope'] text-[13px] text-[#A1A1A6] mt-4">
                — {point.attribution}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Callout */}
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="font-['Fraunces'] italic text-[20px] text-[#1D1D1F] text-center mt-12"
        >
          &ldquo;If any of this sounds familiar — you're in exactly the right place.&rdquo;
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;
