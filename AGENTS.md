# Portfolio — AGENTS.md

## Stack
- **Framework:** Astro 6 (static, no SSR adapter)
- **CSS:** Tailwind CSS v4 via `@tailwindcss/postcss` (NOT v3 — do NOT use `tailwindcss` plugin in PostCSS)
- **Package mgr:** pnpm (lock: `pnpm-lock.yaml`)
- **Runtime:** Node.js (type: `module`)

## Commands
- `pnpm run dev` — Astro dev server (HMR)
- `pnpm run build` — static build → `dist/`
- `pnpm run preview` — preview built site

## Colors
- **Primary:** `#172de2` (blue) — buttons, badges, primary actions, section highlight accents
- **Complementary:** `#f97316` (orange-500) — decorative accents (basketball, section heading underlines, hover states, bullet dots, language indicators, icons)
- The basketball scroll indicator already uses orange (`border-orange-500`, `text-orange-500`). This is the precedent.
- When choosing between blue/orange: use blue for interactive/action elements, orange for decorative/visual accent elements.

## Data architecture
- All content is driven by `data_es.json` (Spanish) and `data_en.json` (English)
- Both are read at build time in `src/pages/index.astro` via `fs.readFileSync`
- Types: `src/types/data.ts` — `PortfolioData`, `Personal`, `Project`, `Experience`, `Skills`, `Study`, `Certification`
- Images go in `public/images/personal/` and `public/images/projects/{id}/`
- `src/utils/images.ts` exists but is unused

## Internationalization (i18n)
- **All UI strings** must use `t(lang, "key")` from `src/i18n/ui.ts` — no hardcoded visible text.
- Language is selected via `localStorage` + page reload. Language buttons in Header call `localStorage.setItem("lang", lang)` + `location.reload()`.
- `index.astro` renders both language versions of every section in `<div id="lang-es">` / `<div id="lang-en">`, toggling visibility client-side via an inline script.
- Translation keys follow `namespace.key` convention (e.g. `nav.projects`, `cta.details`, `modal.features`).
- When adding a new UI text, add entries in both `es` and `en` in `src/i18n/ui.ts`.
- Data content (`data_es.json` / `data_en.json`) is handled separately by the user — agents should never modify those files.
- **Section IDs are ALWAYS in Spanish** (`#projects`, `#skills`, `#experience`, `#studies`). IDs are NEVER transferred or removed. English sections do NOT have these IDs.
- **Nav scroll in any language:** click handler finds Spanish section by ID, gets its index among `#lang-es` children, then scrolls to the same-index child in the **visible** container (`#lang-en` or `#lang-es`). Same logic applies to the basketball scroll indicator and the scroll-active nav highlight. See `index.astro` click handler.

## Project structure
- **Single page** at `src/pages/index.astro` — imports all sections
- **Home sections:** `Hero`, `ProjectsSection`, `StudiesSection`, `SkillsSection`, `ExperienceSection`
- **Shared layout:** `Layout.astro` → `Header.astro` + `<slot/>` + `Footer.astro`
- **Project detail:** `ProjectModal.astro` + `ProjectGallery.astro`
- **UI primitives:** `Badge`, `Modal`, `SectionHeading`, `Tag`
- **All JS** uses `is:inline` scripts (no bundling), IIFE-wrapped

## Key behaviors (non-obvious)
- **`position: absolute` is discouraged:** Avoid `absolute` unless critically necessary. It breaks DevTools element inspection and makes layout harder to debug. Prefer CSS Grid stacking (`grid` + `grid-area: 1 / 1`) for overlays, negative margins for breakout effects, and `relative` with natural document flow. Exceptions: full-viewport overlays (canvas, modal backdrop), the bottom bar wrapper.
- **Modal:** defined in `index.astro` with `id="modal-overlay"`, `id="modal-container"`, `id="modal-body"`. Shows/hides via CSS classes `active` on `.modal-backdrop` and `.modal-panel`. Triggered by clicking `[data-open-modal]` elements. `Escape` key closes.
- **Scroll reveal:** CSS classes `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` + `revealed`. Driven by `IntersectionObserver` in `index.astro`.
- **Interactive dots:** Canvas in `Hero.astro` with color, motion, and mouse interaction. Config is a `CFG` object at the top of the `<script is:inline>` block. Accepts: `spacing`, `radius`, `baseAlpha`, `drift`, `motionRadius`, `motionSpeed`, `ease`, `returnEase`, `influence`, `darkness`, `darknessRadius`, `falloff`, `mousePush`, `color1`, `color2`, `waveSpeed`. Test/configure in `dots.html`.
- **Project gallery:** When a project has exactly 3 screenshots (2 horizontal + 1 vertical), they display as 2 horizontals stacked on the left + 1 vertical on the right (280px). Otherwise, all images stack vertically at full width.
- **Marquee:** JS `requestAnimationFrame` loop in `Hero.astro`. 3 `.marquee-group` divs, `translate3d` with `Math.round()` to avoid sub-pixel jank, `will-change: transform`.
- **Basketball scroll indicator:** CSS keyframes `dribble` and `shadow-pulse` in `global.css`. Click → scroll to `#projects` (same i18n-aware logic as nav).

## Quality
- No tests, no linter, no typecheck script
- `pnpm run build` is the only validation step (ABSOLUTELY DO NOT run it unless the user explicitly asks. THIS IS A HARD RULE. NO EXCEPTIONS.)
- Build output to `dist/` (gitignored)
