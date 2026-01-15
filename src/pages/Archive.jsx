import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import SkipToContent from '../components/SkipToContent'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/projects'
import Footer from '../components/Footer'

const Archive = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState('all')

  // Get all unique tech tags
  const allTech = useMemo(() => {
    const techSet = new Set()
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.summary.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTech = selectedTech === 'all' || project.tech.includes(selectedTech)
      return matchesSearch && matchesTech
    })
  }, [searchQuery, selectedTech])

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen">
      <SkipToContent />
      <Navigation />
      <section className="pt-32 pb-20 px-4 bg-neutral-900 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Project Archive
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-neutral-400 mb-12"
          >
            Browse all projects and filter by technology
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-primary"
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTech === 'all'
                    ? 'bg-primary text-neutral-900'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                All
              </button>
              {allTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTech === tech
                      ? 'bg-primary text-neutral-900'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleOpenModal(project)}
                  className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  {project.images && project.images[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-neutral-400 rounded text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-400 text-lg">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  )
}

export default Archive
