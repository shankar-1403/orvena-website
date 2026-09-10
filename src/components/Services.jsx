import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { services } from '../data/services'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const ids = new Set(services.map((service) => service.id))

export default function Services() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const activeId = ids.has(serviceId) ? serviceId : services[0].id
  const active = services.find((service) => service.id === activeId) ?? services[0]

  const select = (id) => {
    navigate(`/services/${id}`, { replace: true })
  }

  return (
    <SectionCard id="services" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-mint-soft blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Healthcare Designed Around Your Journey."
            description="From second opinions and treatment journeys to workforce wellness, disease reversal and health technology, Orvena connects every step."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 sm:mt-12 lg:mt-14">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-8">
            <nav
              aria-label="Services"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible lg:sticky lg:top-28 lg:grid-cols-1"
            >
              {services.map((service) => {
                const on = service.id === activeId
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => select(service.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`relative min-w-[158px] shrink-0 rounded-2xl px-4 py-3.5 text-left transition-colors md:min-w-0 ${
                      on ? 'text-navy' : 'text-muted hover:text-navy'
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="service-tab"
                        className="absolute inset-0 rounded-2xl bg-pale shadow-card"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10">
                      <span
                        className={`block text-[11px] font-semibold tracking-[0.18em] ${
                          on ? 'text-accent' : 'text-muted/80'
                        }`}
                      >
                        {service.number}
                      </span>
                      <span className="mt-1 block text-[14px] font-semibold leading-snug lg:text-[16px]">
                        {service.name}
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="overflow-hidden rounded-[24px] border border-navy/6 bg-white shadow-card sm:rounded-[32px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative p-5 sm:p-8 lg:p-12">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-0 select-none text-[72px] font-extrabold leading-none text-navy/[0.045] sm:right-8 sm:text-[160px]"
                    >
                      {active.number}
                    </span>

                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
                      {active.name}
                    </p>
                    <h3 className="relative mt-3 max-w-[16ch] text-[26px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:mt-4 sm:max-w-[14ch] sm:text-[36px] lg:text-[44px]">
                      {active.headline.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="relative mt-4 max-w-[46ch] text-[15px] leading-7 text-muted sm:mt-5 sm:text-[16px] sm:leading-8">
                      {active.description}
                    </p>

                    <ul className="relative mt-7 flex flex-wrap gap-2">
                      {active.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full border border-line bg-pale/80 px-3.5 py-1.5 text-[13px] text-ink transition-colors hover:border-accent/40 hover:bg-mint-soft"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {active.audience?.length ? (
                      <div className="relative mt-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                          {active.id === 'medical-tourism' ? 'Top destinations' : 'Who it is for'}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {active.audience.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-navy/8 bg-white px-3 py-1.5 text-[12px] font-medium text-navy"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {active.programs?.length ? (
                      <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                        {active.programs.map((program) => (
                          <article key={program.title} className="rounded-2xl bg-pale/80 p-4">
                            <h4 className="text-[14px] font-semibold tracking-tight text-navy">
                              {program.title}
                            </h4>
                            <p className="mt-1 text-[13px] leading-5 text-muted">{program.text}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}

                    <div className="relative mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      <Button href={active.href} className="w-full sm:w-auto">{active.cta}</Button>
                      {active.highlight ? (
                        <p className="text-sm font-semibold text-accent">{active.highlight}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="border-t border-line bg-mint-soft px-5 py-5 sm:px-10 sm:py-6 lg:px-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      How it works
                    </p>
                    <div className="relative mt-5">
                      <span
                        aria-hidden="true"
                        className="absolute left-5 right-8 top-5 hidden h-px bg-accent/20 sm:block"
                      />
                      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {active.steps.map((step, index) => (
                          <li
                            key={step}
                            className="relative rounded-2xl bg-white/70 px-3 py-3 transition-transform hover:-translate-y-0.5"
                          >
                            <span className="relative z-[1] flex h-3 w-3 items-center justify-center rounded-full bg-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            <p className="mt-3 text-[13px] font-semibold leading-5 text-navy">{step}</p>
                            <p className="mt-0.5 text-[11px] text-muted">0{index + 1}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
