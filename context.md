# Project Context — sricomforts-nextjs

> **Last updated:** August 29, 2026  
> **Purpose:** Living record of the Sri Comforts marketing site. Use at the start of new chats to avoid re-explaining project history.

---

## 1. Project Summary

| Field | Value |
|---|---|
| **Repo** | `sricomforts-nextjs` |
| **Package** | `sricomforts-nextjs` |
| **Client / Brand** | **Sri Comforts** (Sri Comfort Air Products & Services) — authorized Daikin HVAC partner in South India |
| **Site** | Premium marketing site: homepage, about, contact, solutions, services |
| **Stack** | Next.js 16.2.10 · React 19.2.4 · TypeScript · Tailwind CSS 4 · GSAP 3.15 · Lenis 1.3.25 · Supabase JS 2.49 |
| **Font** | Suisse Intl (Regular 400, Medium 600) via `next/font/local` |
| **Checklist** | `docs/sricomforts-asset-checklist.md` |

### Business context (from `docs/about-sricomforts.md`)

- Founded 2001, HQ Secunderabad, 230+ engineers, 8 cities in South India
- Services: VRV/VRF, central AC, ductable systems, AHUs, clean/cold rooms, ventilation
- Brands: Daikin (primary), O General, LG, Panasonic
- 24-hour service response promise
- Clients: IT parks, hospitals, pharma, manufacturing, luxury residential

---

## 2. Route Map

| Route | Status | Entry |
|---|---|---|
| `/` | ✅ | `src/app/page.tsx` → `HomePage` |
| `/about` | ✅ | `src/app/about/page.tsx` |
| `/contact` | ✅ | `src/app/contact/page.tsx` |
| `/solutions/[slug]` | ✅ | 6 slugs (commercial, it-services, industrial-pharma, healthcare, hospitality-retail, residential) |
| `/services/[slug]` | ✅ | 3 slugs (how-we-work, amc, service-request) |
| `/career` | ✅ | `src/app/career/page.tsx` |
| `/blog` | ✅ | `src/app/blog/page.tsx` |
| `/blog/[slug]` | ✅ | `src/app/blog/[slug]/page.tsx` |
| `/blog/category/[slug]` | ✅ | `src/app/blog/category/[slug]/page.tsx` |
| `/resources/ac-tonnage-calculator` | ✅ | `src/app/resources/ac-tonnage-calculator/page.tsx` |
| `/*` (404) | ✅ | `src/app/not-found.tsx` |

---

## 3. Architecture

```
src/
├── app/              # Next.js App Router pages + globals.css
├── components/       # UI by area (home, about, contact, solutions, services, layout, preloader, brand)
├── data/             # Copy & config (homepage, about, contact, solutions, services, navigation)
├── hooks/            # GSAP, scroll, media queries
├── lib/              # GSAP register, SVG utils, canvas, Supabase asset helpers
├── providers/        # SmoothScrollProvider (Lenis)
└── workers/          # video-sequence.worker.ts (hero frame decode)
```

**Data pattern:** Copy and asset paths live in `src/data/*.ts`. Media paths are centralized in `src/lib/assets/localPaths.ts`.

**Assets:** All runtime media is self-hosted under `public/`. Optional Supabase CDN via `NEXT_PUBLIC_SUPABASE_ASSETS=true`.

---

## 4. Key Assets

| Asset | Path / helper |
|---|---|
| Hero scroll frames | `getHeroFrameUrls()` → `public/static/frames/home/{desktop,mobile}/webp/` |
| Feature videos (×6) | `FEATURES_STEP_VIDEOS` → `public/static/videos/features/` |
| Solution images | `solutionFeatureImagePath()` → `public/images/solutions/{slug}/` |
| Service images | `serviceFeatureImagePath()` → `public/images/services/` |
| Team portraits | `public/images/team/` |
| Placeholder logos | `public/logos/placeholder/` (Logoipsum — Phase 2: real client logos) |
| Brand lockup (nav / footer) | `public/assets/brand/sricomforts-logo.png` via `FullLogo` |
| Display sizes | Navbar **200–240px** wide · Footer **220–280px** wide (`src/styles/brand-logo.css`) |
| Source export | **960 × 203 px** transparent PNG (4× largest nav size). Current file is 1957×413 and is fine. |

