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
        <ArrowRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </Comp>
  )
}
