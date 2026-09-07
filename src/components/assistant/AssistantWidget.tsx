import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUp, Sparkles, X } from 'lucide-react'
import { luxuryEase } from '@/components/common/Reveal'
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

let nextId = 1

export function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const reduce = useReducedMotion()
  const titleId = useId()
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Stay out of the hero: appear once the visitor has scrolled past most of the first screen.
  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Focus management: input on open, trigger on close. Escape closes.
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 60)
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
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

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-labelledby={titleId}
            // Lenis hijacks wheel events site-wide; opt the whole panel out so the log scrolls natively
            data-lenis-prevent
            {...panelMotion}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className={cn(
              'fixed z-[55] flex flex-col overflow-hidden rounded-sm border border-brand-gold/50 bg-brand-ink text-brand-ivory shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(201,168,106,0.12)]',
              'left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] bottom-[calc(env(safe-area-inset-bottom)+5rem)] max-h-[min(70dvh,34rem)]',
              'sm:left-6 sm:right-auto sm:bottom-24 sm:w-[24rem] sm:max-h-[min(72dvh,36rem)]'
            )}
          >
            <header className="flex items-start justify-between gap-4 border-b border-brand-gold/30 bg-gradient-to-b from-brand-gold/[0.08] to-transparent px-5 py-4">
              <div className="flex flex-col leading-none">
                <span id={titleId} className="font-serif text-xl tracking-[0.14em] text-brand-gold">
                  HEAVEN
                </span>
                <span className="eyebrow mt-1 text-[0.55rem] tracking-[0.3em] text-brand-ivory/55">Furniture Mart Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                aria-label="Close assistant"
                className="-mr-2 -mt-1 flex size-10 items-center justify-center rounded-full text-brand-ivory/55 transition-colors hover:bg-brand-gold/10 hover:text-brand-gold"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </header>

            <div
              ref={logRef}
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 text-[0.92rem] leading-relaxed scrollbar-none"
              aria-live="polite"
              aria-relevant="additions"
            >
              <p className="max-w-[92%] text-brand-ivory/75">{WELCOME}</p>
              {messages.length === 0 && (
                <ul className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => void send(s)}
                        className="rounded-full border border-brand-gold/35 px-3.5 py-2 text-left text-[0.8rem] text-brand-gold-soft transition-colors hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
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
                          ? 'rounded-2xl rounded-br-sm bg-brand-gold text-brand-ink'
                          : cn('rounded-2xl rounded-bl-sm border border-brand-ivory/10 bg-brand-ivory/[0.05] text-brand-ivory/90', m.error && 'border-brand-gold/60')
                      )}
                    >
                      <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Heaven assistant: '}</span>
                      {m.content}
                    </div>
                  </li>
                ))}
                {pending && (
                  <li className="flex justify-start" aria-label="Assistant is typing">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-brand-ivory/10 bg-brand-ivory/[0.05] px-4 py-3.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={cn('size-1.5 rounded-full bg-brand-gold', !reduce && 'animate-pulse')}
                          style={reduce ? undefined : { animationDelay: `${i * 160}ms` }}
                        />
                      ))}
                    </div>
                  </li>
                )}
              </ol>
            </div>

            <form onSubmit={onSubmit} className="border-t border-brand-gold/20 px-4 pt-3 pb-3.5">
              <div
                className={cn(
                  'flex items-end gap-2 rounded-full border border-brand-ivory/15 bg-brand-ivory/[0.04] pl-4 pr-1.5 py-1.5 transition-colors',
                  'focus-within:border-brand-gold focus-within:bg-brand-ivory/[0.07]',
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
                  className="max-h-28 min-h-9 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 text-brand-ivory outline-none placeholder:text-brand-ivory/40 disabled:cursor-not-allowed sm:text-[0.92rem] field-sizing-content scrollbar-none"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  aria-label="Send message"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-ink transition-[background-color,opacity,transform] hover:bg-brand-gold-soft active:scale-95 disabled:opacity-35 disabled:active:scale-100"
                >
                  <ArrowUp className="size-4" strokeWidth={2} />
                </button>
              </div>
              <p id={`${titleId}-hint`} className="mt-2 px-1 text-[0.65rem] leading-relaxed text-brand-ivory/40">
                AI assistant · answers only about Heaven. For quotes, call{' '}
                <a
                  href={`tel:${site.phoneE164}`}
                  className="whitespace-nowrap text-brand-gold-soft underline decoration-brand-gold/50 underline-offset-2 transition-colors hover:text-brand-gold"
                >
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close Heaven assistant' : 'Ask Heaven — open assistant'}
        tabIndex={revealed || open ? 0 : -1}
        aria-hidden={!(revealed || open)}
        className={cn(
          // Icon-only pill that grows to reveal its label on hover / keyboard focus
          'group fixed z-[55] grid h-12 grid-cols-[3rem_0fr] items-center rounded-full border border-brand-gold/60 bg-brand-ink/95 text-brand-gold shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md',
          'transition-[grid-template-columns,transform,opacity,border-color,box-shadow] duration-500 ease-[var(--ease-luxury)] motion-reduce:transition-none',
          'hover:grid-cols-[3rem_1fr] hover:border-brand-gold hover:shadow-[0_22px_50px_-12px_rgba(0,0,0,0.9),0_0_24px_-6px_rgba(201,168,106,0.45)] focus-visible:grid-cols-[3rem_1fr] focus-visible:border-brand-gold',
          'bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-[max(1rem,env(safe-area-inset-left))] sm:bottom-6 sm:left-6',
          revealed || open ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <span className="relative flex size-12 items-center justify-center">
          {!open && (
            <span
              aria-hidden
              className="absolute inset-1.5 rounded-full border border-brand-gold/70 motion-safe:animate-[assistant-halo_2.8s_ease-out_infinite] group-hover:hidden"
            />
          )}
          <span
            className={cn(
              'relative flex size-8 items-center justify-center rounded-full bg-brand-gold text-brand-ink transition-transform duration-500 ease-[var(--ease-luxury)]',
              !open && 'motion-safe:animate-[assistant-twinkle_2.8s_ease-in-out_infinite] group-hover:[animation:none] group-hover:scale-105',
              open && 'rotate-90 scale-95'
            )}
          >
            {open ? <X className="size-4" strokeWidth={2} /> : <Sparkles className="size-4" strokeWidth={2} />}
          </span>
        </span>
        <span className="min-w-0 overflow-hidden">
          <span className="eyebrow block whitespace-nowrap pr-5 text-[0.62rem] opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
            {open ? 'Close' : 'Ask Heaven'}
          </span>
        </span>
      </button>
    </>
  )
}

export default AssistantWidget
