import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Camera,
  FileLock2,
  FileText,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'
import StoreButtons from './ui/StoreButtons'
import Vignette from './ui/Vignette'

// Every claim on this page is a feature of the Orvena Health app as listed on
// Google Play, or a line from its privacy policy. Check there before adding more.
const trustRibbon = [
  'Your data stays yours — you choose what to upload and share',
  'No data shared with third parties',
  'Encrypted in transit',
  'Zero data selling — you own your records',
]

/** Paired so each row reads status quo → the HealthOS answer to it. */
const paradigmShift = [
  {
    id: 'files',
    before: 'Scattered paper files',
    beforeText: 'Buried in closets, lost between appointments, or fading away.',
    after: 'Universal digital vault',
    afterText: 'Your reports and medical history, organised and private on your phone.',
  },
  {
    id: 'blindspots',
    before: 'Diagnostic blindspots',
    beforeText: 'Past trends hidden in isolated PDF sheets and printed paper.',
    after: 'Readings you can follow',
    afterText: 'iView shows your key readings and trends in easy-to-understand graphs.',
  },
  {
    id: 'disconnected',
    before: 'Disconnected care',
    beforeText: 'Starting from scratch every time you consult a new doctor or hospital.',
    after: 'One summary to share',
    afterText: 'A one-page Smart View summary, shared securely with the doctor you choose.',
  },
  {
    id: 'reactive',
    before: 'Reactive panic',
    beforeText: 'Catching chronic conditions only after an acute medical event occurs.',
    after: 'Alerts from your readings',
    afterText: 'Readings that need attention are flagged from your reports.',
  },
]

const features = [
  {
    code: '01',
    title: 'Reports, scanned or uploaded',
    text: 'Digitizing medical files should not feel like administrative work.',
    icon: Camera,
    art: 'scan',
    points: [
      'Store and view your blood, lab and radiology reports.',
      'Scan a paper report with your camera, or upload a PDF.',
      'Doctors, clinics and labs that use Orvena add reports to your record.',
    ],
  },
  {
    code: '02',
    title: 'iView: readings, trends and alerts',
    text: 'Your reports in easy-to-understand graphs.',
    icon: Activity,
    art: 'trend',
    points: [
      'Key readings such as blood pressure and HbA1c, shown against their normal range.',
      'Trends across your reports over time.',
      'Alerts for anything that needs attention.',
    ],
  },
  {
    code: '03',
    title: 'Smart View: your Structured Case Summary',
    text: 'A one-page summary of your health.',
    icon: FileText,
    art: 'summary',
    points: [
      'Save it as a PDF.',
      'Share it securely with the doctor you choose.',
      'Keep medical history, allergies and insurance policies alongside it.',
    ],
  },
  {
    code: '04',
    title: 'My Doctors',
    text: 'The doctors you see, kept together.',
    icon: Stethoscope,
    art: 'doctors',
    points: [
      'Find doctors and keep your favourites in one list.',
      'Call a doctor or book an appointment from the app.',
      'Show your Orvena Health ID at clinics.',
    ],
  },
  {
    code: '05',
    title: 'Prescriptions, case history & reminders',
    text: 'What was prescribed, what was advised, and what comes next.',
    icon: CalendarCheck,
    art: 'followup',
    points: [
      'Prescription history with the doctor’s details and a printable copy.',
      'Dated case notes and diet plans from your nutritionist.',
      'Reminders for appointments and follow-ups.',
    ],
  },
]

// The rest of what the app holds, named briefly
const alsoInApp = [
  'Medical history',
  'Allergies',
  'Insurance policies',
  'Vaccine schedule',
  'Orvena Health ID',
  'Wallet and bills',
  'Delete your account any time',
]

const steps = [
  {
    code: '01',
    title: 'Upload your past & present files',
    text: 'Scan paper reports with your camera or upload digital PDFs. Doctors, clinics and labs on Orvena add theirs.',
  },
  {
    code: '02',
    title: 'Transform reports into intelligence',
    text: 'iView charts your key readings over time and flags anything that needs attention.',
  },
  {
    code: '03',
    title: 'Share & act with confidence',
    text: 'Share a one-page summary with your doctor, book appointments and get reminders for follow-ups.',
  },
]

const privacy = [
  {
    title: 'You own your data',
    text: 'You remain the owner of your medical records. Orvena acts as custodian and facilitator.',
    icon: ShieldCheck,
  },
  {
    title: 'Strict consent controls',
    text: 'No doctor, hospital or insurer can view your health data without your direct authorization.',
    icon: FileLock2,
  },
  {
    title: 'Enterprise privacy standard',
    text: 'We never sell personal or medical data to third parties or advertisers.',
    icon: HeartHandshake,
  },
]

