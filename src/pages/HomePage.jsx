import { ArrowRight, ShieldCheck, Stethoscope, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { CtaBand, Section, Ticks } from '../components/site/blocks'
import { JourneyRail, NumbersBand, TrustPlates } from '../components/site/HomeSections'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { SHOW_COMPLIANCE, healthosWebUrl } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

// Home page of the Orvena website: content, flow and structure follow the new site map.
// The 3 products, how they connect, the numbers, why people trust it, and one closing call.

const products = [
  {
    tag: 'For patients & families',
    title: 'HealthOS',
    text: 'Your family’s health, decoded. Every report, biomarker, and trend in one place.',
    points: [
      'Scan any blood report and get structured, easy-to-read insights in under 2 hours',
      'Track lab trends to see what’s normal, elevated, or changing',
      'Catch early warning signs before they turn into medical emergencies',
      'Keep your whole family’s health history connected in one app',
    ],
    link: 'Explore HealthOS',
    href: '/healthos',
    head: 'from-[#08405c] to-[#08405c]', // logo dark green
  },
  {
    tag: 'For doctors & clinics',
    title: 'ClinicOS',
    text: 'The intelligent system for modern practices, saving consult time while growing your OPD.',
    points: [
      'Smart patient summaries before every consultation',
      'Instant prescriptions with ICD-10 coding and saved templates',
      'Seamless appointments, billing, payments and reports',
      'Connected ecosystem of hospitals, laboratories and pharmacies',
    ],
    link: 'Explore ClinicOS',
    href: '/clinicos',
    head: 'from-[#14647c] to-[#14647c]', // logo light green
  },
  {
    tag: 'Nutritionist-guided programs',
    title: 'Disease Reversal',
    text: 'Reverse Chronic Conditions Through Targeted Clinical Nutrition',
    points: [
      'Dedicated clinical nutritionist, diet & fitness coaching',
      'Support lower medicine dependency alongside your doctor',
      'CGM tracking, weekly 1:1 consults, WhatsApp support',
      '10,000+ patients helped',
    ],
    link: 'Explore programs',
    href: '/disease-reversal',
    head: 'from-accent-deep to-accent',
  },
]

const connects = [
  {
    title: 'Upload',
    text: 'Add any medical report to HealthOS, from blood tests to X-rays, ECGs and scans. Orvena reads and files it for you.',
  },
  {
    title: 'Understand',
    text: 'See what is in range, what changed since last time and what needs attention.',
  },
  {
    title: 'Consult',
    text: 'Book a doctor on the Orvena network. Your Insights summary reaches them in ClinicOS.',
  },
  {
    title: 'Treat & reverse',
    text: 'The prescription comes back to your app, and Disease Reversal programs help you heal for good.',
  },
]

const numbers = [
  { value: '100K+', label: 'Users across HealthOS and ClinicOS' },
  { value: '10,000+', label: 'Patients helped through Disease Reversal' },
  { value: '2 hours', label: 'To turn a blood report into readings' },
  { value: '100+', label: 'Doctors on the Orvena network' },
]

const trust = [
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    text: SHOW_COMPLIANCE
      ? 'Encrypted, HIPAA and DPDP compliant. Each profile sees only its own records, and you choose who sees your summary.'
      : 'Encrypted. Each profile sees only its own records, and you choose who sees your summary.',
  },
  {
    icon: Stethoscope,
    tone: 'accent',
    title: 'Guided by doctors',
    text: 'Programs and alerts are designed with doctors, and every change to your medicines is made by a doctor, never by an app.',
  },
  {
    icon: Users,
    tone: 'teal',
    title: 'One app for the whole family',
    text: 'Parents, children and grandparents each get their own profile under one login, with vaccine schedules and a Digital Health ID for every member.',
  },
]

export default function HomePage() {
  usePageMeta(
    'Orvena | Connected Healthcare for Patients, Doctors and Clinics',
    'Orvena brings HealthOS for patients, ClinicOS for doctors and clinics, and nutritionist-guided Disease Reversal programs together on one connected health record.',
  )

  return (
    <>
      <Hero />

      <Section id="what-we-do">
        <Reveal>
          <SectionHeader
            eyebrow="What we do"
            title="Three Ways Orvena Looks After Your Health"
            description="They work on the same health record, so nothing is lost between you, your doctor and your care team."
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.title} delay={0.06 * index} className="h-full">
              <Link to={product.href} className="group block h-full">
                <article className="o-card o-card--sheen flex h-full flex-col rounded-[24px] border border-line bg-white sm:rounded-[28px]">
                  <div className={`bg-gradient-to-br ${product.head} p-5 sm:p-6 ${product.light ? 'text-navy' : 'text-white'}`}>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${product.light ? 'border-navy/15 bg-white/70' : 'border-white/25 bg-white/12'}`}>
                      {product.tag}
                    </span>
                    <h3 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em]">
                      {product.title}
                    </h3>
                    <p className={`mt-2 text-[14px] leading-6 ${product.light ? 'text-navy/75' : 'text-white/80'}`}>{product.text}</p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
                    <Ticks items={product.points} />
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy transition-colors group-hover:text-accent">
                      {product.link}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="how-it-connects" tone="soft">
        <Reveal>
          <SectionHeader
            eyebrow="How it connects"
            title="From a Report on Your Phone to the Right Treatment"
          />
        </Reveal>
        <div className="mt-8 sm:mt-10">
          <JourneyRail items={connects} />
        </div>
      </Section>

      <Section id="numbers">
        <NumbersBand items={numbers} />
      </Section>

      <Section id="why-orvena" tone="soft">
        <TrustPlates items={trust} />
      </Section>

      <CtaBand
        title="Don’t Find Out Too Late. Find Out in Time."
        text="Start with your next blood report. Upload it to HealthOS and see what it really says."
      >
        <Button
          href={healthosWebUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto"
        >
          Open HealthOS
        </Button>
        <Button href="/contact" variant="outline" showArrow={false} className="w-full sm:w-auto">
          Talk to us
        </Button>
      </CtaBand>
    </>
  )
}
