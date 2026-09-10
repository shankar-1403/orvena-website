import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

export default function ServiceOverview() {
  return (
    <SectionCard id="service-gateway" className="bg-white py-12 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Experience the Best Care for Your Health."
            description="Comprehensive healthcare, verified specialists, and dedicated support for every step of your medical journey."
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={0.05 * index}>
              <article className="group flex h-full flex-col rounded-[24px] border border-line bg-pale/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white hover:shadow-card">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-accent">
                  {service.number}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-navy">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-muted">{service.summary}</p>
                <Link
                  to={`/services/${service.id}`}
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy transition-colors hover:text-accent"
                >
                  Explore Service
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-6">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[24px] bg-navy px-5 py-5 text-white sm:flex-row sm:items-center sm:px-7">
            <div>
              <p className="text-[15px] font-semibold tracking-tight">
                Transforming healthcare with compassion, innovation and global expertise.
              </p>
              <p className="mt-1 text-[13px] text-white/65">
                Advanced medical care, preventive strategies and technology-driven solutions in one place.
              </p>
            </div>
            <Button href="/services" variant="light" className="w-full shrink-0 sm:w-auto">
              Explore All Services
            </Button>
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
