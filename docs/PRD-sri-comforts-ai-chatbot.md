# PRD — Sri Comforts AI Knowledge Base Chatbot (Custom / Groq)

**Status:** Draft  
**Owner:** Strux / project delivery (kssaiteja)  
**Client:** Sri Comforts (Sri Comfort Air Products & Services)  
**Related contract:** HVAC Website Proposal — Version 3 (Phase 03: AI Knowledge Base Chatbot)  
**Last updated:** 2026-07-15

---

## 1. Summary

This PRD defines a **site-wide AI chatbot** for the Sri Comforts Next.js website. The bot answers visitor questions from an approved **knowledge base** (services, AMC, solutions, contact, FAQ) and steers sales/service leads to phone or forms.

We will **not** depend on Chatbase’s paid plan for production. v1 will be a **custom chat widget + Next.js API route powered by Groq**, using the knowledge docs already prepared under `docs/chatbase-kb/`. This keeps monthly cost low, removes the “Powered by Chatbase” badge, and still fulfills the proposal scope.

---

## 2. Contacts

| Name / Role | Responsibility | Comment |
|---|---|---|
| Delivery lead (Strux) | Spec, build, staging, go-live | Holds this PRD; implements widget + API |
| Sri Comforts commercial owner | Approves copy, KB facts, go-live | Confirms phone, cities, claims that can be quoted |
| Sri Comforts service / sales | Escalation targets for leads | Owns reply SLAs after handoff (outside bot) |
| Client content contact | Future KB updates (via delivery) | Year-1 maintenance path for FAQ changes |

*(Fill real names when assigning.)*

---

## 3. Background

### Context

Proposal Phase 03 promises:

- Chat widget integrated site-wide  
- Knowledge base configuration and document ingestion  
- FAQ training and response tuning  
- Client-facing workflow to update knowledge base content  
- **Monthly API/platform costs borne by the client** (OpenAI, Chatbase, etc. called out as excluded)

A Chatbase bot was created and styled (greeting + suggestion chips). Production Chatbase pricing (~**USD 40/month**) is judged too high for this account relative to expected chat volume.

### Why now

- Website build is near go-live; chatbot is in-scope for the ₹60,000 package.  
- Knowledge base markdown/PDFs already exist (`docs/chatbase-kb/`).  
- Groq offers fast, low-cost inference suitable for FAQ-style traffic.  
- Custom UI matches Sri Comforts branding better (no third-party footer).

### What changed

- Preference shifted from **SaaS chatbot (Chatbase)** → **first-party widget + Groq API**.  
- Chatbase may remain a temporary prototype only; production target is custom.

---

## 4. Objective

### Objective

Ship a **branded, knowledge-grounded AI assistant** on the Sri Comforts site that answers common HVAC / company questions and converts high-intent visitors into calls or form submissions — at **usage-based API cost** instead of a fixed ~$40/mo SaaS fee.

### Why it matters

- Delivers contracted Phase 03.  
- Protects margins on a fixed-price project.  
- Improves brand control (no Chatbase badge).  
- Supports Year-1 complimentary maintenance without a forced SaaS bill.

### Alignment

- Proposal title includes “AI Chatbot”.  
- Matches design-first, service-led brand positioning.  
- Complements existing tools (e.g. AC Tonnage Calculator).

### Key Results (SMART)

| KR | Target | Window |
|---|---|---|
| KR1 — Launch | Custom chat live on production site-wide (except agreed exclusions) | Within chatbot release window (see §8) |
| KR2 — Grounding | ≥ 90% of test-suite answers cite only KB-approved facts (no invented prices) | Pre go-live QA |
| KR3 — Cost | Client API spend ≤ ~USD 5/month at launch traffic (monitor; alert if spike) | First 30 days live |
| KR4 — Handoff | 100% of “quote / breakdown / schedule visit” intents include phone and/or form link | Pre go-live QA |
| KR5 — Update path | Documented process for client to request KB updates (email + file list) for Year 1 | At handoff |

