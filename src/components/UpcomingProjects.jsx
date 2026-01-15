import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { upcomingProjects } from '../data/projects'

const UpcomingProjects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'planned':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
    }
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Upcoming Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-neutral-300 mb-4">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingProjects
