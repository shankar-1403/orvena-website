import {
  Activity,
  AlertTriangle,
  Bell,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  FileText,
  Heart,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Pencil,
  Pill,
  Printer,
  Repeat,
  Search,
  Settings,
  Star,
  Sun,
  Ticket,
  TrendingUp,
  User,
  Users,
  Video,
} from 'lucide-react'
import { useFitScale } from '../../hooks/useFitScale'

/**
 * Static ClinicOS visuals, styled on the real ClinicOS web app (dashboard greeting card,
 * KPI tiles, today's schedule, teal page headers). Sample data only, no real people.
 */

const TONE = {
  high: 'bg-[#FDECEE] text-[#B4232C]',
  ok: 'bg-[#E4F2EF] text-[#1D5E4F]',
  low: 'bg-[#FDF1E1] text-[#8A5A00]',
}
const cta = 'bg-gradient-to-r from-[#e0610a] to-[#f08a3c] text-white shadow-[0_8px_18px_-8px_rgba(224,97,10,0.7)]'
const head = 'bg-gradient-to-br from-[#2a7f96] via-teal to-[#0d4a5c] text-white'

/* ---------- hero: the real dashboard, drawn at desktop size and scaled to fit ---------- */

// the dashboard is laid out on a fixed 1120 x 700 canvas, then scaled as one piece
const CANVAS_W = 1120
const CANVAS_H = 700

const sideMain = [
  [LayoutGrid, 'Dashboard', null],
  [CalendarDays, 'Appointments', '10'],
  [User, 'Patients', '4'],
]
const sideSupport = [
  [Star, 'Feedback & Reviews'],
  [Ticket, 'Raise a Ticket'],
  [HelpCircle, 'FAQs'],
  [Settings, 'Settings'],
]
const kpiTiles = [
  [Users, 'Total patients', '237', '3.9%', '48 new', 'bg-[#E6F2FB] text-[#2a7fb5]', 'M2 22 L18 19 L30 20 L44 14 L58 15 L78 6'],
  [CalendarDays, 'Appointments', '142', '6.5%', 'This month', 'bg-[#FDF0E6] text-accent', 'M2 21 L16 20 L30 16 L44 17 L60 10 L78 8'],
  [Video, 'Tele-consults', '31', '4%', 'This month', 'bg-[#F1E9FB] text-[#7a4fc4]', 'M2 22 L20 22 L32 17 L46 18 L60 12 L78 9'],
  [Pill, 'Prescriptions', '128', '12.5%', 'This month', 'bg-[#E4F2EF] text-[#1D5E4F]', 'M2 20 L16 18 L30 19 L44 12 L58 11 L78 4'],
]
const daySchedule = [
  ['09:00', 'Patient 1', 'In-clinic · Diabetes review', 'done'],
  ['09:30', 'Patient 2', 'Video · Anemia follow-up', 'done'],
  ['10:00', 'Patient 3', 'In-clinic · Lower back pain', 'now'],
  ['10:30', 'Patient 4', 'Video · BP follow-up', 'join'],
  ['11:00', 'Patient 5', 'In-clinic · Thyroid review', ''],
  ['11:30', 'Patient 6', 'In-clinic · COPD check-up', ''],
  ['12:00', 'Patient 7', 'Video · Gastritis', ''],
]
const bars = [
  ['Jun', 9, 3], ['Jul', 12, 4], ['Aug', 11, 5], ['Sep', 14, 5], ['Oct', 16, 6], ['Nov', 13, 7],
]

