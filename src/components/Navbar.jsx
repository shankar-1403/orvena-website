import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { navLinks, loginUrl } from '../data/services'
import Container from './ui/Container'
import Logo from './ui/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-4">
      <div
        className={`overflow-hidden rounded-[24px] border transition-all duration-300 sm:rounded-[28px] ${
          scrolled
            ? 'border-navy/8 bg-white/92 shadow-lift backdrop-blur-xl'
            : 'border-navy/6 bg-white/80 shadow-card backdrop-blur-xl'
        }`}
      >
        <Container className="relative flex h-[64px] items-center justify-between lg:h-[72px]">
          <Logo />

          <nav
            className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
            aria-label="Primary"
          >
            <div className="pointer-events-auto flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `relative px-2 py-2 text-[12px] tracking-tight transition-colors duration-300 xl:px-3 xl:text-[13px] ${
                      isActive ? 'font-semibold text-navy' : 'font-medium text-muted hover:text-navy'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive ? (
                        <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent" />
                      ) : null}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+917506543960"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span className="hidden xl:inline">+91 7506543960</span>
              <span className="xl:hidden">Contact Us</span>
            </a>
            <a
              href={loginUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] font-semibold text-navy transition-colors hover:text-accent"
            >
              Login
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white/70 text-navy lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-3 z-50 max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[24px] bg-navy shadow-lift sm:rounded-[28px] lg:hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="flex h-[64px] items-center justify-between px-4 sm:px-5">
              <div className="inline-flex rounded-2xl bg-white px-3 py-1.5">
                <Logo />
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pb-8 pt-4 sm:px-8 sm:pt-6" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-3.5 text-[22px] font-semibold tracking-tight text-white sm:py-4 sm:text-3xl"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <a
                href="tel:+917506543960"
                className="mt-8 text-center text-sm font-medium text-mint"
              >
                24/7 +91 7506543960
              </a>
              <a
                href={loginUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-center text-sm font-semibold text-white"
              >
                Login / Sign-Up
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