export default function HealthOSDetails() {
  return (
    <>
      {/* Trust ribbon + the paradigm shift the brief opens with */}
      <SectionCard id="healthos-shift" className="bg-white py-10 sm:py-12 lg:py-14">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60"
        />

        <Container className="relative">
          <Reveal>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {trustRibbon.map((item) => (
                <li
                  key={item}
                  className="o-card o-card--lift flex items-start gap-2.5 rounded-2xl border border-line bg-pale/60 px-4 py-3"
                >
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] leading-5 font-semibold tracking-tight text-navy">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 sm:mt-12">
            <SectionHeader
              eyebrow="The paradigm shift"
              title="From Paper Drawers to Proactive Care."
              description="Most families manage healthcare reactively — hunting through drawers for old prescriptions in an emergency room. HealthOS replaces paper filing with continuous health intelligence."
            />
          </Reveal>

          <div className="mt-6 space-y-3 sm:mt-8">
            {paradigmShift.map((row, index) => (
              <Reveal key={row.id} delay={0.04 * index}>
                {/* Cards on small screens, paired columns from md — never a wide table. */}
                <article className="group grid gap-3 md:grid-cols-2">
                  <div className="o-card o-card--lift rounded-2xl border border-line bg-pale/50 p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      The status quo
                    </p>
                    <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-navy/70">
                      {row.before}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-muted">{row.beforeText}</p>
                  </div>

                  <div className="relative">
                    {/* points from the old way to the new one: down on phones, across from md */}
                    <span
                      aria-hidden="true"
                      className="o-link-arrow absolute -top-[22px] left-1/2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-line bg-white text-accent/80 md:-left-[22px] md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
                    >
                      <ArrowRight className="h-3.5 w-3.5 rotate-90 md:rotate-0" strokeWidth={1.75} />
                    </span>
                    <div className="o-card o-card--tint o-tint-peach h-full rounded-2xl border border-accent/20 bg-mint-soft/60 p-4 sm:p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                        The HealthOS standard
                      </p>
                      <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-navy">
                        {row.after}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-5 text-muted">{row.afterText}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionCard>

      {/* Core platform highlights */}
      <SectionCard id="healthos-features" className="bg-soft py-10 sm:py-12 lg:py-14">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Platform highlights"
              title="Everything Your Medical History Should Already Do."
              description="Five capabilities that turn a folder of reports into something your doctor can act on."
            />
          </Reveal>

          <div className="mt-6 grid gap-3 sm:mt-8 lg:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const wide = index === features.length - 1
              return (
                <Reveal
                  key={feature.code}
                  delay={0.04 * index}
                  className={wide ? 'lg:col-span-2' : undefined}
                >
                  <article className="o-card o-card--spot o-tint-teal h-full rounded-[22px] border border-line bg-pale/60 p-5 hover:border-accent/30 hover:bg-white sm:rounded-[28px] sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="o-card-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-accent">
                            {feature.code}
                          </p>
                        </div>

                        <h3 className="mt-4 text-[18px] font-semibold leading-6 tracking-tight text-navy sm:text-[20px]">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-5 text-muted">{feature.text}</p>
                      </div>

                      <Vignette
                        name={feature.art}
                        className="order-first shrink-0 sm:order-none sm:w-[210px]"
                      />
                    </div>

                    <ul className={`mt-4 space-y-2 ${wide ? 'lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0' : ''}`}>
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <p className="text-[13px] leading-5 text-muted">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-3 rounded-[22px] border border-line bg-white/70 p-5 sm:rounded-[28px] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Also in the app
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {alsoInApp.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-pale/60 px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-navy"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-[13px] leading-6 text-muted">
                For doctors: ClinicOS, the Orvena web app. What your doctor adds there appears in
                your record.{' '}
                <Link
                  to="/technology"
                  className="font-semibold text-navy underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  See ClinicOS
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </SectionCard>

      {/* Three steps + the privacy promise the brief closes on */}
      <SectionCard id="healthos-how" className="bg-midnight py-10 text-white sm:py-12 lg:py-14">
        <div
          aria-hidden="true"
          className="bg-dot-grid-light pointer-events-none absolute inset-0"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-6%] top-[-14%] h-[280px] w-[280px] rounded-full bg-mint/8 blur-[110px]" />
          <div className="absolute bottom-[-12%] right-[-6%] h-[240px] w-[240px] rounded-full bg-accent/10 blur-[100px]" />
        </div>

        <Container className="relative">
          <Reveal>
            <SectionHeader
              light
              eyebrow="How it works"
              title="Three Steps, Then It Keeps Working."
            >
              <p className="text-[15px] leading-7 text-white/65 sm:text-[16px] sm:leading-8">
                Start with the reports already in your drawer. HealthOS structures, tracks and
                reminds from there.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <StoreButtons tone="dark" className="w-full sm:w-auto" />
                <Button href="/contact" variant="outline" className="w-full sm:w-auto">
                  Talk to an expert
                </Button>
              </div>
            </SectionHeader>
          </Reveal>

          <ol className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.code} delay={0.06 * index}>
                <li className="o-card o-card--frame h-full rounded-[22px] border border-white/10 bg-white/4 p-5 sm:rounded-[28px] sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint/70">
                    {step.code}
                  </p>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-white/60">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-8 border-t border-white/10 pt-8 sm:mt-10 sm:pt-10">
              <Eyebrow light>Privacy, ownership & trust</Eyebrow>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {privacy.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.title}
                      className="o-card o-card--tint o-tint-light rounded-2xl border border-white/10 bg-white/4 p-5"
                    >
                      <span className="o-card-icon flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                        <Icon className="h-4 w-4 text-mint" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <h3 className="mt-3.5 text-[15px] font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-5 text-white/60">{item.text}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionCard>
    </>
  )
}
