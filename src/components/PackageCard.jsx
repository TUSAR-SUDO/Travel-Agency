import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartImage from './SmartImage.jsx'
import SmartVideo from './SmartVideo.jsx'
import { useState } from 'react'

/**
 * Reusable package card. On desktop, the photo crossfades into a muted
 * video loop on hover; on touch devices the image gently zooms instead.
 * @param {{ pkg: object }} props
 */
export default function PackageCard({ pkg }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-navy shadow-lg shadow-navy/10"
    >
      <Link
        to={`/packages/${pkg.slug}`}
        className="relative block h-64 overflow-hidden sm:h-72"
        aria-label={`View details for ${pkg.title}`}
      >
        <SmartImage
          src={pkg.cardImage}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full"
          imgClassName={`transition-transform duration-700 group-hover:scale-110 ${
            pkg.heroVideo ? 'max-md:group-active:scale-110' : ''
          }`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {pkg.heroVideo && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <SmartVideo
              src={pkg.heroVideo}
              poster={pkg.cardImage}
              hovered={hovered}
              playOnHoverOnly
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {/* badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {pkg.duration}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${
              pkg.region === 'International'
                ? 'bg-gold text-navy'
                : 'bg-white/85 text-navy'
            }`}
          >
            {pkg.region}
          </span>
        </div>
        {/* gradient for legibility */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/80 to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {pkg.tripType.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/75"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-white transition-colors group-hover:text-gold">
          {pkg.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/65">
          {pkg.highlights.slice(0, 3).join(' · ')}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
            From {pkg.quickFacts.startingCity}
          </span>
          <Link
            to={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gold transition-all group-hover:gap-2.5"
          >
            View Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
