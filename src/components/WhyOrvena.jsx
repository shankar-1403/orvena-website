import { BadgeCheck, HeartHandshake, Receipt, Shield } from 'lucide-react'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

// Short supporting band on the home page — the depth lives on /about and /services.
const benefits = [
  {
    icon: Shield,
    title: 'Secure & confidential',
    text: 'Enterprise-grade encryption, consent-led access.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified doctors',
    text: 'Specialists checked for proven clinical expertise.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated support',
    text: 'A real team from first report to follow-up.',
  },
  {
    icon: Receipt,
    title: 'Transparent pricing',
    text: 'Clear fees and upfront estimates. No surprises.',
  },
]

export default function WhyOrvena() {
  return (
    <SectionCard className="bg-soft py-10 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-mint-soft/80 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Why Orvena</Eyebrow>
              <h2 className="mt-2.5 text-[24px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:text-[30px]">
                The care team behind your records.
              </h2>
            </div>
            <p className="max-w-[40ch] text-[13px] leading-6 text-muted">
              HealthOS organizes your data. Orvena stands behind it with verified specialists and
              real support.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal key={benefit.title} delay={0.05 * index}>
                <article className="o-card o-card--rule group h-full rounded-2xl border border-line bg-white p-4 hover:border-accent/30">
                  <span className="o-card-icon inline-flex h-9 w-9 items-center justify-center rounded-xl bg-pale text-accent shadow-card transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-5 text-muted">{benefit.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </SectionCard>
  )
}
