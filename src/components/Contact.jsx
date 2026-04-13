import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

// Simple success animation
const SuccessAnimation = ({ active }) => {
  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center"
      >
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute mt-32 text-white font-body text-lg"
      >
        Message Sent!
      </motion.div>
    </motion.div>
  )
}

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', project: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null
  const [showSuccess, setShowSuccess] = useState(false)

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/awesomeakokayo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/awesomestephens',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:awesomeakokayo@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'X/Twitter',
      url: 'https://twitter.com/awesomeakokayo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ]

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Call the backend API
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          projectBrief: formState.project,
          budget: '' // Optional field
        }),
      })

      if (response.ok) {
        // Trigger success animation
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)

        // Show success
        setSubmitStatus('success')
        setFormState({ name: '', email: '', project: '' })
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Network Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }, [formState])

  return (
    <section id="contact" ref={ref} className="relative py-32 md:py-40 bg-[hsl(0,0%,4%)] overflow-hidden">
      <SuccessAnimation active={showSuccess} />

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[150px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                Get In Touch
              </span>
            </FadeIn>

            <BlurText
              text="Let's work together"
              className="font-heading italic text-heading-xl text-white mb-4"
              delay={0.2}
            />

            <FadeIn direction="up" delay={0.3}>
              <p className="font-body text-lg text-white/50 max-w-xl mx-auto">
                Have a project in mind? I'm currently available for new opportunities.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.4}>
            <div className="liquid-glass rounded-2xl p-8 md:p-12">
              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mb-6 p-4 rounded-xl bg-white/10 border border-white/20 text-white text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body font-medium">Message Sent Successfully!</span>
                    </div>
                    <p className="text-sm text-white/70">Thank you! I'll be in touch within 24 hours.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-body font-medium">Something went wrong</span>
                    </div>
                    <p className="text-sm text-red-300/80">Please try again or email me directly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm text-white/60 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 font-body"
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-white/60 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 font-body"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm text-white/60 mb-2">Tell Me About Your Project</label>
                <textarea
                  value={formState.project}
                  onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 font-body resize-none"
                  placeholder="Describe your project, goals, and timeline..."
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="liquid-glass-strong w-full md:w-auto px-10 py-4 rounded-full font-body font-medium text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

export default Contact
