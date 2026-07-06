# Terminal Industries → Sri Comforts Replacement Checklist

> **Purpose:** Track removal of Terminal Industries template dependencies.  
> **Scope (current):** **Phase 1 only** — strip Terminal/template/vendor ties; neutral placeholders are fine.  
> **Deferred:** **Phase 2** — swap placeholders for real Sri Comforts client assets (logos, photos, PDFs, etc.).  
> **Last updated:** July 6, 2026 — Phase 1 complete, ready to commit & deploy

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Phase 1 done — no Terminal/template dependency (placeholders OK) |
| 🔲 | Phase 1 not started — still tied to Terminal, Storyblok, or Unsplash |
| 🔜 | Phase 2 — replace placeholder with real client asset (later) |
| ⚠️ | Launch blocker — external vendor CDN still required at runtime |
| — | Not applicable (no asset in template) |

---

## 1. Branding & identity

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 1.1 | Header logo | `SiteHeader` → `FullLogo` | ✅ | Uses `/logo/full-logo.svg` |
| 1.2 | Footer logo | `SiteFooter` → `FullLogo` | ✅ | Uses `/logo/full-logo.svg` |
| 1.3 | Footer credit | `footerSection.creditsByline` | ✅ | `by kssaiteja` (add `creditsHref` if you want a portfolio link) |
| 1.4 | Preloader logo | `AnimatedLogo` → `LogoIcon` | ✅ | Already Sri Comforts |
| 1.5 | Unused Terminal components | `TerminalLogo.tsx`, `TerminalFooterLogo.tsx`, `RejouiceLogo.tsx` | ✅ | Deleted — no imports; Sri Comforts uses `FullLogo` / `LogoIcon` |
| 1.6 | Unused asset file | `public/logo/terminal-full-logo.svg` | ✅ | Deleted — no references |
| 1.7 | Favicon | `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` | ✅ | Generated from `public/logo/logo-icon.svg` |
| 1.8 | Gartner SVG | `public/static/images/gartner.svg` | ✅ | Deleted — unused; footer uses Sri Comforts credentials text only |

---

## 2. External CDN dependencies

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 2.1 | Hero canvas frames | `homepage.ts` → `getHeroFrameUrls()` | ✅ | Self-hosted desktop + mobile (`hero_anim_*_24_*`, 164 frames each) in `public/static/frames/home/` |
| 2.2 | Storyblok CDN | `src/data/*.ts` | ✅ | Removed — all media local under `public/` via `src/lib/assets/localPaths.ts` |
| 2.3 | Unsplash CDN | `solutionImages.ts` | ✅ | Replaced with Kling-generated local carousel images (`/images/solutions/{slug}/feat-*.webp`) |
| 2.4 | `next.config.ts` rewrite | `/static/frames/:path*` → terminal-industries.com | ✅ | Rewrite removed — only cache headers remain for `/static/frames/:path*` |
| 2.5 | `images.remotePatterns` | Storyblok + Unsplash | ✅ | Trimmed to `*.supabase.co` only (optional CDN) |

---

## 3. Homepage (`src/data/homepage.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 3.1 | Hero frame sequence | Local webp frames | ✅ | `public/static/frames/home/{desktop,mobile}/webp/` |
| 3.2 | FeaturesSteps videos (×6) | Local MP4 loops | ✅ | `public/static/videos/features/step-01..06.mp4` |
| 3.3 | Fullscreen feature images (×3) | Local webp | ✅ | `public/images/home/fullscreen-0{1,2,3}.webp` |
| 3.4 | Quote testimonial portrait | Local placeholder | ✅ | `/images/team/testimonial/quote-portrait.webp` |
| 3.5 | Logo wall (×20) | Local placeholders | ✅ | `/logos/placeholder/` — 🔜 real client logos |
| 3.6 | Logo grid / industry (×5) | Local placeholders | ✅ | `/logos/placeholder/` — 🔜 real client logos |
| 3.7 | Form logo stripe | Local SVG | ✅ | `/logos/placeholder/logo-stripe.svg` |

---

## 4. About page (`src/data/about.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 4.1 | Leadership portraits (×8) | Local placeholders | ✅ | `/images/team/executive/*.webp` — 🔜 real headshots |
| 4.2 | Brand partner images (×2) | Local placeholders | ✅ | `/images/team/partners/daikin-partner.webp` + `ogeneral-partner.webp` |
| 4.3 | Certification logo grid (×5) | Neutral placeholders | ✅ | `/logos/placeholder/` — 🔜 official brand logos |
| 4.4 | Advisor portraits (×4) | Local placeholders | ✅ | `/images/team/advisors/*.webp` |
| 4.5 | Our Work project images (×3) | Local Kling CGI | ✅ | `/images/about/work-0{1,2,3}.webp` — 🔜 real project photos |

---

## 5. Contact page (`src/data/contact.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 5.1 | Promo banner image | Local webp | ✅ | `/images/contact/promo-overview.webp` |
| 5.2 | Datasheet PDF URL | Local placeholder PDF | ✅ | `/docs/sri-comforts-product-overview.pdf` — 🔜 real product PDF |
| 5.3 | Contact card icons (×3) | Local SVGs | ✅ | `/images/contact/icons/icon-{download,phone,amc}.svg` |

