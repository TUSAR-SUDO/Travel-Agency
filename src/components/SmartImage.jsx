import { useEffect, useRef, useState } from 'react'

/**
 * Lazy image that fades in on load, with responsive CDN widths.
 * @param {{ src: string, alt: string, className?: string, eager?: boolean, sizes?: string, imgClassName?: string }} props
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
  sizes,
}) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (eager) setLoaded(true)
  }, [eager])

  // Derive a narrower srcset when the source is a Pexels CDN url.
  const srcSet = src.includes('images.pexels.com')
    ? [400, 800, 1200, 1920]
        .map(
          (w) =>
            `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`,
        )
        .join(', ')
    : undefined

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {!loaded && (
        <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-navy/5 via-navy/10 to-navy/5 bg-[length:200%_100%]" />
      )}
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </span>
  )
}
