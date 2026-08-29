# Sri Comforts — Hero Hybrid Video (Higgsfield)

> **Superseded by FINAL spec:** [`docs/hero-the-line-final.md`](hero-the-line-final.md) — *The Line* (cinematic copper continuity). Archive below.

Continuous white/blue *Cool Air Architecture* sequence for the homepage scroll hero.  
Replaces the fragmented golden-hour / neon / battery-farm / HUD concept.

Code targets: `src/data/homepage.ts` · `scripts/extract-hero-frames.mjs` · `src/components/home/VideoCarousel.tsx`

---

## Locked direction

| Setting | Value |
|---------|--------|
| **Concept** | Cool Air Architecture — one South-Indian commercial campus |
| **Palette** | White architecture + Sri Comforts blue `#007BC0` `#8DD4F7` `#33B5E8` |
| **Base** | Hybrid: cool daylight (beats 1–2) → soft blue dusk (beats 3–4) |
| **Forbidden** | Golden-hour amber, battery farms, neon circuit boards, black HUD grids, people, logos, readable text |
| **Text overlay** | White / cyan hero copy + soft bottom dark gradient (site CSS) |

### Copy sync (`heroTitles`)

| Beat | Scroll | On-screen text | Visual |
|------|--------|----------------|--------|
| 1 | 0–25% | We perfected cooling solutions for every space | Wide cool-daylight campus. Pure photoreal. Quiet lower third. |
| 2 | 25–50% | from design through install and service. | Same buildings; translucent blue ducts / AHUs / VRV routes draw floor-by-floor. |
| 3 | 50–75% | Your authorized Daikin partner in South India. | Rooftop white condensers + soft blue airflow; cool city haze. Daylight → soft dusk. |
| 4 | 75–100% | Trusted for 25+ years, year after year. | Pull back to same campus at rest; blue paths settle. Soft dusk. Same world. |

### Master length

| Target | Value |
|--------|--------|
| Duration | **~6.83 s** (trim to match) |
| Aspect | **16:9** desktop · **9:16** mobile |
| Extract | `scripts/extract-hero-frames.mjs` → `public/static/frames/home/{desktop,mobile}/webp/` |

---

## Global style lock (prepend to every prompt)

```
Photoreal premium B2B architectural CGI, Sri Comforts brand look. Clean white and light-grey modern buildings under a cool blue-white sky. Accent color ONLY Sri Comforts blue #007BC0 #8DD4F7 #33B5E8 for translucent HVAC motion-graphic overlays (ducts, AHUs, VRV routes, soft airflow wisps). Absolutely no people, no faces, no silhouettes, no logos, no brand names, no readable text, no HUD panels, no labels, no numbers. No golden-hour amber, no orange sunset, no neon circuit-board patterns, no battery farms, no black abstract grids. Slow cinematic camera only. Vast quiet negative space in the lower third for website text overlay. One continuous South Indian commercial campus world.
```

### Global negatives

```
no people, no humans, no faces, no hands, no logos, no text, no watermarks, no HUD, no UI chrome, no golden hour, no orange sky, no warm sunset, no neon green, no lime green, no cyberpunk circuits, no battery storage farm, no data center racks, no black void HUD, no shake, no whip pan
```

---

## Style stills (approve before video)

**Model:** `soul_location` (environments, no people)  
**Aspect:** `16:9`  
**Cost:** ~0.12 credits each

### Beat 1 — Every space (cool daylight)

```
Wide elevated aerial of a modern South Indian commercial campus in cool bright daylight: glass IT park tower, clean white hospital wing, and mid-rise residential block in one continuous skyline. White and light-grey facades, soft pale blue sky with gentle haze, lush green courtyards between buildings. Tiny white VRV outdoor units visible on rooftops as quiet environmental detail only. Pure photoreal architecture — no scanlines, no wireframe, no blue overlays yet. Lower third mostly open sky-shadow and soft pavement for text. Mood: cooling perfected for every kind of space.
```

### Beat 2 — Design → install → service

```
Same South Indian commercial campus in cool daylight, elevated three-quarter view on the glass office and white hospital wing. Translucent Sri Comforts blue #007BC0 #8DD4F8 HVAC paths are drawing through the buildings: ceiling duct trunks, rectangular AHUs, copper refrigerant lines, VRV routes floor by floor — elegant motion-graphic overlays on photoreal architecture, not a screen UI. Sky and ground stay normal photoreal. No people, no logos, no text. Mood: design through install and service made visible inside the architecture.
```

### Beat 3 — Authorized partner, South India

