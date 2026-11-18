import { FileText, HeartPulse, LogOut, Stethoscope, UserCog, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { SECTIONS, signOutAdmin } from '../../lib/enquiries'

const icons = { hos: HeartPulse, cos: Stethoscope, dt: HeartPulse, doctors: Users, blogs: FileText }

/** Top bar shared by every admin page: logo, the tabs this user may open, email and sign out. */
export default function AdminHeader({ user, admin }) {
  const tabs = SECTIONS.filter((s) => admin?.isSuper || admin?.sections?.includes(s.key)).map((s) => ({
    to: s.path,
    label: s.short,
    icon: icons[s.key],
  }))
  if (admin?.isSuper) tabs.push({ to: '/admin/users', label: 'Users & Roles', icon: UserCog })

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <img src="/orvena_logo.webp" alt="Orvena" className="h-7 w-auto shrink-0" />
        <span className="ml-auto hidden truncate text-[13px] text-muted md:block">
          {user?.email}
          {admin?.isSuper ? <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">Main admin</span> : null}
        </span>
        <button
          type="button"
          onClick={() => signOutAdmin()}
          aria-label="Sign out"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-navy ring-1 ring-line hover:bg-pale max-md:ml-auto"
        >
          <LogOut className="h-4 w-4" /> <span className="max-sm:hidden">Sign out</span>
        </button>
      </div>
      <nav className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 pb-2.5 sm:px-6">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors ${
                isActive ? 'bg-navy text-white' : 'text-navy/70 hover:bg-pale'
              }`
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
