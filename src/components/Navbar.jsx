import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/packages', label: 'Packages' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/** Navbar: transparent over page heroes, frosted navy once scrolled. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? 'bg-navy/90 shadow-lg shadow-navy/20 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-lg font-black text-navy shadow-md shadow-gold/30">
            W
          </span>
          <span
            className={`font-display text-xl font-bold tracking-tight transition-colors duration-500 ${
              scrolled || open ? 'text-white' : 'text-white drop-shadow-md'
            }`}
          >
            Wanderlust
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-white/85 hover:text-gold'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="rounded-full bg-gold px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-navy shadow-md shadow-gold/30 transition hover:bg-gold-light"
            >
              Plan My Trip
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              open ? 'rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              open ? '-rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-navy/95 backdrop-blur-md md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-semibold ${
                        isActive
                          ? 'bg-white/10 text-gold'
                          : 'text-white/90 hover:bg-white/10'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
