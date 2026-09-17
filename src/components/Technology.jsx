import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Hospital,
  Microscope,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const modules = [
  {
    id: 'cms',
    code: '01',
    label: 'CMS',
    icon: Building2,
    title: 'ClinicOS',
    text: 'End-to-end OPD scheduling, digital prescriptions, patient EMR and billing in one clinic suite.',
    signal: 'Appointments synced',
  },
  {
    id: 'hmis',
    code: '02',
    label: 'HMIS',
    icon: Hospital,
    title: 'HospitalOS',
    text: 'Enterprise hospital software covering IPD admissions, OT, pharmacy, ICU, inventory and care-team workflows.',
    signal: 'Workflows live',
  },
  {
    id: 'lms',
    code: '03',
    label: 'LMS',
    icon: Microscope,
    title: 'LabOS',
    text: 'Diagnostic sample tracking, analyzer integration, cleaner reporting and faster lab operations.',
    signal: 'Reports clearing',
  },
  {
    id: 'fwa',
    code: '04',
    label: 'FWA',
    icon: ShieldAlert,
    title: 'Fraud, Waste & Abuse',
    text: 'AI-driven claim audit to surface billing anomalies, duplicate claims, waste and unusual activity.',
    signal: 'Risk scan active',
  },
]

export default function Technology() {
  const [activeId, setActiveId] = useState('cms')
  const active = modules.find((item) => item.id === activeId) ?? modules[0]
  const ActiveIcon = active.icon

  return (
    <SectionCard id="technology" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-mint-soft/80 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Technology"
            title="Technology That Makes Healthcare Smarter."
          >
            <p className="text-[16px] leading-8 text-muted lg:text-[17px]">
              A connected health data engine - ClinicOS, HospitalOS, LaboratoryOS and
              Fraud, Waste & Abuse analytics - without losing the human side of care.
            </p>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 sm:mt-12 lg:mt-14">
          <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-[1fr_0.92fr] lg:gap-6">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {modules.map((item) => {
                const Icon = item.icon
                const on = item.id === activeId
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={on}
                    className="group relative overflow-hidden rounded-[24px] border border-navy/8 p-5 text-left transition-colors"
                  >
                    {on ? (
                      <motion.span
                        layoutId="tech-module"
                        className="absolute inset-0 bg-pale"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-white transition-colors group-hover:bg-pale/70" />
                    )}
                    <span className="relative z-10 flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                          on ? 'bg-accent text-white' : 'bg-mint-soft text-accent'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={`text-[12px] font-semibold tracking-[0.16em] ${on ? 'text-accent' : 'text-navy/25'}`}>
                        {item.code}
                      </span>
                    </span>
                    <span className="relative z-10 mt-4 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {item.label}
                    </span>
                    <span className="relative z-10 mt-1 block text-[16px] font-semibold tracking-tight text-navy">
                      {item.title}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="relative min-h-[240px] overflow-hidden rounded-[24px] border border-navy/8 bg-pale p-5 sm:rounded-[28px] sm:p-8 lg:min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28 }}
                  className="flex h-full flex-col"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {active.label} · {active.code}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{active.title}</h3>
                  <p className="mt-4 max-w-[40ch] text-[15px] leading-7 text-muted">{active.text}</p>
                  <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                        <span className="relative h-2 w-2 rounded-full bg-accent" />
                      </span>
                      {active.signal}
                    </span>
                    <Link
                      to="/health-os"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
                    >
                      Open in HealthOS
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <p className="text-sm text-muted">Four clinical systems. One intelligent core.</p>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
