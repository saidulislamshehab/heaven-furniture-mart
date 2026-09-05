# Heaven Furniture Mart — Skills, Tools & Development Environment

This document outlines the configured skills, libraries, animation routers, performance rules, and testing workflows established for the Heaven Furniture Mart luxury landing page project.

---

## 1. Installed & Configured Skills in Workspace (`.agents/skills/`)

| Skill Name | Purpose / Domain | When to Activate / Use |
|---|---|---|
| `ui-ux-pro-max` | Comprehensive UI/UX design intelligence, design tokens, color reasoning, layout metrics, accessibility checks, and stack guides. | When establishing design systems, color harmonies, UX patterns, and checking accessibility. |
| `frontend-design` | Editorial luxury design standards, typography scales (Cormorant Garamond + Manrope), whitespace budgeting, asymmetric grid balancing, and avoiding AI clichés. | When creating layouts, hero visual framing, magazine compositions, and styling luxury elements. |
| `frontend-developer` | Core React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui engineering, modular architecture, custom hooks, and type safety. | When building components, structuring props, state management, and assembling page sections. |
| `design-system` | Multi-tiered design token architecture (primitive → semantic → component), CSS variables, and spacing rhythm. | When defining or refining CSS variables, typography tokens, or theme tokens. |
| `web-animation-router` | Decision matrix between CSS transitions, Motion (`motion/react`), GSAP ScrollTrigger, and Lenis smooth scrolling. | When planning and implementing any motion, scroll reveal, pin animation, or micro-interaction. |
| `web-performance-optimization` | Core Web Vitals (LCP < 1.8s, INP < 100ms, CLS = 0), image/media pipeline (AVIF/WebP, aspect-ratio, lazy loading, preload), bundle optimization, and avoiding layout thrashing. | When embedding media, evaluating page load speed, rendering budgets, and bundle size. |
| `responsive-design` | Mobile-first breakpoints, fluid type, grids, mobile nav, touch targets, container queries. | When laying out sections or reviewing at 375/390/768/1440. |
| `accessibility` | WCAG 2.2 AA: landmarks, keyboard, focus, dialogs, forms, contrast, reduced motion. | When building/reviewing any interactive component or auditing a11y. |
| `ui-states-and-ux-writing` | Loading/empty/error/success/disabled states, form UX, button labels, error copy. | When building the consultation form, CTAs, dialogs, or any user-facing copy. |
| `webapp-testing` | Playwright end-to-end testing, cross-breakpoint visual QA (Mobile 375px/390px, Tablet 768px, Desktop 1440px), and interaction testing. | When verifying button actions, navigation anchors, modal dialogs, and responsive viewports. |
| `verification-before-completion` | Mandatory quality gate checklist ensuring type checks, lint checks, build checks, and design fidelity before task completion. | Before completing any feature, phase, or milestone. |
| `shadcn` | Official shadcn/ui skill: reads `components.json`, CLI (`search`, `add`, `docs`), composition rules, semantic colors, theming, Radix APIs. | When adding, styling, or composing shadcn components and variants. |
| `brand` | Brand voice, messaging frameworks, and core tone consistency ("Designed. Crafted. Customized."). | When crafting copy, headlines, micro-copy, and brand identity elements. |

---

## 2. Installed Packages & Libraries

### Core & Framework
- `react` (`^19.2.8`) & `react-dom` (`^19.2.8`): Modern React runtime.
- `typescript` (`~6.0.2`): Type safety with path aliases (`@/*`).
- `vite` (`^8.2.2`) with `@vitejs/plugin-react` & `@tailwindcss/vite`: Lightning-fast HMR and bundle compilation.

### Design System, UI & Typography
- `tailwindcss` (`^4.3.3`): Utility-first styling with `@theme inline` tokens.
- `shadcn` (`^4.19.1`) & `radix-ui` (`^1.6.7`): Accessible UI primitives (`button`, `card`, `input`, `dialog`, `dropdown-menu`).
- `clsx` & `tailwind-merge` (`cn` helper): Conflict-free dynamic className generation.
- `class-variance-authority`: Type-safe component variant management.
- `lucide-react`: Lightweight, crisp vector iconography.
- `@fontsource/cormorant-garamond`: Luxury editorial serif font for headings (400, 500, 600, italic).
- `@fontsource-variable/manrope`: High-legibility modern sans-serif for body and UI.

