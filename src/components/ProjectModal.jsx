import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-neutral-700"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700 p-6 flex justify-between items-center">
                <h2 id="modal-title" className="text-3xl font-bold text-primary">{project.title}</h2>
                <button
                  onClick={onClose}
                  className="text-2xl text-neutral-400 hover:text-primary transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {project.role && (
                  <p className="text-neutral-400 text-lg">{project.role}</p>
                )}

                <p className="text-neutral-300 text-lg leading-relaxed">
                  {project.description || project.summary}
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
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

                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="text-neutral-300 flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.impact && (
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Impact</h3>
                    <p className="text-neutral-300">{project.impact}</p>
                  </div>
                )}

                {project.images && project.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="rounded-lg w-full h-auto border border-neutral-700"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-neutral-900 font-semibold rounded-full hover:bg-primary-dark transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.links.backend && (
                      <a
                        href={project.links.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
                      >
                        Backend Code
                      </a>
                    )}
                    {project.links.frontend && (
                      <a
                        href={project.links.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
                      >
                        Frontend Code
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
                      >
                        Repository
                      </a>
                    )}
                    {project.links.download && (
                      <a
                        href={project.links.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-colors"
                      >
                        Download APK
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
