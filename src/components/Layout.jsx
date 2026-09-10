import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileCTA from './MobileCTA'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <div className="min-h-svh bg-pale text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
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
