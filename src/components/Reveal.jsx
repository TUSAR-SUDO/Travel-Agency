import { motion } from 'framer-motion'

/**
 * Fade + rise scroll-reveal wrapper.
 * @param {{ children: React.ReactNode, delay?: number, y?: number, className?: string, once?: boolean }} props
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Parent that staggers Reveal-like children (use motion variants). */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}
