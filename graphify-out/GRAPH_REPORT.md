# Graph Report - sricomforts-nextjs  (2026-08-29)

## Corpus Check
- 172 files · ~2,772,629 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1086 nodes · 2016 edges · 64 communities (57 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c91b95d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useAnimatedStrong
- SolutionsSectionsGrid.tsx
- solutions.ts
- homepage.ts
- registerGsap
- ContactPage.tsx
- dependencies
- blog.ts
- ChatWidget.tsx
- TonnageCalculator.tsx
- ProductCatalog.tsx
- FeaturesSteps.tsx
- compilerOptions
- createVideoSequence.ts
- AboutPage.tsx
- SiteHeader.tsx
- Project Context — sricomforts-nextjs
- CareerPage.tsx
- LogoBorderCell.tsx
- Sri Comforts — Contact, Locations & Escalation
- Sri Comforts — Notable Projects (public showcase)
- AboutSectionIntro.tsx
- Sri Comforts — Company Overview
- Sri Comforts — Frequently Asked Questions
- Sri Comforts — Solutions by Sector
- AboutLogoGrid.tsx
- Sri Comforts — Products, Systems & Website Tools
- Why Daikin — Sri Comforts recommendation framing
- AboutHero.tsx
- TestimonialsSection.tsx
- Chatbase upload guide — Sri Comforts
- Sri Comforts — Services
- Year-1 knowledge base update workflow
- assets.ts
- README.md
- video-sequence.worker.ts
- TextReveal.tsx
- client.ts
- AGENTS.md
- GOLDEN-QUESTIONS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- HomePage.tsx
- useHorizontalDragScroll
- AwardsAchievements.tsx
- PRD — Sri Comforts AI Knowledge Base Chatbot (Custom / Groq)
- Sri Comforts Hero — Precise Storyboard Prompts (v3.1)
- Sri Comforts — Asset & Launch Checklist
- Sri Comforts — Hero Final: The Line
- Sri Comforts — Hero Hybrid Video (Higgsfield)
- Sri Comforts — Hero Scroll Video (Omni Prompts)
- roundedPath.ts
- Omni prompts (paste-ready)
- StatsBento.tsx
- Post-production pipeline
- Supabase asset CDN
- AboutLeaders.tsx
- Style stills (approve before video)
- Sri Comforts — Hero v2: Solutions Story
- Master video (after still approval)

## God Nodes (most connected - your core abstractions)
1. `registerGsap()` - 64 edges
2. `useAnimatedStrong()` - 30 edges
3. `useIsLargeViewport()` - 28 edges
4. `useSvh()` - 23 edges
5. `usePreloader()` - 19 edges
6. `createNotch()` - 17 edges
7. `FeaturesSteps()` - 16 edges
8. `compilerOptions` - 16 edges
9. `SiteFooter()` - 15 edges
10. `SiteHeader()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `QuoteSection()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/home/QuoteSection.tsx → src/lib/gsap/register.ts
- `ScrollIndicatorDesktop()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/home/VideoCarousel.tsx → src/lib/gsap/register.ts
- `GridHeader()` --calls--> `useAnimatedStrong()`  [EXTRACTED]
  src/components/solutions/SolutionsSectionsGrid.tsx → src/hooks/useAnimatedStrong.ts
- `AboutHero()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/about/AboutHero.tsx → src/lib/gsap/register.ts
- `AboutLeaders()` --calls--> `useIsLargeViewport()`  [EXTRACTED]
  src/components/about/AboutLeaders.tsx → src/hooks/useMediaQuery.ts

## Import Cycles
- None detected.

## Communities (64 total, 7 thin omitted)

### Community 0 - "useAnimatedStrong"
Cohesion: 0.09
Nodes (24): renderTitle(), SectionIntroduction(), SectionIntroductionProps, PathBackground(), ContactCta(), ContactCtaProps, BackgroundCanvas(), BackgroundCanvasProps (+16 more)

### Community 1 - "SolutionsSectionsGrid.tsx"
Cohesion: 0.09
Nodes (35): AnimatedCardBorder(), AnimatedCardBorderProps, AnimatedPathLine(), AnimatedPathLineProps, registerPathLineRef(), PathLineFollower(), PathLineFollowerProps, buildFourItemPaths() (+27 more)

### Community 2 - "solutions.ts"
Cohesion: 0.06
Nodes (52): generateMetadata(), Page(), PageProps, generateMetadata(), Page(), PageProps, ServicesSectionIntroProps, serviceCarouselImage() (+44 more)

### Community 3 - "homepage.ts"
Cohesion: 0.11
Nodes (18): LogoWall(), MarqueeRow(), repeatToFill(), QuoteSection(), brandDifferenceSection, featuresSteps, footerSection, fullscreenFeatures (+10 more)

### Community 4 - "registerGsap"
Cohesion: 0.05
Nodes (66): metadata, metadata, AboutFeaturesGrid(), AboutFeaturesGridProps, buildFeatureNotches(), formatFeatureIndex(), TonnageCalculatorPage(), CrossFlicker() (+58 more)

### Community 5 - "ContactPage.tsx"
Cohesion: 0.06
Nodes (40): metadata, ContactArrowIcon(), ContactMap(), ContactPage(), ContactWaysCardAction(), ContactWaysCardActionProps, ContactWaysCardBase(), ContactWaysCardBaseProps (+32 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (48): ai, @ai-sdk/groq, @ai-sdk/react, eslint, eslint-config-next, gsap, @gsap/react, lenis (+40 more)

### Community 7 - "blog.ts"
Cohesion: 0.09
Nodes (30): generateMetadata(), Page(), PageProps, metadata, generateMetadata(), Page(), PageProps, BlogArticlePage() (+22 more)

### Community 8 - "ChatWidget.tsx"
Cohesion: 0.08
Nodes (33): lastUserText(), maxDuration, POST(), validateMessages(), ChatWidget(), LINKABLE_PATH_PATTERN, LINKABLE_PATHS, linkify() (+25 more)

### Community 9 - "TonnageCalculator.tsx"
Cohesion: 0.13
Nodes (20): FieldProps, formatAdj(), formatTons(), SelectFieldProps, SUN_OPTIONS, TonnageCalculator(), baseTonsFromArea(), calculateTonnage() (+12 more)

### Community 10 - "ProductCatalog.tsx"
Cohesion: 0.20
Nodes (15): categoryLabel(), formatIndex(), ProductCatalog(), renderTitle(), filterProductCatalogItems(), PRODUCT_BENTO_IMAGE, PRODUCT_EXPLORE_LABEL, PRODUCT_VIEW_LABEL (+7 more)

### Community 11 - "FeaturesSteps.tsx"
Cohesion: 0.07
Nodes (48): metadata, suisseIntl, HIDDEN_PREFIXES, TonnageCalculatorWidget(), buildNotches(), clamp(), easePow2Out(), FeaturesSteps() (+40 more)

### Community 12 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 13 - "createVideoSequence.ts"
Cohesion: 0.09
Nodes (31): ScrollIndicatorDesktop(), VideoSequence(), VideoSequenceProps, AppPreloader(), getNotchOffset(), HeroPreloadStarter(), getHeroFramePrefix(), getHeroFrameUrls() (+23 more)

### Community 14 - "AboutPage.tsx"
Cohesion: 0.15
Nodes (19): AboutStoryValues(), AboutStoryValuesProps, aboutAdvisors, aboutAdvisoryIntro, aboutBrandLogos, aboutBrandPartners, aboutExecutiveLeaders, AboutFeatureItem (+11 more)

### Community 15 - "SiteHeader.tsx"
Cohesion: 0.08
Nodes (22): BRAND_LOGO_SRC, FullLogo(), FullLogoProps, LOGO_DISPLAY, LOGO_LOCKUP, LOGO_WORDMARK, LogoIcon, LogoWordmark (+14 more)

### Community 16 - "Project Context — sricomforts-nextjs"
Cohesion: 0.12
Nodes (16): 10. Conventions, 11. Quick Hand-off (new chats), 1. Project Summary, 2. Route Map, 3. Architecture, 4. Key Assets, 5. Design System (`src/styles/tokens.css`), 6. Animation Patterns (+8 more)

### Community 17 - "CareerPage.tsx"
Cohesion: 0.18
Nodes (9): metadata, CareerPage(), careerCultureIntro, careerDepartments, careerHero, CareerJob, careerJobBoardHeading, careerJobs (+1 more)

### Community 18 - "LogoBorderCell.tsx"
Cohesion: 0.18
Nodes (8): metadata, AboutPage(), LogoBorderCell(), LogoBorderCellProps, ScrollIndicatorMobile(), VideoCarousel(), useHashScroll(), useSmoothScroll()

### Community 19 - "Sri Comforts — Contact, Locations & Escalation"
Cohesion: 0.20
Nodes (9): Escalation rules for the chatbot, Head office (Hyderabad) — ALWAYS answer when asked location / address / where we are, Office timing — ALWAYS answer when asked hours / timings / open times, Primary phone, Service coverage notes, Social, Sri Comforts — Contact, Locations & Escalation, Website contact paths (+1 more)

### Community 20 - "Sri Comforts — Notable Projects (public showcase)"
Cohesion: 0.20
Nodes (9): Government / Institutional, Healthcare, Hospitality, How the chatbot should talk about projects, Industrial, IT & Software, Residential / Builders, Retail (+1 more)

### Community 21 - "AboutSectionIntro.tsx"
Cohesion: 0.29
Nodes (9): AboutSectionIntro(), AboutSectionIntroProps, renderParagraphPart(), renderParagraphParts(), renderTitle(), renderTitlePart(), AboutParagraphPart, AboutSectionIntroData (+1 more)

### Community 22 - "Sri Comforts — Company Overview"
Cohesion: 0.22
Nodes (8): Brand partnerships, Careers, How we work (summary), Leadership (public site), Sri Comforts — Company Overview, Values, What we deliver, Who we are

### Community 23 - "Sri Comforts — Frequently Asked Questions"
Cohesion: 0.22
Nodes (8): General, Getting help / contacting, Pricing & quotes, Process & quality, Services & AMC, Solutions & systems, Sri Comforts — Frequently Asked Questions, Website tools & resources

### Community 24 - "Sri Comforts — Solutions by Sector"
Cohesion: 0.25
Nodes (7): Commercial HVAC (/solutions/commercial), Healthcare HVAC (/solutions/healthcare), Hospitality & Retail (/solutions/hospitality-retail), Industrial & Pharma (/solutions/industrial-pharma), IT Services HVAC (/solutions/it-services), Residential (/solutions/residential), Sri Comforts — Solutions by Sector

### Community 25 - "AboutLogoGrid.tsx"
Cohesion: 0.29
Nodes (5): AboutLogoGrid(), AboutLogoGridProps, buildLogoSlots(), AboutLogoGridData, AboutLogoItem

### Community 26 - "Sri Comforts — Products, Systems & Website Tools"
Cohesion: 0.29
Nodes (6): Cooling systems commonly discussed, Design & delivery capabilities, Free tool: AC Tonnage Calculator, Other resources on the website, Sri Comforts — Products, Systems & Website Tools, What the chatbot should recommend by intent

### Community 27 - "Why Daikin — Sri Comforts recommendation framing"
Cohesion: 0.29
Nodes (6): Daikin India snapshot (from same materials), How Sri Comforts talks about other portfolio brands, Sri Comforts + Daikin, What not to invent, Why choose Daikin (from Daikin Solutions 360 materials), Why Daikin — Sri Comforts recommendation framing

### Community 28 - "AboutHero.tsx"
Cohesion: 0.33
Nodes (5): AboutHero(), AboutHeroProps, FrameMetrics, readMetrics(), AboutHeroData

### Community 29 - "TestimonialsSection.tsx"
Cohesion: 0.29
Nodes (7): circularDistance(), LoopedItem, TestimonialsSection(), TestimonialsSectionProps, Testimonial, testimonials, testimonialsSection

### Community 30 - "Chatbase upload guide — Sri Comforts"
Cohesion: 0.33
Nodes (5): After uploading, Chatbase upload guide — Sri Comforts, Important before go-live, System prompt (paste into Chatbase “Instructions” / “Base prompt”), Upload order (recommended)

### Community 31 - "Sri Comforts — Services"
Cohesion: 0.40
Nodes (4): 1) How We Work (/services/how-we-work), 2) AMC Plans (/services/amc), 3) Service Request (/services/service-request), Sri Comforts — Services

