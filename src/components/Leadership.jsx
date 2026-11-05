import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import SectionCard from './ui/SectionCard'

// 'Suraj Singh' -> 'SS'
const initials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')

const groups = [
  {
    id: 'strategic',
    label: 'Leadership & strategic advisory',
    people: [
      'Vinay Sohani',
      'Suraj Singh',
      'Mohini Choudhary',
      'Karan Desai',
      'Sanjay Jhanwar',
      'Pankaj Chaurasia',
    ],
  },
  {
    id: 'technology',
    label: 'Technology & architecture advisory',
    people: ['Uttam Mohanty', 'Rohan Yadav', 'Aditi Jain', 'Shankar', 'Aryan Rajbhar'],
  },
]

export default function Leadership() {
  return (
    <SectionCard id="leadership" className="bg-soft py-10 sm:py-12 lg:py-14">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="mt-2.5 text-[26px] font-extrabold leading-[1.1] tracking-[-0.045em] text-navy sm:text-[36px] lg:text-[46px]">
                The People Behind
                <span className="mt-1 block">
                  The <span className="text-accent">Ecosystem.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-6 text-muted">
              Clinical, commercial and engineering advisors behind the ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={0.08 + groupIndex * 0.06}>
              <section className="h-full rounded-[22px] border border-line bg-white/70 p-4 sm:rounded-[28px] sm:p-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {group.label}
                </h3>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {group.people.map((name, index) => (
                    <li
                      key={name}
                      className="o-card o-card--frame flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card lg:gap-2.5 lg:px-3 xl:gap-3 xl:px-4"
                    >
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-navy/35 lg:hidden xl:inline">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="o-card-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold tracking-wide text-white"
                      >
                        {initials(name)}
                      </span>
                      <p className="min-w-0 truncate text-[14px] font-semibold tracking-tight text-navy">
                        {name}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionCard>
  )
}
