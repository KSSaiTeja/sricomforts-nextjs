# Terminal Industries → Sri Comforts Replacement Checklist

> **Purpose:** Track removal of Terminal Industries template dependencies.  
> **Scope (current):** **Phase 1 only** — strip Terminal/template/vendor ties; neutral placeholders are fine.  
> **Deferred:** **Phase 2** — swap placeholders for real Sri Comforts client assets (logos, photos, PDFs, etc.).  
> **Last updated:** July 6, 2026

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Phase 1 done — no Terminal/template dependency (placeholders OK) |
| 🔲 | Phase 1 not started — still tied to Terminal, Storyblok, or Unsplash |
| 🔜 | Phase 2 — replace placeholder with real client asset (later) |
| ⚠️ | Launch blocker — external vendor CDN still required at runtime |

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

## 2. External CDN dependencies ⚠️

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 2.1 | Hero canvas frames (~819) | `homepage.ts` → `getHeroFrameUrls()` | ✅ | Self-hosted in `public/static/frames/home/` (local `/static/frames/...` URLs; optional Supabase CDN via `assetUrl()`) |
| 2.2 | Storyblok CDN | All `src/data/*.ts` with `STORYBLOK` constant | ⚠️ 🔲 | ~60+ URLs on `a.storyblok.com/f/337048/...` — replace with local `/public/images/` or Sri Comforts-hosted assets |
| 2.3 | Unsplash CDN | `solutionImages.ts` | 🔲 | 30 stock photos — replace with client photography or licensed HVAC images |
| 2.4 | `next.config.ts` rewrite | `/static/frames/:path*` → terminal-industries.com | ✅ | Rewrite removed — only cache headers remain for `/static/frames/:path*` |
| 2.5 | `images.remotePatterns` | Storyblok + Unsplash | 🔲 | Trim after assets are local |

---

## 3. Homepage (`src/data/homepage.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 3.1 | Hero frame sequence | Terminal CDN (see 2.1) | ✅ | Self-hosted in `public/static/frames/home/` |
| 3.2 | FeaturesSteps videos (×6) | Storyblok MP4s (yard/logistics) | 🔲 | Sri Comforts install/service footage |
| 3.3 | Fullscreen feature images (×3) | Storyblok (includes `terminal-industries-com_-1.webp`) | 🔲 | Project / facility photography |
| 3.4 | Quote testimonial portrait | Storyblok stock person | ✅ | Local `/images/team/testimonial/quote-portrait.webp` (placeholder portrait) |
| 3.5 | Logo wall (×20) | Terminal client logos (DSV, Ryder, HP, Foxconn, etc.) | ✅ | Local placeholder logos in `/logos/placeholder/` (swap for real client logos when ready) |
| 3.6 | Logo grid / industry (×5) | Wrong logos (8VC, Ryder, Lineage…) | ✅ | Local placeholder logos in `/logos/placeholder/` |
| 3.7 | Form logo stripe | Storyblok `logo-stripe.png` | ✅ | Local `/logos/placeholder/logo-stripe.svg` |

---

## 4. About page (`src/data/about.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 4.1 | Leadership portraits (×8) | Terminal team photos, Sri Comforts names | ✅ | Local `/images/team/executive/*.webp` (placeholder portraits; swap for client photos when ready) |
| 4.2 | Brand partner images (×2) | Stock B&W portraits | ✅ | Local `/images/team/partners/daikin-partner.webp` + `ogeneral-partner.webp` |
| 4.3 | Certification logo grid (×5) | Wrong SVGs labeled Daikin/LG/etc. | ✅ | Neutral placeholders in `/logos/placeholder/` — 🔜 official brand logos in Phase 2 |
| 4.4 | Advisor portraits (×4) | Terminal stock photos | ✅ | Local `/images/team/advisors/*.webp` (placeholder portraits) |
| 4.5 | Our Work project images (×3) | Yard/truck/logistics photos | 🔲 | HVAC installation project photos |

---

