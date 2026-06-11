import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How much does a typical website cost?',
    answer: 'Most business websites start from $1,000 and go up depending on complexity. Web applications typically start from $3,000+. On our first call, I\'ll give you a clear budget range — no obligation, no hidden fees.',
  },
  {
    question: 'How long does a project take?',
    answer: 'A standard business website takes 2–4 weeks. A web application typically takes 4–10 weeks. I\'ll give you an exact timeline in the proposal before we start.',
  },
  {
    question: 'Do you work with clients outside Nigeria?',
    answer: 'Absolutely. I work with clients across Africa, Europe, and North America. Everything is done remotely — we\'ll stay in sync via email and scheduled calls.',
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'I offer optional monthly maintenance packages so you always have someone to call when something needs to change. Minor tweaks are often covered in the initial build.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes. I offer optional monthly maintenance packages that cover updates, security patches, and small changes. You\'re never locked in — you can opt in or out month to month.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F5F5F7] py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[680px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        {/* H2 */}
        <motion.h2
          {...fadeUp}
          className="font-['Fraunces'] text-[32px] md:text-[48px] lg:text-[56px] font-[700] text-[#1D1D1F] text-center leading-[1.1] mb-12"
        >
          Common questions, honest answers.
        </motion.h2>

        {/* Accordion */}
        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-t border-[#D2D2D7] first:border-t-0"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-['Fraunces'] text-[18px] font-[600] text-[#1D1D1F] pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-[#2563EB]">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-['Manrope'] text-[16px] text-[#6E6E73] pb-5 leading-[1.7]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
