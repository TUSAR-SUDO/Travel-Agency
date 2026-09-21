import PageShell from '../components/PageShell.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import Reveal from '../components/Reveal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppCTA from '../components/WhatsAppCTA.jsx'
import { SITE } from '../data/site.js'

export default function About() {
  return (
    <PageShell>
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our story"
            title="A small team obsessed with getting travel right"
            sub={`${SITE.name} began in ${SITE.founded} with one idea: planning a trip should feel as good as taking it.`}
          />

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-64 overflow-hidden rounded-3xl shadow-lg">
                  <SmartImage
                    src="https://images.pexels.com/photos/10587328/pexels-photo-10587328.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Travellers at the Gateway of India"
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-8 h-64 overflow-hidden rounded-3xl shadow-lg">
                  <SmartImage
                    src="https://images.pexels.com/photos/15669097/pexels-photo-15669097.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Prayer flags over Himalayan peaks"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-5 text-base leading-relaxed text-navy/75">
                <p>
                  We're not a booking engine. We're the people who know which
                  Goa beach is quiet in December, which Kashmir houseboat has
                  the morning chai worth waking up for, and which Mumbai lanes
                  serve the best kebabs at midnight.
                </p>
                <p>
                  Every itinerary we sell, we've walked ourselves — hotels
                  inspected, drivers vetted, ferries timed. That's why 8 out of
                  10 travellers come back and bring their friends.
                </p>
                <p className="font-semibold text-navy">
                  No queues. No call centres. Just one WhatsApp message to
                  someone who actually cares where you're going.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark/60 py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Why travellers choose us" title="The promise, in four lines" />
          <TrustStrip />
        </div>
      </section>

      <section className="bg-navy py-14">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {SITE.stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-display text-4xl font-black text-gold">{s.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-x py-16">
        <WhatsAppCTA
          title="Let's plan something unforgettable."
          message="Hi! I'd like to know more about Wanderlust Travels and plan a trip."
        />
      </div>
    </PageShell>
  )
}
