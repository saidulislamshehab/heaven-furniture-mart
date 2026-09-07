import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react'
import { ArrowUp, Sparkles, X } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

const WELCOME =
  'Welcome to Heaven Furniture Mart. I can help you learn about our bespoke furniture, craftsmanship, showroom and services.'

const SUGGESTIONS = [
  'What does Heaven specialize in?',
  'Do you make custom furniture?',
  'Where is the showroom?',
  'How can I contact Heaven?',
]

const FALLBACK_ERROR =
  "Sorry, I'm having trouble responding right now. Please try again in a moment or contact Heaven directly."

/* Gooey shell geometry: trigger disc size and the gap the panel lifts to before it grows. */
const DISC = 48
const LIFT = DISC + 12
const SPRING: Transition = { type: 'spring', stiffness: 300, damping: 30 }

let nextId = 1

export function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [morphing, setMorphing] = useState(false)
  const [dims, setDims] = useState({ width: 384, height: 560 })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const reduce = useReducedMotion()
  const titleId = useId()
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  function toggle(next = !open) {
    setMorphing(true)
    setOpen(next)
  }

  // Stay out of the hero: appear once the visitor has scrolled past most of the first screen.
  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Panel size is animated numerically, so measure the viewport rather than relying on CSS.
  useLayoutEffect(() => {
    if (!open) return
    const measure = () => {
      const mobile = window.innerWidth < 640
      setDims({
        width: mobile ? window.innerWidth - 28 : 384,
        height: Math.round(Math.min(window.innerHeight * (mobile ? 0.7 : 0.72), mobile ? 544 : 576)),
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [open])

  // Focus management: input on open, trigger on close. Escape closes.
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 350)
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggle(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, pending, reduce])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(text: string) {
    const content = text.trim()
    if (!content || pending) return
    const userMsg: Message = { id: nextId++, role: 'user', content }
    const history = [...messages.filter((m) => !m.error), userMsg]
    setMessages((m) => [...m, userMsg])
    setInput('')
    setPending(true)
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ messages: history.slice(-12).map(({ role, content }) => ({ role, content })) }),
      })
      const data = (await res.json().catch(() => null)) as { answer?: string; error?: string } | null
      if (!res.ok || !data?.answer) {
        setMessages((m) => [...m, { id: nextId++, role: 'assistant', content: data?.error || FALLBACK_ERROR, error: true }])
      } else {
        setMessages((m) => [...m, { id: nextId++, role: 'assistant', content: data.answer! }])
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setMessages((m) => [...m, { id: nextId++, role: 'assistant', content: FALLBACK_ERROR, error: true }])
    } finally {
      if (abortRef.current === controller) setPending(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(input)
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send(input)
    }
  }

  // Gooey shell: a disc rises out of the trigger, then swells into the panel (and reverses on close).
  const shellVariants = reduce
    ? {
        closed: { opacity: 0, y: -LIFT, width: dims.width, height: dims.height, borderRadius: 12, transition: { duration: 0.15 } },
        open: { opacity: 1, y: -LIFT, width: dims.width, height: dims.height, borderRadius: 12, transition: { duration: 0.2 } },
      }
    : {
        closed: {
          opacity: 1,
          y: 0,
          width: DISC,
          height: DISC,
          borderRadius: DISC / 2,
          transition: { ...SPRING, y: { ...SPRING, delay: 0.15 }, width: { ...SPRING }, height: { ...SPRING }, borderRadius: { ...SPRING } },
        },
        open: {
          opacity: 1,
          y: -LIFT,
          width: dims.width,
          height: dims.height,
          borderRadius: 12,
          transition: {
            ...SPRING,
            width: { ...SPRING, delay: 0.15 },
            height: { ...SPRING, delay: 0.15 },
            borderRadius: { ...SPRING, delay: 0.15 },
          },
        },
      }

  const settled = open && !morphing

  return (
    <div
      className={cn(
        'fixed z-[55] size-12 transition-[transform,opacity] duration-500 ease-[var(--ease-luxury)] motion-reduce:transition-none',
        'bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-[max(1rem,env(safe-area-inset-left))] sm:bottom-6 sm:left-6',
        revealed || open ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      {/* Goo filter is only applied while morphing so steady-state text/scrolling stay crisp and cheap. */}
      <svg aria-hidden className="absolute size-0">
        <defs>
          <filter id="hfm-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="relative size-12" style={{ filter: morphing && !reduce ? 'url(#hfm-goo)' : undefined }}>
        <AnimatePresence onExitComplete={() => setMorphing(false)}>
          {open && (
            <motion.section
              key="panel"
              role="dialog"
              aria-labelledby={titleId}
              // Lenis hijacks wheel events site-wide; opt the whole panel out so the log scrolls natively
              data-lenis-prevent
              variants={shellVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onAnimationComplete={(name) => name === 'open' && setMorphing(false)}
              className={cn(
                'absolute bottom-0 left-0 z-10 flex flex-col overflow-hidden border bg-assistant-surface font-sans text-assistant-ink',
                settled ? 'border-assistant-line shadow-[0_32px_80px_-24px_rgba(27,29,31,0.45),0_2px_8px_-2px_rgba(27,29,31,0.12)]' : 'border-transparent'
              )}
            >
              <motion.div
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.25, delay: reduce ? 0 : 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <header className="flex items-center justify-between gap-4 border-b border-assistant-line px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-assistant-accent text-assistant-surface">
                      <Sparkles className="size-4" strokeWidth={2} />
                    </span>
                    <div className="flex flex-col leading-none">
                      <span id={titleId} className="text-[0.95rem] font-semibold tracking-[-0.01em] text-assistant-ink">
                        Heaven Concierge
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-assistant-muted uppercase">
                        <span aria-hidden className="size-1.5 rounded-full bg-assistant-accent" />
                        AI assistant
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggle(false)
                      triggerRef.current?.focus()
                    }}
                    aria-label="Close assistant"
                    className="-mr-2 flex size-10 items-center justify-center rounded-full text-assistant-muted transition-colors hover:bg-assistant-surface-2 hover:text-assistant-ink"
                  >
                    <X className="size-4" strokeWidth={1.75} />
                  </button>
                </header>

            <div
              ref={logRef}
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 text-[0.92rem] leading-relaxed scrollbar-none"
              aria-live="polite"
              aria-relevant="additions"
            >
              <p className="max-w-[92%] text-assistant-muted">{WELCOME}</p>
              {messages.length === 0 && (
                <ul className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => void send(s)}
                        className="rounded-full border border-assistant-line bg-assistant-surface px-3.5 py-2 text-left text-[0.8rem] font-medium text-assistant-ink transition-colors hover:border-assistant-accent hover:bg-assistant-accent-soft"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <ol className="space-y-4" aria-label="Conversation">
                {messages.map((m) => (
                  <li key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[88%] whitespace-pre-wrap [overflow-wrap:anywhere] px-4 py-3',
                        m.role === 'user'
                          ? 'rounded-2xl rounded-br-md bg-assistant-ink text-assistant-surface'
                          : cn('rounded-2xl rounded-bl-md bg-assistant-surface-2 text-assistant-ink', m.error && 'ring-1 ring-assistant-accent/50')
                      )}
                    >
                      <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Heaven assistant: '}</span>
                      {m.content}
                    </div>
                  </li>
                ))}
                {pending && (
                  <li className="flex justify-start" aria-label="Assistant is typing">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-assistant-surface-2 px-4 py-3.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={cn('size-1.5 rounded-full bg-assistant-accent', !reduce && 'animate-pulse')}
                          style={reduce ? undefined : { animationDelay: `${i * 160}ms` }}
                        />
                      ))}
                    </div>
                  </li>
                )}
              </ol>
            </div>

            <form onSubmit={onSubmit} className="border-t border-assistant-line px-4 pt-3 pb-3.5">
              <div
                className={cn(
                  'flex items-end gap-2 rounded-2xl border border-assistant-line bg-assistant-surface-2 pl-4 pr-1.5 py-1.5 transition-[border-color,box-shadow]',
                  'focus-within:border-assistant-accent focus-within:shadow-[0_0_0_3px_var(--assistant-accent-soft)]',
                  pending && 'opacity-70'
                )}
              >
                <label className="sr-only" htmlFor={`${titleId}-input`}>
                  Ask about Heaven Furniture Mart
                </label>
                <textarea
                  id={`${titleId}-input`}
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={1000}
                  placeholder="Ask about our furniture, showroom…"
                  disabled={pending}
                  aria-describedby={`${titleId}-hint`}
                  className="max-h-28 min-h-9 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 text-assistant-ink outline-none placeholder:text-assistant-muted/70 disabled:cursor-not-allowed sm:text-[0.92rem] field-sizing-content scrollbar-none"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  aria-label="Send message"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-assistant-accent text-assistant-surface transition-[background-color,opacity,transform] hover:bg-assistant-ink active:scale-95 disabled:opacity-30 disabled:active:scale-100"
                >
                  <ArrowUp className="size-4" strokeWidth={2.25} />
                </button>
              </div>
              <p id={`${titleId}-hint`} className="mt-2 px-1 font-mono text-[0.62rem] leading-relaxed tracking-[0.02em] text-assistant-muted">
                AI assistant · answers only about Heaven. For quotes, call{' '}
                <a
                  href={`tel:${site.phoneE164}`}
                  className="whitespace-nowrap text-assistant-accent underline decoration-assistant-accent/40 underline-offset-2 transition-colors hover:text-assistant-ink"
                >
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </form>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => toggle()}
          aria-expanded={open}
          aria-label={open ? 'Close Heaven assistant' : 'Ask Heaven — open assistant'}
          tabIndex={revealed || open ? 0 : -1}
          aria-hidden={!(revealed || open)}
          className={cn(
            'group relative z-20 flex size-12 items-center justify-center rounded-full border bg-assistant-surface text-assistant-accent outline-none',
            'transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-luxury)] motion-reduce:transition-none',
            'hover:-translate-y-0.5 hover:border-assistant-accent focus-visible:border-assistant-accent focus-visible:ring-2 focus-visible:ring-assistant-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory',
            open && !settled ? 'border-transparent shadow-none' : 'border-assistant-line shadow-[0_18px_40px_-14px_rgba(27,29,31,0.45),0_1px_3px_rgba(27,29,31,0.08)]'
          )}
        >
          {!open && (
            <span
              aria-hidden
              className="absolute inset-1.5 rounded-full border border-assistant-accent/60 motion-safe:animate-[assistant-halo_2.8s_ease-out_infinite] group-hover:hidden"
            />
          )}
          <span
            className={cn(
              'relative flex size-8 items-center justify-center rounded-full bg-assistant-accent text-assistant-surface transition-transform duration-500 ease-[var(--ease-luxury)]',
              !open && 'motion-safe:animate-[assistant-twinkle_2.8s_ease-in-out_infinite] group-hover:[animation:none] group-hover:scale-105',
              open && 'rotate-90 scale-95'
            )}
          >
            {open ? <X className="size-4" strokeWidth={2} /> : <Sparkles className="size-4" strokeWidth={2} />}
          </span>
        </button>
      </div>

      {/* Hover label lives outside the filtered wrapper so the goo never smears text. */}
      {!open && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-14 -translate-y-1/2 whitespace-nowrap rounded-full bg-assistant-surface px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.1em] text-assistant-ink uppercase shadow-[0_8px_24px_-10px_rgba(27,29,31,0.4)] opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100 [div:focus-within>&]:opacity-100 motion-reduce:transition-none"
        >
          Ask Heaven
        </span>
      )}
    </div>
  )
}

export default AssistantWidget
