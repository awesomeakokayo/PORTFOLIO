import { motion } from 'framer-motion'
import { useState } from 'react'
import ProjectModal from './ProjectModal'

const ProjectCard = ({ project, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-neutral-800/50 rounded-2xl p-12 border border-neutral-700 hover:border-primary transition-all duration-300 cursor-pointer group overflow-hidden"
      style={{ zIndex: 10 - index }}
      onClick={() => onOpenModal(project)}
      role="article"
      aria-label={`Project: ${project.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenModal(project)
        }
      }}
    >
      {/* Background image if available */}
      {project.images && project.images[0] && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">
          {project.title}
          {project.role && <span className="text-neutral-300 text-lg block mt-1">{project.role}</span>}
        </h3>

        <p className="text-neutral-300 mb-4 leading-relaxed">
          {project.summary}
        </p>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-neutral-900/95 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold mb-4 text-primary">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 bg-primary text-neutral-900 font-semibold rounded-full hover:bg-primary-dark transition-colors"
              >
                Live Demo
              </a>
            )}
            {(project.links.backend || project.links.frontend || project.links.repo) && (
              <a
                href={project.links.backend || project.links.frontend || project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
              >
                View Code
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal(project)
              }}
              className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
            >
              View Details
            </button>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
