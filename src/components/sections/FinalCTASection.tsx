import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { img } from '@/data/assets'
import { srcSetFor } from '@/lib/images'
import { site, WHATSAPP_DEFAULT } from '@/data/site'

interface FinalCTASectionProps {
  eyebrow?: string
  title?: string
  body?: string
  image?: string
}

export function FinalCTASection({
  eyebrow = 'Begin with a conversation',
  title = "Let's design your dream space.",
  body = 'Bring a room, a measurement or just a feeling. Your free design consultation starts on WhatsApp or in our Agrabad showroom.',
  image = img.royalBlueSalon,
}: FinalCTASectionProps) {
  const { open } = useConsultation()
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-brand-ivory">
      <motion.img
        src={image}
        srcSet={srcSetFor(image)}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-60"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-ink/70 via-brand-ink/55 to-brand-ink/85" />

      <div className="container-x mx-auto flex max-w-[1600px] flex-col items-start py-20 sm:py-36 lg:py-44">
        <Reveal>
          <p className="eyebrow text-brand-gold-soft">{eyebrow}</p>
        </Reveal>
        <h2 className="mt-6 max-w-[12ch] display-1 text-balance">
          <SplitWords text={title} />
        </h2>
        <Reveal delay={0.25}>
          <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-brand-ivory/75">{body}</p>
        </Reveal>
        <Reveal delay={0.35} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button variant="gold" size="pill" onClick={() => open()}>
            Request a Consultation <ArrowUpRight />
          </Button>
          <Button asChild variant="outline-light" size="pill">
            <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp us
            </a>
          </Button>
        </Reveal>
        <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-brand-ivory/60">
          <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-2 hover:text-brand-ivory">
            <Phone className="size-4" /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-brand-ivory">
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
