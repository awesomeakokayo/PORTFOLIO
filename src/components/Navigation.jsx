import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { label: 'Home', hash: '#home' },
    { label: 'About', hash: '#about' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Skills', hash: '#skills' },
    { label: 'Contact', hash: '#contact' },
  ]

  const handleNavClick = (hash) => {
    setIsOpen(false)
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 hidden md:block"
      >
        <nav className="liquid-glass rounded-full px-6 py-3 max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('#home')}
            className="font-heading italic text-xl text-white/90 hover:text-white transition-colors"
          >
            A.
          </Link>

          {/* Center Nav Links */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.hash)}
                  className="px-4 py-2 text-sm font-body font-medium text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="liquid-glass-strong px-5 py-2 rounded-full text-sm font-body font-medium text-white hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </button>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-4 md:hidden"
      >
        <nav className="liquid-glass rounded-full px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => handleNavClick('#home')}
            className="font-heading italic text-xl text-white/90"
          >
            A.
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/80 p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  onClick={() => handleNavClick(link.hash)}
                  className="font-heading italic text-3xl text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                onClick={() => handleNavClick('#contact')}
                className="liquid-glass-strong mt-4 px-8 py-3 rounded-full font-body font-medium text-white"
              >
                Get in Touch
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
