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
        <Reveal className="mb-12">
          <SectionHeader
            eyebrow="Why Orvena"
            title="More Than Healthcare. A Better Healthcare Experience."
          />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Reveal key={benefit.title} delay={0.05 * index}>
                  <article className="group rounded-[24px] border border-line bg-pale/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/35 hover:bg-white hover:shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal shadow-card transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-navy">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{benefit.text}</p>
                  </article>
                </Reveal>
              )
            })}
        </div>
      </Container>
    </section>
  )
}
