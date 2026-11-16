import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ClinicOSPage from './pages/ClinicOSPage'
import ContactPage from './pages/ContactPage'
import DiseaseReversalPage from './pages/DiseaseReversalPage'
import HealthOSAppPage from './pages/HealthOSAppPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

// The site follows the new site map: Home, HealthOS, ClinicOS, Disease Reversal, Contact.
// The earlier About, Services, Doctors, Technology and HealthOS-parallax pages are kept in
// src/pages but are no longer routed. Their old URLs redirect to the closest new page.
// import AboutPage from './pages/AboutPage'
// import DoctorsPage from './pages/DoctorsPage'
// import ServicesPage from './pages/ServicesPage'
// import TechnologyPage from './pages/TechnologyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/healthos" element={<HealthOSAppPage />} />
        <Route path="/clinicos" element={<ClinicOSPage />} />
        <Route path="/disease-reversal" element={<DiseaseReversalPage />} />
        <Route path="/disease-reversal-v2" element={<Navigate to="/disease-reversal" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<Navigate to="/" replace />} />
        <Route path="/services/:serviceId" element={<Navigate to="/" replace />} />
        <Route path="/doctors" element={<Navigate to="/" replace />} />
        <Route path="/technology" element={<Navigate to="/" replace />} />
        <Route path="/health-os" element={<Navigate to="/healthos" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
