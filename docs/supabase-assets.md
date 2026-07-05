# Supabase asset CDN

Site media (videos, team, images) can use Supabase Storage. **Hero scroll frames are served from `/public/static/frames` on Vercel** (same origin — not Supabase).

## Bucket layout

```
assets/
  videos/                     ← homepage feature videos (future)
  team/                       ← about team portraits (future)
  images/                     ← logos, photos, icons (future)
```

Hero frames live in the repo at `public/static/frames/home/{desktop,mobile}/webp/` (~38MB, commit to git for Vercel deploy).

## Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy **Project URL**, **anon key**, and **service role key** into `.env.local`
3. Set `NEXT_PUBLIC_SUPABASE_ASSETS=true` when you upload non-hero assets
4. Restart dev server

## Upload assets

```bash
npm run supabase:upload-assets -- videos
npm run supabase:upload-assets -- team
```

Optional: `npm run supabase:upload-hero-frames` — only if you want a Supabase backup; production hero uses `/public`.

## Code

Use `assetUrl()` from `src/lib/supabase/assets.ts` for any asset:

```ts
import { assetUrl } from "@/lib/supabase/assets";

assetUrl("videos/hero.mp4", "/static/videos/hero.mp4");
```

When `NEXT_PUBLIC_SUPABASE_ASSETS=false`, local `/public` paths are used.

## Payload CMS (later)

- **Database:** Supabase Postgres (`@payloadcms/db-postgres`)
- **Media:** same bucket via `@payloadcms/storage-s3` + Supabase S3 endpoint