```
Premium commercial rooftop mechanical yard on the same campus, transitioning from cool late daylight into soft blue dusk. Neat parallel rows of white VRV outdoor condensers, clean copper lines, precise pipe supports. Soft luminous blue airflow wisps drift above the units. Background: wide South Indian city glow in cool blue haze, glass towers, warm window lights beginning — no readable signage. Photoreal with restrained blue motion-graphic accents only. Mood: authorized precision cooling at regional scale.
```

### Beat 4 — 25+ years trust

```
Wide pull-back of the same South Indian commercial campus at soft blue dusk / cool twilight. White buildings calm and settled; translucent blue HVAC path overlays have softened into a quiet glow rather than active drawing. Soft blue sky gradient, no amber. Same continuous world as earlier beats — not an abstract cutaway, not a HUD, not a black void. Lower third quiet for text. Mood: decades of quiet reliability, trusted year after year.
```

### CLI — stills

```bash
mkdir -p assets/hero/stills

higgsfield generate create soul_location \
  --prompt "$(cat <<'EOF'
[PASTE GLOBAL STYLE LOCK]

[PASTE BEAT N PROMPT]
EOF
)" \
  --aspect_ratio 16:9 \
  --wait --wait-timeout 10m
```

Download each result URL into `assets/hero/stills/beat-1.jpg` … `beat-4.jpg`.

---

## Master video (after still approval)

**Preferred (credit-efficient):** `kling3_0` · 7s · 16:9 · `sound off` · `mode std` · `--start-image` beat-1 still  
**Quality upgrade if credits allow:** `seedance_2_0` · 8s · 1080p · `generate_audio false` · start + end images

### Continuous master prompt (single clip)

```
Continuous cinematic camera move through one South Indian commercial campus, white and blue brand look, ~7 seconds, 16:9. Begin wide cool daylight aerial of glass IT, white hospital, and residential blocks — pure photoreal, no overlays. Slowly push and orbit as translucent Sri Comforts blue #007BC0 HVAC ducts, AHUs, and VRV routes draw themselves through the buildings floor by floor. Continue to a rooftop of neat white condensers with soft blue airflow wisps while daylight gently deepens into soft blue dusk and cool city haze. End pulling back to the same campus at rest, blue paths settling into a calm glow — same world throughout. Slow premium B2B motion only. No people, logos, text, golden hour, neon circuits, battery farms, or HUD grids. Keep lower third relatively quiet for website copy.
```

### CLI — desktop master

```bash
higgsfield generate create kling3_0 \
  --prompt "$(cat <<'EOF'
[PASTE GLOBAL STYLE LOCK]

[PASTE CONTINUOUS MASTER PROMPT]
EOF
)" \
  --aspect_ratio 16:9 \
  --duration 7 \
  --sound off \
  --mode std \
  --start-image assets/hero/stills/beat-1.jpg \
  --end-image assets/hero/stills/beat-4.jpg \
  --wait --wait-timeout 20m
```

Save to `assets/hero/masters/hero_desktop_master.mp4`.

### Mobile (9:16)

Same prompt with `--aspect_ratio 9:16`, subject centered, bottom safe area for text. Or reframe desktop in post if credits are tight:

```bash
higgsfield generate create kling3_0 \
  --prompt "..." \
  --aspect_ratio 9:16 \
  --duration 7 \
  --sound off \
  --mode std \
  --start-image assets/hero/stills/beat-1-mobile.jpg \
  --wait --wait-timeout 20m
```

---

## Extract + wire checklist

```bash
# Match export fps (ffprobe the master). Example for 24fps Kling:
HERO_FPS=24 HERO_DURATION=6.833333 \
  node scripts/extract-hero-frames.mjs assets/hero/masters/hero_desktop_master.mp4 desktop

HERO_FPS=24 HERO_DURATION=6.833333 \
  node scripts/extract-hero-frames.mjs assets/hero/masters/hero_mobile_master.mp4 mobile

ls public/static/frames/home/desktop/webp/hero_anim_desktop_24_*.webp | wc -l
ls public/static/frames/home/mobile/webp/hero_anim_mobile_24_*.webp | wc -l
```

Update `src/data/homepage.ts`:

- `HERO_FPS`
- `HERO_DESKTOP_FRAMES` / `HERO_MOBILE_FRAMES`
- bump `NEXT_PUBLIC_HERO_FRAMES_VERSION`

Site CSS: soft bottom dark gradient under hero copy so early daylight frames stay readable with white text.

---

## Credit budget (approx, Pro workspace)

| Step | Model | ~Credits |
|------|-------|----------|
| 4 style stills | `soul_location` | ~0.5 |
| Desktop master 7s | `kling3_0` std sound off | ~10.5 |
| Mobile master 7s | `kling3_0` | ~10.5 |
| Retry headroom | — | leave ~20+ |

Avoid `seedance_2_0` (~45–72) unless stills + Kling look insufficient.
