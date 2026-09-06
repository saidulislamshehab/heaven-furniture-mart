import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/common/ErrorBoundary.tsx'

// Handle dynamic import failures when a new deployment has updated asset chunk hashes
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    try {
      const key = 'heaven_preload_reload_ts'
      const lastReload = sessionStorage.getItem(key)
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload, 10) > 15_000) {
        sessionStorage.setItem(key, String(now))
        window.location.reload()
      }
    } catch {
      window.location.reload()
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
