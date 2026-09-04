import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import heroBanner from '../assets/orvena-hero-banner.png'
import Button from './ui/Button'
import Container from './ui/Container'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden text-white">
      <motion.img
        src={heroBanner}
        alt=""
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_42%,rgba(11,65,86,0.45)_0%,rgba(11,65,86,0.78)_55%,rgba(11,65,86,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy/40 via-navy/15 to-transparent"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            Connected care, live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-[16ch] text-[44px] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-[60px] lg:text-[76px]"
        >
          Healthcare,{' '}
          <span className="bg-gradient-to-r from-mint via-accent to-accent-deep bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
            Connected
          </span>{' '}
          Around You.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-6 max-w-[46ch] text-[16px] leading-7 text-white/70 sm:text-[18px] sm:leading-8"
        >
          Expert opinions, treatment journeys, disease reversal and intelligent technology —
          one ecosystem for clearer decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#services" variant="light" className="min-w-[180px]">
            Explore Healthcare
          </Button>
          <Button href="#contact" variant="outline" showArrow={false} className="min-w-[180px]">
            Talk to an Expert
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45"
        >
          <span>Second opinions</span>
          <span className="text-accent/70">✦</span>
          <span>Medical tourism</span>
          <span className="text-accent/70">✦</span>
          <span>Patient OS</span>
          <a
            href="#about"
            className="group ml-1 inline-flex items-center gap-1.5 text-mint normal-case tracking-normal hover:text-white"
          >
            Discover
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
