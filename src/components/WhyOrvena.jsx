import { motion, useReducedMotion } from 'framer-motion'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

/**
 * Short supporting band on the home page — the depth lives on /about and /services.
 *
 * Four promises, four emblems. Each card is a white face on a soft offset plate, with
 * a hand-drawn seal set into it, and one hairline runs behind all four seals. The emblems share one set of rules: a 64 × 64 grid, 1.5 strokes with round
 * ends, navy for the outline, a dotted line for the quiet detail, and a single touch
 * of orange for the part that carries the promise. Each does one small thing when it
 * scrolls in and a smaller one on hover (see .why-* in index.css).
 *
 * The emblems are decoration: aria-hidden, wordless, and nothing depends on hover.
 */

const EASE = [0.32, 0.72, 0, 1]
const NAVY = '#0b4156'
const ACCENT = '#d95f14'

const line = { fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
const ink = { ...line, stroke: NAVY }
const mark = { ...line, stroke: ACCENT }
const dots = { ...line, stroke: NAVY, strokeOpacity: 0.34, strokeDasharray: '0.01 3.2' }

/* ── Motion ───────────────────────────────────────────────────────────────── */

const card = {
  hidden: { opacity: 0, y: 24 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.07 * index, ease: EASE },
  }),
}

// the hairline behind the seal opens outwards from it
const rail = {
  hidden: { scaleX: 0, opacity: 0 },
  show: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, delay, ease: EASE },
  }),
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay, ease: EASE },
      opacity: { duration: 0.2, delay },
    },
  }),
}

const land = {
  hidden: { scale: 0.4, opacity: 0 },
  show: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
}

// one lobe of the seal is 30°, so it comes to rest looking exactly as it started
const notch = {
  hidden: { rotate: -30 },
  show: (delay = 0) => ({ rotate: 0, transition: { duration: 1.2, delay, ease: EASE } }),
}

/* ── Emblems ──────────────────────────────────────────────────────────────── */

/** Secure & confidential — a shield, stitched inside, whose keyhole draws itself. */
function Shield({ at }) {
  return (
    <>
      <path
        d="M32 12.5 L46 17.5 V30 C46 39.5 40.2 46.6 32 51 C23.8 46.6 18 39.5 18 30 V17.5 Z"
        {...ink}
        fill="#fff"
      />
      <path
        d="M32 16.6 L42.4 20.3 V30 C42.4 37.5 38.2 43.2 32 46.8 C25.8 43.2 21.6 37.5 21.6 30 V20.3 Z"
        {...dots}
      />
      {/* hover: the lock turns a quarter */}
      <g className="why-turn">
        <motion.circle variants={draw} custom={at} cx="32" cy="29" r="3" {...mark} />
        <motion.path variants={draw} custom={at + 0.5} d="M32 32 V36.5" {...mark} />
      </g>
    </>
  )
}

// A twelve-lobed seal, built once from its own geometry
const SEAL = `${Array.from({ length: 13 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2
  const x = (32 + 16 * Math.cos(angle)).toFixed(2)
  const y = (32 + 16 * Math.sin(angle)).toFixed(2)
  return index ? `A5 5 0 0 1 ${x} ${y}` : `M${x} ${y}`
}).join(' ')} Z`

/** Verified doctors — a seal that clicks round one notch, and a tick that settles. */
function Seal({ at }) {
  return (
    <>
      {/* hover: one more notch */}
      <g className="why-notch">
        <motion.g variants={notch} custom={at}>
          <path d={SEAL} {...ink} fill="#fff" />
        </motion.g>
      </g>
      <circle cx="32" cy="32" r="11.5" {...dots} />
      <motion.path variants={draw} custom={at + 0.45} d="M26 32.4 L30.2 36.6 L38.2 27.6" {...mark} />
    </>
  )
}

/** Dedicated support — one unbroken line from the first mark to the last. */
function Relay({ at }) {
  return (
    <>
      <circle cx="19" cy="21" r="3.5" {...ink} fill="#fff" />
      <motion.path
        variants={draw}
        custom={at}
        d="M22.5 21 H39 A5.5 5.5 0 0 1 39 32 H25 A5.5 5.5 0 0 0 25 43 H41"
        {...ink}
      />
      {/* hover: the ring around the last mark opens a little */}
      <g className="why-halo">
        <circle cx="45" cy="43" r="6.8" {...dots} />
      </g>
      <motion.circle variants={land} custom={at + 0.8} cx="45" cy="43" r="3.25" fill={ACCENT} />
    </>
  )
}

const RECEIPT_ROWS = [
  [20, 33.5],
  [25.5, 30.5],
  [31, 34.5],
]

