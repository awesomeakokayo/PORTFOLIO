import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Animation tokens for consistent performance across all components
export const SPRING = { type: 'spring', stiffness: 80, damping: 20 };
export const EASE_OUT = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
export const STAGGER = { staggerChildren: 0.08 };

export const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: EASE_OUT }
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

export default useScrollReveal;
