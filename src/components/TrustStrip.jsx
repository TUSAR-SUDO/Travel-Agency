import { motion } from 'framer-motion'
import { staggerParent, staggerChild } from './Reveal.jsx'

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
        <path d="M9 12.5l2 2 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Trusted Agency',
    text: 'Registered, reviewed and recommended by 12,000+ travellers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
        <path d="M12 3v18M5 7h14M7 7l-3 6a3.5 3.5 0 007 0L8 7m9 0l-3 6a3.5 3.5 0 007 0l-3-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Best Prices',
    text: 'Direct hotel contracts mean honest rates — no hidden markups.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" />
      </svg>
    ),
    title: '24/7 Support',
    text: 'Real humans on WhatsApp — before, during and after your trip.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
        <path d="M12 21s-7-4.6-7-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0119 10c0 6.4-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Personalised Planning',
    text: 'No templates — every itinerary is drafted around you.',
  },
]

/** Why-choose-us strip with staggered scroll reveal. */
export default function TrustStrip() {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {ITEMS.map((item) => (
        <motion.div
          key={item.title}
          variants={staggerChild}
          className="group rounded-3xl border border-navy/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-dark transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
            {item.icon}
          </span>
          <h3 className="mt-5 font-display text-lg font-bold text-navy">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy/65">{item.text}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
