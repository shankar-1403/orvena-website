import {
  Activity,
  Globe,
  IdCard,
  Lock,
  Pill,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Syringe,
  Users,
  Droplet,
} from 'lucide-react'
// The hero shows a desktop-style walkthrough. HealthOSTour (phone version) and AppShowcase are kept, unused here.
import HealthOSWalkthrough from '../components/HealthOSWalkthrough'
import {
  HealthOSInsightsScreen,
  HealthOSSmartViewScreen,
  HealthOSUploadScreen,
} from '../components/site/HealthOSScreens'
import { CtaBand, IconCards, Section, Split } from '../components/site/blocks'
import PageHero from '../components/site/PageHero'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import StoreButtons from '../components/ui/StoreButtons'
import { healthosWebUrl } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const badges = [
  { icon: ShieldCheck, text: 'HIPAA Compliant' },
  { icon: Lock, text: 'DPDP Compliant' },
  { icon: Activity, text: 'Readings within 2 hours' },
]

const features = [
  { icon: Droplet, title: 'Blood Reports', text: 'Every test parameter across every report date, viewed as a clean table or trend bar chart against normal ranges.' },
  { icon: ScanLine, title: 'Diagnostic Reports', text: 'X-rays, MRIs, sonography, and ECGs stored in full resolution and sorted by category and date.' },
  { icon: Stethoscope, tone: 'accent', title: 'Doctors & Booking', text: 'Search verified specialists by specialty or area, book live slots, and save your family’s trusted doctors in My Doctors.' },
  { icon: Pill, tone: 'accent', title: 'Prescriptions', text: 'Digital prescriptions from your doctor land directly in your app, complete with medicine history, dosages, and PDFs.' },
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
      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
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
      <div className="relative mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
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

      <Section id="features-rows">
        <div className="space-y-12 lg:space-y-14">
          <Split
            eyebrow="01 · Upload"
            title="Every Report, Read for You"
            lead="Scan a paper report with your phone or upload a PDF. Blood reports are read value by value, usually within 2 hours, and scans like X-rays, ECGs and MRIs are filed by type and date."
            ticks={[
              'Blood reports, radiology and diagnostic reports in one place',
              'Filter by category, year and month',
              'Open the original file any time',
            ]}
            media={<HealthOSUploadScreen />}
          />
          <Split
            reverse
            eyebrow="02 · SmartView"
            title="See What Changed, Not Just Numbers"
            lead="SmartView turns your readings into color-coded cards with the normal range, a Trend Heatmap that compares your previous report with the latest one, and smart alerts for what needs attention."
            ticks={[
              'Red, amber and green against your own lab’s range',
              'Previous vs latest, with report dates and % change',
              'BMI and blood pressure tracked alongside your labs',
              'Personal and family medical history, always in view',
            ]}
            media={<HealthOSSmartViewScreen />}
          />
          <Split
            eyebrow="03 · Insights"
            title="One Page Your Doctor Will Thank You For"
            lead="Insights is a structured case summary: vitals, out-of-range values, personal and family history, allergies, medicines and every blood report, on one page. Share it securely with any doctor or save it as a PDF."
            ticks={[
              'Share by email with any doctor in seconds',
              'Save as a PDF for your visit',
              'Booked an Orvena network doctor? It reaches them automatically',
            ]}
            media={<HealthOSInsightsScreen />}
          />
        </div>
      </Section>

      <Section id="everything" tone="soft">
        <Reveal>
          <SectionHeader eyebrow="Everything in one app" title="Built for the Whole Family’s Care" />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <IconCards items={features} cols="lg:grid-cols-4" surface="bg-white" variant="rule" />
        </div>
      </Section>

      <Section id="privacy">
        <Split
          eyebrow="Privacy"
          title="Your Records Stay Yours"
          lead="HealthOS is built to HIPAA and DPDP standards. Each family profile sees only its own records, you choose who sees your summary, and you can delete your account at any time."
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
