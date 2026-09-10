export default function SectionCard({
  as: Comp = 'section',
  id,
  className = '',
  children,
}) {
  return (
    <Comp
      id={id}
      className={`relative overflow-hidden rounded-[22px] shadow-card sm:rounded-[28px] lg:rounded-[36px] ${className}`}
    >
      {children}
    </Comp>
  )
}
