/**
 * Coarse-pointer devices (phones/tablets) and constrained CPUs/links. Used to drop decorative
 * work — blur filters, per-frame image transforms, the Lenis RAF loop — where it costs frames.
 */
let cached: boolean | undefined
export function isLowPower(): boolean {
  if (cached !== undefined) return cached
  if (typeof window === 'undefined') return false
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number }
  const touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  const slow = /(^|-)2g$|^3g$/.test(nav.connection?.effectiveType ?? '') || Boolean(nav.connection?.saveData)
  const weak = (nav.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4
  cached = touchOnly || slow || weak
  return cached
}
