import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { images } from '../data/images'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

const network = [
  {
    id: 'patients',
    title: 'Patients',
    text: 'Clarity before every major medical decision.',
  },
  {
    id: 'doctors',
    title: 'Doctors',
    text: 'Verified specialists across leading disciplines.',
  },
  {
    id: 'hospitals',
    title: 'Hospitals',
    text: 'Coordinated access to centres of excellence.',
  },
  {
    id: 'corporations',
    title: 'Corporations',
    text: 'Workforce wellness designed around real risk.',
  },
  {
    id: 'technology',
    title: 'Technology',
    text: 'Records, intelligence and care in one ecosystem.',
  },
]

export default function About() {
  const [active, setActive] = useState(network[0])

  return (
    <section id="about" className="overflow-hidden bg-[#f7f3ef] py-24 lg:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h2 className="mt-5 font-extrabold leading-[0.92] tracking-[-0.055em] text-navy">
                <span className="block text-[42px] sm:text-[56px] lg:text-[72px]">A Smarter</span>
                <span className="mt-1 block text-[42px] text-teal sm:text-[56px] lg:text-[72px]">
                  Way
                </span>
                <span className="mt-2 block max-w-[10ch] text-[28px] font-semibold leading-[1.15] tracking-[-0.04em] text-navy/80 sm:text-[34px]">
                  to Navigate Healthcare.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[42ch] text-[17px] leading-8 text-muted">
                Orvena is transforming healthcare through an intelligent, connected and
                patient-first ecosystem — bringing patients, providers, hospitals, corporations
                and technology together in one place.
              </p>
              <a
                href="#patient-os"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-navy"
              >
                Discover Orvena
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative min-h-[540px] lg:min-h-[640px]">
              <div className="absolute right-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-[40px]">
                <img
                  src={images.specialistReview}
                  alt="Specialists collaborating across the Orvena network"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={900}
                  height={1100}
                />
                <div className="absolute inset-0 bg-navy/25 mix-blend-multiply" />
              </div>

              <div className="absolute bottom-[8%] left-0 h-[46%] w-[48%] overflow-hidden rounded-[32px] border-[6px] border-[#f7f3ef] shadow-lift">
                <img
                  src={images.patientCare}
                  alt="Patient-centered care"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={640}
                  height={800}
                />
              </div>

              <div className="absolute right-4 top-6 w-[min(100%,220px)] rounded-[24px] border border-white/20 bg-[#071a2b]/80 p-4 text-white backdrop-blur-md sm:right-8 sm:top-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint/80">
                  Connected by
                </p>
                <p className="mt-1 text-lg font-semibold">Orvena</p>
                <ul className="mt-4 space-y-1.5">
                  {network.map((item, index) => {
                    const on = item.id === active.id
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(item)}
                          onFocus={() => setActive(item)}
                          onClick={() => setActive(item)}
                          className={`flex w-full items-center gap-3 rounded-full px-2 py-1.5 text-left text-[13px] transition-colors ${
                            on ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white'
                          }`}
                          aria-pressed={on}
                        >
                          <span className={`text-[10px] tracking-[0.14em] ${on ? 'text-mint' : 'text-white/30'}`}>
                            0{index + 1}
                          </span>
                          {item.title}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="absolute bottom-3 left-[52%] right-2 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur-md sm:left-[50%]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">
                  {active.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-navy">{active.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-20 bg-navy text-white">
        <Container className="py-10 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[18ch] text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[34px]">
              Medical Expertise
              <span className="mx-3 font-light text-mint">+</span>
              Technology
              <span className="mx-3 font-light text-mint">+</span>
              Personalized Care
            </p>
            <p className="max-w-[36ch] text-sm leading-7 text-white/60">
              So people receive the right care, at the right time, with clarity at every step.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}
