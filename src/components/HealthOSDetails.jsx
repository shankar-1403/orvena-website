import {
  Activity,
  CalendarCheck,
  FileLock2,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Button from './ui/Button'
import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'
import SectionHeader from './ui/SectionHeader'

const trustRibbon = [
  '100% ABDM-compliant architecture',
  'End-to-end consent-driven privacy',
  'Biomarker extraction — HbA1c, lipids, creatinine',
  'Zero data selling — you own your records',
]

/** Paired so each row reads status quo → the HealthOS answer to it. */
const paradigmShift = [
  {
    id: 'files',
    before: 'Scattered paper files',
    beforeText: 'Buried in closets, lost between appointments, or fading away.',
    after: 'Universal digital vault',
    afterText: 'Complete medical history accessible securely on your phone, anywhere.',
  },
  {
    id: 'blindspots',
    before: 'Diagnostic blindspots',
    beforeText: 'Past trends hidden in isolated PDF sheets and printed paper.',
    after: 'Intelligent trendlines',
    afterText: 'Automatic extraction of blood sugar, kidney and lipid trajectories.',
  },
  {
    id: 'disconnected',
    before: 'Disconnected care',
    beforeText: 'Starting from scratch every time you consult a new doctor or hospital.',
    after: 'Seamless continuity',
    afterText: 'Instant, permission-based sharing across OPD, IPD and home care.',
  },
  {
    id: 'reactive',
    before: 'Reactive panic',
    beforeText: 'Catching chronic conditions only after an acute medical event occurs.',
    after: 'Early pattern recognition',
    afterText: 'Longitudinal tracking designed to detect biomarker shifts early.',
  },
]

const features = [
  {
    code: '01',
    title: 'Longitudinal biomarker trendlines',
    text: 'Test metrics pulled from routine lab reports and charted over time.',
    icon: Activity,
    points: [
      'Metabolic — fasting glucose and HbA1c.',
      'Cardiovascular — cholesterol, triglycerides, LDL and HDL ratios.',
      'Renal — serum creatinine, eGFR and electrolyte stability.',
    ],
  },
  {
    code: '02',
    title: 'Frictionless WhatsApp & camera intake',
    text: 'Digitizing medical files should not feel like administrative work.',
    icon: MessageCircle,
    points: [
      'Snap and send any slip, prescription or discharge summary.',
      'Documents become a readable clinical timeline in minutes.',
      'In-app scanning indexes multi-page files into clear categories.',
    ],
  },
  {
    code: '03',
    title: 'ABDM-compliant lifetime record',
    text: 'A health identity that follows the patient, not the hospital.',
    icon: FileLock2,
    points: [
      'Unified identity linked to your ABHA account.',
      'Consent-based sharing via a time-limited summary link.',
      'Stores prescriptions, discharge summaries, vaccinations and DICOM imaging.',
    ],
  },
  {
    code: '04',
    title: 'The family & ParentCare bridge',
    text: 'Coordinate care across cities or continents.',
    icon: Users,
    points: [
      'One interface for spouse, children and elderly parents.',
      'Home nurse visits, 6-monthly diagnostics and emergency response.',
      'Caregiver alerts when a parent’s vitals shift.',
    ],
  },
  {
    code: '05',
    title: 'Smart follow-ups & medicine management',
    text: 'The follow-up is the part most systems drop.',
    icon: CalendarCheck,
    points: [
      'Reminders for refills, follow-up consults and repeat tests.',
      'Digital prescriptions with structured dosage and duration.',
      'Drug-safety checks against interactions and errors.',
    ],
  },
]

const steps = [
  {
    code: '01',
    title: 'Upload your past & present files',
    text: 'Snap paper reports via WhatsApp, upload digital PDFs, or have partner labs sync results automatically.',
  },
  {
    code: '02',
    title: 'Transform reports into intelligence',
    text: 'The platform standardizes documents, indexes tests chronologically and plots biomarker progress.',
  },
  {
    code: '03',
    title: 'Share & act with confidence',
    text: 'Present a clear summary to any doctor in one tap, set test reminders and track loved ones proactively.',
  },
]

const privacy = [
  {
    title: 'You own your data',
    text: 'You remain the sole owner of your health records. Orvena acts strictly as an encrypted custodian.',
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
                <article className="grid gap-3 md:grid-cols-2">
                  <div className="o-card o-card--lift rounded-2xl border border-line bg-pale/50 p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                      The status quo
                    </p>
                    <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-navy/70">
                      {row.before}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-muted">{row.beforeText}</p>
                  </div>

                  <div className="o-card o-card--tint o-tint-peach rounded-2xl border border-accent/20 bg-mint-soft/60 p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                      The HealthOS standard
                    </p>
                    <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-navy">
                      {row.after}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-muted">{row.afterText}</p>
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
                    <div className="flex items-center gap-3">
                      <span className="o-card-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                        {feature.code}
                      </p>
                    </div>

                    <h3 className="mt-4 text-[18px] font-semibold leading-6 tracking-tight text-navy sm:text-[20px]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-muted">{feature.text}</p>

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
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="light" className="w-full sm:w-auto">
                  Upload first report for free
                </Button>
                <Button
                  href="https://wa.me/917506543960"
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Digitize via WhatsApp
                </Button>
              </div>
            </SectionHeader>
          </Reveal>

          <ol className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.code} delay={0.06 * index}>
                <li className="o-card o-card--frame h-full rounded-[22px] border border-white/10 bg-white/4 p-5 sm:rounded-[28px] sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint/70">
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
