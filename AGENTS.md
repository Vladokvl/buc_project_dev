<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BUC Project Architecture & Coding Rules

Always follow these project-specific conventions when creating or modifying files:

## 1. Directory Structure (`src/`)
All application code lives inside `src/` using the `@/*` path alias (`./src/*`):
- `src/app/` — **Routing only** (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, global styles). Keep `page.tsx` files as thin compositions of feature components.
- `src/components/ui/` — **Reusable UI primitives** (`SlideDrawer.tsx`, buttons, cards, dropdowns, badges). Must be page-agnostic and driven by props.
- `src/components/layout/` — **Global site chrome** (`Header.tsx`, `Footer.tsx`, `MobileMenuDrawer.tsx`, `CartDrawer.tsx`, `LocaleCurrencySelect.tsx`).
- `src/components/<feature>/` — **Page/domain-specific sections** (`home/`, `projects/`, `shop/`, `admin/`).
- `src/context/` — React context providers (`LocaleCurrencyContext.tsx`).
- `src/lib/` — Pure functions, utilities, formatting, i18n, and database helpers (`i18n.ts`).
- `src/data/` — Static data, constants, and mock entities separated from JSX markup (`projects.ts`).
- `src/messages/` — Localization dictionaries (`uk.json`, `en.json`).

## 2. File Size & Modularity (Max 250–300 Lines)
- **Hard limit:** No single `.ts` or `.tsx` file may exceed **300 lines** (aim for `< 200` lines).
- **Single Responsibility:** If a component grows past 250 lines, split out sub-components (e.g., drawers, modals, sub-sections), custom hooks, or static data arrays into dedicated files.
- **DRY (Don't Repeat Yourself):** Any UI pattern or helper function used 2+ times must be extracted to `src/components/ui/` or `src/lib/`.

## 3. Localization (`UA`/`EN`) & Multi-Currency (`UAH`/`EUR`/`USD`)
- Never hardcode user-facing copy or currency symbols in JSX.
- Use `t("section.key")` for static UI strings (`src/messages/uk.json` & `en.json`).
- Use `getLocalized(entity, "field", locale)` for bilingual data objects (`field` + `fieldUk`).
- Use `formatPrice(price, currency, locale)` (or `formatPrice` from `useLocaleCurrency()`) for all prices.
