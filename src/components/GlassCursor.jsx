import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const GlassCursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Track hoverable elements
    const handleElementHover = () => setIsHovering(true)
    const handleElementLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('resize', checkMobile)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [cursorX, cursorY, isVisible])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 60 : 12,
            height: isHovering ? 60 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Glass ring that follows */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full backdrop-blur-md border border-white/20"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          }}
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 0.2 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </>
  )
}

export default GlassCursor
