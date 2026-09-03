import { Phone } from 'lucide-react'

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 p-3 backdrop-blur-xl md:hidden">
      <a
        href="tel:+917506543960"
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-teal text-sm font-semibold text-white"
      >
        <Phone className="h-4 w-4" />
        Talk to an Expert
      </a>
    </div>
  )
}
