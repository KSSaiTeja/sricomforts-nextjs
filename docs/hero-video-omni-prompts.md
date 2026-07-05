# Sri Comforts — Hero Scroll Video (Omni Prompts)

Reference for generating the homepage hero background sequence that syncs with scroll-driven copy in `src/data/homepage.ts`.

---

## Final video length

| Target | Value |
|--------|--------|
| **Master video duration** | **~6.83 seconds** (6 seconds 50 frames) |
| **Frame rate** | **60 fps** |
| **Desktop frame count** | **410 frames** (`hero_anim_desktop_60_0.webp` … `_409.webp`) |
| **Mobile frame count** | **409 frames** (`hero_anim_mobile_60_0.webp` … `_408.webp`) |
| **Resolution (desktop)** | **1920 × 1080** (16:9) |
| **Resolution (mobile)** | **1080 × 1920** (9:16) — same story, vertically reframed |

### Why ~6.83s?

The hero canvas maps scroll progress `0 → 1` across all frames:

```ts
frameIndex = floor(progress × (frameCount - 1))
```

At 60 fps: **410 frames ÷ 60 = 6.833s**. Match this exactly so the last frame lands when scroll finishes.

### Clip breakdown (8 Omni clips)

| Clips | Duration each | Total |
|-------|---------------|-------|
| 8 clips | ~**0.85 s** (~51 frames) | ~6.8 s |
| 4 merged clips (if Omni limit) | ~**1.71 s** (~102 frames) | ~6.8 s |

Each hero text line gets **~25% scroll** ≈ **~1.71 s** ≈ **~102 frames** at 60 fps.

---

## Hero copy (must stay in sync)

From `src/data/homepage.ts` → `heroTitles`:

| Beat | Scroll | On-screen text |
|------|--------|----------------|
| 1 | 0–25% | We perfected cooling solutions for every space |
| 2 | 25–50% | from design through install and service. |
| 3 | 50–75% | Your authorized Daikin partner in South India. |
| 4 | 75–100% | Trusted for 25+ years, year after year. |

---

## Visual rules (all clips)

- Photoreal **3D CGI** — premium B2B website hero quality
- **Slow camera** only — no whip pans, no shake
- **No people**, no faces, no silhouettes of humans
- **No logos**, no brand names, no readable text anywhere
- **No HUD panels**, no labels, no numbers on screen
- Negative space in **lower third** for website text overlay
- **Clips 1–2:** overview only — **no scan UI**
- **Clips 3–4:** x-ray scanlines + wireframe **on buildings only** (not sky/ground)
- **Clips 5–8:** no scanlines — wireframe / abstract only

### Color palette

- Golden hour: pale lavender sky → warm amber-orange horizon
- Dusk → deep navy night
- Digital accent: Sri Comforts blue `#007BC0`, `#8DD4F7`, `#33B5E8`
- **Not** Terminal lime green

---

## Sync map

| Scroll | Text | Background story | Clips |
|--------|------|------------------|-------|
| 0–25% | Every space | Wide overview — multiple South Indian building types, golden hour, **zero scan UI** | 1 → 2 |
| 25–50% | Design → install → service | X-ray scanlines on **buildings only** — ducts, VRV, AHUs revealed inside | 3 → 4 |
| 50–75% | Daikin partner, South India | Premium rooftop HVAC precision + blue digital twin at regional scale | 5 → 6 |
| 75–100% | 25+ years trust | Abstract cool airflow → blueprint grid fade on black | 7 → 8 |

**Between clips:** use the **last frame** of the previous clip as Omni’s reference image.

---

## Omni prompts (paste-ready)

### CLIP 1 — Beat 1 opens · “Every space” begins

**Duration target:** ~0.85 s · **No scan UI**

```
Cinematic photoreal 3D CGI hero film, 1920x1080, 16:9, slow and premium like a luxury B2B website opener — absolutely no people, no logos, no readable text anywhere. Open on a pure black foreground and a soft sunset sky gradient from pale lavender at the top to warm amber-orange at the horizon. A dark silhouette of a modern South Indian commercial campus rises at the horizon: glass IT park tower, hospital block, and low industrial pharma wing suggested in one continuous skyline — not separate cuts, one unified panoramic world. Camera is perfectly still for a breath, then begins an imperceptibly slow lateral drift to the right. Mood: “cooling perfected for every kind of space.” Minimal, iconic, vast negative space in the lower third for website text overlay. No scanlines, no wireframe, no HUD, no x-ray effects — overview only.
```

---

### CLIP 2 — Beat 1 peaks · “Every space” variety

**Duration target:** ~0.85 s · **No scan UI**

