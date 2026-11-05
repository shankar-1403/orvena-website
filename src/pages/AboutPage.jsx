import About from '../components/About'
import Leadership from '../components/Leadership'
import Mission from '../components/Mission'
import Vision from '../components/Vision'
import Team from '../components/Team'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us | Orvena — Healthcare • Technology • Impact')

  return (
    <>
      {/* Order follows the About Us brief: focus → vision → mission → leadership. */}
      <About />
      {/* <Team /> */}
      <Vision />
      <Mission />
      <Leadership />
    </>
  )
}
