import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageMeta } from '@/lib/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page not found — Heaven Furniture Mart')
  return (
    <section className="flex min-h-[80svh] flex-col items-start justify-center bg-brand-teal-deep text-brand-ivory section-pad container-x">
      <p className="eyebrow text-brand-gold">404</p>
      <h1 className="mt-6 max-w-[14ch] display-1 text-balance">This room hasn't been built yet.</h1>
      <p className="mt-8 max-w-md text-lg text-brand-ivory/70">
        The page you're looking for isn't here. Let's take you somewhere with furniture in it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="gold" size="pill">
          <Link to="/">
            Back to home <ArrowUpRight />
          </Link>
        </Button>
        <Button asChild variant="outline-light" size="pill">
          <Link to="/shop">Browse the collection</Link>
        </Button>
      </div>
    </section>
  )
}