```
Continue the same photoreal 3D CGI world, 1920x1080, golden-hour South Indian commercial skyline now fully lit — warm peach sky, long soft shadows, deep charcoal ground. Slow cinematic side-tracking shot drifting past multiple distinct building typologies in one fluid move: a gleaming glass IT park, a clean white hospital tower with vertical glass strips, a luxury residential high-rise with balcony clusters, and a flat-roofed industrial plant — each subtly different so the viewer feels “every space” without cutting. Rooftops hint at HVAC life — small white VRV outdoor unit clusters and vent grilles — but keep them environmental detail, not the focus. Camera stays wide and elegant, never rushing. No humans, no vehicles with readable markings, no brand logos, no on-screen text. Critically: no x-ray scan, no wireframe overlay, no scanning lines, no digital UI of any kind — this clip is pure architectural overview complementing the line about perfected cooling for every space.
```

---

### CLIP 3 — Beat 2 opens · “Design” — scan begins on buildings

**Duration target:** ~0.85 s · **Scanlines on buildings only**

```
Photoreal 3D CGI continuing the same South Indian commercial campus at dusk, 1920x1080, camera gently rising to a three-quarter elevated angle on a modern glass office building and adjacent hospital wing. Now introduce a subtle x-ray scanning effect applied ONLY to the building structures themselves — horizontal cyan-blue scanlines sweep slowly upward across the facades like a technical diagnostic pass, with a faint cool glow at the leading edge of each scan band. As scanlines cross the buildings, translucent white wireframe geometry appears inside the volumes: ceiling plenum ducts, rectangular AHUs, refrigerant lines, and VRV pipe routes traced through floors — like a living BIM model being read, not a screen interface. The sky, ground, and air between buildings stay completely normal photoreal with NO scan effect — scanlines and x-ray transparency exist only on building massing. No people, no logos, no text, no HUD panels, no labels, no numbers — just clean scanlines and internal HVAC wireframe revealed through the architecture. Mood: “from design” — engineering made visible inside the building.
```

---

### CLIP 4 — Beat 2 peaks · “Install and service” — scan deepens

**Duration target:** ~0.85 s · **Scanlines on buildings only**

```
Same photoreal 3D CGI dusk campus, 1920x1080, elevated isometric-leaning camera orbiting slowly around two connected commercial buildings. The x-ray scanning intensifies but remains strictly on building volumes only: bright horizontal scanlines in Sri Comforts cool blue (#007BC0 / #8DD4F7) sweep through facades and roofs, peeling away opaque walls to reveal a rich internal HVAC ecosystem — galvanized duct trunks, insulated copper refrigerant runs, multiple VRV outdoor units on the rooftop in neat rows, ceiling cassette diffusers on every floor, and a central plant room with large AHUs. Outside the buildings, the world stays untouched photoreal — no scanlines in the sky, no particles on the ground, no UI chrome. Transition moment: one rooftop shows newly mounted outdoor condenser units gleaming as if just installed, then scanlines pass again suggesting ongoing service calibration — still no humans, no tools held by people, no text. End on a half-scanned building where interior HVAC wireframe glows white-blue against warm exterior dusk. Mood: “through install and service” — the full lifecycle inside the architecture.
```

---

### CLIP 5 — Beat 3 opens · “Authorized partner” — precision at scale

**Duration target:** ~0.85 s · **No scanlines**

```
Photoreal 3D CGI transitioning from dusk to deep navy twilight, 1920x1080, no people and no logos. Camera descends toward a premium commercial rooftop mechanical yard — dozens of identical white VRV outdoor condenser units arranged in perfect parallel rows on a spotless flat roof, copper lines bundled cleanly, pipe supports precise, condenser fans catching the last cool blue rim light. Background: a wide South Indian city glow — Hyderabad-style modern skyline silhouettes with glass towers and warm window lights — suggesting regional scale without readable signage. Slow orbital camera move around the rooftop plant, reverent and precise like a flagship installation. No x-ray scanlines in this clip — instead a faint translucent blue wireframe ghost of duct paths rises just above the roof plane, showing engineered order. No text, no human figures, no brand badges. Mood: authorized expertise, industrial-grade reliability, South India commercial cooling at its most premium.
```

---

### CLIP 6 — Beat 3 peaks · “South India” — multi-building digital twin

**Duration target:** ~0.85 s · **No scanlines**

```
Deep navy night photoreal 3D CGI, 1920x1080, elevated wide camera. Three distinct South Indian building types float in one composed hero tableau against black-blue void with soft distant city bokeh: a glass IT park, a hospital tower, and a pharma manufacturing block — each rendered as a semi-transparent Sri Comforts blue wireframe digital twin (#007BC0, #8DD4F8) showing complete internal HVAC networks — duct shafts, VRV loops, AHU rooms, chilled lines — all glowing with calm precision. Tiny white data points drift slowly around the wireframes like airflow telemetry, not a UI dashboard — no text, no labels, no screen frames. Camera pushes in slowly on the ensemble, then eases into a graceful three-quarter orbit. Ground is dark reflective pavement with subtle puddle reflections of blue light. Absolutely no people, no logos, no readable writing. Mood: the region’s authorized cooling partner — engineering authority across every major building type.
```

