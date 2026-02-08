import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectBrief: '',
    budgetRange: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/awesomeakokayo',
      icon: 'https://img.icons8.com/?size=100&id=12599&format=png'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/awesomestephens',
      icon: 'https://img.icons8.com/?size=100&id=447&format=png'
    },
    {
      name: 'Email',
      url: 'mailto:awesomeakokayo@gmail.com',
      icon: 'https://img.icons8.com/?size=100&id=12580&format=png'
    },
    {
      name: 'X/Twitter',
      url: 'https://twitter.com/awesomeakokayo',
      icon: 'https://img.icons8.com/?size=48&id=wCo0O5X01IHO&format=png'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', projectBrief: '', budgetRange: '' })
      } else {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          console.error('Submission failed:', errorData.error)
        } else {
          const errorText = await response.text()
          console.error('Submission failed (non-JSON):', errorText)
        }
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-white text-neutral-900 border-t border-neutral-200">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have a project in mind? Fill out the form below or reach out via social media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-50 p-8 rounded-2xl shadow-sm border border-neutral-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="projectBrief" className="block text-sm font-medium mb-2 text-neutral-700">
                  Project Brief *
                </label>
                <textarea
                  id="projectBrief"
                  name="projectBrief"
                  required
                  rows="4"
                  value={formData.projectBrief}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium mb-2 text-neutral-700">
                  Budget Range (Optional)
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                >
                  <option value="">Select range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                </select>
              </div>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-neutral-900 text-white rounded-lg text-center"
                  >
                    Message sent successfully! I'll be in touch soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-600 text-white rounded-lg text-center"
                  >
                    Failed to send message. Please try again later.
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center justify-center p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mb-4 p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-neutral-900 font-medium group-hover:text-neutral-600 transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
