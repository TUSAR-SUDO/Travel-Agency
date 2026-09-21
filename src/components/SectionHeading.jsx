import Reveal from './Reveal.jsx'
import WordReveal from './WordReveal.jsx'

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
    <div
      className={`mb-12 max-w-2xl ${
        align === 'center' ? 'mx-auto text-center' : ''
      }`}
    >
      {eyebrow && (
        <Reveal y={14}>
          <p
            className={`eyebrow flex items-center gap-3 ${
              align === 'center' ? 'justify-center' : ''
            } ${light ? '!text-gold-light' : ''}`}
          >
            <span className="hidden h-px w-8 bg-gold/60 sm:block" />
            {eyebrow}
            <span className="hidden h-px w-8 bg-gold/60 sm:block" />
          </p>
        </Reveal>
      )}
      <WordReveal
        as="h2"
        text={title}
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      />
      <Reveal y={10} delay={0.35}>
        <span
          className={`mt-5 block h-[3px] w-16 origin-left rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        />
      </Reveal>
      {sub && (
        <Reveal y={16} delay={0.45}>
          <p
            className={`mt-5 text-base leading-relaxed ${
              light ? 'text-white/75' : 'text-navy/70'
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
