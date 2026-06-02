# 01. User Flow Map — Purven Bhavsar Personal Brand

*Frozen planning doc. The skeleton the whole site hangs on. Every page, component, table, and image in the later docs falls out of these journeys.*

**Spine (from reconciliation A1–A3):** this is a **personal brand**, not a services storefront. The differentiator is the identity statement — *"learns complex systems quickly and turns them into practical, working solutions."* Skills are sequenced as one arc: builds practical AI/automation today → heading toward systems & infrastructure at scale (MBA). Primary action across all flows: **Connect / Get in touch**.

---

## A note on audiences (no segment router)

The brief lists 7 audiences in priority order (mentors → professors → recruiters → companies → MBA peers → students → general). They are NOT divergent enough to need a homepage segment router (the Playbook's multi-audience pattern). All of the top three want the *same* thing — evidence of credibility: the story, the projects, the thinking. So the homepage leads with a single credibility-first path rather than splitting. *(A router is on the No-List for v1 — revisit only if a future audience needs a genuinely different path.)*

---

## FLOW 1 — Evaluator → credibility → connect *(primary; serves mentors, professors, recruiters, companies)*
```
Trigger:   A link from LinkedIn/GitHub/resume, a referral, or a search for Purven's name
Steps:     1. Land on Home → read hero (identity statement) + the one-line arc
           2. Scan trust strip (skills-as-evidence, GitHub/LinkedIn links)
           3. Click through to About → read the story (CPUs → HTML → AI automation → MBA)
           4. Open Portfolio → scan projects [TBD content]
           5. Act: Connect (contact form / email / LinkedIn)
Success:   A contact-form submission OR an outbound click to LinkedIn/email/GitHub
Drop-off:  Hero that reads as a freelancer pitch → fixed by leading with identity, not "I help businesses…"
           Empty Portfolio → fixed by honest, specific TBD slots (never faked) + story carrying weight at MVP
Data:      Reads: projects, profile copy. Writes: leads (contact form) — see 06.
```

## FLOW 2 — Peer / mentor → thinking → follow *(serves mentors, MBA peers, students)*
```
Trigger:   Shared Field Note, conversation referral, or curiosity after meeting Purven
Steps:     1. Land on Home or a Field Note directly
           2. Read About (philosophy: "understand how systems work") OR a Field Note
           3. Field Notes index → [empty-state at launch: "Writing soon"]
           4. Act: Connect / follow on LinkedIn / GitHub
Success:   Outbound follow click (LinkedIn/GitHub) OR contact submission
Drop-off:  An empty blog that looks broken → fixed by an honest, designed empty-state (not a hollow section)
Data:      Reads: field_notes (none at launch), profile copy. Writes: leads (if they connect).
```

## FLOW 3 — Recruiter → quick scan → resume + contact *(serves recruiters, companies)*
```
Trigger:   Resume link, job-application context, LinkedIn profile click-through
Steps:     1. Land on Home → identity in <5 seconds
           2. About → Experience section [TBD content] + Skills arc
           3. Download / view resume (PDF link) OR scan Portfolio
           4. Act: Connect (contact form) — primary CTA
Success:   Resume view/download OR contact-form submission
Drop-off:  Can't find "how to reach him" → fixed by a persistent Connect CTA in nav + footer + a dedicated /contact page
Data:      Reads: profile copy, resume asset. Writes: leads.
```

## FLOW 4 — General visitor → orient → leave informed *(serves students, general)*
```
Trigger:   Social share, search, word of mouth
Steps:     1. Land on Home → understand who Purven is and what he does
           2. Optionally explore About / one project
           3. Leave (no forced conversion) — brand impression is the goal
Success:   Time on About/Home + any secondary click (a soft win for a brand-building goal)
Drop-off:  Jargon-heavy or salesy copy → fixed by the plain-spoken voice (doc 04)
Data:      Reads only. No write.
```

---

## FLOW 5 — Admin → log in → manage content *(serves Purven only; authenticated app, PART 7)*
```
Trigger:   Purven wants to add/edit a project, write a Field Note, manage categories, or swap the resume
Steps:     1. Go to /admin → not logged in → redirected to /admin/login
           2. Log in (email + password, single admin — doc 06)
           3. Admin dashboard → pick an area:
                - Projects: create / edit / delete · set draft/published · upload cover · pick category
                - Field Notes: create / edit / delete (rich-text OR Markdown) · cover · category · draft/published
                - Categories: create / delete (per kind: project | field_note)
                - Resume: upload a new PDF → public link updates automatically
           4. Save → content is live (published items appear publicly; drafts stay private)
Success:   A published change is visible on the public site without a code deploy
Drop-off:  n/a (internal tool) — but a FAILED save must show a clear error, never silently lose work
Data:      Reads/writes: projects, field_notes, categories, resume (+ storage). Reads: leads inbox. See 06.
Security:  A logged-OUT visitor reaching /admin or any write endpoint must be DENIED (doc 06 RLS + doc 10 gate)
```

---

**Done-when check:** every page in 03b (public **and** `/admin/*`) appears in at least one flow above. **Write paths:** the public contact form → `leads` (insert-only); the admin → `projects`/`field_notes`/`categories`/`resume` (admin-only). The positioning differentiator (identity statement) is exercised in Flow 1 step 1 and Flow 2 step 2. **No invented content:** Portfolio and Field Notes launch with honest empty-states and are filled live via Flow 5 (the admin panel) — placeholders, not fabrication. Flow 5 is the authenticated surface; its security is gated in doc 06 (RLS) and doc 10 (denial test).
