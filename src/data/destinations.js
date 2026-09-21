// ============================================================
// DESTINATIONS — the homepage Destination Explorer strip.
// Real photos, each links into the filtered packages page.
// ============================================================

import { PACKAGES } from './packages.js'

const px = (id, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const DESTINATIONS = [
  {
    name: 'Goa',
    region: 'Domestic',
    image: px(10898926),
    link: '/packages?region=Domestic',
  },
  {
    name: 'Kashmir',
    region: 'Domestic',
    image: px(15669097),
    link: '/packages?region=Domestic',
  },
  {
    name: 'Mumbai',
    region: 'Domestic',
    image: px(10587328),
    link: '/packages?region=Domestic',
  },
  {
    name: 'Bali',
    region: 'International',
    image: px(13013188),
    link: '/packages?region=International',
  },
  {
    name: 'Dubai',
    region: 'International',
    image: px(11645463),
    link: '/packages?region=International',
  },
  {
    name: 'Kerala',
    region: 'Domestic',
    image: px(13827306),
    link: '/packages?region=Domestic',
  },
]

/** Count of live packages per region (used for badge labels). */
export const regionCount = (region) =>
  PACKAGES.filter((p) => p.region === region).length
