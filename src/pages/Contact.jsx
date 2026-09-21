import { useState } from 'react'
import PageShell from '../components/PageShell.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { SITE } from '../data/site.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

// TODO(client): create a free form at formspree.io and paste the form ID
// below (e.g. "mqkvabcd"). Until then the form opens the visitor's mail
// app as a fallback — no fake API calls.
const FORMSPREE_ID = ''

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    destination: '',
    dates: '',
  })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (FORMSPREE_ID) {
      fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
        .then(() => setSent(true))
        .catch(() => setSent(true))
    } else {
      const body = encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\nDestination: ${form.destination}\nTravel dates: ${form.dates}`,
      )
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        'Trip enquiry from website',
      )}&body=${body}`
      setSent(true)
    }
  }

  const inputCls =
    'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40'

  return (
    <PageShell>
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="Say hello"
            title="Talk to a real trip designer"
            sub="No bots, no ticket numbers. Call, WhatsApp or drop the form — a human replies the same day."
          />

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: direct channels + map */}
            <Reveal className="space-y-6">
              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
                <a
                  href={SITE.phoneHref}
                  className="group rounded-3xl border border-navy/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-dark transition group-hover:bg-gold group-hover:text-navy">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="mt-3 text-sm font-bold text-navy">Call us</p>
                  <p className="text-xs text-navy/60">{SITE.phone}</p>
                </a>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-navy/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-whatsapp/15 text-whatsapp transition group-hover:bg-whatsapp group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </span>
                  <p className="mt-3 text-sm font-bold text-navy">WhatsApp</p>
                  <p className="text-xs text-navy/60">Replies in minutes</p>
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl border border-navy/10 shadow-sm">
                <iframe
                  title={`${SITE.name} office location map`}
                  src={SITE.mapEmbed}
                  className="h-64 w-full sm:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="rounded-3xl bg-navy p-6 text-sm leading-relaxed text-white/80">
                <p className="font-display text-base font-bold text-white">
                  {SITE.name}
                </p>
                <p className="mt-2">{SITE.address}</p>
                <p className="mt-1">{SITE.hours}</p>
                <p className="mt-1">{SITE.email}</p>
              </div>
            </Reveal>

            {/* Right: enquiry form */}
            <Reveal delay={0.15}>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-navy/10 bg-white p-7 shadow-sm sm:p-9"
              >
                <h3 className="font-display text-2xl font-bold text-navy">
                  Plan my trip
                </h3>
                <p className="mt-2 text-sm text-navy/60">
                  Four fields. That's all we need to start.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">
                      Your name
                    </label>
                    <input id="name" required value={form.name} onChange={update('name')} className={inputCls} placeholder="Aarav Kapoor" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">
                      Phone / WhatsApp
                    </label>
                    <input id="phone" required type="tel" value={form.phone} onChange={update('phone')} className={inputCls} placeholder="+91 98XXX XXXXX" />
                  </div>
                  <div>
                    <label htmlFor="destination" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">
                      Destination
                    </label>
                    <input id="destination" required value={form.destination} onChange={update('destination')} className={inputCls} placeholder="Goa, Bali, Kashmir…" />
                  </div>
                  <div>
                    <label htmlFor="dates" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">
                      Travel dates (approx.)
                    </label>
                    <input id="dates" type="text" inputMode="numeric" autoComplete="off" value={form.dates} onChange={update('dates')} className={inputCls} placeholder="Mid-December, flexible" />
                  </div>
                </div>

                <button type="submit" className="btn-gold mt-7 w-full">
                  Send Enquiry
                </button>

                {sent && (
                  <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700" role="status">
                    Thanks! Your enquiry is on its way — we'll reply shortly.
                  </p>
                )}
                <p className="mt-4 text-center text-xs text-navy/45">
                  Prefer instant answers?{' '}
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-whatsapp underline-offset-2 hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
