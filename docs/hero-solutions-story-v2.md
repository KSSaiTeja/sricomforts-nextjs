# Sri Comforts — Hero v2: Solutions Story

Copy-synced cinematic hero. Not a start/end morph of one object.

## Story ↔ copy

| Beat | Copy | Visual |
|------|------|--------|
| 1 | We perfected cooling solutions for every space | Split AC + ceiling cassette in one premium interior; city beyond glass |
| 2 | from design through install and service | Ceiling plenum: ducts, copper, cassette; soft blue design geometry → real install |
| 3 | Your authorized Daikin partner in South India | Rooftop VRV condenser rows, regional city scale |
| 4 | Trusted for 25+ years, year after year | Quiet room; cassette with soft volumetric cool air |

## Production

1. 4 `soul_cinematic` stills → cleaned with `nano_banana_2` (strip AI text)
2. `gemini_omni` 8s 16:9 with all 4 stills as `--image-references`
3. `reframe` → 9:16 mobile
4. Extract to `public/static/frames/home/{desktop,mobile}/v2/webp/hero_v2_*_24_*.webp`

## Site

- `HERO_FRAMES_VERSION = 9-solutions`
- Paths under `/static/frames/home/*/v2/webp/`
- White copy + bottom gradient in `video-carousel.module.css`
