import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading.jsx'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

// ------------------------------------------------------------
// JOURNEY TIMELINE — "How it works" told as a scroll-drawn path.
// A gold line draws itself down the section as the visitor scrolls
// (scroll-linked scaleY), each step pops in from its side with a
// spring, and the numbered node flips to gold the moment the
// drawing line passes it.
// ------------------------------------------------------------

const STEPS = [
  {
    n: '01',
    title: 'Tell us your dream',
    text: 'One WhatsApp message — destination, dates, budget, vibe. Even a rough idea is enough to start.',
  },
  {
    n: '02',
    title: 'Get a crafted plan',
    text: 'Within hours you receive a day-by-day itinerary with real hotels, real costs and zero hidden extras.',
  },
  {
    n: '03',
    title: 'Refine together',
    text: 'Swap days, upgrade hotels, add experiences — we tweak until the plan feels unmistakably yours.',
  },
  {
    n: '04',
    title: 'Travel, we handle the rest',
    text: 'Transfers, stays and support are locked in before you fly. Your only job is to make memories.',
  },
]

function Step({ step, index }) {
  const left = index % 2 === 0
  return (
    <div className="relative grid gap-4 pb-14 pl-16 last:pb-0 md:grid-cols-2 md:gap-0 md:pl-0">
      {/* node on the centre line */}
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-navy font-display text-sm font-black text-gold shadow-lg shadow-gold/25 md:left-1/2 md:-translate-x-1/2"
      >
        {step.n}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: left ? -48 : 48, y: 12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 17, delay: 0.08 }}
        className={
          left
            ? 'md:col-start-1 md:pr-14 md:text-right'
            : 'md:col-start-2 md:pl-14'
        }
      >
        <div
          className={`group relative overflow-hidden rounded-2xl border border-navy/8 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/10 ${
            left ? 'md:items-end' : ''
          }`}
        >
          {/* gold sheen sweep on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <h3 className="font-display text-xl font-bold text-navy">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy/70">
            {step.text}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function JourneyTimeline() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.78', 'end 0.55'],
  })
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <section className="bg-cream-dark/50 py-20 sm:py-24" id="how-it-works">
      <div className="container-x">
        <SectionHeading
          eyebrow="Effortless by design"
          title="Your journey to the journey"
          sub="Four steps between an idea and a boarding pass — most of them happen in one chat."
        />

        <div ref={trackRef} className="relative mx-auto mt-14 max-w-4xl">
          {/* rail (desktop centre / mobile left) */}
          <span className="absolute bottom-2 left-6 top-2 w-px bg-navy/12 md:left-1/2" />
          {/* scroll-drawn gold line */}
          <motion.span
            style={{ scaleY: draw }}
            className="absolute bottom-2 left-6 top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-dark md:left-1/2 md:-translate-x-1/2"
          />

          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </div>

        {/* closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-6 text-center"
        >
          <a
            href={buildWhatsAppLink(
              "Hi! I'd like to plan a trip — can you help me start?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Start step one on WhatsApp
          </a>
          <p className="mt-4 text-xs text-navy/55">
            Or{' '}
            <Link to="/packages" className="font-bold text-gold-dark underline underline-offset-4">
              browse ready-made packages
            </Link>{' '}
            if you already know where you're going.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
