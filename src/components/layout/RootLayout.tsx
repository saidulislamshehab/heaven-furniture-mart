import { Suspense, lazy, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { luxuryEase } from '@/components/common/Reveal'
import { scrollToHash, scrollToTop } from '@/lib/scroll'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

const AssistantWidget = lazy(() => import('@/components/assistant/AssistantWidget'))

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
  return (
    <div
      className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-brand-teal-deep text-brand-ivory transition-opacity duration-300"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="inline-block size-7 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
        <span className="eyebrow tracking-[0.2em] text-brand-gold-soft">
          Loading Atelier…
        </span>
      </div>
    </div>
  )
}

export function RootLayout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  // `AnimatePresence initial={false}` would silence every descendant's `initial` (hero, reveals) on
  // first load, so only the very first route mounts with `initial={false}` on the wrapper.
  const [firstPath] = useState(location.pathname)
  const [navigated, setNavigated] = useState(false)
  if (!navigated && location.pathname !== firstPath) setNavigated(true)
  const skipEnter = !navigated && location.pathname === firstPath

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
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex flex-1 flex-col"
          initial={reduce || skipEnter ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: luxuryEase }}
        >
          <main id="main" className="flex-1">
            <ErrorBoundary>
              <Suspense fallback={<RouteFallback />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <Suspense fallback={null}>
        <AssistantWidget />
      </Suspense>
    </div>
  )
}
