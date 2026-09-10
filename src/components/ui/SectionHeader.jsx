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
    <div className={`flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-2xl text-left">
        {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
        <h2
          className={`mt-3 text-[28px] font-extrabold leading-[1.1] tracking-[-0.04em] sm:mt-4 sm:text-[36px] md:text-[44px] lg:text-[56px] ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-3 max-w-[54ch] text-[15px] leading-7 sm:mt-4 sm:text-[17px] sm:leading-8 ${light ? 'text-white/65' : 'text-muted'}`}>
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="w-full max-w-xl text-left lg:max-w-md">{children}</div> : null}
    </div>
  )
}
