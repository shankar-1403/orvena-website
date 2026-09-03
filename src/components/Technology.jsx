import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Hospital,
  Microscope,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'

const modules = [
  {
    id: 'cms',
    code: '01',
    label: 'CMS',
    icon: Building2,
    title: 'Clinic Management',
    text: 'Appointments, records and day-to-day clinic flow in one place.',
    signal: 'Appointments synced',
  },
  {
    id: 'hmis',
    code: '02',
    label: 'HMIS',
    icon: Hospital,
    title: 'Hospital Information System',
    text: 'Connect admissions, operations and care teams across the hospital.',
    signal: 'Workflows live',
  },
  {
    id: 'lms',
    code: '03',
    label: 'LMS',
    icon: Microscope,
    title: 'Laboratory Management',
    text: 'Faster diagnostics, cleaner reporting and fewer operational gaps.',
    signal: 'Reports clearing',
  },
  {
    id: 'fwa',
    code: '04',
    label: 'FWA',
    icon: ShieldAlert,
    title: 'Fraud, Waste & Abuse',
    text: 'Intelligent analytics that surface inefficiency and unusual activity.',
    signal: 'Risk scan active',
  },
]

export default function Technology() {
  const [activeId, setActiveId] = useState('cms')

  return (
    <section id="technology" className="relative overflow-hidden bg-[#061018] py-24 text-white lg:py-32">
      <Container className="relative">
        <Reveal>
          <SectionHeader
            light
            eyebrow="Technology"
            title="Technology That Makes Healthcare Smarter."
          >
            <p className="text-[16px] leading-8 text-white/65 lg:text-[17px]">
              A connected health data engine that unifies clinical operations, diagnostics
              and intelligent analytics — without losing the human side of care.
            </p>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="overflow-hidden rounded-[32px] border border-white/10">
            {modules.map((item, index) => {
              const Icon = item.icon
              const on = item.id === activeId
              const last = index === modules.length - 1

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={on}
                  className={`flex w-full gap-5 px-6 py-6 text-left transition-colors sm:gap-8 sm:px-8 sm:py-7 ${
                    last ? '' : 'border-b border-white/10'
                  } ${on ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'}`}
                >
                  <span
                    className={`w-8 shrink-0 pt-1 text-[12px] font-semibold tracking-[0.16em] ${
                      on ? 'text-mint' : 'text-white/35'
                    }`}
                  >
                    {item.code}
                  </span>

                  <span
                    className={`hidden w-16 shrink-0 pt-1 text-[13px] font-semibold tracking-[0.14em] sm:block ${
                      on ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {item.label}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 shrink-0 ${on ? 'text-mint' : 'text-white/35'}`} />
                      <span className="text-lg font-semibold tracking-tight sm:text-xl">{item.title}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {on ? (
                        <motion.span
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-3 block max-w-[46ch] text-[15px] leading-7 text-white/60">
                            {item.text}
                          </span>
                          <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.16em] text-mint/80">
                            {item.signal}
                          </span>
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/55">Four clinical systems. One intelligent core.</p>
          <a
            href="#patient-os"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            See it in the Patient OS
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
