# Wanderlust Travels — Travel Agency Website (V1)

A frontend-only, no-login, no-payment marketing site for a travel agency.
**The entire funnel is one action: message us on WhatsApp or call.**
Built with React 18 + Vite + Tailwind CSS + Framer Motion + React Router.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in dist/ — deploy anywhere
```

## Where things live (the 10% of files that matter)

| File | What it is |
|---|---|
| `src/data/site.js` | **Agency name, phone, WhatsApp number, email, address, map.** Edit this first. |
| `src/data/packages.js` | All trip packages. Add/edit trips here — pages render automatically. |
| `src/data/testimonials.js` | Traveller quotes + avatars. |
| `src/data/destinations.js` | Destination explorer strip. |
| `src/utils/whatsapp.js` | The one function that builds `wa.me` links. Number changes go here (it reads `site.js`). |
| `public/videos/` | Hero + card hover video loops (Pexels, free license). |

## Common tasks

**Change the WhatsApp number** → edit `whatsappNumber` in `src/data/site.js`.

**Add a package** → copy any object in `src/data/packages.js`, change `slug`,
`title`, media URLs, itinerary, etc. The route `/packages/<slug>` and the
listing page pick it up automatically. No component edits.

**Replace stock media with real client photos** → put files in `public/images/…`,
then point the package's `heroImage` / `cardImage` / `places[].image` /
`gallery[]` to `/images/…` paths. Videos: drop files into `public/videos/`
and update `heroVideo`. Keep hero loops < 8MB, ≤ 8s, muted.

**Wire the contact form** → create a free form at [formspree.io](https://formspree.io),
paste the ID into `FORMSPREE_ID` in `src/pages/Contact.jsx`. Until then the
form falls back to opening the visitor's email app.

**Deploy** → Netlify (`public/_redirects` handles SPA routes) or Vercel
(`vercel.json` rewrite). `npm run build`, drag `dist/` in, done.

## Media credits (free licenses)

- Photos: [Pexels](https://www.pexels.com) (hotlinked CDN) and [Unsplash](https://unsplash.com)
- Videos: Pexels video library (`/videos/*.mp4`)

Both licenses allow free commercial use without attribution; credited anyway.

## Phase 2 readiness

All content is data-file driven and components are standalone with documented
props — an admin panel or headless CMS later only needs to serve the same
object shapes (see `src/data/packages.js`) as JSON from an API.
