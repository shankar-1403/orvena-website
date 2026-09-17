import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Clock3,
  Globe2,
  Hospital,
  Stethoscope,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import heroBanner from '../assets/orvena-hero-banner.png'
import { stats } from '../data/services'
import Button from './ui/Button'
import Container from './ui/Container'
import SectionCard from './ui/SectionCard'

const chips = [
  { label: 'Second opinions', href: '/services/second-opinion' },
  { label: 'Medical tourism', href: '/services/medical-tourism' },
  { label: 'Disease reversal', href: '/services/disease-reversal' },
  { label: 'Corporate wellness', href: '/services/corporate-wellness' },
  { label: 'HealthOS', href: '/health-os' },
]

const heroStats = [
  { ...stats[0], icon: Users },
  { ...stats[1], icon: Stethoscope },
  { ...stats[2], icon: Hospital },
  { ...stats[3], icon: Globe2 },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <SectionCard id="home" className="text-white md:min-h-[calc(100svh-6.75rem)]">
      <motion.img
        src={heroBanner}
        alt=""
        initial={reduceMotion ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center"
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_42%,rgba(11,65,86,0.4)_0%,rgba(11,65,86,0.76)_55%,rgba(11,65,86,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/20"
      />
      <div aria-hidden="true" className="bg-dot-grid-light absolute inset-0 opacity-40" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className={`pointer-events-auto absolute left-[5%] top-[38%] w-[220px] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md ${
            reduceMotion ? '' : 'animate-float'
          }`}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
            <Clock3 className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[22px] font-extrabold tracking-tight">24–72h</p>
          <p className="mt-1 text-[12px] leading-5 text-white/65">Specialist second-opinion turnaround</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className={`pointer-events-auto absolute right-[5%] top-[52%] w-[220px] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md ${
            reduceMotion ? '' : 'animate-float-delayed'
          }`}
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Live
          </span>
          <p className="text-[16px] font-semibold tracking-tight">HealthOS</p>
          <p className="mt-1 text-[12px] leading-5 text-white/65">Records, labs and care in one timeline</p>
        </motion.div>
      </div>

      <Container className="relative z-10 flex flex-col items-center px-4 pt-8 pb-5 text-center sm:px-8 md:min-h-[calc(100svh-6.75rem)] md:justify-center md:px-10 md:pt-16 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/8 px-3 py-1.5 backdrop-blur-md sm:px-4"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-[11px] sm:tracking-[0.22em]">
            Connected care, live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[13ch] text-[32px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:mt-7 sm:max-w-[16ch] sm:text-[48px] sm:leading-[0.98] sm:tracking-[-0.055em] md:text-[56px] lg:text-[76px]"
        >
          Healthcare,{' '}
          <span className="bg-gradient-to-r from-mint via-accent to-accent-deep bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
            Connected
          </span>{' '}
          Around You.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-4 max-w-[42ch] text-[14px] leading-6 text-white/70 sm:mt-6 sm:text-[18px] sm:leading-8"
        >
          Expert second opinions, medical tourism, disease reversal, corporate wellness and intelligent
          technology — one ecosystem for clearer decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mt-5 flex w-full max-w-md flex-wrap items-center justify-center gap-2 sm:mt-6 sm:max-w-none"
        >
          {chips.map((chip) => (
            <Link
              key={chip.href}
              to={chip.href}
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/12 hover:text-white sm:px-3.5 sm:text-[12px]"
            >
              {chip.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.7 }}
          className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          <Button href="/services" variant="light" className="w-full min-w-0 sm:w-auto sm:min-w-[180px]">
            Explore Healthcare
          </Button>
          <Button
            href="/contact"
            variant="outline"
            showArrow={false}
            className="hidden min-w-[180px] sm:inline-flex"
          >
            Talk to an Expert
          </Button>
        </motion.div>

        <div className="mt-7 w-full md:hidden">
          <HeroStats />
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 z-20 hidden md:block">
        <Container className="px-5 pb-6 sm:px-8 lg:px-10">
          <HeroStats />
        </Container>
      </div>
    </SectionCard>
  )
}

function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-lift backdrop-blur-md"
    >
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
              <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-mint sm:inline-flex">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[16px] font-extrabold tracking-tight sm:text-[20px]">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-[10px] font-medium uppercase leading-4 tracking-[0.08em] text-white/50 sm:truncate sm:text-[11px] sm:tracking-[0.12em]">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <Link
        to="/about"
        className="group flex items-center justify-center gap-1.5 border-t border-white/10 px-4 py-2.5 text-[12px] font-semibold text-mint hover:bg-white/6 hover:text-white md:hidden"
      >
        Discover Orvena
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  )
}
