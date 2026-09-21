import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { team } from '../data/team'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

export default function Team() {
  return (
    <SectionCard id="team" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Team"
            title="The People Who Connect the Journey."
            description="The Orvena team around every patient — care, review, global journeys and technology."
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={0.04 * index}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-pale/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white hover:shadow-card">
                <div className="relative h-100 overflow-hidden sm:h-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
                  <p className="absolute bottom-10 left-4 right-4 text-[18px] font-semibold tracking-tight text-white">
                    {member.name}
                  </p>
                  <span className="absolute left-4 bottom-3 rounded-full text-[12px] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] bg-[#0B4156] text-white">
                    {member.role}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-6">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[24px] bg-navy px-5 py-5 text-white sm:flex-row sm:items-center sm:px-7">
            <div>
              <p className="text-[15px] font-semibold tracking-tight">Work with the Orvena team.</p>
              <p className="mt-1 text-[13px] text-white/65">
                Care coordination, second opinions, treatment journeys and Patient OS — one desk to start.
              </p>
            </div>
            <Button href="/contact" variant="light" className="w-full shrink-0 sm:w-auto">
              Talk to the team
            </Button>
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
