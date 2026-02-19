-- ============================================
-- VANSLIST DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- TRADES (plumber, electrician, therapist, etc.)
create table public.trades (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text, -- emoji or icon name
  category text, -- "Home Services", "Health & Wellness", etc.
  priority_tier smallint default 3, -- 1, 2, or 3
  is_active boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TASKS (marketing, scheduling, estimating, etc.)
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  sort_order smallint default 0,
  created_at timestamptz default now()
);

-- CONTENT TYPES (prompt, app, workflow, automation, template, skill, stack)
create table public.content_types (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  sort_order smallint default 0,
  created_at timestamptz default now()
);

-- LISTINGS (the core table — every recipe, tool review, prompt, etc.)
create table public.listings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null,
  trade_id uuid not null references public.trades(id),
  task_id uuid not null references public.tasks(id),
  content_type_id uuid not null references public.content_types(id),

  -- Core content
  summary text not null, -- one-liner shown in cards
  description text not null, -- full plain-english explanation
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'needs-tech-person')),
  
  -- LLM compatibility (for prompts/skills)
  llm_compatibility text[] default '{}', -- ['chatgpt', 'claude', 'gemini']
  
  -- Pricing
  cost_display text, -- "$39/mo", "Free", "$199 one-time"
  cost_monthly numeric, -- normalized monthly cost for sorting/filtering
  
  -- For app reviews
  pros text[], -- array of pro points
  cons text[], -- array of con points  
  the_catch text, -- honest "what's the catch" section
  external_url text, -- link to the tool
  
  -- For prompts
  prompt_text text, -- the actual copy-paste prompt
  
  -- For workflows / automations
  steps jsonb, -- [{step: 1, title: "...", description: "...", tool: "..."}]
  
  -- For stacks (references other listings)
  is_stack boolean default false,
  stack_listing_ids uuid[] default '{}',
  stack_total_monthly numeric,
  
  -- Trust & freshness
  is_verified boolean default false,
  last_verified_at timestamptz,
  is_featured boolean default false,
  
  -- SEO
  seo_title text,
  seo_description text,
  
  -- Status
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Unique slug per trade
  unique(trade_id, slug)
);

-- SUBMISSIONS (builder intake form)
create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  tool_name text not null,
  tool_url text,
  description text,
  trades text[], -- which trades it serves
  pricing text,
  submitter_name text,
  submitter_email text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  notes text, -- internal notes
  created_at timestamptz default now()
);

-- INDEXES for fast queries
create index idx_listings_trade on public.listings(trade_id);
create index idx_listings_task on public.listings(task_id);
create index idx_listings_content_type on public.listings(content_type_id);
create index idx_listings_status on public.listings(status);
create index idx_listings_difficulty on public.listings(difficulty);
create index idx_listings_trade_slug on public.listings(trade_id, slug);
create index idx_trades_slug on public.trades(slug);
create index idx_trades_active on public.trades(is_active);

-- ROW LEVEL SECURITY
alter table public.trades enable row level security;
alter table public.tasks enable row level security;
alter table public.content_types enable row level security;
alter table public.listings enable row level security;
alter table public.submissions enable row level security;

-- Public read access for published content
create policy "Public can read active trades" on public.trades for select using (is_active = true);
create policy "Public can read tasks" on public.tasks for select using (true);
create policy "Public can read content types" on public.content_types for select using (true);
create policy "Public can read published listings" on public.listings for select using (status = 'published');
create policy "Anyone can submit" on public.submissions for insert with check (true);

-- UPDATED_AT trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trades_updated_at before update on public.trades
  for each row execute function update_updated_at();

create trigger listings_updated_at before update on public.listings
  for each row execute function update_updated_at();
