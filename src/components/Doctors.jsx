import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { doctors, specialties } from '../data/doctors'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

export default function Doctors() {
  const [filter, setFilter] = useState('All')
  const [activeName, setActiveName] = useState(doctors[0].name)

  const visible = useMemo(() => {
    if (filter === 'All') return doctors
    return doctors.filter((doctor) => doctor.specialty.toLowerCase().includes(filter.toLowerCase()))
  }, [filter])

  const active = visible.find((doctor) => doctor.name === activeName) ?? visible[0]
  const activeIndex = Math.max(0, visible.findIndex((doctor) => doctor.name === active.name))

  const selectFilter = (value) => {
    setFilter(value)
    const next =
      value === 'All'
        ? doctors[0]
        : doctors.find((doctor) => doctor.specialty.toLowerCase().includes(value.toLowerCase()))
    if (next) setActiveName(next.name)
  }

  return (
    <section id="doctors" className="bg-pale py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Doctors"
            title="Meet the Specialists Behind Better Decisions."
            description="Connect with experienced specialists across leading medical disciplines."
          >
            <div className="flex flex-wrap gap-2">
              {specialties.map((item) => {
                const on = filter === item
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectFilter(item)}
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                      on ? 'bg-accent text-white' : 'bg-white text-navy/70 hover:text-navy'
                    }`}
                    aria-pressed={on}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </SectionHeader>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[36px] bg-navy text-white shadow-lift lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[460px] overflow-hidden lg:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={active.image}
                  alt={`Portrait of ${active.name}`}
                  className="h-full w-full object-cover object-top grayscale contrast-[1.08]"
                  width={900}
                  height={1100}
                />
                <div className="absolute inset-0 bg-navy/35 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-mint backdrop-blur-md">
              {pad(activeIndex)} / {String(visible.length).padStart(2, '0')}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name + '-copy'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-mint">
                    {active.specialty}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {active.name}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-sm leading-6 text-white/75">{active.focus}</p>
                  <div className="mt-6 flex flex-wrap gap-8">
                    <div>
                      <p className="text-3xl font-extrabold tracking-tight">{active.years}+</p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        Years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{active.qualifications}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        Credentials
                      </p>
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    Request this specialist
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col border-t border-white/10 lg:border-l lg:border-t-0">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint/70">
                Specialist roster
              </p>
              <p className="mt-1 text-sm text-white/55">Select a consultant to review.</p>
            </div>
            <div className="flex-1 divide-y divide-white/8">
              {visible.map((doctor, index) => {
                const on = doctor.name === active.name
                return (
                  <button
                    key={doctor.name}
                    type="button"
                    onClick={() => setActiveName(doctor.name)}
                    className={`flex w-full items-center gap-4 px-6 py-5 text-left transition-colors ${
                      on ? 'bg-white/8' : 'hover:bg-white/5'
                    }`}
                    aria-pressed={on}
                  >
                    <span className={`text-[12px] font-semibold tracking-[0.16em] ${on ? 'text-mint' : 'text-white/30'}`}>
                      {pad(index)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[16px] font-semibold tracking-tight">
                        {doctor.name}
                      </span>
                      <span className="mt-1 block text-[12px] text-white/50">{doctor.specialty}</span>
                    </span>
                    {on ? <span className="h-1.5 w-1.5 rounded-full bg-mint" /> : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">Verified specialists across leading disciplines.</p>
          <Button href="#contact" variant="secondary">
            Explore All Specialists
          </Button>
        </div>
      </Container>
    </section>
  )
}
