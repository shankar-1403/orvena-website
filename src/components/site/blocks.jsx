import { Check } from 'lucide-react'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import SectionCard from '../ui/SectionCard'

/**
 * Small building blocks the product pages are made from, so every page shares one
 * rhythm: white and soft grey sections, the same card behaviour, the same type scale.
 */

/** A full-width rounded section on the white or the soft grey tone. */
export function Section({ id, tone = 'white', dots = false, className = '', children }) {
  const bg = tone === 'soft' ? 'bg-soft' : 'bg-white'
  return (
    <SectionCard id={id} className={`${bg} py-10 sm:py-12 lg:py-16 ${className}`}>
      {dots ? (
        <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
      ) : null}
      <Container className="relative">{children}</Container>
    </SectionCard>
  )
}

export function Ticks({ items, light = false, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
              light ? 'bg-white/12 text-mint' : 'bg-accent/10 text-accent'
            }`}
          >
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
          <span
            className={`text-[14px] leading-6 sm:text-[15px] ${
              light ? 'text-white/75' : 'text-navy/85'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Text on one side, a visual on the other. `reverse` swaps them from large screens up. */
export function Split({ eyebrow, title, lead, ticks, reverse = false, media, children }) {
  return (
    <Reveal>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:mt-4 sm:text-[34px] lg:text-[42px]">
            {title}
          </h2>
          {lead ? (
            <p className="mt-4 max-w-[54ch] text-[15px] leading-7 text-muted sm:text-[16px] sm:leading-8">
              {lead}
            </p>
          ) : null}
          {ticks ? <Ticks items={ticks} className="mt-6" /> : null}
          {children}
        </div>
        <div className={`min-w-0 ${reverse ? 'lg:order-1' : ''}`}>{media}</div>
      </div>
    </Reveal>
  )
}

/** The white clay card with an offset plate, used for one illustration per section. */
export function Plate({ className = '', children }) {
  return (
    <div
      className={`o-plate rounded-[24px] border border-white/70 bg-white p-5 sm:rounded-[28px] sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}

const iconTones = {
  navy: 'bg-navy text-white',
  accent: 'bg-accent text-white',
  teal: 'bg-teal text-white',
}

/**
 * A grid of icon cards. `variant` picks the hover behaviour (see .o-card--* in
 * index.css) and `tint` an optional soft colour for the variants that use one.
 */
export function IconCards({
  items,
  cols = 'lg:grid-cols-3',
  variant = 'lift',
  tint = '',
  surface = 'bg-pale/60',
  extra = null,
}) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Reveal key={item.title} delay={0.04 * (index % 4)} className="h-full">
            <article
              className={`o-card o-card--${variant} ${tint} h-full rounded-[22px] border border-line ${surface} p-5 hover:border-accent/30 hover:bg-white sm:rounded-[24px]`}
            >
              <span
                className={`o-card-icon flex h-10 w-10 items-center justify-center rounded-full ${
                  iconTones[item.tone ?? 'navy']
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold leading-6 tracking-tight text-navy">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-5 text-muted">{item.text}</p>
            </article>
          </Reveal>
        )
      })}
      {extra}
    </div>
  )
}

/** Numbered steps, in a row on large screens. */
export function Steps({ items, cols = 'lg:grid-cols-4' }) {
  return (
    <ol className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
      {items.map((step, index) => (
        <li key={step.title} className="h-full">
          <Reveal delay={0.06 * index} className="h-full">
            <div className="o-card o-card--frame h-full rounded-[22px] border border-line bg-pale/60 p-5 hover:border-accent/30 hover:bg-white sm:rounded-[24px]">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-5 text-muted">{step.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

/** The dark closing band, with its action buttons passed in as children. */
export function CtaBand({ title, text, note, children }) {
  return (
    <SectionCard className="bg-navy py-10 text-white shadow-lift sm:py-12 lg:py-14">
      <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-teal/40 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.04em] sm:text-[34px] lg:text-[42px]">
                {title}
              </h2>
              {text ? (
                <p className="mt-3 text-[15px] leading-7 text-white/70 sm:text-[16px] sm:leading-8">
                  {text}
                </p>
              ) : null}
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              {children}
            </div>
          </div>
          {note ? (
            <p className="mt-6 border-t border-white/10 pt-4 text-[12px] leading-5 text-white/55">
              {note}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </SectionCard>
  )
}
