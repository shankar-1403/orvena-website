import { ArrowDown } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import { Split } from './blocks'

const tones = {
  navy: 'bg-navy text-white',
  accent: 'bg-accent text-white',
  teal: 'bg-teal text-white',
}

/**
 * The "four pillars" overview: a header, then four connected cards. When a pillar has an
 * `anchor`, its card jumps to the detailed zigzag row below.
 */
export function PillarOverview({ eyebrow, title, description, pillars }) {
  return (
    <>
      <Reveal>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </Reveal>
      <div className="relative mt-8 sm:mt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[12%] right-[12%] top-[38px] hidden h-px border-t border-dashed border-accent/35 lg:block"
        />
        <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            const Tag = p.anchor ? 'a' : 'div'
            return (
              <li key={p.title} className="h-full">
                <Reveal delay={0.06 * i} className="h-full">
                  <Tag
                    {...(p.anchor ? { href: `#${p.anchor}` } : {})}
                    className="o-card o-card--frame group flex h-full flex-col rounded-[22px] border border-line bg-white p-5 hover:border-accent/30 sm:rounded-[24px]"
                  >
                    <span className="flex items-center justify-between">
                      <span className={`grid h-11 w-11 place-items-center rounded-2xl ring-4 ring-white ${tones[p.tone ?? 'navy']}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className="mt-4 text-[18px] font-bold tracking-tight text-navy">{p.title}</span>
                    <span className="mt-1 text-[14px] font-medium italic leading-6 text-teal">{p.tagline}</span>
                    {p.text ? <span className="mt-2 text-[13px] leading-5 text-muted">{p.text}</span> : null}
                    {p.anchor ? (
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12.5px] font-semibold text-navy/70 group-hover:text-accent">
                        See how <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                      </span>
                    ) : null}
                  </Tag>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}

/** The detailed zigzag rows. Each row gets a faint oversized number behind its text. */
export function PillarRows({ rows }) {
  return (
    <div className="space-y-14 lg:space-y-20">
      {rows.map((row, i) => (
        <div key={row.title} id={row.anchor} className="relative scroll-mt-24">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-8 hidden select-none text-[160px] font-extrabold leading-none tracking-[-0.06em] text-navy/[0.04] lg:block ${
              i % 2 ? 'right-0' : 'left-0'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="relative">
            <Split
              reverse={i % 2 === 1}
              eyebrow={row.eyebrow}
              title={row.title}
              lead={row.lead}
              ticks={row.ticks}
              media={row.media}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
