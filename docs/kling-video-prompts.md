# Sri Comforts — Kling AI Video Prompts

> **Hero section superseded.** Use [`docs/hero-storyboard-v3-approval.md`](hero-storyboard-v3-approval.md) / v3 frames for the homepage scroll hero.  
> **FeaturesSteps:** technical CAD isometric (v2) locked to `assets/features/refs/style-hvac-ref.png` — see PART B. Reject cartoon/explainer style.

Prompts for **hero scroll frames** and **FeaturesSteps** (6 loops under the logo wall).  
Code targets: `src/data/homepage.ts`, `scripts/extract-hero-frames.mjs`.

---

## Kling output specs (what Ultra unlocks)

| Setting | Hero (scroll frames) | FeaturesSteps (6 loops) |
|---------|----------------------|-------------------------|
| **Model** | **Kling Video 3.0** (not 2.6) | **Kling Video 3.0** or **3.0 Omni** |
| **Why 3.0** | Up to **60 fps** (2.6 caps at **30 fps**) | Best slow cinematic camera + image-to-video |
| **Audio** | **No Native Audio** (muted on site; saves credits) | **No Native Audio** |
| **Resolution** | **1080p** (Pro) — not 4K (webp export size) | **1080p** |
| **Aspect** | **16:9** desktop · **9:16** mobile | **9:16** (tall notch panel) |
| **Duration** | **~7 s** multi-shot → trim to **6.833 s** | **7 s** per loop (trim to 6–8 s) |
| **FPS** | **60** if exposed in UI; else **30** + upsample in ffmpeg | **30 fps** is fine (`<video loop>`) |

### FPS → code mapping

The hero does **not** play video — it scrubs **webp frames**. Scroll maps:

```ts
frameIndex = floor(progress × (frameCount - 1))
```

| Kling export FPS | Master length | Desktop frames | Update in code |
|----------------|---------------|----------------|----------------|
| **60 fps** (Kling 3.0) | 6.833 s | **410** | `HERO_FPS = 60` (default) |
| **30 fps** (Kling 2.6 fallback) | 6.833 s | **205** | `HERO_FPS = 30`, re-extract |

After extraction, set `HERO_DESKTOP_FRAMES` / `HERO_MOBILE_FRAMES` in `src/data/homepage.ts` to match `ls … \| wc -l`, bump `NEXT_PUBLIC_HERO_FRAMES_VERSION`.

---

## Global visual rules (all generations)

- Photoreal **3D CGI** — premium B2B HVAC website
- **Slow camera** only — no whip pans, no shake
- **No people**, faces, hands, silhouettes
- **No logos**, brand names, readable text, license plates
- **No HUD**, dashboards, labels, numbers on screen
- Palette: golden-hour lavender→amber, dusk navy, Sri Comforts blue `#007BC0` `#8DD4F8` `#33B5E8`
- **Not** Terminal lime green

**Kling workflow tip:** Generate one **style frame** in Kling Image 3.0 (or upload a still), then use **image-to-video** for every clip. Use each clip’s **last frame** as the next clip’s first frame.

---

# PART A — Hero scroll sequence

## Strategy (use Kling 3.0 **Multi-shot**)

Generate **one 16:9 master** per variant (desktop + mobile) instead of 8 tiny clips:

| Shot | Duration | Covers hero copy beat | Merged story |
|------|----------|----------------------|--------------|
| 1 | **1.7 s** | 0–25% · “Every space” | Clips 1+2 — skyline overview, no scan UI |
| 2 | **1.7 s** | 25–50% · “Design → install → service” | Clips 3+4 — x-ray scan on buildings only |
| 3 | **1.7 s** | 50–75% · “Authorized partner · South India” | Clips 5+6 — rooftop plant + wireframe twins |
| 4 | **1.7 s** | 75–100% · “25+ years trust” | Clips 7+8 — abstract airflow → blueprint grid |

**Total: 6.8 s** → trim/export to **6.833 s** at target fps.

### Kling UI settings (desktop hero)

```
Model:        Kling Video 3.0
Mode:         Multi-shot ON
Total length: 7 seconds (trim 0.17s in post if needed)
Resolution:   1080p
FPS:          60 (if available) else 30
Audio:        OFF / No Native Audio
Aspect:       16:9
```

### Multi-shot prompts (paste each into its shot slot)

**Shot 1 — Every space (1.7 s)**

