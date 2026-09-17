import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Activity,
  ClipboardList,
  FileStack,
  FlaskConical,
  Pill,
  Scan,
  Stethoscope,
} from 'lucide-react'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import SectionCard from './ui/SectionCard'

/**
 * Scroll-scrubbed sequence (progress 0 -> 1 across the pinned track).
 *   0.00 - 0.09  scattered records drift in, layered by depth (the parallax)
 *   0.09 - 0.42  records are pulled into the Orvena app and structured
 *   0.42 - 0.59  the app screen resolves into one clean, organized report
 *   0.59 - 0.74  the report's numbers become trend charts
 *   0.74 - 0.87  care activity and targets
 *   0.87 - 1.00  the specialist to consult
 *
 * Desktop pointer devices only; reduced-motion and touch get a static layout.
 */
const PHASES = [
  { title: 'Collect', text: 'Scattered records arrive' },
  { title: 'Organize', text: 'Structured inside the app' },
  { title: 'Understand', text: 'One clean report' },
  { title: 'Analyze', text: 'Trends read from the records' },
  { title: 'Monitor', text: 'Care activity and targets' },
  { title: 'Consult', text: 'Matched to the right specialist' },
]

/**
 * Trend data behind the phase 4 charts. One series per chart, so each is a
 * single-hue (accent) plot that needs no legend — the chart title names it.
 */
const GLUCOSE = [6.9, 6.6, 6.7, 6.2, 5.9, 6.0, 5.6, 5.4]
const RECORDS_PER_MONTH = [4, 6, 5, 8, 7, 9]

/** Phase 5 — magnitude by category, so a horizontal bar with direct labels. */
const SPECIALTY_VISITS = [
  ['Cardiology', 4],
  ['Orthopedics', 3],
  ['Gastro', 2],
  ['Nephrology', 1],
]

/** A single value against a target reads as a meter, not a chart. */
const VITAMIN_D = { value: 28, target: 50, unit: 'ng/mL' }

/** Phase 6 — the specialist the timeline points to (from the site's own roster). */
const SPECIALIST = {
  name: 'Dr. Ajit R Menon',
  specialty: 'Cardiology',
  qualifications: 'MD, DM Cardiology',
  years: '15+ years',
}

const RECORDS = [
  { id: 'history', tag: 'Prior history', title: '12 documents, unsorted', icon: FileStack, x: -345, y: -300, rot: -4, depth: 1.2 },
  { id: 'scan', tag: 'Scan', title: 'PET-CT — oncology', icon: Scan, x: -30, y: -305, rot: -6, depth: 1.25 },
  { id: 'labs', tag: 'Lab report', title: 'CBC & metabolic panel', icon: FlaskConical, x: 160, y: -245, rot: -13, depth: 1.35 },
  { id: 'imaging', tag: 'Imaging', title: 'MRI lumbar spine', icon: Scan, x: 400, y: -175, rot: 11, depth: 1.1 },
  { id: 'vitals', tag: 'Vitals', title: 'Glucose log · 90 days', icon: Activity, x: 520, y: -50, rot: 4, depth: 0.65 },
  { id: 'rx', tag: 'Prescription', title: 'Medication plan — Mar', icon: Pill, x: 470, y: 95, rot: 7, depth: 0.8 },
  { id: 'consult', tag: 'Consultation', title: 'Cardiology review note', icon: Stethoscope, x: 250, y: 225, rot: -9, depth: 1.5 },
  { id: 'discharge', tag: 'Discharge', title: 'Hospital summary 2024', icon: ClipboardList, x: -60, y: 260, rot: 15, depth: 1 },
]

const INGEST_ROWS = [
  ['Lab reports', 'Structured'],
  ['Imaging', 'Annotated'],
  ['Prescriptions', 'Synced'],
  ['Consultations', 'Linked'],
  ['Health timeline', 'Built'],
]

