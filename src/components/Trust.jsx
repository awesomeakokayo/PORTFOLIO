import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Trust = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: '4+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Delivered' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ]

  return (
    <section id="trust" ref={ref} className="relative py-24 md:py-32 bg-dark-900">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
            Trusted By Excellence
          </span>
          <h2 className="font-ojuju text-heading-xl text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Delivering consistent results through dedication, expertise, and a commitment to excellence.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group"
            >
              <div className="relative p-8 md:p-10 rounded-2xl bg-dark-800/50 transition-all duration-400 text-center">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="font-ojuju text-4xl md:text-5xl lg:text-6xl font-bold text-gold-400 block mb-2">
                    {stat.value}
                  </span>
                  <span className="text-body-sm text-neutral-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges / logos area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 md:mt-24"
        >
          <p className="text-center text-caption uppercase tracking-wider text-neutral-600 mb-8">
            Technologies & Tools I Work With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-lg md:text-xl text-neutral-500 font-medium hover:text-gold-400 transition-colors duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Trust
