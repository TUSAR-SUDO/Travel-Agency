import { motion } from 'framer-motion'

/** Wrap inner pages: entrance motion + clearance under the fixed navbar. */
export default function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex-1 pt-24 sm:pt-28"
    >
      {children}
    </motion.main>
  )
}
