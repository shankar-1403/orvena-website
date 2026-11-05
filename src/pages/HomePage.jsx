import Hero from '../components/Hero'
import HomeHealthOS from '../components/HomeHealthOS'
import WhyOrvena from '../components/WhyOrvena'
import ServiceOverview from '../components/ServiceOverview'
import Packages from '../components/Packages'
import PatientJourney from '../components/PatientJourney'
import SecondOpinionCTA from '../components/SecondOpinionCTA'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Orvena - Connected Healthcare, Better Decisions')

  return (
    <>
      <Hero />
      <HomeHealthOS />
      <WhyOrvena />
      <ServiceOverview />
      {/* <Packages /> */}
      <PatientJourney />
      <SecondOpinionCTA />
    </>
  )
}
