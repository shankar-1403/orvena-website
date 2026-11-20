import {
  Apple,
  Briefcase,
  Eye,
  FileText,
  FlaskConical,
  HeartHandshake,
  Lock,
  Network,
  Radar,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ClipboardList, HeartPulse, Pill, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand, Section } from '../components/site/blocks'
import { NumbersBand } from '../components/site/HomeSections'
import PageHero from '../components/site/PageHero'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { usePageMeta } from '../hooks/usePageMeta'

// About Orvena. Content comes from the Orvena company profile.
// Sections: who we are, what we bring together, numbers, mission and vision,
// our approach, why Orvena, the team, and a closing call.

/** The five things Orvena connects, placed around the mark in the hero. */
const ecosystem = [
  { icon: Users, label: 'Patients' },
  { icon: Stethoscope, label: 'Doctors' },
  { icon: FileText, label: 'Medical records' },
  { icon: FlaskConical, label: 'Diagnostics' },
  { icon: Apple, label: 'Nutrition' },
]

const offerings = [
  { icon: Smartphone, title: 'HealthOS', text: 'For patients and families', href: '/healthos', link: 'Explore HealthOS', head: 'from-[#0E4A62] to-navy' },
  { icon: Stethoscope, title: 'ClinicOS', text: 'For doctors and clinics', href: '/clinicos', link: 'Explore ClinicOS', head: 'from-[#2a7f96] to-teal' },
  { icon: Apple, title: 'Disease Reversal', text: 'Nutritionist-guided programs', href: '/disease-reversal', link: 'Explore programs', head: 'from-[#f08a3c] to-accent' },
  { icon: Briefcase, title: 'Corporate Wellness', text: 'For organizations and teams', href: '/contact', link: 'Talk to us', head: 'from-teal to-midnight' },
]

// Colors for the plate cards: icon chip, top edge and the faint watermark icon.
const plateTones = {
  navy: { chip: 'bg-navy text-white', edge: 'from-navy to-teal', mark: 'text-navy' },
  teal: { chip: 'bg-teal text-white', edge: 'from-teal to-[#2a7f96]', mark: 'text-teal' },
  accent: { chip: 'bg-accent text-white', edge: 'from-accent to-[#f08a3c]', mark: 'text-accent' },
}

const numbers = [
  { value: '100K+', label: 'Users across HealthOS and ClinicOS' },
  { value: '10,000+', label: 'Patients helped through Disease Reversal' },
  { value: '2 hours', label: 'To turn a blood report into readings' },
  { value: '100+', label: 'Doctors on the Orvena network' },
]

const approach = [
  {
    icon: FileText,
    title: 'Access',
    text: 'Every report, read and filed for you: blood tests, X-rays, ECGs and scans in one vault, on your phone.',
  },
  {
    icon: Radar,
    title: 'Predict',
    text: 'See what is in range, what changed since last time and what needs attention.',
  },
  {
    icon: ShieldCheck,
    title: 'Protect',
    text: 'Catch early warning signs before they turn into medical emergencies.',
  },
]

const reasons = [
  { icon: Network, tone: 'navy', title: 'Connected by design', text: 'One health record, so nothing is lost between you, your doctor and your care team.' },
  { icon: Users, tone: 'accent', title: 'Built for families', text: 'Parents, children and grandparents each get their own profile under one login.' },
  { icon: Stethoscope, tone: 'teal', title: 'Guided by doctors', text: 'Every change to your medicines is made by a doctor, never by an app.' },
  { icon: Lock, tone: 'navy', title: 'Your records stay yours', text: 'Each profile sees only its own records, and you choose who sees your summary.' },
]

// Placeholder team. Replace with real names, roles and photos when the content is ready.
const team = [
  { name: 'Team Member', role: 'Role' },
  { name: 'Team Member', role: 'Role' },
  { name: 'Team Member', role: 'Role' },
  { name: 'Team Member', role: 'Role' },
]

