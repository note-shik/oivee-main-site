# Oivee — n8n Setup Guide

## Prerequisites

- An n8n instance (cloud at app.n8n.cloud or self-hosted)
- SMTP credentials for sending emails
- An Airtable account with a base for CRM

---

## Step 1: Create Credentials

Before importing workflows, set up credentials in n8n:

1. Go to **Credentials** in the left sidebar
2. Create **SMTP** credential (see `credentials_needed.md` for details)
3. Create **Airtable Personal Access Token** credential

---

## Step 2: Set Up Airtable

1. Go to [airtable.com](https://airtable.com) and create a new Base called **"Oivee CRM"**
2. Create a table called **"Leads"** with these columns:

| Column | Type | Options |
|--------|------|---------|
| Name | Single line text | |
| Email | Email | |
| Phone | Phone number | |
| Business Name | Single line text | |
| Message | Long text | |
| Source | Single select | `website`, `whatsapp`, `ads` |
| Status | Single select | `New`, `Contacted`, `Nurture Complete`, `Converted`, `Lost` |
| Created | Date | Include time field |

---

## Step 3: Import Workflows

Import in this order:

### 1. Lead Capture (`lead_capture.json`)
1. Go to **Workflows** → **Import from File**
2. Select `lead_capture.json`
3. Open each node and re-select credentials from the dropdown
4. **Activate the workflow**
5. Copy the webhook URL (click the "Lead Webhook" node → it shows the production URL)

### 2. Lead Nurture (`lead_nurture.json`)
1. Import `lead_nurture.json`
2. Re-select credentials for all Airtable and SMTP nodes
3. Update `YOUR_AIRTABLE_BASE_ID` in the Airtable trigger node
4. **Activate the workflow**

---

## Step 4: Connect to Your Website

1. Copy the webhook URL from the Lead Capture workflow
2. Update your site's `.env.local`:

```env
N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/oivee-lead
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=Leads
```

3. Redeploy the site (or restart the dev server)

---

## Step 5: Test the Flow

1. In n8n, click **"Lead Webhook"** node → **"Listen for Test Event"**
2. Submit a test form on your website (or use curl):

```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook-test/oivee-lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+919999999999","business_name":"Test Co","message":"Testing the flow","source":"website"}'
```

3. Verify:
   - [ ] Webhook receives the data
   - [ ] Airtable record is created in the "Leads" table
   - [ ] Team notification email arrives
   - [ ] Auto-reply email is sent to the lead's address

4. Test the nurture sequence:
   - Check that the Airtable trigger detects the new record
   - For testing, temporarily change wait times to 1 minute each
   - Verify all 3 emails are sent with correct personalization
   - Confirm the lead status updates to "Nurture Complete"

---

## Step 6: Go Live

1. Switch both workflows from test to **production** mode (toggle "Active" on)
2. Replace the test webhook URL in `.env.local` with the production one (remove `-test` from the URL)
3. Update the "from" email in all email nodes to your actual domain email
4. Redeploy the website

---

## Workflow Summary

### Lead Capture Flow
```
Website Form → Webhook → Validate → Airtable (store) + Email (notify team) → Auto-Reply → Respond 200
```

### Lead Nurture Flow
```
New Airtable Record → 5min wait → Email 1 (personal follow-up)
→ 1 day wait → Email 2 (value: common mistake)
→ 2 day wait → Email 3 (case study + CTA)
→ Update status to "Nurture Complete"
```

---

## Troubleshooting

**Webhook returns 404**
→ Make sure the workflow is activated (toggle on)

**Emails not sending**
→ Check SMTP credentials. Gmail requires App Passwords (not regular password). Test the credential in n8n's credential editor.

**Airtable errors**
→ Verify Base ID and table name match exactly. Check that your token has read+write scopes.

**Nurture not triggering**
→ The Airtable trigger polls every minute. New records must appear after the workflow is activated. Check execution logs.
