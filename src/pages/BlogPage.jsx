import { BookOpen } from 'lucide-react'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import SectionCard from '../components/ui/SectionCard'
import { usePageMeta } from '../hooks/usePageMeta'

// Blog placeholder. Linked only from the footer for now; posts will come later from the CMS.
export default function BlogPage() {
  usePageMeta(
    'Blog | Orvena',
    'Articles from Orvena on understanding your health reports, lifestyle conditions and modern clinic care. Coming soon.',
  )

  return (
    <SectionCard className="bg-white py-14 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal to-navy text-white shadow-[0_14px_28px_-14px_rgba(11,65,86,0.7)]">
          <BookOpen className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div className="mt-6 flex justify-center">
          <Eyebrow>Blog</Eyebrow>
        </div>
        <h1 className="mt-4 text-[30px] font-extrabold tracking-[-0.04em] text-navy sm:text-[42px] lg:text-[50px]">
          Articles Coming Soon
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-8 text-muted">
          We’re writing guides on reading your health reports, managing lifestyle conditions and
          running a modern clinic. Check back soon.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Button href="/" className="w-full sm:w-auto">Back home</Button>
          <Button href="/healthos" variant="secondary" className="w-full sm:w-auto">
            Explore HealthOS
          </Button>
        </div>
      </Container>
    </SectionCard>
  )
}
