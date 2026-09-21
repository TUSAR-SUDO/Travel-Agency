// ============================================================
// TESTIMONIALS — real traveller quotes for social proof.
// Swap avatars/quotes with the client's real customers later;
// structure stays identical.
// ============================================================

const unsplashFace = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80`

export const TESTIMONIALS = [
  {
    quote:
      'They planned our Bali honeymoon down to the sunrise breakfast at Mount Batur. We literally did not open Google Maps the entire week.',
    name: 'Priya & Arjun Mehta',
    trip: 'Bali Island Honeymoon',
    avatar: unsplashFace('photo-1494790108377-be9c29b29330'),
  },
  {
    quote:
      'Goa with two kids and zero stress. The resort, the cab, the cruise — everything was booked before we even packed.',
    name: 'Rohit Sharma',
    trip: 'Goa Beach Escape',
    avatar: unsplashFace('photo-1507003211169-0a1dd7228f2d'),
  },
  {
    quote:
      'A WhatsApp message on Tuesday, and by Thursday we had a Mumbai itinerary better than anything we found on the big apps.',
    name: 'Ananya Desai',
    trip: 'Mumbai Weekend Getaway',
    avatar: unsplashFace('photo-1438761681033-6461ffad8d80'),
  },
]