function Shell({ active, children }) {
  return (
    <div className="flex h-full w-full bg-[#F3F5F8] text-navy" style={{ fontSize: 14 }}>
      {/* sidebar */}
      <aside className="flex w-[222px] shrink-0 flex-col bg-[#0B2230] text-white/80">
        <div className="flex h-[52px] items-center bg-white px-4">
          <img src="/orvena_logo.webp" alt="" className="h-7 w-auto" />
        </div>
        <ul className="space-y-1 px-3 pt-3">
          {sideMain.map(([Icon, l, n]) => (
            <li
              key={l}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium ${
                l === active ? 'bg-gradient-to-r from-[#3a2a22] to-transparent text-white shadow-[inset_3px_0_0_#e0610a]' : ''
              }`}
            >
              <Icon className={`h-4 w-4 ${l === active ? 'text-accent' : ''}`} />
              <span className="flex-1">{l}</span>
              {n ? <span className="rounded-full bg-white/10 px-2 text-[11px] font-semibold">{n}</span> : null}
            </li>
          ))}
        </ul>
        {['Manage', 'Reports'].map((g) => (
          <p key={g} className="flex items-center justify-between px-6 pt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">
            {g} <ChevronDown className="h-3 w-3" />
          </p>
        ))}
        <p className="px-6 pt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">Support</p>
        <ul className="space-y-0.5 px-3 pt-1.5">
          {sideSupport.map(([Icon, l]) => (
            <li key={l} className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-[13.5px]">
              <Icon className="h-4 w-4" /> {l}
            </li>
          ))}
        </ul>
        <div className="mx-3 mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/20 text-accent">
              <Clock className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-[11px] text-[#5fb8de]">Next reminder</p>
              <p className="text-[13px] font-bold text-white">Ward round · 4:00 PM</p>
            </div>
          </div>
          <p className="mt-2.5 rounded-full bg-white/10 py-1.5 text-center text-[12px] font-semibold text-white">+ Set alarm</p>
        </div>
        <div className="mt-auto px-3 pb-3">
          <div className="grid grid-cols-2 rounded-xl bg-white/5 p-1 text-[12px]">
            <span className="flex items-center justify-center gap-1 py-1.5"><Sun className="h-3 w-3" /> Light</span>
            <span className="flex items-center justify-center gap-1 rounded-lg bg-white/10 py-1.5 font-semibold text-accent"><Moon className="h-3 w-3" /> Dark</span>
          </div>
          <p className="mt-3 flex items-center gap-2 px-2 text-[13px]"><LogOut className="h-3.5 w-3.5" /> Logout</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line bg-white px-5">
          <Menu className="h-5 w-5" />
          <span className="text-[13px] text-muted">Your Clinic</span>
          <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F7] px-3.5 py-1.5 text-[13px] font-semibold">
            <CalendarDays className="h-3.5 w-3.5 text-teal" /> Overview for Monday, 16 November
          </span>
          {[Clock, Bell, MessageSquare, Settings].map((Icon, i) => (
            <span key={i} className="relative grid h-8 w-8 place-items-center rounded-full ring-1 ring-line">
              <Icon className="h-3.5 w-3.5" />
              {i === 1 ? <i className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#e5484d]" /> : null}
            </span>
          ))}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-[12px] font-bold text-white">DR</span>
          <span className="leading-4">
            <span className="block text-[13px] font-bold">Doctor</span>
            <span className="block text-[11px] text-muted">General Physician</span>
          </span>
        </header>

        {children}
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <Shell active="Dashboard">
        <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] gap-4 p-4">
          <div className="flex min-w-0 flex-col gap-4">
            {/* greeting */}
            <section className="flex gap-4 rounded-2xl bg-gradient-to-br from-[#0f4c5f] via-[#0d3f50] to-[#0b2f3d] p-5 text-white">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px]">
                  <Clock className="h-3 w-3 text-[#ffb27a]" /> Monday, 16 November 2026
                </span>
                <p className="mt-3 text-[24px] font-bold">Good Morning, Doctor</p>
                <p className="text-[13px] text-white/70">8 appointments scheduled today</p>
                <div className="mt-auto pt-6">
                  <div className="flex justify-between text-[12px] text-white/75"><span>Day progress</span><span>3 of 8</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/12">
                    <span className="block h-full w-[38%] rounded-full bg-gradient-to-r from-accent to-[#f08a3c]" />
                  </div>
                </div>
              </div>
              <div className="w-[230px] shrink-0 rounded-xl bg-white p-4 text-center text-navy">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#F1F5F7] text-teal">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <p className="mt-2 text-[15px] font-bold">Next: Patient 4</p>
                <p className="mt-1 text-[12px] text-muted">Video consult at 10:30 AM, BP follow-up</p>
                <p className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-[12px] font-semibold">
                  <CalendarDays className="h-3.5 w-3.5" /> View Full Schedule
                </p>
              </div>
            </section>

            {/* KPIs */}
            <section className="grid grid-cols-4 gap-3">
              {kpiTiles.map(([Icon, l, v, g, sub, tone, d]) => (
                <div key={l} className="rounded-xl bg-white p-3.5 ring-1 ring-line">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></span>
                    <span className="shrink-0 rounded-md bg-[#E4F2EF] px-1.5 py-0.5 text-[11px] font-bold text-[#1F8A4C]">▲ {g}</span>
                  </div>
                  <p className="mt-2 truncate text-[12px] text-navy/80">{l}</p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <p className="text-[24px] font-extrabold leading-7">{v}</p>
                    <svg viewBox="0 0 80 26" className="h-7 w-16 shrink-0"><path d={d} fill="none" stroke="#2a9db5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="text-[11px] text-muted">{sub}</p>
                </div>
              ))}
            </section>

            {/* consultations chart */}
            <section className="flex min-h-0 flex-1 flex-col rounded-2xl bg-white p-4 ring-1 ring-line">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[16px] font-bold">Consultations</p>
                  <p className="text-[12px] text-muted">In-person vs video · Jun – Nov</p>
                  <p className="mt-1.5 flex gap-3 text-[12px]">
                    <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-teal" /> In-person</span>
                    <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-accent" /> Video</span>
                  </p>
                </div>
                <div className="flex gap-5 text-right">
                  <div><p className="text-[11px] text-muted">Total</p><p className="text-[16px] font-bold">106</p></div>
                  <div><p className="text-[11px] text-muted">Video share, Nov</p><p className="text-[16px] font-bold">35%</p></div>
                </div>
              </div>
              <div className="mt-3 flex min-h-0 flex-1 items-end justify-around gap-4 border-b border-line px-4">
                {bars.map(([m, a, b]) => (
                  <div key={m} className="flex h-full flex-1 flex-col items-center justify-end">
                    <div className="flex w-full max-w-[56px] flex-col justify-end overflow-hidden rounded-t-md" style={{ height: `${(a + b) * 4.2}%` }}>
                      <span className="block bg-accent/85" style={{ flex: b }} />
                      <span className="block bg-teal" style={{ flex: a }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-around px-4 pt-1.5 text-[11px] text-muted">
                {bars.map(([m]) => <span key={m} className="flex-1 text-center">{m}</span>)}
              </div>
            </section>
          </div>

          {/* today's schedule */}
          <section className="flex min-h-0 flex-col rounded-2xl bg-white p-4 ring-1 ring-line">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[16px] font-bold">Today’s Schedule</p>
                <p className="text-[12px] text-muted">8 appointments</p>
              </div>
              <div className="flex gap-1.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-line"><ChevronLeft className="h-3.5 w-3.5" /></span>
                <span className="grid h-7 w-7 place-items-center rounded-lg ring-1 ring-line"><ChevronRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
            <ul className="mt-3 flex-1 space-y-1">
              {daySchedule.map(([t, n, m, s]) => (
                <li key={t}>
                  {s === 'now' ? (
                    <div className="my-1 flex items-center gap-2 text-[11px] font-bold text-accent">
                      10:12 <span className="h-px flex-1 bg-accent" />
                    </div>
                  ) : null}
                  <div className={`flex items-center gap-3 rounded-xl px-2.5 py-2 ${s === 'now' ? 'bg-[#EAF5FB] ring-1 ring-[#bfe0f0]' : ''}`}>
                    <span className="w-11 shrink-0 text-[13px] text-navy/70">{t}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-bold">{n}</span>
                      <span className="block truncate text-[11.5px] text-muted">{m}</span>
                    </span>
                    {s === 'done' ? (
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1F8A4C] text-[10px] text-white">✓</span>
                    ) : s === 'join' ? (
                      <span className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] font-bold ${cta}`}><Video className="h-3 w-3" /> Join</span>
                    ) : s === 'now' ? (
                      <span className="shrink-0 text-[11.5px] font-semibold text-[#2a7fb5]">• 12 min</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-line pt-2.5 text-[12px]">
              <span className="text-muted">+ 1 more today, after lunch</span>
              <span className="font-semibold text-teal">Open scheduler →</span>
            </div>
          </section>
        </main>
    </Shell>
  )
}

export function ClinicOSWindow() {
  const [ref, scale] = useFitScale(CANVAS_W)
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-[110px]"
      />
      <div className="relative rounded-[22px] border border-white/20 bg-white/10 p-1.5 shadow-[0_50px_90px_-36px_rgba(2,20,28,0.85)] backdrop-blur-md sm:rounded-[26px] sm:p-2">
        <div className="flex items-center gap-2 px-2.5 pb-1.5 pt-0.5">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-mint" />
          </span>
          <p className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-white/60">clinicos.orvenahealth.com</p>
          <span className="w-[30px]" />
        </div>
        <div ref={ref} aria-hidden="true" className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px]" style={{ height: CANVAS_H * scale }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})` }}>
            <Dashboard />
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-white/55">ClinicOS dashboard · sample data for illustration</p>
    </div>
  )
}

