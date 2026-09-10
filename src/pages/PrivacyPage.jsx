import Container from '../components/ui/Container'
import SectionCard from '../components/ui/SectionCard'
import { usePageTitle } from '../hooks/usePageTitle'

const sections = [
  {
    title: 'Who we are',
    body: 'Orvena is a healthcare technology and patient-support platform that helps people organize medical records, coordinate care, obtain second opinions, access providers, manage treatment journeys and share records securely with authorized professionals.',
  },
  {
    title: 'Information we collect',
    body: 'Personal details (name, date of birth, gender, phone, email, address, emergency contacts). Health information you share (records, labs, imaging, prescriptions, treatment summaries, discharge notes, insurance medical documents, doctor notes, history). Technical data (device, browser, IP, login activity, cookies and analytics).',
  },
  {
    title: 'How we use information',
    body: 'We use information to structure records, create health summaries, coordinate care, communicate with providers you authorize, support you, improve the platform, meet legal duties and prevent fraud. We do not sell personal or medical information.',
  },
  {
    title: 'Consent and ownership',
    body: 'Health information is processed with your consent or as permitted by law. You remain the owner of your medical records. Orvena acts as custodian and facilitator. You may withdraw consent at any time by contacting us.',
  },
  {
    title: 'Sharing',
    body: 'We share information only with your authorization (doctors, hospitals, clinics, labs, insurers, nominated caregivers), with contracted vendors for hosting, storage, support and security, or when required by courts, regulators or law enforcement.',
  },
  {
    title: 'Security and retention',
    body: 'We use encryption in transit, secure cloud infrastructure, access controls, authentication and restricted employee access. No system is perfectly secure. We retain data only as needed to provide services, meet legal obligations, resolve disputes and enforce agreements. Valid deletion requests are honoured unless law requires retention.',
  },
  {
    title: 'Your rights',
    body: 'Subject to applicable law you may access, correct or delete information, withdraw consent, request a copy of records and ask how your information is used. Contact support@emediworld.com.',
  },
  {
    title: 'Cookies, children and third-party links',
    body: 'Cookies may be used to improve experience and analyse traffic; you can disable them in your browser. Services are not intended for children without required parental consent. We are not responsible for third-party sites linked from our platform.',
  },
]

export default function PrivacyPage() {
  usePageTitle('Privacy Policy — Orvena')

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-24">
      <Container>
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">Legal</p>
        <h1 className="mt-3 text-[28px] font-extrabold tracking-[-0.04em] text-navy sm:text-[40px]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>
        <p className="mt-6 max-w-[68ch] text-[15px] leading-7 text-muted">
          Orvena (“we”, “our”, “us”), a division of eMediworld Life Science Pvt. Ltd., is committed
          to protecting the privacy, confidentiality and security of your personal and health
          information when you use our website, applications and care-coordination services.
        </p>

        <div className="mt-10 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[24px] border border-line bg-pale/60 p-5 sm:p-6">
              <h2 className="text-[16px] font-semibold tracking-tight text-navy">{section.title}</h2>
              <p className="mt-2 text-[14px] leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] bg-navy p-5 text-white sm:p-6">
          <h2 className="text-[16px] font-semibold">Contact & grievance officer</h2>
          <p className="mt-2 text-[14px] leading-7 text-white/70">
            Privacy questions: support@emediworld.com · +91 7506543960. Designated grievance officer:
            Suraj Singh, support@emediworld.com, with response within applicable legal timelines.
          </p>
        </div>
      </Container>
    </SectionCard>
  )
}
