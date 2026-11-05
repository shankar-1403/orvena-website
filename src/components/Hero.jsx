import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Globe2,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { stats } from '../data/services'
import { useCountUp } from '../hooks/useCountUp'
import AppShowcase from './AppShowcase'
import Button from './ui/Button'
import Container from './ui/Container'
import StoreButtons from './ui/StoreButtons'
import SectionCard from './ui/SectionCard'

// Compliance claims: these are the owner's statements about the product. Add or
// change one only when the owner says so.
const trustPoints = ['DPDP compliant', 'HIPAA compliant']

const heroStats = [
  { ...stats[0], icon: Users },
  { ...stats[1], icon: Stethoscope },
  { ...stats[2], icon: Hospital },
  { ...stats[3], icon: Globe2 },
]

/** One orchestrated entrance — each element inherits its place in the sequence. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  return (
    <SectionCard id="home" className="bg-midnight text-white">
      {/* Ground: brand gradient, dot grid and two ambient orbs — no stock photography. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_15%,rgba(19,96,116,0.55)_0%,rgba(8,54,71,0)_60%)]"
      />
      <div aria-hidden="true" className="bg-dot-grid-light absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[6%] top-[-12%] h-[340px] w-[340px] rounded-full bg-mint/8 blur-[130px]" />
        <div className="absolute -right-[8%] bottom-[-16%] h-[380px] w-[380px] rounded-full bg-accent/12 blur-[130px]" />
      </div>

      {/* Ambient trendline running under the whole banner */}
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
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
        >
          {/* ── Left: the thesis ── */}
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
                HealthOS · Patient Operating System
              </span>
            </motion.span>

            <motion.h1
              variants={rise}
              className="mt-5 max-w-[15ch] text-[34px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:mt-6 sm:text-[48px] sm:tracking-[-0.05em] lg:text-[60px] xl:text-[68px]"
            >
              Don’t just store medical reports.{' '}
              <span className="text-accent">Understand them.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-4 max-w-[46ch] text-[15px] leading-7 text-white/70 sm:mt-6 sm:text-[17px] sm:leading-8"
            >
              Scattered folders and fading paper slips become one organized health timeline —
              biomarker trends extracted automatically, shifting patterns flagged early.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button href="/health-os" variant="light" className="w-full sm:w-auto">
                Explore HealthOS
              </Button>
              <StoreButtons tone="dark" className="w-full sm:w-auto" />
            </motion.div>

            <motion.ul variants={rise} className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 sm:mt-8">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-3.5 w-3.5 shrink-0 text-mint"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] font-medium tracking-tight text-white/60">
                    {point}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right: the app itself — real screens, cycling ── */}
          <motion.div variants={rise}>
            <AppShowcase />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 lg:mt-14"
        >
          <HeroStats />
        </motion.div>
      </Container>
    </SectionCard>
  )
}

function StatValue({ value, suffix }) {
  const reduceMotion = useReducedMotion()
  const { ref, value: current } = useCountUp(value, { duration: 1400 })

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? value : Math.round(current)}
      {suffix}
    </span>
  )
}

function HeroStats() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-lift backdrop-blur-md">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {heroStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 ${
                index % 2 === 1 ? 'border-l border-white/10' : ''
              } ${index > 1 ? 'border-t border-white/10 sm:border-t-0' : ''} ${
                index === 2 ? 'sm:border-l sm:border-white/10' : ''
              }`}
            >
              <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-mint lg:inline-flex">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[16px] font-extrabold tracking-tight sm:text-[20px]">
                  <StatValue value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] font-medium uppercase leading-4 tracking-[0.06em] text-white/50 sm:tracking-[0.12em]">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <Link
        to="/about"
        className="group flex items-center justify-center gap-1.5 border-t border-white/10 px-4 py-2.5 text-[12px] font-semibold text-mint transition-colors duration-300 hover:bg-white/6 hover:text-white md:hidden"
      >
        Discover Orvena
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  )
}
