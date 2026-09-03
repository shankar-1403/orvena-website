import { motion } from 'framer-motion'
import { Activity, FileText, ShieldCheck } from 'lucide-react'
import { images } from '../data/images'
import { useCountUp } from '../hooks/useCountUp'
import Button from './ui/Button'
import Container from './ui/Container'

const heroStats = [
  { value: 25, suffix: 'K+', label: 'Patients Guided' },
  { value: 500, suffix: '+', label: 'Specialists' },
  { value: 50, suffix: '+', label: 'Hospital Partners' },
  { value: 15, suffix: '+', label: 'Countries' },
]

function MiniStat({ value, suffix, label }) {
  const { ref, value: n } = useCountUp(value)
  return (
    <div ref={ref} className="min-w-0">
      <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {Math.round(n)}
        {suffix}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">
        {label}
      </p>
    </div>
  )
}

function OverlayCards() {
  return (
    <div className="relative w-full max-w-[420px] lg:max-w-none">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="glass-dark ml-auto w-[92%] rounded-[24px] p-4 shadow-lift animate-float"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint/15 text-mint">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">Medical Records</p>
              <p className="text-[12px] text-white/50">Updated Today</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.48, duration: 0.7 }}
          className="glass-dark w-[92%] rounded-[24px] p-4 shadow-lift animate-float-delayed"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-mint">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">Expert Opinion</p>
              <p className="text-[12px] text-white/50">Verified Specialist</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="glass-dark rounded-[24px] p-5 shadow-lift animate-float-slow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-mint" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Health Journey
              </p>
            </div>
            <span className="text-sm font-semibold text-mint">78%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="mt-3 text-[12px] text-white/50">Patient OS · records unified</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden text-white">
      <img
        src={images.heroBanner}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
        width={2400}
        height={1400}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041018] via-[#041018]/82 to-[#041018]/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041018] via-transparent to-[#041018]/35" />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-20" />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-12 pt-28 pb-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] font-semibold uppercase tracking-[0.22em] text-mint/85"
          >
            Connected Healthcare • Intelligent Care
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[14ch] text-[40px] font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-[52px] lg:text-[68px]"
          >
            Healthcare,{' '}
            <span className="bg-gradient-to-r from-mint via-accent to-teal bg-clip-text text-transparent">
              Connected
            </span>{' '}
            Around You.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-[42ch] text-[16px] leading-7 text-white/75 sm:text-[18px] sm:leading-8"
          >
            From expert medical opinions to treatment journeys, disease reversal and
            intelligent healthcare technology, Orvena brings trusted expertise,
            personalized support and digital innovation together in one ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#services" variant="light">
              Explore Healthcare
            </Button>
            <Button href="#contact" variant="outline" showArrow={false}>
              Talk to an Expert
            </Button>
          </motion.div>
        </div>

        <OverlayCards />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="col-span-full grid grid-cols-2 gap-6 rounded-[28px] border border-white/15 bg-white/8 px-5 py-6 backdrop-blur-xl sm:grid-cols-4 sm:px-8"
        >
          {heroStats.map((stat) => (
            <MiniStat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
