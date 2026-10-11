# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pulsar is a front-end e-commerce demo (React + TypeScript) built to practice React, TypeScript, and CSS. Products are read from Firebase Firestore; there is no backend of its own beyond Firebase Hosting.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b (type-check via project references) then vite build
npm run lint      # eslint .
npm run preview   # preview the production build
npm run prettier  # npx prettier --write .
```

There is no test suite/runner configured in this repo.

Seeding Firestore (`scripts/seed.ts`) requires `scripts/serviceAccountKey.json` (a Firebase service account key, gitignored) and reads product data from `scripts/products.json`. Run with `ts-node scripts/seed.ts`. Note the entire `scripts/` directory is gitignored, so it exists only locally/CI-side, not in version control.

## Environment

Firebase config comes from Vite env vars in `.env` (gitignored): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID`. In CI (`.github/workflows/firebase-hosting-merge.yml`), the whole `.env` file is written from a single `PULSAR_ENV` GitHub secret before build. Deploys to Firebase Hosting (project `pulsarproject-dd5c5`) happen automatically on push to `main`.

## Architecture

**Data flow:** `ProductGrid` fetches all documents from the Firestore `products` collection on mount and pushes them into `ProductContext` (both `product`, the full unfiltered list, and `filteredProducts`, what's actually rendered). `Filter` reads/writes `filteredProducts` directly to apply category filters and price sorting — there is no derived/memoized filtering, the context array itself is replaced. `Cart` and `ProductCard` both read/write `CartContext` to add/remove items and toggle quantities; cart totals are accumulated manually alongside each mutation rather than derived from the cart contents.

**Context-per-domain pattern:** three independent React Contexts — `Product`, `Filter`, `Cart` — each under `src/context/<Domain>/` with three files:
- `<Domain>Context.tsx` — the `createContext` call (value type is `<Domain>ContextType | undefined`)
- `<Domain>ContextProvider.tsx` — the provider component holding `useState`
- `use<Domain>Context.ts` — a hook that calls `useContext` and throws if used outside its provider

All three providers are nested in `src/main.tsx` (Product → Filter → Cart, outermost to innermost) around `<App />`. When adding a new piece of shared state, follow this same three-file pattern rather than adding ad hoc `useState`/prop drilling. Types for each context live in `src/types/<Domain>Context.ts`, not colocated with the context files.

**Components** live under `src/components/<Name>/<Name>.tsx`, each paired with a co-located CSS/SCSS module (`.module.css` or `.module.scss`, imported as `s` and referenced as `s.class_name`). Nested/child components sit in a subdirectory of their parent (e.g. `ProductGrid/ProductCard/`).

**Product images** are static assets, not stored in Firestore: `ProductCard` and `Cart` both build image URLs as `/static/products/${sku}.webp`, resolved from `public/static/products/`.

**Firebase:** `src/services/firebase.ts` initializes the app and exports a default Firestore instance (`db`) used directly by `ProductGrid`. No `firebase/auth` currently in use.

## Conventions

- No semicolons, single quotes, 2-space indent (enforced by `.prettierrc` — run `npm run prettier` before committing non-trivial changes).
- TypeScript strict mode is on (`tsconfig.app.json`): `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all error. `verbatimModuleSyntax` is on, so type-only imports must use `import type { ... }`.
- UI copy/labels are in Spanish (e.g. "Agregar al carrito", "Vaciar carrito") — match this when adding new user-facing text.
