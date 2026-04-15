-- Oivee leads table
-- Run this in: Supabase Dashboard → SQL Editor → New query

create table if not exists leads (
  id              uuid         primary key default gen_random_uuid(),
  name            text         not null,
  email           text         not null,
  phone           text,
  business_name   text,
  message         text,
  source          text         not null default 'website',
  user_agent      text,
  nurture_sent    boolean      not null default false,
  created_at      timestamptz  not null default now()
);

-- Index for the n8n nurture workflow query (un-nurtured leads)
create index if not exists leads_nurture_sent_idx on leads (nurture_sent, created_at);