import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MorphingButtonProps {
  buttonText?: string
  placeholder?: string
  onSubmit?: (email: string) => void
  successText?: string
  className?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Pill button that morphs into an inline email field; tuned for the dark footer. */
export function MorphingButton({
  buttonText = 'Keep me posted',
  placeholder = 'Email address',
  onSubmit,
  successText = 'Thank you — we opened your mail app so you can send it.',
  className,
}: MorphingButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()
  const messageId = useId()

  useEffect(() => {
    if (!isExpanded) return
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setError(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isExpanded])

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus()
  }, [isExpanded])

  useEffect(() => {
    if (!sent) return
    const t = window.setTimeout(() => setSent(false), 6000)
    return () => window.clearTimeout(t)
  }, [sent])

  const submit = () => {
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setError('Enter an email address so we can reach you.')
      inputRef.current?.focus()
      return
    }
    onSubmit?.(value)
    setIsExpanded(false)
    setEmail('')
    setError(null)
    setSent(true)
  }

  const handleToggle = (e: MouseEvent) => {
    if (!isExpanded) {
      e.stopPropagation()
      setSent(false)
      setIsExpanded(true)
    } else {
      submit()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'Escape') {
      setIsExpanded(false)
      setError(null)
    }
  }

  const spring = reduce
    ? { duration: 0 }
    : ({ type: 'spring', stiffness: 240, damping: 18, mass: 1.1 } as const)

  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      <motion.div
        ref={containerRef}
        layout
        transition={spring}
        style={{ borderRadius: 999 }}
        className={cn(
          'relative flex items-center overflow-hidden border transition-colors duration-300',
          isExpanded
            ? 'w-full max-w-[21rem] border-brand-gold/40 bg-brand-ivory/[0.07] p-1'
            : 'w-auto border-brand-ivory/15 bg-brand-ivory/[0.04] p-0 hover:border-brand-gold/40',
        )}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
              className="flex min-w-0 flex-1 items-center pl-4 pr-2"
            >
              <input
                ref={inputRef}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label={placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? messageId : undefined}
                className="w-full min-w-0 bg-transparent text-[0.95rem] text-brand-ivory outline-none placeholder:text-brand-ivory/40"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          onClick={handleToggle}
          transition={spring}
          aria-expanded={isExpanded}
          className={cn(
            'relative flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-full whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink',
            isExpanded
              ? 'bg-brand-gold px-5 py-2.5 text-brand-ink hover:bg-brand-gold-soft'
              : 'bg-transparent px-6 py-3 text-brand-ivory hover:bg-brand-ivory/10',
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!isExpanded && (
              <motion.span
                key="bell"
                layout
                className="origin-right"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={spring}
              >
                <Bell className="size-4 text-brand-gold" strokeWidth={1.75} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span layout="position" className="eyebrow text-[0.7rem] tracking-[0.18em]">
            {isExpanded ? 'Send' : buttonText}
          </motion.span>
        </motion.button>
      </motion.div>

      {error ? (
        <p id={messageId} role="alert" className="text-xs text-brand-gold-soft">
          {error}
        </p>
      ) : sent ? (
        <p role="status" className="text-xs text-brand-ivory/60">
          {successText}
        </p>
      ) : null}
    </div>
  )
}
