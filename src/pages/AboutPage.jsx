import About from '../components/About'
import Mission from '../components/Mission'
import Vision from '../components/Vision'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About — Orvena')

  return (
    <>
      <About />
      <Mission />
      <Vision />
    </>
  )
}
