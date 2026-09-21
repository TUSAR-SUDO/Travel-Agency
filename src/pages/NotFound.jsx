import { Link } from 'react-router-dom'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-navy/70" />
      <div className="container-x relative z-10 text-center">
        <p className="font-script text-7xl font-bold text-gold-light sm:text-8xl">
          Lost luggage?
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          This page went travelling without us.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/75">
          The link may be old, but your next trip doesn't have to be.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold">
            Back Home
          </Link>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
