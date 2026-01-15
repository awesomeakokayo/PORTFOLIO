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
    { path: '/about', label: 'About', hash: '' },
    { path: '/', label: 'Projects', hash: '#projects' },
    { path: '/archive', label: 'Archive', hash: '' },
    { path: '/contact', label: 'Contact', hash: '' },
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || location.pathname === '/contact' ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-allura italic text-primary">
            Awesome...
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.hash ? (
                  <button
                    onClick={() => handleNavClick(link.hash)}
                    className="text-neutral-300 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="text-neutral-300 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-neutral-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 overflow-hidden"
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.hash ? (
                    <button
                      onClick={() => handleNavClick(link.hash)}
                      className="block text-neutral-300 hover:text-primary transition-colors duration-200 font-medium py-2"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-neutral-300 hover:text-primary transition-colors duration-200 font-medium py-2"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navigation
