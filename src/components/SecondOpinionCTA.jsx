import { motion, useReducedMotion } from 'framer-motion'
import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

function DocumentVisual() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:ml-auto"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute -right-2 top-6 h-full w-full rounded-[28px] bg-navy/10 sm:-right-4" />
      <div className="relative rounded-[22px] border border-white/60 bg-white p-5 shadow-lift sm:rounded-[28px] sm:p-7">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Medical second opinion
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[10px] font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Confidential
          </span>
        </div>
        <div className="mt-5 space-y-3">
          <div className="h-2.5 w-4/5 rounded-full bg-pale" />
          <div className="h-2.5 w-full rounded-full bg-pale" />
          <div className="h-2.5 w-2/3 rounded-full bg-pale" />
        </div>
        <div className="mt-6 rounded-2xl bg-pale p-4 transition-colors hover:bg-mint-soft">
          <p className="text-[12px] font-medium text-muted">Specialist recommendation</p>
          <p className="mt-1 text-sm font-semibold text-navy">
            Review diagnosis, options and next steps with confidence.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {['Records', 'Imaging', 'Plan'].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-mint-soft px-2 py-3 text-center text-[11px] font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function SecondOpinionCTA() {
  return (
    <SectionCard className="bg-mint-soft py-12 sm:py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-white/70 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-10 lg:gap-14">
          <Reveal>
            <SectionHeader
              eyebrow="Second Opinion"
              title="Before You Make a Major Medical Decision, Get Another Perspective."
              description="Get a trusted expert medical second opinion before you decide. Leading specialists review your diagnosis, treatment plan or surgery — including imaging interpretation — so you can move forward with clarity. Family-first case handling, 24–72 hour reviews, and a path that can help you avoid unnecessary procedures."
            />
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="w-full sm:w-auto">Request a Second Opinion</Button>
              <Button href="tel:+917506543960" variant="secondary" showArrow={false} className="w-full sm:w-auto">
                Talk to an Expert
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DocumentVisual />
          </Reveal>
        </div>
      </Container>
    </SectionCard>
  )
}
