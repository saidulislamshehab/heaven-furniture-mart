import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

const RELOAD_THROTTLE_MS = 15_000

function isChunkLoadError(error: Error | null): boolean {
  if (!error?.message) return false
  const msg = error.message.toLowerCase()
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('dynamically imported module')
  )
}

function handleAutoReloadOnChunkFailure(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const key = 'heaven_chunk_reload_ts'
    const lastReload = sessionStorage.getItem(key)
    const now = Date.now()
    if (!lastReload || now - parseInt(lastReload, 10) > RELOAD_THROTTLE_MS) {
      sessionStorage.setItem(key, String(now))
      window.location.reload()
      return true
    }
  } catch {
    // sessionStorage might be restricted in private browsing
  }
  return false
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught an unhandled error]:', error, errorInfo)

    if (isChunkLoadError(error)) {
      const reloaded = handleAutoReloadOnChunkFailure()
      if (reloaded) return
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center bg-brand-teal-deep px-6 py-20 text-center text-brand-ivory">
          <div className="max-w-md rounded-2xl border border-brand-gold/20 bg-brand-ink/60 p-8 shadow-2xl backdrop-blur-md">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold">
              Experience Notice
            </span>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-wide text-brand-ivory sm:text-3xl">
              Something Interrupted Your View
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-ivory/70">
              An unexpected update or connection hiccup occurred while rendering this page. A quick reload will restore your session.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-gold px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-brand-teal-deep transition-all duration-300 hover:bg-brand-gold-soft hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-teal-deep"
              >
                Reload Experience
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-brand-ivory/20 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-brand-ivory/90 transition-all duration-300 hover:border-brand-gold/60 hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
