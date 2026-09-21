import { motion } from 'framer-motion'

/**
 * Word-by-word headline reveal — each word rises out of a clipped
 * mask with a slight stagger. This is the signature "titles from
 * a design studio" effect, not a template fade.
 * @param {{ text: string, className?: string, delay?: number, as?: 'h2'|'h3'|'p' }} props
 */
export default function WordReveal({ text, className = '', delay = 0, as = 'h2' }) {
  const words = text.split(' ')
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: {
                y: '0%',
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
