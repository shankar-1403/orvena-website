import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CtaBand, Section } from '../components/site/blocks'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import SectionCard from '../components/ui/SectionCard'
import SectionHeader from '../components/ui/SectionHeader'
import { approach, badges, connected, features, programs, steps } from '../data/diseaseReversal'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Disease Reversal page.
 * A light, clinical treatment built around one
 * idea: a glucose trace that settles into the healthy range as food does its work.
 */

const EASE = [0.22, 1, 0.36, 1]

/* ---------- the signature: a CGM trace that settles ---------- */

// The chart's frame: 0..320 wide, 0..170 tall, glucose 50..250 mg/dL.
const W = 320
const H = 170
const yOf = (mg) => H - ((mg - 50) / 200) * H

// One day sampled every hour. Meals at 8, 13 and 20 o'clock.
function trace(base, spike) {
  const meals = [8, 13, 20]
  return Array.from({ length: 25 }, (_, h) => {
    const lift = meals.reduce((sum, m) => {
      const d = h - m
      return sum + (d >= 0 && d <= 3 ? spike * Math.exp(-((d - 1) ** 2) / 1.1) : 0)
    }, 0)
    const wobble = Math.sin(h * 1.7) * (spike > 60 ? 9 : 3)
    return base + lift + wobble
  })
}

