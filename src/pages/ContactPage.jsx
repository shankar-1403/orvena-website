import Contact from '../components/Contact'
import PageHero from '../components/site/PageHero'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ContactPage() {
  usePageMeta(
    'Contact Orvena',
    'Questions about HealthOS, a ClinicOS demo for your clinic, or which Disease Reversal program suits you? Send us a message and our team will get back to you.',
  )

  return (
    <>
      <PageHero
        id="contact"
        eyebrow="Contact"
        title={
          <>
            Let’s Talk About <span className="text-accent">Your Health.</span>
          </>
        }
        lead="Questions about HealthOS, a ClinicOS demo for your clinic, or which Disease Reversal program suits you: send us a message and our team will get back to you."
      />
      <Contact />
    </>
  )
}
