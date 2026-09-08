import { useId, useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories } from '@/data/catalog'
import { site, whatsappUrl } from '@/data/site'

export interface ConsultationPrefill {
  room?: string
  piece?: string
}

interface ConsultationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefill?: ConsultationPrefill
}

interface FormState {
  name: string
  phone: string
  room: string
  message: string
}

const emptyForm: FormState = { name: '', phone: '', room: categories[0].name, message: '' }

const fieldClass =
  'h-10 rounded-none border-0 border-b border-brand-brown/20 bg-transparent px-0 text-base text-brand-brown placeholder:text-brand-stone/55 focus-visible:border-brand-gold focus-visible:ring-0 sm:h-11 md:text-[0.95rem]'

function buildMessage(f: FormState) {
  const lines = [
    `Hello Heaven Furniture Mart, I'd like a free design consultation.`,
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `Room: ${f.room}`,
  ]
  if (f.message.trim()) lines.push(`Notes: ${f.message.trim()}`)
  return lines.join('\n')
}

export function ConsultationDialog({ open, onOpenChange, prefill }: ConsultationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-lg overflow-y-auto rounded-sm border border-brand-gold/25 bg-brand-ivory p-6 text-brand-brown shadow-2xl sm:max-w-lg sm:p-8 md:p-10 [&>button]:text-brand-brown/50 [&>button:hover]:text-brand-brown"
      >
        <ConsultationBody prefill={prefill} />
      </DialogContent>
    </Dialog>
  )
}

/** Mounted only while the dialog is open, so state naturally resets per opening. */
function ConsultationBody({ prefill }: { prefill?: ConsultationPrefill }) {
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm,
    room: prefill?.room ?? emptyForm.room,
    message: prefill?.piece ? `I'm interested in the ${prefill.piece}.` : '',
  }))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sent, setSent] = useState<string | null>(null)
  const id = useId()

  const update = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) next.phone = 'Enter a phone number we can reach you on.'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    const url = whatsappUrl(buildMessage(form))
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(url)
  }

  return (
    <>
      {sent ? (
          <div className="flex flex-col gap-6 py-1 sm:gap-8">
            <DialogHeader className="space-y-4 pr-8 text-left">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                <CheckCircle2 className="size-6" strokeWidth={1.5} />
              </span>
              <div className="space-y-2">
                <p className="eyebrow text-brand-gold">Almost there</p>
                <DialogTitle className="font-serif text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.05] text-balance">
                  Your message is ready.
                </DialogTitle>
              </div>
              <DialogDescription className="text-[0.95rem] leading-relaxed text-brand-stone text-pretty">
                WhatsApp should have opened with your details filled in. If it didn't, use the button
                below. We reply during showroom hours.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <Button asChild variant="gold" size="pill" className="w-full">
                <a href={sent} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Open WhatsApp
                </a>
              </Button>
              <div className="flex items-center gap-3 text-brand-stone">
                <span className="h-px flex-1 bg-brand-brown/15" aria-hidden />
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase">or</span>
                <span className="h-px flex-1 bg-brand-brown/15" aria-hidden />
              </div>
              <Button asChild variant="outline-dark" size="pill" className="w-full">
                <a href={`tel:${site.phoneE164}`}>
                  <Phone /> Call {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-2 pr-8 text-left sm:space-y-3">
              <p className="eyebrow text-brand-gold">Free design consultation</p>
              <DialogTitle className="font-serif text-[clamp(1.5rem,6vw,2.25rem)] leading-tight text-balance">
                Tell us about your room.
              </DialogTitle>
              {/* Hidden on short phones so the whole form fits without scrolling; still read by AT. */}
              <DialogDescription className="text-sm leading-relaxed text-brand-stone [@media(max-height:760px)]:sr-only sm:text-[0.95rem]">
                A few details and we'll continue on WhatsApp — measurements, references and ideas
                are all welcome.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-1.5">
                  <label htmlFor={`${id}-name`} className="eyebrow text-brand-stone">
                    Name
                  </label>
                  <Input
                    id={`${id}-name`}
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name')(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${id}-name-err` : undefined}
                    className={fieldClass}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id={`${id}-name-err`} role="alert" className="text-xs text-brand-gold">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={`${id}-phone`} className="eyebrow text-brand-stone">
                    Phone
                  </label>
                  <Input
                    id={`${id}-phone`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone')(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                    className={fieldClass}
                    placeholder="+880 1…"
                  />
                  {errors.phone && (
                    <p id={`${id}-phone-err`} role="alert" className="text-xs text-brand-gold">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`${id}-room`} className="eyebrow text-brand-stone">
                  Which room?
                </label>
                <select
                  id={`${id}-room`}
                  value={form.room}
                  onChange={(e) => update('room')(e.target.value)}
                  className="h-10 w-full appearance-none border-0 border-b border-brand-brown/20 bg-transparent px-0 text-base text-brand-brown outline-none focus-visible:border-brand-gold sm:h-11 sm:text-[0.95rem]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name} className="bg-brand-ivory text-brand-brown">
                      {c.name}
                    </option>
                  ))}
                  <option value="Full residence" className="bg-brand-ivory text-brand-brown">
                    Full residence
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`${id}-msg`} className="eyebrow text-brand-stone">
                  Notes <span className="normal-case tracking-normal opacity-60">(optional)</span>
                </label>
                <textarea
                  id={`${id}-msg`}
                  rows={3}
                  value={form.message}
                  onChange={(e) => update('message')(e.target.value)}
                  placeholder="Room size, the piece you have in mind, a finish you love…"
                  className="w-full resize-none border-0 border-b border-brand-brown/20 bg-transparent px-0 py-2 text-base leading-relaxed text-brand-brown outline-none placeholder:text-brand-stone/55 focus-visible:border-brand-gold sm:text-[0.95rem]"
                />
              </div>

              <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-brand-stone max-sm:text-center">
                  Prefer to talk?{' '}
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="font-medium text-brand-brown underline-offset-4 hover:text-brand-gold hover:underline whitespace-nowrap transition-colors sm:mt-0.5 sm:block"
                  >
                    {site.phoneDisplay}
                  </a>
                </p>
                <Button type="submit" variant="gold" size="pill" className="w-full sm:w-auto">
                  Continue on WhatsApp <ArrowUpRight />
                </Button>
              </div>
            </form>
          </>
        )}
    </>
  )
}
