import { lazy, Suspense } from 'react'
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
import BlogPage from './pages/BlogPage'

// Admin area (enquiries CMS). Loaded only when visited, so it adds nothing to the public pages.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage'))

// The site follows the new site map: Home, HealthOS, ClinicOS, Disease Reversal, Contact.
// Old URLs redirect to the closest new page.

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={null}>
            <AdminLoginPage />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <AdminEnquiriesPage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/healthos" element={<HealthOSAppPage />} />
        <Route path="/clinicos" element={<ClinicOSPage />} />
        <Route path="/disease-reversal" element={<DiseaseReversalPage />} />
        <Route path="/disease-reversal-v2" element={<Navigate to="/disease-reversal" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {/* Blog: linked only from the footer for now */}
        <Route path="/blog" element={<BlogPage />} />

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
