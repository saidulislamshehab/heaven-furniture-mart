import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onOpenConsultation: () => void
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Collections', href: '#collections' },
    { label: 'Bespoke', href: '#bespoke' },
    { label: 'Materials', href: '#materials' },
    { label: 'Our Story', href: '#legacy' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-700',
          scrolled
            ? 'border-b border-white/10 bg-[#121B1A]/95 py-3.5 backdrop-blur-md shadow-2xl'
            : 'bg-gradient-to-b from-black/50 via-black/10 to-transparent py-5 sm:py-6'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          {/* Left: Brand Logo */}
          <a
            href="#"
            className="group flex items-center transition-opacity hover:opacity-90"
          >
            <img
              src="/logo.png"
              alt="Heaven Furniture Mart Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Center: Minimal Uppercase Navigation Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-300',
                  idx === 0
                    ? 'text-white'
                    : 'text-stone-300 hover:text-[#C49A4E]'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Search Utility & Outlined Pill Action */}
          <div className="hidden items-center gap-5 sm:flex">
            <button
              type="button"
              aria-label="Search"
              onClick={onOpenConsultation}
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-300 transition-colors hover:text-white"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="rounded-full border border-white/50 bg-white/5 px-5 py-1.5 font-sans text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-xs transition-all duration-300 hover:border-white hover:bg-white hover:text-[#121B1A]"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 border-b border-white/10 bg-[#121B1A]/98 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="pb-2 border-b border-white/10">
                <img
                  src="/logo.png"
                  alt="Heaven Furniture Mart Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-lg tracking-wide text-stone-200 transition-colors hover:text-[#C49A4E]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenConsultation()
                  }}
                  className="w-full rounded-full border border-[#B08A45] bg-[#B08A45] py-2.5 font-sans text-xs font-semibold tracking-[0.2em] text-[#121B1A] uppercase"
                >
                  Request a Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
