import {
  HeartHandshake,
  BadgeCheck,
  Receipt,
  Cpu,
  Shield,
  UserRound,
} from 'lucide-react'
import { images } from '../data/images'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const benefits = [
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    text: 'Our team assists you at every step — from selecting the right doctor to managing appointments, medical reports and follow-up care.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Doctors',
    text: 'Consult only with carefully verified doctors and specialists with proven clinical expertise, ensuring reliable advice every time.',
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    text: 'No hidden charges. Get clear consultation fees and upfront cost estimates for procedures, surgeries and health packages.',
  },
  {
    icon: Cpu,
    title: 'Advanced Healthcare Technology',
    text: 'Powered by smart digital platforms including HMIS, Lab Management (LIS) and Fraud Audit Monitoring for seamless care.',
  },
  {
    icon: Shield,
    title: 'Secure & Confidential',
    text: 'Your sensitive medical data and health records are protected with enterprise-grade encryption and strict privacy protocols.',
  },
]

const featured = {
  icon: UserRound,
  title: 'Patient First',
  text: 'Every decision begins with the patient’s needs.',
  number: '06',
  image: images.patientCare,
}

export default function WhyOrvena() {
  const FeaturedIcon = featured.icon

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-mint-soft/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-pale blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Why Orvena"
            title="Exclusive Benefits with Orvena."
          >
            <p className="text-[15px] leading-7 text-muted sm:text-[16px] sm:leading-8 lg:pb-2">
              Choosing the right healthcare partner matters. We go beyond connecting you with doctors — providing a complete, trusted and technology-driven experience designed around your comfort, convenience and well-being.
            </p>
          </SectionHeader>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:grid-rows-3">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <article className="group relative flex h-full min-h-[168px] flex-col justify-between overflow-hidden rounded-[20px] bg-navy p-5 text-white shadow-lift sm:min-h-[200px] sm:rounded-[24px] sm:p-6">
              <img
                src={featured.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/78 to-navy/35"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"
              />
              <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-25" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-1 z-10 select-none text-[96px] font-extrabold leading-none text-white/[0.12]"
              >
                {featured.number}
              </span>

              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <FeaturedIcon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mint backdrop-blur-sm">
                  Our principle
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="text-[24px] font-extrabold tracking-[-0.04em] sm:text-[28px]">
                  {featured.title}
                </h3>
                <p className="mt-1.5 max-w-[34ch] text-[14px] leading-6 text-white/80">
                  {featured.text}
                </p>
              </div>
            </article>
          </Reveal>

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <Reveal key={benefit.title} delay={0.04 * (index + 1)}>
                <article className="group flex h-full flex-col rounded-[24px] border border-line bg-pale/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white hover:shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-card transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-navy/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-6 text-muted">
                    {benefit.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </SectionCard>
  )
}
