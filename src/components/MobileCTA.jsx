import { Phone } from 'lucide-react'

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      <a
        href="tel:+917506543960"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent text-sm font-semibold text-white shadow-lift transition-colors hover:bg-accent-deep"
      >
        <Phone className="h-4 w-4" />
        Talk to an Expert
      </a>
    </div>
  )
}