```
Cinematic photoreal 3D CGI, 16:9, slow premium B2B opener — no people, no logos, no readable text. Soft sunset sky pale lavender to warm amber-orange horizon. Dark silhouette of a modern South Indian commercial campus at the horizon: glass IT park, hospital block, low pharma wing in one continuous skyline. Imperceptibly slow lateral drift right. Rooftops hint at small white VRV units and vent grilles as environmental detail only. Vast negative space in lower third for website text. No scanlines, no wireframe, no HUD, no x-ray — pure architectural overview. Mood: cooling perfected for every kind of space.
```

**Shot 2 — Design through install and service (1.7 s)**

```
Continue same photoreal 3D CGI South Indian campus at dusk, 16:9, elevated three-quarter camera slowly orbiting a glass office and hospital wing. Horizontal cyan-blue scanlines sweep upward ONLY across building facades — sky and ground stay normal photoreal. Through scanned walls reveal translucent white wireframe HVAC inside: ceiling ducts, AHUs, refrigerant lines, VRV routes. Scan intensifies in Sri Comforts blue #007BC0 #8DD4F8; rooftop shows neat rows of outdoor condensers as if newly installed then recalibrated. No people, no logos, no text, no HUD panels. Mood: design, install, and service visible inside the architecture.
```

**Shot 3 — Authorized partner, South India (1.7 s)**

```
Photoreal 3D CGI transitioning to deep navy twilight, 16:9, slow orbital camera around a premium commercial rooftop mechanical yard — dozens of white VRV condensers in perfect parallel rows, clean copper lines, precise pipe supports. Background: wide South Indian city glow, Hyderabad-style glass skyline silhouettes, warm window lights, no readable signage. Faint translucent blue wireframe duct paths ghost above the roof plane. Then cut within same shot to elevated wide view: three building types as semi-transparent blue wireframe digital twins — IT park, hospital, pharma block — internal HVAC networks glowing, tiny white particles drifting like airflow telemetry, not a dashboard. No people, no logos, no text.
```

**Shot 4 — 25+ years trust (1.7 s)**

```
Abstract photoreal 3D CGI on near-black, 16:9, meditative pace — blue wireframes dissolve into thin luminous concentric rectangular portals receding in depth, soft white bokeh. Smooth translucent cool-air wisps flow inward from frame edges, laminar and calm. Wisps fade to a subtle dark blueprint grid — thin dashed grey lines, crosshair marks at intersections, brighter in corners, empty calm center. One faint pale-blue horizontal scanline passes once and disappears. No buildings, no people, no logos, no text, maximum negative space center-bottom. Camera nearly still. End frame nearly black with faintest grid. Mood: trusted since 2001, year after year.
```

### Mobile hero (9:16)

Re-run the **same 4-shot structure** with:

```
Aspect: 9:16
Reframe prompts: add "vertical composition, subject centered, extra negative space in bottom third for mobile hero text overlay"
```

Keep the same beat order and durations.

### Hero post-production

```bash
# 1. Trim master to exact scroll length
ffmpeg -i hero_desktop_raw.mp4 -t 6.833333 -an hero_desktop_master.mp4

# 2. Extract frames (60 fps → 410 frames)
node scripts/extract-hero-frames.mjs hero_desktop_master.mp4 desktop

# 3. Mobile
node scripts/extract-hero-frames.mjs hero_mobile_master.mp4 mobile

# 4. Verify
ls public/static/frames/home/desktop/webp/ | wc -l   # expect 410 at 60fps
```

Update `HERO_FPS`, frame counts, and `NEXT_PUBLIC_HERO_FRAMES_VERSION` in `src/data/homepage.ts`.

---

# PART B — FeaturesSteps (6 looping videos) — technical isometric (v2)

Section: `featuresSteps.items` in `src/data/homepage.ts`.  
Component: sticky scroll panel, **muted looping `<video>`**, tall mask (`object-fit: cover`).

**Look target:** architectural / CAD isometric diagram — NOT explainer-cartoon UI.  
**Style refs (locked):**
- `assets/features/refs/style-hvac-ref.png` — primary (HVAC plant on stacked slabs + blue dashed risers)
- `assets/features/refs/style-layers-ref.png` — secondary (layered platform system + square callouts)

**Reject immediately:** thick black outlines, speech bubbles, chunky “app icon” platforms, cartoon UI chrome, lime/green accents, people, logos, readable text.

## Kling settings (all 6)

