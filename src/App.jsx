import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DoctorsPage from './pages/DoctorsPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PatientOSPage from './pages/PatientOSPage'
import PrivacyPage from './pages/PrivacyPage'
import ServicesPage from './pages/ServicesPage'
import TechnologyPage from './pages/TechnologyPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServicesPage />} />
        <Route path="/patient-os" element={<PatientOSPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
