import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './ui/Logo'
import Container from './ui/Container'
import SectionCard from './ui/SectionCard'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Mission', href: '/about#mission' },
      { label: 'Vision', href: '/about#vision' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Medical Second Opinion', href: '/services/second-opinion' },
      { label: 'Medical Tourism', href: '/services/medical-tourism' },
      { label: 'Disease Reversal', href: '/services/disease-reversal' },
      { label: 'Corporate Wellness', href: '/services/corporate-wellness' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'HealthOS', href: '/health-os' },
      { label: 'ClinicOS', href: '/technology' },
      { label: 'HospitalOS', href: '/technology' },
      { label: 'LabOS', href: '/technology' },
      { label: 'FWA', href: '/technology' },
    ],
  },
]

export default function Footer() {
  return (
    <SectionCard as="footer" className="bg-navy text-white shadow-lift">
        <div aria-hidden="true" className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-teal/30 blur-3xl"
        />

        <Container className="relative py-7 lg:py-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex rounded-2xl bg-white px-3 py-1.5">
                <Logo />
              </div>
              <p className="mt-3 max-w-[34ch] text-sm leading-6 text-white/60">
                Integrated digital healthcare solutions. Empowering patients and enterprises with
                disease reversal programs, medical second opinions, medical tourism and smart health tech.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="tel:+917506543960"
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:border-mint/40 hover:bg-white/12"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-mint" />
                24/7 +91 7506543960
              </a>
              <a
                href="mailto:info@orvena.health"
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:border-mint/40 hover:bg-white/12"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-mint" />
                <span className="truncate">info@orvena.health</span>
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Talk to an expert
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 py-5 sm:grid-cols-2 md:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint/80">
                  {column.title}
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            aria-hidden="true"
            className="select-none overflow-hidden whitespace-nowrap text-[32px] font-extrabold leading-none tracking-[-0.07em] text-white/[0.06] sm:text-[48px] md:text-[56px]"
          >
            ORVENA
          </p>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4 text-[12px] leading-5 text-white/40 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p>© 2026 Orvena. All rights reserved.</p>
              <p className="mt-1">A division of eMediworld Life Science Pvt. Ltd.</p>
            </div>
            <div className="max-w-xl sm:text-right">
              <p>
                Privacy: we protect healthcare information and do not sell personal medical data.{' '}
                <Link to="/privacy" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <p className="mt-1">
                Guidance on this site does not replace a physician’s clinical judgment.{' '}
                <Link to="/terms" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
                  Terms of Use
                </Link>
              </p>
            </div>
          </div>
        </Container>
    </SectionCard>
  )
}
