import Container from './ui/Container'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

const principles = [
  {
    code: '01',
    title: 'Right care',
    text: 'The treatment that fits the person, not the other way around.',
  },
  {
    code: '02',
    title: 'Right time',
    text: 'Clarity before a decision still has time to change the outcome.',
  },
  {
    code: '03',
    title: 'Right provider',
    text: 'Human expertise, connected by intelligent technology.',
  },
]

export default function Vision() {
  return (
    <section id="vision" className="bg-[#f7f3ef] py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_minmax(0,380px)]">
            <div>
              <Eyebrow>Vision</Eyebrow>
              <h2 className="mt-4 text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] text-navy sm:text-[48px] lg:text-[56px]">
                The Future of Healthcare
                <span className="mt-1 block">
                  Is <span className="text-teal">Connected.</span>
                </span>
              </h2>
            </div>
            <p className="text-[16px] leading-8 text-muted lg:text-[17px]">
              One platform. One vision. Better healthcare for everyone.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="mt-12 max-w-4xl border-l-2 border-teal pl-6 sm:pl-8">
            <p className="text-[20px] font-medium leading-9 tracking-[-0.02em] text-navy sm:text-[24px] sm:leading-10">
              To create a globally connected healthcare ecosystem where patients receive
              the right care, at the right time, from the right provider — powered by
              intelligent technology and human expertise.
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-10">
          {principles.map((item, index) => (
            <Reveal key={item.code} delay={0.06 * index}>
              <p className="text-[12px] font-semibold tracking-[0.18em] text-teal">{item.code}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
