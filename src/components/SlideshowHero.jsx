import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

// ------------------------------------------------------------
// CINEMATIC SLIDESHOW HERO — modelled on the client's reference
// video: a full-bleed destination photo, a huge destination name
// crossfading every few seconds, an Explore CTA, and a horizontal
// strip of destination cards along the bottom edge with a gold
// progress bar on the active one. Photos are Pexels CDN (free license).
// ------------------------------------------------------------

const px = (id, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

const SLIDES = [
  {
    key: 'kerala',
    name: 'Kerala',
    sub: 'Backwaters, tea hills & houseboats',
    img: px(13827306),
    region: 'Domestic',
  },
  {
    key: 'bali',
    name: 'Bali',
    sub: 'Emerald terraces & pool villas',
    img: px(13013188),
    region: 'International',
  },
  {
    key: 'goa',
    name: 'Goa',
    sub: 'Crescent beaches & Latin quarters',
    img: px(10898926),
    region: 'Domestic',
  },
  {
    key: 'kashmir',
    name: 'Kashmir',
    sub: 'Dal Lake mornings, Himalayan nights',
    img: px(11126342),
    region: 'Domestic',
  },
  {
    key: 'dubai',
    name: 'Dubai',
    sub: 'Desert skylines & gold souks',
    img: px(11645463),
    region: 'International',
  },
]

const SLIDE_MS = 6200 // how long each destination holds the screen

/** Crossfading background layer for one slide. */
function Slide({ slide, active }) {
  return (
    <div
      className="absolute inset-0"
      aria-hidden={!active}
      style={{ opacity: active ? 1 : 0, transition: 'opacity 1400ms ease' }}
    >
      <img
        src={slide.img}
        alt=""
        loading={slide.key === 'kerala' ? 'eager' : 'lazy'}
        fetchpriority={slide.key === 'kerala' ? 'high' : undefined}
        className={`h-full w-full object-cover ${active ? 'animate-kenburns' : ''}`}
      />
    </div>
  )
}

/**
 * Bottom-right horizontal strip of all destinations — the premium
 * slide navigator. Active card wears a gold ring and a progress bar
 * that fills over the slide duration; click any card to jump.
 */
function NextRow({ active, onSelect, reduced }) {
  return (
    <div className="">
      <div className="container-x flex justify-end">
        <div className="max-w-full">
          <p className="mb-2.5 hidden text-right text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/55 sm:block">
            {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </p>
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1 max-sm:-mr-5 max-sm:pr-5 sm:gap-3">
            {SLIDES.map((s, i) => {
              const isActive = i === active
              return (
                <motion.button
                  key={s.key}
                  layout
                  onClick={() => onSelect(i)}
                  aria-label={`Show ${s.name}`}
                  aria-current={isActive}
                  whileHover={reduced ? undefined : { y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`relative h-[64px] w-[104px] shrink-0 overflow-hidden rounded-xl text-left shadow-xl shadow-navy/50 backdrop-blur-sm transition-[opacity,box-shadow] duration-500 sm:h-[86px] sm:w-[136px] ${
                    isActive
                      ? 'opacity-100 ring-2 ring-gold'
                      : 'opacity-55 ring-1 ring-white/20 hover:opacity-90 hover:ring-white/40'
                  }`}
                >
                  <img
                    src={s.img.replace('w=1920', 'w=480')}
                    alt=""
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <span className="absolute left-2 top-1.5 font-display text-[10px] font-bold tracking-widest text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute inset-x-2 bottom-1.5 truncate font-display text-xs font-bold text-white sm:text-sm">
                    {s.name}
                  </span>
                  {/* progress bar: only on the active card, keyed to restart */}
                  {isActive && (
                    <span
                      key={`p-${active}`}
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-gold"
                      style={{
                        transformOrigin: 'left',
                        animation: reduced
                          ? 'none'
                          : `card-progress ${SLIDE_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Full-screen cinematic destination slideshow.
 * Auto-advances; dots and the card stack jump manually.
 */
export default function SlideshowHero() {
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return undefined // no autoplay for reduced motion
    const t = setTimeout(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_MS
    )
    return () => clearTimeout(t)
  }, [active, reduced])

  const current = SLIDES[active]

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-navy">
      <h1 className="sr-only">
        Wanderlust Travels — handcrafted tour packages across India and beyond
      </h1>

      {/* backgrounds */}
      {SLIDES.map((s, i) => (
        <Slide key={s.key} slide={s} active={i === active} />
      ))}

      {/* cinematic scrims */}
      <span className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/70 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
      <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-navy/70 via-navy/25 to-transparent" />

      {/* content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-center pb-52 pt-20 sm:pb-56">
        <div className="max-w-3xl">
          {/* eyebrow */}
          <motion.p
            key={`eyebrow-${current.key}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.3em] text-gold-light"
          >
            <span className="h-px w-10 bg-gold" />
            {current.region === 'International'
              ? 'International escape'
              : 'Incredible India'}
          </motion.p>

          {/* the huge crossfading destination name */}
          <div className="relative" aria-live="polite">
            {SLIDES.map((s, i) => (
              <motion.span
                key={s.key}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : 30,
                  filter: i === active ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display font-black leading-[0.9] tracking-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)] text-[19vw] sm:text-7xl md:text-8xl lg:text-[9rem] ${
                  i === active ? '' : 'pointer-events-none absolute inset-0'
                }`}
              >
                {s.name}
              </motion.span>
            ))}
          </div>

          {/* subline */}
          <div className="relative mt-4 h-8">
            {SLIDES.map((s, i) => (
              <motion.p
                key={s.key}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 12 }}
                transition={{ duration: 0.7, delay: i === active ? 0.35 : 0 }}
                className={`absolute inset-0 text-base font-medium text-white/85 sm:text-lg ${
                  i === active ? '' : 'pointer-events-none'
                }`}
              >
                {s.sub}
              </motion.p>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to={`/packages?region=${current.region}`}
              className="btn-gold"
            >
              Explore {current.name}
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Book on WhatsApp
            </a>
          </motion.div>

        </div>
      </div>

      {/* bottom horizontal destination navigator (padded clear of notch/home bar) */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-safe">
        <NextRow active={active} onSelect={setActive} reduced={reduced} />
      </div>
    </section>
  )
}