### Community 32 - "Year-1 knowledge base update workflow"
Cohesion: 0.40
Nodes (4): Environment, Files to edit, How the client requests a change, Year-1 knowledge base update workflow

### Community 33 - "assets.ts"
Cohesion: 0.50
Nodes (3): assetUrl(), getSupabasePublicUrl(), supabaseAssetsEnabled

### Community 34 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 35 - "video-sequence.worker.ts"
Cohesion: 0.50
Nodes (3): BitmapsMessage, FramesMessage, queue

### Community 45 - "HomePage.tsx"
Cohesion: 0.38
Nodes (3): HomePage(), SeparatorNotch(), sectionIntros

### Community 46 - "useHorizontalDragScroll"
Cohesion: 0.24
Nodes (7): ProjectsCarousel(), AwardsAchievements(), projectShowcase, ProjectShowcaseItem, nearestIndex(), useHorizontalDragScroll(), UseHorizontalDragScrollOptions

### Community 47 - "AwardsAchievements.tsx"
Cohesion: 0.27
Nodes (5): AwardsAchievementsProps, AchievementStat, AwardItem, awardsSection, experienceSection

### Community 48 - "PRD — Sri Comforts AI Knowledge Base Chatbot (Custom / Groq)"
Cohesion: 0.04
Nodes (48): 1. Summary, 2. Contacts, 3. Background, 4. Objective, 5. Market Segment(s), 6. Value Proposition(s), 7.1 UX / user flows, 7.2 Key features (+40 more)

