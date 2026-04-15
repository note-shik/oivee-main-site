# Oivee — Setup Status & TODO

## Completed

### Phase 1: n8n Workflows
- [x] Lead Capture workflow imported
- [x] Lead Nurture Sequence workflow imported

### Phase 2: CRM / Data Store
- [x] ~~Airtable~~ → **Migrated to Supabase** — Airtable fully removed
- [x] Supabase project created; `leads` table schema applied
- [x] `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` added to env
- [x] `/api/lead` route updated — `saveLeadToSupabase()` is primary store
- [x] n8n updated to email-only (Airtable node removed from Lead Capture workflow)

### Phase 3: SMTP Email
- [x] Gmail App Password created for Oivee
- [x] SMTP credential created in n8n
- [x] Lead Capture — "Notify Team" + "Auto-Reply to Lead" nodes wired
- [x] Lead Nurture — Email 1, Email 2, Email 3 nodes wired

### Phase 4: Tracking (Partial)
- [x] Google Analytics GA4 — Measurement ID: `G-87CN5NDZ9E` (`NEXT_PUBLIC_GA_ID` set)

### Phase 5: Env Vars
- [x] `N8N_WEBHOOK_URL` — `https://note-shik.app.n8n.cloud/webhook/oivee-lead`
- [x] `NEXT_PUBLIC_GA_ID` — `G-87CN5NDZ9E`
- [x] `NEXT_PUBLIC_SITE_URL` — `https://oivee.com`
- [x] `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — set in Vercel + `.env.local`

---

## TODO

### Tracking
- [ ] **Meta Pixel** — create at business.facebook.com/events_manager → get Pixel ID → add as `NEXT_PUBLIC_META_PIXEL_ID` in Vercel env vars and `.env.local`, then redeploy

### n8n Activation
- [ ] **Activate Lead Capture workflow** in n8n (toggle top-right → ON)
- [ ] **Activate Lead Nurture workflow** in n8n
- [ ] Update Lead Nurture trigger — was Airtable-based; rebuild as Supabase webhook or time-based schedule

### Deployment
- [ ] Add `NEXT_PUBLIC_META_PIXEL_ID` to Vercel env vars once Pixel is set up
- [ ] Redeploy to Vercel after env var changes (vars don't apply until redeploy)

### Post-Launch Testing
- [ ] End-to-end lead test: submit form → confirm Supabase row created → confirm team email received → confirm auto-reply received
- [ ] Test nurture sequence: new Supabase lead → Email 1 → (1 day) → Email 2 → (2 days) → Email 3
- [ ] Verify GA4 in Realtime report after form submission
- [ ] Verify Meta Pixel fires on form submission (use Meta Pixel Helper browser extension)

### Nice to Have
- [ ] Fix rate limiting — current in-memory `Map` is per-instance and ineffective on Vercel serverless; replace with Upstash Redis or Vercel KV
- [ ] Custom domain SMTP — send as `hello@oivee.com` instead of Gmail
- [ ] RLS (Row Level Security) on Supabase `leads` table — currently relies on service role key isolation
