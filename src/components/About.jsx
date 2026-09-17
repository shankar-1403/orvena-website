import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Building2, Cpu, HeartPulse, Hospital, Stethoscope } from 'lucide-react'
import { images } from '../data/images'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

const roles = [
  {
    id: 'patients',
    word: 'Patients',
    text: 'Clarity before every major medical decision.',
    image: images.patientCare,
    icon: HeartPulse,
  },
  {
    id: 'doctors',
    word: 'Doctors',
    text: 'Verified specialists across leading disciplines.',
    image: images.specialistReview,
    icon: Stethoscope,
  },
  {
    id: 'hospitals',
    word: 'Hospitals',
    text: 'Coordinated access to centres of excellence.',
    image: images.modernFacility,
    icon: Hospital,
  },
  {
    id: 'corporations',
    word: 'Corporations',
    text: 'Workforce wellness designed around real risk.',
    image: images.wellness,
    icon: Building2,
  },
  {
    id: 'technology',
    word: 'Technology',
    text: 'Records, intelligence and care in one ecosystem.',
    image: images.dataReview,
    icon: Cpu,
  },
]

const INTERVAL_MS = 3800

export default function About() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const active = roles[index]
  const ActiveIcon = active.icon

  useEffect(() => {
    if (paused || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion])

  const cycle = (direction) => {
    setIndex((current) => (current + direction + roles.length) % roles.length)
  }

  return (
    <SectionCard id="about" className="bg-white py-8 sm:py-10 lg:py-12">
      <Container>
        <Reveal>
          <div>
            <Eyebrow>About</Eyebrow>

            <h1 className="mt-4 max-w-[24ch] text-[28px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:mt-5 sm:text-[36px] md:text-[44px] lg:text-[52px]">
              Redefining Healthcare Through Expertise, Technology &amp; Trust
            </h1>

            <div className="mt-6 grid gap-6 border-t border-line pt-6 text-[15px] leading-7 text-muted sm:mt-8 sm:pt-7 sm:text-[16px] sm:leading-7 md:grid-cols-2 md:gap-10 lg:gap-14">
              <p>
                Orvena is a healthcare solutions company focused on building a connected,
                technology-enabled healthcare ecosystem. We bring together medical expertise,
                digital innovation, and data-driven solutions to improve access, efficiency, and
                outcomes across the healthcare journey.
              </p>
              <p>
                From specialist medical services and second opinions to digital health, medical
                tourism, wellness, and healthcare technology, Orvena delivers integrated solutions
                designed around the evolving needs of patients, providers, and organizations.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-12 lg:mt-14">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid items-center gap-8 md:grid-cols-[minmax(200px,0.9fr)_minmax(0,1.2fr)] md:gap-6 lg:grid-cols-[minmax(220px,0.78fr)_minmax(0,1.4fr)] lg:gap-8"
          >
            <div>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-navy/35">
                {String(index + 1).padStart(2, '0')} / {String(roles.length).padStart(2, '0')}
              </span>

              <p className="mt-3 text-[15px] font-semibold tracking-tight text-navy/50">
                A smarter way for
              </p>

              <div
                className="mt-1"
                role="tablist"
                aria-label="Connected roles"
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') cycle(1)
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') cycle(-1)
                }}
              >
                {roles.map((role, i) => {
                  const selected = i === index
                  return (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setIndex(i)}
                      className="relative flex h-[46px] w-full items-center sm:h-[52px]"
                    >
                      {selected ? (
                        <motion.span
                          layoutId={reduceMotion ? undefined : 'about-role-line'}
                          className="absolute -left-5 top-1/2 hidden h-5 w-1 -translate-y-1/2 rounded-full bg-accent sm:block"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span
                        className={`origin-left font-extrabold tracking-[-0.05em] transition-[font-size,color] duration-300 ${
                          selected
                            ? 'text-[26px] text-accent sm:text-[34px] md:text-[32px] lg:text-[44px]'
                            : 'text-[17px] text-navy/28 hover:text-navy/50 sm:text-[20px]'
                        }`}
                      >
                        {role.word}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[22px] font-extrabold tracking-[-0.04em] text-navy sm:text-[26px]">
                  to navigate care.
                </p>
                <Link
                  to="/health-os"
                  className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-navy transition-colors hover:text-accent"
                >
                  Discover Orvena
                  <ArrowUpRight className="h-3.5 w-3.5 rounded-full bg-mint-soft p-0.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] md:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-x-3 -bottom-3 top-6 rounded-[28px] bg-mint-soft"
                style={{ transform: 'rotate(5deg)' }}
              />
              <div
                aria-hidden="true"
                className="absolute -inset-x-2 -top-2 bottom-8 rounded-[28px] bg-navy/8"
                style={{ transform: 'rotate(-4deg)' }}
              />

              <div className="relative overflow-hidden rounded-[26px] shadow-lift">
                <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active.id}
                      src={active.image}
                      alt={`${active.word} in the Orvena care network`}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                      <ActiveIcon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
                      {String(index + 1).padStart(2, '0')} · {active.word}
                    </span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={active.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        className="text-[15px] font-semibold text-white"
                      >
                        Connected care for {active.word.toLowerCase()}
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-1 max-w-sm text-[13px] leading-5 text-white/80">{active.text}</p>
                  </div>

                  {!reduceMotion && !paused ? (
                    <motion.div
                      key={`progress-${active.id}`}
                      className="absolute bottom-0 left-0 h-0.5 origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
