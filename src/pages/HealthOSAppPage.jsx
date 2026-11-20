import {
  Activity,
  BarChart3,
  FolderOpen,
  HeartHandshake,
  Lightbulb,
  Globe,
  IdCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Syringe,
  Users,
  Droplet,
} from 'lucide-react'
import HealthOSWalkthrough from '../components/HealthOSWalkthrough'
import {
  HealthOSInsightsScreen,
  HealthOSSmartViewScreen,
  HealthOSUploadScreen,
} from '../components/site/HealthOSScreens'
import { CtaBand, IconCards, Section, Split } from '../components/site/blocks'
import { PillarOverview, PillarRows } from '../components/site/Pillars'
import PageHero from '../components/site/PageHero'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import StoreButtons from '../components/ui/StoreButtons'
import { SHOW_COMPLIANCE, healthosWebUrl } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const badges = [
  ...(SHOW_COMPLIANCE
    ? [
        { icon: ShieldCheck, text: 'HIPAA Compliant' },
        { icon: Lock, text: 'DPDP Compliant' },
      ]
    : []),
  { icon: Activity, text: 'Readings within 2 hours' },
]

/** A prescription "Rx" mark drawn like a lucide icon, so it sizes and strokes the same way. */
function RxIcon({ strokeWidth = 2, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19V5h4.5a3.5 3.5 0 0 1 0 7H4" />
      <path d="M8 12l3.5 7" />
      <path d="M14.5 13l5.5 6" />
      <path d="M20 13l-5.5 6" />
    </svg>
  )
}

/** Scan corners around a small report sheet, drawn like a lucide icon. */
function ScanReportIcon({ strokeWidth = 2, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M13.5 7H9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9.5Z" />
      <path d="M13.5 7v2.5H16" />
      <path d="M10 12.5h4" />
      <path d="M10 15h2.5" />
    </svg>
  )
}

const features = [
  { icon: Droplet, title: 'Blood Reports', text: 'Every test parameter across every report date, viewed as a clean table or trend bar chart against normal ranges.' },
  { icon: ScanReportIcon, title: 'Diagnostic Reports', text: 'X-rays, MRIs, sonography, and ECGs stored in full resolution and sorted by category and date.' },
  { icon: Stethoscope, tone: 'accent', title: 'Doctors & Booking', text: 'Search verified specialists by specialty or area, book live slots, and save your family’s trusted doctors in My Doctors.' },
  { icon: RxIcon, tone: 'accent', title: 'Prescriptions', text: 'Digital prescriptions from your doctor land directly in your app, complete with medicine history, dosages, and PDFs.' },
  { icon: Syringe, tone: 'teal', title: 'Vaccine Schedule', text: 'Age-by-age immunization tracker for your child from birth, with due-date reminders and digital certificates.' },
  { icon: Users, tone: 'teal', title: 'Family Profiles', text: 'One login for your entire household. Manage dedicated timelines for your spouse, kids, and parents, even from abroad.' },
  { icon: IdCard, title: 'Digital Health ID', text: 'Ready to show at any hospital or lab for seamless, consent-based record linking.' },
  { icon: ShieldCheck, tone: 'accent', title: 'Insurance Vault', text: 'Store every health and life policy, renewal date, and TPA card in one place so you’re never scrambling during an admission.' },
]

const seals = [
  { icon: ShieldCheck, title: 'HIPAA', text: 'Compliant' },
  { icon: Lock, title: 'DPDP', text: 'Compliant' },
]

const strips = [
  { icon: Users, tone: 'bg-gradient-to-br from-accent to-[#f08a3c]', title: 'Isolated', text: 'Profile by profile' },
  { icon: Smartphone, tone: 'bg-gradient-to-br from-[#2a7f96] to-teal', title: 'In your pocket', text: 'Anywhere, on phone or web' },
]

