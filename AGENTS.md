# AGENTS.md

Guide for AI agents working in the JB3AI Executive Suite repo.

## What this is

A Vite + React 19 + TypeScript single-page dashboard ("executive suite") with two tabs:

- **Inbound Leads & AI Briefings** (`src/components/inbound/InboundView.tsx`) — placeholder only.
- **SponcerFlow Outbound** (`src/components/outbound/OutboundView.tsx`) — the only fully built module (campaign cards, contact triage table, metrics), driven by module-local `MOCK_CAMPAIGNS` / `MOCK_CONTACTS` constants.

There is no backend in this repo, no router, no state library, and no test framework.

## Commands

```bash
npm ci          # install (Node 20, npm 10)
npm run dev     # vite dev server
npm run lint    # eslint . — must pass before every PR
npm run build   # tsc -b && vite build — must pass before every PR
npm run preview # serve dist/
```

There are no pre-commit hooks and no test suite; `lint` + `build` are the full verification.

## Layout

```
src/
  App.tsx                  # shell: header, tab state, renders Inbound/Outbound view
  main.tsx                 # entry, imports index.css
  components/common/       # Header, SystemStatusBar, TabSwitcher (currently unused by App.tsx)
  components/inbound/      # InboundView (placeholder)
  components/outbound/     # OutboundView (real module)
  lib/api.ts               # fetchFromAppsScript helper (currently unused)
  lib/mockData.ts          # shared mock leads/campaigns (currently unused)
  types/inbound.ts         # Lead, GeminiDueDiligence, CalendarEvent
  types/outbound.ts        # Campaign, OutboundContact, CampaignStatus, TriageStage
```

## Known gotchas — read before styling anything

- **Tailwind is installed but not wired up.** `tailwindcss` and `@tailwindcss/vite` are dependencies, but `vite.config.ts` does not register the Tailwind plugin and no file does `@import "tailwindcss"`. Every component is written in Tailwind utility classes, so the UI currently renders unstyled. If a task involves visual work, wire Tailwind up first (add the plugin in `vite.config.ts`, import Tailwind in `src/index.css`) rather than hand-writing CSS.
- **`src/index.css` and `src/App.css` are still the stock Vite template styles** (light theme, fixed 1126px `#root`). They conflict with the app's dark `bg-neutral-950` design. Replace, don't extend.
- **Duplicate mock data.** `src/lib/mockData.ts` exists but `OutboundView.tsx` defines its own mocks inline. When adding data, consolidate into `src/lib/mockData.ts`.
- **`src/components/common/*` is dead code.** `App.tsx` inlines its own header and tab switcher. Prefer extracting into the existing common components over adding more inline markup.

## Conventions

- TypeScript is strict-ish: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (use `import type { ... }` for type-only imports), `erasableSyntaxOnly` (no enums, no parameter properties).
- Named function-component exports (`export function OutboundView()`); `App.tsx` also has a default export for `main.tsx`.
- Double quotes and semicolons in `src/components`, `src/lib`, `src/types`; the untouched template files (`main.tsx`, `eslint.config.js`, `vite.config.ts`) use single quotes. Match the file you edit.
- Icons come from `lucide-react`. Domain types live in `src/types/`, never inline in components.
- Design language: dark neutral surfaces (`bg-neutral-950` / `bg-neutral-900`, `border-neutral-800`), amber accent (`amber-500`) for active/primary, emerald for healthy status, `text-xs`/`uppercase tracking-wider` for labels.

## Backend calls

`src/lib/api.ts` reads `import.meta.env.VITE_APPS_SCRIPT_WEBAPP_URL` and throws when unset — the intended backend is a Google Apps Script web app. No env file is committed. Put local values in `.env.local` — `.gitignore` covers `*.local` but not a bare `.env`, so never create one with real credentials.

## PRs

Run `npm run lint` and `npm run build` before opening a PR. Keep changes scoped to the module you were asked to touch.
