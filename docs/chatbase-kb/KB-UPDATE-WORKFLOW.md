# Year-1 knowledge base update workflow

Sri Comforts chat answers come from the markdown files in this folder (`01`–`07` + `SYSTEM-PROMPT.md`). There is no client self-serve Chatbase UI in production.

## How the client requests a change

1. Email the delivery contact with the revised FAQ / fact / wording.
2. Attach a short list of what changed (phone, cities, AMC copy, etc.).
3. Delivery updates the matching file(s) below, regenerates PDFs in `pdfs/` if still needed for archive, and deploys the site.
4. After deploy, the live chatbot uses the new content automatically.

**Typical turnaround:** within the Year-1 complimentary maintenance window (confirm SLA in handoff).

## Files to edit

| Topic | File |
|---|---|
| Company overview | `01-company-overview.md` |
| Contact / escalation | `02-contact-and-escalation.md` |
| Services & AMC | `03-services.md` |
| Solutions by sector | `04-solutions-by-sector.md` |
| FAQ | `05-faq.md` |
| Products & tools | `06-products-and-tools.md` |
| Notable projects | `07-notable-projects.md` |
| Bot behaviour / tone | `SYSTEM-PROMPT.md` |

Do **not** invent prices in the KB. Quote / estimate requests should always escalate to phone or forms.

## Environment

Production needs `GROQ_API_KEY` (and optional `GROQ_MODEL`) set in the host (e.g. Vercel). API usage is billed to the Groq account that owns the key — per proposal, monthly API costs are borne by the client.
