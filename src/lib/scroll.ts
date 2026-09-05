import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function getLenis() {
  return instance
}

/** Lock/unlock smooth scrolling (used while dialogs and the menu are open). */
export function lockScroll(locked: boolean) {
  if (!instance) return
  if (locked) instance.stop()
  else instance.start()
}

export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
