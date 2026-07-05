# Project Context — terminal-industries-next (Sri Comforts Rebrand)

> **Last updated:** July 5, 2026  
> **Purpose:** Living record of what has been built, how it was built, and what remains. Use this file at the start of every new chat to avoid re-explaining project history.

---

## 1. Project Summary

| Field | Value |
|---|---|
| **Repo** | `/Users/kssaiteja/Downloads/terminal-industries-next` |
| **Client / Brand** | **Sri Comforts** (Sri Comfort Air Products & Services) — authorized Daikin HVAC partner in South India |
| **Template source** | [Terminal Industries](https://terminal-industries.com) website (Nuxt/Vue), cloned into `terminal-industries-clone/` |
| **Goal** | Pixel-perfect UI/animation replica of Terminal Industries template, re-skinned with Sri Comforts blue palette and HVAC copy |
| **Stack** | Next.js 16.2.10 · React 19.2.4 · TypeScript · Tailwind CSS 4 · GSAP 3.15 · Lenis 1.3.25 |
| **Font** | Suisse Intl (Regular 400, Medium 600) via `next/font/local` |
| **Git state** | Only **1 commit** (`Initial commit from Create Next App`). **All project work is uncommitted** (147+ source files, clone folder, assets) |

### Business context (from `docs/about-sricomforts.md`)

- Founded 2001, HQ Secunderabad, 230+ engineers, 8 cities in South India
- Services: VRV/VRF, central AC, ductable systems, AHUs, clean/cold rooms, ventilation
- Brands: Daikin (primary), O General, LG, Panasonic
- 24-hour service response promise
- Clients: IT parks, hospitals, pharma, manufacturing, luxury residential

---

## 2. Reference Repository

### `terminal-industries-clone/`

Local mirror of the Terminal Industries site used as the **single source of truth** for layout, DOM structure, CSS values, and GSAP animation behavior.

| Path | Purpose |
|---|---|
| `pages/*.html` | 200+ saved HTML pages (solutions, services, blog, etc.) |
| `rendered-homepage/` | Fully rendered homepage snapshot + Nuxt assets |
| `assets/terminal-industries.com/_nuxt/` | Original CSS modules and JS bundles |
| `structured_content.json` | Parsed page content |
| `serve_mirror.py` / `serve.sh` | Local static server for side-by-side comparison |

### Key reference HTML files used during development

| Page built | Reference HTML |
|---|---|
| Homepage | `rendered-homepage/page.rendered.html` + `_nuxt/` CSS/JS |
| Contact | Contact page HTML in `pages/` |
| About | About page HTML in `pages/` |
| Solutions (template) | `pages/Terminal_for_3PLs___AI_Powered_Yard___Logistics_Solutions.html` (+ `_1.html`) |
| Services (template) | `pages/Terminal_YOS___Yard_Operating_System_for_AI_Driven_Logistics_Automation.html` (+ `_1.html`) |

### External asset proxy

`next.config.ts` rewrites `/static/frames/:path*` → `https://terminal-industries.com/static/frames/:path*` so hero canvas frame sequences load from the live Terminal CDN without bundling ~1000 PNG frames locally.

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
| **Footer** | `SiteFooter`, `FooterPathBackground`, `TerminalFooterLogo` | Sticky reveal on desktop (GSAP ScrollTrigger); static on mobile; link columns; path background SVG |

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

---

## 4. Current Route Map

| Route | Status | Component entry |
|---|---|---|
| `/` | ✅ Complete | `src/app/page.tsx` → `HomePage` |
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
| `brand/` | 8 | Logo SVGs: `TerminalLogo`, `LogoWordmark`, `LogoIcon`, `FullLogo`, `WordmarkPaths`, `wordmarkSlices.ts`, `logoDimensions.ts`, `RejouiceLogo`, `TerminalFooterLogo` |
| `home/` | 20 | Homepage sections + 7 CSS modules |
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
├── logo/full-logo.svg, logo-icon.svg, logo-wordmark.svg, terminal-full-logo.svg
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

These are **intentionally placeholder** — assets/copy pass planned page-by-page after all routes exist:

| Item | Current state | Planned fix |
|---|---|---|
| Storyblok CDN images | Used throughout (`a.storyblok.com/f/337048/...`) | Replace with Sri Comforts photography |
| Hero canvas frames | Proxied from `terminal-industries.com/static/frames/` | Replace with HVAC-themed sequence |
| Logo stripe in forms | Terminal Industry partner logos | Sri Comforts client/partner logos |
| `RejouiceLogo` / `TerminalLogo` components | Terminal branding still in some SVGs | Full rebrand pass |
| Footer copy | Adapted but some Terminal phrasing may remain | Copy review |
| Contact datasheet PDF | Storyblok placeholder asset URL | Real Sri Comforts PDF |
| About leader photos | Storyblok placeholder portraits | Real team photos |

---

## 10. Known Issues & Watch-outs

| Issue | Severity | Notes |
|---|---|---|
| `/career` route 404s | Expected | Linked from About nav + footer |
| `/blog/*` routes 404 | Expected | Nav links exist for structure clarity |
| Storyblok dependency | Medium | All images break if Storyblok CDN unavailable |
| Hero frames external CDN | Medium | Depends on `terminal-industries.com` staying up |
| No git commits for work | High | 147 files uncommitted — recommend committing soon |
| Vercel CLI not installed | Low | Needed for deploy/env pull |
| HMR layout glitches | Low | Hard-refresh after HMR if layout looks wrong |
| `.inner` class collision | Fixed | Always scope to `.site-header .inner` or section-specific parent |
| LogoWall vs LogoGrid | Fixed | Never mix styles — separate CSS files |

---

## 11. Pending / Next Tasks

Based on last user message (Jul 4, ~19:54): *"remaining modifications, we will do tomorrow"*

### High priority
- [ ] Asset replacement pass (page by page): real Sri Comforts photos, logos, hero frames
- [ ] Full branding swap: remove remaining Terminal Industries references in SVGs/copy
- [ ] Git commit all work

### Pages not yet built
- [ ] `/career` — Careers page
- [ ] `/blog` + `/blog/category/[slug]` — Blog listing + categories
- [ ] Any remaining nav dropdown targets

### Polish pass (user mentioned for later)
- [ ] Header/footer logo final sizing
- [ ] Copy review for word-breaks + GSAP animation compatibility across all pages
- [ ] Production deploy setup (Vercel)
- [ ] Replace Storyblok image URLs with local/hosted assets
- [ ] SEO metadata per page review
- [ ] Form submission backend (currently UI-only)

---

## 12. How to Run

```bash
cd /Users/kssaiteja/Downloads/terminal-industries-next
npm install
npm run dev
# → http://localhost:3000
```

Compare against reference:
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
- Project: terminal-industries-next (Sri Comforts rebrand)
- Full history: see /context.md in repo root
- Done: Homepage, /contact, /about, 6× /solutions/[slug], 3× /services/[slug], 404, preloader, blue design system
- Reference: terminal-industries-clone/ (HTML + _nuxt CSS/JS)
- Key files: src/components/, src/data/, src/styles/tokens.css, src/app/globals.css
- Next: asset replacement, /career, /blog, remaining nav routes, git commit
- Watch out: Storyblok placeholders; hero frames proxied from terminal-industries.com; all work uncommitted
```
