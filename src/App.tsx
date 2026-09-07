import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SmoothScrollProvider } from '@/components/common/SmoothScrollProvider'
import { ConsultationProvider } from '@/components/common/ConsultationProvider'
import { IntroLoader, useIntroDone } from '@/components/common/IntroLoader'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'

const ShopPage = lazy(() => import('@/pages/ShopPage').then((m) => ({ default: m.ShopPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const VisitPage = lazy(() => import('@/pages/VisitPage').then((m) => ({ default: m.VisitPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function AppShell() {
  const [introDone, markIntroDone] = useIntroDone()

  return (
    <SmoothScrollProvider>
      <ConsultationProvider>
        <IntroLoader show={!introDone} onDone={markIntroDone} />
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage introDone={introDone} />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="visit" element={<VisitPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ConsultationProvider>
    </SmoothScrollProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
