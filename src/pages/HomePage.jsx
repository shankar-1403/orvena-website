import Hero from '../components/Hero'
import WhyOrvena from '../components/WhyOrvena'
import ServiceOverview from '../components/ServiceOverview'
import Doctors from '../components/Doctors'
import Packages from '../components/Packages'
import PatientJourney from '../components/PatientJourney'
import SecondOpinionCTA from '../components/SecondOpinionCTA'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Orvena - Connected Healthcare, Better Decisions')

  return (
    <>
      <Hero />
      <WhyOrvena />
      <ServiceOverview />
      <Doctors />
      {/* <Packages /> */}
      <PatientJourney />
      <SecondOpinionCTA />
    </>
  )
}
