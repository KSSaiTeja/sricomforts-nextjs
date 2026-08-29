# Sri Comforts — Hero Final: The Line

**Status:** FINAL production spec. Cinematic · minimal · premium · text-legible.  
**Do not** regenerate campus/hologram concepts.

Code: `src/data/homepage.ts` · `scripts/extract-hero-frames.mjs` · `video-carousel.module.css`

---

## Locked concept

**The Line** — one continuous copper refrigerant line is the entire film. Camera never leaves it.

| Setting | Value |
|---------|--------|
| Mood | Cinematic, minimal, premium B2B (Awwwards restraint) |
| Palette | Soft cool blue-grey atmospheres · white powder-coat · brushed copper · accent `#007BC0` / `#8DD4F7` only as a thin luminous core inside the line |
| Continuity | Single physical subject, single camera grammar (macro track → follow → reveal → settle) |
| Text | White/cyan site copy; frames keep **dark/soft empty lower third**; site gradient reinforces legibility |
| Forbidden | People, logos, text, golden hour, neon hologram buildings, circuit stickers, campus flyovers, HUD, morphing architecture, busy skylines |

### Copy sync

| Beat | Scroll | Text | Visual |
|------|--------|------|--------|
| 1 | 0–25% | We perfected cooling solutions for every space | Extreme macro on one insulated copper line in soft cool void. Condensation. Blue rim core. Track begins. |
| 2 | 25–50% | from design through install and service. | Line enters pristine white ceiling plenum — hangers, duct, order. Blue core gently brightens (commissioned). |
| 3 | 50–75% | Your authorized Daikin partner in South India. | Line emerges to quiet rooftop: neat white condensers, soft blue hour, distant cool haze — no logos. |
| 4 | 75–100% | Trusted for 25+ years, year after year. | Leave hardware into empty refined room; soft volumetric cool air from cassette; hold stillness. |

---

## Production (quality path)

| Step | Model | Notes | ~Credits |
|------|-------|-------|----------|
| Start + end keyframes | `soul_cinematic` 16:9 2k | Self-QA: no text artifacts | ~0.24 |
| Desktop master | `seedance_2_0` 8s 1080p `generate_audio false` `mode std` | `--start-image` + `--end-image` | ~72 |
| Mobile | workflow `reframe` → 9:16 720p | Same film, vertical crop | ~42 |
| Extract | ffmpeg → webp @ 24fps | Trim ~7–8s | 0 |

**Budget:** ~115 of ~184. One Seedance retry only if master fails continuity.

---

## Style lock (every prompt)

```
Ultra-premium cinematic product film for a luxury B2B HVAC website hero, Awwwards-level restraint. Photoreal materials only: brushed copper refrigerant pipe with thin white insulation, white powder-coated metal, soft volumetric cool air. Color grade: cool blue-grey, soft charcoal shadows, pale cool highlights — never warm amber, never orange sunset. Sri Comforts blue #007BC0 #8DD4F7 appears ONLY as a thin luminous core inside the copper line and faint cool rim light — not neon overlays, not holograms, not circuit patterns on buildings. Extremely slow smooth camera. Massive empty soft dark lower third for white website typography. Absolutely no people, no faces, no logos, no brand names, no readable text, no letters, no numbers, no HUD, no UI, no watermarks. Minimal composition, one subject, museum-quality lighting.
```

### Negatives

```
no people, no text, no logos, no watermark, no HUD, no neon hologram buildings, no circuit board overlays, no golden hour, no orange sky, no cyberpunk, no busy skyline collage, no campus aerial tour, no morphing architecture, no shake, no whip pan, no lens dirt text
```

---

## Keyframe prompts

### START — Beat 1 (macro)

```
[STYLE LOCK]

Extreme close-up cinematic still, 16:9. A single insulated copper refrigerant line runs horizontally through soft cool blue-grey void. Brushed copper metal, thin white foam insulation, one sharp condensation bead catching cool light. A hairline luminous Sri Comforts blue core glows faintly inside the pipe. Shallow depth of field, lower third completely empty soft dark gradient. No background architecture yet. Mood: perfected precision. No text anywhere.
```

### END — Beat 4 (quiet room)

```
[STYLE LOCK]

Wide cinematic still, 16:9. Empty refined commercial interior at soft blue dusk light through sheer curtains — white walls, polished quiet floor in soft shadow. A discreet white ceiling cassette vents gentle volumetric cool air (pale blue-white wisps, not smoke). No furniture clutter. Lower third empty dark soft floor for typography. Mood: trusted stillness, year after year. No text, no logos, no people.
```

---

## Master video prompt (Seedance)

```
[STYLE LOCK]

One continuous 8-second cinematic camera move following a single copper refrigerant line — never cut away from the line. Start extreme macro on insulated copper with condensation and faint blue luminous core in cool blue-grey void; slowly track along the pipe. The line enters a pristine white ceiling plenum with precise hangers and clean ductwork as the blue core gently brightens. Continue as the line emerges onto a quiet commercial rooftop with neat white VRV condensers under soft blue hour sky and distant cool haze — no signage. Finally leave the hardware and follow soft volumetric cool air into an empty refined white interior with a ceiling cassette; settle into stillness. Seamless continuous shot, slow premium motion, consistent materials and color grade throughout. Empty soft dark lower third the whole time. No people, no text, no logos, no neon building holograms.
```

### CLI

```bash
higgsfield generate create seedance_2_0 \
  --prompt "..." \
  --aspect_ratio 16:9 \
  --duration 8 \
  --resolution 1080p \
  --generate_audio false \
  --mode std \
  --start-image assets/hero/stills/line-start.png \
  --end-image assets/hero/stills/line-end.png \
  --wait --wait-timeout 25m

higgsfield generate workflow reframe \
  --video assets/hero/masters/hero_desktop_master.mp4 \
  --aspect_ratio 9:16 \
  --resolution 720p \
  --wait --wait-timeout 25m
```

---

## Site wiring

```bash
HERO_FPS=24 HERO_DURATION=7.5 \
  node scripts/extract-hero-frames.mjs assets/hero/masters/hero_desktop_master.mp4 desktop
HERO_FPS=24 HERO_DURATION=7.5 \
  node scripts/extract-hero-frames.mjs assets/hero/masters/hero_mobile_master.mp4 mobile
```

Update `HERO_FPS`, frame counts, bump `NEXT_PUBLIC_HERO_FRAMES_VERSION`. Keep bottom copy gradient in `video-carousel.module.css`.