```
Model:        Kling Video 3.0 Omni
Input:        ONE shared style still derived from style-hvac-ref.png (image_1 / 图片1)
Duration:     7 seconds
Resolution:   1080p
Aspect:       9:16
Audio:        OFF
Mode:         Single shot (prefer_multi_shots = false)
```

**Credit-safe order:** style still → **approve clip 1** → clip 2 → then 3–6. Never batch all 6 until clip 1 matches the refs.

---

## Point → scene map

| # | Homepage label | Scene (one idea) |
|---|----------------|------------------|
| 1 | Authorized HVAC solutions from design through commissioning | Rooftop plant completes on top slab; blue dashed commissioning risers drop through empty floor slabs |
| 2 | Full visibility across design, install, and service | Same stack as cutaway: indoor units bottom → riser middle → outdoor plant top; one blue dashed path traces the full route |
| 3 | Managed by expert teams with AutoCAD design expertise | Bottom slab = faint floor-plan grid; duct/equipment outlines draw; top slab becomes solid plant (plan → built) |
| 4 | Configurable systems for sites across South India | Three simple massing blocks (office / hospital / villa) on middle slab; matching mini HVAC kit clicks onto each |
| 5 | Clean rooms, cold rooms, and ventilation | One specialty module per slab: cleanroom + HEPA, cold room, louver/vent — blue airflow dashes pulse once |
| 6 | Service you can trust with a 24-hour response | Calm finished plant on top; one thin blue diagnostic dashed line scans across condensers and rests |

---

## STYLE LOCK (paste at the top of every prompt)

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.
```

---

### Style still (generate once, reuse)

**Goal:** 9:16 master still matching `style-hvac-ref.png` — use as `image_1` for every clip.

```
Using 图片1 as the exact style reference, create a clean 9:16 vertical master still of the same architectural isometric HVAC diagram language.
Keep: thin hairline outlines, soft contact shadows, matte white/gray equipment, thin floating floor slabs, Sri Comforts blue #007BC0 dashed vertical risers with tiny arrowheads, pure white background.
Composition: 4 thin stacked slabs centered with generous white margin. Top slab holds a neat rooftop plant — 1–2 AHU blocks, short duct elbows, 2–3 dual-fan condensers. Middle slabs mostly empty. Bottom slab has a faint fine grid only.
No text, no logos, no people, no speech bubbles, no thick cartoon outlines, no lime green.
Premium CAD / architectural visualization — neat, precise, calm.
```

---

### Video 1 — Authorized HVAC solutions from design through commissioning

**Label:** `Authorized HVAC solutions from design through commissioning.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (commissioning): Keep the same slab stack language as 图片1.
Top slab: rooftop plant assembles into place — one AHU, short duct run with sharp elbows, neat row of 3 dual-fan condensers.
Middle slabs: empty white floors.
Bottom slab: faint fine grid only.
Then thin blue dashed commissioning risers draw downward from the plant through the slabs once, tiny arrowheads, then rest.
No extra props. End calm for loop.
```

---

### Video 2 — Full visibility across design, install, and service

**Label:** `Full visibility across design, install, and service.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (full-system visibility): Same stack as 图片1, treated as a clean cutaway.
Bottom slab: two ceiling cassette / indoor unit outlines only.
Middle slab: one vertical rectangular riser duct + one compact AHU.
Top slab: three aligned dual-fan condensers.
One continuous thin blue dashed path traces slowly bottom → riser → top, then stops.
Two tiny solid blue square callouts on the left. No walls clutter, no furniture. Settle for loop.
```

---

### Video 3 — Managed by expert teams with AutoCAD design expertise

**Label:** `Managed by expert teams with AutoCAD design expertise.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (plan → built): Same slab language as 图片1.
Bottom slab: faint fine floor-plan grid; a simple AHU + duct outline draws in hairline strokes (no dimension numbers, no title block).
Middle slab: those outlines lift and become solid matte isometric AHU + short duct — crisp, no ghost lines left behind.
Top slab: finished plant — AHU aligned with two dual-fan condensers.
One tiny blue square callout near the plan. No rulers, no floating tools, no paper sheets. Settle for loop.
```

---

### Video 4 — Configurable systems for sites across South India

**Label:** `Configurable systems for sites across South India.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (modular sites): Same thin-slab stack as 图片1.
Bottom slab: empty shared base (or faint grid only).
Middle slab: exactly THREE simple building massing blocks slide in one-by-one (office, hospital, villa) — blank facades, no window clutter, no map, no city.
Top slab: a matching mini HVAC kit (small condenser + short duct) clicks onto each massing with a brief blue dashed accent, then static.
Two tiny blue square callouts max. No terrain, roads, or extra modules. Hold for loop.
```

---

### Video 5 — Clean rooms, cold rooms, and ventilation

**Label:** `Clean rooms, cold rooms, and ventilation.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (specialty environments): Same slab language as 图片1 — one module per slab, nothing else.
Bottom: clean-room box with one HEPA grille; a single flat blue laminar plane pulses once (geometric sheet, not mist).
Middle: insulated cold-room box; one thin blue refrigerant line accent only.
Top: louver / ventilation wall; three short blue dashed airflow arrows pulse once, then rest.
One tiny blue square callout per slab (three total). No shelves, crates, or corridor clutter. Sequence bottom→middle→top, then settle.
```

---

### Video 6 — Service you can trust with a 24-hour response

**Label:** `Service you can trust with a 24-hour response.`

```
STYLE LOCK — match 图片1 exactly (architectural isometric diagram, NOT cartoon):
Fixed true isometric camera, locked framing — no camera move, no orbit, no dolly, no zoom, no pan.
Pure white background. Soft realistic contact shadows under slabs and equipment (light gray, soft edges).
HAIRLINE thin gray/black outlines only — never thick marker outlines, never comic ink.
Matte white and light-gray fills on equipment and slabs. Surfaces look like CAD / architectural visualization.
Accent color ONLY Sri Comforts blue #007BC0 (and soft #8DD4F8 for dashed flow) — never lime, chartreuse, purple, orange, rainbow.
Platforms = thin floating rectangular floor slabs with slightly rounded corners (like the reference), NOT thick chunky UI tiles.
Equipment = precise mechanical HVAC forms (AHU boxes, dual-fan condensers, rectangular ducts with sharp elbows) — NOT cute icons.

