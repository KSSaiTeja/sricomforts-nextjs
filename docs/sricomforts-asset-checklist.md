# Sri Comforts — Asset & Launch Checklist

> **Purpose:** Track site assets, placeholders, and pre-launch items for the Sri Comforts marketing site.  
> **Scope:** Phase 1 (self-hosted site, neutral placeholders OK) is complete. Phase 2 swaps placeholders for real client assets.  
> **Last updated:** July 6, 2026

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done — production-ready or acceptable placeholder |
| 🔜 | Phase 2 — replace with real client asset |
| — | Not applicable |

---

## 1. Branding & identity

| # | Item | Location | Status | Notes |
|---|------|----------|--------|-------|
| 1.1 | Header logo | `SiteHeader` → `FullLogo` | ✅ | `/logo/full-logo.svg` |
| 1.2 | Footer logo | `SiteFooter` → `FullLogo` | ✅ | `/logo/full-logo.svg` |
| 1.3 | Footer credit | `footerSection.creditsByline` | ✅ | `by kssaiteja` |
| 1.4 | Preloader logo | `AnimatedLogo` → `LogoIcon` | ✅ | Sri Comforts icon |
| 1.5 | Favicon | `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` | ✅ | From `public/logo/logo-icon.svg` |

---

## 2. Media & CDN

| # | Item | Location | Status | Notes |
|---|------|----------|--------|-------|
| 2.1 | Hero canvas frames | `getHeroFrameUrls()` in `homepage.ts` | ✅ | `public/static/frames/home/{desktop,mobile}/webp/` |
| 2.2 | Feature step videos (×6) | `FEATURES_STEP_VIDEOS` | ✅ | `public/static/videos/features/step-01..06.mp4` |
| 2.3 | All page images | `src/lib/assets/localPaths.ts` | ✅ | Self-hosted under `public/` |
| 2.4 | Optional Supabase CDN | `src/lib/supabase/assets.ts` | ✅ | Disabled unless `NEXT_PUBLIC_SUPABASE_ASSETS=true` |
| 2.5 | `next.config.ts` | Remote images | ✅ | `*.supabase.co` only; no third-party CDNs |

---

## 3. Homepage

| # | Item | Source | Status | Phase 2 |
|---|------|--------|--------|---------|
| 3.1 | Hero frame sequence | Local webp | ✅ | Optional HVAC re-render |
| 3.2 | FeaturesSteps videos | Local MP4 | ✅ | — |
| 3.3 | Fullscreen feature images | Local webp | ✅ | Real project photos |
| 3.4 | Quote portrait | Local placeholder | ✅ | Real client photo |
| 3.5 | Logo wall (×20) | Logoipsum placeholders | ✅ | Real client logos |
| 3.6 | Logo grid (×5) | Logoipsum placeholders | ✅ | Real client logos |
| 3.7 | Form logo stripe | Local SVG | ✅ | Branded stripe |

---

## 4. About page

| # | Item | Source | Status | Phase 2 |
|---|------|--------|--------|---------|
| 4.1 | Leadership portraits (×8) | Local placeholders | ✅ | Real headshots |
| 4.2 | Partner images (×2) | Local webp | ✅ | Official brand assets |
| 4.3 | Certification logos (×5) | Placeholder SVGs | ✅ | Daikin / O General / LG / Panasonic badges |
| 4.4 | Advisor portraits (×4) | Local placeholders | ✅ | Real photos |
| 4.5 | Our Work images (×3) | Kling CGI | ✅ | Real project photography |

---

## 5. Contact page

| # | Item | Source | Status | Phase 2 |
|---|------|--------|--------|---------|
| 5.1 | Promo banner | Local webp | ✅ | — |
| 5.2 | Product overview PDF | Local placeholder | ✅ | Real product PDF |
| 5.3 | Contact icons (×3) | Local SVGs | ✅ | — |

---

## 6. Solutions & services

| # | Item | Source | Status | Phase 2 |
|---|------|--------|--------|---------|
| 6.1 | Solution meshes & carousels | Kling CGI per slug | ✅ | Sector project photos |
| 6.2 | Service features & carousel | Kling CGI | ✅ | Process / site photos |
| 6.3 | Case study client logos | Placeholder SVGs | ✅ | Real client logos |

---

## 7. Package & repo

| # | Item | Status |
|---|------|--------|
| 7.1 | Package name `sricomforts-nextjs` | ✅ |
| 7.2 | All runtime copy Sri Comforts / HVAC | ✅ |
| 7.3 | `website-refs/` gitignored + vercelignored | ✅ |
| 7.4 | `npm run build` passes | ✅ |

---

## Deploy checklist

1. Set `NEXT_PUBLIC_HERO_FRAMES_VERSION` on Vercel if overriding default
2. Push to remote; confirm Vercel build succeeds
3. Smoke test: `/`, `/about`, `/contact`, `/services/how-we-work`, `/solutions/commercial`

---

## Phase 2 — collect from client

- [ ] 10–20 client logos (with usage permission)
- [ ] Official partner badges (Daikin, O General, LG, Panasonic)
- [ ] Project photography by sector
- [ ] Real team headshots
- [ ] Product overview PDF
- [ ] Testimonial quote + photo (if keeping quote section)

---

## Asset map

| Area | Helper | On disk |
|------|--------|---------|
| Hero frames | `getHeroFrameUrls()` | `public/static/frames/home/` |
| Feature videos | `FEATURES_STEP_VIDEOS` | `public/static/videos/features/` |
| Solution carousels | `solutionFeatureImagePath()` | `public/images/solutions/{slug}/` |
| Service features | `serviceFeatureImagePath()` | `public/images/services/features/` |
| About work | `aboutWorkImage()` | `public/images/about/work-*.webp` |
| Contact promo | `CONTACT_PROMO_OVERVIEW` | `public/images/contact/promo-overview.webp` |

Central registry: `src/lib/assets/localPaths.ts`
