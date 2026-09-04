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

function PatientOSConsole() {
  const [active, setActive] = useState('timeline')

  const visibleEvents = useMemo(() => {
    if (active === 'timeline' || active === 'insights') {
      return active === 'insights' ? events.filter((item) => item.source === 'insights') : events
    }
    return events.filter((item) => item.source === active)
  }, [active])

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-navy shadow-lift">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-white/55">
            PATIENT OS · OV-20491
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Live
        </span>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4" aria-label="Patient OS sources">
          {sources.map((source) => {
            const Icon = source.icon
            const on = active === source.id
            return (
              <button
                key={source.id}
                type="button"
                onClick={() => setActive(source.id)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                  on ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'
                }`}
                aria-pressed={on}
              >
                <Icon className={`h-4 w-4 ${on ? 'text-mint' : 'text-white/35'}`} />
                <span className="whitespace-nowrap">{source.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint/75">
                Patient health journey
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">Unified clinical timeline</h3>
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
                  className="relative rounded-2xl border border-white/8 bg-white/4 p-4 pl-12"
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
              <div key={label} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <p className="text-lg font-semibold tracking-tight">{value}</p>
                <p className="text-[12px] text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <div key={stage.title} className="bg-navy px-4 py-4">
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
    <section id="patient-os" className="relative overflow-hidden bg-midnight py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-18%] h-[280px] w-[280px] rounded-full bg-mint/8 blur-[110px]" />
        <div className="absolute bottom-[-12%] right-[-6%] h-[240px] w-[240px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionHeader
            light
            eyebrow="Patient OS"
            title="Your Entire Medical World. In One Place."
          >
            <p className="text-[16px] leading-8 text-white/65 lg:text-[17px]">
              Bring medical information scattered across reports, prescriptions, consultations
              and diagnostic records into one structured and intelligent health journey.
            </p>
            <Button href="#contact" variant="light" className="mt-6">
              Explore Patient OS
            </Button>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <PatientOSConsole />
        </Reveal>
      </Container>
    </section>
  )
}
