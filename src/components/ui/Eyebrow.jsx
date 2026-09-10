export default function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        light
          ? 'border-white/15 bg-white/8 text-mint/90'
          : 'border-accent/15 bg-white text-accent shadow-[0_8px_20px_-12px_rgba(11,65,86,0.25)]'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-mint' : 'bg-accent'}`} />
      {children}
    </p>
  )
}
