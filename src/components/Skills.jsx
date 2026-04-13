import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2,
  Database,
  Cpu,
  Video,
  Layers,
  Smartphone,
} from 'lucide-react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend',
      description: 'Building responsive, performant interfaces with React, TypeScript, and modern frameworks.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      icon: Database,
      title: 'Backend',
      description: 'Creating robust APIs and services with Node.js, Python, and database technologies.',
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Node.js'],
    },
    {
      icon: Smartphone,
      title: 'Mobile',
      description: 'Building cross-platform mobile applications with React Native and modern tooling.',
      skills: ['React Native', 'Expo', 'Mobile UI', 'App Store', 'Push Notifications'],
    },
    {
      icon: Cpu,
      title: 'AI & Automation',
      description: 'Leveraging AI tools and automation to streamline workflows and enhance productivity.',
      skills: ['OpenAI', 'Groq', 'Automation', 'APIs', 'Integration'],
    },
    {
      icon: Video,
      title: 'Content Creation',
      description: 'Producing engaging visual content, from editing to motion graphics and storytelling.',
      skills: ['Video Editing', 'Storytelling', 'Production', 'Distribution'],
    },
    {
      icon: Layers,
      title: 'Tools & Workflow',
      description: 'Utilizing modern tools for version control, deployment, and collaborative development.',
      skills: ['Git',  'Vercel', 'AWS', 'CI/CD'],
    },
  ]

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[150px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                Skills & Tools
              </span>
            </FadeIn>

            <BlurText
              text="What I work with"
              className="font-heading italic text-heading-xl text-white mb-4"
              delay={0.2}
            />

            <FadeIn direction="up" delay={0.3}>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                A collection of technologies and tools I use to bring ideas to life —
                from code to content.
              </p>
            </FadeIn>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="liquid-glass rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/[0.05] group">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                    <category.icon className="w-6 h-6 text-white/60" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading italic text-xl text-white mb-3">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-white/50 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-[10px] font-body font-medium text-white/40 bg-white/5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
