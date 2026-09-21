// ============================================================
// WHATSAPP LINK BUILDER — every CTA on the site routes through
// this one function. If the number or message format ever
// changes, this is the only file to touch.
// ============================================================

import { SITE } from '../data/site.js'

/**
 * Build a https://wa.me/ deep link with a pre-filled message.
 * @param {string} [message] - Optional message to pre-fill in WhatsApp.
 * @returns {string} The wa.me URL, opened in a new tab by callers.
 */
export function buildWhatsAppLink(message) {
  const text = message || SITE.defaultWhatsAppMessage
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
}
