import { Clock3, HeartPulse, UserRoundCheck } from 'lucide-react'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

const principles = [
  {
    code: '01',
    title: 'Right care',
    text: 'The treatment that fits the person, not the other way around.',
    icon: HeartPulse,
  },
  {
    code: '02',
    title: 'Right time',
    text: 'Clarity before a decision still has time to change the outcome.',
    icon: Clock3,
  },
  {
    code: '03',
    title: 'Right provider',
    text: 'Human expertise, connected by intelligent technology.',
    icon: UserRoundCheck,
  },
]

export default function Vision() {
  return (
    <SectionCard id="vision" className="bg-white py-10 sm:py-12 lg:py-14">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-6 select-none text-[88px] font-extrabold leading-none tracking-[-0.08em] text-navy/[0.045] sm:text-[120px] lg:text-[160px]"
      >
        CONNECTED
      </p>

      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Vision</Eyebrow>
              <h2 className="mt-2.5 text-[26px] font-extrabold leading-[1.1] tracking-[-0.045em] text-navy sm:text-[36px] lg:text-[46px]">
                The Future of Healthcare
                <span className="mt-1 block">
                  Is <span className="text-accent">Connected.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-[280px] text-[13px] leading-6 text-muted">
              Redefining healthcare through expertise, technology and trust. An intelligent,
              patient-first ecosystem connecting patients, specialists, hospitals and digital health.
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
                To create a globally connected healthcare ecosystem where patients
                receive the{' '}
                <span className="text-accent">right care</span>, at the{' '}
                <span className="text-accent">right time</span>, from the{' '}
                <span className="text-accent">right provider</span> — powered by
                intelligent technology and human expertise.
              </blockquote>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Orvena manifesto
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
            {[
              'Patient-first approach with personalized care',
              'Network of experienced doctors and top hospitals',
              'Integrated digital healthcare platform',
              'Transparent processes and ethical practices',
              'Global reach with local expertise',
            ].map((item, index) => (
              <article key={item} className="rounded-2xl border border-line bg-pale/60 p-4">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 text-[13px] font-semibold leading-5 text-navy">{item}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionCard>
  )
}
