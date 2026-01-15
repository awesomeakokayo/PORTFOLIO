import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const WhatICanDo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const deliverables = [
    'Full-stack web applications (React frontend + Node.js/Python backend)',
    'Mobile apps (React Native with Expo)',
    'RESTful API design and implementation',
    'Database design and optimization (PostgreSQL)',
    'CI/CD pipeline setup and deployment automation',
    'Performance optimization and scalability improvements',
    'Responsive UI/UX implementation',
    'Authentication and authorization systems'
  ]

  return (
    <section id="what-i-can-do" ref={ref} className="py-20 px-4 bg-neutral-900">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          What I Can Do For You
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {deliverables.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-start p-4 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-primary transition-colors duration-300"
            >
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-neutral-300">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default WhatICanDo
