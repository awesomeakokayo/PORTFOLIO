import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import BlurText from './BlurText'
import FadeIn from './FadeIn'

const AnimatedNumber = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Handle string values (like "24/7") - no animation needed
  if (typeof value === 'string') {
    return (
      <span ref={ref} className="font-heading italic">
        {value}{suffix}
      </span>
    )
  }

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="font-heading italic">
      {count}{suffix}
    </span>
  )
}

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { number: 4, suffix: '+', label: 'Years Experience' },
    { number: 10, suffix: '+', label: 'Projects Delivered' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' },
    { number: '24/7', suffix: '', label: 'Support Available' },
  ]

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-32 md:py-40 bg-[hsl(0,0%,3%)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%)] via-transparent to-[hsl(0,0%,4%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-[200px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4 block">
                By The Numbers
              </span>
            </FadeIn>

            <BlurText
              text="The journey so far"
              className="font-heading italic text-heading-xl text-white mb-4"
              delay={0.2}
            />

            <FadeIn direction="up" delay={0.3}>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                Metrics that tell the story of dedication, craft, and consistent effort.
              </p>
            </FadeIn>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="liquid-glass rounded-2xl p-8">
                  <div className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-white mb-3">
                    <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="font-body text-sm text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
