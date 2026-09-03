import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-navy text-white hover:bg-midnight shadow-soft',
  secondary:
    'bg-white text-navy border border-navy/10 hover:border-teal/40 hover:text-teal',
  ghost: 'bg-transparent text-teal px-1 py-1 hover:text-midnight',
  light: 'bg-white text-navy hover:bg-mint-soft',
  outline:
    'border border-white/25 bg-white/5 text-white hover:bg-white/12',
}

export default function Button({
  as = 'a',
  href = '#contact',
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  showArrow = true,
  ...props
}) {
  const Comp = as === 'button' ? motion.button : motion.a

  return (
    <Comp
      href={as === 'button' ? undefined : href}
      type={as === 'button' ? type : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold tracking-tight transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </Comp>
  )
}
