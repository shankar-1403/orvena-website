import {
  HeartHandshake,
  BadgeCheck,
  Receipt,
  Cpu,
  Shield,
  UserRound,
} from 'lucide-react'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'

const benefits = [
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    text: 'Personal assistance throughout your healthcare journey.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Specialists',
    text: 'Connect with experienced medical professionals.',
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    text: 'Clear consultation and treatment guidance.',
  },
  {
    icon: Cpu,
    title: 'Advanced Technology',
    text: 'Modern digital healthcare solutions.',
  },
  {
    icon: Shield,
    title: 'Secure & Confidential',
    text: 'Protect sensitive healthcare information.',
  },
  {
    icon: UserRound,
    title: 'Patient First',
    text: 'Every decision begins with the patient’s needs.',
  },
]

export default function WhyOrvena() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Why Orvena"
            title="More Than Healthcare. A Better Healthcare Experience."
          />
        </Reveal>

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <Reveal key={benefit.title} delay={0.05 * index}>
                <article className="group flex h-full flex-col border-t border-line pt-8 pb-2 lg:pt-10">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="pt-1 text-[12px] font-semibold tracking-[0.2em] text-navy/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[18px] font-semibold tracking-tight text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 max-w-[30ch] text-[14px] leading-7 text-muted">
                    {benefit.text}
                  </p>

                  <span
                    aria-hidden="true"
                    className="mt-7 block h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-12"
                  />
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
