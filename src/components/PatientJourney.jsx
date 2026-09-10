import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Stethoscope, ClipboardList, HeartHandshake } from 'lucide-react'
import Container from './ui/Container'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const steps = [
  {
    num: '01',
    title: 'Tell Us What You Need',
    text: 'Share your healthcare requirement.',
    icon: MessageCircle,
    align: 'top',
  },
  {
    num: '02',
    title: 'Find the Right Expert',
    text: 'We connect you with the appropriate specialist or healthcare provider.',
    icon: Stethoscope,
    align: 'bottom',
  },
  {
    num: '03',
    title: 'Build Your Care Plan',
    text: 'Receive personalized guidance based on your needs.',
    icon: ClipboardList,
    align: 'top',
  },
  {
    num: '04',
    title: 'Stay Supported',
    text: 'Continue receiving assistance throughout your journey.',
    icon: HeartHandshake,
    align: 'bottom',
  },
]

export default function PatientJourney() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-24 h-72 w-72 rounded-full bg-mint-soft/70 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Journey"
            title="From Concern to Care. Simplified."
            description="A single guided path — not a maze of appointments, reports and unanswered questions."
          />
        </Reveal>

        <div ref={ref} className="relative mt-10 lg:mt-8">
          <div className="pointer-events-none absolute inset-x-0 top-[42%] hidden h-24 lg:block">
            <svg viewBox="0 0 1100 90" className="h-full w-full" fill="none" aria-hidden="true">
              <path
                d="M40 48 C 180 48, 230 12, 360 48 S 560 84, 700 48 S 860 12, 1060 48"
                stroke="#D4DEE2"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.path
                d="M40 48 C 180 48, 230 12, 360 48 S 560 84, 700 48 S 860 12, 1060 48"
                stroke="#D95F14"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 lg:pt-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.num} delay={0.08 * index} className={step.align === 'bottom' ? 'lg:mt-24' : 'lg:mb-24'}>
                  <article className="group relative rounded-[22px] border border-transparent bg-pale p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:bg-white hover:shadow-card sm:rounded-[28px] sm:p-6">
                    <span className="absolute -top-3 left-6 hidden h-6 w-6 rounded-full border-4 border-white bg-accent lg:block" />
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-accent shadow-card transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[28px] font-extrabold tracking-tight text-navy/15">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </SectionCard>
  )
}
