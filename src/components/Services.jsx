import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '../data/services'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'

const ids = new Set(services.map((service) => service.id))

function serviceFromHash() {
  const id = window.location.hash.replace('#', '')
  return ids.has(id) ? id : services[0].id
}

export default function Services() {
  const [activeId, setActiveId] = useState(() =>
    typeof window === 'undefined' ? services[0].id : serviceFromHash()
  )
  const active = services.find((service) => service.id === activeId) ?? services[0]

  useEffect(() => {
    const sync = () => setActiveId(serviceFromHash())
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const select = (id) => {
    setActiveId(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <section id="services" className="bg-pale py-24 lg:py-32">
      {services.map((service) => (
        <div key={service.id} id={service.id} className="h-0 w-0 overflow-hidden" />
      ))}

      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Healthcare Designed Around Your Journey."
            description="From making informed medical decisions to accessing treatment, improving workforce wellness and managing long-term health, Orvena connects every step."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-10">
            <nav
              aria-label="Services"
              className="grid grid-cols-2 gap-2 lg:sticky lg:top-28 lg:grid-cols-1 lg:gap-0"
            >
              {services.map((service) => {
                const on = service.id === activeId
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => select(service.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`rounded-2xl px-4 py-3 text-left transition-colors lg:rounded-none lg:border-l-2 lg:px-5 lg:py-5 ${
                      on
                        ? 'bg-white text-navy shadow-card lg:border-accent lg:bg-transparent lg:shadow-none'
                        : 'text-muted hover:bg-white/70 lg:border-transparent lg:hover:bg-transparent lg:hover:text-navy'
                    }`}
                  >
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
                  </button>
                )
              })}
            </nav>

            <div className="overflow-hidden rounded-[32px] bg-white shadow-card">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative p-7 sm:p-10 lg:p-12">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-0 select-none text-[120px] font-extrabold leading-none text-navy/[0.045] sm:right-8 sm:text-[160px]"
                    >
                      {active.number}
                    </span>

                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
                      {active.name}
                    </p>
                    <h3 className="relative mt-4 max-w-[14ch] text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] text-navy sm:text-[44px]">
                      {active.headline.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="relative mt-5 max-w-[46ch] text-[16px] leading-8 text-muted">
                      {active.description}
                    </p>

                    <ul className="relative mt-7 flex flex-wrap gap-2">
                      {active.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-8 flex flex-wrap items-center gap-4">
                      <Button href={active.href}>{active.cta}</Button>
                      {active.highlight ? (
                        <p className="text-sm font-semibold text-accent">{active.highlight}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="border-t border-line bg-mint-soft px-7 py-5 sm:px-10 lg:px-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      How it works
                    </p>
                    <div className="relative mt-5">
                      <span
                        aria-hidden="true"
                        className="absolute left-1.5 right-8 top-1.5 hidden h-px bg-accent/20 sm:block"
                      />
                      <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {active.steps.map((step, index) => (
                          <li key={step} className="relative">
                            <span className="relative z-[1] flex h-3 w-3 items-center justify-center rounded-full bg-mint-soft">
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
    </section>
  )
}
