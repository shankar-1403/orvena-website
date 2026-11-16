import {
  Activity,
  Globe,
  IdCard,
  Lock,
  Pill,
  Repeat,
  ScanLine,
  ShieldCheck,
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
  { icon: Droplet, title: 'Blood Reports', text: 'Every test across every report date, as a table or a bar chart against the normal range.' },
  { icon: ScanLine, title: 'Diagnostic Reports', text: 'X-rays, scans and other reports, sorted by category and date.' },
  { icon: Stethoscope, tone: 'accent', title: 'Doctors & Booking', text: 'Find doctors by specialty or area, book live slots and keep your favorites in My Doctors.' },
  { icon: Pill, tone: 'accent', title: 'Prescriptions', text: 'Prescriptions from your doctor arrive in the app, with medicine history and PDFs.' },
  { icon: Syringe, tone: 'teal', title: 'Vaccine Schedule', text: 'Every stage for your child, from birth, with alerts when the next one is due.' },
  { icon: Users, tone: 'teal', title: 'Family Profiles', text: 'One login for the whole family. Each profile sees only its own records.' },
  { icon: IdCard, title: 'Digital Health ID', text: 'Your Health ID card to show at any empaneled clinic or lab.' },
  { icon: ShieldCheck, tone: 'accent', title: 'Insurance', text: 'Keep every policy, its dates and documents in one list.' },
]

const privacy = [
  { icon: ShieldCheck, title: 'HIPAA', text: 'Compliant' },
  { icon: Lock, title: 'DPDP', text: 'Compliant' },
  { icon: Users, tone: 'teal', title: 'Isolated', text: 'Profile by profile' },
  { icon: Repeat, tone: 'accent', title: '90 days', text: 'To undo a deletion' },
]

export default function HealthOSAppPage() {
  usePageMeta(
    'HealthOS by Orvena | Health for You and Yours, Decoded',
    'Upload any medical report and HealthOS reads every value, shows what changed, flags what needs attention and keeps your whole family’s records in one secure place.',
  )

  return (
    <>
      <PageHero
        id="healthos"
        eyebrow="HealthOS, for patients and families"
        title={
          <>
            Health for You and Yours, <span className="text-accent">Decoded.</span>
          </>
        }
        lead="Upload any medical report and HealthOS reads every value, shows what changed, flags what needs attention and keeps your whole family’s records in one secure place."
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
              'Save as a branded PDF for your visit',
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
          lead="HealthOS is built to HIPAA and DPDP standards. Each family profile sees only its own records, you choose who sees your summary, and you can delete your account at any time, with a 90-day window to change your mind."
          media={<IconCards items={privacy} cols="lg:grid-cols-2" />}
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
