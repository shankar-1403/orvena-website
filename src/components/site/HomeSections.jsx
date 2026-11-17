import { animate, useInView, useReducedMotion } from 'framer-motion'
import { HeartPulse, ScanSearch, Stethoscope, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]

/* ---------- How it connects: a journey rail ---------- */

const stepIcons = [Upload, ScanSearch, Stethoscope, HeartPulse]

// first card starts the journey (dark), last one is the outcome (warm), middle two are light
const stepLooks = [
  { card: 'bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight text-white border-transparent', chip: 'bg-white/12 text-mint ring-1 ring-white/15', title: 'text-white', text: 'text-white/75', num: 'text-white/[0.07]', bar: 'bg-mint' },
  { card: 'bg-white border-line', chip: 'bg-mint-soft text-teal', title: 'text-navy', text: 'text-muted', num: 'text-navy/[0.05]', bar: 'bg-accent' },
  { card: 'bg-white border-line', chip: 'bg-mint-soft text-teal', title: 'text-navy', text: 'text-muted', num: 'text-navy/[0.05]', bar: 'bg-accent' },
  { card: 'bg-gradient-to-br from-accent to-[#f08a3c] text-white border-transparent', chip: 'bg-white/20 text-white ring-1 ring-white/25', title: 'text-white', text: 'text-white/85', num: 'text-white/[0.12]', bar: 'bg-white' },
]

/** Dashed curved arrow between two staggered cards (large screens). */
function Connector({ down }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 40"
      className={`absolute -right-[38px] z-10 hidden h-10 w-12 text-navy/80 lg:block ${down ? 'top-[38%]' : 'top-[58%]'}`}
    >
      <path
        d={down ? 'M2 6 C 22 6, 26 34, 42 34' : 'M2 34 C 22 34, 26 6, 42 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <path d={down ? 'M37 29 L43 34 L37 39' : 'M37 1 L43 6 L37 11'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function JourneyRail({ items }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-x-7 lg:pb-14">
      {items.map((item, i) => {
        const Icon = stepIcons[i % stepIcons.length]
        const look = stepLooks[i % stepLooks.length]
        const last = i === items.length - 1
        return (
          <li key={item.title} style={{ zIndex: items.length - i }} className={`relative ${i % 2 ? 'lg:translate-y-14' : ''}`}>
            <Reveal delay={0.1 * i} className="h-full">
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border p-6 shadow-[0_24px_48px_-30px_rgba(11,65,86,0.45)] transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${look.card}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-2 -top-5 text-[110px] font-extrabold leading-none tracking-[-0.06em] ${look.num}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 ${look.chip}`}>
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className={`relative mt-8 text-[21px] font-bold tracking-tight ${look.title}`}>{item.title}</h3>
                <span aria-hidden="true" className={`relative mt-3 block h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-14 ${look.bar}`} />
                <p className={`relative mt-4 text-[14.5px] leading-6 ${look.text}`}>{item.text}</p>
              </article>
            </Reveal>
            {!last ? <Connector down={i % 2 === 0} /> : null}
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Numbers: a dark band with count-up figures ---------- */

function CountUp({ value }) {
  // animate the leading number ("10,000" of "10,000+", "2" of "2 hours"), keep the rest as is
  const match = value.match(/^([\d,]+)(.*)$/)
  const target = match ? Number(match[1].replace(/,/g, '')) : null
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [n, setN] = useState(reduceMotion || target === null ? target : 0)

  useEffect(() => {
    if (!inView || reduceMotion || target === null) return undefined
    const controls = animate(0, target, {
      duration: target > 10 ? 1.6 : 0.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, target])

  if (target === null) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {(n ?? target).toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  )
}

export function NumbersBand({ items }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight px-5 py-8 text-white sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-10">
        <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-teal/40 blur-[90px]" />
        <dl className="relative grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col px-2.5 min-[400px]:px-3 sm:px-5 lg:px-6 ${i % 2 ? 'border-l border-white/12' : ''} ${i > 0 ? 'lg:border-l lg:border-white/12' : ''}`}
            >
              <dt className="order-2 mt-3 max-w-[22ch] text-[13px] leading-5 text-white/70 sm:text-[14px]">{item.label}</dt>
              <dd className="order-1 whitespace-nowrap text-[22px] min-[360px]:text-[24px] font-extrabold leading-none tracking-[-0.04em] min-[400px]:text-[28px] min-[500px]:text-[34px] sm:text-[44px] lg:text-[38px] xl:text-[48px]">
                <CountUp value={item.value} />
              </dd>
              <span aria-hidden="true" className="order-1 mt-4 block h-[3px] w-10 rounded-full bg-gradient-to-r from-accent to-[#f08a3c]" />
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  )
}

/* ---------- Why Orvena: plate cards with an icon watermark ---------- */

const trustTones = {
  navy: { chip: 'bg-navy text-white', edge: 'from-navy to-teal', mark: 'text-navy' },
  accent: { chip: 'bg-accent text-white', edge: 'from-accent to-[#f08a3c]', mark: 'text-accent' },
  teal: { chip: 'bg-teal text-white', edge: 'from-teal to-[#2a7f96]', mark: 'text-teal' },
}

export function TrustPlates({ items }) {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-3 md:gap-6">
      {items.map(({ icon: Icon, tone = 'navy', title, text }, i) => {
        const t = trustTones[tone] ?? trustTones.navy
        return (
          <Reveal key={title} delay={0.08 * i} className="h-full">
            <article className="o-plate group relative h-full overflow-hidden rounded-[24px] border border-white/80 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:rounded-[28px] sm:p-7">
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.edge}`} />
              <Icon
                aria-hidden="true"
                strokeWidth={1.2}
                className={`pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 opacity-[0.06] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${t.mark}`}
              />
              <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${t.chip} shadow-[0_10px_22px_-12px_rgba(11,65,86,0.6)]`}>
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 text-[20px] font-bold tracking-tight text-navy">{title}</h3>
              <p className="relative mt-2.5 text-[14.5px] leading-6 text-muted">{text}</p>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
