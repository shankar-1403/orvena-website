import { Navigate } from 'react-router-dom'
import { SECTIONS } from '../../lib/enquiries'
import { useAdmin } from './useAdmin'

/** /admin: opens the first section this user may see. */
export default function AdminHome() {
  const admin = useAdmin()
  if (admin.status === 'loading') return <div className="min-h-svh bg-[#F3F6F8]" />
  if (admin.status !== 'admin') return <Navigate to="/login" replace />
  const first = SECTIONS.find((s) => admin.isSuper || admin.sections.includes(s.key))
  return <Navigate to={first ? first.path : '/login'} replace />
}