/** The privacy promises as one panel: two compliance seals, then isolation and anywhere access. */
function PrivacyPanel() {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight p-5 text-white shadow-[0_30px_60px_-30px_rgba(2,20,28,0.7)] sm:rounded-[30px] sm:p-7">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
      <ShieldCheck aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/[0.05]" />
      {SHOW_COMPLIANCE ? (
      <div className="relative mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4">
        {seals.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center rounded-[22px] border border-white/10 bg-white/[0.06] px-3 py-6 text-center">
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/25 sm:h-20 sm:w-20">
              <span aria-hidden="true" className="absolute inset-1.5 rounded-full border border-dashed border-mint/40" />
              <Icon className="h-7 w-7 text-mint sm:h-8 sm:w-8" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <p className="mt-4 text-[22px] font-extrabold tracking-tight sm:text-[26px]">{title}</p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> {text}
            </p>
          </div>
        ))}
      </div>
      ) : null}
      <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4">
        {strips.map(({ icon: Icon, tone, title, text }) => (
          <div key={title} className="flex items-center gap-3.5 rounded-[20px] bg-white px-4 py-4 text-navy sm:flex-col sm:items-start sm:gap-3 sm:px-5 xl:flex-row xl:items-center xl:gap-3.5">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white ${tone}`}>
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[16.5px] font-bold tracking-tight">{title}</p>
              <p className="text-[13.5px] leading-5 text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const pillars = [
  { icon: FolderOpen, title: 'Organize', tagline: 'All medical records in one place.', anchor: 'organize' },
  { icon: BarChart3, tone: 'teal', title: 'Track', tagline: 'Monitor health trends over time.', anchor: 'track' },
  { icon: Lightbulb, tone: 'accent', title: 'Understand', tagline: 'Gain meaningful health intelligence.', anchor: 'understand' },
  { icon: HeartHandshake, title: 'Protect', tagline: 'Keep your family’s health journey connected.', anchor: 'everything' },
]

const pillarRows = [
  {
    anchor: 'organize',
    eyebrow: '01 · Organize',
    title: 'Every Report, Read and Filed for You',
    lead: 'Snap a paper report with your phone or upload a PDF. Blood reports are extracted value by value, usually within 2 hours, while scans like X-rays, ECGs, and MRIs are neatly indexed by type and date.',
    ticks: [
      'Blood reports, radiology scans, prescriptions, and discharge summaries in one vault',
      'Filter instantly by family member, category, year, and month',
      'Open and download the original lab PDF anytime',
    ],
    media: <HealthOSUploadScreen />,
  },
  {
    anchor: 'track',
    eyebrow: '02 · Track',
    title: 'See What Changed, Not Just Numbers',
    lead: (
      <>
        SmartView turns static lab sheets into color-coded biomarker cards and a{' '}
        <strong className="font-semibold text-navy">Trend Heatmap</strong> comparing your previous report against your
        latest one, so subtle shifts never go unnoticed.
      </>
    ),
    ticks: [
      'Red, amber, and green indicators benchmarked against your own lab’s reference range',
      'Side-by-side Previous vs. Latest comparison with exact report dates and % change',
      'Track BMI, blood pressure, and vitals alongside your routine blood panels',
      'Allergy alerts, personal history, and family medical history always visible at the top',
    ],
    media: <HealthOSSmartViewScreen />,
  },
  {
    anchor: 'understand',
    eyebrow: '03 · Understand',
    title: 'One Page Your Doctor Will Thank You For',
    lead: (
      <>
        Walk into any clinic prepared. <strong className="font-semibold text-navy">Insights</strong> compiles your
        vitals, out-of-range markers, allergies, active medications, and complete lab history into a structured,
        one-page case summary you can share or save as a PDF in one tap.
      </>
    ),
    ticks: [
      'Share securely via link or email with any specialist in seconds',
      'Save or print as a clean clinical PDF before your OPD visit',
      'Consulting an Orvena network doctor? Your case summary reaches them automatically',
    ],
    media: <HealthOSInsightsScreen />,
  },

]

/** Pillar 04: the 8 feature cards with their header, inside the pillars section. */
function FamilyCare() {
  return (
    <>
      <Reveal>
        <SectionHeader
          eyebrow="04 · Protect"
          title="Built for the Whole Family’s Care"
          description="From your child’s first vaccines to your parents’ chronic care check-ups, keep every generation’s health connected, compliant, and protected under one roof."
        />
      </Reveal>
      <div className="mt-8 sm:mt-10">
        <IconCards items={features} cols="lg:grid-cols-4" surface="bg-white" variant="rule" />
      </div>
    </>
  )
}

export default function HealthOSAppPage() {
  usePageMeta(
    'HealthOS by Orvena | Your Family’s Health, Decoded',
    'Stop digging through paper folders and scattered PDFs. HealthOS reads your blood tests value by value, maps your health trends over time, and puts a doctor-ready summary in your pocket.',
  )

  return (
    <>
      <PageHero
        id="healthos"
        eyebrow="For patients & families • HealthOS"
        title={
          <>
            Your Family’s Health, Decoded. <span className="text-accent">Every Report and Trend in One App.</span>
          </>
        }
        lead="Stop digging through paper folders and scattered PDFs. HealthOS reads your blood tests value by value, maps your health trends over time, and puts a doctor-ready summary in your pocket."
        actions={
          <>
            <Button href={healthosWebUrl} target="_blank" rel="noreferrer" variant="light" className="w-full sm:w-auto">
              Open HealthOS on the Web
            </Button>
            <Button href="#get-app" variant="outline" showArrow={false} className="w-full sm:w-auto">
              Get the App
            </Button>
          </>
        }
        badges={badges}
        visual={<HealthOSWalkthrough />}
      />

      <Section id="how-it-works">
        <PillarOverview
          eyebrow="How HealthOS works"
          title="Four Pillars. One Connected Health Timeline."
          description="Everything you need to move from scattered paper files to proactive, lifelong family care."
          pillars={pillars}
        />
        <div className="mt-16 lg:mt-24">
          <PillarRows rows={pillarRows} />
        </div>
        <div id="everything" className="mt-14 scroll-mt-24 lg:mt-20">
          <FamilyCare />
        </div>
      </Section>

      <Section id="privacy" tone="soft">
        <Split
          eyebrow="Privacy"
          title="Your Records Stay Yours"
          lead={`${SHOW_COMPLIANCE ? 'HealthOS is built to HIPAA and DPDP standards. ' : ''}Each family profile sees only its own records, you choose who sees your summary, and you can delete your account at any time.`}
          media={<PrivacyPanel />}
        />
      </Section>

      <div id="get-app">
        <CtaBand
          title="Get HealthOS"
          text="Available on Android and on the web. The iPhone app is coming soon."
        >
          <StoreButtons tone="dark" className="w-full sm:w-auto" />
          <Button href={healthosWebUrl} target="_blank" rel="noreferrer" variant="outline" showArrow={false} className="w-full sm:w-auto">
            <Globe className="mr-2 h-4 w-4" aria-hidden="true" /> Open on the Web
          </Button>
        </CtaBand>
      </div>
    </>
  )
}
