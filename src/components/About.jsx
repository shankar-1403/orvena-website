import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { images } from '../data/images'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

const roles = [
  {
    id: 'patients',
    word: 'Patients',
    text: 'Clarity before every major medical decision.',
    image: images.patientCare,
  },
  {
    id: 'doctors',
    word: 'Doctors',
    text: 'Verified specialists across leading disciplines.',
    image: images.patientCare,
  },
  {
    id: 'hospitals',
    word: 'Hospitals',
    text: 'Coordinated access to centres of excellence.',
    image: images.specialistReview,
  },
  {
    id: 'corporations',
    word: 'Corporations',
    text: 'Workforce wellness designed around real risk.',
    image: images.specialistReview,
  },
  {
    id: 'technology',
    word: 'Technology',
    text: 'Records, intelligence and care in one ecosystem.',
    image: images.specialistReview,
  },
]

const INTERVAL_MS = 3200

export default function About() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const active = roles[index]

  useEffect(() => {
    if (paused || reduceMotion) return undefined
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion])

  return (
    <section id="about" className="overflow-hidden bg-white py-12 lg:py-14">
      <Container>
        <Reveal>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
              <div>
                <Eyebrow>About</Eyebrow>

                <h2 className="mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.045em] text-navy sm:text-[38px] lg:text-[44px]">
                  <span className="block">A smarter way for</span>
                  <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2.5">
                    <span className="relative inline-flex min-h-[1.15em] min-w-[8ch] items-baseline overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={active.id}
                          initial={reduceMotion ? false : { y: '85%', opacity: 0 }}
                          animate={{ y: '0%', opacity: 1 }}
                          exit={reduceMotion ? undefined : { y: '-85%', opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 top-0 text-accent"
                        >
                          {active.word}
                        </motion.span>
                      </AnimatePresence>
                      <span className="invisible" aria-hidden="true">
                        Corporations
                      </span>
                    </span>
                    <span className="text-navy/75">to navigate care.</span>
                  </span>
                </h2>

                <div className="mt-4 min-h-[2.75rem]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-[34ch] text-[14px] leading-6 text-muted"
                    >
                      {active.text}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex gap-1.5" role="tablist" aria-label="Connected roles">
                    {roles.map((role, i) => (
                      <button
                        key={role.id}
                        type="button"
                        role="tab"
                        aria-label={role.word}
                        aria-selected={i === index}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? 'w-6 bg-accent' : 'w-1.5 bg-navy/15 hover:bg-navy/30'
                        }`}
                      />
                    ))}
                  </div>
                  <a
                    href="#patient-os"
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy"
                  >
                    Discover Orvena
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] sm:aspect-[2/1] lg:aspect-[16/11] lg:rounded-[28px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={`${active.word} in the Orvena care network`}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={750}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

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
        </Reveal>
      </Container>
    </section>
  )
}
