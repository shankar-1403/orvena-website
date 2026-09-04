import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { navLinks } from '../data/services'
import { useActiveSection } from '../hooks/useActiveSection'
import Container from './ui/Container'
import Logo from './ui/Logo'

const sectionIds = ['home', 'about', 'services', 'patient-os', 'doctors', 'technology', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Separate blur layer — avoids Chrome seams when nav items scale on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
          scrolled
            ? 'border-b border-navy/8 bg-white/90 shadow-[0_8px_30px_-18px_rgba(11,65,86,0.25)] backdrop-blur-xl'
            : 'bg-white/70 backdrop-blur-xl'
        }`}
      />

      <Container className="relative flex h-[76px] items-center justify-between lg:h-[84px]">
        <Logo />

        <nav
          className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
          aria-label="Primary"
        >
          <div className="pointer-events-auto flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  animate={
                    isActive
                      ? { scale: 1.06, fontWeight: 600 }
                      : { scale: 1, fontWeight: 500 }
                  }
                  transition={{ type: 'spring', stiffness: 480, damping: 22, mass: 0.6 }}
                  className={`relative origin-center px-3.5 py-2 text-[13.5px] tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-navy' : 'text-muted hover:text-navy'
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                </motion.a>
              )
            })}
          </div>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+917506543960"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy transition-colors hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="hidden xl:inline">+91 7506543960</span>
            <span className="xl:hidden">Contact Us</span>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 bg-white/70 text-navy lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-navy lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-[76px] items-center justify-between px-5">
              <Logo light />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-8 pt-8" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-white/10 py-4 text-3xl font-semibold tracking-tight text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="tel:+917506543960"
                className="mt-8 text-center text-sm font-medium text-mint"
              >
                +91 7506543960
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
