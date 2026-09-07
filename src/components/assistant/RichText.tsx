import { Fragment, memo, type ReactNode } from 'react'
import { Link } from 'react-router'
import { site } from '@/data/site'

/* Hosts the assistant is allowed to link to. Anything else renders as plain text. */
const ALLOWED_HOSTS = new Set([
  'wa.me',
  'facebook.com',
  'www.facebook.com',
  'instagram.com',
  'www.instagram.com',
  'youtube.com',
  'www.youtube.com',
  'maps.app.goo.gl',
  'goo.gl',
  'maps.google.com',
  'www.google.com',
])

const INTERNAL_PATHS = new Set(['/', '/shop', '/about', '/visit'])

/*
 * One pass, alternation order matters:
 *  1. absolute URL   2. bare domain (www./facebook.com/…)   3. email
 *  4. phone (+880…)  5. internal path (/shop?category=x, /#bespoke, /visit)
 */
const TOKEN =
  /(https?:\/\/[^\s<>"')\]]+)|(\b(?:www\.|wa\.me\/|facebook\.com\/|instagram\.com\/|youtube\.com\/|maps\.app\.goo\.gl\/)[^\s<>"')\]]*)|([\w.+-]+@[\w-]+\.[\w.-]+\w)|(\+?880[\s\-\u2010-\u2015\u2212]?\d{4}[\s\-\u2010-\u2015\u2212]?\d{6}|\+880\s?\d{2,4}[\s\-\u2010-\u2015\u2212]\d{6,7})|((?:^|(?<=[\s(]))\/(?:(?:shop|about|visit)(?:\?[\w=&-]+)?(?:#[\w-]+)?|#[\w-]+)(?=[\s.,;:!?)]|$))/g

const trimTrailing = (s: string) => {
  const m = s.match(/[.,;:!?]+$/)
  return m ? [s.slice(0, -m[0].length), m[0]] : [s, '']
}

function externalHref(raw: string): string | null {
  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    const u = new URL(href)
    return ALLOWED_HOSTS.has(u.hostname.toLowerCase()) ? u.toString() : null
  } catch {
    return null
  }
}

function internalHref(raw: string): string | null {
  const [path] = raw.split(/[?#]/)
  return INTERNAL_PATHS.has(path || '/') ? raw : null
}

/* Trailing punctuation/paren after a path is excluded by the lookahead; paths never carry a trailing dot. */

const linkClass =
  'font-medium text-assistant-accent underline decoration-assistant-accent/40 underline-offset-2 transition-colors hover:text-assistant-ink break-all'

function renderToken(match: RegExpExecArray, key: number, onNavigate?: () => void): ReactNode {
  const [full, url, domain, email, phone, path] = match

  if (url || domain) {
    const [clean, tail] = trimTrailing(full)
    const href = externalHref(clean)
    if (!href) return full
    return (
      <Fragment key={key}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {clean}
        </a>
        {tail}
      </Fragment>
    )
  }
  if (email) {
    const [clean, tail] = trimTrailing(full)
    return (
      <Fragment key={key}>
        <a href={`mailto:${clean}`} className={linkClass}>
          {clean}
        </a>
        {tail}
      </Fragment>
    )
  }
  if (phone) {
    const digits = full.replace(/\D/g, '')
    const e164 = `+${digits.startsWith('880') ? digits : `880${digits}`}`
    // Only the official number is dialable; anything else stays text.
    if (e164 !== site.phoneE164) return full
    return (
      <a key={key} href={`tel:${e164}`} className={linkClass}>
        {full}
      </a>
    )
  }
  if (path) {
    const href = internalHref(full)
    if (!href) return full
    return (
      <Link key={key} to={href} onClick={onNavigate} className={linkClass}>
        {full}
      </Link>
    )
  }
  return full
}

export function linkify(text: string, onNavigate?: () => void): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  TOKEN.lastIndex = 0
  for (let m = TOKEN.exec(text); m; m = TOKEN.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(renderToken(m, key++, onNavigate))
    last = m.index + m[0].length
    if (m[0].length === 0) TOKEN.lastIndex++
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

interface RichTextProps {
  text: string
  /** Called when the visitor follows an in-site link (e.g. to close the widget). */
  onNavigate?: () => void
}

/** Assistant reply with URLs, emails, phone numbers and site paths turned into safe links. */
export const RichText = memo(function RichText({ text, onNavigate }: RichTextProps) {
  return <>{linkify(text, onNavigate)}</>
})
