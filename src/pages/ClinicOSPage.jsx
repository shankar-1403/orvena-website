import {
  BarChart3,
  Brain,
  LayoutDashboard,
  Mic,
  TrendingUp,
  Bell,
  Briefcase,
  Building2,
  CalendarDays,
  FlaskConical,
  IdCard,
  Link2,
  FileText,
  Package,
  PenLine,
  Pill,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Syringe,
  Upload,
  Users,
  Utensils,
  Video,
  Wallet,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import DemoModal from '../components/site/DemoModal'
import { CtaBand, IconCards, Section, Split } from '../components/site/blocks'
import { PillarOverview } from '../components/site/Pillars'
import { ClinicOSWindow, RxCard, SmartViewCard } from '../components/site/ClinicOSVisuals'
import PageHero from '../components/site/PageHero'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { usePageMeta } from '../hooks/usePageMeta'

const badges = [
  { icon: FileText, text: 'ICD-10 coding' },
  { icon: Link2, text: 'Connected to HealthOS' },
  { icon: IdCard, text: 'ABHA / ABDM ready' },
]

const tools = [
  { icon: CalendarDays, title: 'Appointments & OPD', text: 'Configure multi-location OPD slots, automated token queues, and seamless in-clinic or video consultations.' },
  { icon: Search, title: 'Unified Patient Records', text: 'Instant search across your patient base with rapid walk-in registration, vitals, and longitudinal lab timelines.' },
  { icon: PenLine, tone: 'accent', title: 'Templates & SmartView Setup', text: 'Save specialty Rx templates, lab panels, and priority biomarker views tailored to your practice.' },
  { icon: Wallet, tone: 'accent', title: 'OPD Billing', text: 'One-click invoices, digital receipts, pending-payment tracking, and transparent settlement.' },
  { icon: BarChart3, tone: 'teal', title: 'Practice Analytics', text: 'Track monthly patient footfall, revenue trends, and in-clinic vs. teleconsultation performance at a glance.' },
  { icon: Sparkles, tone: 'teal', title: 'Smart Patient Cohorts', text: 'Segment patients by out-of-range markers (e.g., high HbA1c or LDL) to automate chronic disease recalls.' },
]

const modules = [
  { icon: Users, title: 'Clinic Team', text: 'Manage assistants, front-desk staff, and data operators with granular role-based access and permissions.' },
  { icon: Building2, title: 'Hospital (IPD)', text: 'End-to-end inpatient workflows covering registration, admissions, bed management, nursing stations, OT, and discharge.' },
  { icon: FlaskConical, title: 'Labs & Diagnostics', text: 'Schedule lab tests, attach radiology scans, and automatically convert paper reports into structured biomarkers.' },
  { icon: Pill, tone: 'accent', title: 'Pharmacy', text: 'Connect directly with chemists for digital prescription orders, billing invoices, and doorstep medicine delivery.' },
  { icon: Syringe, tone: 'accent', title: 'Vaccination', text: 'Automated immunization schedules and a lifetime digital vaccine diary for every pediatric patient.' },
  { icon: Utensils, tone: 'teal', title: 'Nutrition', text: 'Integrate clinical nutritionists, custom diet plans, dietary recalls, and follow-up nutrition consults.' },
  { icon: Video, tone: 'teal', title: 'Telemedicine', text: 'Run video consultations with full patient history and custom settings right alongside your in-clinic visits.' },
  { icon: Briefcase, tone: 'teal', title: 'Corporate Wellness', text: 'Deliver employee health summaries and workforce lifestyle analytics for partner companies and housing societies.' },
  { icon: Share2, title: 'Referrals & Network', text: 'Cross-refer patients between specialists and collaborate seamlessly with empaneled network partners.' },
  { icon: IdCard, title: 'ABHA / ABDM', text: 'Generate ABHA Health IDs and link patient records directly to India’s national digital health stack.' },
  { icon: ShieldCheck, tone: 'accent', title: 'Insurance & TPA', text: 'Keep health policies, TPA cards, and renewal dates organized in one place for quick hospital access.' },
  { icon: Package, title: 'Inventory', text: 'Track medical consumables, vendors, purchase orders, stock movement, and automated reorder alerts.' },
]

const connected = [
  { icon: Upload, title: 'Patient Uploads', text: 'Paper reports become structured digital records, ready to review in your SmartView.' },
  { icon: CalendarDays, tone: 'accent', title: 'Patient Books', text: 'Their complete, chronological health history reaches you before they walk in.' },
  { icon: PenLine, tone: 'teal', title: 'You Prescribe', text: 'Your validated digital Rx lands directly in their HealthOS app, nothing to lose.' },
  { icon: Bell, title: 'Follow-Up', text: 'Automated review dates and test reminders sync across both apps, never forgotten on paper.' },
]

/**
 * The modules as an open ruled index: same 3-column order as before, no boxes. Hairlines
 * separate the rows, and a colored rule sweeps across the top of a module on hover.
 */
const softTone = {
  accent: 'bg-accent/10 text-accent',
  teal: 'bg-teal/10 text-teal',
  navy: 'bg-navy/[0.07] text-navy',
}
const sweepTone = { accent: 'bg-accent', teal: 'bg-teal', navy: 'bg-navy' }

function ModuleBoard({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
      {items.map(({ icon: Icon, tone = 'navy', title, text }, i) => (
        <li key={title} className="group relative border-t border-navy/15 py-6 sm:py-7">
          <span
            aria-hidden="true"
            className={`absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${sweepTone[tone]}`}
          />
          <Reveal delay={0.04 * (i % 3)} className="flex gap-4">
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 ${softTone[tone]}`}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold tracking-tight text-navy">{title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-[22px] text-muted">{text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

/** The patient-doctor loop as one path: each step sits on a line from upload to follow-up. */
const nodeTone = {
  accent: 'bg-gradient-to-br from-accent to-[#f08a3c]',
  teal: 'bg-gradient-to-br from-[#2a7f96] to-teal',
  navy: 'bg-gradient-to-br from-teal to-navy',
}

function ConnectedFlow({ items }) {
  return (
    <div className="o-plate relative rounded-[26px] border border-white/80 bg-white p-5 sm:rounded-[30px] sm:p-7">
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-[23px] top-7 w-[2px] rounded-full bg-gradient-to-b from-teal via-[#2a9db5] to-accent"
        />
        {items.map(({ icon: Icon, tone = 'navy', title, text }, i) => (
          <li key={title} className={`group relative flex gap-4 sm:gap-5 ${i ? 'mt-3' : ''}`}>
            <span
              className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ring-4 ring-white shadow-[0_10px_20px_-10px_rgba(11,65,86,0.6)] transition-transform duration-300 group-hover:-rotate-6 ${nodeTone[tone] ?? nodeTone.navy}`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 rounded-2xl px-4 py-3 transition-colors duration-300 group-hover:bg-pale">
              <h3 className="text-[16.5px] font-bold tracking-tight text-navy">{title}</h3>
              <p className="mt-1 text-[14px] leading-6 text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

const pillars = [
  {
    icon: Brain,
    title: 'Synthesize',
    tagline: 'Know the Patient Before the Consultation.',
    text: 'Get a comprehensive view of the patient’s medical history before every consultation. Hospital records, laboratory reports, diagnostic scans and prescriptions are organized chronologically, with abnormal results highlighted for quicker clinical review.',
  },
  {
    icon: Mic,
    tone: 'accent',
    title: 'Prescribe',
    tagline: 'Effortless Documentation. Smarter Prescriptions.',
    text: 'Create comprehensive clinical notes effortlessly through voice dictation or typing. Generate accurate, structured prescriptions instantly using intelligent templates, allowing doctors to focus more on patient care and less on documentation.',
  },
  {
    icon: LayoutDashboard,
    tone: 'teal',
    title: 'Operate',
    tagline: 'Your Entire Practice. One Connected Platform.',
    text: 'Manage appointments, patient records, billing, digital payments and diagnostic orders through one seamless workflow. Connect with hospitals, laboratories and pharmacies without switching between multiple applications.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    tagline: 'Build a Smarter, More Connected Practice.',
    text: 'Strengthen patient engagement and create opportunities for practice growth through automated follow-up reminders, diagnostic re-test notifications and second-opinion referral services.',
  },
]

export default function ClinicOSPage() {
  const [demoOpen, setDemoOpen] = useState(false)
  const closeDemo = useCallback(() => setDemoOpen(false), [])
  usePageMeta(
    'ClinicOS by Orvena | The Operating System for Your Practice',
    'Appointments, a smart summary of every patient, prescriptions in a minute, billing and reports, all in one place and connected to your patients’ HealthOS app.',
  )

  return (
    <>
      <PageHero
        id="clinicos"
        eyebrow="ClinicOS for doctors, clinics and hospitals"
        title={
          <>
            The Operating System <span className="text-accent">for Your Practice.</span>
          </>
        }
        lead="Appointments, a smart summary of every patient, prescriptions in a minute, billing and reports, all in one place and connected to your patients’ HealthOS app."
        actions={
          <>
            <Button as="button" onClick={() => setDemoOpen(true)} variant="light" className="w-full sm:w-auto">
              Book a Demo
            </Button>
          </>
        }
        badges={badges}
        visual={<ClinicOSWindow />}
      />

      <Section id="four-pillars">
        <PillarOverview
          eyebrow="How ClinicOS works"
          title="Four Pillars. One Intelligent Practice."
          description="Designed around the way doctors actually work, ClinicOS brings clinical intelligence, effortless documentation and practice management together, so you can spend less time on administrative tasks and more time focusing on your patients."
          pillars={pillars}
        />
      </Section>

      <Section id="smartview" tone="soft">
        <div className="space-y-12 lg:space-y-14">
          <Split
            eyebrow="Patient SmartView"
            title="Complete Clinical Context Before the Consult Begins"
            lead="Every report your patient uploads in HealthOS lands in ClinicOS structured and organized. Review out-of-range biomarkers, percentage changes since the last visit, and priority risk flags in seconds."
            ticks={[
              'High visibility allergy alerts anchored at the top of every chart',
              'Longitudinal vitals, blood tests, immunization records, and referrals in one hub',
              'Structured personal, family, surgical, and lifestyle history in one editor',
              'Upload reports, dictate notes, and settle OPD billing from a single screen',
            ]}
            media={<SmartViewCard />}
          />
          <Split
            reverse
            eyebrow="Prescription writer"
            title="A Complete Prescription in Under a Minute"
            lead="Capture complaints, ICD-10 diagnosis, medications, lab orders, and follow-up dates from a single screen. Print on your custom letterhead with your digital signature or sync directly to the patient’s HealthOS timeline."
            ticks={[
              'Instant ICD-10 diagnosis lookup',
              'One click “Renew last visit” and saved specialty Rx templates',
              'Favorite investigation bundles with direct partner lab referrals',
              'Refer patients to specialist colleagues in a single tap',
            ]}
            media={<RxCard />}
          />
        </div>
      </Section>

      <Section id="practice-tools">
        <Reveal>
          <SectionHeader eyebrow="Run your practice" title="Run Your Entire OPD From One Dashboard" />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <IconCards items={tools} variant="sheen" />
        </div>
      </Section>

      <Section id="platform" tone="soft">
        <Reveal>
          <SectionHeader
            eyebrow="One platform, every setting"
            title="From a Solo Clinic to a Multi-Specialty Hospital"
            description="ClinicOS scales seamlessly with your practice, powering front desks, inpatient wards, diagnostic labs, pharmacies, and corporate health programs on a single unified system."
          />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <ModuleBoard items={modules} />
        </div>
      </Section>

      <Section id="connected">
        <Split
          eyebrow="Connected to HealthOS"
          title="No More Paper Files. Every Report Arrives Digital."
          lead="Patients no longer need to carry bulky folders or scroll through phone photos during consultations. Reports uploaded in HealthOS arrive in ClinicOS pre-structured and sorted by date, and your digital prescription flows right back to them."
          ticks={[
            'Zero paper files to store, search, or misplace',
            'Every past report and lab trend visible on one screen',
            'Prescriptions delivered digitally, never lost on paper',
          ]}
          media={<ConnectedFlow items={connected} />}
        >
          <div className="mt-6">
            <Button href="/healthos">See HealthOS</Button>
          </div>
        </Split>
      </Section>

      <CtaBand
        title="Experience ClinicOS With Your Own OPD Workflow"
        text="Schedule a live walkthrough set up with your clinic timings and custom Rx header. Flexible plans for solo clinics and multi-specialty hospitals."
      >
        <Button href="/contact?topic=clinicos" className="w-full sm:w-auto">
          Schedule Live Demo
        </Button>
      </CtaBand>
      <DemoModal open={demoOpen} onClose={closeDemo} />
    </>
  )
}
