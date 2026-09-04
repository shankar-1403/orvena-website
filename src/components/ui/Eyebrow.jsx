export default function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.22em] ${
        light ? 'text-mint/80' : 'text-accent'
      }`}
    >
      {children}
    </p>
  )
}
