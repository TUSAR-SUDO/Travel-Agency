import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-lg font-black text-navy">
              W
            </span>
            <span className="font-display text-xl font-bold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {SITE.tagline}. One message away from a trip you’ll talk about for
            years.
          </p>
        </div>

        <div>
          <h3 className="eyebrow !text-gold-light">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li><Link className="transition hover:text-gold" to="/">Home</Link></li>
            <li><Link className="transition hover:text-gold" to="/packages">Packages</Link></li>
            <li><Link className="transition hover:text-gold" to="/about">About Us</Link></li>
            <li><Link className="transition hover:text-gold" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow !text-gold-light">Talk to Us</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              <a className="transition hover:text-gold" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-gold"
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us — replies in minutes
              </a>
            </li>
            <li>
              <a className="transition hover:text-gold" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li>{SITE.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow !text-gold-light">Visit</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {SITE.address}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Crafted with care.
          </p>
          <p>Photos &amp; videos: Pexels · Unsplash (free licenses)</p>
        </div>
      </div>
    </footer>
  )
}
