export default function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.22em] ${
        light ? 'text-mint/80' : 'text-teal'
      } ${className}`}
    >
      {children}
    </p>
  )
}
