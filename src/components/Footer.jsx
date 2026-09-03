import Logo from './ui/Logo'
import Container from './ui/Container'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Vision', href: '#vision' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Medical Second Opinion', href: '#second-opinion' },
      { label: 'Medical Tourism', href: '#medical-tourism' },
      { label: 'Disease Reversal', href: '#disease-reversal' },
      { label: 'Corporate Wellness', href: '#corporate-wellness' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'Patient Operating System', href: '#patient-os' },
      { label: 'HMIS', href: '#technology' },
      { label: 'Laboratory Management', href: '#technology' },
      { label: 'Healthcare Analytics', href: '#technology' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-[32ch] text-sm leading-7 text-white/65">
              Connecting people, technology and medical expertise for better healthcare.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-mint/80">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div id="privacy" className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>
            Privacy Policy: Orvena protects healthcare information with strong privacy
            and security practices. We do not sell personal medical data.
          </p>
        </div>
        <div id="terms" className="mt-3 text-sm text-white/50">
          <p>
            Terms of Use: Information on this website is for healthcare guidance and does
            not replace a physician’s clinical judgment.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Orvena. All rights reserved.</p>
          <p>Orvena, a division of eMediworld Life Science Pvt. Ltd.</p>
        </div>
      </Container>
    </footer>
  )
}