/** Transparent pricing — a receipt with every line on show, the total last. */
function Receipt({ at }) {
  return (
    // hover: the slip feeds up a touch
    <g className="why-slip">
      <path
        d="M23 13 H41 A2 2 0 0 1 43 15 V51 L39.33 48 L35.67 51 L32 48 L28.33 51 L24.67 48 L21 51 V15 A2 2 0 0 1 23 13 Z"
        {...ink}
        fill="#fff"
      />
      {RECEIPT_ROWS.map(([y, end], index) => (
        <motion.path
          key={y}
          variants={draw}
          custom={at + index * 0.16}
          d={`M25.5 ${y} H${end} M36.5 ${y} H38.5`}
          {...ink}
          strokeOpacity={0.55}
        />
      ))}
      <path d="M25.5 36.5 H38.5" {...dots} />
      <motion.path variants={draw} custom={at + 0.6} d="M25.5 42 H38.5" {...mark} />
    </g>
  )
}

// A hyphenated word stays in one piece when its line wraps
const unbroken = (text) =>
  text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 ? (
      <span key={part} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )

const benefits = [
  {
    art: Shield,
    title: 'Secure & confidential',
    text: 'Enterprise-grade encryption, consent-led access.',
  },
  {
    art: Seal,
    title: 'Verified doctors',
    text: 'Specialists checked for proven clinical expertise.',
  },
  {
    art: Relay,
    title: 'Dedicated support',
    text: 'A real team from first report to follow-up.',
  },
  {
    art: Receipt,
    title: 'Transparent pricing',
    text: 'Clear fees and upfront estimates. No surprises.',
  },
]

export default function WhyOrvena() {
  const reduce = useReducedMotion()

  return (
    <SectionCard className="bg-soft py-10 sm:py-12 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-mint-soft/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-[-4rem] h-72 w-72 rounded-full bg-white/70 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <Eyebrow>Why Orvena</Eyebrow>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:text-[32px]">
                The care team behind your records.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14px] leading-6 text-muted">
              HealthOS organizes your data. Orvena stands behind it with verified specialists and
              real support.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {/* the one line all four seals sit on: it shows in the gaps between the cards */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            className="pointer-events-none absolute inset-x-0 top-[69px] hidden h-px origin-left bg-navy/[0.14] lg:block"
          />
          {benefits.map((benefit, index) => {
            const Art = benefit.art
            // the emblems wait for their card to arrive, then go left to right
            const at = 0.4 + index * 0.12

            return (
              <motion.article
                key={benefit.title}
                variants={card}
                custom={index}
                initial={reduce ? 'show' : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="relative flex flex-col"
              >
                {/* a white face on a soft offset plate; .o-card adds the pointer glow and lift */}
                <div className="why-card group o-card o-plate o-plate-sm flex-1 rounded-[22px] border border-white/70 bg-white">
                  <div className="flex items-center gap-3.5 p-3 sm:block sm:px-5 sm:pb-7 sm:pt-7 sm:text-center lg:px-4 xl:px-5">
                    <div className="relative shrink-0">
                      {/* a pale header the seal straddles (tablet and up) */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-5 -top-7 bottom-1/2 hidden bg-gradient-to-b from-soft/70 to-pale/60 sm:block lg:-inset-x-4 xl:-inset-x-5"
                      />
                      {/* its lower edge: the hairline all four seals sit on */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-5 top-1/2 hidden h-px sm:block lg:-inset-x-4 xl:-inset-x-5"
                      >
                        <motion.span
                          variants={rail}
                          custom={at - 0.15}
                          className="absolute inset-0 bg-navy/[0.12]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 motion-reduce:transition-none" />
                      </span>

                      {/* the seal: a shallow well pressed into the card */}
                      <span
                        aria-hidden="true"
                        className="relative block h-14 w-14 rounded-full bg-gradient-to-b from-pale to-white shadow-[inset_0_2px_5px_rgba(11,65,86,0.11)] ring-1 ring-navy/[0.08] sm:mx-auto sm:h-20 sm:w-20"
                      >
                        <svg viewBox="0 0 64 64" fill="none" className="block h-full w-full">
                          <Art at={at} />
                        </svg>
                      </span>
                    </div>

                    <div className="min-w-0 sm:mt-5">
                      <h3 className="text-[15px] font-semibold leading-6 tracking-tight text-navy sm:text-[16px]">
                        {benefit.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] leading-5 text-muted sm:mx-auto sm:mt-1.5 sm:max-w-[27ch] sm:text-balance">
                        {unbroken(benefit.text)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </SectionCard>
  )
}