---

## 5. Market Segment(s)

Markets defined by **jobs**, not demographics:

### Primary — Facility / decision visitors

**Job:** Understand if Sri Comforts can solve cooling needs (AMC, install, sector fit) before calling.  
**Constraint:** Limited time; skeptical of sales fluff; need clear next step.

### Secondary — Residential / light commercial browsers

**Job:** Quick answers on process, tonnage help, local service, Daikin/authorized install.  
**Constraint:** Don’t want forms first; will use suggestion chips.

### Tertiary — Existing customers (service)

**Job:** Find how to raise a service request or learn AMC benefits.  
**Constraint:** May need human quickly for outages.

### Out of scope users (v1)

- Internal staff CRM / ticket tooling  
- Voice phone agent  
- Multi-language (beyond English) unless content is later translated  

---

## 6. Value Proposition(s)

### Visitor gains

- Instant answers 24/7 about services, sectors, contact, and process.  
- Clear path to phone / service request / AMC / calculator.  
- Consistent facts (aligned with website copy).

### Pains avoided

- Hunting through multiple pages for AMC vs process vs contact.  
- Waiting for email reply for basic questions.  
- Bot inventing prices or fake city coverage (controlled by grounding rules).

### Client / Sri Comforts gains

- Lead capture path without staffing a live chat desk at launch.  
- Low variable cost vs Chatbase.  
- On-brand UI, no competitor SaaS branding.

### Delivery / agency gains

- Controllable stack inside the Next.js repo already maintained.  
- Reuses prepared KB docs.  
- Fits “client pays API” contract language via Groq key / usage.

### Better than alternatives (for this project)

| Option | Why not preferred now |
|---|---|
| Chatbase paid | ~$40/mo; badge; less brand control |
| Raw Groq with no KB | Hallucinations; brand risk |
| Full custom vector DB + admin CMS | Overkill for v1 timeline/budget |
| Live human chat only | Ops cost; not what proposal sold |

---

## 7. Solution

### 7.1 UX / user flows

**Surface**

- Floating launcher (FAB) site-wide, coordinated with tonnage calculator FAB (no overlap; define corner offset / stacking).  
- Optional hide on: tonnage calculator page, thank-you states (configurable list).

**Open panel (desktop + mobile)**

Inspired by current Chatbase prototype:

1. Header: Sri Comforts mark + “Sri Comforts” + refresh (new chat).  
2. Greeting: e.g. “Hi! What can I help you with?”  
3. Suggestion chips (examples):  
   - “Daikin split installation in Hyderabad?”  
   - “AMC for your AC today”  
   - “Quick Service Options”  
4. Conversation bubbles (bot left / user right).  
5. Input: text + send (voice optional later — **not v1**).  
6. Footer: no third-party “Powered by …” in production.

**Primary flows**

```text
Visitor opens chat
  → Sees greeting + chips
  → Asks question OR taps chip
  → Bot answers from KB (short)
  → If quote / breakdown / visit: bot shows phone + /contact or /services/service-request
  → Visitor continues OR closes

KB insufficient / unsure
  → Bot admits uncertainty
  → Offers phone + contact links
```

**Visual**

- Match Sri Comforts tokens (brand ink / accent — not generic purple SaaS chrome).  
- Accessible focus states; keyboard usable; reduced-motion respectful if site already supports it.

### 7.2 Key features

#### F1 — Knowledge-grounded Q&A

- Bot answers using retrieved chunks from approved sources under `docs/chatbase-kb/` (01–07).  
- System instructions based on `SYSTEM-PROMPT.md` (no invented prices, escalate when needed).  
- Refusals / redirects for quotes, emergencies, account-specific history.

#### F2 — Site-wide widget