---

## 6. Solutions pages (`src/data/solutions.ts` + `solutionImages.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 6.1 | Dark section mesh images | Local Kling textures | ✅ | `/images/solutions/mesh-0{1..5}.webp` |
| 6.2 | Feature carousel photos (×30) | Local Kling CGI per slug | ✅ | `/images/solutions/{slug}/feat-0{1..5}.webp` — 🔜 real project photos |
| 6.3 | Case study client logo | Local placeholder SVG | ✅ | `/logos/placeholder/logo-*.svg` — 🔜 real client logo |
| 6.4 | Case study hero image | — | — | Template has no separate case-study hero image |

---

## 7. Services pages (`src/data/services.ts` + `serviceImages.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 7.1 | Dark intro background | Local webp | ✅ | `/images/services/dark-bridge.webp` |
| 7.2 | Process grid images (×7 paths) | Local Kling CGI | ✅ | `/images/services/features/feat-0{1..7}.webp` |
| 7.3 | Expandable carousel (×4 paths) | Local Kling CGI | ✅ | `/images/services/carousel/carousel-0{1..4}.webp` |
| 7.4 | Value grid mesh textures (×3) | Local webp | ✅ | `/images/services/mesh-0{1..3}.webp` |

---

## 8. Copy & naming cleanup

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 8.1 | “Terminal” in filenames | Logo components + SVG | ✅ | Deleted unused logo components + SVG |
| 8.2 | Terminal phrasing in copy | `src/` | ✅ | No Terminal/Yard OS copy in runtime source |
| 8.3 | `yosSection` naming | `homepage.ts` | ✅ | Renamed to `brandDifferenceSection` (alias kept for unused `YOSSection`) |
| 8.4 | Package name | `package.json` | ✅ | `sricomforts-nextjs` |
| 8.5 | Repo folder name | Workspace | ✅ | `sricomforts-nextjs` |

---

## 9. Reference clone folder (keep for dev, exclude from deploy)

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 9.1 | Full HTML mirror | `terminal-industries-clone/` | ✅ | In `.gitignore` and `.vercelignore` — excluded from deploy |
| 9.2 | Clone in repo | 200+ Terminal HTML pages | ✅ | Not shipped — excluded from git/deploy |

---

## 10. Phase 1 status — COMPLETE ✅

All Phase 1 items above are done. `npm run build` passes with zero Storyblok/Unsplash runtime dependencies.

### Deploy checklist

1. **Commit** — stage `public/`, `src/`, `scripts/`, `docs/`, `package.json`, `next.config.ts` (exclude `.cursor/`)
2. **Env** — set `NEXT_PUBLIC_HERO_FRAMES_VERSION=4` on Vercel if overriding default
3. **Deploy** — push to remote; Vercel build should succeed
4. **Smoke test** — `/`, `/about`, `/contact`, `/services/how-we-work`, `/solutions/commercial`

### Optional local cleanup before commit

```bash
# Old 60fps hero frames (~410 files, not referenced by code)
rm public/static/frames/home/desktop/webp/hero_anim_desktop_60_*.webp

# Leftover PNG sources if webp exists
rm -f public/images/home/fullscreen-0{1,2,3}.png public/images/contact/promo-overview.png
```

---

## 11. Phase 2 — Assets to collect from Sri Comforts client

Use this when ready to replace placeholders:

- [x] Full-resolution company logo (SVG + PNG)
- [x] Favicon
- [x] Team headshots (named roles matching `about.ts`) — placeholder portraits in `/images/team/`
- [ ] 10–20 client logos (with usage permission) — placeholder logos in use
- [ ] Partner badges: Daikin, O General, LG, Panasonic — partner section images done; certification grid still placeholders
- [ ] Project photography: commercial, healthcare, IT, residential, industrial
- [ ] Service/process photos or short MP4 clips
- [ ] Product overview PDF (replace placeholder in `/public/docs/`)
- [x] Hero video or image sequence for homepage — self-hosted frame sequence in `public/static/frames/home/`
- [x] Testimonial quote + photo (if using quote section) — placeholder portrait in use
- [x] FeaturesSteps looping videos (×6) — Kling-generated in `public/static/videos/features/`
- [x] Solution carousel images (×30) — Kling-generated per sector

---

## Asset map (quick reference)

| Area | Path constant / helper | On disk |
|------|------------------------|---------|
| Hero frames | `getHeroFrameUrls()` | `public/static/frames/home/` |
| Feature videos | `FEATURES_STEP_VIDEOS` | `public/static/videos/features/` |
| Solution carousels | `solutionFeatureImagePath()` | `public/images/solutions/{slug}/` |
| Solution meshes | `solutionMeshImage()` | `public/images/solutions/mesh-*.webp` |
| Service features | `serviceFeatureImagePath()` | `public/images/services/features/` |
| Service carousel | `serviceCarouselImagePath()` | `public/images/services/carousel/` |
| About work | `aboutWorkImage()` | `public/images/about/work-*.webp` |
| Contact promo | `CONTACT_PROMO_OVERVIEW` | `public/images/contact/promo-overview.webp` |

Central registry: `src/lib/assets/localPaths.ts`
