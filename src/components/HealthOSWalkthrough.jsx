import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  Download,
  Droplet,
  FileText,
  Folder,
  Heart,
  Pencil,
  Pill,
  Save,
  Share2,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useFitScale } from '../hooks/useFitScale'

/**
 * HealthOS hero walkthrough: a desktop-style window that plays the app's main flow
 * in 4 steps (about 28 seconds, then loops). Sample data only, no real person.
 * Screens follow the real HealthOS web app: Reports, readings, SmartView, Insights.
 */

const EASE = [0.22, 1, 0.36, 1]

// false until playback starts: screens hold their empty first frame instead of filling in.
const Playing = createContext(false)

const TONE = {
  high: 'bg-[#FDECEE] text-[#B4232C]',
  ok: 'bg-[#E4F2EF] text-[#1D5E4F]',
  low: 'bg-[#FDF1E1] text-[#8A5A00]',
}
const LABEL = { high: 'High', ok: 'In range', low: 'Low' }
const cta = 'bg-gradient-to-r from-[#e0610a] to-[#f08a3c] text-white shadow-[0_8px_18px_-8px_rgba(224,97,10,0.7)]'

/** Shows its children after `at` seconds. */
function Later({ at, className = '', children, t }) {
  const playing = useContext(Playing)
  return (
    <motion.div
      data-t={t}
      initial={{ opacity: 0, y: 6 }}
      animate={playing ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ delay: at, duration: 0.4, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** A button that gets "pressed" at `at` seconds. */
function Press({ at, className = '', children, t }) {
  const playing = useContext(Playing)
  return (
    <motion.span
      data-t={t}
      animate={playing ? { scale: [1, 0.94, 1] } : { scale: 1 }}
      transition={{ delay: at, duration: 0.35 }}
      className={`inline-flex items-center justify-center gap-1.5 ${className}`}
    >
      {children}
    </motion.span>
  )
}

/* ---------- the four screens: real HealthOS web layouts on a 900 x 470 canvas ---------- */

const CW = 900
const CH = 562 // same 1.6 proportion as the ClinicOS hero screen
const page = 'flex h-full w-full flex-col gap-4 bg-[#EAF5F8] p-6 text-navy'
const card = 'rounded-2xl bg-white p-5 shadow-[0_6px_20px_-14px_rgba(11,65,86,0.35)]'
const tealCard = 'bg-gradient-to-br from-[#2a7f96] via-teal to-[#0d4a5c] text-white'

function UploadStep() {
  const playing = useContext(Playing)
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#EAF5F8] px-6 pb-6 pt-5 text-navy">
      <div>
        <p className="text-[26px] font-bold leading-8">Diagnostic Reports</p>
        <p className="text-[14px] text-muted">Manage and view diagnostic imaging & radiology documents</p>
      </div>
      <div className="grid w-[460px] grid-cols-2 rounded-2xl bg-white p-1.5 text-[14px] font-semibold">
        <span className="flex items-center justify-center gap-2 rounded-xl bg-[#E2EEF1] py-2.5"><Upload className="h-4 w-4" /> Upload New Report</span>
        <span className="flex items-center justify-center gap-2 py-2.5 text-navy/70"><Folder className="h-4 w-4" /> View Existing Reports</span>
      </div>
      <div className={card}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[13px] font-medium text-muted">Select Category *</p>
            <div data-t="cat" className="mt-1.5 flex items-center justify-between rounded-xl bg-[#F1F6F8] px-4 py-3 text-[15px] font-medium">
              <Later at={0.8}>Blood Reports</Later>
              <ChevronDown className="h-4 w-4 text-muted" />
            </div>
          </div>
          <div>
            <p className="text-[13px] font-medium text-muted">Report Date *</p>
            <div data-t="date" className="mt-1.5 flex items-center gap-2 rounded-xl bg-[#F1F6F8] px-4 py-3 text-[15px] font-medium">
              <CalendarDays className="h-4 w-4 text-muted" />
              <Later at={1.8}>16/10/2026</Later>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] font-medium text-muted">Report Scans / Files *</p>
        <div data-t="file" className="relative mt-1.5 flex items-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed border-[#9CC3CE] bg-[#F7FBFC] px-5 py-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><FileText className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold">Add Files</p>
            <p className="text-[12.5px] text-muted">Upload A PDF From Your Device</p>
          </div>
          <Later at={3} className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2 ring-1 ring-line">
            <span className="text-[14px] font-bold">lab-report-oct.pdf</span>
            <span className="text-[12px] text-muted">1.2 MB</span>
            <Check className="h-4 w-4 text-[#1F8A4C]" />
          </Later>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: playing ? 1 : 0 }}
            transition={{ delay: 3, duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
          />
        </div>
      </div>
      <Press t="save" at={4.6} className={`w-fit rounded-xl px-6 py-3 text-[15px] font-semibold ${cta}`}>
        <Save className="h-4 w-4" /> Save Report
      </Press>
      <div>
        <p className="text-[14px] font-bold">Recently added</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {[['Chest X-ray', '02 Sep 2026'], ['ECG', '14 Jul 2026'], ['Lipid profile', '20 Mar 2026']].map(([t, d]) => (
            <div key={t} className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-2 shadow-[0_6px_20px_-14px_rgba(11,65,86,0.35)]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#E2EEF1] text-teal"><FileText className="h-4 w-4" /></span>
              <span>
                <span className="block text-[14px] font-bold">{t}</span>
                <span className="block text-[11.5px] text-muted">{d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const values = [
  ['Blood Sugar Fasting', 'Normal 80 – 115 mg/dl', '131', 'high'],
  ['HbA1c', 'Normal 0 – 6 %', '7.4', 'high'],
  ['Hemoglobin', 'Normal 13.5 – 18 gm %', '12.6', 'low'],
  ['TSH', 'Normal 0.4 – 4.0 mIU/L', '2.2', 'ok'],
  ['LDL Cholesterol', 'Normal 0 – 100 mg/dl', '142', 'high'],
  ['Vitamin D', 'Normal 30 – 100 ng/ml', '18', 'low'],
]

function ReadStep() {
  return (
    <div className={page}>
      <Later at={0.2} className="flex items-center gap-2.5 rounded-xl bg-[#E4F2EF] px-4 py-3 text-[15px] font-semibold text-[#1D5E4F]">
        <Check className="h-5 w-5" /> 24 values read from your report · Blood Reports, 16 Oct 2026
      </Later>
      <div className={`${card} flex-1`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#FDF1E1] text-[#C98A12]"><Droplet className="h-4 w-4" /></span>
            <div>
              <p className="text-[17px] font-bold">Values From Your Report</p>
              <p className="text-[12px] text-muted">Dated 16 Oct 2026</p>
            </div>
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#FDF0E6] text-[12px] font-bold text-accent">24</span>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {values.map(([n, r, v, t], i) => (
            <li key={n}>
              <Later at={0.9 + i * 0.45} t={`row${i}`} className="flex items-center gap-4 py-2.5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold uppercase">{n}</span>
                  <span className="block text-[12px] text-muted">{r}</span>
                </span>
                <span className={`text-[18px] font-bold ${t === 'high' ? 'text-[#B4232C]' : t === 'low' ? 'text-[#8A5A00]' : 'text-[#1D5E4F]'}`}>{v}</span>
                <span className={`w-[72px] rounded-md py-1 text-center text-[12px] font-bold ${TONE[t]}`}>{LABEL[t]}</span>
              </Later>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Vital({ icon: Icon, name, value, unit, tone, from, to, at, range, delta }) {
  const dot = tone === 'high' ? 'border-[#B4232C]' : 'border-[#C98A12]'
  const playing = useContext(Playing)
  return (
    <div data-t={`m-${name}`} className={card}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDECEE] text-[#B4232C]"><Icon className="h-4 w-4" /></span>
        <span className="text-[15px] font-medium text-navy/80">{name}</span>
        <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-teal ring-1 ring-line"><Pencil className="h-3.5 w-3.5" /></span>
      </div>
      <p className="mt-2.5 text-[30px] font-extrabold leading-9">
        {value} <span className="text-[13px] font-medium text-muted">{unit}</span>
      </p>
      <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[12px] font-bold ${TONE[tone]}`}>{LABEL[tone]}</span>
      <div className="relative mt-3.5 h-1.5 rounded-full bg-soft">
        <span className="absolute inset-y-0 rounded-full bg-[#7CC79A]" style={{ left: `${from}%`, width: `${to - from}%` }} />
        <motion.span
          initial={{ left: '50%' }}
          animate={{ left: playing ? `${at}%` : '50%' }}
          transition={{ delay: 0.5, duration: 1, ease: EASE }}
          className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${dot}`}
        />
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-muted">
        <span>{range}</span>
        <span className="font-bold text-[#B4232C]">{delta}</span>
      </div>
    </div>
  )
}

function SmartStep() {
  const tiles = [
    ['Previous', '08 May 2026', '92', 'ok'],
    ['Latest', '16 Oct 2026', '131', 'high'],
    ['Change', '', '+42.4%', 'high'],
  ]
  return (
    <div className={page}>
      <div className={`flex items-center gap-4 rounded-3xl px-5 py-4 ${tealCard}`}>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0d3f50] text-[16px] font-bold ring-2 ring-white/20">
          YN
          <i className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#2fbf71] ring-2 ring-[#0d3f50]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[22px] font-bold leading-7">Your Name</p>
          <p className="text-[13px] text-white/80">Health action center · 3 metrics require attention</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-semibold ${cta}`}><FileText className="h-4 w-4" /> Insights</span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-navy"><Share2 className="h-4 w-4" /> Share</span>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border-l-4 border-[#C42B3B] bg-white px-4 py-2.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C42B3B]">Allergy alert</span>
        <AlertTriangle className="h-4 w-4 text-[#C42B3B]" />
        <span className="text-[15px] font-bold">Sulpha</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.3fr)] gap-4">
        <Vital icon={Droplet} name="HbA1c" value="7.4" unit="%" tone="high" from={4} to={40} at={62} range="Normal 0–6" delta="▼ 0.4" />
        <Vital icon={Activity} name="Hemoglobin" value="12.6" unit="gm %" tone="low" from={42} to={88} at={30} range="Normal 13.5–18" delta="▲ 0.3" />
        <Later at={1.2} className={card}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#2a7f96] to-navy text-white"><TrendingUp className="h-4 w-4" /></span>
            <div>
              <p className="text-[16px] font-bold">Trend Heatmap</p>
              <p className="text-[11.5px] text-muted">Previous report compared with your latest</p>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] font-extrabold uppercase">Blood Sugar Fasting <span className="font-medium normal-case text-muted">80–115 mg/dl</span></p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {tiles.map(([h, d, v, t], i) => (
              <Later key={h} at={2 + i * 0.35} t={`tile${i}`}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy/70">{h}</p>
                <p className="h-4 text-[10px] text-muted">{d}</p>
                <div className={`mt-1 rounded-xl py-3 ${TONE[t]}`}>
                  <p className="text-[19px] font-extrabold leading-6">{v}</p>
                  <p className="text-[11px]">{h === 'Change' ? '▲' : LABEL[t]}</p>
                </div>
              </Later>
            ))}
          </div>
        </Later>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['Impaired glucose tolerance', 'Low hemoglobin, anemia pattern', 'BMI above healthy range'].map((a) => (
          <div key={a} className="flex items-center gap-2.5 rounded-xl border-l-[3px] border-[#C42B3B] bg-white px-3.5 py-3 text-[13.5px] font-medium">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#C42B3B] text-[10px] font-bold text-[#C42B3B]">!</span>
            {a}
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsStep() {
  const chips = [
    [AlertTriangle, 'Alerts'], [Activity, 'Vitals'], [Droplet, 'Out Of Range'], [Heart, 'History'],
    [Pill, 'Medication'], [FileText, 'Blood Reports'],
  ]
  return (
    <div className={page}>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-sm"><ChevronLeft className="h-4 w-4" /></span>
        <div>
          <p className="text-[24px] font-bold leading-7">Structured Case Summary</p>
          <p className="text-[13px] text-muted">Insights · complete case summary</p>
        </div>
      </div>
      <div className={`flex items-center gap-5 rounded-3xl p-5 ${tealCard}`}>
        <div className="min-w-0 flex-1">
          <p className="text-[22px] font-bold">Your Name</p>
          <p className="text-[13px] text-white/75">HB-XXXXXXX · 44 yrs · Male · Blood B+ve</p>
          <div className="mt-3 flex gap-2.5 text-[14px] font-semibold">
            <Press t="pdf" at={1.6} className={`rounded-xl px-5 py-2.5 ${cta}`}><Download className="h-4 w-4" /> Save As PDF</Press>
            <Press t="share" at={3.6} className="rounded-xl bg-white px-6 py-2.5 text-navy"><Share2 className="h-4 w-4" /> Share</Press>
          </div>
        </div>
        <div className="grid shrink-0 grid-cols-3 gap-2.5">
          {[['4', 'Alerts'], ['3', 'Conditions'], ['6', 'Labs off range']].map(([v, l]) => (
            <div key={l} className="w-[108px] rounded-xl border border-white/15 bg-white/10 py-2.5 text-center">
              <p className="text-[22px] font-extrabold leading-7">{v}</p>
              <p className="text-[11.5px] text-white/75">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map(([Icon, c]) => (
          <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-semibold ring-1 ring-line">
            <Icon className="h-3.5 w-3.5" /> {c}
          </span>
        ))}
      </div>
      <Later t="toast" at={4.2} className="flex items-center gap-2.5 rounded-xl bg-navy px-4 py-3 text-[15px] font-semibold text-white">
        <Check className="h-5 w-5 text-mint" /> Summary shared with your doctor
      </Later>
      <div className="grid flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
        <div className={card}>
          <p className="text-[16px] font-bold">Vital Trends</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[['Height', '172 cm', 'bg-[#F1F6F8]'], ['Weight', '81 kg', 'bg-[#F1F6F8]'], ['BMI', '27.4', 'bg-[#FDECEE]'], ['Pulse', '76 bpm', 'bg-[#E4F2EF]']].map(([l, v, bg]) => (
              <div key={l} className={`rounded-xl px-2.5 py-2.5 ${bg}`}>
                <p className="text-[11px] text-muted">{l}</p>
                <p className="text-[16px] font-extrabold">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <p className="text-[16px] font-bold">Values Out Of Range</p>
          <ul className="mt-2 divide-y divide-line">
            {[['Blood Sugar Fasting', '131'], ['HbA1c', '7.4']].map(([n, v]) => (
              <li key={n} className="flex items-center gap-3 py-2">
                <span className="flex-1 text-[13px] font-bold uppercase">{n}</span>
                <span className="text-[15px] font-bold text-[#B4232C]">{v}</span>
                <span className="rounded-md bg-[#FDECEE] px-2 py-0.5 text-[11px] font-bold text-[#B4232C]">High</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------- the window ---------- */

// cursor: [seconds, data-t target (null = resting corner), tap]. Positions are measured
// from the real elements, so the pointer always lands on the button it clicks.
const STEPS = [
  {
    title: 'Upload any medical report',
    chip: 'Start here',
    label: 'Upload a report',
    dur: 6.5,
    Screen: UploadStep,
    cursor: [[0, null], [0.75, 'cat', true], [1.75, 'date', true], [2.95, 'file', true], [4.55, 'save', true], [6.5, 'save']],
  },
  {
    title: 'Every value, read for you',
    chip: 'Usually within 2 hours',
    label: 'Values read',
    dur: 6,
    Screen: ReadStep,
    cursor: [[0, null], [1.6, 'row0'], [2.8, 'row1'], [4.2, 'row3'], [6, 'row3']],
  },
  {
    title: 'See what changed in SmartView',
    chip: 'Color-coded',
    label: 'SmartView & trends',
    dur: 7.5,
    Screen: SmartStep,
    cursor: [[0, null], [1.3, 'm-HbA1c'], [2.6, 'tile1'], [3.6, 'tile2', true], [7.5, 'tile2']],
  },
  {
    title: 'Share one summary with your doctor',
    chip: 'Insights',
    label: 'Insights & share',
    dur: 7,
    Screen: InsightsStep,
    cursor: [[0, null], [1.55, 'pdf', true], [3.55, 'share', true], [4.8, 'toast'], [7, 'toast']],
  },
]

function Cursor({ path, dur }) {
  const [pts, setPts] = useState(null)
  const anchor = useRef(null)

  useLayoutEffect(() => {
    // the screen this cursor lives in
    const el = anchor.current?.closest("[data-screen]")
    if (!el) return undefined
    const measure = () => {
      const b = el.getBoundingClientRect()
      const rest = { x: b.width * 0.86, y: b.height * 0.9 }
      setPts(
        path.map(([, key]) => {
          const t = key && el.querySelector(`[data-t="${key}"]`)
          if (!t) return rest
          const r = t.getBoundingClientRect()
          // aim a little left of center, like a real hand on a mouse
          return { x: r.left - b.left + r.width * 0.45, y: r.top - b.top + r.height * 0.55 }
        }),
      )
    }
    // wait one frame so entering content has its final layout
    const id = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', measure)
    }
  }, [path])

  if (!pts) return <span ref={anchor} hidden />
  // ease into each target, then hold still until the next move
  const times = path.map((p) => p[0] / dur)
  return (
    <>
      <span ref={anchor} hidden />
      <motion.svg
        viewBox="0 0 24 24"
        initial={{ x: pts[0].x, y: pts[0].y }}
        animate={{ x: pts.map((p) => p.x), y: pts.map((p) => p.y) }}
        transition={{ duration: dur, times, ease: [0.45, 0, 0.2, 1] }}
        className="pointer-events-none absolute left-0 top-0 z-20 -ml-[5px] -mt-[3px] h-[22px] w-[22px] drop-shadow-[0_3px_6px_rgba(4,28,38,0.35)]"
        aria-hidden="true"
      >
        <path d="M4 2l15 10-6.5 1.4L16 21l-3 1.3-3.4-7.6L4 19z" fill="#0b2a36" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>
      {path.map(([t, , tap], i) =>
        tap ? (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 0.75, 0], scale: [0.3, 1.4, 2] }}
            transition={{ delay: t, duration: 0.55 }}
            style={{ left: pts[i].x - 12, top: pts[i].y - 12 }}
            className="pointer-events-none absolute z-10 h-6 w-6 rounded-full border-2 border-accent"
          />
        ) : null,
      )}
    </>
  )
}

export default function HealthOSWalkthrough() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.65 })
  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)
  // wait for the hero's own fade-in to finish, so step 1 is seen from its first click
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 1100)
    return () => clearTimeout(id)
  }, [])
  const playing = inView && ready && !reduceMotion
  const [fitRef, scale] = useFitScale(CW)

  useEffect(() => {
    if (!playing) return undefined
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % STEPS.length)
      setCycle((c) => c + 1)
    }, STEPS[step].dur * 1000)
    return () => clearTimeout(id)
  }, [step, playing, cycle])

  const jump = (i) => {
    setStep(i)
    setCycle((c) => c + 1)
  }

  const { title, Screen, dur, cursor } = STEPS[step]

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[640px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-[110px]"
      />
      {/* same slim frame as the ClinicOS hero */}
      <div className="relative rounded-[22px] border border-white/20 bg-white/10 p-1.5 shadow-[0_50px_90px_-36px_rgba(2,20,28,0.85)] backdrop-blur-md sm:rounded-[26px] sm:p-2">
        <div className="flex items-center gap-2 px-2.5 pb-1.5 pt-0.5">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-mint" />
          </span>
          <p className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-white/60">healthos.orvenahealth.com</p>
          <span className="w-[30px]" />
        </div>
        <div
          ref={fitRef}
          data-screen
          aria-hidden="true"
          className="relative w-full overflow-hidden rounded-[14px] bg-[#EAF5F8] sm:rounded-[18px]"
          style={{ height: CH * scale }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${cycle}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-0"
            >
              {/* remounts when playback starts, so the screen and cursor begin together */}
              <div key={String(playing)} className="contents">
                <div className="absolute left-0 top-0 origin-top-left" style={{ width: CW, height: CH, transform: `scale(${scale})` }}>
                  <Playing.Provider value={playing || reduceMotion}>
                    <Screen />
                  </Playing.Provider>
                </div>
                {playing ? <Cursor path={cursor} dur={dur} /> : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* steps, like chapters, under the window */}
      <ol className="mt-3.5 grid grid-cols-4 gap-2 sm:gap-3">
        {STEPS.map((s, i) => (
          <li key={s.label} className="min-w-0">
            <button
              type="button"
              onClick={() => jump(i)}
              className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`Show step ${i + 1}: ${s.label}`}
            >
              <span className="block h-[3px] overflow-hidden rounded-full bg-white/20">
                {i < step ? <span className="block h-full w-full bg-mint" /> : null}
                {i === step ? (
                  <motion.span
                    key={`${cycle}-${playing}`}
                    initial={{ width: playing ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: playing ? dur : 0, ease: 'linear' }}
                    className="block h-full bg-gradient-to-r from-mint to-accent"
                  />
                ) : null}
              </span>
              <span className={`mt-1.5 hidden truncate text-[11.5px] font-medium sm:block ${i === step ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                {s.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-1.5 text-center text-[11px] text-white/55 sm:mt-2">
        <span className="sm:hidden">{STEPS[step].label} · </span>
        <span className="hidden sm:inline">{title} · </span>sample data for illustration
      </p>
    </div>
  )
}
