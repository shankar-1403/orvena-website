export default function Logo({ className = '', light = false }) {
  return (
    <a
      href="#home"
      className={`group inline-flex items-center ${className}`}
      aria-label="Orvena home"
    >
      <img
        src="/orvena_logo.webp"
        alt="Orvena"
        width={186}
        height={50}
        className={`h-8 w-auto sm:h-9 ${light ? 'drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]' : ''}`}
      />
    </a>
  )
}
