import { motion, useReducedMotion } from 'framer-motion'
import Container from '../ui/Container'
import SectionCard from '../ui/SectionCard'

/** One orchestrated entrance: each element takes its place in the sequence. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * The dark opening banner every page starts with.
 *   eyebrow  small pill above the headline
 *   title    the h1 (pass the accented part as <span className="text-accent">)
 *   lead     one supporting paragraph
 *   actions  buttons
 *   badges   [{ icon, text }] quiet proof points under the buttons
 *   visual   the illustration on the right; omit it for a text-only banner
 */
export default function PageHero({ id, eyebrow, title, lead, actions, badges = [], visual }) {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: reduceMotion ? {} : { staggerChildren: 0.08, delayChildren: 0.05 } },
  }

  return (
    <SectionCard id={id} className="bg-midnight text-white">
      {/* Ground: brand gradient, dot grid and two ambient orbs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_15%,rgba(19,96,116,0.55)_0%,rgba(8,54,71,0)_60%)]"
      />
      <div aria-hidden="true" className="bg-dot-grid-light absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[6%] top-[-12%] h-[340px] w-[340px] rounded-full bg-mint/8 blur-[130px]" />
        <div className="absolute -right-[8%] bottom-[-16%] h-[380px] w-[380px] rounded-full bg-accent/12 blur-[130px]" />
      </div>

      {/* Ambient trendline running under the banner */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full opacity-[0.16]"
      >
        <motion.path
          d="M0,210 C120,195 180,150 290,158 C400,166 450,120 560,126 C670,132 720,92 830,104 C940,116 1010,70 1200,58"
          fill="none"
          stroke="#E8783A"
          strokeWidth="1.5"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>

      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className={
            visual
              ? 'grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12'
              : 'max-w-3xl'
          }
        >
          <div>
            <motion.span
              variants={rise}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3 py-1.5 backdrop-blur-md sm:px-4"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                {!reduceMotion && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 sm:tracking-[0.2em]">
                {eyebrow}
              </span>
            </motion.span>

            <motion.h1
              variants={rise}
              className="mt-5 text-[32px] font-extrabold leading-[1.06] tracking-[-0.045em] sm:mt-6 sm:text-[44px] sm:tracking-[-0.05em] lg:text-[48px] xl:text-[56px]"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-4 max-w-[50ch] text-[15px] leading-7 text-white/70 sm:mt-6 sm:text-[17px] sm:leading-8"
            >
              {lead}
            </motion.p>

            {actions ? (
              <motion.div
                variants={rise}
                className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
              >
                {actions}
              </motion.div>
            ) : null}

            {badges.length ? (
              <motion.ul variants={rise} className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 sm:mt-8">
                {badges.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon
                      className="h-3.5 w-3.5 shrink-0 text-mint"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="text-[12px] font-medium tracking-tight text-white/60">
                      {text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </div>

          {visual ? <motion.div variants={rise}>{visual}</motion.div> : null}
        </motion.div>
      </Container>
    </SectionCard>
  )
}
