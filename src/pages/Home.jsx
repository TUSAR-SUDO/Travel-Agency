import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import SlideshowHero from '../components/SlideshowHero.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import JourneyTimeline from '../components/JourneyTimeline.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal, { staggerParent, staggerChild } from '../components/Reveal.jsx'
import PackageCard from '../components/PackageCard.jsx'
import { PACKAGES } from '../data/packages.js'
import { TESTIMONIALS } from '../data/testimonials.js'
import { SITE } from '../data/site.js'

/** Animated number: counts up when scrolled into view. */
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const numeric = parseFloat(value.replace(/[^\d.]/g, '')) || 0
  const suffix = value.replace(/^[\d.,]+/, '')
  const display = useMotionValue(0)
  const rounded = useTransform(display, (v) =>
    Number.isInteger(numeric)
      ? `${Math.round(v).toLocaleString()}${suffix}`
      : `${v.toFixed(1)}${suffix}`,
  )
  useEffect(() => {
    if (!inView) return
    const controls = animate(display, numeric, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [inView, numeric, display])
  return (
    <p ref={ref} className="font-display text-3xl font-black text-gold min-[420px]:text-4xl sm:text-5xl">
      <motion.span>{rounded}</motion.span>
    </p>
  )
}

export default function Home() {
  const featured = PACKAGES.slice(0, 3)
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1"
    >
      {/* Cinematic destination slideshow — huge crossfading names + up-next stack */}
      <SlideshowHero />

      {/* ---------- Featured packages ---------- */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Handpicked for you"
            title="Featured Packages"
            sub="Trips our travellers book again and again — every detail planned, every rupee accounted for."
          />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.12}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <a href="/packages" className="btn-gold inline-flex">
              View All Packages
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- Journey timeline ---------- */}
      <JourneyTimeline />

      {/* ---------- Trust strip ---------- */}
      <section className="bg-cream-dark/60 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Wanderlust"
            title="Travel planning you can actually trust"
          />
          <TrustStrip />
        </div>
      </section>

      {/* ---------- Stats band (count-up on scroll) ---------- */}
      <section className="bg-navy py-16">
        <div className="container-x">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-x-4 gap-y-10 min-[420px]:gap-8 lg:grid-cols-4"
          >
            {SITE.stats.map((s) => (
              <motion.div key={s.label} variants={staggerChild} className="text-center">
                <CountUp value={s.value} />
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/70">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Word of mouth"
            title="Travellers, unfiltered"
          />
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-7 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.name}
                variants={staggerChild}
                className="flex h-full flex-col rounded-3xl border border-navy/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="text-lg text-gold" aria-label="5 star rating">★★★★★</div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy/75 [overflow-wrap:anywhere]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy/5 pt-5">
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/55">Travelled: {t.trip}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
