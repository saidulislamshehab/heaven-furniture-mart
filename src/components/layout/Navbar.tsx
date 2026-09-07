import { useEffect, useState, type MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { luxuryEase } from '@/components/common/Reveal'
import { brandImages } from '@/data/assets'
import { site, WHATSAPP_DEFAULT } from '@/data/site'
import { lockScroll, scrollToTopIfSameRoute } from '@/lib/scroll'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Visit', to: '/visit' },
  { label: 'About', to: '/about' },
]

const socialLinks = [
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Facebook', href: site.social.facebook },
  { label: 'WhatsApp', href: WHATSAPP_DEFAULT },
  { label: 'YouTube', href: site.social.youtube },
]

function Wordmark({ dark, onHome }: { dark: boolean; onHome?: (e: MouseEvent) => void }) {
  return (
    <Link to="/" onClick={onHome} className="group flex items-center" aria-label="Heaven Furniture Mart — home">
      <img
        src={brandImages.wordmark}
        alt=""
        width={640}
        height={216}
        className={cn(
          'h-7 w-auto object-contain transition-[filter] duration-500 sm:h-8',
          // Brown artwork reads as ivory over the dark hero; native brown once the bar turns ivory
          dark ? '' : 'brightness-0 invert-[0.94] sepia-[0.15]'
        )}
      />
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useConsultation()
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const onHome = (e: MouseEvent) => scrollToTopIfSameRoute(e, pathname)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Ignore tiny jitter; always show near the top
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    lockScroll(menuOpen)
  }, [menuOpen])

  // Lets sticky elements (e.g. shop filters) sit flush when the bar slides away
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-offset', hidden && !menuOpen ? '0px' : '60px')
  }, [hidden, menuOpen])

  const dark = scrolled

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding,translate] duration-500 ease-[var(--ease-luxury)] will-change-transform motion-reduce:transition-none',
          dark
            ? 'bg-brand-ivory/90 py-3 shadow-[0_1px_0_0_rgba(43,33,28,0.08)] backdrop-blur-md supports-backdrop-filter:bg-brand-ivory/80'
            : 'bg-transparent py-5 sm:py-6',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="container-x mx-auto flex max-w-[1600px] items-center justify-between">
          <Wordmark dark={dark} onHome={onHome} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={l.to === '/' ? onHome : undefined}
                    className={({ isActive }) =>
                      cn(
                        'eyebrow relative py-2 transition-colors duration-300',
                        'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-500 after:ease-[var(--ease-luxury)] hover:after:scale-x-100',
                        dark ? 'text-brand-teal-deep/70 hover:text-brand-teal-deep' : 'text-brand-ivory/75 hover:text-brand-ivory',
                        isActive && (dark ? 'text-brand-teal-deep after:scale-x-100' : 'text-brand-ivory after:scale-x-100')
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant={dark ? 'ink' : 'outline-light'}
              size="pill-sm"
              className="hidden sm:inline-flex"
              onClick={() => open()}
            >
              Request a Consultation <ArrowUpRight />
            </Button>

            <DialogPrimitive.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogPrimitive.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className={cn(
                    'flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden',
                    dark
                      ? 'border-brand-teal-deep/20 text-brand-teal-deep hover:bg-brand-teal-deep/5'
                      : 'border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10'
                  )}
                >
                  <Menu className="size-5" strokeWidth={1.5} />
                </button>
              </DialogPrimitive.Trigger>

              <AnimatePresence>
                {menuOpen && (
                  <DialogPrimitive.Portal forceMount>
                    <DialogPrimitive.Overlay asChild forceMount>
                      <motion.div
                        className="fixed inset-0 z-[60] bg-brand-ink/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </DialogPrimitive.Overlay>
                    <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                      <motion.div
                        className="fixed inset-x-0 top-0 z-[70] flex h-dvh w-full flex-col overflow-y-auto overscroll-contain bg-brand-ivory text-brand-brown shadow-[0_24px_60px_-20px_rgba(13,20,19,0.45)] outline-none sm:right-0 sm:left-auto sm:max-w-md"
                        initial={reduce ? { opacity: 0 } : { y: '-100%' }}
                        animate={reduce ? { opacity: 1 } : { y: 0 }}
                        exit={reduce ? { opacity: 0 } : { y: '-100%' }}
                        transition={{ duration: 0.65, ease: luxuryEase }}
                      >
                        <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
                        <div className="container-x flex shrink-0 items-center justify-between border-b border-brand-brown/10 py-5 sm:py-6">
                          <Wordmark
                            dark
                            onHome={(e) => {
                              scrollToTopIfSameRoute(e, pathname)
                              setMenuOpen(false)
                            }}
                          />
                          <DialogPrimitive.Close asChild>
                            <button
                              type="button"
                              aria-label="Close menu"
                              className="flex size-11 items-center justify-center rounded-full border border-brand-brown/20 text-brand-brown transition-colors hover:border-brand-brown hover:bg-brand-brown hover:text-brand-ivory"
                            >
                              <X className="size-5" strokeWidth={1.5} />
                            </button>
                          </DialogPrimitive.Close>
                        </div>

                        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center py-6">
                          <p className="eyebrow text-brand-stone">Index</p>
                          <ul className="mt-4">
                            {navLinks.map((l, i) => (
                              <motion.li
                                key={l.to}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: luxuryEase }}
                              >
                                <NavLink
                                  to={l.to}
                                  end={l.to === '/'}
                                  onClick={(e) => {
                                    if (l.to === '/') scrollToTopIfSameRoute(e, pathname)
                                    setMenuOpen(false)
                                  }}
                                  className={({ isActive }) =>
                                    cn(
                                      'group/nav flex items-baseline gap-4 border-b border-brand-brown/10 py-3.5 transition-colors',
                                      isActive ? 'text-brand-brown' : 'text-brand-brown/55 hover:text-brand-brown'
                                    )
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      <span className="eyebrow w-6 shrink-0 text-[0.65rem] text-brand-gold">0{i + 1}</span>
                                      <span className="flex-1 font-serif text-[length:clamp(1.85rem,min(7.5vw,9svh),3.25rem)] leading-none tracking-tight">
                                        {l.label}
                                      </span>
                                      <ArrowUpRight
                                        className={cn(
                                          'size-5 shrink-0 self-center text-brand-gold transition-[opacity,transform] duration-500 ease-[var(--ease-luxury)]',
                                          isActive
                                            ? 'opacity-100'
                                            : 'translate-x-2 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100'
                                        )}
                                        strokeWidth={1.5}
                                      />
                                    </>
                                  )}
                                </NavLink>
                              </motion.li>
                            ))}
                          </ul>
                        </nav>

                        <motion.div
                          className="container-x shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.5, ease: luxuryEase }}
                        >
                          <div className="rounded-2xl bg-brand-teal-deep p-5 text-brand-ivory sm:p-6">
                            <p className="eyebrow text-brand-ivory/45">Get in touch</p>
                            <a
                              href={`tel:${site.phoneE164}`}
                              className="mt-3 block font-serif text-2xl leading-none text-brand-ivory transition-colors hover:text-brand-gold-soft"
                            >
                              {site.phoneDisplay}
                            </a>
                            <a
                              href={`mailto:${site.email}`}
                              className="mt-2 block break-all font-sans text-sm text-brand-ivory/70 transition-colors hover:text-brand-gold-soft"
                            >
                              {site.email}
                            </a>

                            <ul className="mt-5 flex flex-wrap gap-2">
                              {socialLinks.map((s) => (
                                <li key={s.label}>
                                  <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-ivory/15 px-3.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-ivory/80 transition-colors hover:border-brand-gold hover:text-brand-gold-soft"
                                  >
                                    {s.label}
                                    <ArrowUpRight className="size-3" />
                                  </a>
                                </li>
                              ))}
                            </ul>

                            <Button
                              variant="gold"
                              size="pill"
                              className="mt-6 w-full"
                              onClick={() => {
                                setMenuOpen(false)
                                open()
                              }}
                            >
                              Request a Consultation <ArrowUpRight />
                            </Button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </DialogPrimitive.Content>
                  </DialogPrimitive.Portal>
                )}
              </AnimatePresence>
            </DialogPrimitive.Root>
          </div>
        </div>
      </header>
    </>
  )
}