HARD REJECT / NEVER DRAW:
- Explainer-video cartoon style, SaaS mascot style, sticker style
- Thick black outlines, rounded “app icon” look, speech bubbles, pins, emoji markers
- UI chrome, progress bars, text placeholders, logos, numbers, labels, leader-line captions
- People, hands, faces, vans, clocks, clouds-as-mascots, sparkles, particles, HUD, glow fog
- Random scribbles, hatching noise, stray strokes, cluttered grids, dimension soup

CLEAN RULES:
- Sparse. Large white margin. Subject centered in 9:16.
- Exactly 3 or 4 thin stacked slabs max, same thickness and spacing as 图片1.
- At most 2–3 tiny solid blue square callouts (flat squares only — no bubbles).
- At most ONE blue dashed flow/riser animating at a time, then settle for loop.
- Slow mechanical motion only. End frame calm and loopable.

SCENE (calm service readiness): Same stack as 图片1, almost static.
Bottom / middle slabs: empty or one simple mechanical-room box only.
Top slab: neat finished plant — 3–4 dual-fan condensers + short ducts, soft subtle blue status accent (not neon bloom).
One thin blue dashed diagnostic line travels once across the condenser row and fades — nothing else moves.
One tiny blue square callout near the plant. No vans, clocks, night sky, or background buildings. Hold calm for loop.
```

---

## FeaturesSteps post-production

```bash
# Trim + compress each loop (~2–3 MB target)
ffmpeg -i assets/features/raw/step-01.mp4 -t 7 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  public/static/videos/features/step-01.mp4
```

Place files at `public/static/videos/features/step-{01..06}.mp4`.

---

## Production order (credit-safe)

1. Upload `assets/features/refs/style-hvac-ref.png` → generate **one** 9:16 style still (image-to-image from ref).
2. Approve still: thin lines, soft shadows, real HVAC plant, **no cartoon**.
3. Generate **clip 1 only** from that still → approve or reject.
4. Then clip 2 → approve.
5. Only then batch clips 3–6.
6. Reject any thick-outline / speech-bubble / UI-tile output; do not spend further until style lock holds.
7. Compress + wire under `public/static/videos/features/`.

---

## Quick checklist

- [ ] Style still matches `style-hvac-ref.png` (CAD look, not cartoon)
- [ ] Clip 1 approved before spending on 2–6
- [ ] Kling **3.0 Omni**, **No Native Audio**, **1080p**, **9:16**
- [ ] Thin hairline outlines + soft shadows + blue dashed risers only
- [ ] No speech bubbles, thick outlines, chunky UI tiles, lime accents
- [ ] Hero: v3 frames live (`/v3/` + cache bump)
