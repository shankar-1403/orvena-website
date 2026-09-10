import Container from '../components/ui/Container'
import SectionCard from '../components/ui/SectionCard'
import { usePageTitle } from '../hooks/usePageTitle'

const sections = [
  {
    title: 'Scope of services',
    body: 'Orvena facilitates medical second opinions, record structuring, medical tourism assistance, disease-reversal and lifestyle programs, corporate wellness, doctor and hospital coordination, and health education. We are a coordination and technology platform. We do not replace direct consultation, diagnosis, emergency care or treatment from licensed professionals.',
  },
  {
    title: 'Eligibility',
    body: 'You confirm you are at least 18, or using services under a parent or legal guardian, that information you provide is accurate, and that you are authorized to share any records uploaded for yourself or another patient.',
  },
  {
    title: 'Second opinions',
    body: 'Opinions are based on records you provide. Orvena does not guarantee diagnosis accuracy or clinical outcomes. This is not an emergency service — in an emergency call local services or go to the nearest hospital. The final decision remains between you and your treating doctor. Most physicians welcome additional insight; many insurers cover second opinions for major surgery and we can provide itemized receipts.',
  },
  {
    title: 'Medical records',
    body: 'By uploading records you authorize Orvena to process and structure them, share them with authorized clinicians involved in your care, and maintain a digital repository. You remain the owner of those records.',
  },
  {
    title: 'Medical tourism',
    body: 'We may assist with hospital coordination, appointments, planning, travel guidance, stay and interpreters. We do not guarantee treatment success, visas, admission or specific outcomes. You remain responsible for passport and visa compliance, travel insurance, fitness to travel and personal travel costs unless otherwise agreed.',
  },
  {
    title: 'Disease reversal & corporate wellness',
    body: 'Lifestyle programs are educational and supportive — not guaranteed cures and not a substitute for medical treatment. Consult your physician before changing diet, exercise or medication. Corporate programs protect participant confidentiality; aggregated insights may be shared with an organization without identifying health data unless authorized.',
  },
  {
    title: 'Fees and refunds',
    body: 'Fees are confirmed before service. Fees for completed consultations, second opinions or record processing are generally non-refundable. Charges for structuring, documentation review, administration and technology that begin at case initiation are strictly non-refundable. Gateway, FX and third-party fees may also be non-refundable. Applicable taxes may apply.',
  },
  {
    title: 'Liability',
    body: 'To the maximum extent permitted by law, Orvena is not liable for medical outcomes, third-party delays, hospital or doctor decisions, travel disruption, downtime, or loss from relying on second opinions or wellness guidance. Independent doctors, hospitals, labs and travel partners operate independently. These terms are governed by the laws of India, with courts in Mumbai having exclusive jurisdiction.',
  },
]

export default function TermsPage() {
  usePageTitle('Terms of Use — Orvena')

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-24">
      <Container>
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">Legal</p>
        <h1 className="mt-3 text-[28px] font-extrabold tracking-[-0.04em] text-navy sm:text-[40px]">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>
        <p className="mt-6 max-w-[68ch] text-[15px] leading-7 text-muted">
          By accessing Orvena or using our services you agree to these terms. Guidance on this site
          does not replace a physician’s clinical judgment.
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
          <h2 className="text-[16px] font-semibold">Contact</h2>
          <p className="mt-2 text-[14px] leading-7 text-white/70">
            Questions: support@emediworld.com · +91 7506543960. Submitting forms or records means you
            have read and agreed to these terms.
          </p>
        </div>
      </Container>
    </SectionCard>
  )
}