/**
 * Hero visual: the Orvena mark at the centre, with the five things it connects on a slowly
 * turning orbit. Light travels along the spokes into the centre. Still for reduced motion.
 */
function EcosystemOrbit() {
  const reduce = useReducedMotion()
  const nodes = ecosystem.map((n, i) => {
    const angle = (i / ecosystem.length) * 2 * Math.PI - Math.PI / 2
    return { ...n, x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) }
  })
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      role="img"
      aria-label="Orvena connects patients, doctors, medical records, diagnostics and nutrition"
    >
      <span aria-hidden="true" className="absolute inset-[12%] rounded-full border border-white/12" />
      <span aria-hidden="true" className="absolute inset-[2%] rounded-full border border-white/[0.05]" />
      <span aria-hidden="true" className="absolute inset-[30%] rounded-full bg-mint/10 blur-2xl" />

      <div aria-hidden="true" className={`absolute inset-0 ${reduce ? '' : 'o-orbit'}`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {nodes.map((n, i) => (
            <g key={n.label}>
              <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.3" />
              <line x1={n.x} y1={n.y} x2="50" y2="50" stroke="#f08a3c" strokeWidth="0.5" strokeLinecap="round" className={reduce ? 'opacity-0' : 'o-spoke'} style={{ animationDelay: `${i * 0.64}s` }} />
            </g>
          ))}
        </svg>
        {nodes.map(({ icon: Icon, label, x, y }) => (
          <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className={`flex flex-col items-center gap-1.5 ${reduce ? '' : 'o-orbit-counter'}`}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-navy shadow-[0_14px_28px_-14px_rgba(0,0,0,0.6)] sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="whitespace-nowrap rounded-full bg-midnight/60 px-2.5 py-0.5 text-[11px] font-semibold text-white/85 ring-1 ring-white/15 backdrop-blur sm:text-[12px]">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-[35%] grid place-items-center rounded-full bg-gradient-to-br from-white/16 to-white/[0.03] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/20 backdrop-blur-sm">
        {reduce ? null : <span aria-hidden="true" className="o-core-pulse absolute inset-0 rounded-full ring-1 ring-mint/50" />}
        <span
          aria-hidden="true"
          className="h-[52%] w-[52%] bg-white [mask-image:url(/orvena-mark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        />
      </div>
    </div>
  )
}

/** Scattered pieces of someone's health that settle into one record when the section comes into view. */
const pieces = [
  { icon: HeartPulse, title: 'Blood report', meta: 'PDF · 12 values', from: { x: -70, y: -40, rotate: -9 } },
  { icon: Pill, title: 'Prescription', meta: 'Dr. visit · 3 medicines', from: { x: 80, y: -70, rotate: 8 } },
  { icon: ScanLine, title: 'Chest X-ray', meta: 'Image · Radiology', from: { x: -90, y: 30, rotate: 6 } },
  { icon: ClipboardList, title: 'BP readings', meta: 'Home monitor · 14 days', from: { x: 70, y: 50, rotate: -7 } },
  { icon: Apple, title: 'Diet plan', meta: 'Nutritionist · weekly', from: { x: -20, y: 90, rotate: 10 } },
]

function ConnectedRecord() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto w-full max-w-[440px] py-6">
      <div aria-hidden="true" className="absolute inset-x-6 inset-y-0 rounded-[32px] bg-gradient-to-b from-pale to-soft" />
      <motion.div
        initial={reduce ? false : 'scattered'}
        whileInView="joined"
        viewport={{ once: true, margin: '-120px' }}
        className="relative mx-auto w-[88%] rounded-[24px] bg-white p-4 shadow-[0_30px_60px_-30px_rgba(11,65,86,0.45)] ring-1 ring-line sm:p-5"
      >
        <motion.div
          variants={{ scattered: { opacity: 0 }, joined: { opacity: 1, transition: { delay: 0.9, duration: 0.5 } } }}
          className="mb-3 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 bg-navy [mask-image:url(/orvena-mark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]" aria-hidden="true" />
            <span className="text-[14px] font-bold text-navy">One health record</span>
          </span>
          <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">Connected</span>
        </motion.div>
        <ul className="space-y-2">
          {pieces.map(({ icon: Icon, title, meta, from }, i) => (
            <motion.li
              key={title}
              variants={{
                scattered: { ...from, opacity: 0.0 },
                joined: { x: 0, y: 0, rotate: 0, opacity: 1, transition: { delay: 0.08 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-pale/70 px-3 py-2.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-teal ring-1 ring-line">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-navy">{title}</span>
                <span className="block text-[11.5px] text-muted">{meta}</span>
              </span>
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1F8A4C]" />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  usePageMeta(
    'About Orvena | Healthcare That Works Together',
    'Orvena is an integrated digital healthcare ecosystem bringing patients, doctors, medical records, diagnostics and nutrition together on one connected platform.',
  )

  return (
    <>
      <PageHero
        id="about"
        eyebrow="About Orvena"
        title={
          <>
            Healthcare that <span className="text-accent">works together.</span>
          </>
        }
        lead="Orvena is an integrated digital healthcare ecosystem designed to simplify the way people manage healthcare. It brings patients, doctors, medical records, diagnostics and nutrition together on a single connected platform."
        actions={
          <Button href="/contact" variant="light" className="w-full sm:w-auto">
            Talk to Us
          </Button>
        }
        visual={<EcosystemOrbit />}
      />

      {/* Who we are: scattered pieces of health settle into one record */}
      <Section id="who-we-are">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader eyebrow="Who we are" title="Moving beyond fragmented health records." />
            <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-muted sm:text-[16px] sm:leading-8">
              Reports in one folder, prescriptions in another, readings on a phone, and a doctor who sees none of it. Orvena
              connects every part of care into one record, making healthcare more accessible, organized and data-driven
              for patients, families and the doctors who look after them.
            </p>
          </Reveal>
          <ConnectedRecord />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {offerings.map(({ icon: Icon, title, text, href, link, head }, i) => (
            <Reveal key={title} delay={0.06 * i} className="h-full">
              <Link
                to={href}
                className="o-plate group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white transition-transform duration-300 hover:-translate-y-1 sm:rounded-[28px]"
              >
                <span className={`relative block overflow-hidden bg-gradient-to-br ${head} px-5 pb-6 pt-5 text-white`}>
                  <span aria-hidden="true" className="bg-dot-grid-light absolute inset-0 opacity-30" />
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1}
                    className="absolute -bottom-7 -right-5 h-28 w-28 text-white/[0.12] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="relative mt-6 block text-[19px] font-extrabold tracking-tight">{title}</span>
                </span>
                <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <span className="text-[14px] leading-6 text-muted">{text}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-navy transition-colors group-hover:text-accent">
                    {link}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="numbers" tone="soft">
        <Reveal>
          <SectionHeader eyebrow="Orvena in numbers" title="Trusted by patients, doctors and families." />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <NumbersBand items={numbers} />
        </div>
      </Section>

      {/* Mission and vision: two facing statements */}
      <Section id="mission">
        <Reveal>
          <SectionHeader eyebrow="Why we exist" title="Our mission and vision." />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">
          {[
            {
              icon: Target,
              label: 'Our mission',
              text: 'To empower individuals with better access to their health information, while enabling healthcare professionals to make more informed decisions and deliver efficient patient care.',
              dark: true,
            },
            {
              icon: Eye,
              label: 'Our vision',
              text: 'A future where healthcare is not just about treating illness, but about understanding, monitoring and improving health proactively.',
            },
          ].map(({ icon: Icon, label, text, dark }, i) => (
            <Reveal key={label} delay={0.08 * i} className="h-full">
              <article
                className={`relative h-full overflow-hidden rounded-[26px] p-7 sm:p-9 ${
                  dark ? 'bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight text-white' : 'o-plate border border-white/80 bg-white text-navy'
                }`}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className={`pointer-events-none absolute -right-6 -top-6 h-40 w-40 ${dark ? 'text-white/[0.06]' : 'text-navy/[0.05]'}`}
                />
                <span className={`relative grid h-11 w-11 place-items-center rounded-2xl ${dark ? 'bg-white/12 text-mint' : 'bg-accent/10 text-accent'}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className={`relative mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-mint' : 'text-accent'}`}>{label}</p>
                <p className="relative mt-3 text-[19px] font-semibold leading-[1.5] tracking-[-0.01em] sm:text-[22px]">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Approach: a real sequence, so it is numbered */}
      <Section id="approach" tone="soft">
        <Reveal>
          <SectionHeader
            eyebrow="Our approach"
            title={
              <>
                Access. Predict. <span className="text-accent">Protect.</span>
              </>
            }
            description="Don’t find out too late. Find out in time. Orvena brings your reports, readings, doctors and treatment together in one connected health record."
          />
        </Reveal>
        <ol className="relative mt-8 grid gap-3 sm:mt-10 md:grid-cols-3">
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[16%] right-[16%] top-[47px] hidden h-[2px] origin-left bg-gradient-to-r from-navy via-teal to-accent md:block"
          />
          {approach.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative h-full">
              <Reveal delay={0.25 + 0.3 * i} className="h-full">
                <div className="o-plate group relative h-full overflow-hidden rounded-[24px] border border-white/80 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:rounded-[28px] sm:p-7">
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${['from-navy to-teal', 'from-teal to-[#2a7f96]', 'from-accent to-[#f08a3c]'][i]}`} />
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.1}
                    className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 opacity-[0.06] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${['text-navy', 'text-teal', 'text-accent'][i]}`}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white ring-[6px] ring-soft ${['bg-navy', 'bg-teal', 'bg-accent'][i]}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-[40px] font-extrabold leading-none tracking-[-0.05em] text-navy/[0.07]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="relative mt-5 text-[22px] font-extrabold tracking-tight text-navy">{title}</h3>
                  <p className="relative mt-2 text-[14.5px] leading-6 text-muted">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why-orvena">
        <Reveal>
          <SectionHeader eyebrow="Why Orvena" title="One ecosystem. Better care for everyone." />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, tone, title, text }, i) => {
            const t = plateTones[tone]
            return (
              <Reveal key={title} delay={0.06 * i} className="h-full">
                <article className="o-plate group relative h-full overflow-hidden rounded-[24px] border border-white/80 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:rounded-[28px]">
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.edge}`} />
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.1}
                    className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 opacity-[0.06] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${t.mark}`}
                  />
                  <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${t.chip} shadow-[0_10px_22px_-12px_rgba(11,65,86,0.6)]`}>
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 text-[18px] font-bold tracking-tight text-navy">{title}</h3>
                  <p className="relative mt-2 text-[14px] leading-6 text-muted">{text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Team: placeholders until the real content arrives */}
      <Section id="team" tone="soft">
        <Reveal>
          <SectionHeader
            eyebrow="Our team"
            title="The people behind Orvena."
            description="Clinicians, technologists and nutritionists working together on one connected health record."
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={i} delay={0.05 * i} className="h-full">
              <article className="o-plate group h-full overflow-hidden rounded-[24px] border border-white/80 bg-white">
                <div className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-gradient-to-br from-pale to-soft">
                  <span aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-50" />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[20%] -right-[20%] h-[80%] w-[80%] rotate-[-14deg] bg-navy/[0.05] transition-transform duration-700 [mask-image:url(/orvena-mark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] group-hover:rotate-0 group-hover:scale-110"
                  />
                  <HeartHandshake className="relative h-10 w-10 text-navy/20" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[16px] font-bold tracking-tight text-navy">{m.name}</p>
                  <p className="text-[13px] text-muted">{m.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Let’s Talk About Better Healthcare" text="Questions about Orvena, partnerships or programs? Our team is here to help.">
        <Button href="/contact" className="w-full sm:w-auto">
          Contact Us
        </Button>
      </CtaBand>
    </>
  )
}
