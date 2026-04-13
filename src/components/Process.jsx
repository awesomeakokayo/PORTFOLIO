import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Every great project starts with understanding. I dive deep into your goals, audience, and constraints to build a solid foundation.',
    },
    {
      number: '02',
      title: 'Build',
      description: 'With clarity comes creation. I move fast but stay thoughtful, crafting solutions that balance technical excellence with human experience.',
    },
    {
      number: '03',
      title: 'Refine',
      description: 'Good work becomes great through iteration. I test, optimize, and polish until every detail feels intentional and every interaction matters.',
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'The finish line is just the beginning. I launch with confidence, ensuring your product is ready to make its mark from day one.',
    },
  ]

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                Process
              </span>
            </FadeIn>

            <BlurText
              text="How I work"
              className="font-heading italic text-heading-xl text-white mb-4"
              delay={0.2}
            />

            <FadeIn direction="up" delay={0.3}>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                A simple, intentional approach to creating work that matters.
              </p>
            </FadeIn>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="liquid-glass rounded-2xl p-6 h-full">
                  {/* Step Number */}
                  <div className="mb-6">
                    <span className="font-heading italic text-5xl text-white/10">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading italic text-xl text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
