import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

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
      <section
        id="projects"
        ref={ref}
        className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.01] blur-[150px]" />
        </div>

        <div className="relative z-10 section-padding">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-20">
              <FadeIn direction="up" delay={0.1}>
                <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                  Featured Work
                </span>
              </FadeIn>

              <BlurText
                text="Work that speaks"
                className="font-heading italic text-heading-xl text-white mb-4"
                delay={0.2}
              />

              <FadeIn direction="up" delay={0.3}>
                <p className="font-body text-lg text-white/50 leading-relaxed">
                  A selection of projects showcasing my approach to building software —
                  where technical precision meets creative vision.
                </p>
              </FadeIn>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className="liquid-glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                    {/* Project Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {project.images && project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                          <span className="font-heading italic text-6xl text-white/20">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="liquid-glass-strong px-6 py-3 rounded-full font-body font-medium text-sm text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                        >
                          View Case Study
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-body font-medium uppercase tracking-wider text-white/40">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-heading italic text-xl text-white mb-2 group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-sm text-white/50 line-clamp-2 mb-4">
                        {project.summary}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-[10px] font-body font-medium text-white/40 bg-white/5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* View All Link */}
            <FadeIn direction="up" delay={0.5}>
              <div className="text-center mt-16">
                <a
                  href="/archive"
                  className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <span>View All Projects</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>
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
