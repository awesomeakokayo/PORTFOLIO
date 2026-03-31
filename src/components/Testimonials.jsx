import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Placeholder testimonials structure - ready to be filled with real content
  const testimonials = [
    {
      quote: "Awesome delivered beyond our expectations. The attention to detail and technical excellence transformed our product completely. A true professional.",
      author: "Client Name",
      role: "CEO, Company",
      // avatar: "/path-to-avatar.jpg"
    },
    {
      quote: "Working with Awesome was seamless from start to finish. Clear communication, on-time delivery, and the code quality is exceptional.",
      author: "Client Name",
      role: "Founder, Startup",
    },
    {
      quote: "The mobile app Awesome built for us has received incredible user feedback. Performance is smooth, UI is beautiful, and the backend handles everything perfectly.",
      author: "Client Name",
      role: "Product Manager",
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="relative py-24 md:py-32 bg-dark-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-caption uppercase tracking-wider text-gold-400 mb-4 block">
            Testimonials
          </span>
          <h2 className="font-ojuju text-heading-xl text-white mb-6">
            What Clients Say
          </h2>
          <p className="text-neutral-400">
            Real feedback from real collaborations. These testimonials reflect 
            the commitment and quality I bring to every project.
          </p>
        </motion.div>

        {/* Testimonials placeholder notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-16 p-6 rounded-xl bg-dark-800/30"
        >
          <svg className="w-8 h-8 text-gold-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-neutral-400 text-body-md mb-2">
            Testimonials are being collected from recent clients.
          </p>
          <p className="text-neutral-500 text-body-sm">
            In the meantime, my work speaks for itself. Check out the projects below.
          </p>
        </motion.div>

        {/* Testimonial cards - structure ready for content */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 opacity-60">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative p-8 rounded-2xl bg-dark-800/30"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-gold-500/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <p className="text-neutral-400 italic mb-6 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center">
                  <span className="text-neutral-500 text-lg font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-body-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
