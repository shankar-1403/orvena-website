import {
  Activity,
  BedDouble,
  Briefcase,
  Calculator,
  Eye,
  FlaskConical,
  Gauge,
  HeartPulse,
  MoveVertical,
  Send,
  Share2,
  SlidersHorizontal,
  Stethoscope,
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
  Pill,
  Printer,
  Repeat,
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

const cta = 'bg-gradient-to-r from-[#e0610a] to-[#f08a3c] text-white shadow-[0_8px_18px_-8px_rgba(224,97,10,0.7)]'

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

export function ScreenCard({ caption, width = SCREEN_W, height = SCREEN_H, children }) {
  const [ref, scale] = useFitScale(width)
  return (
    <div className="mx-auto w-full max-w-[580px]">
      <div
        ref={ref}
        aria-hidden="true"
        className="o-plate relative w-full overflow-hidden rounded-[18px] ring-1 ring-white/80 sm:rounded-[22px]"
        style={{ height: height * scale }}
      >
        <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">{caption} · sample data for illustration</p>
    </div>
  )
}

function Metric({ icon: Icon, iconTone, bar, name, add, value, unit, status, statusTone, range, at, chip, chipTone }) {
  return (
    <div className="rounded-xl border-t-[3px] bg-white p-3 ring-1 ring-line" style={{ borderTopColor: bar }}>
      <div className="flex items-center gap-2">
        <span className={`grid h-6 w-6 place-items-center rounded-md ${iconTone}`}><Icon className="h-3.5 w-3.5" /></span>
        <span className="text-[12px] font-medium text-navy/85">{name}</span>
        {add ? <span className="ml-auto rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-[#2F6FD1] ring-1 ring-[#BFD3F2]">+ Add</span> : null}
      </div>
      <p className="mt-2 text-[20px] font-bold leading-6">
        {value} <span className="text-[11px] font-medium text-muted">{unit}</span>
      </p>
      <p className={`text-[11px] font-bold ${statusTone}`}>{status}</p>
      <div className="relative mt-2 h-[3px] rounded-full bg-[#E3E8EC]">
        <span className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${at}%`, background: bar }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
        <span>{range}</span>
        <span className={`rounded px-1 py-0.5 font-semibold ${chipTone}`}>{chip}</span>
      </div>
    </div>
  )
}

function TrendRow({ name, ticks, value }) {
  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)_60px_40px] items-center border-t border-line py-3">
      <span className="flex items-center gap-2 text-[11.5px] font-bold uppercase"><span className="h-2 w-2 rounded-full bg-[#1F9A63]" /> {name}</span>
      <div className="relative px-4">
        <p className="text-center text-[13px] font-bold text-[#1F9A63]">{value}</p>
        <div className="relative mt-1 h-px bg-[#C9D2D8]">
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F9A63]" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-muted">
          {ticks.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      <span className="text-center text-muted">-</span>
      <span className="grid h-7 w-7 place-items-center rounded-md bg-[#EAF2FB] text-[#2F6FD1] ring-1 ring-[#BFD3F2]"><TrendingUp className="h-3.5 w-3.5" /></span>
    </div>
  )
}

function SmartViewScreen() {
  const personal = [
    ['Diabetes', 'Since 1-2 Years', Droplet, 'text-[#C42B3B]'],
    ['Hypertension', 'Since 1-2 Years', HeartPulse, 'text-[#C42B3B]'],
    ['Thyroid problem', '', Activity, 'text-[#C42B3B]'],
    ['Arthritis', '', Activity, 'text-accent'],
    ['Heart Disease', 'Since 2-4 Years', Heart, 'text-[#C42B3B]'],
    ['Osteoporosis', 'Since 2-4 Years', Activity, 'text-[#C42B3B]'],
    ['Cancer', '', AlertTriangle, 'text-[#C42B3B]'],
  ]
  return (
    <main className="grid h-full w-full grid-cols-[minmax(0,1fr)_300px] gap-3 whitespace-nowrap bg-[#F3F5F8] p-3 text-navy">
      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#123F57] to-[#0E3A50] px-4 py-3.5 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-[15px] font-bold ring-2 ring-white/30">YN</span>
          <div>
            <p className="text-[18px] font-bold leading-6">Your Name</p>
            <div className="mt-1 flex gap-1.5 text-[11px] font-semibold">
              {['53.5 yrs', 'Male', 'Blood group B+ve'].map((t) => (
                <span key={t} className="rounded-full bg-white/15 px-2 py-0.5">{t}</span>
              ))}
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <p className="text-[11.5px] text-white/90">Analyzing health action metrics...</p>
            <div className="flex gap-1.5">
              <span className="h-[3px] w-14 rounded-full bg-[#E5484D]" />
              <span className="h-[3px] w-14 rounded-full bg-accent" />
              <span className="h-[3px] w-14 rounded-full bg-[#F0B429]" />
            </div>
            <div className="flex gap-1.5 text-[11.5px] font-semibold">
              <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 ${cta}`}><LayoutGrid className="h-3 w-3" /> Smart View</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-navy"><FileText className="h-3 w-3" /> Rx</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-navy"><FileText className="h-3 w-3" /> Manage</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-l-[3px] border-[#C42B3B] bg-white px-3 py-2 ring-1 ring-line">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#C42B3B]">Allergy alert</p>
          <p className="flex items-center gap-1.5 text-[13px] font-bold"><AlertTriangle className="h-3.5 w-3.5 text-[#C42B3B]" /> Sulpha</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-bold">Out-of-range Metrics</p>
          <p className="text-[11px] text-muted">Tap a card to explore trend</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Metric icon={Calculator} iconTone="bg-[#FFF1E2] text-accent" bar="#E8781C" name="BMI" add value="25.2" unit="BMI · 90 kg" status="Overweight" statusTone="text-accent" range="Healthy 18.5-24.9" at={78} chip="-9.96" chipTone="bg-[#FFF1E2] text-accent" />
          <Metric icon={HeartPulse} iconTone="bg-[#E4F2EF] text-[#1D5E4F]" bar="#1F8A4C" name="Blood pressure" add value="119/80" unit="mmHg" status="Normal" statusTone="text-[#1F8A4C]" range="Systolic below 120" at={80} chip="0/0" chipTone="bg-[#E4F2EF] text-[#1D5E4F]" />
          <Metric icon={Droplet} iconTone="bg-[#FDECEE] text-[#C42B3B]" bar="#D93A44" name="HbA1c" value="8" unit="%" status="Poor control" statusTone="text-[#C42B3B]" range="Normal below 5.7" at={78} chip="New" chipTone="bg-[#FDECEE] text-[#C42B3B]" />
          <Metric icon={FlaskConical} iconTone="bg-[#FFF1E2] text-accent" bar="#E8781C" name="Hemoglobin" value="11" unit="g/dL" status="Low / Anemia" statusTone="text-accent" range="Normal 13.5-17.5" at={70} chip="New" chipTone="bg-[#FFF1E2] text-accent" />
        </div>

        <div className="min-h-0 flex-1 rounded-xl bg-white px-4 py-3 ring-1 ring-line">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#EAF2FB] text-[#2F6FD1]"><TrendingUp className="h-4 w-4" /></span>
            <p className="text-[14px] font-bold">Longitudinal Trend Comparison</p>
            <div className="ml-auto flex items-center gap-3 text-[10.5px] text-muted">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full ring-2 ring-[#2F8FD1]" /> = Previous</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-navy" /> = Latest</span>
              <span className="flex items-center gap-1"><span className="h-2 w-5 rounded-full bg-[#DCEBFA]" /> = Reference range</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[180px_minmax(0,1fr)_60px_40px] pb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
            <span>Metric &amp; reference range</span><span /><span className="text-center">Change</span><span />
          </div>
          <TrendRow name="Blood sugar random" value="140" ticks={['139.8', '139.9', '140', '140.1', '140.2']} />
          <TrendRow name="Blood sugar fasting" value="139" ticks={['138.8', '138.9', '139', '139.1', '139.2']} />
          <TrendRow name="Blood sugar PP" value="200" ticks={['199.8', '199.9', '200', '200.1', '200.2']} />
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-2.5">
        <div className="rounded-xl bg-white p-3 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold">Needs Attention</p>
            <p className="text-[10.5px] font-semibold text-accent">◌ Analyzing...</p>
          </div>
          <div className="mt-2 flex flex-col items-center rounded-lg border border-dashed border-[#F2C9A0] bg-[#FFFBF6] px-3 py-3 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF1E2] text-accent ring-1 ring-[#F2C9A0]"><Stethoscope className="h-4 w-4" /></span>
            <p className="mt-2 text-[12px] font-bold">Data is being analyzed...</p>
            <p className="mt-1 whitespace-normal text-[10px] leading-4 text-muted">Screening patient vitals, diagnostic reports, and medical parameters for clinical attention items.</p>
            <span className="mt-2 h-1 w-3/4 rounded-full bg-[#E3E8EC]" />
            <p className="mt-2 text-[10.5px] font-semibold text-accent">● Evaluating clinical alerts</p>
          </div>
        </div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold">Personal Medical History</p>
            <span className="rounded-md bg-[#EAF2FB] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#2F6FD1]">✎ Add / Edit</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2">
            {personal.map(([n, since, Icon, tone]) => (
              <div key={n}>
                <p className="flex items-center gap-1 text-[11px] font-bold"><Icon className={`h-3 w-3 ${tone}`} /> {n}</p>
                {since ? <p className="pl-4 text-[9.5px] text-muted">{since}</p> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 rounded-xl bg-white p-3 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold">Family Medical History</p>
            <span className="rounded-md bg-[#EAF2FB] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#2F6FD1]">✎ Add / Edit</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg border-l-[3px] border-[#D93A44] bg-white p-2 ring-1 ring-line">
              <p className="text-[12px] font-bold">Mom</p>
              <span className="mt-1.5 inline-block rounded bg-[#D93A44] px-1.5 py-0.5 text-[10px] font-semibold text-white">Osteoporosis</span>
            </div>
            <div className="rounded-lg border-l-[3px] border-[#2F8FD1] bg-white p-2 ring-1 ring-line">
              <p className="text-[12px] font-bold">Dad</p>
              <span className="mt-1.5 inline-block rounded bg-[#4FA8DE] px-1.5 py-0.5 text-[10px] font-semibold text-white">Diabetes</span>
              <span className="mt-1 inline-block rounded bg-[#4FA8DE] px-1.5 py-0.5 text-[10px] font-semibold text-white">Hypertension</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function RxScreen() {
  const vitals = [
    [MoveVertical, 'Height', '189 Cm', null],
    [Gauge, 'Weight', '90 Kg', null],
    [Calculator, 'BMI', '25.2', ['Obese range', 'bg-[#FFF6E0] text-[#8A5A00] ring-[#F2D58A]']],
    [HeartPulse, 'Pulse', '76', ['Normal', 'bg-[#E4F2EF] text-[#1D5E4F] ring-[#BFE0D6]']],
    [Stethoscope, 'BP', '119/80', ['High', 'bg-[#FDECEE] text-[#B4232C] ring-[#F4C7CC]']],
  ]
  const tabs = [
    [Stethoscope, 'Complaint & notes'],
    [Briefcase, 'Diagnosis & Rx', '4'],
    [FlaskConical, 'Investigations'],
    [CalendarDays, 'Follow-up'],
    [BedDouble, 'Discharge Card'],
    [FileText, 'Billing'],
  ]
  const meds = [
    ['DOLO 650', 'TAB · After Breakfast', '1-1-1', '1 day'],
    ['LODOZ 2.5MG', 'TAB · After Breakfast', '1-0-0', '1 Month'],
    ['ZIFI 200', 'TAB · After Food', '0-1-1', '5 days'],
    ['PAN D', 'CAP · Before Breakfast', '1-0-0', '5 days'],
  ]
  return (
    <main className="flex h-full w-full flex-col whitespace-nowrap bg-white text-navy">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold text-white">YN</span>
        <div className="mr-1 min-w-0">
          <p className="text-[14px] font-bold leading-5">Your Name</p>
          <p className="text-[11px] text-muted">UID: HB-XXXXXXX · 53.5 Years / Male</p>
        </div>
        {vitals.map(([Icon, k, v, tag]) => (
          <span
            key={k}
            className={`flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 ring-1 ${tag ? tag[1] : 'bg-white ring-line'}`}
          >
            <Icon className="h-3.5 w-3.5 text-navy/70" />
            <span>
              <span className="block text-[8.5px] font-semibold uppercase tracking-[0.08em] text-muted">{k}</span>
              <span className="block text-[12.5px] font-bold leading-4 text-navy">{v}</span>
            </span>
            {tag ? <span className="rounded px-1 text-[9.5px] font-bold">{tag[0]}</span> : null}
          </span>
        ))}
        <span className="flex items-center gap-1 shrink-0 rounded-lg bg-[#FDECEE] px-1.5 py-2 text-[10.5px] font-bold text-[#B4232C] ring-1 ring-[#F4C7CC]">
          <AlertTriangle className="h-3 w-3" /> Allergies: Sulpha
        </span>
      </div>

      <div className="flex items-center gap-0.5 border-b border-line px-3 py-2.5">
        {tabs.map(([Icon, t, n]) => (
          <span
            key={t}
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold ${
              t === 'Complaint & notes' ? 'text-teal ring-1 ring-teal' : 'text-navy/80'
            }`}
          >
            <Icon className="h-3.5 w-3.5" /> {t}
            {n ? <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1F8A4C] text-[9.5px] text-white">{n}</span> : null}
          </span>
        ))}
        <span className="ml-auto rounded-lg px-3 py-1.5 text-[12px] font-semibold ring-1 ring-line">Cancel</span>
        <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold ${cta}`}>
          <Share2 className="h-3.5 w-3.5" /> Refer This Patient
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[#F7F9FA] px-4 py-3">
        <p className="flex items-center gap-1.5 text-[13px] font-bold"><Eye className="h-3.5 w-3.5 text-teal" /> Prescription preview</p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[11.5px] font-bold text-white">
          <span className="flex items-center justify-center gap-1.5 rounded-md bg-[#0E7A5A] py-1.5"><Repeat className="h-3 w-3" /> Renew/Refill</span>
          <span className="flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#7B4FE0] to-[#9B6BF2] py-1.5"><Send className="h-3 w-3" /> SMS/EMAIL</span>
          <span className="flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#D2520A] to-[#E8681C] py-1.5"><Printer className="h-3 w-3" /> Print</span>
        </div>
        <div className="mt-2 grid grid-cols-[1.15fr_1fr] gap-2 text-[11.5px] font-semibold">
          <span className="flex items-center justify-center gap-1.5 rounded-md bg-[#FFF8E6] py-1.5 text-[#8A5A00] ring-1 ring-[#F2DFA8]"><Star className="h-3 w-3" /> Add to Favourites</span>
          <span className="flex items-center justify-center gap-1.5 rounded-md bg-white py-1.5 text-navy/80 ring-1 ring-line"><SlidersHorizontal className="h-3 w-3" /> Print setup</span>
        </div>

        <div className="mt-3 flex-1 rounded-xl bg-white p-4 ring-1 ring-line">
          <div className="flex items-baseline justify-between border-b border-line pb-2.5">
            <p className="text-[13.5px] font-bold">Your Name <span className="text-[11px] font-medium text-muted">53.5 Years / Male</span></p>
            <p className="text-[11px] text-muted">Date: 18/11/2026 · UID: <span className="font-bold text-teal">HB-XXXXXXX</span></p>
          </div>
          <p className="mt-3 text-[9.5px] font-bold uppercase tracking-[0.12em] text-teal">Diagnosis</p>
          <p className="text-[14px] font-bold uppercase text-[#B4232C]">Acute viral fever</p>
          <p className="mt-3 text-[9.5px] font-bold uppercase tracking-[0.12em] text-teal">Rx (prescribed medication)</p>
          <div className="mt-1 grid grid-cols-[24px_minmax(0,2.4fr)_1fr_0.8fr] border-b border-line py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted">
            <span>#</span><span>Medicine</span><span>Frequency</span><span>Duration</span>
          </div>
          {meds.map(([m, sub, f, d], i) => (
            <div key={m} className="grid grid-cols-[24px_minmax(0,2.4fr)_1fr_0.8fr] items-center border-b border-line py-2 text-[12px]">
              <span className="font-bold text-accent">{i + 1}</span>
              <span>
                <span className="block font-bold uppercase">{m}</span>
                <span className="block text-[10.5px] text-muted">{sub}</span>
              </span>
              <span>{f}</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export function SmartViewCard() {
  return (
    <ScreenCard caption="Patient SmartView" width={1080} height={640}>
      <SmartViewScreen />
    </ScreenCard>
  )
}

export function RxCard() {
  return (
    <ScreenCard caption="Prescription writer" width={1080} height={600}>
      <RxScreen />
    </ScreenCard>
  )
}
