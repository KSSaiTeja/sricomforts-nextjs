# Terminal Industries → Sri Comforts Replacement Checklist

> **Purpose:** Every remaining placeholder, dependency, or reference tied to Terminal Industries (or its vendors). Work through this page-by-page.  
> **Last updated:** July 5, 2026  
> **Branding quick wins:** ✅ Done (header/footer logo, footer credit)

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔲 | Not started |
| ⚠️ | Legal / launch blocker — address before go-live |

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
| 2.1o canvas frames (~819) | `homepage.ts` → `getHeroFrameUrls()` | ⚠️ 🔲 | Proxied via `next.config.ts` from `terminal-industries.com/static/frames/` — **must replace or host locally before launch** | | Her
| 2.2 | Storyblok CDN | All `src/data/*.ts` with `STORYBLOK` constant | ⚠️ 🔲 | ~60+ URLs on `a.storyblok.com/f/337048/...` — replace with local `/public/images/` or Sri Comforts-hosted assets |
| 2.3 | Unsplash CDN | `solutionImages.ts` | 🔲 | 30 stock photos — replace with client photography or licensed HVAC images |
| 2.4 | `next.config.ts` rewrite | `/static/frames/:path*` → terminal-industries.com | ⚠️ 🔲 | Remove rewrite once hero frames are self-hosted |
| 2.5 | `images.remotePatterns` | Storyblok + Unsplash | 🔲 | Trim after assets are local |

---

## 3. Homepage (`src/data/homepage.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 3.1 | Hero frame sequence | Terminal CDN (see 2.1) | 🔲 | HVAC-themed frame sequence or hero video |
| 3.2 | FeaturesSteps videos (×6) | Storyblok MP4s (yard/logistics) | 🔲 | Sri Comforts install/service footage |
| 3.3 | Fullscreen feature images (×3) | Storyblok (includes `terminal-industries-com_-1.webp`) | 🔲 | Project / facility photography |
| 3.4 | Quote testimonial portrait | Storyblok stock person | 🔲 | Real client photo (with permission) or remove |
| 3.5 | Logo wall (×20) | Terminal client logos (DSV, Ryder, HP, Foxconn, etc.) | 🔲 | Sri Comforts client logos (Omega Hospitals, IT parks, etc.) |
| 3.6 | Logo grid / industry (×5) | Wrong logos (8VC, Ryder, Lineage…) | 🔲 | Partner or certification logos |
| 3.7 | Form logo stripe | Storyblok `logo-stripe.png` | 🔲 | Sri Comforts client/partner strip PNG |

---

## 4. About page (`src/data/about.ts`)

| # | Item | Current source | Status | Replace with |
|---|------|----------------|--------|--------------|
| 4.1 | Leadership portraits (×8) | Terminal team photos, Sri Comforts names | 🔲 | Real Sri Comforts team photos from [sricomforts.com/our-team](https://sricomforts.com/our-team) or client |
| 4.2 | Brand partner images (×2) | Stock B&W portraits | 🔲 | Daikin / O General official partner badges |
| 4.3 | Certification logo grid (×5) | Wrong SVGs labeled Daikin/LG/etc. | 🔲 | Official brand logos: Daikin, O General, LG, Panasonic, Sri Comforts |
| 4.4 | Advisor portraits (×4) | Terminal stock photos | 🔲 | Real advisors or remove section |
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
| 9.1 | Full HTML mirror | `terminal-industries-clone/` | 🔲 | Add to `.gitignore` for production deploy OR keep private; **never deploy this folder** |
| 9.2 | Clone in repo | 200+ Terminal HTML pages | ⚠️ | Do not ship to client production server |

---

## 10. Suggested work order (for future chats)

1. **Homepage** — hero frames, logo wall, logo grid, feature videos, benefit images, quote photo, form stripe  
2. **About** — team photos, partner logos, project gallery  
3. **Contact** — banner + PDF  
4. **Solutions + Services** — sector/service photography  
5. **Infrastructure** — remove Terminal CDN rewrite, local-host all assets, update `remotePatterns`  
6. **Cleanup** — delete dead Terminal components, favicon, copy review  

---

## 11. Assets to collect from Sri Comforts client

Use this as a client request list:

- [ ] Full-resolution company logo (SVG + PNG)
- [ ] Favicon
- [ ] Team headshots (named roles matching `about.ts`)
- [ ] 10–20 client logos (with usage permission)
- [ ] Partner badges: Daikin, O General, LG, Panasonic
- [ ] Project photography: commercial, healthcare, IT, residential, industrial
- [ ] Service/process photos or short MP4 clips
- [ ] Product overview PDF
- [ ] Hero video or image sequence for homepage (optional)
- [ ] Testimonial quote + photo (if using quote section)

---

## Hand-off for next chat

```
## Context for new chat
- Project: sricomforts-nextjs (Sri Comforts rebrand)
- Done: Branding quick wins — FullLogo in header/footer, footer credit "by kssaiteja"
- Checklist: docs/terminal-industries-replacement-checklist.md
- Next: Homepage asset pass (hero frames, logo wall, grid, videos, images, quote, form stripe)
- Watch out: Hero frames still proxied from terminal-industries.com; Storyblok URLs site-wide
```
