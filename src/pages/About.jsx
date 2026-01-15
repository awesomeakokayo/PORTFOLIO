import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    {
      title: 'Frontend',
      description: 'React, HTML/CSS, responsive design, performance optimization'
    },
    {
      title: 'Backend',
      description: 'Python, FastAPI, PostgreSQL, authentication & authorization'
    },
    {
      title: 'Mobile',
      description: 'React Native, Expo, in-app notifications, async storage'
    },
    {
      title: 'DevOps',
      description: 'Docker, CI/CD, deployment (Render/AWS)'
    },
    {
      title: 'Database & Auth',
      description: 'Postgre, Firebase, Supabase, Auth0'
    }
  ]

  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-neutral-800/50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 mx-auto md:mx-0"
          >
            <img
              src="https://avatars.githubusercontent.com/u/10604382?v=4"
              alt="Awesome Akokayo"
              className="w-64 h-64 rounded-full object-cover border-4 border-primary shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              <strong className="text-primary">Hi, I'm Awesome Akokayo.</strong> I help startups and teams launch production-grade web and mobile apps. My focus: clean UI, robust APIs, and seamless deployments. I turn ideas into real products users love.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-700 hover:border-primary transition-colors duration-300"
                >
                  <h4 className="text-xl font-semibold mb-2 text-primary">{skill.title}</h4>
                  <p className="text-neutral-400 text-sm">{skill.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:awesomeakokayo@gmail.com"
                className="px-6 py-3 bg-primary text-neutral-900 font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 text-center"
              >
                Contact Me
              </a>
              <a
                href="/assets/Awesome Stephens Resume (1).pdf"
                download="Awesome Stephens Resume.pdf"
                className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-all duration-300 text-center"
              >
                Download Résumé
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
