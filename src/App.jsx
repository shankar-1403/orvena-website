import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStats from './components/TrustStats'
import About from './components/About'
import Services from './components/Services'
import PatientOperatingSystem from './components/PatientOperatingSystem'
import WhyOrvena from './components/WhyOrvena'
import Doctors from './components/Doctors'
import Technology from './components/Technology'
import GlobalHealthcare from './components/GlobalHealthcare'
import PatientJourney from './components/PatientJourney'
import SecondOpinionCTA from './components/SecondOpinionCTA'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'

export default function App() {
  return (
    <div className="min-h-svh bg-white text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStats />
        <About />
        <Services />
        <PatientOperatingSystem />
        <WhyOrvena />
        <Doctors />
        <Technology />
        <GlobalHealthcare />
        <PatientJourney />
        <SecondOpinionCTA />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}
