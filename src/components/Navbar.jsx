import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { healthosWebUrl, navLinks } from '../data/site'
import Container from './ui/Container'
import Logo from './ui/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // A pinned frame (the HealthOS sequence) scrolls the page without moving its
    // content, so the bar stays full width until that frame releases the viewport.
    const holdingViewport = () => {
      const frame = document.querySelector('[data-pinned-frame]')
      if (!frame) return false
      const rect = frame.getBoundingClientRect()
      return rect.top <= 104 && rect.bottom > window.innerHeight
    }

    const onScroll = () => setScrolled(!holdingViewport() && window.scrollY > 18)
    onScroll()

    // The pinned frame only mounts once its media query resolves, so re-check
    // after paint too — otherwise a page that loads already scrolled stays shrunk.
    const frame = requestAnimationFrame(onScroll)
    const timer = window.setTimeout(onScroll, 250)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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
        className={`mx-auto w-full overflow-hidden rounded-[24px] border transition-all duration-300 sm:rounded-[28px] ${
          scrolled
            ? 'max-w-[1200px] border-navy/8 bg-white/92 shadow-lift backdrop-blur-xl'
            : 'max-w-full border-navy/6 bg-white/80 shadow-card backdrop-blur-xl'
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
              href={healthosWebUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-soft transition-colors hover:bg-accent-deep"
            >
              Open HealthOS
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
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
              <div className="mt-8">
                <a
                  href={healthosWebUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white"
                >
                  Open HealthOS
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              {/* Phone number hidden on request.
              <a href="tel:...">24/7 phone</a> */}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