- Client component mounted from root layout (alongside existing widgets).  
- Local open/close state; “new chat” clears thread.  
- Suggested prompts configurable in code/data file.

#### F3 — Chat API

- `POST /api/chat` (or equivalent App Router route).  
- Streaming responses preferred for perceived speed.  
- Rate limiting / basic abuse protection (IP or session throttle).  
- Groq API key server-only (`GROQ_API_KEY`).

#### F4 — Escalation & conversion

- Always know primary phone: **+91 40 2700 1342**.  
- Deep links: `/contact`, `/services/service-request`, `/services/amc`, `/resources/ac-tonnage-calculator`.  
- Chip set tuned toward high-intent HVAC intents (install, AMC, service).

#### F5 — Knowledge update workflow (Year 1 — proposal compliance)

Proposal asked for a client-facing update path. v1 interpretation (practical for budget):

1. Client sends revised FAQ / facts by email (or shared drive).  
2. Delivery updates `docs/chatbase-kb/*.md` (and regenerates PDFs if needed).  
3. Deploy → bot picks up new content.  
4. Handoff doc lists exact files and turnaround (e.g. within maintenance window).

**Future (v2):** CMS-editable FAQ collection (e.g. Sanity) without redeploy of copy files.

#### F6 — QA harness (lightweight)

- Checklist of 15–25 golden questions (AMC, address, Daikin, residential sizing, healthcare, “how much does it cost?”, emergency).  
- Pass/fail before production.

#### Explicitly out of scope (v1)

- Live agent takeover / shared inbox  
- Conversation CRM sync  
- Voice input  
- Image upload diagnosis  
- Multi-bot / multilingual  
- WhatsApp channel inside the widget (unless number confirmed later)  
- Autonomous price quoting  

### 7.3 Technology

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js App Router client widget | Matches site (Next 16) |
| API | Route Handler + AI SDK (or thin Groq SDK) | Server-side key |
| Model | Groq-hosted LLM (decide concrete model at impl; prefer fast + cheap) | Document model id in env |
| Retrieval v1 | Chunk + keyword/semantic-lite over local markdown | Good enough for current KB size |
| Retrieval v2 (optional) | Embeddings + vector store | Only if quality gaps appear |
| Storage | Stateless chat (browser memory); optional later persistence | No PII store in v1 |
| Secrets | `GROQ_API_KEY` in Vercel/hosting env | Client pays or reimburses usage |
| Analytics (nice) | Count opens / messages / escalations (privacy-light) | Post-v1 if time |

### 7.4 Assumptions

1. Groq free/paid tier is sufficient for first 90 days of launch traffic.  
2. Client accepts Year-1 KB updates via delivery (email → docs → deploy), not a self-serve Chatbase UI.  
3. English-only answers are acceptable.  
4. Head office phone/address in KB remain correct until client revises.  
5. Case-study % claims in marketing copy should **not** be freely invented by the bot; prefer project names + “contact us for details.”  
6. Floating chat + tonnage FAB can coexist without blocking mobile CTAs.  
7. Chatbase prototype UI is a reference for chips/greeting, not a pixel-mandatory skin.  
8. Proposal language allowing “OpenAI, Chatbase, etc.” also covers Groq as the API vendor.

### Open decisions (track here)

| # | Decision | Options | Owner | Status |
|---|---|---|---|---|
| D1 | Who owns the Groq account/key? | Client account vs agency key + invoice | Delivery + client | Open |
| D2 | Exact Groq model id | e.g. llama / gpt-oss family on Groq | Delivery | Open at impl |
| D3 | FAB corner vs tonnage widget layout | Stack / opposite corners | Delivery | Open |
| D4 | Persist chats? | No (v1) / yes later | Delivery | Default No |
| D5 | Keep Chatbase as fallback? | Off after go-live / dual temporarily | Delivery | Prefer off |

---

## 8. Release

### Effort (relative)

