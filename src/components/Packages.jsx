import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { healthPackages, packageCategories } from '../data/packages'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

export default function Packages() {
  const [filter, setFilter] = useState(packageCategories[0])
  const visible = useMemo(
    () => healthPackages.filter((item) => item.category === filter),
    [filter],
  )

  return (
    <SectionCard id="packages" className="bg-white py-12 sm:py-16 lg:py-24">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Check-ups"
            title="Specialized Health Check-up Packages."
            description="Popular tests, full-body checkups, family care and organ-specific packages — booked with the Orvena care team."
          >
            <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible">
              {packageCategories.map((item) => {
                const on = filter === item
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                      on ? 'text-white' : 'text-navy/70 hover:text-navy'
                    }`}
                    aria-pressed={on}
                  >
                    {on ? (
                      <motion.span
                        layoutId="package-filter"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-pale" />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                )
              })}
            </div>
          </SectionHeader>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.id} delay={0.04 * index}>
              <article className="flex h-full flex-col rounded-[24px] border border-line bg-pale/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.audience}
                  </p>
                  {item.off ? (
                    <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {item.off}% off
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-muted">{item.text}</p>
                <div className="mt-4 flex items-end justify-between gap-3 border-t border-navy/8 pt-4">
                  <div>
                    <p className="text-[18px] font-extrabold tracking-tight text-navy">
                      ${item.price.toFixed(2)}
                      <span className="ml-2 text-[13px] font-semibold text-muted line-through">
                        ${item.compareAt.toFixed(2)}
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                      Report in {item.delivery}
                    </p>
                  </div>
                  <Button href="/contact" variant="secondary" className="shrink-0 px-4 py-2 text-[13px]">
                    Book test
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionCard>
  )
}
