# Sri Comforts — Kling AI Video Prompts

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

# PART B — FeaturesSteps (6 looping videos)

Section: `featuresSteps.items` in `src/data/homepage.ts`.  
Component: sticky scroll panel, **muted looping `<video>`**, tall mask (`object-fit: cover`).

## Kling settings (all 6)

```
Model:        Kling Video 3.0 Omni (image-to-video from style frame)
Duration:     7 seconds (trim loop to 6–8s in post)
Resolution:   1080p
Aspect:       9:16
Audio:        OFF
FPS:          30 (default — no code change needed)
Mode:         Single shot (not multi-shot) — one concept per step
```

**Loop tip:** In Kling, use **first frame + end frame** control when available. Pick a segment where start and end composition are similar, then ffmpeg loop trim.

**What Kling does best here:** slow dolly/orbit, architectural CGI, wireframe overlays, particle/airflow VFX, image-to-video consistency.

---

### Video 1 — Authorized HVAC solutions from design through commissioning

**Label:** `Authorized HVAC solutions from design through commissioning.`

```
Cinematic photoreal 3D CGI, 9:16 vertical, slow camera — no people, no logos, no text. Dark blueprint lines on black morph into a 3D cutaway of a South Indian commercial block: glass IT wing and low pharma wing. Sri Comforts blue wireframe ducts and VRV lines #007BC0 #8DD4F8 draw themselves through floors, then solidify into finished rooftop plant and indoor units. Final moment: soft blue glow pulses once along the completed duct run suggesting commissioning. Slow push-in then gentle orbit around rooftop plant. Premium B2B HVAC film quality.
```

---

### Video 2 — Full visibility across design, install, and service

**Label:** `Full visibility across design, install, and service.`

```
Photoreal 3D CGI digital twin, 9:16 vertical, no people or text. Semi-transparent commercial facility with glowing blue HVAC paths visible end-to-end: vertical shaft, ceiling duct trunk, AHU room, outdoor condenser bank. Tiny white particles drift along ducts like airflow telemetry — not a UI dashboard. Camera dollies in one continuous move following the system path from interior riser through facade to rooftop plant and back to mechanical room. Slow, elegant, full visibility of the complete cooling system. Sri Comforts blue accents on dark navy environment.
```

---

### Video 3 — Managed by expert teams with AutoCAD design expertise

**Label:** `Managed by expert teams with AutoCAD design expertise.`

```
Photoreal 3D CGI engineering visualization, 9:16 vertical, no people or hands. Abstract precision workspace: floating AutoCAD-style layers, dimension ticks, cross-section of an AHU with exact geometry, top-down drift across technical drawing sheets. Wireframe HVAC modules snap into aligned production-ready assemblies with millimeter precision. Stylized silhouettes of ruler and scale bar only — no human figures. Slow tilt from 2D blueprint into clean 3D isometric. Mood: expert design authority, calm and precise. Blue #007BC0 lines on dark charcoal.
```

---

### Video 4 — Configurable systems for sites across South India

**Label:** `Configurable systems for sites across South India.`

```
Photoreal 3D CGI aerial visualization, 9:16 vertical, no text labels or logos. Dark abstract terrain suggesting South India without readable map text. Five soft blue nodes pulse at major metros. From each node a different building archetype rises briefly — IT park, hospital, luxury villa, pharma plant, retail mall — each with the same blue HVAC module language on rooftops. VRV clusters vs central plant vs ductable suggested by form only. Very slow aerial drift. Configurable modules click into place. Mood: one partner, many site types, regional scale.
```

---

### Video 5 — Clean rooms, cold rooms, and ventilation

**Label:** `Clean rooms, cold rooms, and ventilation.`

```
Photoreal 3D CGI specialty HVAC montage in one slow lateral move, 9:16 vertical, no people or text. Beat one: white pharmaceutical clean room corridor with laminar blue airflow sheets and HEPA grille detail. Beat two: insulated cold room panels with soft frost haze and racked storage silhouettes. Beat three: industrial louver wall with visible blue air ribbons and ventilation flow. Seamless premium transitions, meditative pacing, Sri Comforts blue airflow accents on neutral white and steel surfaces.
```

*Alternative if montage is too busy:* generate **3 separate 7s clips**, pick the best (clean room only), or use Kling **multi-shot** with 3 × ~2.3 s shots.

---

### Video 6 — Service you can trust with a 24-hour response

**Label:** `Service you can trust with a 24-hour response.`

```
Photoreal 3D CGI night-to-dawn reliability scene, 9:16 vertical, no people, vans, logos, or text. Wide commercial campus exterior at night, mechanical room glows steady Sri Comforts blue — healthy running system. One subtle diagnostic scan line passes across rooftop equipment. Sky slowly shifts to pre-dawn calm; equipment still running smoothly implying 24/7 coverage. No clocks, no "24h" text. Static wide camera with slow push toward rooftop plant. Mood: trusted responsive service, quiet confidence.
```

---

## FeaturesSteps post-production

```bash
# Trim + compress each loop (~2–3 MB target)
ffmpeg -i raw_step1.mp4 -t 7 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/static/videos/features/step-01.mp4
```

Place files at `public/static/videos/features/step-{01..06}.mp4`, then update `featuresSteps.items[].media` in `src/data/homepage.ts`.

---

## Production order

1. **Style frame** — one 9:16 still establishing palette (use for all 6 features + as hero shot-1 reference).
2. **Hero desktop** — 4-shot multi-shot master → extract frames.
3. **Hero mobile** — same beats, 9:16.
4. **Features 1, 2, 6** — narrative spine.
5. **Features 3, 4, 5** — expertise + sectors.
6. Compress, upload, bump cache version env vars.

---

## Quick checklist

- [ ] Kling **3.0**, **No Native Audio**, **1080p**
- [ ] Hero: **multi-shot 4 × 1.7 s**, 16:9 + 9:16 variants
- [ ] Hero fps noted → `HERO_FPS` + frame counts updated
- [ ] Features: **6 × 9:16** loops, image-to-video from style frame
- [ ] No people, logos, readable text in any output
- [ ] `NEXT_PUBLIC_HERO_FRAMES_VERSION` bumped after hero export
