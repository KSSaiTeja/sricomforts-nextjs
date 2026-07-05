# Project Context — sricomforts-nextjs (Sri Comforts Rebrand)

> **Last updated:** July 6, 2026  
> **Purpose:** Living record of what has been built, how it was built, and what remains. Use this file at the start of every new chat to avoid re-explaining project history.

---

## 1. Project Summary

| Field | Value |
|---|---|
| **Repo** | `/Users/kssaiteja/Downloads/sricomforts-nextjs` |
| **Package name** | `terminal-industries-next` (not yet renamed — see checklist §8.4) |
| **Client / Brand** | **Sri Comforts** (Sri Comfort Air Products & Services) — authorized Daikin HVAC partner in South India |
| **Template source** | [Terminal Industries](https://terminal-industries.com) website (Nuxt/Vue). Reference clone **removed from git** in commit `d6b3d19`; may still exist locally under `terminal-industries-clone/` (gitignored) |
| **Goal** | Pixel-perfect UI/animation replica of Terminal Industries template, re-skinned with Sri Comforts blue palette and HVAC copy |
| **Current rebrand scope** | **Phase 1:** Remove Terminal/template/vendor dependencies (placeholders OK). **Phase 2 (later):** Swap placeholders for real client assets |
| **Stack** | Next.js 16.2.10 · React 19.2.4 · TypeScript · Tailwind CSS 4 · GSAP 3.15 · Lenis 1.3.25 · Supabase JS 2.49 |
| **Font** | Suisse Intl (Regular 400, Medium 600) via `next/font/local` |
| **Git state** | **11 commits** on `main`, 2 ahead of `origin/main`. See **§16** for full post-`context.md` commit log |
| **Checklist** | `docs/terminal-industries-replacement-checklist.md` — Phase 1/2 tracker |

### Business context (from `docs/about-sricomforts.md`)

- Founded 2001, HQ Secunderabad, 230+ engineers, 8 cities in South India
- Services: VRV/VRF, central AC, ductable systems, AHUs, clean/cold rooms, ventilation
- Brands: Daikin (primary), O General, LG, Panasonic
- 24-hour service response promise
- Clients: IT parks, hospitals, pharma, manufacturing, luxury residential

---

## 2. Reference Repository

### `terminal-industries-clone/` (local only)

> **Removed from git** in commit `d6b3d19` (Jul 5, 21:36). Still listed in `.gitignore` and `.vercelignore` if present locally (~937MB). **Never deploy.**

When available locally, this folder was the **single source of truth** for layout, DOM structure, CSS values, and GSAP animation behavior.

| Path | Purpose |
|---|---|
| `pages/*.html` | 200+ saved HTML pages (solutions, services, blog, etc.) |
| `rendered-homepage/` | Fully rendered homepage snapshot + Nuxt assets |
| `assets/terminal-industries.com/_nuxt/` | Original CSS modules and JS bundles |
| `structured_content.json` | Parsed page content |
| `serve_mirror.py` / `serve.sh` | Local static server for side-by-side comparison |

### Hero frame assets (self-hosted)

Hero scroll canvas frames are **no longer proxied** from `terminal-industries.com`.

| Detail | Value |
|---|---|
| **Location** | `public/static/frames/home/desktop/webp/` (410 frames) + `mobile/webp/` (409 frames) |
| **Naming** | `hero_anim_desktop_60_{index}.webp` / `hero_anim_mobile_60_{index}.webp` |
| **URL builder** | `getHeroFrameUrls()` in `src/data/homepage.ts` → `/static/frames/home/{variant}/webp/...?v={HERO_FRAMES_VERSION}` |
| **Cache bust** | `NEXT_PUBLIC_HERO_FRAMES_VERSION` env (default `"2"`) |
| **Next config** | Cache-Control headers on `/static/frames/:path*` only — **no external rewrite** |
| **Optional CDN** | Supabase Storage via `src/lib/supabase/assets.ts` + `scripts/upload-assets-to-supabase.mjs` (disabled unless `NEXT_PUBLIC_SUPABASE_ASSETS=true`) |

### Key reference HTML files used during development

| Page built | Reference HTML |
|---|---|
| Homepage | `rendered-homepage/page.rendered.html` + `_nuxt/` CSS/JS |
| Contact | Contact page HTML in `pages/` |
| About | About page HTML in `pages/` |
| Solutions (template) | `pages/Terminal_for_3PLs___AI_Powered_Yard___Logistics_Solutions.html` (+ `_1.html`) |
| Services (template) | `pages/Terminal_YOS___Yard_Operating_System_for_AI_Driven_Logistics_Automation.html` (+ `_1.html`) |

---

## 3. Development Timeline (Chronological)

All dates are from agent chat transcripts (Jul 3–5, 2026).

### Phase 0 — Project bootstrap (Jul 3)

- Ran `create-next-app` → initial commit `75ba0b1`
- Default Next.js 16 + React 19 + Tailwind 4 scaffold only

### Phase 1 — Preloader + design tokens (Jul 3, evening)

**Chat:** Preloader review & Sri Comforts branding

| Task | Details |
|---|---|
| Preloader system | Built `AppPreloader`, `PreloaderProvider`, `PreloaderGate`, `AnimatedLogo`, `PathBackground`, `SvgMask` |
| Logo integration | Added `public/logo/full-logo.svg`, `logo-icon.svg`, `logo-wordmark.svg`; split icon + wordmark animation |
| Color migration | Replaced green/neon-green Terminal palette with Sri Comforts blue family |
| Design tokens | Created `src/styles/tokens.css` with production naming (`--color-brand-primary`, `--color-brand-neon`, etc.) |
| Logo proportions | Fixed icon/wordmark sizing ratio in preloader |
| Font setup | Added `public/fonts/SuisseIntl-*.woff2`, wired in `layout.tsx` as `--font-primary` |

### Phase 2 — Homepage sections 1–2: Hero + LogoWall (Jul 4, ~10:52–12:12)

**Chats:** Hero replication, navbar, logo wall polish

| Section | Component(s) | Work done |
|---|---|---|
| **§1 Preloader/Hero** | `VideoCarousel`, `HeroScrollContent`, `VideoSequence` | Canvas frame-sequence animation; 4 scroll-driven title reveals; sticky scroll math; dynamic import (no SSR) |
| **§2 LogoWall** | `LogoWall`, `LogoBorderCell`, `SeparatorNotch` | Infinite ticker on desktop; grid layout; border pulse hover animations; cross-flicker accents |
| **Navbar** | `SiteHeader`, `NavDropdown` | Hover-open dropdowns (not click); glass morphism bar; logo sizing; duplicate React key fix; height matched to clone |
| **Smooth scroll** | `SmoothScrollProvider` (Lenis) | Enabled after preloader completes |

**Issues fixed along the way:**
- Black hero canvas → frame URL rewrite + `useVideoSequence` hook
- Logo wall grid/hover not matching clone → CSS module rewrite from `_nuxt/LogoWall` styles
- Nav dropdown not opening on hover → event handler change
- Nav height mismatch → pixel values from clone CSS

### Phase 3 — Homepage sections 3–4 (Jul 4, ~12:22–13:10)

**Chats:** Section-by-section homepage build

| Section | Component(s) | Work done |
|---|---|---|
| **§3 SectionIntroduction (bridge)** | `SectionIntroduction`, `TextReveal`, `TextRevealChar` | Char-by-char scroll reveal; gradient strong text; word-break tuning for Sri Comforts copy |
| **§4 FeaturesSteps** | `FeaturesSteps`, `PaddedCounter`, `NotchSection`, `SvgMask` | Sticky scroll panel; right-side video with notch clip; step counter animation; ScrollTrigger pin/scrub |
| **SvgMask fix** | `src/lib/svg/notchMask.ts`, `roundedPath.ts` | Notch clip-path geometry corrected to match clone |

**Issues fixed:**
- Sticky scroll + video panel alignment (90% → 100% match)
- Navbar CSS collision with `.inner` class → scoped to `.site-header .inner`
- Video notch shape incorrect → `SvgMask` + `notchMask.ts` rewrite

### Phase 4 — Homepage sections 5–6 + Footer (Jul 4, ~13:17–14:19)

| Section | Component(s) | Work done |
|---|---|---|
| **§5 Industry intro + LogoGrid** | `SectionIntroduction`, `LogoGrid` | "Built by the industry" typography; 5-logo grid (`.logo-grid-industry`, separate from LogoWall) |
| **§6 Contact form** | `FormReference` | Full form builder UI: fields, dropdown, submit button, logo stripe, GSAP text reveals |
| **Footer** | `SiteFooter`, `FooterPathBackground`, `FullLogo` | Sticky reveal on desktop (GSAP ScrollTrigger); static on mobile; link columns; path background SVG |

**Post-homepage polish (same day):**
- Section heading copy disturbed → restored from `homepage.ts`
- Nav items updated for Sri Comforts business (Solutions, Services, Resources, About)
- Resources dropdown: tonnage calculator, blog categories, case studies
- Copy word-breaks tuned for GSAP char animations
- GSAP gradient reveal + button interactions fixed after copy changes
- Duplicate nav key error (`/solutions/commercial`) fixed

### Phase 5 — Site-wide color rebrand (Jul 4, ~14:44–14:58)

**Chat:** Green → Sri Comforts blue migration

| Change | Files |
|---|---|
| Token rename to production names | `src/styles/tokens.css` |
| Green → blue intensity mapping (same visual weight) | All CSS files site-wide |
| Navbar dropdown solid navy | `--color-surface-dropdown: #252D38`, active chip `#323D4D` |
| Neon accent for paths/grids | `--color-brand-neon: #00D4FF` |
| Orange kept as secondary | `--color-accent-orange: #FB6B3C` |
| Navbar glass background | `rgb(0 0 0 / 40%)` with blur |
| WCAG readability pass | Accent colors on dark surfaces |

### Phase 6 — Contact page (Jul 4, ~15:03–16:09)

**Route:** `/contact`

| Section | Component(s) | Work done |
|---|---|---|
| Hero form | `FormReference` (shared with homepage) | Reused component; `paddingTop="header"` to clear fixed nav |
| Datasheet banner | `PromoBannerDownload` | Email capture + download CTA |
| Contact ways grid | `ContactWaysGrid`, `ContactWaysCardBase/Link/Action/Subscribe` | Notched cards, hover animations, link/action/subscribe variants |
| Form fixes | `form-button.css`, `form-field.css` | Submit button visible state; dropdown selection state; hover colors |
| Footer context CTA | `SiteFooter` | Disabled hover animation on homepage footer CTA blocks |

**Data:** `src/data/contact.ts`

### Phase 7 — About page (Jul 4, ~16:13–17:06)

**Route:** `/about`

| Section | Component | Sri Comforts content |
|---|---|---|
| Hero intro | `AboutSectionIntro` | Company overview |
| Our Work grid | `AboutFeaturesGrid` | Project highlights (anchor: `#our-work`) |
| Story & Values | `AboutSectionIntro` | Company history + values |
| Leadership | `AboutLeaders` | Executive team |
| Brand partners | `AboutLeaders` + intros | Daikin, etc. |
| Logo grid | `AboutLogoGrid` | Partner/certification logos |
| Advisors | `AboutLeaders` | Advisory board |
| Team CTA | `AboutSectionIntro` | Join us CTA |

**Features:**
- Hash scroll navigation (`useHashScroll`) for `#about-sri-comforts`, `#our-team`, `#our-work`, `#awards-recognition`
- Footer Company links route to about anchors; Careers → `/career` (404 — not built)
- Text layout width matched to clone template
- Background pattern removed per user request

**Data:** `src/data/about.ts` (404 lines)

### Phase 8 — Solutions pages (Jul 4, ~17:10–18:19)

**Route:** `/solutions/[slug]` — **6 pages**

| Slug | Sector |
|---|---|
| `commercial` | Commercial HVAC |
| `it-services` | IT Services / data center cooling |
| `industrial-pharma` | Industrial & Pharma |
| `healthcare` | Healthcare HVAC |
| `hospitality-retail` | Hospitality & Retail |
| `residential` | Residential |

**Template reference:** Terminal for 3PLs page

**Page structure (`SolutionsPage.tsx`):**
1. Hero intro (`SolutionsSectionIntro` in `NotchSection`)
2. Problem grid (`SolutionsSectionsGrid` — dark 4-card variant)
3. Solution intro (`SolutionsSectionIntro`)
4. Value cards (`SolutionsValue`)
5. Features carousel (`SolutionsFeaturesCarousel` — drag, metrics on hover, CTA buttons)
6. Use cases grid + Case study (`SolutionsCaseStudy` with `SvgMask` + responsive path background)
7. Contact form (`FormReference`)
8. Footer (`SiteFooter`)

**Shared components built:**
- `BackgroundCanvas`, `PathLineFollower`, `AnimatedCardBorder`, `AnimatedPathLine`, `SectionsGridSvg`
- Path follower rotates along SVG line (not just positioned)
- Images recolored to blue; orange lines → neon blue
- Per-card related images via `solutionImages.ts`
- Case study section rendering fixed

**Data:** `src/data/solutions.ts` (~890 lines), `src/data/solutionImages.ts`

### Phase 9 — Services pages (Jul 4, ~18:24–19:43)

**Route:** `/services/[slug]` — **3 pages**

| Slug | Content |
|---|---|
| `how-we-work` | Service process overview |
| `amc` | Annual Maintenance Contract plans |
| `service-request` | Request service flow |

**Template reference:** Terminal YOS (What is YOS) page

**Page structure (`ServicesPage.tsx`):**
1. Hero intro (`ServicesSectionIntro`)
2. Dark intro section
3. "Breaking Down the Service Process" intro
4. Features grid with notched images (`ServicesFeaturesGrid`) — zigzag layout
5. Expandable carousel (`ServicesFeaturesCarouselExpandable`) — clickable chips, drag interaction
6. Value cards (`SolutionsValue` — reused)
7. Contact form + Footer

**Issues fixed:**
- Image loading / notch alignment on process section
- Gradient text reveal missing → GSAP hooks restored
- Left/right alternating zigzag layout
- Chip-to-card click navigation
- Overlapping layout issues
- Font sizes and text effects matched to YOS clone
- CTA buttons route to `/contact` instead of placeholder links

**Data:** `src/data/services.ts` (~590 lines), `src/data/serviceImages.ts`

### Phase 10 — Preloader route trigger (Jul 4, ~19:32)

**Fix:** Preloader now re-triggers on every page navigation and reload.

**Implementation:** `PreloaderProvider.tsx` tracks `pathname`; renders `<AppPreloader key={pathname}>` when path changes; `loadedPath` state resets per route.

### Phase 11 — 404 page (Jul 4, ~19:48–19:54)

**Route:** `src/app/not-found.tsx` → `NotFoundPage`

- Matches Sri Comforts blue aesthetic
- Uses `BackgroundCanvas`, `CrossFlicker`, `NotchSection`, `PathBackground`
- GSAP animated 404 code + message
- `SiteHeader` + `SiteFooter`
- Respects preloader gate

### Phase 12 — First git commit: full site snapshot (Jul 5, 21:19) — `dcbd72d`

**Commit:** `proper landing page is done` — **created `context.md`** and committed the entire built site (~147 source files).

| Area | What was committed |
|---|---|
| **Pages** | Homepage, `/contact`, `/about`, 6× `/solutions/[slug]`, 3× `/services/[slug]`, 404 |
| **Components** | All 73+ components (home, about, contact, solutions, services, layout, preloader, brand, shared) |
| **Data** | `homepage.ts`, `about.ts`, `contact.ts`, `solutions.ts`, `services.ts`, `solutionImages.ts`, `serviceImages.ts` |
| **Styles** | `tokens.css`, 30+ CSS modules imported in `globals.css` |
| **Brand assets** | `public/logo/full-logo.svg`, `logo-icon.svg`, `logo-wordmark.svg`; favicon regenerated from icon |
| **Fonts** | `public/fonts/SuisseIntl-*.woff2` |
| **Docs** | `context.md`, `docs/terminal-industries-replacement-checklist.md`, `docs/about-sricomforts.md`, `docs/supabase-assets.md`, `docs/hero-video-omni-prompts.md`, proposal PDFs |
| **Infra** | `next.config.ts` remotePatterns (Supabase, Storyblok, Unsplash) + frame cache headers; Supabase upload script; `src/lib/supabase/` |
| **Hero frames** | Symlink `public/static/frames` → outside repo (later removed) |
| **Clone** | Full `terminal-industries-clone/` folder still in repo at this point |

### Phase 13 — Build fix (Jul 5, 21:31) — `67d52a0`

**Commit:** `build issue fixed`

| Change | Detail |
|---|---|
| **Missing deps** | Added explicit `gsap@^3.15.0` and `lenis@^1.3.25` to `package.json` (were used but not declared) |
| **Video sequence worker** | Fixed `src/workers/video-sequence.worker.ts` — worker message handling / frame decode |
| **Canvas pipeline** | Refactored `src/lib/canvas/createVideoSequence.ts` — preload batching, error handling |

### Phase 14 — Clone removal from git (Jul 5, 21:36) — `d6b3d19`

**Commit:** `html files removed`

| Change | Detail |
|---|---|
| **Deleted** | Entire `terminal-industries-clone/` from git tracking — **2,595 files**, ~293K lines removed |
| **Includes** | 200+ HTML pages, rendered homepage, `_nuxt` JS/CSS bundles, crawl logs, `serve_mirror.py`, Storyblok mirror assets under clone paths |
| **Reason** | Repo size / deploy weight; clone kept locally via `.gitignore` for dev reference |
| **Impact** | `context.md` clone-based workflow still valid if folder exists locally |

### Phase 15 — Vercel deploy fix (Jul 5, 21:41) — `86525cb`

**Commit:** `Fix Vercel deploy by removing broken frames symlink.`

| Change | Detail |
|---|---|
| **Removed** | `public/static/frames` symlink (pointed outside repo → broke Vercel file upload) |
| **Added** | `public/static/frames/.gitkeep`; `.gitignore` rules for frames; `.vercelignore` entry for clone |
| **Note** | At this point frames intended for Supabase CDN; local hosting came in `9864197` |

### Phase 16 — Hero frame glitch fixes (Jul 5, 22:06) — `895608d`

**Commit:** `Fix hero frame glitches: full preload, Terminal batching, capped fallback`

| File | Change |
|---|---|
| `createVideoSequence.ts` | Full preload strategy; Terminal-style batch loading; capped fallback frame index |
| `AppPreloader.tsx` | Preloader timing tied to frame readiness |
| `VideoCarousel.tsx` | Carousel/frame sync improvements |

### Phase 17 — Self-hosted hero frames (Jul 5, 23:32) — `9864197`

**Commit:** `Deploy hero frames from /public at 1080p60 (v3 cache bust).`

| Change | Detail |
|---|---|
| **Frames committed** | 819 WebP files: 410 desktop + 409 mobile in `public/static/frames/home/` |
| **Source** | Extracted from 60fps source at 1080p |
| **`homepage.ts`** | `getHeroFrameUrls()` switched from Supabase `assetUrl()` to same-origin `/static/frames/...?v=` paths; added `HERO_FRAMES_VERSION` |
| **Pipeline** | `createVideoSequence.ts` + `video-sequence.worker.ts` preload/worker overhaul for smooth playback |
| **Preloader** | `AppPreloader`, `PreloaderGate`, `PreloaderProvider`, `SmoothScrollProvider` timing adjustments |
| **Docs** | `docs/supabase-assets.md` updated; `.gitignore` frame rules |

### Phase 18 — Preloader scroll unblock (Jul 5, 23:45) — `487e677`

**Commit:** `Unblock scroll at preloader end; preload hero frames during loader only.`

| Change | Detail |
|---|---|
| **New component** | `HeroPreloadStarter.tsx` — kicks off frame fetch during preloader |
| **Strategy** | Larger preload batches; reveal when animation ends (not waiting for all 410 frames); 45% threshold |
| **Deferred loads** | Feature video preloads deferred until after hero reveal |
| **Lenis** | Warm/smooth-scroll handoff during preloader exit transition |
| **Files** | `FeaturesSteps.tsx`, `VideoCarousel.tsx`, `PreloaderProvider/Gate`, `createVideoSequence.ts`, `SmoothScrollProvider.tsx` |

### Phase 19 — Jitter fix + Product Catalog + logo placeholders (Jul 6, 00:04) — `794f9c8`

**Commit:** `Fix jittery scroll: remove per-frame React updates and throttle frame loads.`

| Area | Detail |
|---|---|
| **Scroll performance** | Lenis kept alive across preloader; hero canvas/text driven from refs on GSAP ticker (no per-frame React state); frame batches paused while scrolling |
| **Product Catalog** | New homepage section: `ProductCatalog.tsx`, `product-catalog.module.css`, `src/data/productCatalog.ts` — bento grid for Daikin product lines |
| **Logo wall/grid** | `homepage.ts`: 20 logo-wall + 5 logo-grid entries switched from Terminal Storyblok SVGs (DSV, Ryder, HP, Foxconn, 8VC, etc.) → `/logos/placeholder/logo-*.svg` |
| **Form stripe** | `logoStripe` → `/logos/placeholder/logo-stripe.svg` |
| **About cert grid** | `aboutBrandLogos` → placeholder SVGs (removed mislabeled Daikin/LG Storyblok assets) |
| **Section intro** | Added `productCatalog` block to `sectionIntros`; removed `followingLogos` from bridge intro |
| **Other** | `HeroScrollContent`, `LogoBorderCell`, `VideoCarousel`, `useVideoSequence`, `SmoothScrollProvider` refinements |

### Phase 20 — Local team portraits + doc sync (Jul 6, 00:17) — `a9b80be`

**Scope:** Complete Phase 1 portrait/asset wiring + documentation update.

| Change | Detail |
|---|---|
| **`about.ts`** | All 8 executive, 2 partner, 4 advisor portraits → local `/images/team/{executive,partners,advisors}/*.webp`; `portrait()` helper no longer hits Storyblok |
| **`homepage.ts`** | Quote testimonial → `/images/team/testimonial/quote-portrait.webp` |
| **Assets added** | `public/images/team/` (17 WebP/JPG files), `public/logos/placeholder/` (15 SVGs), `public/assets/product-bento.png` |
| **Checklist** | `docs/terminal-industries-replacement-checklist.md` — Phase 1/2 scope, ✅ marks for resolved items |
| **`context.md`** | This update — §16 commit log, corrected git state, hero frame hosting, clone removal |

---

## 4. Current Route Map

| Route | Status | Component entry |
|---|---|---|
| `/` | ✅ Complete | `src/app/page.tsx` → `HomePage` (+ `ProductCatalog` section since `794f9c8`) |
| `/contact` | ✅ Complete | `src/app/contact/page.tsx` → `ContactPage` |
| `/about` | ✅ Complete | `src/app/about/page.tsx` → `AboutPage` |
| `/solutions/commercial` | ✅ Complete | `src/app/solutions/[slug]/page.tsx` |
| `/solutions/it-services` | ✅ Complete | ↑ |
| `/solutions/industrial-pharma` | ✅ Complete | ↑ |
| `/solutions/healthcare` | ✅ Complete | ↑ |
| `/solutions/hospitality-retail` | ✅ Complete | ↑ |
| `/solutions/residential` | ✅ Complete | ↑ |
| `/services/how-we-work` | ✅ Complete | `src/app/services/[slug]/page.tsx` |
| `/services/amc` | ✅ Complete | ↑ |
| `/services/service-request` | ✅ Complete | ↑ |
| `/*` (404) | ✅ Complete | `src/app/not-found.tsx` → `NotFoundPage` |

### Routes in nav but NOT built yet

| Route | Nav location |
|---|---|
| `/career` | About → Careers |
| `/blog` | Resources → All Articles |
| `/blog/category/*` | Resources → Blog categories (5 links) |
| `/about/our-work` | Resources → Case Studies (should be `#our-work` anchor) |
| `/resources/product-overview` | Contact ways card link |

---

## 5. File Inventory (147 source files)

### App router (`src/app/`)

```
src/app/
├── layout.tsx          # Root layout: Suisse Intl font, PreloaderProvider, metadata
├── page.tsx            # Homepage → HomePage
├── globals.css         # Tailwind + 30 CSS module imports + base resets
├── not-found.tsx       # 404 page
├── favicon.ico
├── about/page.tsx
├── contact/page.tsx
├── solutions/[slug]/page.tsx   # SSG via generateStaticParams
└── services/[slug]/page.tsx    # SSG via generateStaticParams
```

### Components (`src/components/` — 73 files)

| Directory | Files | Purpose |
|---|---|---|
| `brand/` | 5 | `FullLogo`, `LogoWordmark`, `LogoIcon`, `WordmarkPaths`, `wordmarkSlices.ts`, `logoDimensions.ts` — **Terminal/Rejouice logo components deleted** |
| `home/` | 22 | Homepage sections + CSS modules (incl. `ProductCatalog`, `product-catalog.module.css`) |
| `layout/` | 5 | `SiteHeader`, `SiteFooter`, `NavDropdown`, `FooterPathBackground`, `site-header.module.css` |
| `preloader/` | 7 | Full preloader animation stack + CSS module |
| `about/` | 5 | About page sections |
| `contact/` | 8 | Contact page sections + arrow icon |
| `solutions/` | 11 | Solutions template components |
| `services/` | 4 | Services template components |
| `ui/` | 3 | `ButtonTilt`, `TextReveal`, `TextRevealChar` |
| `not-found/` | 1 | 404 page component |

### Data layer (`src/data/` — 8 files)

| File | Lines (approx) | Content |
|---|---|---|
| `navigation.ts` | 90 | Nav structure, contact info, Sri Comforts menu items |
| `homepage.ts` | 241 | Hero titles, section intros, logo wall data, form config |
| `about.ts` | 404 | All about page copy, leaders, anchors |
| `contact.ts` | 69 | Datasheet banner, contact ways cards, notch config |
| `solutions.ts` | 890 | 6 solution pages — hero, grids, carousels, case studies |
| `solutionImages.ts` | — | Per-slug feature/card images (Unsplash + Storyblok) |
| `services.ts` | 590 | 3 service pages — process grid, carousel, value cards |
| `serviceImages.ts` | — | Per-slug service section images |

### Hooks (`src/hooks/` — 9 files)

| Hook | Used for |
|---|---|
| `useVideoSequence` | Hero canvas frame playback |
| `useTextReveal` | Scroll-triggered text animations |
| `useAnimatedStrong` | Gradient `<strong>` text reveal |
| `useAnimatedPathLines` | SVG path drawing animations |
| `useHorizontalDragScroll` | Features carousel drag |
| `useHashScroll` | About page anchor navigation |
| `useMediaQuery` | Responsive behavior |
| `useSvh` | Small viewport height CSS variable |
| `useVideoSequence` | Frame sequence timing |

### Libraries (`src/lib/` — 9 files)

| Path | Purpose |
|---|---|
| `gsap/register.ts` | GSAP plugin registration (ScrollTrigger, etc.) |
| `svg/notchMask.ts` | Notch clip-path geometry |
| `svg/roundedPath.ts` | Rounded corner SVG paths |
| `svg/cardClipPath.ts` | Card border clip paths |
| `svg/pathFollower.ts` | Path follower position + rotation math |
| `svg/solutionsBorderPaths.ts` | Solutions page animated border SVGs |
| `text/splitChars.ts` | Character splitting for TextRevealChar |
| `canvas/fitImage.ts` | Canvas image fitting for hero frames |

### Styles (`src/styles/` — 33 CSS files)

All imported centrally from `globals.css`. Key files:

| File | Scope |
|---|---|
| `tokens.css` | Design system CSS variables |
| `site-header.css` | Fixed navbar, glass effect |
| `nav-dropdown.css` | Hover dropdown panels |
| `features-steps.css` | Sticky scroll section |
| `logo-wall.css` / `logo-grid.css` | Two distinct logo sections |
| `form-*.css` | Form builder UI (4 files) |
| `solutions-page.css` | Solutions layout |
| `services-page.css` | Services layout |
| `case-study.css` | Case study + SvgMask |
| `features-carousel.css` | Drag carousel |
| `site-footer.css` | Sticky footer reveal |

### Public assets (`public/`)

```
public/
├── fonts/SuisseIntl-Regular.woff2
├── fonts/SuisseIntl-Medium.woff2
├── logo/full-logo.svg, logo-icon.svg, logo-wordmark.svg
├── logos/placeholder/logo-01.svg … logo-14.svg, logo-stripe.svg
├── images/team/executive/*.webp, advisors/*.webp, partners/*.webp, testimonial/quote-portrait.webp
├── assets/product-bento.png, sample video.mov
├── static/frames/home/desktop/webp/ (410 frames), mobile/webp/ (409 frames)
└── static/images/gartner.svg, linkedin.svg, x.svg, youtube.svg
```

### Providers

- `src/providers/SmoothScrollProvider.tsx` — Lenis smooth scroll, gated by preloader

### Types

- `src/types/notch.ts` — Notch geometry types for SvgMask

---

## 6. Design System (`src/styles/tokens.css`)

### Brand colors (from Sri Comforts logo)

| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#007BC0` | Primary brand blue |
| `--color-brand-deep` | `#2659A6` | Deep blue |
| `--color-brand-ink` | `#051824` | Body text |
| `--color-brand-accent-bright` | `#33B5E8` | Bright accent |
| `--color-brand-neon` | `#00D4FF` | Grid lines, path followers, dark-section glow |
| `--color-accent-orange` | `#FB6B3C` | Secondary accent (kept from template) |

### Surfaces

| Token | Value |
|---|---|
| `--color-surface-dropdown` | `#252D38` |
| `--color-surface-dropdown-active` | `#323D4D` |
| `--color-surface-nav-glass` | `rgb(0 0 0 / 40%)` |
| `--color-background` | `#EDEDED` |

### Logo SVG colors (unchanged in SVG files)

`#007BC0`, `#2659A6`, `#32C4E6`

---

## 7. Key Configuration Changes

### `package.json` — dependencies added

```json
"gsap": "^3.15.0",
"lenis": "^1.3.25"
```

(Were not in initial commit)

### `next.config.ts`

- `images.remotePatterns`: `a.storyblok.com`, `images.unsplash.com`
- Rewrite: `/static/frames/:path*` → Terminal Industries CDN

### `src/app/layout.tsx`

- Removed Geist fonts → Suisse Intl local font
- Added `PreloaderProvider` + `PreloaderGate` wrapping all pages
- Metadata updated to Sri Comforts title/description
- `html` classes: `lenis lenis-smooth h-full`

### `src/app/globals.css`

- Expanded from 26 lines (default Tailwind) → 268+ lines
- Imports 30 component CSS files
- Base reset, Lenis scroll styles, link styles, `.inner` grid system

### `src/app/page.tsx`

- Reduced from default Next.js boilerplate → single line rendering `<HomePage />`

---

## 8. Animation & Interaction Patterns

These patterns are reused across pages — match these when building new sections:

| Pattern | Implementation | Used in |
|---|---|---|
| Char reveal on scroll | `TextRevealChar` + `useTextReveal` + ScrollTrigger | Section intros, hero titles |
| Gradient strong text | `useAnimatedStrong` + `.animated-strong` | Headings with `<strong>` |
| Notch sections | `NotchSection` + `SvgMask` + `notchMask.ts` | Solutions, services, 404 |
| Sticky scroll pin | GSAP ScrollTrigger pin + scrub | FeaturesSteps, hero |
| Path follower | `PathLineFollower` + `pathFollower.ts` | Solutions pages |
| Canvas background | `BackgroundCanvas` | Solutions dark sections, 404 |
| Card border animation | `AnimatedCardBorder` | Solutions grids |
| Horizontal drag carousel | `useHorizontalDragScroll` | Features carousel, services carousel |
| Footer sticky reveal | GSAP ScrollTrigger on `SiteFooter` | Homepage (desktop only) |
| Preloader per route | `PreloaderProvider` pathname key | All pages |
| Smooth scroll | Lenis via `SmoothScrollProvider` | After preloader completes |

---

## 9. Placeholder / Temporary Content

**Phase 1 goal:** Remove Terminal/template/vendor ties. Placeholders are acceptable.  
**Phase 2 (later):** Replace with real Sri Comforts client assets. See `docs/terminal-industries-replacement-checklist.md`.

| Item | Phase 1 status | Phase 2 (later) |
|---|---|---|
| Storyblok CDN images | 🔲 Still used in videos, feature images, contact, solutions, services, about work gallery | Local/hosted HVAC photography |
| Hero canvas frames | ✅ Self-hosted in `public/static/frames/home/` | Optional: HVAC-themed re-render |
| Logo wall / grid / form stripe | ✅ Local `/logos/placeholder/` SVGs | Real client/partner logos |
| About team/partner/advisor portraits | ✅ Local `/images/team/` (Pexels placeholders) | Real team photos from client |
| About cert logo grid | ✅ Neutral placeholder SVGs | Official Daikin/O General/LG/Panasonic badges |
| Quote testimonial portrait | ✅ Local placeholder | Real client photo |
| `yosSection` naming | 🔲 Internal name still references Yard OS template | Rename to Sri Comforts terminology |
| Package name `terminal-industries-next` | 🔲 Not renamed | → `sricomforts-nextjs` |
| Contact datasheet PDF | 🔲 Storyblok fake PDF URL | Real PDF in `/public/docs/` |
| Solutions carousel photos | 🔲 Unsplash stock via `solutionImages.ts` | Sector project photos |

---

## 10. Known Issues & Watch-outs

| Issue | Severity | Notes |
|---|---|---|
| `/career` route 404s | Expected | Linked from About nav + footer |
| `/blog/*` routes 404 | Expected | Nav links exist for structure clarity |
| Storyblok dependency | Medium | Homepage videos + 3 feature images, contact, solutions, services, about work gallery still on `a.storyblok.com` |
| Unsplash dependency | Medium | 30 carousel photos in `solutionImages.ts` |
| Hero frame repo size | Low | ~819 WebP files in `public/static/frames/` — large but self-hosted |
| Package name mismatch | Low | `package.json` still `terminal-industries-next`; folder is `sricomforts-nextjs` |
| Vercel CLI not installed | Low | Needed for deploy/env pull |
| HMR layout glitches | Low | Hard-refresh after HMR if layout looks wrong |
| `.inner` class collision | Fixed | Always scope to `.site-header .inner` or section-specific parent |
| LogoWall vs LogoGrid | Fixed | Never mix styles — separate CSS files |
| Clone folder local-only | Info | Removed from git `d6b3d19`; gitignored + vercelignored |

---

## 11. Pending / Next Tasks

### Phase 1 — Terminal/template removal (current)

- [ ] Storyblok sweep → local placeholders: homepage videos (×6) + feature images (×3), contact banner/PDF/icons, about work gallery (×3), all solutions/services images
- [ ] Unsplash sweep → local placeholders in `solutionImages.ts` (×30)
- [ ] Naming cleanup: `yosSection` → Sri Comforts naming, `package.json` rename, Yard OS copy pass
- [ ] Trim `next.config.ts` `remotePatterns` after Storyblok/Unsplash gone

### Phase 2 — Real client assets (later)

- [ ] Client logos, partner badges, project photography, service footage, product PDF, real testimonial

### Pages not yet built

- [ ] `/career` — Careers page
- [ ] `/blog` + `/blog/category/[slug]` — Blog listing + categories
- [ ] Any remaining nav dropdown targets

### Polish / infra (later)

- [ ] Production deploy setup (Vercel)
- [ ] SEO metadata per page review
- [ ] Form submission backend (currently UI-only)

---

## 12. How to Run

```bash
cd /Users/kssaiteja/Downloads/sricomforts-nextjs
npm install
npm run dev
# → http://localhost:3000
```

Compare against reference (if clone exists locally):
```bash
cd terminal-industries-clone
python3 serve_mirror.py   # or ./serve.sh
```

---

## 13. Conventions for Future Development

1. **Always read the matching HTML in `terminal-industries-clone/pages/`** before building a new section
2. **Match `_nuxt/*.css` values** from the clone — do not guess spacing/colors
3. **Import new CSS in `globals.css`** — no CSS-in-JS for layout styles
4. **Use existing hooks** (`useAnimatedStrong`, `useTextReveal`, etc.) — don't reinvent GSAP setups
5. **Data in `src/data/`** — keep copy/config out of components
6. **Reuse shared components**: `FormReference`, `SiteFooter`, `SiteHeader`, `NotchSection`, `SolutionsValue`
7. **Read Next.js docs in `node_modules/next/dist/docs/`** — this is Next.js 16 with breaking changes from training data
8. **Scope CSS classes** that collide globally (especially `.inner`)
9. **Test preloader** on route change, not just initial load
10. **Sri Comforts blue palette only** — no green Terminal colors

---

## 14. Chat Session Index

For detailed decision history, see agent transcripts:

| Date | Topic | Transcript ID |
|---|---|---|
| Jul 3 | Preloader + branding | `439a952b-cd21-47a0-8500-eddb5a8f227f` |
| Jul 3 | Initial homepage attempt | `d2ae3be7-7ff9-439d-95fa-860c0c06dc6b` |
| Jul 4 AM | Hero + LogoWall + Navbar | `7565da32-1c2c-4b0f-836d-551b89302a35` |
| Jul 4 | Homepage §3–§4 | `e489b7e5-73fb-4bab-b57d-c537788ad594`, `17b34290-1c8e-441e-8c83-d8e09fae09e5` |
| Jul 4 | Homepage §5 | `2fa3d1ea-3d50-434a-906a-2a0477bc3d27` |
| Jul 4 | Homepage §6 + Footer | `2a8cdb2c-9181-492b-831b-06fc0063d016`, `692b25ba-2d12-4ba8-b8ed-39cae9d1b4b6` |
| Jul 4 | Color rebrand | `ccb68629-f151-4b1b-8ac9-40ddfde5da99` |
| Jul 4 | Contact page | `aa051d1f-1781-4a91-99f3-385e46b9c026` |
| Jul 4 | About page | `1b9c4049-727a-4417-a764-c5ab73dbafe0` |
| Jul 4 | Solutions pages | `14958dbc-fae8-424d-8c99-3bd4c99ef63e` |
| Jul 4 | Services pages | `b10576fc-08f2-4030-a294-2452e4768aef`, `282b6bf5-6aab-4382-897e-bdde134efaec`, `f44f8c4e-bbf9-48b8-96b7-8ce40b66c0d2` |
| Jul 4 | Preloader route fix | `95b9608e-4d40-420f-87bc-9350a6b27dde` |
| Jul 4 | 404 page | `212f32ac-adf8-4696-88c2-a79c40fadc78` |

---

## 15. Quick Hand-off Block (paste into new chats)

```
## Context for new chat
- Project: sricomforts-nextjs (Sri Comforts rebrand)
- Full history: see /context.md in repo root (§16 = post-context.md commits)
- Goal: Phase 1 — remove Terminal/template/vendor deps; placeholders OK
- Done: Full site pages, hero frames self-hosted, logo placeholders, team portraits local, ProductCatalog section
- Checklist: docs/terminal-industries-replacement-checklist.md
- Next (Phase 1): Storyblok + Unsplash → local placeholders; yosSection/package rename
- Later (Phase 2): Real client logos, photos, PDFs
- Watch out: Storyblok still on videos/features/contact/solutions/services; package name still terminal-industries-next
```

---

## 16. Git Commit Log (after `context.md` creation)

`context.md` was first committed in **`dcbd72d`** (`proper landing page is done`, Jul 5 21:19 IST).  
All commits below are **after** that point, in chronological order.

| # | Hash | Date (IST) | Subject | Key changes |
|---|---|---|---|---|
| 1 | `dcbd72d` | Jul 5 21:19 | proper landing page is done | **Created `context.md`**. Committed entire site: all pages, components, data, styles, docs, Supabase infra, clone folder, hero frames symlink |
| 2 | `67d52a0` | Jul 5 21:31 | build issue fixed | Added `gsap` + `lenis` to package.json; fixed video-sequence worker + canvas preload |
| 3 | `d6b3d19` | Jul 5 21:36 | html files removed | Deleted `terminal-industries-clone/` from git (2595 files, ~293K deletions) |
| 4 | `86525cb` | Jul 5 21:41 | Fix Vercel deploy by removing broken frames symlink | Removed `public/static/frames` symlink; added `.gitkeep`, `.vercelignore`, gitignore rules |
| 5 | `895608d` | Jul 5 22:06 | Fix hero frame glitches: full preload, Terminal batching, capped fallback | `createVideoSequence.ts` preload overhaul; `VideoCarousel`, `AppPreloader` |
| 6 | `9864197` | Jul 5 23:32 | Deploy hero frames from /public at 1080p60 (v3 cache bust) | **819 WebP frames** committed; `getHeroFrameUrls()` → same-origin paths; worker/preloader pipeline |
| 7 | `487e677` | Jul 5 23:45 | Unblock scroll at preloader end; preload hero frames during loader only | `HeroPreloadStarter.tsx`; reveal at animation end; defer feature video preload |
| 8 | `794f9c8` | Jul 6 00:04 | Fix jittery scroll: remove per-frame React updates and throttle frame loads | Lenis across preloader; GSAP ticker refs; **ProductCatalog** section; logo wall/grid/stripe → placeholders; about cert grid → placeholders |
| 9 | `a9b80be` | Jul 6 00:17 | Add local placeholder portraits and sync project documentation | `about.ts` + `homepage.ts` portrait URLs; `public/images/team/` (14 WebP), `public/logos/placeholder/` (15 SVG), `product-bento.png`; checklist Phase 1/2; **`context.md` full update** |
| 10 | `a42dbb9` | Jul 6 00:18 | Correct commit hash reference in context.md | Fixed self-referential hash in §16 table (amend changed `d8719f9` → `a9b80be`) |

### Commit authors

All commits by **KSSaiTeja** (`saitej4865@gmail.com`). Commits `9864197`–`794f9c8` co-authored by Cursor.

### Branch state

- **Branch:** `main`
- **Remote:** `origin/main` (2 commits ahead as of Jul 6 00:18 IST)
- **Total commits:** 11