### Motion & Smooth Scrolling
- `motion` (`^13.1.1`): Declarative React transitions, spring animations, and layout motion.
- `gsap` (`^3.15.0`) & `@gsap/react` (`^2.1.2`): Scroll-driven storytelling, timelines, and ScrollTrigger choreography.
- `lenis` (`^1.3.26`): Butter-smooth physics-based scrolling integrated with GSAP ScrollTrigger.

### Testing & QA
- `@playwright/test` (`^1.62.1`): Multi-device E2E and visual regression test suite.
- `oxlint` (`^1.79.0`): Ultra-fast linter for syntax and React best practices.

---

## 3. Animation Decision Guide (`web-animation-router`)

To maintain award-winning luxury polish without over-animating or causing frame drops:

```
                                  [Interaction Needed]
                                           │
         ┌─────────────────────────────────┼────────────────────────────────┐
         ▼                                 ▼                                ▼
[Micro-Interaction]            [UI Component Transition]         [Scroll Storytelling]
(Hover, active, focus)         (Dialog, dropdown, tabs, cards)   (Pin, scrub, multi-stage)
         │                                 │                                │
         ▼                                 ▼                                ▼
  CSS / Tailwind               Motion (`motion/react`)              GSAP + ScrollTrigger
 (Instant, 0 JS load)          (Springs, exit animations)          (Tickers, pinned sequences)
                                                                            │
                                                                   + Lenis Smooth Scroll
```

### Golden Rules:
1. **Compositor-Only Animations**: Only animate `transform` and `opacity`. Never animate `height`, `width`, `top`, `left`, `margin`, or `padding`.
2. **Accessibility**: Always respect `prefers-reduced-motion` and degrade gracefully to simple opacity or static presentation.
3. **Restraint**: Animations should feel like a luxury documentary—slow, smooth, and intentional (0.6s–1.2s duration with soft easing like `cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 4. UI Component Resource & Pattern Guide

When crafting components for Heaven Furniture Mart:

- **Aceternity / Magic UI / React Bits Inspiration**:
  - *Allowed*: Text shimmer/mask reveals, subtle parallax card tilt, refined magnetic button pull, smooth image scale masks.
  - *Forbidden*: Overwhelming neon lasers, chaotic particle fields, arcade-style bouncy spring physics, generic SaaS dashboard cards.
- **Tone**:
  - Luxury bespoke furniture studio & architecture atelier.
  - Generous whitespace, tactile wood/gold details, deep teal grounding, and warm ivory canvas.

---

## 5. Performance Rules (`web-performance-optimization`)

- **LCP Target**: `< 1.8s`
- **INP Target**: `< 100ms`
- **CLS Target**: `0.00`
- **Images**:
  - Always specify aspect ratios on image containers.
  - Preload hero visual with `fetchpriority="high"`.
  - Lazy load all below-the-fold media with `loading="lazy"` and `decoding="async"`.
- **Bundle**: Keep JavaScript under 120kb gzipped.

---

## 6. Testing & Visual QA Workflow (`webapp-testing`)

Run the following checks systematically:

1. **Type & Build Validation**:
   ```bash
   npm run build
   ```
2. **Code Quality & Linting**:
   ```bash
   npm run lint
   ```
3. **Playwright Multi-Device Test Suite**:
   ```bash
   npm test
   ```
   *Tested Viewports:*
   - Mobile: 375px (iPhone SE), 390px (iPhone 14)
   - Tablet: 768px (iPad Mini)
   - Desktop: 1440px (Desktop Chrome)

---

## 7. 21st.dev Component & Design Intelligence CLI (`@21st-dev/cli`)

The project is configured with `@21st-dev/cli` for searching, inspecting, and installing high-craft UI components, themes, and design references.

### Authentication & Setup
1. **Interactive Developer Login**:
   ```bash
   21st login
   ```
   *(Opens your browser and securely stores local credentials).*

2. **CI / Headless / Script Execution**:
   Skip the interactive browser login and provide the API key directly:
   ```bash
   # Option A: Environment Variable
   export API_KEY_21ST="your_api_key"
   # or
   export TWENTYFIRST_TOKEN="your_token"

   # Option B: CLI Flag
   npx 21st search "luxury hero carousel" --api-key $API_KEY_21ST
   ```

### Common Commands
- **Search Components & Themes**:
  ```bash
  npx 21st search "luxury card" --type c
  ```
- **Install Verified 21st Component**:
  ```bash
  npx 21st add <author>/<component-slug>
  ```
- **Local UI Deterministic Review**:
  ```bash
  npx 21st review src/components
  ```
