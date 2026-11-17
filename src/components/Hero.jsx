import { Lock, ShieldCheck, Users } from 'lucide-react'
import AppShowcase from './AppShowcase'
import PageHero from './site/PageHero'
import Button from './ui/Button'

// Compliance claims are the owner's statements about the product. Add or change one
// only when the owner says so.
const badges = [
  { icon: ShieldCheck, text: 'HIPAA Compliant' },
  { icon: Lock, text: 'DPDP Compliant' },
  { icon: Users, text: '10,000+ patients helped' },
]

export default function Hero() {
  return (
    <PageHero
      id="home"
      eyebrow="Orvena Health"
      title={
        <>
          One Connected Health Record.{' '}
          <span className="text-accent">For Patients, Doctors and Clinics.</span>
        </>
      }
      lead="Orvena brings your reports, readings, doctors and treatment together. HealthOS for you and your family, ClinicOS for your doctor, and nutritionist-guided programs that reverse lifestyle disease."
      actions={
        <>
          <Button href="/healthos" variant="light" className="w-full sm:w-auto">
            Explore HealthOS
          </Button>
          <Button href="/clinicos" variant="outline" showArrow={false} className="w-full sm:w-auto">
            I’m a doctor
          </Button>
        </>
      }
      badges={badges}
      visual={<AppShowcase />}
    />
  )
}
