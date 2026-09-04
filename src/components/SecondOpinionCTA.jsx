import Button from './ui/Button'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'

function DocumentVisual() {
  return (
    <div className="relative w-full max-w-md lg:ml-auto">
      <div className="absolute -right-4 top-6 h-full w-full rounded-[28px] bg-navy/10" />
      <div className="relative rounded-[28px] bg-white p-7 shadow-lift">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Medical second opinion
          </p>
          <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[10px] font-semibold text-accent">
            Confidential
          </span>
        </div>
        <div className="mt-5 space-y-3">
          <div className="h-2.5 w-4/5 rounded-full bg-pale" />
          <div className="h-2.5 w-full rounded-full bg-pale" />
          <div className="h-2.5 w-2/3 rounded-full bg-pale" />
        </div>
        <div className="mt-6 rounded-2xl bg-pale p-4">
          <p className="text-[12px] font-medium text-muted">Specialist recommendation</p>
          <p className="mt-1 text-sm font-semibold text-navy">
            Review diagnosis, options and next steps with confidence.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {['Records', 'Imaging', 'Plan'].map((item) => (
            <div key={item} className="rounded-xl bg-mint-soft px-2 py-3 text-center text-[11px] font-semibold text-navy">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SecondOpinionCTA() {
  return (
    <section className="bg-mint-soft py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="Second Opinion"
              title="Before You Make a Major Medical Decision, Get Another Perspective."
              description="Understand your diagnosis, explore treatment options and make important healthcare decisions with greater confidence."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact">Request a Second Opinion</Button>
              <Button href="tel:+917506543960" variant="secondary" showArrow={false}>
                Talk to an Expert
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DocumentVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