### Community 49 - "Sri Comforts Hero — Precise Storyboard Prompts (v3.1)"
Cohesion: 0.06
Nodes (33): Continuity, FRAME 1 — Every space (home + office solutions), FRAME 2 — Design → install → service, FRAME 3 — Authorized partner · South India (VRV plant), FRAME 4 — Trusted 25+ years (same home, lived-in calm), Quick QA before you approve, Sri Comforts Hero — Precise Storyboard Prompts (v3.1), Style lock (prepend every Gemini prompt) (+25 more)

### Community 50 - "Sri Comforts — Asset & Launch Checklist"
Cohesion: 0.15
Nodes (12): 1. Branding & identity, 2. Media & CDN, 3. Homepage, 4. About page, 5. Contact page, 6. Solutions & services, 7. Package & repo, Asset map (+4 more)

### Community 51 - "Sri Comforts — Hero Final: The Line"
Cohesion: 0.17
Nodes (12): CLI, Copy sync, END — Beat 4 (quiet room), Keyframe prompts, Locked concept, Master video prompt (Seedance), Negatives, Production (quality path) (+4 more)

### Community 52 - "Sri Comforts — Hero Hybrid Video (Higgsfield)"
Cohesion: 0.18
Nodes (8): Copy sync (`heroTitles`), Credit budget (approx, Pro workspace), Extract + wire checklist, Global negatives, Global style lock (prepend to every prompt), Locked direction, Master length, Sri Comforts — Hero Hybrid Video (Higgsfield)

