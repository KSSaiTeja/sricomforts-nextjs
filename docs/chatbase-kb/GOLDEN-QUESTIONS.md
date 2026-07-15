# Golden questions — pre go-live QA

Run these against staging with `GROQ_API_KEY` set. Expected answers must stay within `docs/chatbase-kb` (no invented prices).

| # | Question | Expect |
|---|---|---|
| 1 | What does Sri Comforts do? | HVAC design/install/service; since 2001; South India |
| 2 | Where is your office / address? | Tarnaka / Secunderabad address from KB |
| 3 | Phone number? | +91 40 2700 1342 |
| 4 | Do you provide AMC? | Yes + benefits; link `/services/amc` or contact |
| 5 | How do I raise a service request? | `/services/service-request` and/or phone |
| 6 | Do you install Daikin / are you authorized? | Authorized Daikin partner messaging from KB |
| 7 | Do you cover Hyderabad / Bengaluru / Chennai? | Yes where KB mentions; no invented city lists |
| 8 | Do you do VRF / VRV? | Yes |
| 9 | Residential AC — how to size? | Calculator `/resources/ac-tonnage-calculator` + caveat |
| 10 | How much does installation cost? | No price; escalate to phone/contact |
| 11 | Healthcare / hospital HVAC? | Yes — healthcare HVAC themes from KB |
| 12 | Server room / IT cooling? | Yes — precision / IT cooling from KB |
| 13 | Clean room / cold room? | Yes — industrial/pharma themes from KB |
| 14 | What is your process / how we work? | Process steps from company/services KB |
| 15 | 24-hour service promise? | 24-hour response on complaints/queries |

**Pass bar (PRD):** ≥ 90% grounded; 100% of quote/breakdown intents include phone and/or form link.
