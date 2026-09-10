import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { doctors, specialties } from '../data/doctors'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
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
    <SectionCard id="doctors" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Doctors"
            title="World-Class Doctors You Can Trust."
            description="Consult with India’s leading medical experts across cardiology, oncology, orthopedics, gastroenterology, nephrology and more."
          >
            <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
              {specialties.map((item) => {
                const on = filter === item
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectFilter(item)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                      on ? 'text-white' : 'text-navy/70 hover:text-navy'
                    }`}
                    aria-pressed={on}
                  >
                    {on ? (
                      <motion.span
                        layoutId="doctor-filter"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-pale" />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                )
              })}
            </div>
          </SectionHeader>
        </Reveal>

        <div className="mt-8 grid overflow-hidden rounded-[24px] border border-navy/10 bg-navy text-white shadow-lift sm:mt-12 sm:rounded-[36px] md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[380px] md:min-h-[520px] lg:min-h-[620px]">
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
                  className="h-full w-full object-cover object-top"
                  width={900}
                  height={1100}
                />
                <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-mint backdrop-blur-md sm:left-6 sm:top-6">
              {pad(activeIndex)} / {String(visible.length).padStart(2, '0')}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
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
                  <h3 className="mt-2 text-[22px] font-semibold tracking-tight sm:text-3xl lg:text-4xl">
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
                  <Link
                    to="/contact"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    Request this specialist
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-accent">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex max-h-[320px] flex-col overflow-y-auto border-t border-white/10 md:max-h-none md:border-l md:border-t-0">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint/70">
                Specialist roster
              </p>
              <p className="mt-1 text-sm text-white/55">Select a consultant to review.</p>
            </div>
            <div className="flex-1">
              {visible.map((doctor, index) => {
                const on = doctor.name === active.name
                return (
                  <button
                    key={doctor.name}
                    type="button"
                    onClick={() => setActiveName(doctor.name)}
                    className="relative flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-pressed={on}
                  >
                    {on ? (
                      <motion.span
                        layoutId="doctor-row"
                        className="absolute inset-0 bg-white/8"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className={`relative z-10 text-[12px] font-semibold tracking-[0.16em] ${on ? 'text-mint' : 'text-white/30'}`}>
                      {pad(index)}
                    </span>
                    <span className="relative z-10 min-w-0 flex-1">
                      <span className="block truncate text-[16px] font-semibold tracking-tight">
                        {doctor.name}
                      </span>
                      <span className="mt-1 block text-[12px] text-white/50">{doctor.specialty}</span>
                    </span>
                    {on ? <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-mint" /> : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-muted">Verified specialists across leading disciplines.</p>
          <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
            Explore All Specialists
          </Button>
        </div>
      </Container>
    </SectionCard>
  )
}
