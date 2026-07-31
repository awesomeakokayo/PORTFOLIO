import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import BlurText from './BlurText'

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(0,0%,4%)] pt-24 md:pt-32"
    >
      {/* Cinematic Background with Basketball Court Floor Effect */}
      <div className="absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,6%)] via-[hsl(0,0%,4%)] to-[hsl(0,0%,2%)]" />

        {/* Subtle court lines effect - horizontal */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white" />
        </div>

        {/* Spotlight effect from top */}
        <div className="absolute inset-0 spotlight-gradient" />

        {/* Ambient glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[100px]"
        />

        {/* Grain texture overlay */}
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white/70" />
            </span>
            <span className="text-xs font-body font-medium tracking-[0.2em] uppercase text-white/50">
              Software Engineer & Builder
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="mb-8">
            <BlurText
              text="Built with discipline."
              className="font-heading italic text-display-xl text-white block"
              delay={0.4}
              staggerDelay={0.05}
            />
            <BlurText
              text="Shipped with precision."
              className="font-heading italic text-display-xl text-white/80 block"
              delay={0.6}
              staggerDelay={0.05}
            />
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-body text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            A builder's mindset. I craft digital experiences that perform —
            where technical precision meets human intuition.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="liquid-glass-strong px-8 py-4 rounded-full font-body font-medium text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                View Projects
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 rounded-full font-body font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Identity Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {['Software Engineer', 'Builder', 'Creator', 'Problem Solver'].map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                className="liquid-glass px-4 py-2 rounded-full text-xs font-body font-medium text-white/60"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-24 right-8 lg:right-16 hidden md:block"
      >
        <div className="liquid-glass rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-heading italic text-2xl text-white">10+</p>
              <p className="font-body text-xs text-white/50 uppercase tracking-wider">Projects Delivered</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300"
        >
          <span className="text-[10px] font-body uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}

export default Hero
