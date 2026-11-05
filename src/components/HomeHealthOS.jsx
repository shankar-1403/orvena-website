import {
  Activity,
  CalendarCheck,
  FileLock2,
  MessageCircle,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

// Home page overview of HealthOS (content from the HealthOS brief). Full detail lives on /health-os.

const trust = [
  '100% ABDM-compliant',
  'Consent-driven privacy',
  'Biomarker extraction',
  'Zero data selling',
]

const highlights = [
  {
    title: 'Biomarker trendlines',
    text: 'HbA1c, glucose, lipids, creatinine and eGFR pulled from every lab report and charted over time.',
    icon: Activity,
  },
  {
    title: 'WhatsApp & camera intake',
    text: 'Snap a report, send it on WhatsApp, and it lands in your health timeline within minutes.',
    icon: MessageCircle,
  },
  {
    title: 'ABDM lifetime record',
    text: 'Linked to your ABHA ID, with a time-limited summary link to share with any doctor.',
    icon: FileLock2,
  },
  {
    title: 'Family & ParentCare',
    text: 'One place for your spouse, children and parents, with alerts when a parent’s vitals shift.',
    icon: Users,
  },
  {
    title: 'Follow-ups & medicines',
    text: 'Reminders for refills, follow-up visits and repeat tests, with structured prescriptions.',
    icon: CalendarCheck,
  },
]

const steps = [
  ['Upload', 'Send paper reports on WhatsApp, upload PDFs, or let partner labs sync results.'],
  ['Understand', 'Reports are sorted by date and your test results become trend charts.'],
  ['Share & act', 'Show any doctor a clear summary in one tap and stay ahead with reminders.'],
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
            description="Scattered folders become one organized health timeline — test results tracked over time, changing patterns flagged before they become emergencies."
          >
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="/health-os" className="w-full sm:w-auto">
                Explore HealthOS
              </Button>
              <Button
                href="https://wa.me/917506543960"
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Digitize via WhatsApp
              </Button>
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
                <article className="o-card o-card--spot o-tint-peach h-full rounded-[22px] border border-line bg-pale/60 p-5 hover:border-accent/30 hover:bg-white">
                  <span className="o-card-icon flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold leading-6 tracking-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-5 text-muted">{item.text}</p>
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
