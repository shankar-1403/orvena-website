import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Hospital, Plane } from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'
import { useCountUp } from '../hooks/useCountUp'

const regions = [
  {
    id: 'india',
    name: 'India',
    city: 'Mumbai · Delhi · Chennai',
    route: 'Care destination',
    time: 'On ground',
    copy: 'Access leading Indian hospitals and specialists with coordinated treatment planning.',
    hospitals: '50+ hospital partners',
    specialties: ['Cardiac', 'Oncology', 'Orthopedics', 'Transplant'],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    city: 'Dubai · Riyadh · Doha',
    route: 'DXB → BOM',
    time: '3h 15m',
    copy: 'Patients from the Gulf arrive with specialist matching, cost guidance and travel support.',
    hospitals: 'Direct hospital corridors',
    specialties: ['Cardiac', 'Fertility', 'Spine', 'Oncology'],
  },
  {
    id: 'africa',
    name: 'Africa',
    city: 'Nairobi · Lagos · Cairo',
    route: 'NBO → BOM',
    time: '6h 40m',
    copy: 'Guided treatment journeys from East, West and North Africa into India’s specialist network.',
    hospitals: 'End-to-end support',
    specialties: ['Oncology', 'Nephrology', 'Cardiac', 'Ortho'],
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    city: 'Singapore · Jakarta · Bangkok',
    route: 'SIN → BOM',
    time: '5h 20m',
    copy: 'Regional patients connect to Indian centres of excellence without navigating care alone.',
    hospitals: 'Visa and stay assistance',
    specialties: ['Gastro', 'Oncology', 'Neuro', 'Rehab'],
  },
  {
    id: 'international',
    name: 'International',
    city: 'London · New York · Toronto',
    route: 'LHR → BOM',
    time: '9h 10m',
    copy: 'International patients receive second opinions, treatment planning and a dedicated care desk.',
    hospitals: 'Global second opinions',
    specialties: ['Second opinion', 'Surgery', 'Chronic care'],
  },
]

const supports = [
  {
    icon: Plane,
    title: 'Guided arrival',
    text: 'Flights, transfers, airport pickup and hospital coordination handled for you.',
  },
  {
    icon: Hospital,
    title: 'Verified centres',
    text: 'JCI, NABH, NABL and ISO hospitals selected for the right clinical fit.',
  },
  {
    icon: ArrowUpRight,
    title: 'Stay supported',
    text: 'A dedicated desk through treatment, recovery and follow-up at home.',
  },
]

const reasons = [
  {
    title: 'Affordable treatment',
    text: 'Procedures in India typically cost 50–80% less than in the US or UK.',
  },
  {
    title: 'Quality healthcare',
    text: 'Internationally accredited hospitals with world-class infrastructure and skilled doctors.',
  },
  {
    title: 'Advanced technology',
    text: 'Robotics, AI-assisted surgeries and state-of-the-art equipment.',
  },
  {
    title: 'Shorter waiting times',
    text: 'Faster procedures compared with long waiting lists in many Western systems.',
  },
  {
    title: 'English-speaking teams',
    text: 'Most doctors and medical staff speak English, reducing language barriers.',
  },
  {
    title: 'Wide range of treatments',
    text: 'Cardiology, orthopedics, transplants, fertility, oncology and more.',
  },
]

export default function GlobalHealthcare() {
  const [activeId, setActiveId] = useState('middle-east')
  const active = regions.find((region) => region.id === activeId) ?? regions[1]
  const { ref, value } = useCountUp(15)

  return (
    <SectionCard id="global" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Global"
            title="Healthcare Without Borders."
            description="Connect with specialized medical expertise, leading hospitals and personalized treatment support wherever you are. Top specialists. Affordable treatments. Comprehensive care."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 sm:mt-12 lg:mt-14">
          <div className="relative">
            <div className="overflow-hidden rounded-[24px] bg-navy text-white shadow-lift sm:rounded-[36px]">
              <div className="px-5 pb-8 pt-8 sm:px-10 sm:pt-12 lg:px-14 lg:pb-24 lg:pt-14">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mint/70">
                  Route to care
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                      <div className="max-w-xl">
                        <h3 className="text-[28px] font-extrabold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                          {active.name}
                        </h3>
                        <p className="mt-3 text-[14px] leading-7 text-white/65 sm:mt-4 sm:text-[15px]">
                          {active.copy}
                        </p>

                        <p className="mt-5 text-[13px] leading-6 text-white/50 sm:mt-6 sm:text-sm">
                          <span className="text-white/80">{active.city}</span>
                          <span className="mx-2 text-white/25">·</span>
                          {active.hospitals}
                          <span className="mx-2 text-white/25">·</span>
                          {active.time} {active.route}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {active.specialties.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-end gap-8 sm:gap-10 lg:gap-12">
                        <div ref={ref}>
                          <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {Math.round(value)}+
                          </p>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                            Countries reached
                          </p>
                        </div>
                        <div>
                          <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">50+</p>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                            Hospital partners
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <Button href="/services/medical-tourism" variant="light" className="mt-8 w-full sm:mt-10 sm:w-fit">
                  Explore Medical Tourism
                </Button>
              </div>
            </div>

            <div className="mt-4 lg:absolute lg:bottom-0 lg:left-1/2 lg:z-10 lg:mt-0 lg:w-[min(100%,920px)] lg:-translate-x-1/2 lg:translate-y-1/2 lg:px-4">
              <div
                role="tablist"
                aria-label="Care regions"
                className="flex gap-1 overflow-x-auto rounded-full bg-navy p-1.5 shadow-lift ring-1 ring-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {regions.map((region) => {
                  const on = region.id === activeId
                  return (
                    <button
                      key={region.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActiveId(region.id)}
                      className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[12px] font-semibold sm:px-4 sm:text-[13px] lg:flex-1 ${
                        on ? 'text-navy' : 'text-white/65 hover:text-white'
                      }`}
                    >
                      {on ? (
                        <motion.span
                          layoutId="region-pill"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      ) : null}
                      <span className="relative z-10">{region.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {supports.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={0.06 * index}>
                <article className="group h-full rounded-[22px] border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-card sm:rounded-[28px] sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <Reveal key={item.title} delay={0.04 * index}>
              <article className="h-full rounded-[22px] border border-line bg-pale/60 p-5">
                <h3 className="text-[15px] font-semibold tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionCard>
  )
}