const BEFORE = trace(128, 92)
const AFTER = trace(98, 26)
const toPath = (vals) =>
  vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${((i / 24) * W).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ')
const inRange = (vals) => Math.round((vals.filter((v) => v >= 70 && v <= 140).length / vals.length) * 100)
const peak = (vals) => Math.round(Math.max(...vals))

const STATES = [
  { key: 'before', label: 'Day 1', vals: BEFORE, tone: '#d95f14' },
  { key: 'after', label: 'Day 90', vals: AFTER, tone: '#136074' },
]

function GlucoseCard() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [i, setI] = useState(reduceMotion ? 1 : 0)

  useEffect(() => {
    if (reduceMotion || !inView) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % 2), 3200)
    return () => clearInterval(id)
  }, [reduceMotion, inView])

  const state = STATES[i]

  return (
    <div ref={ref} className="o-plate rounded-[26px] border border-white/70 bg-white p-5 sm:rounded-[30px] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Continuous glucose, one day
          </p>
          <p className="mt-1 text-[15px] font-bold text-navy">mg/dL across 24 hours</p>
        </div>
        <div role="tablist" aria-label="Compare days" className="flex rounded-full bg-pale p-1">
          {STATES.map((s, n) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                n === i ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 -6 ${W} ${H + 24}`} className="mt-5 w-full" role="img" aria-label={`Glucose trace on ${state.label}`}>
        {/* healthy band, 70 to 140 */}
        <rect x="0" y={yOf(140)} width={W} height={yOf(70) - yOf(140)} rx="8" fill="#1F8A4C" opacity="0.09" />
        <line x1="0" x2={W} y1={yOf(140)} y2={yOf(140)} stroke="#1F8A4C" strokeOpacity="0.35" strokeDasharray="3 4" />
        <line x1="0" x2={W} y1={yOf(70)} y2={yOf(70)} stroke="#1F8A4C" strokeOpacity="0.35" strokeDasharray="3 4" />
        <text x={W - 4} y={yOf(70) - 5} textAnchor="end" fontSize="9" fill="#1F8A4C" fontWeight="600">
          Healthy range 70 to 140
        </text>
        {[180, 220].map((mg) => (
          <g key={mg}>
            <line x1="0" x2={W} y1={yOf(mg)} y2={yOf(mg)} stroke="#d4dee2" strokeOpacity="0.7" />
            <text x="2" y={yOf(mg) - 4} fontSize="8.5" fill="#5c6e75">{mg}</text>
          </g>
        ))}
        {/* meal markers */}
        {[
          [8, 'Breakfast'],
          [13, 'Lunch'],
          [20, 'Dinner'],
        ].map(([h, l]) => (
          <text key={l} x={(h / 24) * W} y={H + 16} textAnchor="middle" fontSize="8.5" fill="#5c6e75">
            {l}
          </text>
        ))}
        <motion.path
          d={toPath(state.vals)}
          initial={false}
          animate={{ d: toPath(state.vals), stroke: state.tone }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE }}
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ['Time in healthy range', `${inRange(state.vals)}%`],
          ['Highest reading', `${peak(state.vals)} mg/dL`],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-pale px-4 py-3">
            <p className="text-[11px] text-muted">{l}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={v}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[20px] font-extrabold tracking-tight text-navy"
              >
                {v}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted">
        Illustration of a typical CGM trace. Results vary from person to person.
      </p>
    </div>
  )
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <SectionCard id="disease-reversal" className="bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_10%,rgba(232,120,58,0.12)_0%,rgba(255,255,255,0)_60%),radial-gradient(ellipse_60%_60%_at_5%_90%,rgba(19,96,116,0.10)_0%,rgba(255,255,255,0)_60%)]"
      />
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <Reveal>
            <Eyebrow>Nutritionist-guided disease reversal</Eyebrow>
            <h1 className="mt-5 text-[32px] font-extrabold leading-[1.06] tracking-[-0.045em] text-navy sm:text-[44px] lg:text-[48px] xl:text-[54px]">
              Treat the Root Cause. Transform Your{' '}
              <span className="text-accent">Metabolic Health with Food as Medicine.</span>
            </h1>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-muted sm:text-[17px] sm:leading-8">
              A personalized, science-backed nutrition and lifestyle program to reverse lifestyle
              diseases such as Type 2 diabetes, high BP, cholesterol, overweight and obesity, and
              fatty liver, guided 1-on-1 by expert clinical nutritionists.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Button href="/contact?topic=reversal" className="w-full sm:w-auto">
                Start Your Health Journey
              </Button>
              <Button href="#programs" variant="secondary" showArrow={false} className="w-full sm:w-auto">
                See Programs
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {badges.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-[12px] font-medium text-navy"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <GlucoseCard />
          </Reveal>
        </div>
      </Container>
    </SectionCard>
  )
}

/* ---------- why ---------- */

const drivers = ['Insulin resistance', 'Chronic inflammation', 'Metabolic overload']

function Why() {
  return (
    <Section id="who-for" tone="soft">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <Reveal>
          <Eyebrow>Who it is for</Eyebrow>
          <h2 className="mt-4 text-[26px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:text-[34px] lg:text-[42px]">
            Why Choose a Nutritionist-Guided Reversal Program?
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[15px] leading-7 text-muted sm:text-[16px] sm:leading-8">
            Most chronic lifestyle conditions are driven by insulin resistance, chronic inflammation
            and metabolic overload. Rather than relying solely on lifelong symptom management, our
            clinical nutritionists address the daily dietary and lifestyle triggers behind your
            condition.
          </p>
        </Reveal>
      </div>

      {/* the three drivers named in the text, set as one strip */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-[22px] border border-line bg-white p-2 sm:mt-10">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            The drivers
          </span>
          {drivers.map((d) => (
            <span key={d} className="inline-flex items-center gap-2 rounded-full bg-mint-soft px-3.5 py-2 text-[13px] font-semibold text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {d}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {approach.map((item, i) => (
          <Reveal key={item.title} delay={0.05 * i} className="h-full">
            <article className="group h-full rounded-[22px] border border-line bg-white p-6 transition-colors hover:border-accent/30 sm:rounded-[24px]">
              <span className="block h-[3px] w-10 rounded-full bg-navy transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
              <h3 className="mt-5 text-[18px] font-bold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- features, as a bento ---------- */

function Sparkline() {
  return (
    <svg viewBox="0 0 200 60" className="mt-5 h-16 w-full" aria-hidden="true">
      <rect x="0" y="18" width="200" height="26" rx="6" fill="#1F8A4C" opacity="0.1" />
      <path d={`M0,40 ${BEFORE.slice(0, 13).map((v, n) => `L${n * 8.3},${10 + (220 - Math.min(v, 220)) / 4}`).join(' ')} ${AFTER.slice(12).map((v, n) => `L${100 + n * 8.3},${10 + (220 - v) / 4}`).join(' ')}`} fill="none" stroke="#136074" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" x2="100" y1="4" y2="56" stroke="#d95f14" strokeDasharray="3 3" />
    </svg>
  )
}

function Head({ item, light }) {
  const Icon = item.icon
  return (
    <>
      <span className={`grid h-11 w-11 place-items-center rounded-2xl ${light ? 'bg-white/12 text-mint' : 'bg-mint-soft text-accent'}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className={`mt-4 text-[17px] font-bold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>{item.title}</h3>
      <p className={`mt-1.5 text-[14px] leading-6 ${light ? 'text-white/75' : 'text-muted'}`}>{item.text}</p>
    </>
  )
}

function Bento() {
  const [audit, meals, cgm, consult, whatsapp, fitness] = features
  const tile = 'group h-full rounded-[22px] border border-line bg-white p-6 transition-colors hover:border-accent/30 sm:rounded-[24px]'
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Reveal className="h-full md:col-span-2">
        <div className="h-full overflow-hidden rounded-[22px] bg-gradient-to-br from-teal to-navy p-6 sm:rounded-[24px] sm:p-7">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-end">
            <div><Head item={cgm} light /></div>
            <div className="rounded-2xl bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Before and after a food change</p>
              <Sparkline />
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.05} className="h-full"><article className={tile}><Head item={audit} /></article></Reveal>
      <Reveal delay={0.05} className="h-full">
        <article className={tile}>
          <Head item={meals} />
          <div aria-hidden="true" className="mt-5 flex flex-wrap items-center gap-2">
            {['Familiar', 'Home-cooked', 'Regional'].map((t) => (
              <span key={t} className="whitespace-nowrap rounded-full border border-line bg-pale px-3 py-1 text-[11px] font-semibold text-navy">{t}</span>
            ))}
          </div>
        </article>
      </Reveal>
      <Reveal delay={0.1} className="h-full"><article className={tile}><Head item={consult} /></article></Reveal>
      <Reveal delay={0.15} className="h-full"><article className={tile}><Head item={whatsapp} /></article></Reveal>
      <Reveal delay={0.05} className="h-full md:col-span-2 lg:col-span-3">
        <article className={`${tile} sm:flex sm:items-center sm:gap-8`}>
          <div className="sm:max-w-md"><Head item={fitness} /></div>
          <div aria-hidden="true" className="mt-5 grid flex-1 grid-cols-3 gap-2 sm:mt-0">
            {['Movement', 'Sleep', 'Stress'].map((t) => (
              <div key={t} className="rounded-2xl bg-pale px-4 py-4 text-center text-[13px] font-semibold text-navy">{t}</div>
            ))}
          </div>
        </article>
      </Reveal>
    </div>
  )
}

/* ---------- conditions, as an explorer ---------- */

const markers = {
  'Type 2 Diabetes & Prediabetes': ['HbA1c', 'Post-meal sugar', 'Insulin sensitivity'],
  'Hypertension (High BP)': ['Blood pressure', 'Sodium-potassium balance', 'Vascular inflammation'],
  'High Cholesterol & Triglycerides': ['HDL', 'LDL', 'Triglycerides'],
  'Obesity & Stubborn Visceral Fat': ['Inches lost', 'Lean muscle', 'Metabolic rate'],
  'Fatty Liver (Grades 1 to 3)': ['SGOT', 'SGPT', 'Liver fat'],
}

function ConditionDetail({ item }) {
  const Icon = item.icon
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="rounded-[22px] bg-gradient-to-br from-navy to-midnight p-6 text-white sm:rounded-[26px] sm:p-8"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-mint">
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[22px] font-extrabold tracking-tight sm:text-[26px]">{item.title}</h3>
      <p className="mt-3 max-w-[48ch] text-[15px] leading-7 text-white/75">{item.text}</p>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">What we work on</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {markers[item.title].map((m) => (
          <li key={m} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[13px] font-medium">
            <Check className="h-3.5 w-3.5 text-mint" strokeWidth={2.5} aria-hidden="true" />
            {m}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function Conditions() {
  const [active, setActive] = useState(0)
  return (
    <Section id="programs" tone="soft">
      <Reveal>
        <SectionHeader eyebrow="Programs" title="Conditions We Help Reverse" />
      </Reveal>
      <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
        <div>
          <ul className="space-y-2">
            {programs.map((p, n) => {
              const Icon = p.icon
              const on = n === active
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() => setActive(n)}
                    aria-expanded={on}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                      on ? 'border-accent/40 bg-white shadow-soft' : 'border-line bg-white/60 hover:bg-white'
                    }`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${on ? 'bg-accent text-white' : 'bg-mint-soft text-accent'}`}>
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-navy">{p.title}</span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-transform ${on ? 'translate-x-0 text-accent lg:rotate-0' : 'text-navy/30'} ${on ? 'rotate-90 lg:rotate-0' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {on ? (
                    <div className="mt-2 lg:hidden">
                      <ConditionDetail item={p} />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
          <Reveal className="mt-4">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-accent/40 bg-mint-soft/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[15px] font-bold text-navy">Not sure? Talk to an Expert</p>
                <p className="mt-1 text-[13px] text-muted">Share your latest reports and we’ll suggest the right program for you.</p>
              </div>
              <Button href="/contact?topic=reversal" className="w-full shrink-0 sm:w-auto">
                Talk to an Expert
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <ConditionDetail item={programs[active]} />
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- journey, as a timeline ---------- */

function Journey() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduceMotion = useReducedMotion()
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeader eyebrow="How it works" title="Your 4-Step Reversal Journey" />
      </Reveal>
      <div ref={ref} className="relative mt-10 sm:mt-12">
        {/* the line that joins the steps: across on large screens, down on small */}
        <div aria-hidden="true" className="absolute left-0 top-[19px] hidden h-[2px] w-full bg-line lg:block" />
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute left-0 top-[19px] hidden h-[2px] w-full origin-left bg-accent lg:block"
        />
        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, n) => (
            <li key={s.title} className="relative flex gap-5 lg:block">
              {n < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  style={{ transitionDelay: `${200 + n * 300}ms` }}
                  className={`absolute -bottom-8 left-[19px] top-10 w-[2px] origin-top bg-accent transition-transform duration-500 ease-out lg:hidden ${
                    inView || reduceMotion ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
              ) : null}
              <motion.span
                initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.25 + n * 0.3, duration: 0.4, ease: EASE }}
                className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold text-white ring-[6px] ring-white"
              >
                {n + 1}
              </motion.span>
              <div className="lg:mt-6 lg:pr-4">
                <h3 className="text-[18px] font-bold tracking-tight text-navy">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/* ---------- connected ---------- */

function Connected() {
  return (
    <Section id="connected" tone="soft">
      <Reveal>
        <div className="grid overflow-hidden rounded-[24px] bg-navy text-white sm:rounded-[28px] md:grid-cols-3">
          {connected.map(({ icon: Icon, title, text }, n) => (
            <div key={title} className={`p-6 sm:p-7 ${n ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
              <Icon className="h-6 w-6 text-mint" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-4 text-[17px] font-bold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-[14px] leading-6 text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

export default function DiseaseReversalPage() {
  usePageMeta(
    'Disease Reversal by Orvena | Treat the Root Cause with Food as Medicine',
    'A personalized, nutritionist-guided program to reverse Type 2 diabetes, high BP, cholesterol, obesity and fatty liver, with 1-on-1 clinical nutrition and lifestyle coaching.',
  )

  return (
    <>
      <Hero />
      <Why />
      <Section id="features">
        <Reveal>
          <SectionHeader eyebrow="Program features" title="How It Supports Your Reversal" />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <Bento />
        </div>
      </Section>
      <Conditions />
      <Journey />
      <Connected />
      <CtaBand
        title="Ready to Start Your Reversal Journey?"
        text="Join 4,000+ people who chose to treat the root cause. Talk to an expert about your reports today. Program fees on request."
        note="Results vary between people. Programs are medical advice-led. Do not stop or change any medicine without your doctor."
      >
        <Button href="/contact?topic=reversal" className="w-full sm:w-auto">
          Talk to Our Expert
        </Button>
      </CtaBand>
    </>
  )
}
