import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PackageCard from '../components/PackageCard.jsx'
import { PACKAGES } from '../data/packages.js'

const REGION_OPTS = ['All', 'Domestic', 'International']
const TYPE_OPTS = ['Family', 'Honeymoon', 'Couple', 'Group']

export default function Packages() {
  const [params, setParams] = useSearchParams()
  const region = params.get('region') || 'All'
  const [types, setTypes] = useState([])

  const filtered = useMemo(
    () =>
      PACKAGES.filter(
        (p) =>
          (region === 'All' || p.region === region) &&
          (types.length === 0 || types.some((t) => p.tripType.includes(t))),
      ),
    [region, types],
  )

  const setRegion = (r) => {
    const next = new URLSearchParams(params)
    if (r === 'All') next.delete('region')
    else next.set('region', r)
    setParams(next, { replace: true })
  }

  const toggleType = (t) =>
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )

  return (
    <PageShell>
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="Trips worth packing for"
            title="All Packages"
            sub="Domestic escapes and international adventures — filtered your way in a tap."
          />

          {/* Filter bar */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="inline-flex rounded-full bg-navy/5 p-1.5">
              {REGION_OPTS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  aria-pressed={region === r}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
                    region === r
                      ? 'bg-navy text-white shadow-md'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {TYPE_OPTS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  aria-pressed={types.includes(t)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    types.includes(t)
                      ? 'border-gold bg-gold text-navy'
                      : 'border-navy/15 bg-white text-navy/60 hover:border-gold hover:text-navy'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-sm font-semibold text-navy/50" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'trip' : 'trips'} found
            </p>
          </div>

          {/* Grid / empty state */}
          {filtered.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-navy/20 bg-white px-8 py-14 text-center">
              <p className="font-display text-2xl font-bold text-navy">
                No trips match — yet.
              </p>
              <p className="mt-3 text-sm text-navy/60">
                Tell us what you have in mind on WhatsApp and we'll design it
                just for you.
              </p>
              <button
                onClick={() => {
                  setRegion('All')
                  setTypes([])
                }}
                className="btn-gold mt-6"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}
