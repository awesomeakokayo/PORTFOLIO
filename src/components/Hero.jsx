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
      className="bg-black min-h-screen flex items-center justify-between relative overflow-hidden"
    >
      <div className="bg-black"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col min-h-auto text-center max-w-auto mx-auto justify-between mt-40"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-10xl md:text-10xl font-bold text-white font-ojuju uppercase leading-1.3"
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
            className="inline-block text-lg text-neutral-400 md:mt-15 mb-8 max-w-3xl mx-auto leading-relaxed text-white"
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
            className='flex flex-row min-w-screen mt-40 sm:mt-55 md:mt-90 justify-between md: justify-left'
          >
            <motion.p className='md:flex md:justify-left ml-20 md:ml-0'>
              Scroll to view more 👇
            </motion.p>

            <motion.p className='hidden md:block mr-20'>
              Enjoy 🍸
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero
