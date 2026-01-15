import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-between relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col min-h-auto text-center max-w-auto mx-auto justify-between mt-40"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ textSizeAdjust: 9 }}
            className="text-15xl md:text-9xl font-bold text-white font-ojuju"
          >
            Awesome
          </motion.h1>

          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-neutral-300 mb-6 font-light"
          >
            Full-Stack & Mobile Developer • React · Node.js · React Native · FastAPI • Open to hire
          </motion.h2> */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="inline-block text-lg text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed text-white"
          >
            Hey! I'm Awesome Akokayo, I'm who you'd call when you need an
            effective system.
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <a
              href="mailto:awesomeakokayo@gmail.com"
              className="px-8 py-3 bg-primary text-neutral-900 font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/50"
            >
              Hire Me →
            </a>
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-neutral-900 transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </button>
          </motion.div> */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.12 }}
            className="text-sm text-neutral-500"
          >
            Open to: Work
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.12 }}
            className='flex flex-row min-w-screen mt-40 justify-between'
          >
            <motion.p className='ml-20'>
              Scroll to view more 👇
            </motion.p>

            <motion.p className='mr-20'>
              Enjoy 🍸
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero
