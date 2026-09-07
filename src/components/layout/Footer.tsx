import { Link } from 'react-router'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { categories } from '@/data/catalog'
import { scrollToTop } from '@/lib/scroll'
import { MorphingButton } from '@/components/common/MorphingButton'

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Visit the showroom', to: '/visit' },
  { label: 'Our story', to: '/about' },
]

const socials = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'YouTube', href: site.social.youtube },
]

function openUpdatesEmail(email: string) {
  const subject = 'Keep me posted on new collections'
  const body = `Hello Heaven Furniture Mart,\n\nPlease keep me posted on new collections and showroom events.\nEmail: ${email}`
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-brand-ivory">
      <div className="container-x mx-auto max-w-[1600px] pt-20 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src="/heaven.png"
              alt="Heaven Furniture Mart"
              className="h-12 w-auto [filter:brightness(0)_invert(1)] sm:h-14"
            />
            <p className="mt-8 max-w-sm font-serif text-2xl leading-snug text-brand-ivory/85 sm:text-3xl">
              Bespoke furniture and interior styling, designed around the way you live.
            </p>
            <p className="eyebrow mt-6 text-brand-gold">{site.tagline}</p>

            <div className="mt-10">
              <h3 className="eyebrow text-brand-ivory/50">New collections & showroom events</h3>
              <MorphingButton className="mt-5" onSubmit={openUpdatesEmail} />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-[1fr_1fr_1.5fr] lg:col-span-7">
            <div>
              <h3 className="eyebrow text-brand-ivory/50">Pages</h3>
              <ul className="mt-5 space-y-3">
                {pages.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to} className="text-[0.95rem] text-brand-ivory/85 transition-colors hover:text-brand-gold-soft">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-brand-ivory/50">Collections</h3>
              <ul className="mt-5 space-y-3">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/shop?category=${c.id}`}
                      className="text-[0.95rem] text-brand-ivory/85 transition-colors hover:text-brand-gold-soft"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-brand-ivory/50">Showroom</h3>
              <address className="mt-5 space-y-3 text-[0.95rem] not-italic text-brand-ivory/85">
                <p>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.country}
                </p>
                <p>
                  <a href={`tel:${site.phoneE164}`} className="transition-colors hover:text-brand-gold-soft">
                    {site.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] transition-colors hover:text-brand-gold-soft">
                    {site.email}
                  </a>
                </p>
              </address>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow inline-flex items-center gap-1 text-brand-ivory/60 transition-colors hover:text-brand-gold-soft"
                    >
                      {s.label} <ArrowUpRight className="size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-brand-ivory/10 pt-6 text-xs text-brand-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Est. {site.founded}, {site.address.city}.
          </p>
          <button
            type="button"
            onClick={() => scrollToTop(false)}
            className="eyebrow inline-flex items-center gap-1.5 self-start text-brand-ivory/60 transition-colors hover:text-brand-gold-soft sm:self-auto"
          >
            Back to top <ArrowUp className="size-3" />
          </button>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none flex justify-center select-none px-4 pb-6">
        <div className="w-full max-w-[1400px]">
          <img
            src="/heaven.png"
            alt=""
            className="w-full [filter:brightness(0)_invert(1)] opacity-[0.06]"
          />
          <div className="flex w-full justify-between px-[2%] font-display text-[length:clamp(1rem,4vw,3.25rem)] font-medium uppercase leading-none text-ivory opacity-[0.06]">
            {"FURNITURE MART".split("").map((char, i) => (
              <span key={i}>{char === " " ? "\u00A0\u00A0" : char}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
