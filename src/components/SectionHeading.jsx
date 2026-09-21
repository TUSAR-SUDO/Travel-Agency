import Reveal from './Reveal.jsx'

/**
 * @param {{ eyebrow?: string, title: string, sub?: string, light?: boolean, align?: 'center'|'left' }} props
 */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  align = 'center',
}) {
  return (
    <Reveal
      className={`mb-12 max-w-2xl ${
        align === 'center' ? 'mx-auto text-center' : ''
      }`}
    >
      {eyebrow && (
        <p className={`eyebrow ${light ? '!text-gold-light' : ''}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      <span className="mt-5 block h-1 w-16 rounded-full bg-gold max-sm:mx-auto" />
      {sub && (
        <p
          className={`mt-5 text-base leading-relaxed ${
            light ? 'text-white/75' : 'text-navy/70'
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  )
}