const REPORT_ROWS = [
  ['CBC & metabolic panel', 'Report ready · reviewed', '12 Mar'],
  ['Cardiology review', 'Second opinion complete', '04 Mar'],
  ['MRI lumbar spine', 'Specialist annotated', '21 Feb'],
  ['Prior history imported', '12 documents structured', '09 Feb'],
]

// Label / value pairs, so a record reads like a real result sheet rather than filler bars.
const REPORT_LINES = [
  ['w-8', 'w-[68px]'],
  ['w-10', 'w-[52px]'],
  ['w-7', 'w-[74px]'],
  ['w-11', 'w-[46px]'],
]

const REPORT_STATS = [
  ['100%', 'Organized'],
  ['12', 'Records'],
  ['24–72h', 'Review'],
]

function useSequenceEnabled() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const sync = () => setWide(query.matches)
    sync()
    // resize covers environments where the media query's change event is unreliable
    query.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    return () => {
      query.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  return wide && !reduce
}

function RecordCard({ record, progress }) {
  const { x, y, rot, depth, tag, title, icon: Icon } = record

  const cardX = useTransform(progress, [0, 0.102, 0.344], [x * (1 + 0.22 * depth), x, 0])
  const cardY = useTransform(progress, [0, 0.102, 0.344], [y * (1 + 0.2 * depth), y - 30 * depth, 0])
  const scale = useTransform(progress, [0, 0.102, 0.344], [1.04, 1, 0.16])
  const rotate = useTransform(progress, [0, 0.102, 0.344], [rot * 1.2, rot, 0])
  // Visible from the very first frame — the opening frame is the composition, not a fade-in.
  const opacity = useTransform(progress, [0.251, 0.344], [1, 0])

  return (
    <motion.article
      style={{ x: cardX, y: cardY, scale, rotate, '--seq-o': opacity }}
      className="absolute left-1/2 top-1/2 -ml-[102px] -mt-[72px] w-[204px] opacity-[var(--seq-o)] will-change-transform"
    >
      {/* Sheets stacked behind, so each record reads as a paper document. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 top-1.5 h-full rounded-xl bg-white/35 shadow-lift"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-1.5 top-0.5 h-full rounded-xl bg-white/65"
      />

      <div className="relative rounded-xl bg-white text-navy shadow-lift">
        <div className="flex items-center gap-2 border-b border-navy/8 px-3 py-2.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10">
            <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold uppercase tracking-[0.14em] text-muted">
              {tag}
            </p>
            <p className="truncate text-[11px] font-extrabold leading-tight tracking-tight">
              {title}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 px-3 py-2.5">
          {REPORT_LINES.map(([label, value], index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`h-1.5 shrink-0 rounded-full bg-navy/18 ${label}`} />
              <span className={`h-1.5 rounded-full bg-navy/8 ${value}`} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-navy/8 px-3 py-2">
          <span className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-muted">
            Report
          </span>
          <span aria-hidden="true" className="h-1 w-9 rounded-full bg-accent/35" />
        </div>
      </div>
    </motion.article>
  )
}

function IngestRow({ label, state, index, progress }) {
  const start = 0.14 + index * 0.039
  const opacity = useTransform(progress, [start, start + 0.121], [0.22, 1])
  const rowY = useTransform(progress, [start, start + 0.121], [12, 0])
  const check = useTransform(progress, [start + 0.055, start + 0.139], [0, 1])

  return (
    <motion.li
      style={{ y: rowY, '--seq-o': opacity }}
      className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/6 px-3 py-2.5 opacity-[var(--seq-o)] will-change-transform"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-semibold text-white/90">{label}</p>
        <p className="mt-0.5 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/40">
          {state}
        </p>
      </div>
      <motion.span
        style={{ '--seq-o': check }}
        aria-hidden="true"
        className="ml-auto text-[11px] font-bold text-mint opacity-[var(--seq-o)]"
      >
        ✓
      </motion.span>
    </motion.li>
  )
}

function ReportRow({ title, meta, date, index, progress }) {
  const start = 0.435 + index * 0.02
  const opacity = useTransform(progress, [start, start + 0.066], [0, 1])
  const rowY = useTransform(progress, [start, start + 0.066], [14, 0])

  return (
    <motion.li
      style={{ y: rowY, '--seq-o': opacity }}
      className="flex items-center gap-2.5 border-t border-navy/8 py-2.5 opacity-[var(--seq-o)] will-change-transform"
    >
      <span className="w-4 shrink-0 text-[9.5px] font-bold text-accent">0{index + 1}</span>
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-bold tracking-tight">{title}</p>
        <p className="mt-0.5 truncate text-[9.5px] text-muted">{meta}</p>
      </div>
      <span className="ml-auto shrink-0 text-[8.5px] font-bold uppercase tracking-[0.1em] text-muted">
        {date}
      </span>
    </motion.li>
  )
}

/** Column with a 4px rounded data-end and square corners at the baseline. */
function barPath(x, y, w, h, r = 4) {
  const cap = Math.min(r, h)
  return `M${x},${y + cap}a${cap},${cap} 0 0 1 ${cap},-${cap}h${w - cap * 2}a${cap},${cap} 0 0 1 ${cap},${cap}v${h - cap}h-${w}z`
}

/** Phase 4 — the trends Health OS reads out of the collected records. */
function TrendCharts({ progress }) {
  const opacity = useTransform(progress, [0.596, 0.653, 0.722, 0.767], [0, 1, 1, 0])
  const panelY = useTransform(progress, [0.596, 0.673], [22, 0])

  const W = 236
  const LINE_H = 62
  const BAR_H = 52

  const min = Math.min(...GLUCOSE)
  const max = Math.max(...GLUCOSE)
  const stepX = (W - 8) / (GLUCOSE.length - 1)
  const points = GLUCOSE.map((value, index) => {
    const x = 4 + index * stepX
    const y = 8 + (1 - (value - min) / (max - min)) * (LINE_H - 16)
    return [x, y]
  })
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${(W - 4).toFixed(1)},${LINE_H} L4,${LINE_H} Z`
  const last = points[points.length - 1]

  const band = W / RECORDS_PER_MONTH.length
  const barW = Math.min(24, band - 14)
  const barMax = Math.max(...RECORDS_PER_MONTH)

  return (
    <motion.div
      style={{ y: panelY, '--seq-o': opacity }}
      className="absolute inset-x-3.5 top-[74px] rounded-[20px] bg-white p-4 text-navy opacity-[var(--seq-o)] shadow-lift will-change-transform"
    >
      <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-accent">
        Health OS · Trends
      </p>
      <h3 className="mt-1 text-[15px] font-extrabold leading-tight tracking-tight">
        Read from your records
      </h3>

      <figure className="mt-4">
        <figcaption className="flex items-baseline justify-between">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
            Fasting glucose
          </span>
          <span className="text-[9px] text-muted">mmol/L · 8 readings</span>
        </figcaption>
        <svg
          viewBox={`0 0 ${W} ${LINE_H}`}
          className="mt-2 w-full"
          role="img"
          aria-label="Fasting glucose trending down from 6.9 to 5.4 millimoles per litre across eight readings"
        >
          {[0.33, 0.66].map((t) => (
            <line
              key={t}
              x1="0"
              x2={W}
              y1={LINE_H * t}
              y2={LINE_H * t}
              stroke="#0b4156"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          ))}
          <path d={area} fill="#D95F14" fillOpacity="0.1" />
          <path
            d={line}
            fill="none"
            stroke="#D95F14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={last[0]} cy={last[1]} r="4" fill="#D95F14" stroke="#fff" strokeWidth="2" />
        </svg>
        <p className="mt-1.5 text-[9.5px] text-muted">
          Latest <span className="font-bold text-navy">5.4</span> — down from 6.9
        </p>
      </figure>

      <figure className="mt-4 border-t border-navy/8 pt-3">
        <figcaption className="flex items-baseline justify-between">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
            Records added
          </span>
          <span className="text-[9px] text-muted">last 6 months</span>
        </figcaption>
        <svg
          viewBox={`0 0 ${W} ${BAR_H}`}
          className="mt-2 w-full"
          role="img"
          aria-label="Records added per month over six months, rising from four to nine"
        >
          <line
            x1="0"
            x2={W}
            y1={BAR_H - 0.5}
            y2={BAR_H - 0.5}
            stroke="#0b4156"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          {RECORDS_PER_MONTH.map((value, index) => {
            const h = (value / barMax) * (BAR_H - 8)
            return (
              <path
                key={index}
                d={barPath(index * band + (band - barW) / 2, BAR_H - h, barW, h)}
                fill="#D95F14"
                fillOpacity={index === RECORDS_PER_MONTH.length - 1 ? 1 : 0.45}
              />
            )
          })}
        </svg>
        <p className="mt-1.5 text-[9.5px] text-muted">
          <span className="font-bold text-navy">9</span> added in March
        </p>
      </figure>
    </motion.div>
  )
}

/** Phase 5 — where the care actually went, plus one value against its target. */
function CareCharts({ progress }) {
  const opacity = useTransform(progress, [0.75, 0.803, 0.851, 0.895], [0, 1, 1, 0])
  const panelY = useTransform(progress, [0.75, 0.822], [22, 0])

  const maxVisits = Math.max(...SPECIALTY_VISITS.map(([, n]) => n))
  const meterPct = Math.round((VITAMIN_D.value / VITAMIN_D.target) * 100)

  return (
    <motion.div
      style={{ y: panelY, '--seq-o': opacity }}
      className="absolute inset-x-3.5 top-[74px] rounded-[20px] bg-white p-4 text-navy opacity-[var(--seq-o)] shadow-lift will-change-transform"
    >
      <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-accent">
        Health OS · Care activity
      </p>
      <h3 className="mt-1 text-[15px] font-extrabold leading-tight tracking-tight">
        Where your care went
      </h3>

      <figure className="mt-4">
        <figcaption className="flex items-baseline justify-between">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
            Consultations
          </span>
          <span className="text-[9px] text-muted">last 12 months</span>
        </figcaption>
        <ul className="mt-2.5 space-y-2">
          {SPECIALTY_VISITS.map(([label, count], index) => (
            <li key={label} className="flex items-center gap-2">
              <span className="w-[74px] shrink-0 truncate text-[9.5px] font-semibold">{label}</span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-navy/6">
                <span
                  className="absolute inset-y-0 left-0 rounded-r-[4px] bg-accent"
                  style={{
                    width: `${(count / maxVisits) * 100}%`,
                    opacity: index === 0 ? 1 : 0.45,
                  }}
                />
              </span>
              <span className="w-3 shrink-0 text-right text-[9.5px] font-bold">{count}</span>
            </li>
          ))}
        </ul>
      </figure>

      <figure className="mt-4 border-t border-navy/8 pt-3">
        <figcaption className="flex items-baseline justify-between">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
            Vitamin D
          </span>
          <span className="text-[9px] text-muted">target {VITAMIN_D.target}</span>
        </figcaption>
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-navy/6">
          <div className="h-full rounded-r-[4px] bg-accent" style={{ width: `${meterPct}%` }} />
        </div>
        <p className="mt-1.5 text-[9.5px] text-muted">
          <span className="font-bold text-navy">
            {VITAMIN_D.value} {VITAMIN_D.unit}
          </span>{' '}
          — {VITAMIN_D.target - VITAMIN_D.value} below target
        </p>
      </figure>
    </motion.div>
  )
}

/** Phase 6 — the timeline resolves into a specialist to consult. */
function ConsultPanel({ progress }) {
  const opacity = useTransform(progress, [0.878, 0.933], [0, 1])
  const panelY = useTransform(progress, [0.878, 0.952], [22, 0])

  return (
    <motion.div
      style={{ y: panelY, '--seq-o': opacity }}
      className="absolute inset-x-3.5 top-[74px] rounded-[20px] bg-white p-4 text-navy opacity-[var(--seq-o)] shadow-lift will-change-transform"
    >
      <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-accent">
        Health OS · Next step
      </p>
      <h3 className="mt-1 text-[15px] font-extrabold leading-tight tracking-tight">
        Consult the right doctor
      </h3>
      <p className="mt-1.5 text-[9.5px] leading-4 text-muted">
        Your timeline points to a cardiology review. Orvena matches it to a verified specialist.
      </p>

      <div className="mt-3.5 flex items-center gap-2.5 rounded-2xl border border-navy/8 bg-pale/60 p-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10">
          <Stethoscope className="h-4 w-4 text-accent" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11.5px] font-extrabold tracking-tight">{SPECIALIST.name}</p>
          <p className="mt-0.5 truncate text-[9px] text-muted">
            {SPECIALIST.specialty} · {SPECIALIST.years}
          </p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-accent/10 px-2 py-1 text-[7.5px] font-bold uppercase tracking-[0.12em] text-accent">
          Verified
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {[
          ['Review window', '24–72h'],
          ['Records shared', '12 structured'],
          ['Format', 'Video or in-person'],
        ].map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-2">
            <span className="text-[9.5px] text-muted">{label}</span>
            <span className="text-[9.5px] font-bold">{value}</span>
          </li>
        ))}
      </ul>

      {/* Visual only — the phone is an illustration, so this is not a focusable control. */}
      <span
        aria-hidden="true"
        className="mt-3.5 flex h-9 w-full items-center justify-center rounded-full bg-accent text-[10.5px] font-bold tracking-tight text-white"
      >
        Book consultation
      </span>
    </motion.div>
  )
}

/** The Orvena app: records go in, the organized report comes out on its screen. */
function OrvenaApp({ progress }) {
  // The app is present from the first frame; it only lifts as the report resolves.
  const appY = useTransform(progress, [0.418, 0.624], [0, -16])
  const appScale = useTransform(progress, [0.418, 0.642], [1, 1.04])

  const scanY = useTransform(progress, [0.123, 0.376], [64, 470])
  const scanOpacity = useTransform(progress, [0.102, 0.159, 0.344, 0.376], [0, 1, 1, 0])

  // Idle: until records reach the app, the screen is a white splash carrying the wordmark.
  const idleOpacity = useTransform(progress, [0.072, 0.123], [1, 0])
  const idleScale = useTransform(progress, [0.072, 0.123], [1, 0.94])
  const chromeOpacity = useTransform(progress, [0.076, 0.159], [0, 1])
  const ingestOpacity = useTransform(progress, [0.081, 0.177, 0.344, 0.435], [0, 1, 1, 0])
  const reportOpacity = useTransform(progress, [0.418, 0.484, 0.568, 0.614], [0, 1, 1, 0])
  const reportY = useTransform(progress, [0.418, 0.511], [22, 0])
  const badgeOpacity = useTransform(progress, [0.464, 0.519], [0, 1])

  return (
    <motion.div
      style={{ y: appY, scale: appScale }}
      className="absolute left-1/2 top-1/2 -ml-[152px] -mt-[314px] h-[628px] w-[304px] rounded-[46px] border border-white/14 bg-gradient-to-b from-teal to-midnight p-2.5 shadow-lift will-change-transform"
    >
      <div className="relative h-full overflow-hidden rounded-[38px] bg-midnight/80 px-3.5 pt-3">
        <span
          aria-hidden="true"
          className="mx-auto mb-3.5 block h-1.5 w-20 rounded-full bg-white/20"
        />

        <motion.div
          style={{ '--seq-o': chromeOpacity }}
          className="flex items-center justify-between pb-3.5 opacity-[var(--seq-o)]"
        >
          <span className="inline-flex rounded-lg bg-white px-2 py-1">
            <img src="/orvena_logo.webp" alt="" width={186} height={50} className="w-[68px]" />
          </span>
          <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-mint">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        </motion.div>

        <motion.span
          aria-hidden="true"
          style={{ y: scanY, '--seq-o': scanOpacity }}
          className="pointer-events-none absolute inset-x-3.5 top-0 h-24 rounded-2xl bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-[var(--seq-o)] will-change-transform"
        />

        {/* Phase 1 — the app at rest: a white splash screen carrying the wordmark */}
        <motion.div
          style={{ '--seq-o': idleOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[38px] bg-white opacity-[var(--seq-o)]"
        >
          <motion.img
            style={{ scale: idleScale }}
            src="/orvena_logo.webp"
            alt=""
            width={186}
            height={50}
            className="w-[196px] will-change-transform"
          />
        </motion.div>

        {/* Phase 2 — raw records being structured */}
        <motion.div
          style={{ '--seq-o': ingestOpacity }}
          className="opacity-[var(--seq-o)] will-change-transform"
        >
          <p className="pb-2.5 text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/40">
            Structuring records
          </p>
          <ul className="space-y-2">
            {INGEST_ROWS.map(([label, state], index) => (
              <IngestRow
                key={label}
                label={label}
                state={state}
                index={index}
                progress={progress}
              />
            ))}
          </ul>
        </motion.div>

        <TrendCharts progress={progress} />
        <CareCharts progress={progress} />
        <ConsultPanel progress={progress} />

        {/* Phase 3 — the organized report, on the app screen */}
        <motion.div
          style={{ y: reportY, '--seq-o': reportOpacity }}
          className="absolute inset-x-3.5 top-[74px] rounded-[20px] bg-white p-4 text-navy opacity-[var(--seq-o)] shadow-lift will-change-transform"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-accent">
                Health OS · OV-20491
              </p>
              <h3 className="mt-1 text-[15px] font-extrabold leading-tight tracking-tight">
                Unified clinical timeline
              </h3>
            </div>
            <motion.span
              style={{ '--seq-o': badgeOpacity }}
              className="shrink-0 rounded-full bg-accent/10 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-accent opacity-[var(--seq-o)]"
            >
              Ready
            </motion.span>
          </div>

          <ul className="mt-3">
            {REPORT_ROWS.map(([title, meta, date], index) => (
              <ReportRow
                key={title}
                title={title}
                meta={meta}
                date={date}
                index={index}
                progress={progress}
              />
            ))}
          </ul>

          <motion.div
            style={{ '--seq-o': badgeOpacity }}
            className="mt-3 flex justify-between border-t border-navy/8 pt-3 opacity-[var(--seq-o)]"
          >
            {REPORT_STATS.map(([value, label]) => (
              <div key={label}>
                <p className="text-[14px] font-extrabold tracking-tight">{value}</p>
                <p className="mt-0.5 text-[7.5px] font-bold uppercase tracking-[0.12em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Sequence() {
  const trackRef = useRef(null)
  const [phase, setPhase] = useState(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setPhase(
      value < 0.085 ? 0 : value < 0.418 ? 1 : value < 0.585 ? 2 : value < 0.74 ? 3 : value < 0.868 ? 4 : 5,
    )
  })

  return (
    <div ref={trackRef} className="relative h-[1930vh]">
      {/* The frame itself is pinned, so it never drifts while the sequence plays. */}
      <div className="sticky top-[100px] h-[calc(100svh-116px)] overflow-hidden rounded-[22px] bg-midnight shadow-card sm:rounded-[28px] lg:rounded-[36px]">
        <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[-12%] h-[340px] w-[340px] rounded-full bg-mint/8 blur-[120px]" />
          <div className="absolute bottom-[-12%] right-[-6%] h-[300px] w-[300px] rounded-full bg-accent/10 blur-[110px]" />
        </div>

        <Container className="relative h-full">
          {/* Copy stays still — parallax never moves body text. */}
          <div className="absolute left-4 top-1/2 z-10 max-w-[288px] -translate-y-1/2 lg:left-10 xl:max-w-[380px]">
            <Eyebrow light>Health OS</Eyebrow>
            <h2 className="mt-3 text-[28px] font-extrabold leading-[1.1] tracking-[-0.04em] text-white sm:mt-4 xl:text-[44px]">
              Scattered records become one clear history.
            </h2>
            <p className="mt-3 max-w-[54ch] text-[15px] leading-7 text-white/65 sm:mt-4 sm:text-[17px] sm:leading-8">
              Every prescription, scan and lab report — collected in the Orvena app, structured, and
              returned as one clinical timeline your doctor can read in seconds.
            </p>

            <ol className="mt-6 space-y-3 sm:mt-7">
              {PHASES.map((item, index) => {
                const on = phase === index
                return (
                  <li
                    key={item.title}
                    className={`flex items-center gap-3 text-sm font-semibold transition-colors duration-300 ${
                      on ? 'text-white' : 'text-white/35'
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                        on ? 'border-accent bg-accent text-white' : 'border-white/20'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="truncate">
                      {item.title}
                      <span
                        className={`text-[12px] font-normal ${on ? 'text-white/45' : 'text-white/25'}`}
                      >
                        {' '}
                        — {item.text}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div aria-hidden="true" className="absolute inset-0">
            {RECORDS.map((record) => (
              <RecordCard key={record.id} record={record} progress={scrollYProgress} />
            ))}
          </div>

          <OrvenaApp progress={scrollYProgress} />
        </Container>
      </div>
    </div>
  )
}

/** Touch, narrow viewports and reduced-motion get the same story, told statically. */
function StaticFallback() {
  return (
    <Container className="py-12 sm:py-16">
      <Eyebrow light>Health OS</Eyebrow>
      <h2 className="mt-3 max-w-[18ch] text-[28px] font-extrabold leading-[1.1] tracking-[-0.04em] text-white sm:mt-4 sm:text-[36px] md:text-[44px]">
        Scattered records become one clear history.
      </h2>
      <p className="mt-3 max-w-[54ch] text-[15px] leading-7 text-white/65 sm:mt-4 sm:text-[17px] sm:leading-8">
        Every prescription, scan and lab report — collected in the Orvena app, structured, and
        returned as one clinical timeline your doctor can read in seconds.
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PHASES.map((item, index) => (
          <li key={item.title} className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mint/70">
              0{index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-0.5 text-[12px] text-white/45">{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-[22px] bg-white p-5 text-navy shadow-lift sm:max-w-[420px]">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
          Health OS · OV-20491
        </p>
        <h3 className="mt-1 text-[18px] font-extrabold tracking-tight">
          Unified clinical timeline
        </h3>
        <ul className="mt-3">
          {REPORT_ROWS.map(([title, meta, date], index) => (
            <li key={title} className="flex items-center gap-2.5 border-t border-navy/8 py-2.5">
              <span className="w-4 shrink-0 text-[9.5px] font-bold text-accent">0{index + 1}</span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-bold tracking-tight">{title}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted">{meta}</p>
              </div>
              <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-muted">
                {date}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-navy/8 pt-3">
          {REPORT_STATS.map(([value, label]) => (
            <div key={label}>
              <p className="text-[16px] font-extrabold tracking-tight">{value}</p>
              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default function HealthOSParallax() {
  const enabled = useSequenceEnabled()

  if (!enabled) {
    return (
      <SectionCard id="health-os" className="bg-midnight text-white">
        <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[-10%] h-[280px] w-[280px] rounded-full bg-mint/8 blur-[110px]" />
          <div className="absolute bottom-[-12%] right-[-6%] h-[240px] w-[240px] rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="relative">
          <StaticFallback />
        </div>
      </SectionCard>
    )
  }

  // No overflow-hidden ancestor here: it would break the sticky pin.
  return (
    <section id="health-os" className="relative text-white">
      <Sequence />
    </section>
  )
}
