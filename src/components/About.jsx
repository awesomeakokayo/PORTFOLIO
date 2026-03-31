import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const differentiators = [
    {
      title: 'End-to-End Delivery',
      description: 'From architecture to deployment, I handle the entire development lifecycle.'
    },
    {
      title: 'Performance First',
      description: 'Every line of code is written with scalability and speed in mind.'
    },
    {
      title: 'Clear Communication',
      description: 'Regular updates, transparent progress, and no technical jargon.'
    },
    {
      title: 'Future-Proof Solutions',
      description: 'Built with modern practices that stand the test of time.'
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-dark-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-1 gap-12 items-start">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
              About Me
            </span>
            <h2 className="font-ojuju text-heading-xl text-white mb-6">
              Building Digital Excellence
            </h2>
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p className="text-body-lg">
                I'm a full-stack developer with a passion for creating software that makes a real difference.
                With over 4 years of experience, I've helped startups and established businesses transform
                their ideas into robust, scalable applications.
              </p>
              <p className="text-body-md">
                My approach combines technical expertise with a deep understanding of business needs.
                I don't just write code—I solve problems. Whether it's a complex API architecture,
                a beautiful user interface, or a mobile application that users love, I bring the same
                level of dedication and craftsmanship to every project.
              </p>
              <p className="text-body-md">
                Based remotely, I work with clients globally, bringing a unique perspective and
                unwavering commitment to every collaboration.
              </p>
            </div>

            {/* Quick highlights */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="px-5 py-3 rounded-full bg-dark-700/50">
                <span className="text-gold-400 font-medium">React & React Native</span>
              </div>
              <div className="px-5 py-3 rounded-full bg-dark-700/50">
                <span className="text-gold-400 font-medium">Node.js & Python</span>
              </div>
              <div className="px-5 py-3 rounded-full bg-dark-700/50">
                <span className="text-gold-400 font-medium">Cloud & DevOps</span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Differentiators */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-heading-md text-white mb-8">What Sets Me Apart</h3>
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-xl bg-dark-700/30 hover:bg-dark-700/50 transition-all duration-400"
              >
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-body-sm text-neutral-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
