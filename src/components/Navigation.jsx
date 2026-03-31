import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', hash: '' },
    { path: '/#about', label: 'About', hash: '#about' },
    { path: '/#projects', label: 'Projects', hash: '#projects' },
    { path: '/archive', label: 'The Archive', hash: '' },
    { path: '/#contact', label: 'Contact', hash: '#contact' },
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'
        }`}
      >
      <nav className="container mx-auto px-6 md:px-12 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-allura text-2xl text-gold-400 hover:text-gold-300 transition-colors">
            Awesome...
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.hash ? (
                  <button
                    onClick={() => handleNavClick(link.hash)}
                    className="text-body-sm text-neutral-400 hover:text-gold-400 transition-colors duration-300 uppercase tracking-wider"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="text-body-sm text-neutral-400 hover:text-gold-400 transition-colors duration-300 uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-5 py-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-body-sm rounded-full hover:bg-gold-500 hover:text-dark-900 transition-all duration-300"
              >
                Hire Me
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gold-400 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>

    {/* Mobile Navigation */}
    <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 mt-1">
                <Link to="/" onClick={() => setIsOpen(false)} className="font-allura text-2xl text-gold-400 hover:text-gold-300 transition-colors">
                  Awesome...
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gold-400 p-2 relative z-[110]"
                  aria-label="Close menu"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-6 lg:space-y-8 -mt-20">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.hash ? (
                      <button
                        onClick={() => handleNavClick(link.hash)}
                        className="text-4xl sm:text-5xl font-ojuju text-white hover:text-gold-400 transition-colors uppercase tracking-widest font-light"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl sm:text-5xl font-ojuju text-white hover:text-gold-400 transition-colors uppercase tracking-widest font-light"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
    </AnimatePresence>
  </>
  )
}

export default Navigation
