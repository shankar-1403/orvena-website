import {
  Activity,
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Download,
  Droplet,
  FileText,
  Folder,
  Heart,
  HeartPulse,
  Pencil,
  Pill,
  Save,
  Share2,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { ScreenCard } from './ClinicOSVisuals'

/**
 * Real HealthOS web screens for the HealthOS page zigzag, content area only (no sidebar or
 * window frame), drawn at desktop size and scaled to fit. Sample data only, no real person.
 */

const TONE = {
  high: 'bg-[#FDECEE] text-[#B4232C]',
  ok: 'bg-[#E4F2EF] text-[#1D5E4F]',
  low: 'bg-[#FDF1E1] text-[#8A5A00]',
}
const LABEL = { high: 'High', ok: 'In range', low: 'Low' }
const cta = 'bg-gradient-to-r from-[#e0610a] to-[#f08a3c] text-white shadow-[0_8px_18px_-8px_rgba(224,97,10,0.7)]'
const tealCard = 'bg-gradient-to-br from-[#2a7f96] via-teal to-[#0d4a5c] text-white'
const page = 'flex h-full w-full flex-col gap-4 bg-[#EAF5F8] p-6 text-navy'
const card = 'rounded-2xl bg-white p-5 shadow-[0_6px_20px_-14px_rgba(11,65,86,0.35)]'

/* ---------- Reports: Diagnostic Reports upload ---------- */

function UploadScreen() {
  const recent = [
    ['Lab report', 'Blood Reports · 16 Oct 2026', 'Read'],
    ['Chest X-ray', 'Diagnostic Reports · 02 Sep 2026', 'Filed'],
    ['ECG', 'Diagnostic Reports · 14 Jul 2026', 'Filed'],
  ]
  return (
    <div className={page}>
      <div>
        <p className="text-[26px] font-bold leading-8">Diagnostic Reports</p>
        <p className="text-[14px] text-muted">Manage and view diagnostic imaging & radiology documents</p>
      </div>
      <div className="grid w-[460px] grid-cols-2 rounded-2xl bg-white p-1.5 text-[14px] font-semibold">
        <span className="flex items-center justify-center gap-2 rounded-xl bg-[#E2EEF1] py-2.5"><Upload className="h-4 w-4" /> Upload New Report</span>
        <span className="flex items-center justify-center gap-2 py-2.5 text-navy/70"><Folder className="h-4 w-4" /> View Existing Reports</span>
      </div>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_300px] gap-4">
        <div className={card}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[13px] font-medium text-muted">Select Category *</p>
              <p className="mt-1.5 flex items-center justify-between rounded-xl bg-[#F1F6F8] px-4 py-3 text-[15px] font-medium">
                Blood Reports <ChevronDown className="h-4 w-4 text-muted" />
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-muted">Report Date *</p>
              <p className="mt-1.5 flex items-center gap-2 rounded-xl bg-[#F1F6F8] px-4 py-3 text-[15px] font-medium">
                <CalendarDays className="h-4 w-4 text-muted" /> 16/10/2026
              </p>
            </div>
          </div>
          <p className="mt-4 text-[13px] font-medium text-muted">Report Scans / Files *</p>
          <div className="mt-1.5 grid place-items-center rounded-2xl border-2 border-dashed border-[#9CC3CE] bg-[#F7FBFC] py-5 text-center">
            <Upload className="h-6 w-6 text-teal" />
            <p className="mt-1.5 text-[15px] font-bold">Add Files</p>
            <p className="text-[12.5px] text-muted">Upload A PDF From Your Device</p>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F1F6F8] px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent"><FileText className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-bold">lab-report-oct.pdf</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-white"><span className="block h-full w-full rounded-full bg-accent" /></div>
            </div>
            <span className="rounded-full bg-[#E4F2EF] px-2.5 py-1 text-[12px] font-bold text-[#1D5E4F]">Uploaded</span>
          </div>
          <span className={`mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold ${cta}`}>
            <Save className="h-4 w-4" /> Save Report
          </span>
        </div>
        <div className={card}>
          <p className="text-[17px] font-bold">Recently added</p>
          <ul className="mt-3 space-y-2.5">
            {recent.map(([t, m, s]) => (
              <li key={t} className="flex items-center gap-3 rounded-xl bg-[#F6FAFB] px-3 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#E2EEF1] text-teal"><FileText className="h-4 w-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold">{t}</span>
                  <span className="block truncate text-[11.5px] text-muted">{m}</span>
                </span>
                <span className="rounded-full bg-[#E4F2EF] px-2 py-0.5 text-[11px] font-bold text-[#1D5E4F]">{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-[#FFF5EC] px-3 py-2.5 text-[12.5px] leading-5 text-[#8A4A12]">
            Blood reports are read value by value, usually within 2 hours.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- SmartView ---------- */

function Vital({ icon: Icon, name, value, unit, state, range, from, to, at, delta }) {
  const dot = state === 'high' ? 'border-[#B4232C]' : state === 'low' ? 'border-[#C98A12]' : 'border-[#1F8A4C]'
  const label = state === 'ok' ? 'Normal' : LABEL[state]
  return (
    <div className={card}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDECEE] text-[#B4232C]"><Icon className="h-4 w-4" /></span>
        <span className="text-[15px] font-medium text-navy/80">{name}</span>
        <span className="ml-auto grid h-8 w-8 place-items-center rounded-full ring-1 ring-line text-teal"><Pencil className="h-3.5 w-3.5" /></span>
      </div>
      <p className="mt-2.5 text-[30px] font-extrabold leading-9">
        {value} <span className="text-[13px] font-medium text-muted">{unit}</span>
      </p>
      <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[12px] font-bold ${TONE[state]}`}>{label}</span>
      <div className="relative mt-3.5 h-1.5 rounded-full bg-soft">
        <span className="absolute inset-y-0 rounded-full bg-[#7CC79A]" style={{ left: `${from}%`, width: `${to - from}%` }} />
        <span className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${dot}`} style={{ left: `${at}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-muted">
        <span>{range}</span>
        <span className="font-bold text-[#B4232C]">{delta}</span>
      </div>
    </div>
  )
}

function SmartViewScreen() {
  const attention = ['Impaired glucose tolerance', 'Low hemoglobin, anemia pattern', 'BMI above healthy range']
  const trend = [
    ['Previous', '08 May 2026', '92', 'ok'],
    ['Latest', '16 Oct 2026', '131', 'high'],
    ['Change', '', '+42.4%', 'high'],
  ]
  return (
    <div className={page}>
      <div className="grid grid-cols-[minmax(0,1fr)_270px] gap-4">
        <div className={`flex items-center gap-4 rounded-3xl p-5 ${tealCard}`}>
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#0d3f50] text-[18px] font-bold ring-2 ring-white/20">
            YN
            <i className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-[#2fbf71] ring-2 ring-[#0d3f50]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[24px] font-bold leading-7">Your Name</p>
            <div className="mt-1.5 flex gap-1.5 whitespace-nowrap text-[12px]">
              {['44 yrs', 'Male', 'B+ve'].map((t) => (
                <span key={t} className="rounded-full bg-black/20 px-2.5 py-0.5">{t}</span>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-white/80">Health action center · 3 metrics require attention</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <span className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-semibold ${cta}`}><FileText className="h-4 w-4" /> Insights</span>
            <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-navy"><Share2 className="h-4 w-4" /> Share</span>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold">Needs Attention</p>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FDF0E6] text-[12px] font-bold text-accent">3</span>
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {attention.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-xl border-l-[3px] border-[#C42B3B] bg-[#FDF3F4] px-2.5 py-2 text-[12.5px] font-medium">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#C42B3B] text-[9px] font-bold text-[#C42B3B]">!</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border-l-4 border-[#C42B3B] bg-white px-4 py-2.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C42B3B]">Allergy alert</span>
        <AlertTriangle className="h-4 w-4 text-[#C42B3B]" />
        <span className="text-[15px] font-bold">Sulpha</span>
      </div>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)] gap-4">
        <Vital icon={Droplet} name="HbA1c" value="7.4" unit="%" state="high" range="Normal 0–6" from={4} to={40} at={62} delta="▼ 0.4" />
        <Vital icon={Activity} name="Hemoglobin" value="12.6" unit="gm %" state="low" range="Normal 13.5–18" from={42} to={88} at={30} delta="▲ 0.3" />
        <div className={card}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#2a7f96] to-navy text-white"><TrendingUp className="h-4 w-4" /></span>
            <div>
              <p className="text-[16px] font-bold">Trend Heatmap</p>
              <p className="text-[11.5px] text-muted">Previous report compared with your latest</p>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] font-extrabold uppercase">Blood Sugar Fasting <span className="font-medium normal-case text-muted">80–115 mg/dl</span></p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {trend.map(([h, d, v, t]) => (
              <div key={h}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy/70">{h}</p>
                <p className="h-4 text-[10px] text-muted">{d}</p>
                <div className={`mt-1 rounded-xl py-3 ${TONE[t]}`}>
                  <p className="text-[19px] font-extrabold leading-6">{v}</p>
                  <p className="text-[11px]">{h === 'Change' ? '▲' : LABEL[t]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Insights: Structured Case Summary ---------- */

function InsightsScreen() {
  const chips = [
    [AlertTriangle, 'Alerts'], [Activity, 'Vitals'], [Droplet, 'Out Of Range'], [Heart, 'History'],
    [Pill, 'Medication'], [FileText, 'Blood Reports'],
  ]
  const vitals = [
    ['Height', '172', 'cm', ''], ['Weight', '81', 'kg', ''], ['BMI', '27.4', '', 'high'], ['BP', '128/84', 'mmHg', 'low'], ['Pulse', '76', 'bpm', 'ok'],
  ]
  const vitalTone = { high: 'bg-[#FDECEE]', low: 'bg-[#FDF1E1]', ok: 'bg-[#E4F2EF]', '': 'bg-[#F1F6F8]' }
  const vitalNote = { high: 'Overweight', low: 'Elevated', ok: 'Normal' }
  const outOfRange = [
    ['Blood Sugar Fasting', 'Normal 80 – 115 mg/dl', '131'],
    ['HbA1c', 'Normal 0 – 6 %', '7.4'],
    ['LDL Cholesterol', 'Normal 0 – 100 mg/dl', '142'],
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
            <span className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 ${cta}`}><Download className="h-4 w-4" /> Save As PDF</span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-6 py-2.5 text-navy"><Share2 className="h-4 w-4" /> Share</span>
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
      <div className="grid flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-4">
        <div className={card}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E2EEF1] text-teal"><HeartPulse className="h-4 w-4" /></span>
            <p className="text-[16px] font-bold">Vital Trends</p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {vitals.map(([l, v, u, t]) => (
              <div key={l} className={`rounded-xl px-2.5 py-2.5 ${vitalTone[t]}`}>
                <p className="text-[11px] text-muted">{l}</p>
                <p className="text-[18px] font-extrabold leading-6">{v} <span className="text-[10px] font-medium text-muted">{u}</span></p>
                {t ? <p className="text-[10.5px] font-semibold text-navy/70">• {vitalNote[t]}</p> : null}
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDF1E1] text-[#C98A12]"><Droplet className="h-4 w-4" /></span>
              <p className="text-[16px] font-bold">Values Out Of Range</p>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FDF0E6] text-[12px] font-bold text-accent">6</span>
          </div>
          <ul className="mt-2.5 divide-y divide-line">
            {outOfRange.map(([n, r, v]) => (
              <li key={n} className="flex items-center gap-3 py-2">
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold uppercase">{n}</span>
                  <span className="block text-[11.5px] text-muted">{r}</span>
                </span>
                <span className="text-[16px] font-bold text-[#B4232C]">{v}</span>
                <span className="rounded-md bg-[#FDECEE] px-2 py-0.5 text-[11px] font-bold text-[#B4232C]">High</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function HealthOSUploadScreen() {
  return (
    <ScreenCard caption="Reports" height={600}>
      <UploadScreen />
    </ScreenCard>
  )
}

export function HealthOSSmartViewScreen() {
  return (
    <ScreenCard caption="SmartView" height={548}>
      <SmartViewScreen />
    </ScreenCard>
  )
}

export function HealthOSInsightsScreen() {
  return (
    <ScreenCard caption="Insights" height={562}>
      <InsightsScreen />
    </ScreenCard>
  )
}
