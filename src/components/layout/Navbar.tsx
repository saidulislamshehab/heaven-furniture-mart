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
    <Link to="/" onClick={onHome} className="group flex items-center gap-3" aria-label="Heaven Furniture Mart — home">
      <img src={brandImages.logo} alt="" width={36} height={36} className="h-8 w-auto object-contain sm:h-9" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-serif text-[1.35rem] tracking-[0.14em]', dark ? 'text-brand-teal-deep' : 'text-brand-ivory')}>
          HEAVEN
        </span>
        <span className={cn('eyebrow mt-0.5 text-[0.55rem] tracking-[0.3em]', dark ? 'text-brand-stone' : 'text-brand-ivory/70')}>
          Furniture Mart
        </span>
      </span>
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
                        className="fixed inset-0 z-[70] flex flex-col justify-between overflow-y-auto overscroll-contain bg-brand-teal-deep text-brand-ivory outline-none"
                        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                        exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.7, ease: luxuryEase }}
                      >
                        <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
                        <div className="container-x flex shrink-0 items-center justify-between py-5 sm:py-6">
                          <Wordmark
                            dark={false}
                            onHome={(e) => {
                              scrollToTopIfSameRoute(e, pathname)
                              setMenuOpen(false)
                            }}
                          />
                          <DialogPrimitive.Close asChild>
                            <button
                              type="button"
                              aria-label="Close menu"
                              className="flex size-11 items-center justify-center rounded-full border border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10"
                            >
                              <X className="size-5" strokeWidth={1.5} />
                            </button>
                          </DialogPrimitive.Close>
                        </div>

                        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center py-6">
                          <ul className="space-y-1">
                            {navLinks.map((l, i) => (
                              <motion.li
                                key={l.to}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: luxuryEase }}
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
                                      'block border-b border-brand-ivory/10 py-3 font-serif italic text-[length:clamp(2rem,min(8.5vw,10svh),3.75rem)] leading-tight tracking-tight transition-colors',
                                      isActive ? 'text-brand-ivory' : 'text-brand-ivory/60 hover:text-brand-ivory'
                                    )
                                  }
                                >
                                  {l.label}
                                </NavLink>
                              </motion.li>
                            ))}
                          </ul>
                        </nav>

                        <motion.div
                          className="container-x shrink-0 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <p className="eyebrow text-brand-ivory/45">(Email)</p>
                          <a
                            href={`mailto:${site.email}`}
                            className="mt-2 block break-all font-sans text-lg text-brand-gold-soft transition-colors hover:text-brand-gold"
                          >
                            {site.email}
                          </a>

                          <p className="eyebrow mt-6 text-brand-ivory/45">(Socials)</p>
                          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
                            {socialLinks.map((s) => (
                              <li key={s.label}>
                                <a
                                  href={s.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/social flex items-center justify-between border-b border-brand-ivory/10 py-3 text-brand-ivory/80 transition-colors hover:text-brand-ivory"
                                >
                                  <span className="font-sans text-sm font-medium uppercase tracking-[0.16em]">{s.label}</span>
                                  <ArrowUpRight className="size-4 text-brand-ivory/40 transition-transform duration-300 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 group-hover/social:text-brand-gold" />
                                </a>
                              </li>
                            ))}
                          </ul>

                          <Button
                            variant="gold"
                            size="pill"
                            className="mt-7 w-full"
                            onClick={() => {
                              setMenuOpen(false)
                              open()
                            }}
                          >
                            Request a Consultation <ArrowUpRight />
                          </Button>
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
