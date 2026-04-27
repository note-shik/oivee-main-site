# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start dev server at localhost:3000

# Build & production
npm run build
npm run start

# Lint
npm run lint      # next lint (ESLint with Next.js rules)
```

There is no test suite. TypeScript type checking runs as part of `next build`.

## Architecture

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Zod. No state management library — server components by default, `'use client'` only where interactivity is required.

**Path alias:** `@/*` maps to the project root (e.g. `@/lib/content`, `@/components/ui/Button`).

**Note:** The Next.js app lives in the `oivee/` subdirectory of this repo. All `npm` commands and file paths below are relative to `oivee/`.

### Lead capture pipeline

The contact form submits to `/api/lead` (route.ts), which validates with Zod, sanitizes, then:

1. **Primary:** `saveLeadToSupabase()` → writes lead row to the `leads` table in Supabase (blocks — returns 500 on failure)
2. **Secondary:** `sendLeadNotification()` + `sendLeadAutoReply()` via SMTP (`lib/services/email.ts`) — fire-and-forget, in parallel, non-blocking. One email to the owner, one auto-reply to the lead.
3. **Tertiary (deprecated):** `sendToN8N()` — only fires if `N8N_WEBHOOK_URL` is set. Kept as a fallback while migration settles; disable by leaving the env var unset.

Airtable has been removed entirely. n8n is no longer the email path — SMTP is. Any SMTP-compatible provider works (Gmail App Password, Resend, Brevo, etc.) by changing env vars only.

**Rate limiting:** `/api/lead` uses Upstash Redis sliding-window via `lib/rateLimit.ts`. Falls back to allow-all if `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are unset (dev-safe).

### Supabase `leads` table schema

Create this table in your Supabase project (SQL editor):

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  message text,
  source text not null default 'website',
  user_agent text,
  created_at timestamptz not null default now()
);
```

### n8n workflows (`../oivee n8n/oivee/`)

- `lead_capture.json` — originally wrote to Airtable; update it to send emails only (remove the Airtable node, trigger is still the webhook)
- `lead_nurture.json` — was Airtable-triggered; can be rebuilt as a Supabase-triggered or time-based workflow if needed

Both workflow files use placeholder credential IDs (`SMTP_CREDENTIAL_ID`) that must be replaced in the n8n UI after import.

### Content and design system

All site copy, services, case studies, testimonials, and navigation are defined as typed constants in `lib/content.ts`. Edit that file to update any site content — nothing is fetched from a CMS.

Design tokens live in `tailwind.config.ts`. The palette is dark (`brand-black: #0A0A0A`) with gold accents (`brand-gold: #C9A84C`). Headings use `font-heading` (Times New Roman serif); body uses `font-body` (DM Sans via CSS variable `--font-body`).

### Key layout components

- `components/ui/SectionWrapper.tsx` — standard page section container; pass `grain` prop for texture overlay
- `components/ui/LeadForm.tsx` — the single contact form used across the site; accepts `source`, `showBusinessName`, `showMessage` props
- `components/ui/ScrollReveal.tsx` — intersection-observer animation wrapper
- `lib/schemas.ts` — single source of truth for Zod schemas (`leadSchema`, `trackEventSchema`) and their inferred TypeScript types

### Environment variables

See `.env.example` for the full list. Key server-side vars:

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL (`https://xxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only, never expose to client) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials for outbound email. Defaults assume Gmail (`smtp.gmail.com:587` + App Password). |
| `SMTP_FROM` | Display "from" address (e.g. `"Oivee <support@oivee.com>"`) |
| `OWNER_EMAIL` | Inbox to receive new-lead notifications |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate-limit store (free Upstash tier). Optional — falls back to allow-all. |
| `N8N_WEBHOOK_URL` | DEPRECATED — kept only as a fallback path. Leave unset on new setups. |

`NEXT_PUBLIC_*` vars are injected into the client bundle. `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are optional — their script tags are only rendered when the vars are present.

### Deployment

Deployed to Vercel. Project is linked in `.vercel/project.json`. The `vercel.json` at root contains any framework/route overrides. Redeploy after changing env vars in Vercel dashboard — they are not auto-applied to existing deployments.
