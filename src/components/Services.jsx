import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      number: '01',
      title: 'Full-Stack Web Development',
      description: 'End-to-end web applications built with React, Node.js, and modern databases. From concept to deployment, I deliver scalable solutions that grow with your business.',
      deliverables: ['Custom Web Applications', 'API Development', 'Database Design', 'Third-party Integrations'],
    },
    {
      number: '02',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications using React Native. Single codebase, native performance, published to both App Store and Google Play.',
      deliverables: ['iOS & Android Apps', 'React Native Development', 'Expo Integration', 'App Store Publishing'],
    },
    {
      number: '03',
      title: 'Backend & API Architecture',
      description: 'Robust backend systems and RESTful APIs built with FastAPI, Node.js, and PostgreSQL. Designed for performance, security, and maintainability.',
      deliverables: ['API Design & Development', 'Database Architecture', 'Authentication Systems', 'Cloud Deployment'],
    },
    {
      number: '04',
      title: 'Technical Consulting',
      description: 'Strategic guidance on technology choices, architecture decisions, and development workflows. I help teams make informed decisions that save time and money.',
      deliverables: ['Tech Stack Recommendations', 'Code Reviews', 'Architecture Planning', 'Team Training'],
    },
  ]

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-dark-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
            Services
          </span>
          <h2 className="font-ojuju text-heading-xl text-white mb-6">
            What I Can Do For You
          </h2>
          <p className="text-body-lg text-neutral-400">
            I offer comprehensive development services tailored to your specific needs. 
            Each project is approached with strategic thinking and meticulous execution.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-8 rounded-2xl bg-dark-700/30 hover:bg-dark-700/50 transition-all duration-400"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 text-5xl font-ojuju font-bold text-neutral-800 group-hover:text-gold-500/20 transition-colors duration-400">
                {service.number}
              </span>

              <div className="relative z-10">
                <h3 className="text-heading-md text-white mb-4 group-hover:text-gold-300 transition-colors duration-400">
                  {service.title}
                </h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-body-sm text-neutral-500 rounded-full group-hover:text-neutral-400 transition-all duration-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
