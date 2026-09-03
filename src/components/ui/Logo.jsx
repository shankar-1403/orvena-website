export default function Logo({ className = '', light = false }) {
  const mark = light ? '#FB923C' : '#C2410C'
  const node = light ? '#EA580C' : '#071A2B'
  const word = light ? 'text-white' : 'text-navy'

  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Orvena home"
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="32"
          height="32"
          rx="10"
          className={light ? 'fill-white/8 stroke-white/15' : 'fill-mint-soft stroke-line'}
        />
        <circle cx="11" cy="13" r="2.1" fill={node} />
        <circle cx="23" cy="11" r="2.1" fill={mark} />
        <circle cx="17" cy="22" r="2.3" fill={light ? '#ffffff' : '#C2410C'} />
        <path
          d="M11 13 L23 11 L17 22 Z"
          stroke={mark}
          strokeWidth="1.3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`text-[17px] font-semibold tracking-tight ${word}`}>
        Or
        <span className={light ? 'text-mint' : 'text-teal'}>vena</span>
      </span>
    </a>
  )
}
