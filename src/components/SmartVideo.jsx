import { useEffect, useRef, useState } from 'react'

/**
 * A muted looping video that plays only while on screen.
 * Autoplays (where allowed) when visible; pauses + resets when not.
 * @param {{ src: string, poster?: string, className?: string, playOnHoverOnly?: boolean, hovered?: boolean }} props
 */
export default function SmartVideo({
  src,
  poster,
  className = '',
  playOnHoverOnly = false,
  hovered = false,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const shouldPlay = visible && (!playOnHoverOnly || hovered)
    if (shouldPlay) {
      el.play().catch(() => {}) // autoplay may be blocked; poster stays
    } else {
      el.pause()
      try {
        el.currentTime = 0
      } catch {
        /* resetting is best-effort */
      }
    }
  }, [visible, hovered, playOnHoverOnly])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