---

### CLIP 7 — Beat 4 opens · “25+ years” — timeless calm begins

**Duration target:** ~0.85 s · **Abstract — no buildings**

```
Abstract photoreal 3D CGI on pure near-black, 1920x1080, the blue building wireframes from the previous scene dissolve into elegant concentric rectangular portals — thin luminous Sri Comforts blue lines receding into depth like a precision-engineered tunnel, soft out-of-focus white bokeh particles drifting slowly. Then smooth translucent streams of cool air — white and pale blue luminous wisps — flow inward from the frame edges toward center, gentle and unhurried like laminar airflow in a perfectly balanced system, not smoke and not chaotic. No buildings visible now, no people, no logos, no text, no scanlines, no HUD. Camera floats forward through the abstract space at a meditative pace. Mood: decades of quiet reliability — comfort that endures without shouting.
```

---

### CLIP 8 — Beat 4 ends · “Year after year” — blueprint fade

**Duration target:** ~0.85 s · **Abstract end frame**

```
Minimal abstract photoreal 3D CGI, 1920x1080, almost entirely black. The cool airflow wisps from the prior moment thin out and fade, leaving a subtle dark blueprint grid — thin dashed grey lines with small crosshair marks at intersections, brighter in the corners, fading toward a calm empty center — like an engineer’s foundation drawing breathing softly. A single faint horizontal scanline in pale blue passes once across the grid and disappears, echoing the earlier building scans but now abstract and timeless. No architecture, no people, no logos, no text, maximum negative space in the center-bottom for hero copy. Camera perfectly still. End frame nearly black with only the faintest grid — a quiet confident full stop. Mood: trusted since 2001, year after year — precision that outlasts trends.
```

---

## If Omni only allows 4 generations

Merge pairs and target **~1.71 s per prompt** (~102 frames each):

| Merged clip | Combines | Covers text beat |
|-------------|----------|------------------|
| **A** | Clip 1 + 2 | Every space |
| **B** | Clip 3 + 4 | Design → install → service |
| **C** | Clip 5 + 6 | Daikin partner · South India |
| **D** | Clip 7 + 8 | 25+ years · year after year |

Paste the two prompts for each pair into one generation, or generate separately and trim join in edit.

---

## Post-production pipeline

### 1. Stitch

Order: **1 → 2 → 3 → 4 → 5 → 6 → 7 → 8**

### 2. Export master

```bash
# Target: exactly 6.833s at 60fps → 410 frames (desktop)
ffmpeg -i hero_desktop_master.mp4 -t 6.833 -vf "fps=60" -an hero_desktop_60fps.mp4
```

### 3. Extract WebP frames

```bash
mkdir -p public/static/frames/home/desktop/webp

ffmpeg -i hero_desktop_60fps.mp4 \
  public/static/frames/home/desktop/webp/hero_anim_desktop_60_%d.webp
```

Renumber if needed so files run **`0` through `409`** (410 total).

### 4. Verify frame count

```bash
ls public/static/frames/home/desktop/webp/hero_anim_desktop_60_*.webp | wc -l
# Expected: 410
```

Update `HERO_DESKTOP_FRAMES` in `src/data/homepage.ts` if your export count differs.

### 5. Mobile

Repeat the same 8 prompts with **9:16 / 1080×1920** and subject centered with bottom safe area for text. Target **409 frames** at 60 fps (~6.82 s).

### 6. Deploy

- Self-host under `public/static/frames/`
- Remove Terminal rewrite in `next.config.ts` once local frames are in place

---

## File locations (after export)

```
public/static/frames/home/desktop/webp/hero_anim_desktop_60_{0-409}.webp
public/static/frames/home/mobile/webp/hero_anim_mobile_60_{0-408}.webp
```

Code references:

- `src/data/homepage.ts` → `getHeroFrameUrls()`, `HERO_DESKTOP_FRAMES`, `HERO_MOBILE_FRAMES`
- `src/components/home/VideoCarousel.tsx` → scroll-driven playback
- `src/hooks/useVideoSequence.ts` → canvas frame renderer

---

## Quick checklist

- [ ] Clip 1–2: no scan UI
- [ ] Clip 3–4: scanlines on buildings only
- [ ] Clip 5–8: no scanlines on buildings
- [ ] No people, logos, or text in any frame
- [ ] Master length ~**6.83 s** at **60 fps**
- [ ] Desktop **410** frames, mobile **409** frames
- [ ] Last frame of each clip → reference for next Omni generation
