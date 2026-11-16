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
import { clinicosWebUrl } from '../data/site'
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
  { icon: CalendarDays, title: 'Appointments & OPD', text: 'Weekly OPD schedules by day, slot length, location and contact. In-clinic and video visits with tokens.' },
  { icon: Search, title: 'Patient records', text: 'Search every assigned patient, register new ones and keep their history, vitals and reports together.' },
  { icon: PenLine, tone: 'accent', title: 'Favorites & settings', text: 'Prescription templates, investigation bundles and which test categories show in SmartView.' },
  { icon: Wallet, tone: 'accent', title: 'Billing & wallet', text: 'Bills, receipts, outstanding invoices with payment requests, daily transactions and a doctor wallet.' },
  { icon: BarChart3, tone: 'teal', title: 'Reports & trends', text: 'Monthly consultation trends, appointment history, bill history and in-person vs video share.' },
  { icon: Sparkles, tone: 'teal', title: 'Dynamic cohort reports', text: 'Find patients by lab values, for example everyone with high HbA1c and high LDL, to plan follow-ups.' },
]

const modules = [
  { icon: Users, title: 'Clinic team', text: 'Assistants, front desk and data operators, with roles and permissions.' },
  { icon: Building2, title: 'Hospital (IPD)', text: 'Registration, admission, wards, beds, nursing station, OT and discharge.' },
  { icon: FlaskConical, title: 'Labs & diagnostics', text: 'Lab appointments, radiology reports and turning paper reports into data.' },
  { icon: Pill, tone: 'accent', title: 'Pharmacy', text: 'Chemists, prescription orders, invoices and home delivery.' },
  { icon: Package, tone: 'accent', title: 'Inventory', text: 'Items, vendors, purchase orders, stock movement and reorder alerts.' },
  { icon: ShieldCheck, tone: 'accent', title: 'Insurance & TPA', text: 'TPA agents, insurers and claim forms.' },
  { icon: Briefcase, tone: 'teal', title: 'Corporate wellness', text: 'Health summaries and lifestyle analytics for companies and housing societies.' },
  { icon: Utensils, tone: 'teal', title: 'Nutrition', text: 'Nutritionists, diet plans, dietary recall and nutrition appointments.' },
  { icon: Video, tone: 'teal', title: 'Telemedicine', text: 'Video consultations with history and settings, alongside in-clinic visits.' },
  { icon: IdCard, title: 'ABHA / ABDM', text: 'Create ABHA health IDs and link records to India’s national digital health stack.' },
  { icon: Share2, title: 'Referrals & network', text: 'Refer patients between doctors and work with network partners.' },
  { icon: Syringe, title: 'Vaccination', text: 'Vaccine schedules and a vaccine diary for every child patient.' },
]

const connected = [
  { icon: Upload, title: 'Patient uploads', text: 'Reports read and ready in your SmartView.' },
  { icon: CalendarDays, tone: 'accent', title: 'Patient books', text: 'Summary shared with you on booking.' },
  { icon: PenLine, tone: 'teal', title: 'You prescribe', text: 'Rx delivered straight to the patient’s app.' },
  { icon: Bell, title: 'Follow-up', text: 'Dates and alerts in both apps.' },
]

export default function ClinicOSPage() {
  usePageMeta(
    'ClinicOS by Orvena | The Operating System for Your Practice',
    'Appointments, a smart summary of every patient, prescriptions in a minute, billing and reports, all in one place and connected to your patients’ HealthOS app.',
  )

  return (
    <>
      <PageHero
        id="clinicos"
        eyebrow="ClinicOS, for doctors, clinics and hospitals"
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
            <Button href={clinicosWebUrl} target="_blank" rel="noreferrer" variant="outline" showArrow={false} className="w-full sm:w-auto">
              Doctor Login
            </Button>
          </>
        }
        badges={badges}
        visual={<ClinicOSWindow />}
      />

      <Section id="a-doctors-day">
        <Reveal>
          <SectionHeader eyebrow="A doctor’s day on ClinicOS" title="Less Typing. More Time with Patients." />
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
          <SectionHeader eyebrow="Run your practice" title="Everything a Clinic Needs, Built In" />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <IconCards items={tools} variant="sheen" />
        </div>
      </Section>

      <Section id="platform" tone="soft">
        <Reveal>
          <SectionHeader
            eyebrow="One platform, every setting"
            title="From a Single Clinic to a Full Hospital"
            description="ClinicOS grows with you. The same system runs front desks, wards, labs, pharmacies and corporate wellness programs."
          />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <IconCards items={modules} surface="bg-white" variant="rule" />
        </div>
      </Section>

      <Section id="connected">
        <Split
          eyebrow="Connected to HealthOS"
          title="Your Patients Bring Their Records with Them"
          lead="When a patient books you through HealthOS, their Insights summary is shared with you automatically. The prescription you write appears in their app, so follow-ups, reminders and refills stay on track."
          media={<IconCards items={connected} cols="lg:grid-cols-2" />}
        >
          <div className="mt-6">
            <Button href="/healthos">See HealthOS</Button>
          </div>
        </Split>
      </Section>

      <CtaBand
        title="See ClinicOS in Your Clinic"
        text="Book a demo and we’ll show it with your own OPD schedule and prescription header. Plans and pricing on request."
      >
        <Button href="/contact?topic=clinicos" className="w-full sm:w-auto">
          Book a Demo
        </Button>
        <Button href={clinicosWebUrl} target="_blank" rel="noreferrer" variant="outline" showArrow={false} className="w-full sm:w-auto">
          Doctor Login
        </Button>
      </CtaBand>
    </>
  )
}
