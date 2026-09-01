export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0A0D0C] pt-20 pb-12 text-[#9A9E9D]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 lg:gap-8 pb-16">
          {/* Brand & Mission (Spans 5 columns on desktop) */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5 space-y-6">
            <a href="#" className="inline-block transition-opacity hover:opacity-85">
              <img
                src="/logo.png"
                alt="Heaven Furniture Mart"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <p className="max-w-sm font-sans text-sm sm:text-base leading-relaxed text-[#808785]">
              We shape architectural blueprints into bespoke luxury furniture and
              masterpiece interiors crafted by master artisans in Chattogram.
            </p>
          </div>

          {/* Spacer on large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Menu Column */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs font-semibold tracking-wider text-[#D8B676] uppercase">
              Menu
            </h4>
            <ul className="space-y-3 font-sans text-sm text-[#9A9E9D]">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="transition-colors hover:text-white">
                  Collections
                </a>
              </li>
              <li>
                <a href="#bespoke" className="transition-colors hover:text-white">
                  Bespoke
                </a>
              </li>
              <li>
                <a href="#materials" className="transition-colors hover:text-white">
                  Materials
                </a>
              </li>
              <li>
                <a href="#legacy" className="transition-colors hover:text-white">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier & Legal Column */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs font-semibold tracking-wider text-[#D8B676] uppercase">
              Atelier
            </h4>
            <ul className="space-y-3 font-sans text-sm text-[#9A9E9D]">
              <li>
                <span className="text-[#808785]">Agrabad Access Road</span>
              </li>
              <li>
                <span className="text-[#808785]">Chattogram, Bangladesh</span>
              </li>
              <li>
                <a
                  href="tel:+8801960481983"
                  className="transition-colors hover:text-white"
                >
                  +880 1960-481983
                </a>
              </li>
              <li className="pt-2">
                <a href="#" className="transition-colors hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Commission Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs font-semibold tracking-wider text-[#D8B676] uppercase">
              Social
            </h4>
            <ul className="space-y-3 font-sans text-sm text-[#9A9E9D]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801960481983"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Bold Embossed Watermark (HEAVEN + FURNITURE MART together in middle) */}
        <div className="relative my-8 sm:my-14 flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none text-center">
          <h2 className="font-serif text-[11vw] sm:text-[12vw] font-bold tracking-[-0.02em] leading-none uppercase text-[#151C1B] transition-all duration-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.04)] [text-shadow:0_-1px_1px_rgba(0,0,0,0.85),0_1px_1px_rgba(255,255,255,0.06)]">
            HEAVEN
          </h2>
          <p className="mt-2 sm:mt-3 font-serif text-[3.2vw] sm:text-[3.5vw] md:text-[2.8vw] font-bold tracking-[0.2em] sm:tracking-[0.25em] leading-none uppercase text-[#141A19] [text-shadow:0_-1px_1px_rgba(0,0,0,0.85),0_1px_1px_rgba(255,255,255,0.05)]">
            FURNITURE MART
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs font-sans tracking-wide text-[#656C6A]">
          <div>
            2026 © Heaven Furniture Mart.
          </div>
          <div>
            Designed & Crafted in Chattogram
          </div>
        </div>
      </div>
    </footer>
  )
}
