import Eyebrow from './Eyebrow'

export default function SectionHeader({
  eyebrow,
  light = false,
  title,
  description,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-2xl text-left">
        {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
        <h2
          className={`mt-4 text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[48px] lg:text-[56px] ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-4 max-w-[54ch] text-[17px] leading-8 ${light ? 'text-white/65' : 'text-muted'}`}>
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="max-w-md text-left">{children}</div> : null}
    </div>
  )
}
