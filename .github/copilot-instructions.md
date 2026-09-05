# Heaven Furniture Mart — Agent Instructions

Luxury bespoke-furniture landing page. React 19 · TypeScript 6 · Vite 8 · Tailwind v4 · shadcn/ui (radix-nova) · lucide-react · motion/react + GSAP + Lenis · Playwright · oxlint.

Project docs live in `docs/`. Frontend skills live in `.agents/skills/` — load the relevant one before working:

| Task | Skill |
|---|---|
| Any UI/UX decision, layout, hierarchy | `ui-ux-pro-max`, `frontend-design` |
| Components, hooks, file structure, TS | `frontend-developer` |
| shadcn components, variants, theming | `shadcn` |
| Colors, fonts, spacing, radius, tokens | `design-system` |
| Motion of any kind | `web-animation-router` |
| Breakpoints, mobile, touch | `responsive-design` |
| Keyboard, ARIA, contrast, forms a11y | `accessibility` |
| Images, bundle, LCP/INP/CLS | `web-performance-optimization` |
| Forms, loading/empty/error/success, copy | `ui-states-and-ux-writing`, `brand` |
| Playwright / browser checks | `webapp-testing` |
| Before saying "done" | `verification-before-completion` |

## Priority order when rules conflict

1. Project requirements (`docs/`) 2. Existing architecture 3. Accessibility 4. UX 5. Design system 6. shadcn/ui 7. Responsive 8. Performance 9. Visual polish 10. Animation

## Hard rules

- Before creating a component: check `src/components/**`, then shadcn (`npx shadcn@latest search`), then extend; create new only if necessary. No near-duplicate components.
- Semantic tokens (`bg-background`, `text-muted-foreground`, `border-border`) > brand tokens (`bg-brand-teal`) > **never** raw hex/rgb in components.
- Icons: `lucide-react` only. No emoji in UI, no hand-drawn SVG unless unavoidable.
- Animate `transform`/`opacity` only; respect `prefers-reduced-motion`.
- Mobile-first; verify at 375 and 1440; no horizontal overflow.
- Do not add dependencies without stating why an existing one can't do it. Never add a second animation, icon, form, or state library.
- Do not modify `vercel.json`, `vite.config.ts` chunking, or backend/business logic without being asked.
- No secrets in client code.
- Finish with `npm run lint && npm run build && npm test`.
