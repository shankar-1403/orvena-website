import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionCard from '../components/ui/SectionCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found — Orvena')

  return (
    <SectionCard className="bg-white py-12 sm:py-16 lg:py-24">
      <Container className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-4 text-[28px] font-extrabold tracking-[-0.04em] text-navy sm:text-[40px] lg:text-[48px]">
          This page isn’t here.
        </h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-[16px] leading-8 text-muted">
          The link may have changed. Head home or talk to the care team.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Button href="/" className="w-full sm:w-auto">Back home</Button>
          <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
            Contact
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or browse{' '}
          <Link to="/services" className="font-semibold text-navy underline-offset-2 hover:underline">
            services
          </Link>
          .
        </p>
      </Container>
    </SectionCard>
  )
}
