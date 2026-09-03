import { stats } from '../data/services'
import { useCountUp } from '../hooks/useCountUp'
import Container from './ui/Container'

function Stat({ value, suffix, label }) {
  const { ref, value: n } = useCountUp(value, { duration: 1700 })

  return (
    <div ref={ref} className="px-2 py-6 text-center">
      <p className="text-[34px] font-extrabold tracking-tight text-navy sm:text-[42px] lg:text-[48px]">
        {Math.round(n)}
        {suffix}
      </p>
      <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-teal">
        {label}
      </p>
    </div>
  )
}

export default function TrustStats() {
  return (
    <section aria-label="Orvena at a glance" className="border-y border-line bg-white">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={index !== stats.length - 1 ? 'lg:border-r lg:border-line' : ''}
            >
              <Stat {...stat} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
