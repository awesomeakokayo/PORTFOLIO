import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "I had tried two developers before. Awesome actually listened, explained clearly, and delivered on time. My website brought in three new clients in the first month.",
    name: 'Adaeze Okonkwo',
    title: 'Founder, Kemi Skin Studio',
  },
  {
    quote: "We needed an MVP built fast. He gave us a clear proposal, stuck to it, and delivered a product our investors were genuinely impressed by.",
    name: 'Tunde Adeyemi',
    title: 'CEO, LogiTrack Nigeria',
  },
  {
    quote: "Professional, communicative, and genuinely invested in our business outcome. He didn't just build what we asked — he made it better.",
    name: 'Sarah Mensah',
    title: 'Operations Director, PrimePath Consulting',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-[#F5F5F7] py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[720px] mx-auto px-[clamp(1.5rem,5vw,4rem)] text-center">
        {/* Micro-label */}
        <motion.span {...fadeUp} className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block">
          WHAT CLIENTS SAY
        </motion.span>

        {/* Decorative Quote Mark */}
        <motion.div
          {...fadeUp}
          className="font-['Fraunces'] text-[120px] font-[700] leading-none -mb-16"
          style={{ color: '#D2D2D7' }}
        >
          &ldquo;
        </motion.div>

        {/* Quote — animated swap */}
        <div className="relative h-[180px] md:h-[150px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-['Fraunces'] italic text-[22px] md:text-[28px] text-[#1D1D1F] leading-[1.5]"
            >
              {testimonials[current].quote}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Attribution */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="font-['Manrope'] text-[14px] font-[500] text-[#6E6E73] mt-8"
        >
          {testimonials[current].name}
        </motion.p>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.25 }}
          className="font-['Manrope'] text-[13px] text-[#A1A1A6]"
        >
          {testimonials[current].title}
        </motion.p>

        {/* Stars */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-1 mt-4"
          style={{ color: '#2563EB' }}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#2563EB" />
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#D2D2D7] flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#1D1D1F] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-[#2563EB] w-6' : 'bg-[#D2D2D7]'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#D2D2D7] flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#1D1D1F] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