/* ---------- zigzag: the same app window, on a light background ---------- */

// just the screen content (no sidebar, top bar or window frame), on its own canvas
const SCREEN_W = 900
const SCREEN_H = 610

export function ScreenCard({ caption, height = SCREEN_H, children }) {
  const [ref, scale] = useFitScale(SCREEN_W)
  return (
    <div className="mx-auto w-full max-w-[580px]">
      <div
        ref={ref}
        aria-hidden="true"
        className="o-plate relative w-full overflow-hidden rounded-[18px] ring-1 ring-white/80 sm:rounded-[22px]"
        style={{ height: height * scale }}
      >
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: SCREEN_W, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">{caption} · sample data for illustration</p>
    </div>
  )
}

/** The teal page header ClinicOS shows at the top of a screen. */
function PageBar({ icon: Icon, title, sub, children }) {
  return (
    <div className={`flex items-center gap-3.5 rounded-2xl px-5 py-4 ${head}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[20px] font-bold leading-6">{title}</p>
        <p className="text-[13px] text-white/75">{sub}</p>
      </div>
      {children}
    </div>
  )
}

function Vital({ icon: Icon, name, value, unit, state, range, from, to, at }) {
  const dot = state === 'high' ? 'border-[#B4232C]' : state === 'low' ? 'border-[#C98A12]' : 'border-[#1F8A4C]'
  const label = state === 'high' ? 'High' : state === 'low' ? 'Low' : 'Normal'
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FDECEE] text-[#B4232C]"><Icon className="h-4 w-4" /></span>
        <span className="text-[14px] font-medium text-navy/80">{name}</span>
        <span className="ml-auto grid h-7 w-7 place-items-center rounded-full ring-1 ring-line text-teal"><Pencil className="h-3.5 w-3.5" /></span>
      </div>
      <p className="mt-2 text-[26px] font-extrabold leading-8">
        {value} <span className="text-[12px] font-medium text-muted">{unit}</span>
      </p>
      <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[12px] font-bold ${TONE[state]}`}>{label}</span>
      <div className="relative mt-3 h-1.5 rounded-full bg-soft">
        <span className="absolute inset-y-0 rounded-full bg-[#7CC79A]" style={{ left: `${from}%`, width: `${to - from}%` }} />
        <span className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${dot}`} style={{ left: `${at}%` }} />
      </div>
      <p className="mt-2 text-[12px] text-muted">{range}</p>
    </div>
  )
}

function SmartViewScreen() {
  const attention = ['Uncontrolled diabetes', 'BP above target', 'Low HDL cholesterol', 'Overweight, BMI 27.4']
  const trend = [
    ['Previous', '08 May', '132', 'high'],
    ['Latest', '16 Oct', '148', 'high'],
    ['Change', '', '▲ 12.1%', 'high'],
  ]
  return (
    <main className="flex h-full w-full flex-col gap-3.5 bg-[#F3F5F8] p-4 text-navy">
        <PageBar icon={Activity} title="Patient 1" sub="HB-XXXXXXX · 52 yrs · Male · Blood B+ve">
          {['Vitals', 'Reports', 'History'].map((b) => (
            <span key={b} className="rounded-lg bg-white/12 px-3 py-1.5 text-[13px] font-semibold ring-1 ring-white/20">{b}</span>
          ))}
          <span className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[13px] font-semibold ${cta}`}><FileText className="h-3.5 w-3.5" /> Write Rx</span>
        </PageBar>
        <div className="flex items-center gap-3 rounded-xl border-l-4 border-[#C42B3B] bg-white px-4 py-2.5 ring-1 ring-line">
          <AlertTriangle className="h-4 w-4 text-[#C42B3B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C42B3B]">Allergy alert</span>
          <span className="text-[15px] font-bold">Penicillin</span>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] gap-3.5">
          <div className="flex min-w-0 flex-col gap-3.5">
            <div className="grid grid-cols-3 gap-3">
              <Vital icon={Heart} name="BP" value="148/92" unit="mmHg" state="high" range="Normal 90–120" from={20} to={50} at={74} />
              <Vital icon={Droplet} name="HbA1c" value="7.8" unit="%" state="high" range="Normal 0–6" from={4} to={42} at={66} />
              <Vital icon={Activity} name="Hemoglobin" value="14.1" unit="gm %" state="ok" range="Normal 13.5–18" from={22} to={72} at={40} />
            </div>
            <div className="flex-1 rounded-2xl bg-white p-4 ring-1 ring-line">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#2a7f96] to-navy text-white"><TrendingUp className="h-4 w-4" /></span>
                <div>
                  <p className="text-[16px] font-bold">Trend Heatmap</p>
                  <p className="text-[12px] text-muted">Previous report compared with the latest</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] font-extrabold uppercase">Blood Sugar Fasting <span className="font-medium normal-case text-muted">80–115 mg/dl</span></p>
              <div className="mt-2 grid grid-cols-3 gap-2.5 text-center">
                {trend.map(([h, d, v, t]) => (
                  <div key={h}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-navy/70">{h}</p>
                    <p className="h-4 text-[11px] text-muted">{d}</p>
                    <div className={`mt-1 rounded-xl py-3 ${TONE[t]}`}>
                      <p className="text-[20px] font-extrabold leading-6">{v}</p>
                      <p className="text-[11px]">{h === 'Change' ? 'since last' : 'High'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex min-h-0 flex-col rounded-2xl bg-white p-4 ring-1 ring-line">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-bold">Needs Attention</p>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FDF0E6] text-[12px] font-bold text-accent">{attention.length}</span>
            </div>
            <ul className="mt-3 space-y-2">
              {attention.map((a) => (
                <li key={a} className="flex items-center gap-2.5 rounded-xl border-l-[3px] border-[#C42B3B] bg-[#FDF3F4] px-3 py-2.5 text-[13.5px] font-medium">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#C42B3B] text-[10px] font-bold text-[#C42B3B]">!</span>
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-3 text-[16px] font-bold">Personal History</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Diabetes · 6 yrs', 'Hypertension · 3 yrs'].map((h) => (
                <span key={h} className="rounded-full bg-[#F1F5F7] px-2.5 py-1 text-[12px] font-medium">{h}</span>
              ))}
            </div>
          </div>
        </div>
    </main>
  )
}

function RxScreen() {
  const meds = [
    ['Tab. Sample Medicine A 500 mg', '1-0-1', 'After food', '30 days'],
    ['Tab. Sample Medicine B 5 mg', '0-0-1', 'After food', '30 days'],
    ['Cap. Sample Supplement', '1-0-0', 'Before food', '15 days'],
  ]
  return (
    <main className="flex h-full w-full flex-col gap-3.5 bg-[#F3F5F8] p-4 text-navy">
        <PageBar icon={FileText} title="Prescription" sub="Patient 1 · HB-XXXXXXX · 16/11/2026">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy"><Repeat className="h-3.5 w-3.5" /> Renew last visit</span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/12 px-3.5 py-1.5 text-[13px] font-semibold ring-1 ring-white/20"><Star className="h-3.5 w-3.5" /> Favorite Rx</span>
        </PageBar>
        <div className="flex gap-2">
          {['Complaint & Notes', 'Diagnosis & Rx', 'Investigations', 'Follow-up', 'Discharge Card', 'Billing'].map((t) => (
            <span key={t} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${t === 'Diagnosis & Rx' ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}>{t}</span>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_280px] gap-3.5">
          <div className="flex min-w-0 flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[12px] font-medium text-muted">Chief complaint</p>
                <p className="mt-1 rounded-lg border border-line bg-[#F4F8FA] px-3 py-2.5 text-[13.5px]">Frequent thirst, tiredness for 3 weeks</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-muted">Diagnosis (ICD-10)</p>
                <p className="mt-1 flex items-center gap-2 rounded-lg border border-teal/50 bg-white px-3 py-2.5 text-[13.5px] ring-2 ring-teal/10">
                  <Search className="h-3.5 w-3.5 text-teal" /> E11.9 · Type 2 diabetes mellitus
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-bold">Medicines</p>
                <span className="text-[12.5px] font-semibold text-teal">+ Add medicine</span>
              </div>
              <div className="mt-2 overflow-hidden rounded-xl ring-1 ring-line">
                <div className="grid grid-cols-[minmax(0,2.2fr)_0.8fr_1fr_0.8fr] bg-[#F1F5F7] px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-navy/70">
                  <span>Medicine</span><span>Dose</span><span>When</span><span>Duration</span>
                </div>
                {meds.map(([m, d, w, t]) => (
                  <div key={m} className="grid grid-cols-[minmax(0,2.2fr)_0.8fr_1fr_0.8fr] items-center border-t border-line px-3 py-2.5 text-[13.5px]">
                    <span className="flex items-center gap-2 truncate font-medium"><Pill className="h-3.5 w-3.5 shrink-0 text-teal" /> {m}</span>
                    <span><span className="rounded-md bg-[#E6F2FB] px-1.5 py-0.5 text-[12px] font-bold text-[#2a7fb5]">{d}</span></span>
                    <span className="text-muted">{w}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-bold">Investigations</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['HbA1c', 'Lipid profile', 'Kidney function', 'Urine routine'].map((t) => (
                  <span key={t} className="rounded-full bg-[#E4F2EF] px-3 py-1 text-[12.5px] font-semibold text-[#1D5E4F]">✓ {t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-3">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <p className="text-[14px] font-bold">Follow-up</p>
              <p className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-[#F4F8FA] px-3 py-2.5 text-[13.5px]">
                <CalendarDays className="h-3.5 w-3.5 text-teal" /> 16/12/2026
              </p>
              <p className="mt-3 text-[12px] font-medium text-muted">Advice</p>
              <p className="mt-1 text-[13px] leading-5">Walk 30 minutes daily. Avoid sugary drinks. Repeat HbA1c in 3 months.</p>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <p className="text-[12px] font-medium text-muted">Sends to</p>
              <p className="mt-1 text-[14px] font-bold">Patient’s HealthOS app</p>
              <p className="mt-1 text-[12px] text-muted">With your digital signature and header</p>
            </div>
            <span className={`mt-auto flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold ${cta}`}>
              <Printer className="h-4 w-4" /> Save & Print
            </span>
          </div>
        </div>
    </main>
  )
}

export function SmartViewCard() {
  return (
    <ScreenCard caption="Patient SmartView">
      <SmartViewScreen />
    </ScreenCard>
  )
}

export function RxCard() {
  return (
    <ScreenCard caption="Prescription writer">
      <RxScreen />
    </ScreenCard>
  )
}
