import { Link } from 'react-router-dom'

export default function Logo({ className = '', light = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="Orvena home"
    >
      <img
        src="/orvena_logo.webp"
        alt="Orvena"
        className={`h-8 w-auto sm:h-10 lg:h-16 ${light ? 'drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]' : ''}`}
      />
    </Link>
  )
}
