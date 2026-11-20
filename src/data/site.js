// One place for the site map, outbound links and contact details.
// Change a link or a contact detail here and it updates everywhere it is used.


export const healthosWebUrl = 'https://healthos.orvenahealth.com'
export const clinicosWebUrl = 'https://clinicos.orvenahealth.com'

export const contact = {
  phone: '+91 7506543960',
  phoneHref: 'tel:+917506543960',
  email: 'info@orvenahealth.com',
  office: 'Unit-511, Lodha Supremus, Off Mahakal Caves Road, Andheri East, Mumbai, Maharashtra 400069, India',
}

// HIPAA and DPDP compliance badges and mentions. Off until Orvena has them; set to true to bring them back.
export const SHOW_COMPLIANCE = false

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'HealthOS', href: '/healthos' },
  { label: 'ClinicOS', href: '/clinicos' },
  { label: 'Disease Reversal', href: '/disease-reversal' },
  { label: 'Contact', href: '/contact' },
]

// Footer columns. `external` links open in a new tab.
export const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'HealthOS for patients', href: '/healthos' },
      { label: 'ClinicOS for doctors', href: '/clinicos' },
      { label: 'Disease Reversal', href: '/disease-reversal' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Open HealthOS (web)', href: healthosWebUrl, external: true },
      { label: 'Book a ClinicOS demo', href: '/contact?topic=clinicos' },
      { label: 'Talk to a health expert', href: '/contact?topic=reversal' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Orvena', href: '/about' },
      { label: 'Contact us', href: '/contact' },
      // { label: 'Blog', href: '/blog' }, // blog switched off for now
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

// The HealthOS Android app on Google Play.
export const appUrl = 'https://play.google.com/store/apps/details?id=health.orvena.patient'