---

## 5. Design System (`src/styles/tokens.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#007BC0` | Primary blue |
| `--color-brand-deep` | `#2659A6` | Deep blue |
| `--color-brand-ink` | `#051824` | Body text |
| `--color-brand-neon` | `#00D4FF` | Accents, grid lines |
| `--color-accent-orange` | `#FB6B3C` | Secondary accent |

---

## 6. Animation Patterns

| Pattern | Used in |
|---|---|
| Char reveal on scroll (`TextRevealChar`) | Section intros, hero |
| Gradient strong text (`useAnimatedStrong`) | Headings |
| Notch sections (`NotchSection` + `SvgMask`) | Solutions, services, 404 |
| Sticky scroll pin (GSAP ScrollTrigger) | FeaturesSteps, hero |
| Canvas frame sequence | Hero video carousel |
| Preloader per route | `PreloaderProvider` pathname key |
| Smooth scroll | Lenis via `SmoothScrollProvider` |

---

## 7. Configuration

### `next.config.ts`

- `images.remotePatterns`: `*.supabase.co` only (optional CDN)
- Cache headers on `/static/frames/:path*`

### Graphify (tracked in git)

Live graph at `graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`, `manifest.json`). Cursor rule: `.cursor/rules/graphify.mdc`.

```bash
graphify update .          # after code changes (AST only, no API cost)
graphify query "<question>"
```

Dated snapshot folders and `graphify-out/cache/` stay gitignored. Vercel still ignores `graphify-out/` (`.vercelignore`) so it is not deployed.

### Local-only folders (gitignored + vercelignored)

| Folder | Purpose |
|---|---|
| `website-refs/` | Offline reference mirrors for dev comparison (~1GB) |
| `terminal-industries-clone/` | Legacy clone path (if present locally) |

Neither folder is tracked in git or deployed to Vercel.

---

## 8. Placeholders (Phase 2)

Phase 1 is complete — site runs without external CDNs. Remaining placeholders:

- Client logo wall / grid (Logoipsum SVGs)
- Team portraits (stock placeholders)
- Some Kling-generated CGI (solutions, services, about work) → replace with real photography

See `docs/sricomforts-asset-checklist.md` for the full Phase 2 list.

---

## 9. How to Run

```bash
cd sricomforts-nextjs   # repo root
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## 10. Conventions

1. **Data in `src/data/`** — keep copy/config out of components
2. **Import CSS in `globals.css`** — no CSS-in-JS for layout
3. **Reuse hooks** (`useAnimatedStrong`, `useTextReveal`, etc.)
4. **Reuse shared components**: `FormReference`, `SiteHeader`, `SiteFooter`, `NotchSection`
5. **Read Next.js docs in `node_modules/next/dist/docs/`** — Next.js 16 APIs differ from older versions
6. **Scope global CSS** — especially `.inner` (use `.site-header .inner`)
7. **Test preloader** on route change, not just initial load
8. **Sri Comforts blue palette** — brand tokens in `tokens.css`

---

## 11. Quick Hand-off (new chats)

```
## Context for new chat
- Project: sricomforts-nextjs (Sri Comforts HVAC marketing site)
- Full history: context.md in repo root
- Graph: graphify-out/graph.json (run `graphify query` before exploring)
- Done: Pages live; nav/footer logo clamped 200–240 / 220–280 px
- Next: New logo assets if provided (export 960×203, replace public/assets/brand/sricomforts-logo.png)
- Key files: src/styles/brand-logo.css, src/components/brand/FullLogo.tsx, src/data/
```
