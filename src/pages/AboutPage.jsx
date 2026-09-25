import About from '../components/About'
import Mission from '../components/Mission'
import Vision from '../components/Vision'
import Team from '../components/Team'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About - Orvena')

  return (
    <>
      <About />
      {/* <Team /> */}
      <Mission />
      <Vision />
    </>
  )
}
