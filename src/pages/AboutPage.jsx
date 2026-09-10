import About from '../components/About'
import Vision from '../components/Vision'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About — Orvena')

  return (
    <>
      <About />
      <Vision />
    </>
  )
}
