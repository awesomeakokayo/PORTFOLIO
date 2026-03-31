import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'
import { Link } from 'react-router-dom'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4)

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-dark-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
              Featured Work
            </span>
            <h2 className="font-ojuju text-heading-xl text-white mb-6">
              Projects That Deliver Results
            </h2>
            <p className="text-neutral-400">
              A selection of recent work showcasing full-stack development, 
              mobile applications, and production-ready solutions.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative bg-dark-700/50 rounded-2xl overflow-hidden transition-all duration-400"
              >
                {/* Project image area */}
                <div className="relative aspect-video bg-dark-600 overflow-hidden">
                  {project.images && project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-600 to-dark-700">
                      <span className="font-ojuju text-6xl text-neutral-700">{project.title.charAt(0)}</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60" />
                  
                  {/* View project button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="px-6 py-3 bg-gold-500 text-dark-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400"
                    >
                      View Case Study
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-caption text-gold-400 uppercase tracking-wider">{project.role}</span>
                  </div>
                  <h3 className="text-heading-md text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-body-sm mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-caption text-neutral-500 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 text-caption text-neutral-500">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View all projects link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/archive" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors group">
              <span className="text-body-md">View All Projects</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Projects
