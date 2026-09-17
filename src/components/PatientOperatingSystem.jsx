import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileStack,
  FlaskConical,
  Pill,
  Scan,
  Stethoscope,
  Clock3,
  Sparkles,
} from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const sources = [
  { id: 'records', label: 'Medical Records', icon: FileStack },
  { id: 'labs', label: 'Lab Reports', icon: FlaskConical },
  { id: 'rx', label: 'Prescriptions', icon: Pill },
  { id: 'imaging', label: 'Imaging', icon: Scan },
  { id: 'consults', label: 'Consultations', icon: Stethoscope },
  { id: 'timeline', label: 'Health Timeline', icon: Clock3 },
  { id: 'insights', label: 'Clinical Insights', icon: Sparkles },
]

const events = [
  { id: 1, source: 'labs', date: '12 Mar', title: 'CBC & metabolic panel', meta: 'Report ready · 24h' },
  { id: 2, source: 'consults', date: '04 Mar', title: 'Cardiology review', meta: 'Second opinion complete' },
  { id: 3, source: 'imaging', date: '21 Feb', title: 'MRI lumbar spine', meta: 'Specialist annotated' },
  { id: 4, source: 'rx', date: '18 Feb', title: 'Medication plan updated', meta: 'Synced to records' },
  { id: 5, source: 'records', date: '09 Feb', title: 'Prior history imported', meta: '12 documents structured' },
  { id: 6, source: 'insights', date: 'Today', title: 'Glucose trend is stable', meta: 'Clinical insight' },
]

const stages = [
  { title: 'Collect', text: 'Raw medical data' },
  { title: 'Organize', text: 'Chronological records' },
  { title: 'Structure', text: 'Clinical information' },
  { title: 'Analyze', text: 'Health trends' },
  { title: 'Understand', text: 'Clear insights' },
]

function HealthOSConsole() {
  const [active, setActive] = useState('timeline')

  const visibleEvents = useMemo(() => {
    if (active === 'timeline' || active === 'insights') {
      return active === 'insights' ? events.filter((item) => item.source === 'insights') : events
    }
    return events.filter((item) => item.source === active)
  }, [active])

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-navy/80 shadow-lift backdrop-blur-sm sm:rounded-[32px]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <p className="truncate text-[11px] font-semibold tracking-[0.14em] text-white/55 sm:text-[12px] sm:tracking-[0.16em]">
            HEALTHOS · OV-20491
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-mint">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Live
        </span>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr]">
        <nav
          className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
          aria-label="HealthOS sources"
        >
          {sources.map((source) => {
            const Icon = source.icon
            const on = active === source.id
            return (
              <button
                key={source.id}
                type="button"
                onClick={() => setActive(source.id)}
                className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                  on ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
                aria-pressed={on}
              >
                {on ? (
                  <motion.span
                    layoutId="os-source"
                    className="absolute inset-0 rounded-2xl bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <Icon className={`relative z-10 h-4 w-4 ${on ? 'text-mint' : 'text-white/35'}`} />
                <span className="relative z-10 whitespace-nowrap">{source.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint/75">
                Patient health journey
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">Unified clinical timeline</h3>
            </div>
            <p className="hidden text-sm text-white/40 sm:block">{visibleEvents.length} records in view</p>
          </div>

          <div className="relative mt-6 space-y-3">
            <span className="absolute bottom-3 left-[19px] top-3 w-px bg-white/10" aria-hidden="true" />
            <AnimatePresence mode="popLayout">
              {visibleEvents.map((event) => (
                <motion.article
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  whileHover={{ y: -2 }}
                  className="relative rounded-2xl border border-white/8 bg-white/4 p-4 pl-12 transition-colors hover:border-white/16 hover:bg-white/8"
                >
                  <span className="absolute left-[14px] top-5 h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{event.title}</p>
                      <p className="mt-1 text-[12px] text-white/50">{event.meta}</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                      {event.date}
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['78%', 'Journey complete'],
              ['12', 'Records structured'],
              ['24–72h', 'Specialist review'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition-colors hover:border-white/16 hover:bg-white/8"
              >
                <p className="text-lg font-semibold tracking-tight">{value}</p>
                <p className="text-[12px] text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px border-t border-white/10 bg-white/10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((stage, index) => (
          <div key={stage.title} className="bg-navy px-4 py-4 transition-colors hover:bg-teal-deep last:col-span-2 sm:last:col-span-1 lg:last:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint/60">
              0{index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold">{stage.title}</p>
            <p className="mt-0.5 text-[12px] text-white/45">{stage.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PatientOperatingSystem() {
  return (
    <SectionCard id="health-os" className="bg-midnight py-12 text-white sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-18%] h-[280px] w-[280px] rounded-full bg-mint/8 blur-[110px]" />
        <div className="absolute bottom-[-12%] right-[-6%] h-[240px] w-[240px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionHeader
            light
            eyebrow="HealthOS"
            title="Your Entire Medical World. In One Place."
          >
            <p className="text-[15px] leading-7 text-white/65 sm:text-[16px] sm:leading-8 lg:text-[17px]">
              Secure data. Smarter care. Simpler healthcare. HealthOS transforms scattered medical
              records into a secure, intelligent timeline - collecting, organizing, structuring and
              analyzing health data so doctors decide faster and patients stay in control.
            </p>
            <Button href="/contact" variant="light" className="mt-6 w-full sm:w-auto">
              Explore HealthOS
            </Button>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <HealthOSConsole />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['24/7 Accessibility', 'Access health records seamlessly, even while traveling.'],
            ['Enhanced Security', 'Encryption, role-based access and privacy-first architecture.'],
            ['Better Care Coordination', 'Share records with doctors instantly for accurate treatment.'],
            ['Time-Saving', 'No more paper files or misplaced reports.'],
            ['Eco-Friendly', 'Go digital and reduce paper for a greener care journey.'],
            ['Dedicated Support', 'Prompt help so the platform stays simple to run.'],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={0.04 * index}>
              <article className="rounded-2xl border border-white/10 bg-white/4 p-5">
                <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/60">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionCard>
  )
}
