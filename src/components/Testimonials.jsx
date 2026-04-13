import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Placeholder testimonials - creator style quotes
  const testimonials = [
    {
      quote: "Reliability you can count on. Every deadline met, every detail considered. Working together felt effortless.",
      author: "Collaborator",
      role: "Project Partner",
    },
    {
      quote: "The quality of work speaks for itself. Clean code, thoughtful design, and a product that just works.",
      author: "Teammate",
      role: "Developer",
    },
    {
      quote: "Creative vision with technical execution. Rare to find someone who can bridge both worlds so seamlessly.",
      author: "Mentor",
      role: "Industry Professional",
    },
  ]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                Social Proof
              </span>
            </FadeIn>

            <BlurText
              text="Words from others"
              className="font-heading italic text-heading-xl text-white mb-4"
              delay={0.2}
            />

            <FadeIn direction="up" delay={0.3}>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                Feedback from collaborators, mentors, and those who have seen the work up close.
              </p>
            </FadeIn>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="liquid-glass rounded-2xl p-8 h-full">
                  {/* Quote Icon */}
                  <div className="mb-6 text-white/10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  {/* Quote */}
                  <p className="font-body text-white/60 italic mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="font-body text-sm text-white/50">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-white">
                        {testimonial.author}
                      </p>
                      <p className="font-body text-xs text-white/40">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Alternative: GitHub/Community Stats */}
          <FadeIn direction="up" delay={0.5}>
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-8 liquid-glass rounded-full px-8 py-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-body text-sm text-white/60">Open Source Contributor</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-body text-sm text-white/60">Community Active</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
