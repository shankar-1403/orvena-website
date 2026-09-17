import { ClipboardList, Share2, UsersRound } from 'lucide-react'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

const principles = [
  {
    code: '01',
    title: 'Trusted expertise',
    text: 'Connecting people with the right medical knowledge and experienced professionals.',
    icon: UsersRound,
  },
  {
    code: '02',
    title: 'Clearer decisions',
    text: 'Turning complex healthcare information into clarity people can act on.',
    icon: ClipboardList,
  },
  {
    code: '03',
    title: 'Seamless coordination',
    text: 'Making interactions across patients, doctors, hospitals, and healthcare services simpler.',
    icon: Share2,
  },
]

const tiles = [
  {
    code: '01',
    title: 'Personalised guidance',
    text: 'Care pathways shaped around individual needs.',
  },
  {
    code: '02',
    title: 'Expert-led decisions',
    text: 'Experience and knowledge at every critical step.',
  },
  {
    code: '03',
    title: 'Simplified healthcare',
    text: 'Reducing complexity across the healthcare journey.',
  },
  {
    code: '04',
    title: 'Trust & transparency',
    text: 'Clear information and processes people can rely on.',
  },
  {
    code: '05',
    title: 'Connected by technology',
    text: 'Digital infrastructure that makes healthcare work seamlessly.',
  },
]

export default function Mission() {
  return (
    <SectionCard id="mission" className="bg-white py-10 sm:py-12 lg:py-14">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-4 select-none text-[88px] font-extrabold leading-none tracking-[-0.08em] text-navy/[0.045] sm:-right-6 sm:top-6 sm:text-[120px] lg:text-[160px]"
      >
        MISSION
      </p>

      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Mission</Eyebrow>
              <h2 className="mt-2.5 text-[26px] font-extrabold leading-[1.1] tracking-[-0.045em] text-navy sm:text-[36px] lg:text-[46px]">
                Making Every Healthcare
                <span className="mt-1 block">
                  Decision <span className="text-accent">Clearer.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-6 text-muted">
              Our mission is to simplify the complexity of healthcare by bringing together trusted
              expertise, relevant information, and seamless coordination-so patients and healthcare
              partners can make informed decisions with greater clarity and confidence.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <article className="relative overflow-hidden rounded-[22px] bg-navy px-5 py-6 text-white sm:rounded-[28px] sm:px-8 sm:py-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 280 220"
                className="pointer-events-none absolute -right-8 -top-6 h-[240px] w-[280px] opacity-25"
              >
                <circle cx="210" cy="48" r="5" fill="#D95F14" />
                <circle cx="248" cy="96" r="3.5" fill="#fff" />
                <circle cx="168" cy="110" r="4" fill="#fff" />
                <circle cx="226" cy="158" r="3" fill="#D95F14" />
                <circle cx="132" cy="54" r="2.5" fill="#fff" />
                <path
                  d="M210 48 L168 110 L248 96 L226 158 L168 110 L132 54 L210 48"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  strokeOpacity="0.55"
                />
              </svg>

              <span
                aria-hidden="true"
                className="block font-serif text-[56px] leading-none text-accent/90"
              >
                “
              </span>
              <blockquote className="-mt-4 max-w-xl text-[16px] font-medium leading-7 tracking-[-0.02em] text-white/95 sm:text-[19px] sm:leading-9">
                To simplify the complexity of healthcare by bringing together{' '}
                <span className="text-accent">trusted expertise</span>,{' '}
                <span className="text-accent">relevant information</span>, and{' '}
                <span className="text-accent">seamless coordination</span>
                —so patients and healthcare partners can make informed decisions with greater
                clarity and confidence.
              </blockquote>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Orvena mission
              </p>
            </article>

            <div className="relative overflow-hidden rounded-[28px] bg-pale p-3 sm:p-4">
              <div className="flex h-full flex-col justify-between gap-2">
                {principles.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.code}
                      className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 rounded-2xl bg-white px-4 py-4 shadow-card"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                            {item.code}
                          </p>
                          <h3 className="text-[16px] font-semibold tracking-tight text-navy">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-[13px] leading-5 text-muted">{item.text}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {tiles.map((item) => (
              <article key={item.code} className="rounded-2xl border border-line bg-pale/60 p-4">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                  {item.code}
                </p>
                <h3 className="mt-2 text-[14px] font-semibold leading-5 tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-5 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
