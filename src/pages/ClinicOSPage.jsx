import {
  BarChart3,
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
import { CtaBand, IconCards, Section, Split, Steps } from '../components/site/blocks'
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

const day = [
  { title: 'See your day', text: 'Today’s appointments with token numbers, known conditions and a day-progress bar, plus monthly KPIs.' },
  { title: 'Know the patient', text: 'Open SmartView: every report, out-of-range value, trend, allergy and history on one screen.' },
  { title: 'Prescribe fast', text: 'Diagnosis with ICD-10, medicines, tests and follow-up. Renew the last visit or use a favorite in one click.' },
  { title: 'Close the loop', text: 'The prescription lands in the patient’s HealthOS app, the bill is raised, and the follow-up is set.' },
]

const tools = [
  { icon: CalendarDays, title: 'Appointments & OPD', text: 'Configure multi-location OPD slots, automated token queues, and seamless in-clinic or video consultations.' },
  { icon: Search, title: 'Unified Patient Records', text: 'Instant search across your patient base with rapid walk-in registration, vitals, and longitudinal lab timelines.' },
  { icon: PenLine, tone: 'accent', title: 'Templates & SmartView Setup', text: 'Save specialty Rx templates, lab panels, and priority biomarker views tailored to your practice.' },
  { icon: Wallet, tone: 'accent', title: 'OPD Billing & Doctor Wallet', text: 'One-click invoices, digital receipts, pending-payment tracking, and transparent settlement in your doctor wallet.' },
  { icon: BarChart3, tone: 'teal', title: 'Practice Analytics', text: 'Track monthly patient footfall, revenue trends, and in-clinic vs. teleconsultation performance at a glance.' },
  { icon: Sparkles, tone: 'teal', title: 'Smart Patient Cohorts', text: 'Segment patients by out-of-range markers (e.g., high HbA1c or LDL) to automate chronic disease recalls.' },
]

const modules = [
  { icon: Users, title: 'Clinic Team', text: 'Manage assistants, front-desk staff, and data operators with granular role-based access and permissions.' },
  { icon: Building2, title: 'Hospital (IPD)', text: 'End-to-end inpatient workflows covering registration, admissions, bed management, nursing stations, OT, and discharge.' },
  { icon: FlaskConical, title: 'Labs & Diagnostics', text: 'Schedule lab tests, attach radiology scans, and automatically convert paper reports into structured biomarkers.' },
  { icon: Pill, tone: 'accent', title: 'Pharmacy', text: 'Connect directly with chemists for digital prescription orders, billing invoices, and doorstep medicine delivery.' },
  { icon: Syringe, tone: 'accent', title: 'Vaccination', text: 'Automated immunization schedules and a lifetime digital vaccine diary for every pediatric patient.' },
  { icon: ShieldCheck, tone: 'accent', title: 'Insurance & TPA', text: 'Keep health policies, TPA cards, and renewal dates organized in one place for quick hospital access.' },
  { icon: Briefcase, tone: 'teal', title: 'Corporate Wellness', text: 'Deliver employee health summaries and workforce lifestyle analytics for partner companies and housing societies.' },
  { icon: Utensils, tone: 'teal', title: 'Nutrition', text: 'Integrate clinical nutritionists, custom diet plans, dietary recalls, and follow-up nutrition consults.' },
  { icon: Video, tone: 'teal', title: 'Telemedicine', text: 'Run video consultations with full patient history and custom settings right alongside your in-clinic visits.' },
  { icon: IdCard, title: 'ABHA / ABDM', text: 'Generate ABHA Health IDs and link patient records directly to India’s national digital health stack.' },
  { icon: Share2, title: 'Referrals & Network', text: 'Cross-refer patients between specialists and collaborate seamlessly with empaneled network partners.' },
  { icon: Package, title: 'Inventory', text: 'Track medical consumables, vendors, purchase orders, stock movement, and automated reorder alerts.' },
]

const connected = [
  { icon: Upload, title: 'Patient Uploads', text: 'Paper reports become structured digital records, ready to review in your SmartView.' },
  { icon: CalendarDays, tone: 'accent', title: 'Patient Books', text: 'Their complete, chronological health history reaches you before they walk in.' },
  { icon: PenLine, tone: 'teal', title: 'You Prescribe', text: 'Your validated digital Rx lands directly in their HealthOS app, nothing to lose.' },
  { icon: Bell, title: 'Follow-Up', text: 'Automated review dates and test reminders sync across both apps, never forgotten on paper.' },
]

/** The modules as one board: a navy panel split into cells by hairlines, like plug-in blocks. */
const ringTone = {
  accent: 'text-[#ffb27a] ring-accent/50 bg-accent/15',
  teal: 'text-[#7fd3e3] ring-[#2a9db5]/50 bg-[#2a9db5]/15',
  navy: 'text-white ring-white/30 bg-white/10',
}

function ModuleBoard({ items }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-navy via-[#0d4a5c] to-midnight shadow-[0_30px_60px_-30px_rgba(2,20,28,0.7)] sm:rounded-[30px]">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
      <ul className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, tone = 'navy', title, text }) => (
          <li
            key={title}
            className="group relative flex gap-4 bg-[#0c3b4c] p-5 transition-colors duration-300 hover:bg-[#10495c] sm:p-6"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-4 left-0 w-[3px] origin-center scale-y-0 rounded-r-full bg-accent transition-transform duration-300 group-hover:scale-y-100"
            />
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 transition-transform duration-300 group-hover:-translate-y-0.5 ${ringTone[tone] ?? ringTone.navy}`}>
              <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-[16px] font-bold tracking-tight text-white">{title}</h3>
              <p className="mt-1 text-[13.5px] leading-[22px] text-white/65">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
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

export default function ClinicOSPage() {
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
            <Button href="/contact?topic=clinicos" variant="light" className="w-full sm:w-auto">
              Book a Demo
            </Button>
          </>
        }
        badges={badges}
        visual={<ClinicOSWindow />}
      />

      <Section id="a-doctors-day">
        <Reveal>
          <SectionHeader eyebrow="A doctor’s day on ClinicOS" title="Spend Less Time Typing, More Time with Patients" />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <Steps items={day} />
        </div>
      </Section>

      <Section id="smartview" tone="soft">
        <div className="space-y-12 lg:space-y-14">
          <Split
            eyebrow="Patient SmartView"
            title="The Whole Story Before They Sit Down"
            lead="Reports your patient uploads in HealthOS appear in ClinicOS already read. You see out-of-range metrics, previous vs latest values against the reference range, what needs attention and suggested recommendations."
            ticks={[
              'Allergy alerts at the top',
              'Vitals, blood reports, vaccine diary and referrals in the patient hub',
              'Personal, family, surgical and lifestyle history in one editor',
              'Upload reports, add notes and manage bills from the same screen',
            ]}
            media={<SmartViewCard />}
          />
          <Split
            reverse
            eyebrow="Prescription writer"
            title="A Complete Prescription in a Minute"
            lead="One screen for complaint and clinical notes, diagnosis, medicines, investigations, follow-up, discharge card and billing, printed with your digital signature and your own header."
            ticks={[
              'ICD-10 diagnosis lookup',
              '“Renew last visit” and saved Rx favorites',
              'Favorite investigation bundles and lab referral',
              'Refer the patient to another doctor in one tap',
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
    </>
  )
}