## 5. Contact page (`src/data/contact.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 5.1 | Promo banner image | Storyblok “Yard OS / phy-ai” graphic | 🔲 | Sri Comforts overview visual |
| 5.2 | Datasheet PDF URL | Storyblok placeholder (fake PDF filter) | 🔲 | Real Sri Comforts product overview PDF in `/public/docs/` |
| 5.3 | Contact card icons (×3) | Storyblok SVGs | 🔲 | Optional — generic icons are fine if styled |

---

## 6. Solutions pages (`src/data/solutions.ts` + `solutionImages.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 6.1 | Dark section mesh images | Storyblok abstract/yard art | 🔲 | HVAC-relevant imagery per sector |
| 6.2 | Feature carousel photos | Unsplash stock (×30 across 6 slugs) | 🔲 | Sector-specific Sri Comforts project photos |
| 6.3 | Case study client logo | `placeholderLogo` Storyblok asset | 🔲 | Real client logo (with permission) |
| 6.4 | Case study hero image | Storyblok | 🔲 | Project photo for cited case study |

---

## 7. Services pages (`src/data/services.ts` + `serviceImages.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 7.1 | Dark intro background | Storyblok `digital-bridge.webp` | 🔲 | Sri Comforts service/team photo |
| 7.2 | Process grid images (×7 paths) | Storyblok yard/logistics photos | 🔲 | Install, design, AMC, service photos |
| 7.3 | Expandable carousel (×4 paths) | Storyblok yard/gate/dock imagery | 🔲 | Service workflow photos |

---

## 8. Copy & naming cleanup

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 8.1 | “Terminal” in filenames | `TerminalLogo.tsx`, `TerminalFooterLogo.tsx`, `terminal-full-logo.svg` | ✅ | Deleted unused logo components + SVG |
| 8.2 | Terminal phrasing in copy | Footer, form bullets, case studies | 🔲 | Full copy review pass |
| 8.3 | `yosSection` naming | `homepage.ts` | 🔲 | Rename to Sri Comforts terminology (YOS = Yard Operating System from template) |
| 8.4 | Package name | `package.json` → `terminal-industries-next` | 🔲 | Rename to `sricomforts-nextjs` or similar |
| 8.5 | Repo folder name | `terminal-industries-next` in docs | 🔲 | Align with `sricomforts-nextjs` |

---

## 9. Reference clone folder (keep for dev, exclude from deploy)

| # | Item | Location | Status | Action |
|---|------|----------|--------|--------|
| 9.1 | Full HTML mirror | `terminal-industries-clone/` | ✅ | In `.gitignore` and `.vercelignore` — excluded from deploy |
| 9.2 | Clone in repo | 200+ Terminal HTML pages | ⚠️ | Do not ship to client production server |

---

## 10. Suggested work order

### Phase 1 — Terminal/template removal (current goal)

1. **Storyblok sweep** — homepage videos + feature images, contact banner/PDF/icons, about work gallery, solutions, services  
2. **Unsplash sweep** — `solutionImages.ts` carousel photos → local neutral placeholders  
3. **Naming cleanup** — `yosSection` rename, package name, copy pass for Yard OS / Terminal phrasing  
4. **Infrastructure** — trim `remotePatterns` once Storyblok/Unsplash are gone  

### Phase 2 — Real Sri Comforts assets (later)

1. Client logos, partner badges, project photography  
2. Service/process footage, product PDF, real testimonial photo  

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
- [ ] Product overview PDF
- [x] Hero video or image sequence for homepage (optional) — self-hosted frame sequence in `public/static/frames/home/`
- [x] Testimonial quote + photo (if using quote section) — placeholder portrait in use

---

## Hand-off for next chat

```
## Context for new chat
- Project: sricomforts-nextjs (Sri Comforts rebrand)
- Goal: Phase 1 only — remove Terminal/template/vendor deps; placeholders OK
- Done: Branding, hero frames, homepage logos/stripe/quote, about team/partner/advisor/cert grid
- Checklist: docs/terminal-industries-replacement-checklist.md
- Next (Phase 1): Storyblok + Unsplash → local placeholders; yosSection/package rename; copy cleanup
- Later (Phase 2): Real client logos, photos, PDFs
```
