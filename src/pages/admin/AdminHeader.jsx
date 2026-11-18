import { FileText, Inbox, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { signOutAdmin } from '../../lib/enquiries'

const tabs = [
  { to: '/admin', label: 'Enquiries', icon: Inbox, end: true },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
]

/** Top bar shared by every admin page: logo, section tabs, signed-in email and sign out. */
export default function AdminHeader({ user }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <img src="/orvena_logo.webp" alt="Orvena" className="h-7 w-auto" />
        <nav className="ml-2 flex items-center gap-1 sm:ml-4">
          {tabs.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[13px] font-semibold transition-colors sm:px-3 ${
                  isActive ? 'bg-navy text-white' : 'text-navy/70 hover:bg-pale'
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="ml-auto hidden truncate text-[13px] text-muted md:block">{user?.email}</span>
        <button
          type="button"
          onClick={() => signOutAdmin()}
          aria-label="Sign out"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-navy ring-1 ring-line hover:bg-pale max-md:ml-auto"
        >
          <LogOut className="h-4 w-4" /> <span className="max-sm:hidden">Sign out</span>
        </button>
      </div>
    </header>
  )
}