### Community 53 - "Sri Comforts — Hero Scroll Video (Omni Prompts)"
Cohesion: 0.18
Nodes (11): Clip breakdown (8 Omni clips), Color palette, File locations (after export), Final video length, Hero copy (must stay in sync), If Omni only allows 4 generations, Quick checklist, Sri Comforts — Hero Scroll Video (Omni Prompts) (+3 more)

### Community 54 - "roundedPath.ts"
Cohesion: 0.33
Nodes (8): add(), appendCorner(), CornerCurve, distance(), format(), normalize(), scale(), subtract()

### Community 55 - "Omni prompts (paste-ready)"
Cohesion: 0.22
Nodes (9): CLIP 1 — Beat 1 opens · “Every space” begins, CLIP 2 — Beat 1 peaks · “Every space” variety, CLIP 3 — Beat 2 opens · “Design” — scan begins on buildings, CLIP 4 — Beat 2 peaks · “Install and service” — scan deepens, CLIP 5 — Beat 3 opens · “Authorized partner” — precision at scale, CLIP 6 — Beat 3 peaks · “South India” — multi-building digital twin, CLIP 7 — Beat 4 opens · “25+ years” — timeless calm begins, CLIP 8 — Beat 4 ends · “Year after year” — blueprint fade (+1 more)

