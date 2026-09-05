import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { luxuryEase } from '@/components/common/Reveal'
import { scrollToHash, scrollToTop } from '@/lib/scroll'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) {
      // Wait a frame so the new page has painted before scrolling to the anchor.
      const id = requestAnimationFrame(() => scrollToHash(hash))
      return () => cancelAnimationFrame(id)
    }
    scrollToTop(true)
  }, [pathname, hash])
  return null
}

function RouteFallback() {
  return <div className="min-h-screen bg-brand-teal-deep" aria-busy="true" />
}

export function RootLayout() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-brand-teal-deep font-sans text-brand-ivory antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-brand-teal-deep"
      >
        Skip to content
      </a>
      <Navbar />
      <ScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="flex flex-1 flex-col"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: luxuryEase }}
        >
          <main id="main" className="flex-1">
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
