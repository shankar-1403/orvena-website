import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileCTA from './MobileCTA'
import ScrollToTop from './ScrollToTop'
import { usePointerGlow } from '../hooks/usePointerGlow'

export default function Layout() {
  usePointerGlow()

  return (
    <div className="min-h-svh bg-pale text-ink">
      <Navbar />
      <div className="flex flex-col gap-3 px-3 pb-3 pt-[88px] sm:gap-4 sm:px-4 sm:pb-4 sm:pt-[100px]">
        <main id="main" className="flex flex-col gap-3 sm:gap-4">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileCTA />
      <ScrollToTop />
    </div>
  )
}
