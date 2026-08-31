# Graph Report - sricomforts-nextjs  (2026-08-29)

## Corpus Check
- 177 files · ~2,864,620 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1130 nodes · 2115 edges · 66 communities (59 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5780069a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useAnimatedStrong
- pathFollower.ts
- solutions.ts
- homepage.ts
- FeaturesSteps.tsx
- contact.ts
- dependencies
- blog.ts
- ChatWidget.tsx
- TonnageCalculator.tsx
- ProductCatalog.tsx
- AnimatedLogo.tsx
- compilerOptions
- createVideoSequence.ts
- AboutPage.tsx
- SiteFooter.tsx
- Project Context — sricomforts-nextjs
- CareerPage.tsx
- useSmoothScroll
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
- registerGsap
- Sri Comforts Daikin RA split — model specifications
- PRD — Sri Comforts AI Knowledge Base Chatbot (Custom / Groq)
- Sri Comforts Hero — Precise Storyboard Prompts (v3.1)
- Sri Comforts — Asset & Launch Checklist
- Sri Comforts — Hero Final: The Line
- Sri Comforts — Hero Hybrid Video (Higgsfield)
- Sri Comforts — Hero Scroll Video (Omni Prompts)
- SolutionsPage.tsx
- Omni prompts (paste-ready)
- NotchSection.tsx
- Post-production pipeline
- Supabase asset CDN
- BackgroundCanvas.tsx
- Style stills (approve before video)
- Sri Comforts — Hero v2: Solutions Story
- Master video (after still approval)
- Sri Comforts Daikin RA — features, filters, and gaps
- Sri Comforts residential split ACs — Daikin OEM range

## God Nodes (most connected - your core abstractions)
1. `registerGsap()` - 62 edges
2. `useAnimatedStrong()` - 30 edges
3. `useIsLargeViewport()` - 28 edges
4. `BrandText()` - 24 edges
5. `useSvh()` - 23 edges
6. `Sri Comforts Daikin RA split — model specifications` - 22 edges
7. `usePreloader()` - 19 edges
8. `createNotch()` - 17 edges
9. `FeaturesSteps()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AboutFeaturesGrid()` --calls--> `useIsLargeViewport()`  [EXTRACTED]
  src/components/about/AboutFeaturesGrid.tsx → src/hooks/useMediaQuery.ts
- `AboutFeaturesGrid()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/about/AboutFeaturesGrid.tsx → src/lib/gsap/register.ts
- `AboutHero()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/about/AboutHero.tsx → src/lib/gsap/register.ts
- `AboutLeaders()` --calls--> `useIsLargeViewport()`  [EXTRACTED]
  src/components/about/AboutLeaders.tsx → src/hooks/useMediaQuery.ts
- `AboutLogoGrid()` --calls--> `useIsLargeViewport()`  [EXTRACTED]
  src/components/about/AboutLogoGrid.tsx → src/hooks/useMediaQuery.ts

## Import Cycles
- None detected.

## Communities (66 total, 7 thin omitted)

### Community 0 - "useAnimatedStrong"
Cohesion: 0.15
Nodes (14): metadata, SiteHeader(), NotFoundPage(), PathBackground(), usePreloader(), ContactCta(), ContactCtaProps, SolutionsFeaturesCarousel() (+6 more)

### Community 1 - "pathFollower.ts"
Cohesion: 0.14
Nodes (19): AnimatedCardBorder(), AnimatedCardBorderProps, AnimatedPathLine(), AnimatedPathLineProps, registerPathLineRef(), PathLineFollower(), PathLineFollowerProps, applyPathFollower() (+11 more)

### Community 2 - "solutions.ts"
Cohesion: 0.06
Nodes (52): generateMetadata(), Page(), PageProps, generateMetadata(), Page(), PageProps, serviceCarouselImage(), serviceDarkBackground (+44 more)

### Community 3 - "homepage.ts"
Cohesion: 0.08
Nodes (26): buildLogoSlots(), LogoGrid(), LogoWall(), MarqueeRow(), repeatToFill(), getGatherOffset(), StatsBento(), brandDifferenceSection (+18 more)

### Community 4 - "FeaturesSteps.tsx"
Cohesion: 0.06
Nodes (64): AboutFeaturesGrid(), AboutFeaturesGridProps, buildFeatureNotches(), formatFeatureIndex(), buildNotches(), clamp(), easePow2Out(), FeaturesSteps() (+56 more)

### Community 5 - "contact.ts"
Cohesion: 0.09
Nodes (32): ContactArrowIcon(), ContactMap(), ContactWaysCardAction(), ContactWaysCardActionProps, ContactWaysCardBase(), ContactWaysCardBaseProps, ContactWaysCardLink(), ContactWaysCardLinkProps (+24 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (48): ai, @ai-sdk/groq, @ai-sdk/react, eslint, eslint-config-next, gsap, @gsap/react, lenis (+40 more)

### Community 7 - "blog.ts"
Cohesion: 0.10
Nodes (27): generateMetadata(), Page(), PageProps, generateMetadata(), Page(), PageProps, BlogArticlePage(), BlogArticlePageProps (+19 more)

### Community 8 - "ChatWidget.tsx"
Cohesion: 0.08
Nodes (37): lastUserText(), maxDuration, POST(), validateMessages(), formatBrandCopy(), ChatWidget(), LINKABLE_PATH_PATTERN, LINKABLE_PATHS (+29 more)

### Community 9 - "TonnageCalculator.tsx"
Cohesion: 0.08
Nodes (29): FieldProps, formatAdj(), formatTons(), SelectFieldProps, SUN_OPTIONS, TonnageCalculator(), NavDropdownPanel(), NavDropdownPanelProps (+21 more)

### Community 10 - "ProductCatalog.tsx"
Cohesion: 0.06
Nodes (35): categoryLabel(), formatIndex(), ProductCatalog(), renderTitle(), ProductImageZoom(), ProductImageZoomProps, ProjectsCarousel(), AwardsAchievements() (+27 more)

### Community 11 - "AnimatedLogo.tsx"
Cohesion: 0.08
Nodes (35): BRAND_LOGO_SRC, FullLogoProps, LOGO_DISPLAY, LOGO_LOCKUP, LOGO_WORDMARK, LogoIcon, LogoWordmark, WordmarkPaths() (+27 more)

### Community 12 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 13 - "createVideoSequence.ts"
Cohesion: 0.07
Nodes (36): metadata, suisseIntl, HIDDEN_PREFIXES, TonnageCalculatorWidget(), VideoSequence(), VideoSequenceProps, AppPreloader(), getNotchOffset() (+28 more)

### Community 14 - "AboutPage.tsx"
Cohesion: 0.16
Nodes (17): aboutAdvisors, aboutAdvisoryIntro, aboutBrandLogos, aboutBrandPartners, aboutExecutiveLeaders, AboutFeatureItem, aboutFeaturesGrid, AboutFeaturesGridData (+9 more)

### Community 15 - "SiteFooter.tsx"
Cohesion: 0.13
Nodes (14): metadata, metadata, metadata, BlogPage(), BlogPageProps, FullLogo(), TonnageCalculatorPage(), ContactPage() (+6 more)

### Community 16 - "Project Context — sricomforts-nextjs"
Cohesion: 0.12
Nodes (16): 10. Conventions, 11. Quick Hand-off (new chats), 1. Project Summary, 2. Route Map, 3. Architecture, 4. Key Assets, 5. Design System (`src/styles/tokens.css`), 6. Animation Patterns (+8 more)

### Community 17 - "CareerPage.tsx"
Cohesion: 0.18
Nodes (9): metadata, CareerPage(), careerCultureIntro, careerDepartments, careerHero, CareerJob, careerJobBoardHeading, careerJobs (+1 more)

### Community 18 - "useSmoothScroll"
Cohesion: 0.33
Nodes (4): metadata, AboutPage(), useHashScroll(), useSmoothScroll()

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
Cohesion: 0.12
Nodes (12): AboutLeaders(), AboutLeadersProps, AboutLogoGrid(), AboutLogoGridProps, buildLogoSlots(), CrossFlicker(), LogoBorderCell(), LogoBorderCellProps (+4 more)

### Community 26 - "Sri Comforts — Products, Systems & Website Tools"
Cohesion: 0.29
Nodes (6): Cooling systems commonly discussed, Design & delivery capabilities, Free tool: AC Tonnage Calculator, Other resources on the website, Sri Comforts — Products, Systems & Website Tools, What the chatbot should recommend by intent

### Community 27 - "Why Daikin — Sri Comforts recommendation framing"
Cohesion: 0.29
Nodes (6): Daikin India snapshot (from same materials), How Sri Comforts talks about other portfolio brands, Sri Comforts + Daikin, What not to invent, Why Daikin — Sri Comforts recommendation framing, Why Sri Comforts specifies Daikin (from Daikin Solutions 360 materials)

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
Cohesion: 0.19
Nodes (7): FieldConfig, fields, FormReference(), FormReferenceProps, HomePage(), SeparatorNotch(), formSection

### Community 46 - "registerGsap"
Cohesion: 0.13
Nodes (20): BrandText(), QuoteSection(), ScrollIndicatorDesktop(), ScrollIndicatorMobile(), VideoCarousel(), ExpandableCard(), ExpandableCardProps, ServicesFeaturesCarouselExpandable() (+12 more)

### Community 47 - "Sri Comforts Daikin RA split — model specifications"
Cohesion: 0.09
Nodes (22): ATKL — Premium Series (3-Star Inverter), ATKM — Premium Series (5-Star Inverter), FTHT — Hot & Cold Series (3-Star Inverter Heat Pump), FTKC — Standard Series (3-Star Inverter), FTKF — Highest ISEER Series (Premium Inverter), FTKL — Premium Series (3-Star Inverter), FTKM — Premium Series (5-Star Inverter), FTKN — Wi-Fi Series (3-Star Inverter) (+14 more)

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

### Community 54 - "SolutionsPage.tsx"
Cohesion: 0.19
Nodes (10): SolutionsPage(), SolutionsPageProps, SolutionsSectionsGrid(), SolutionsSectionsGridProps, WhiteVariant2Grid(), SolutionsValue(), SolutionGridData, DEFAULT_CONFIG (+2 more)

### Community 55 - "Omni prompts (paste-ready)"
Cohesion: 0.22
Nodes (9): CLIP 1 — Beat 1 opens · “Every space” begins, CLIP 2 — Beat 1 peaks · “Every space” variety, CLIP 3 — Beat 2 opens · “Design” — scan begins on buildings, CLIP 4 — Beat 2 peaks · “Install and service” — scan deepens, CLIP 5 — Beat 3 opens · “Authorized partner” — precision at scale, CLIP 6 — Beat 3 peaks · “South India” — multi-building digital twin, CLIP 7 — Beat 4 opens · “25+ years” — timeless calm begins, CLIP 8 — Beat 4 ends · “Year after year” — blueprint fade (+1 more)

### Community 56 - "NotchSection.tsx"
Cohesion: 0.23
Nodes (9): AboutStoryValues(), AboutStoryValuesProps, lerp(), NotchEdge, NotchSection(), NotchSectionProps, renderTitle(), SectionIntroduction() (+1 more)

### Community 57 - "Post-production pipeline"
Cohesion: 0.29
Nodes (7): 1. Stitch, 2. Export master, 3. Extract WebP frames, 4. Verify frame count, 5. Mobile, 6. Deploy, Post-production pipeline

### Community 58 - "Supabase asset CDN"
Cohesion: 0.29
Nodes (6): Bucket layout, Code, Payload CMS (later), Setup, Supabase asset CDN, Upload assets

### Community 59 - "BackgroundCanvas.tsx"
Cohesion: 0.39
Nodes (7): BackgroundCanvas(), BackgroundCanvasProps, clamp(), lerp(), mod(), THEMES, waveMask()

### Community 60 - "Style stills (approve before video)"
Cohesion: 0.33
Nodes (6): Beat 1 — Every space (cool daylight), Beat 2 — Design → install → service, Beat 3 — Authorized partner, South India, Beat 4 — 25+ years trust, CLI — stills, Style stills (approve before video)

### Community 61 - "Sri Comforts — Hero v2: Solutions Story"
Cohesion: 0.40
Nodes (4): Production, Site, Sri Comforts — Hero v2: Solutions Story, Story ↔ copy

### Community 62 - "Master video (after still approval)"
Cohesion: 0.50
Nodes (4): CLI — desktop master, Continuous master prompt (single clip), Master video (after still approval), Mobile (9:16)

### Community 64 - "Sri Comforts Daikin RA — features, filters, and gaps"
Cohesion: 0.33
Nodes (5): Feature glossary — airflow, comfort, and cleanliness, Feature glossary — efficiency, control, and durability, Special filters glossary, Sri Comforts Daikin RA — features, filters, and gaps, What is not in this catalogue

### Community 65 - "Sri Comforts residential split ACs — Daikin OEM range"
Cohesion: 0.40
Nodes (4): Daikin RA series Sri Comforts supplies, How Sri Comforts talks about AC products, Sri Comforts picks by visitor need, Sri Comforts residential split ACs — Daikin OEM range

## Knowledge Gaps
- **433 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+428 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `registerGsap()` connect `registerGsap` to `useAnimatedStrong`, `homepage.ts`, `FeaturesSteps.tsx`, `AnimatedLogo.tsx`, `createVideoSequence.ts`, `SiteFooter.tsx`, `SolutionsPage.tsx`, `NotchSection.tsx`, `AboutLogoGrid.tsx`, `BackgroundCanvas.tsx`, `AboutHero.tsx`, `TestimonialsSection.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `useAnimatedStrong()` connect `useAnimatedStrong` to `ProductCatalog.tsx`, `AnimatedLogo.tsx`, `HomePage.tsx`, `registerGsap`, `AboutSectionIntro.tsx`, `SolutionsPage.tsx`, `NotchSection.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `useSvh()` connect `SiteFooter.tsx` to `useAnimatedStrong`, `FeaturesSteps.tsx`, `blog.ts`, `HomePage.tsx`, `AboutPage.tsx`, `createVideoSequence.ts`, `CareerPage.tsx`, `useSmoothScroll`, `SolutionsPage.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _433 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pathFollower.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14492753623188406 - nodes in this community are weakly interconnected._
- **Should `solutions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05552617662612375 - nodes in this community are weakly interconnected._
- **Should `homepage.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0766488413547237 - nodes in this community are weakly interconnected._