# Oivee — n8n Credentials Setup

## 1. SMTP (Email Sending)

Used by: `lead_capture.json`, `lead_nurture.json`

| Field | Value |
|-------|-------|
| Host | Your SMTP host (e.g., `smtp.gmail.com`, `smtp.zoho.com`, `email-smtp.us-east-1.amazonaws.com`) |
| Port | `587` (TLS) or `465` (SSL) |
| User | Your email address or SMTP username |
| Password | App password (not your login password) |
| SSL/TLS | Enable |

**Recommended providers:**
- **Zoho Mail** (free for 5 users) — best for `hello@oivee.com` custom domain
- **Google Workspace** — use App Passwords (enable 2FA first)
- **Amazon SES** — cheapest for high volume, requires domain verification

**In n8n:** Go to Credentials → New → SMTP → fill in the above → name it "Oivee SMTP"

---

## 2. Airtable

Used by: `lead_capture.json`, `lead_nurture.json`

| Field | How to get it |
|-------|---------------|
| Personal Access Token | airtable.com/create/tokens → Create token with `data.records:read` and `data.records:write` scopes |
| Base ID | Open your base → Help → API documentation → Base ID starts with `app...` |
| Table Name | `Leads` (create this table in your base) |

**Required table columns:**

| Column | Type |
|--------|------|
| Name | Single line text |
| Email | Email |
| Phone | Phone number |
| Business Name | Single line text |
| Message | Long text |
| Source | Single select (`website`, `whatsapp`, `ads`) |
| Status | Single select (`New`, `Contacted`, `Nurture Complete`, `Converted`, `Lost`) |
| Created | Date (include time) |

**In n8n:** Go to Credentials → New → Airtable Personal Access Token → paste token → name it "Airtable API"

---

## 3. Replace Placeholder IDs

After creating credentials in n8n, update these placeholders in both workflow files:

| Placeholder | Replace with |
|-------------|-------------|
| `AIRTABLE_CREDENTIAL_ID` | Your Airtable credential ID (visible in n8n URL when editing the credential) |
| `SMTP_CREDENTIAL_ID` | Your SMTP credential ID |
| `YOUR_AIRTABLE_BASE_ID` | Your Airtable Base ID (starts with `app...`) |

**Tip:** The easiest way is to import the workflows, then click each node and re-select the credential from the dropdown — n8n will auto-fill the IDs.

---

## 4. Website Environment Variables

After setting up n8n, update your Oivee site's `.env.local`:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/oivee-lead
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Leads
```

---

## 5. Optional Integrations

| Integration | Purpose | How |
|-------------|---------|-----|
| WhatsApp Business API | Send WhatsApp notifications | Add WhatsApp node after "Notify Team" |
| Slack | Team notifications in a channel | Replace or add alongside "Notify Team" with Slack node |
| Google Analytics | Track form conversion events | Already built into the website — just set `NEXT_PUBLIC_GA_ID` |
| Meta Pixel | Track ad conversion events | Already built into the website — just set `NEXT_PUBLIC_META_PIXEL_ID` |
