import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Clock3, Hospital, MapPin, Plane } from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'
import { useCountUp } from '../hooks/useCountUp'

const regions = [
  {
    id: 'india',
    name: 'India',
    x: 258,
    y: 198,
    hub: true,
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
    x: 214,
    y: 176,
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
    x: 176,
    y: 214,
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
    x: 292,
    y: 208,
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
    x: 118,
    y: 158,
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
    text: 'Flights, transfers and hospital coordination handled for you.',
  },
  {
    icon: Hospital,
    title: 'Verified centres',
    text: 'Specialists and hospitals selected for the right clinical fit.',
  },
  {
    icon: ArrowUpRight,
    title: 'Stay supported',
    text: 'A dedicated desk through treatment, recovery and follow-up.',
  },
]

function Globe({ active }) {
  const clipId = `globe-${useId().replaceAll(':', '')}`
  const hub = regions[0]
  const origin = active.hub ? null : active

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#1a3348_0%,#071a2b_52%,#041018_100%)]" />
      <div
        className="absolute inset-[10%] rounded-full"
        style={{
          boxShadow:
            'inset -36px -24px 60px rgba(0,0,0,0.45), inset 16px 12px 28px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      />
      <div className="absolute inset-0 rounded-full border border-white/8" />
      <div className="globe-orbit absolute inset-[4%] rounded-full border border-dashed border-white/12" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <circle cx="200" cy="200" r="152" />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {[-70, -35, 0, 35, 70].map((offset) => (
            <ellipse
              key={`m-${offset}`}
              cx={200 + offset * 0.5}
              cy="200"
              rx={Math.max(22, 152 - Math.abs(offset) * 0.82)}
              ry="152"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.8"
            />
          ))}
          {[-50, 0, 50].map((offset) => (
            <ellipse
              key={`l-${offset}`}
              cx="200"
              cy={200 + offset}
              rx="152"
              ry={Math.max(18, 48 - Math.abs(offset) * 0.22)}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {origin ? (
          <path
            d={`M${origin.x} ${origin.y} Q ${(origin.x + hub.x) / 2} ${Math.min(origin.y, hub.y) - 46} ${hub.x} ${hub.y}`}
            fill="none"
            stroke="#EA580C"
            strokeWidth="1.8"
            className="arc-flow"
          />
        ) : null}

        <circle cx={hub.x} cy={hub.y} r="18" fill="none" stroke="#EA580C" strokeWidth="1" className="animate-pulse-ring" />
        <circle cx={hub.x} cy={hub.y} r="5.5" fill="#FB923C" />

        {origin ? (
          <>
            <circle cx={origin.x} cy={origin.y} r="11" fill="rgba(234,88,12,0.22)" />
            <circle cx={origin.x} cy={origin.y} r="4.5" fill="#EA580C" />
          </>
        ) : null}
      </svg>

      <div className="pointer-events-none absolute left-[59%] top-[46%] -translate-y-1/2 rounded-full bg-navy/80 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
        INDIA
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.28 }}
          className="absolute right-[6%] top-[16%] rounded-full border border-white/12 bg-navy/70 px-3.5 py-1.5 text-[12px] font-semibold text-mint backdrop-blur-md"
        >
          {active.time}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function GlobalHealthcare() {
  const [activeId, setActiveId] = useState('middle-east')
  const active = regions.find((region) => region.id === activeId) ?? regions[1]
  const { ref, value } = useCountUp(15)

  return (
    <section id="global" className="bg-[#f7f3ef] py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Global"
            title="Healthcare Without Borders."
            description="Connect with specialized medical expertise, leading hospitals and personalized treatment support wherever you are."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="relative">
            <div className="overflow-hidden rounded-[36px] bg-navy text-white shadow-lift">
              <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14 lg:pr-6">
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
                    >
                      <h3 className="mt-4 text-[40px] font-extrabold tracking-[-0.04em] sm:text-5xl">
                        {active.name}
                      </h3>
                      <p className="mt-4 max-w-[36ch] text-[15px] leading-7 text-white/65">
                        {active.copy}
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 p-4">
                          <MapPin className="h-4 w-4 text-mint" />
                          <p className="mt-3 text-sm font-semibold leading-6">{active.city}</p>
                          <p className="mt-1 text-[12px] text-white/45">{active.hospitals}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 p-4">
                          <Clock3 className="h-4 w-4 text-mint" />
                          <p className="mt-3 text-sm font-semibold">{active.time}</p>
                          <p className="mt-1 text-[12px] text-white/45">{active.route}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {active.specialties.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-medium text-white/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-10 flex flex-wrap items-end gap-10">
                    <div ref={ref}>
                      <p className="text-4xl font-extrabold tracking-tight">{Math.round(value)}+</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Countries reached
                      </p>
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold tracking-tight">50+</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Hospital partners
                      </p>
                    </div>
                  </div>

                  <Button href="#medical-tourism" variant="light" className="mt-8 w-fit">
                    Explore Medical Tourism
                  </Button>
                </div>

                <div className="relative flex items-center justify-center px-6 pb-24 pt-4 lg:min-h-[560px] lg:px-8 lg:pb-28 lg:pt-8">
                  <Globe active={active} />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 z-10 w-[min(100%,920px)] -translate-x-1/2 translate-y-1/2 px-4">
              <div
                role="tablist"
                aria-label="Care regions"
                className="flex gap-1 overflow-x-auto rounded-full bg-navy p-1.5 shadow-lift ring-1 ring-white/10 no-scrollbar"
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
                      className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors sm:flex-1 ${
                        on
                          ? 'bg-white text-navy'
                          : 'text-white/65 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      {region.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:mt-20">
          {supports.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={0.06 * index}>
                <article className="h-full rounded-[28px] border border-line bg-white p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint-soft text-teal">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
