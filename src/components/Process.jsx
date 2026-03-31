import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start with a deep dive into your vision, goals, and requirements. Understanding the problem thoroughly is the foundation of a successful solution.',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'I create a detailed roadmap with technical architecture, timeline, and milestones. Every decision is documented and aligned with your business objectives.',
    },
    {
      number: '03',
      title: 'Development',
      description: 'The build phase happens in iterative sprints with regular check-ins. You will see progress in real-time and can provide feedback at every stage.',
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'After thorough testing and optimization, your product is deployed to production. I handle the technical setup and ensure everything runs smoothly.',
    },
    {
      number: '05',
      title: 'Support',
      description: 'The relationship does not end at launch. I provide ongoing support, maintenance, and enhancements to keep your product at its best.',
    },
  ]

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-32 bg-dark-800">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-900/10 via-dark-800 to-dark-800" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
            My Process
          </span>
          <h2 className="font-ojuju text-heading-xl text-white mb-6">
            How We Will Work Together
          </h2>
          <p className="text-body-lg text-neutral-400">
            A proven, transparent process designed to deliver exceptional results 
            while keeping you informed every step of the way.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/50 via-gold-500/30 to-gold-500/10 hidden sm:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className={`relative flex flex-col sm:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-dark-800 z-10 hidden sm:block" />
              
              {/* Number circle - mobile only */}
              <div className="sm:hidden w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                <span className="font-ojuju font-bold text-gold-400">{step.number}</span>
              </div>

              {/* Content card */}
              <div className={`sm:w-5/12 ${index % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
                <div className="hidden sm:block font-ojuju text-6xl font-bold text-gold-500/10 mb-2">
                  {step.number}
                </div>
                <h3 className="text-heading-md text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{step.description}</p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden sm:block sm:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
