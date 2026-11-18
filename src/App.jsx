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
// Blog is switched off for now. Uncomment these and the routes below to bring it back.
// import BlogPage from './pages/BlogPage'

// Admin area (enquiries CMS). Loaded only when visited, so it adds nothing to the public pages.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage'))
const AdminDoctorsPage = lazy(() => import('./pages/admin/AdminDoctorsPage'))
const AdminBlogsPage = lazy(() => import('./pages/admin/AdminBlogsPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))
// const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))

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
      {/* CMS. Each page checks which sections the signed-in user may open. */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <AdminHome />
          </Suspense>
        }
      />
      <Route
        path="/admin/hos"
        element={
          <Suspense fallback={null}>
            <AdminEnquiriesPage key="hos" section="hos" />
          </Suspense>
        }
      />
      <Route
        path="/admin/cos"
        element={
          <Suspense fallback={null}>
            <AdminEnquiriesPage key="cos" section="cos" />
          </Suspense>
        }
      />
      <Route
        path="/admin/dt"
        element={
          <Suspense fallback={null}>
            <AdminEnquiriesPage key="dt" section="dt" />
          </Suspense>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <Suspense fallback={null}>
            <AdminDoctorsPage />
          </Suspense>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <Suspense fallback={null}>
            <AdminBlogsPage />
          </Suspense>
        }
      />
      <Route
        path="/admin/users"
        element={
          <Suspense fallback={null}>
            <AdminUsersPage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/healthos" element={<HealthOSAppPage />} />
        <Route path="/healthos2" element={<Navigate to="/healthos" replace />} />
        <Route path="/clinicos" element={<ClinicOSPage />} />
        <Route path="/clinicos2" element={<Navigate to="/clinicos" replace />} />
        <Route path="/disease-reversal" element={<DiseaseReversalPage />} />
        <Route path="/disease-reversal-v2" element={<Navigate to="/disease-reversal" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {/* Blog switched off for now.
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={null}>
              <BlogPostPage />
            </Suspense>
          }
        />
        */}
        <Route path="/blog/*" element={<Navigate to="/" replace />} />

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
