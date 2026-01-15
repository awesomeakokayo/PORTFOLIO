import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const TechStack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const mainTech = [
    { name: 'JavaScript', icon: 'https://img.icons8.com/?size=96&id=108784&format=png' },
    { name: 'Python', icon: 'https://img.icons8.com/?size=96&id=13441&format=png' },
    { name: 'HTML', icon: 'https://img.icons8.com/?size=96&id=EAUyKy3IwmqM&format=png' },
    { name: 'CSS', icon: 'https://img.icons8.com/?size=96&id=7gdY5qNXaKC0&format=png' },
    { name: 'React', icon: 'https://img.icons8.com/?size=96&id=NfbyHexzVEDk&format=png' },
    { name: 'Node.js', icon: 'https://img.icons8.com/?size=96&id=hsPbhkoh4-8i&format=png' },
    { name: 'FastAPI', icon: 'https://img.icons8.com/?size=96&id=13441&format=png' },
    { name: 'PostgreSQL', icon: 'https://img.icons8.com/?size=96&id=38561&format=png' },
    { name: 'Docker', icon: 'https://img.icons8.com/?size=96&id=22813&format=png' },
    { name: 'React Native', icon: 'https://img.icons8.com/?size=96&id=60392&format=png' },
  ]

  const otherTools = [
    { name: 'Canva', icon: 'https://img.icons8.com/?size=96&id=iWw83PVcBpLw&format=png' },
    { name: 'Google Docs', icon: 'https://img.icons8.com/?size=96&id=30464&format=png' },
  ]

  return (
    <section id="tools" ref={ref} className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tech Stack</h2>
          <p className="text-neutral-400">Technologies I use professionally</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12"
        >
          {mainTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="flex flex-col items-center p-4 bg-neutral-900/50 rounded-xl border border-neutral-700 hover:border-primary transition-all duration-300 hover:scale-105"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-16 h-16 mb-2"
                loading="lazy"
              />
              <p className="text-sm text-neutral-300 text-center">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Other Tools / Design & Docs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {otherTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="flex flex-col items-center p-4 bg-neutral-900/50 rounded-xl border border-neutral-700 hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-16 h-16 mb-2"
                  loading="lazy"
                />
                <p className="text-sm text-neutral-300 text-center">{tool.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
