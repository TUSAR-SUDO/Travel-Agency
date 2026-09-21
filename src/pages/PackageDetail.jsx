import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartImage from '../components/SmartImage.jsx'
import SmartVideo from '../components/SmartVideo.jsx'
import PackageCard from '../components/PackageCard.jsx'
import Reveal, { staggerParent, staggerChild } from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppCTA from '../components/WhatsAppCTA.jsx'
import { getPackageBySlug, PACKAGES } from '../data/packages.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import NotFound from './NotFound.jsx'

/* ---------- Sticky quick-facts bar (condenses on scroll) ---------- */
function QuickFactsBar({ pkg }) {
  const [condensed, setCondensed] = useState(false)
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const facts = [
    ['Start', pkg.quickFacts.startingCity],
    ['Stay', pkg.quickFacts.hotelCategory],
    ['Meals', pkg.quickFacts.meals],
    ['Best Time', pkg.quickFacts.bestSeason],
  ]

  return (
    <div        className={`sticky top-16 z-30 border-y border-navy/10 transition-all duration-500 sm:top-20 ${
        condensed
          ? 'bg-navy/95 py-3 shadow-lg shadow-navy/20 backdrop-blur-md'
          : 'bg-cream py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-3">
        <div
          className={`flex items-center divide-x divide-navy/10 transition-all duration-500 ${
            condensed ? 'gap-4 text-xs' : 'gap-5 text-sm'
          }`}
        >
          {facts.map(([k, v]) => (
            <div key={k} className="px-1 first:pl-0">
              <span
                className={`block font-bold uppercase tracking-wider transition-colors ${
                  condensed ? 'text-gold' : 'text-navy/45'
                }`}
              >
                {k}
              </span>
              <span
                className={`block max-w-[24vw] truncate sm:max-w-none ${
                  condensed ? 'font-semibold text-white' : 'font-semibold text-navy'
                }`}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <a
          href={buildWhatsAppLink(pkg.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-whatsapp !px-5 !py-2.5 text-xs ${
            condensed ? '' : 'hidden sm:inline-flex'
          }`}
        >
          Book on WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ---------- One itinerary timeline day ---------- */
function TimelineDay({ day, title, details, index }) {
  return (
    <motion.li
      variants={staggerChild}
      className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8"
    >
      {/* connector + dot */}
      <span className="absolute left-[22px] top-12 h-full w-px bg-gradient-to-b from-gold/60 to-navy/10 sm:left-[26px]" />
      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-black text-navy shadow-md shadow-gold/30 sm:h-[52px] sm:w-[52px] sm:text-lg">
        {day}
      </span>
      <div className="flex-1 rounded-2xl border border-navy/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
        <h3 className="font-display text-lg font-bold text-navy">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-navy/70">{details}</p>
      </div>
    </motion.li>
  )
}

export default function PackageDetail() {
  const { slug } = useParams()
  const pkg = getPackageBySlug(slug)
  if (!pkg) return <NotFound />

  const others = PACKAGES.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1"
    >
      {/* ---------- Hero ---------- */}
      <section className="relative h-[72svh] min-h-[480px] overflow-hidden bg-navy">
        {pkg.heroVideo ? (
          <SmartVideo
            src={pkg.heroVideo}
            poster={pkg.heroImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <SmartImage
            src={pkg.heroImage}
            alt={`${pkg.title} hero`}
            eager
            className="absolute inset-0 h-full w-full"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/20" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-navy">
                {pkg.duration}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                {pkg.region}
              </span>
              {pkg.tripType.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {pkg.title}
            </h1>
            <p className="mt-3 text-sm font-medium text-white/80 sm:text-base">
              {pkg.quickFacts.startingCity} · {pkg.quickFacts.bestSeason} ·
              {' '}Breakfast & transfers sorted
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Sticky quick facts ---------- */}
      <QuickFactsBar pkg={pkg} />

      {/* ---------- Top WhatsApp CTA — full-width button over hero on phones, card on desktop ---------- */}
      <div className="container-x relative z-20 -mt-16 sm:pt-10">
        <div className="sm:hidden">
          <a
            href={buildWhatsAppLink(pkg.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
          >
            Book This Trip on WhatsApp
          </a>
        </div>
        <div className="hidden sm:block">
          <WhatsAppCTA
            message={pkg.whatsappMessage}
            title={`Questions about ${pkg.title}?`}
            sub="Get the day-wise plan, hotel names and exact pricing in one WhatsApp message."
          />
        </div>
      </div>

      {/* ---------- Highlights + itinerary ---------- */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading align="left" eyebrow="Trip highlights" title="Why you'll love it" />
            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2.5"
            >
              {pkg.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={staggerChild}
                  className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-navy"
                >
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Day by day" title="Your itinerary" />
            <motion.ol
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              {pkg.itinerary.map((d, i) => (
                <TimelineDay key={d.day} {...d} index={i} />
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* ---------- Places you'll visit ---------- */}
      <section className="bg-cream-dark/60 py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Postcards from the road"
            title="Places You'll Visit"
          />
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pkg.places.map((place) => (
              <motion.figure
                key={place.name}
                variants={staggerChild}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="h-44 overflow-hidden">
                  <SmartImage
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-display text-base font-bold text-navy">
                    {place.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy/60">
                    {place.description}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Middle WhatsApp CTA (after itinerary) ---------- */}
      <div className="container-x py-16">
        <WhatsAppCTA
          message={pkg.whatsappMessage}
          title="Like the plan? Let's tailor it."
          sub="Want an extra day, a different hotel, a private cab? It starts with one message."
        />
      </div>

      {/* ---------- Inclusions / Exclusions ---------- */}
      <section className="pb-16 sm:pb-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-emerald-200 bg-white p-7 sm:p-9">
              <h3 className="font-display text-xl font-bold text-navy">
                What's included
              </h3>
              <ul className="mt-6 space-y-3.5">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/75">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-3xl border border-navy/10 bg-white p-7 sm:p-9">
              <h3 className="font-display text-xl font-bold text-navy">
                Not included
              </h3>
              <ul className="mt-6 space-y-3.5">
                {pkg.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/60">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="pb-16">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="A glimpse of the trip" />
          <div className="grid gap-5 sm:grid-cols-3">
            {pkg.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="h-60 overflow-hidden rounded-3xl shadow-md">
                  <SmartImage
                    src={src}
                    alt={`${pkg.title} — photo ${i + 1}`}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Bottom WhatsApp CTA ---------- */}
      <div className="container-x pb-20">
        <WhatsAppCTA
          message={pkg.whatsappMessage}
          title="Pack the bags. We'll handle the rest."
          sub="Dates, rooms, cabs, tickets — one message and it's all being arranged."
        />
      </div>

      {/* ---------- Other packages ---------- */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="Keep exploring"
            title="Other trips you'll love"
          />
          <div className="grid gap-7 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.12}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/packages" className="btn-ghost">
              Browse all packages
            </Link>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
