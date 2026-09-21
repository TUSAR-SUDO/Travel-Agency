// ============================================================
// PACKAGE DATA — the content backbone of the whole site.
// Every package page is rendered from these objects by
// <PackageDetail /> — never hand-build a page per trip.
// Media: free-license Pexels photos (hotlinked CDN) and short
// muted MP4 loops in /public/videos. Swap in the client's real
// photos here later without touching any component.
// ============================================================

const px = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const PACKAGES = [
  {
    slug: 'mumbai-weekend-getaway',
    title: 'Mumbai Weekend Getaway',
    region: 'Domestic',
    duration: '3N / 4D',
    tripType: ['Family', 'Couple'],
    heroImage: px(10587328, 1920),
    heroVideo: '/videos/mumbai-loop.mp4',
    cardImage: px(10587328),
    quickFacts: {
      startingCity: 'Mumbai',
      hotelCategory: '3-Star',
      meals: 'Breakfast Included',
      bestSeason: 'Oct – Feb',
    },
    highlights: [
      'Gateway of India',
      'Marine Drive sunset walk',
      'Elephanta Caves ferry',
      'Bollywood-style street food crawl',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Colaba Evenings',
        details:
          'Airport pickup, hotel check-in, then an easy evening at the Gateway of India and Colaba Causeway’s cafés.',
      },
      {
        day: 2,
        title: 'Elephanta & Harbour',
        details:
          'Morning ferry to the UNESCO-listed Elephanta Caves, afternoon at the Taj promenade, sunset chai at Marine Drive.',
      },
      {
        day: 3,
        title: 'Old Bombay & Film City Flavour',
        details:
          'CST & Fort heritage walk, Dhobi Ghat viewpoint, Juhu Beach street-food crawl, Bandra-Worli Sea Link drive.',
      },
      {
        day: 4,
        title: 'Departure',
        details:
          'Lazy breakfast, last-minute souvenir run, private transfer to the airport with a lifetime of stories.',
      },
    ],
    places: [
      {
        name: 'Gateway of India',
        image: px(10587328, 900),
        description: 'The iconic basalt arch watching over Mumbai Harbour.',
      },
      {
        name: 'Marine Drive',
        image: px(11811346, 900),
        description: 'The Queen’s Necklace — Mumbai’s glittering curve at dusk.',
      },
      {
        name: 'Elephanta Caves',
        image: px(11521892, 900),
        description: 'Ancient rock-cut temples on a green island in the harbour.',
      },
      {
        name: 'Juhu Beach',
        image: px(1108701, 900),
        description: 'Bollywood’s backyard: sunset crowds and bhel puri stalls.',
      },
    ],
    gallery: [px(11811346), px(10587328), px(11521892)],
    inclusions: [
      '3 nights 3-star hotel stay',
      'Daily breakfast',
      'AC private transfers',
      'Local English-speaking guide',
      'Elephanta ferry tickets',
    ],
    exclusions: [
      'Airfare / train fare',
      'Personal expenses & shopping',
      'Monument entry tickets unless mentioned',
      'Travel insurance',
    ],
    whatsappMessage:
      "Hi! I'm interested in the Mumbai Weekend Getaway (3N/4D). Please share details.",
  },
  {
    slug: 'goa-beach-escape',
    title: 'Goa Beach Escape',
    region: 'Domestic',
    duration: '4N / 5D',
    tripType: ['Family', 'Group'],
    heroImage: px(10898926, 1920),
    heroVideo: '/videos/goa-loop.mp4',
    cardImage: px(10898926),
    quickFacts: {
      startingCity: 'Goa',
      hotelCategory: 'Beach Resort',
      meals: 'Breakfast Included',
      bestSeason: 'Nov – Feb',
    },
    highlights: [
      'Palolem & Agonda quiet beaches',
      'Old Goa churches heritage walk',
      'Sunset cruise on the Mandovi',
      'Spice plantation lunch',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & North Goa Sunset',
        details:
          'Pickup from Goa airport/Madgaon station, resort check-in, evening at Calangute with a beachside dinner.',
      },
      {
        day: 2,
        title: 'Old Goa & Panjim',
        details:
          'Bom Jesus Basilica and Se Cathedral, colour-washed Fontainhas lanes, Mandovi sunset cruise after.',
      },
      {
        day: 3,
        title: 'Beaches & Spice',
        details:
          'Morning at Palolem and Agonda, spice plantation tour with a banana-leaf lunch, evening free at Anjuna.',
      },
      {
        day: 4,
        title: 'Dolphin Point & Markets',
        details:
          'Boat trip to Dolphin Point, afternoon at Saturday Night Market (seasonal) or beach hopping.',
      },
      {
        day: 5,
        title: 'Departure',
        details:
          'Slow breakfast, swimsuit-and-souvenirs morning, transfer back with salty hair and happy hearts.',
      },
    ],
    places: [
      {
        name: 'Palolem Beach',
        image: px(10898926, 900),
        description: 'A perfect crescent bay fringed by palms.',
      },
      {
        name: 'Fontainhas',
        image: px(12579155, 900),
        description: 'Goa’s Latin quarter — every wall a postcard.',
      },
      {
        name: 'Basilica of Bom Jesus',
        image: px(14665858, 900),
        description: 'UNESCO-listed baroque church holding St. Francis Xavier’s relics.',
      },
      {
        name: 'Agonda Beach',
        image: px(20717139, 900),
        description: 'Quiet sands, turtle nests and slow sunsets.',
      },
    ],
    gallery: [px(10898926), px(12579155), px(20717139)],
    inclusions: [
      '4 nights beach resort stay',
      'Daily breakfast',
      'Airport/station transfers',
      'Mandovi sunset cruise',
      'Spice plantation lunch',
    ],
    exclusions: [
      'Airfare / train fare',
      'Water sports charges',
      'Personal expenses',
      'Anything not mentioned in inclusions',
    ],
    whatsappMessage:
      "Hi! I'm interested in the Goa Beach Escape (4N/5D). Please share details.",
  },
  {
    slug: 'bali-island-honeymoon',
    title: 'Bali Island Honeymoon',
    region: 'International',
    duration: '6N / 7D',
    tripType: ['Honeymoon', 'Couple'],
    heroImage: px(13013188, 1920),
    heroVideo: '/videos/bali-loop.mp4',
    cardImage: px(13013188),
    quickFacts: {
      startingCity: 'Denpasar',
      hotelCategory: '4-Star with private pool villa',
      meals: 'Breakfast + 2 special dinners',
      bestSeason: 'Apr – Oct',
    },
    highlights: [
      'Private pool villa in Ubud',
      'Tegallalang rice terrace swing',
      'Nusa Penida day cruise',
      'Couples’ Balinese spa ritual',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar',
        details:
          'Flower-garland welcome, transfer to Ubud pool villa, candlelit welcome dinner.',
      },
      {
        day: 2,
        title: 'Ubud Soul',
        details:
          'Tegallalang rice terraces, Sacred Monkey Forest, Ubud art market, evening spa ritual for two.',
      },
      {
        day: 3,
        title: 'Volcano & Waterfalls',
        details:
          'Mount Batur viewpoint breakfast, Tegenungan waterfall dip, coffee plantation tasting.',
      },
      {
        day: 4,
        title: 'To Seminyak',
        details:
          'Check in near the beach, sunset at Tanah Lot temple, seafood dinner on the sand.',
      },
      {
        day: 5,
        title: 'Nusa Penida Cruise',
        details:
          'Fast boat to Kelingking Beach and Angel’s Billabong, snorkelling stop, return by evening.',
      },
      {
        day: 6,
        title: 'Free Day & Beach Clubs',
        details:
          'Your day, your pace — beach club cabanas, shopping in Seminyak, or a second spa (recommended).',
      },
      {
        day: 7,
        title: 'Departure',
        details:
          'Breakfast with a view, private transfer to the airport. You’ll leave planning the return trip.',
      },
    ],
    places: [
      {
        name: 'Tegallalang Terraces',
        image: px(13013188, 900),
        description: 'Emerald rice steps carved into Ubud’s hills.',
      },
      {
        name: 'Tanah Lot',
        image: px(11645463, 900),
        description: 'The sea temple that turns gold at every sunset.',
      },
      {
        name: 'Nusa Penida',
        image: px(12238221, 900),
        description: 'Cliff-edge lookouts over impossibly blue water.',
      },
      {
        name: 'Ubud Monkey Forest',
        image: px(15994331, 900),
        description: 'Mossy sanctury ruins guarded by very bold macaques.',
      },
    ],
    gallery: [px(13013188), px(12238221), px(15994331)],
    inclusions: [
      '6 nights stay (2 villa + 4 resort)',
      'Daily breakfast + 2 dinners',
      'Private AC transfers',
      'Nusa Penida day cruise',
      'One couples’ spa ritual',
    ],
    exclusions: [
      'International airfare',
      'Indonesia visa on arrival (approx. USD 35)',
      'Personal expenses & tips',
      'Travel insurance (mandatory, we assist)',
    ],
    whatsappMessage:
      "Hi! I'm interested in the Bali Island Honeymoon (6N/7D). Please share details.",
  },
]

/** Look up a package by its URL slug. */
export function getPackageBySlug(slug) {
  return PACKAGES.find((p) => p.slug === slug)
}
