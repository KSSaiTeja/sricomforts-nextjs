# Graph Report - sricomforts-nextjs  (2026-08-29)

## Corpus Check
- 159 files · ~2,642,846 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 916 nodes · 1853 edges · 51 communities (43 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dc5133ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- registerGsap
- useMediaQuery.ts
- localPaths.ts
- homepage.ts
- FeaturesSteps.tsx
- ContactPage.tsx
- dependencies
- blog.ts
- ChatWidget.tsx
- SiteHeader.tsx
- ProductCatalog.tsx
- usePreloader
- compilerOptions
- createVideoSequence.ts
- AboutPage.tsx
- AnimatedLogo.tsx
- Project Context — sricomforts-nextjs
- CareerPage.tsx
- AboutLeaders.tsx
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
- solutions.ts
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
- LogoWall.tsx
- VideoCarousel.tsx
- about/page.tsx

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
- `ScrollIndicatorDesktop()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/home/VideoCarousel.tsx → src/lib/gsap/register.ts
- `ContactCta()` --calls--> `useAnimatedStrong()`  [EXTRACTED]
  src/components/shared/ContactCta.tsx → src/hooks/useAnimatedStrong.ts
- `GridHeader()` --calls--> `useAnimatedStrong()`  [EXTRACTED]
  src/components/solutions/SolutionsSectionsGrid.tsx → src/hooks/useAnimatedStrong.ts
- `AboutFeaturesGrid()` --calls--> `useIsLargeViewport()`  [EXTRACTED]
  src/components/about/AboutFeaturesGrid.tsx → src/hooks/useMediaQuery.ts
- `AboutFeaturesGrid()` --calls--> `registerGsap()`  [EXTRACTED]
  src/components/about/AboutFeaturesGrid.tsx → src/lib/gsap/register.ts

## Import Cycles
- None detected.

## Communities (51 total, 8 thin omitted)

### Community 0 - "registerGsap"
Cohesion: 0.07
Nodes (41): metadata, AboutStoryValues(), AboutStoryValuesProps, CrossFlicker(), buildLogoSlots(), LogoGrid(), lerp(), NotchEdge (+33 more)

### Community 1 - "useMediaQuery.ts"
Cohesion: 0.06
Nodes (55): FooterPathBackground(), FooterPathBackgroundProps, getFooterPaths(), AnimatedCardBorder(), AnimatedCardBorderProps, AnimatedPathLine(), AnimatedPathLineProps, registerPathLineRef() (+47 more)

### Community 2 - "localPaths.ts"
Cohesion: 0.09
Nodes (34): generateMetadata(), Page(), PageProps, ServicesPage(), serviceCarouselImage(), serviceDarkBackground, serviceFeatureImage(), buildAmc() (+26 more)

### Community 3 - "homepage.ts"
Cohesion: 0.12
Nodes (19): renderTitle(), SectionIntroduction(), SectionIntroductionProps, HeroPreloadStarter(), brandDifferenceSection, featuresSteps, footerSection, fullscreenFeatures (+11 more)

### Community 4 - "FeaturesSteps.tsx"
Cohesion: 0.07
Nodes (50): AboutFeaturesGrid(), AboutFeaturesGridProps, buildFeatureNotches(), formatFeatureIndex(), buildNotches(), clamp(), easePow2Out(), FeaturesSteps() (+42 more)

### Community 5 - "ContactPage.tsx"
Cohesion: 0.06
Nodes (42): metadata, ContactArrowIcon(), ContactMap(), ContactPage(), ContactWaysCardAction(), ContactWaysCardActionProps, ContactWaysCardBase(), ContactWaysCardBaseProps (+34 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (48): ai, @ai-sdk/groq, @ai-sdk/react, eslint, eslint-config-next, gsap, @gsap/react, lenis (+40 more)

### Community 7 - "blog.ts"
Cohesion: 0.08
Nodes (33): generateMetadata(), Page(), PageProps, metadata, generateMetadata(), Page(), PageProps, metadata (+25 more)

### Community 8 - "ChatWidget.tsx"
Cohesion: 0.08
Nodes (33): lastUserText(), maxDuration, POST(), validateMessages(), ChatWidget(), LINKABLE_PATH_PATTERN, LINKABLE_PATHS, linkify() (+25 more)

### Community 9 - "SiteHeader.tsx"
Cohesion: 0.08
Nodes (29): FieldProps, formatAdj(), formatTons(), SelectFieldProps, SUN_OPTIONS, TonnageCalculator(), NavDropdownPanel(), NavDropdownPanelProps (+21 more)

### Community 10 - "ProductCatalog.tsx"
Cohesion: 0.20
Nodes (15): categoryLabel(), formatIndex(), ProductCatalog(), renderTitle(), filterProductCatalogItems(), PRODUCT_BENTO_IMAGE, PRODUCT_EXPLORE_LABEL, PRODUCT_VIEW_LABEL (+7 more)

### Community 11 - "usePreloader"
Cohesion: 0.11
Nodes (27): metadata, suisseIntl, HIDDEN_PREFIXES, TonnageCalculatorWidget(), applyHeroProgress(), HeroScrollContent(), HeroScrollContentProps, pow2In() (+19 more)

### Community 12 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 13 - "createVideoSequence.ts"
Cohesion: 0.16
Nodes (20): UseVideoSequenceOptions, attachScrollListeners(), countDecoded(), createVideoSequence(), CreateVideoSequenceOptions, FitPosition, getHeroFrameLoadRatio(), getOrCreateSharedState() (+12 more)

### Community 14 - "AboutPage.tsx"
Cohesion: 0.18
Nodes (16): aboutAdvisors, aboutAdvisoryIntro, aboutBrandLogos, aboutBrandPartners, aboutExecutiveLeaders, AboutFeatureItem, aboutFeaturesGrid, aboutHero (+8 more)

### Community 15 - "AnimatedLogo.tsx"
Cohesion: 0.15
Nodes (13): BRAND_LOGO_SRC, FullLogo(), FullLogoProps, LOGO_DISPLAY, LOGO_LOCKUP, LOGO_WORDMARK, LogoIcon, LogoWordmark (+5 more)

### Community 16 - "Project Context — sricomforts-nextjs"
Cohesion: 0.12
Nodes (16): 10. Conventions, 11. Quick Hand-off (new chats), 1. Project Summary, 2. Route Map, 3. Architecture, 4. Key Assets, 5. Design System (`src/styles/tokens.css`), 6. Animation Patterns (+8 more)

### Community 17 - "CareerPage.tsx"
Cohesion: 0.18
Nodes (9): metadata, CareerPage(), careerCultureIntro, careerDepartments, careerHero, CareerJob, careerJobBoardHeading, careerJobs (+1 more)

### Community 18 - "AboutLeaders.tsx"
Cohesion: 0.16
Nodes (9): AboutLeaders(), AboutLeadersProps, LogoBorderCell(), LogoBorderCellProps, ScrollIndicatorMobile(), AboutLeaderItem, AboutLeadersData, useHashScroll() (+1 more)

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

### Community 29 - "solutions.ts"
Cohesion: 0.07
Nodes (31): generateMetadata(), Page(), PageProps, circularDistance(), LoopedItem, TestimonialsSection(), TestimonialsSectionProps, SolutionsFeaturesCarousel() (+23 more)

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
Cohesion: 0.21
Nodes (7): HomePage(), SeparatorNotch(), getGatherOffset(), StatsBento(), sectionIntros, statsBento, StatsBentoItem

### Community 46 - "useHorizontalDragScroll"
Cohesion: 0.24
Nodes (7): ProjectsCarousel(), AwardsAchievements(), projectShowcase, ProjectShowcaseItem, nearestIndex(), useHorizontalDragScroll(), UseHorizontalDragScrollOptions

### Community 47 - "AwardsAchievements.tsx"
Cohesion: 0.27
Nodes (5): AwardsAchievementsProps, AchievementStat, AwardItem, awardsSection, experienceSection

### Community 48 - "LogoWall.tsx"
Cohesion: 0.25
Nodes (6): LogoWall(), MarqueeRow(), repeatToFill(), logoWallIntro, LogoWallItem, logoWallLogos

### Community 49 - "VideoCarousel.tsx"
Cohesion: 0.32
Nodes (6): ScrollIndicatorDesktop(), VideoSequence(), VideoSequenceProps, HERO_FRAMES_VERSION, heroTitles, useVideoSequence()

## Knowledge Gaps
- **274 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+269 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `registerGsap()` connect `registerGsap` to `useMediaQuery.ts`, `FeaturesSteps.tsx`, `SiteHeader.tsx`, `usePreloader`, `HomePage.tsx`, `createVideoSequence.ts`, `AnimatedLogo.tsx`, `VideoCarousel.tsx`, `AboutLeaders.tsx`, `AboutLogoGrid.tsx`, `AboutHero.tsx`, `solutions.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `useSvh()` connect `blog.ts` to `registerGsap`, `localPaths.ts`, `FeaturesSteps.tsx`, `ContactPage.tsx`, `HomePage.tsx`, `AboutPage.tsx`, `CareerPage.tsx`, `about/page.tsx`, `solutions.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `useAnimatedStrong()` connect `registerGsap` to `useMediaQuery.ts`, `homepage.ts`, `ContactPage.tsx`, `ProductCatalog.tsx`, `usePreloader`, `AboutSectionIntro.tsx`, `solutions.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _274 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `registerGsap` be split into smaller, more focused modules?**
  _Cohesion score 0.073224043715847 - nodes in this community are weakly interconnected._
- **Should `useMediaQuery.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05548654244306418 - nodes in this community are weakly interconnected._
- **Should `localPaths.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08974358974358974 - nodes in this community are weakly interconnected._