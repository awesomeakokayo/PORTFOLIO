import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const identityTags = [
    'Software Engineer',
    'Builder',
    'Creator',
    'Storyteller',
    'Problem Solver',
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/[0.02] to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[150px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column - Image */}
            <FadeIn direction="left" delay={0.1}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden liquid-glass">
                  <img
                    src="/assets/AwesomeAkokayoPortfolio.jpg"
                    alt="Awesome Akokayo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 liquid-glass-strong rounded-2xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading italic text-xl text-white">4+ Years</p>
                      <p className="font-body text-[10px] text-white/50 uppercase tracking-wider">Building & Creating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            {/* Right Column - Content */}
            <div>
              <FadeIn direction="up" delay={0.2}>
                <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                  About Me
                </span>
              </FadeIn>

              <div className="mb-6">
                <BlurText
                  text="Who I am"
                  className="font-heading italic text-heading-xl text-white"
                  delay={0.3}
                />
              </div>

              <FadeIn direction="up" delay={0.4}>
                <div className="space-y-5 text-white/60 font-body leading-relaxed">
                  <p className="text-lg">
                    I'm a software engineer and builder with a passion for creating software
                    that makes a real difference. My work exists at the intersection
                    of technology and storytelling.
                  </p>
                  <p>
                    I don't just write code — I solve problems. Whether it's a complex API
                    architecture, a user interface, or content that resonates with
                    audiences, I bring the same level of dedication and craftsmanship to every
                    project.
                  </p>
                  <p>
                    What drives me is the challenge of creating work that feels alive — not static.
                    I believe in discipline, in showing up every day to refine my skills, and in
                    the power of motion to communicate ideas.
                  </p>
                </div>
              </FadeIn>

              {/* Identity Tags */}
              <FadeIn direction="up" delay={0.5}>
                <div className="mt-10">
                  <p className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
                    Identity
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {identityTags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        className="liquid-glass px-4 py-2 rounded-full text-xs font-body font-medium text-white/60 hover:text-white/80 transition-colors cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
