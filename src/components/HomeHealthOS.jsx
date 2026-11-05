import {
  Activity,
  CalendarCheck,
  Camera,
  FileText,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'
import StoreButtons from './ui/StoreButtons'
import Vignette from './ui/Vignette'

// Home page overview of HealthOS. Every claim here is a feature of the Orvena Health app
// as listed on Google Play — keep it that way. Full detail lives on /health-os.

const trust = [
  'Your data stays yours',
  'You choose what to share',
  'Encrypted in transit',
  'Zero data selling',
]

const highlights = [
  {
    title: 'Reports in one place',
    text: 'Blood, lab and radiology reports together. Scan paper with your camera or upload a PDF.',
    icon: Camera,
    art: 'scan',
  },
  {
    title: 'iView',
    text: 'Your key readings, trends and anything that needs attention, at a glance.',
    icon: Activity,
    art: 'trend',
  },
  {
    title: 'Smart View summary',
    text: 'A one-page summary of your health to save as a PDF or share with your doctor.',
    icon: FileText,
    art: 'summary',
  },
  {
    title: 'My Doctors',
    text: 'Find doctors, call them, book appointments and keep your favourites together.',
    icon: Stethoscope,
    art: 'doctors',
  },
  {
    title: 'Prescriptions & reminders',
    text: 'Your prescription history with printable copies, and reminders for appointments and follow-ups.',
    icon: CalendarCheck,
    art: 'followup',
  },
]

const steps = [
  ['Upload', 'Scan paper reports with your camera or upload PDFs. Doctors, clinics and labs on Orvena add theirs.'],
  ['Understand', 'iView turns your readings into trends and flags anything that needs attention.'],
  ['Share & act', 'Share a one-page summary with your doctor and stay ahead with reminders.'],
]

export default function HomeHealthOS() {
  return (
    <SectionCard id="healthos-overview" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="HealthOS · Patient Operating System"
            title="Understand your reports. Protect those you love."
            description="Scattered folders become one organized health timeline — test results tracked over time, and readings that need attention flagged."
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/health-os" className="w-full sm:w-auto">
                Explore HealthOS
              </Button>
              <StoreButtons tone="light" className="w-full sm:w-auto" />
            </div>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 sm:mt-10">
          <ul className="flex flex-wrap gap-2">
            {trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-pale/60 px-3.5 py-2 text-[13px] font-semibold tracking-tight text-navy"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={0.04 * index}>
                <article className="o-card o-card--spot o-tint-peach h-full rounded-[22px] border border-accent/20 bg-mint-soft/60 p-3 pb-5 hover:border-accent/35 hover:bg-mint-soft/85">
                  <Vignette name={item.art} />
                  <span className="o-card-icon ml-2 mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 px-2 text-[16px] font-semibold leading-6 tracking-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 px-2 text-[13px] leading-5 text-muted">{item.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.08} className="mt-8 sm:mt-10">
          <ol className="grid gap-3 border-t border-line pt-6 md:grid-cols-3">
            {steps.map(([title, text], index) => (
              <li key={title} className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/30 text-[11px] font-semibold text-accent">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold tracking-tight text-navy">{title}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
