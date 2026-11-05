import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-deep shadow-soft',
  secondary: 'bg-white text-navy border border-navy/10 hover:border-accent/40 hover:text-accent',
  ghost: 'bg-transparent text-accent px-1 py-1 hover:text-navy',
  light: 'bg-white text-navy hover:bg-mint-soft',
  outline: 'border border-white/25 bg-white/5 text-white hover:bg-white/12',
}

// The small circle the arrow sits in, per variant
const arrowWell = {
  primary: 'bg-white/20',
  secondary: 'bg-navy/6 group-hover:bg-accent/12',
  ghost: 'bg-transparent',
  light: 'bg-navy/8 group-hover:bg-accent/15',
  outline: 'bg-white/12',
}

function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/')
}

export default function Button({
  as = 'a',
  href = '/contact',
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  showArrow = true,
  ...props
}) {
  const internal = as !== 'button' && isInternal(href)
  const Comp = as === 'button' ? motion.button : internal ? MotionLink : motion.a

  return (
    <Comp
      to={internal ? href : undefined}
      href={as === 'button' || internal ? undefined : href}
      type={as === 'button' ? type : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-[14px] font-semibold tracking-tight transition-colors duration-300 sm:px-6 sm:py-3.5 sm:text-[15px] ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className={`relative z-10 -my-1 -mr-2 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 sm:-mr-2.5 ${arrowWell[variant]}`}
        >
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      ) : null}
    </Comp>
  )
}