| Phase | Scope | Rough effort |
|---|---|---|
| **R0 — Spec freeze** | This PRD approved + golden question list | 0.5 day |
| **R1 — MVP** | Widget + API + KB retrieval + prompts + escalation | 1–2 days |
| **R2 — Polish** | Branding, mobile, FAB conflict, QA suite | 0.5–1 day |
| **R3 — Handoff** | Env setup, update workflow doc, client walkthrough | 0.5 day |

Total target: **~2–4 working days** from approval to staging-ready, excluding client content delays.

### Versioning

#### v1 (must ship — proposal MVP)

- Site-wide branded widget  
- Groq-backed API with system prompt  
- Knowledge grounding from `docs/chatbase-kb`  
- Suggestion chips + new chat  
- Escalation to phone/forms  
- Rate limit + env-based key  
- Documented KB update process for client  
- QA with golden questions  

#### v1.1 (soon after if needed)

- Analytics counters  
- More chips / sector-specific prompts  
- Better retrieval if miss-rate is high  
- Hide rules for more routes  

#### v2 (future / paid change request)

- CMS-editable knowledge base (true self-serve updates)  
- Lead capture form inside chat (name/phone)  
- WhatsApp deep link (when number confirmed)  
- Conversation logging for sales follow-up  
- Multi-language  

### Dependencies

- Client confirmation of contact facts (phone, cities, WhatsApp if any).  
- Production env var `GROQ_API_KEY`.  
- Staging URL for client tryout.  
- Coordination with existing layout widgets.

### Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Hallucinated prices / cities | Trust / legal | Strict prompt + KB-only answering + QA suite |
| Groq outage / rate limits | Chat down | Friendly error + phone fallback message |
| FAB conflicts with calculator | UX friction | Layout rules + mobile QA |
| Client expects Chatbase self-serve UI | Scope dispute | Clarify Year-1 update process in writing at handoff |
| Abuse / API cost spike | Bill shock | Rate limits + optional daily budget alert |

### Tracking checklist (for you)

- [ ] PRD approved  
- [ ] Golden questions written  
- [ ] D1–D5 decisions closed  
- [ ] Widget UI built  
- [ ] `/api/chat` + Groq wired  
- [ ] KB retrieval wired to `docs/chatbase-kb`  
- [ ] Escalation links verified  
- [ ] Staging QA passed  
- [ ] `GROQ_API_KEY` on production  
- [ ] Client handoff of update workflow  
- [ ] Chatbase removed / not billed  

### Success definition (go-live)

v1 is done when a visitor on production can open the Sri Comforts chat, ask AMC / install / contact questions, get grounded answers, and reach phone or the correct form — **without Chatbase**, and with Groq costs on a usage plan the client accepts.

---

## Appendix A — Source materials

- Proposal: `docs/HVAC Website Proposal - Version 3.pdf` (Phase 03)  
- KB: `docs/chatbase-kb/` (+ PDFs in `docs/chatbase-kb/pdfs/`)  
- System prompt: `docs/chatbase-kb/SYSTEM-PROMPT.md`  
- Site content origins: `src/data/{homepage,about,contact,services,solutions,navigation}.ts`  
- UI reference: Chatbase prototype (greeting + suggestion chips)  

## Appendix B — Suggested golden questions (start list)

1. What does Sri Comforts do?  
2. Where is your office / address?  
3. Phone number?  
4. Do you provide AMC?  
5. How do I raise a service request?  
6. Do you install Daikin / are you authorized?  
7. Do you cover Hyderabad / Bengaluru / Chennai?  
8. Do you do VRF / VRV?  
9. Residential AC — how to size? (expect calculator + caveat)  
10. How much does installation cost? (expect no inventing; escalate)  
11. Healthcare / hospital HVAC?  
12. Server room / IT cooling?  
13. Clean room / cold room?  
14. What is your process / how we work?  
15. 24-hour service promise?  

---

*End of PRD.*
