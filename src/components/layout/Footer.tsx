import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { brandImages } from '@/data/assets'
import { categories } from '@/data/catalog'
import { scrollToTop } from '@/lib/scroll'

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

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-brand-ivory">
      <div className="container-x mx-auto max-w-[1600px] pt-20 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src={brandImages.logo} alt="" width={40} height={40} className="h-10 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-2xl tracking-[0.14em]">HEAVEN</span>
                <span className="eyebrow mt-1 text-[0.55rem] tracking-[0.3em] text-brand-ivory/60">Furniture Mart</span>
              </span>
            </div>
            <p className="mt-8 max-w-sm font-serif text-2xl leading-snug text-brand-ivory/85 sm:text-3xl">
              Bespoke furniture and interior styling, designed around the way you live.
            </p>
            <p className="eyebrow mt-6 text-brand-gold">{site.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
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
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-brand-gold-soft">
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
            className="eyebrow self-start text-brand-ivory/60 transition-colors hover:text-brand-gold-soft sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none px-2 pb-2 text-center font-serif text-[16vw] leading-[0.8] tracking-[0.06em] text-brand-ivory/[0.035]"
      >
        HEAVEN
      </p>
    </footer>
  )
}