### Community 56 - "StatsBento.tsx"
Cohesion: 0.32
Nodes (5): getGatherOffset(), StatsBento(), statsBento, StatsBentoItem, BRAND_NAME

### Community 57 - "Post-production pipeline"
Cohesion: 0.29
Nodes (7): 1. Stitch, 2. Export master, 3. Extract WebP frames, 4. Verify frame count, 5. Mobile, 6. Deploy, Post-production pipeline

### Community 58 - "Supabase asset CDN"
Cohesion: 0.29
Nodes (6): Bucket layout, Code, Payload CMS (later), Setup, Supabase asset CDN, Upload assets

### Community 59 - "AboutLeaders.tsx"
Cohesion: 0.29
Nodes (4): AboutLeaders(), AboutLeadersProps, AboutLeaderItem, AboutLeadersData

### Community 60 - "Style stills (approve before video)"
Cohesion: 0.33
Nodes (6): Beat 1 — Every space (cool daylight), Beat 2 — Design → install → service, Beat 3 — Authorized partner, South India, Beat 4 — 25+ years trust, CLI — stills, Style stills (approve before video)

### Community 61 - "Sri Comforts — Hero v2: Solutions Story"
Cohesion: 0.40
Nodes (4): Production, Site, Sri Comforts — Hero v2: Solutions Story, Story ↔ copy

### Community 62 - "Master video (after still approval)"
Cohesion: 0.50
Nodes (4): CLI — desktop master, Continuous master prompt (single clip), Master video (after still approval), Mobile (9:16)

## Knowledge Gaps
- **401 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+396 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `registerGsap()` connect `registerGsap` to `useAnimatedStrong`, `SolutionsSectionsGrid.tsx`, `solutions.ts`, `homepage.ts`, `FeaturesSteps.tsx`, `createVideoSequence.ts`, `SiteHeader.tsx`, `LogoBorderCell.tsx`, `StatsBento.tsx`, `AboutLogoGrid.tsx`, `AboutHero.tsx`, `TestimonialsSection.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `useAnimatedStrong()` connect `useAnimatedStrong` to `SolutionsSectionsGrid.tsx`, `solutions.ts`, `registerGsap`, `ContactPage.tsx`, `ProductCatalog.tsx`, `FeaturesSteps.tsx`, `AboutPage.tsx`, `AboutSectionIntro.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `useSvh()` connect `registerGsap` to `ContactPage.tsx`, `blog.ts`, `HomePage.tsx`, `AboutPage.tsx`, `createVideoSequence.ts`, `CareerPage.tsx`, `LogoBorderCell.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _401 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useAnimatedStrong` be split into smaller, more focused modules?**
  _Cohesion score 0.08901515151515152 - nodes in this community are weakly interconnected._
- **Should `SolutionsSectionsGrid.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08787878787878788 - nodes in this community are weakly interconnected._
- **Should `solutions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05632360471070148 - nodes in this community are weakly interconnected._