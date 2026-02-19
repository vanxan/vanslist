# VansList — AI Tools for Every Trade

## Quick Start

### 1. Create the Next.js project
```bash
npx create-next-app@latest vanslist --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

### 2. Copy these files into your project
Drop the `src/` folder contents, `supabase/` folder, and `.env.local.example` into your new project, replacing defaults.

### 3. Install Supabase client
```bash
cd vanslist
npm install @supabase/supabase-js
```

### 4. Set up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/001_schema.sql`
3. Then run `supabase/002_seed_data.sql`
4. Copy `.env.local.example` to `.env.local` and fill in your Supabase URL and anon key (found in Settings → API)

### 5. Run it
```bash
npm run dev
```

Visit `http://localhost:3000` → click Plumber → see your listings.

## Project Structure

```
src/
  app/
    page.tsx                          # Homepage — trade grid
    layout.tsx                        # Global layout, nav, footer
    globals.css                       # Tailwind imports
    submit/page.tsx                   # Builder submission form
    api/submit/route.ts               # Form handler
    trade/
      [slug]/page.tsx                 # Trade page with filters
      [slug]/[listingSlug]/page.tsx   # Individual listing detail
  components/
    ListingCard.tsx                   # Card component for grid
    TradeFilters.tsx                  # Filter pills (client component)
  lib/
    supabase.ts                      # Client + types
    queries.ts                       # Data fetching functions
supabase/
  001_schema.sql                     # Database tables
  002_seed_data.sql                  # Seed data (tasks, types, plumber listings)
```

## Adding New Trades

1. Insert a new row into the `trades` table
2. Create listings referencing that trade
3. The trade auto-appears on the homepage when `is_active = true`

## Adding New Listings

Insert into the `listings` table with:
- `trade_id` → which trade
- `task_id` → which task category
- `content_type_id` → prompt, app, workflow, etc.
- `status: 'published'` → makes it live

## Content Types

| Type | What it is | Key fields |
|------|-----------|------------|
| Prompt | Copy-paste AI prompt | `prompt_text`, `llm_compatibility` |
| App | SaaS tool review | `pros`, `cons`, `the_catch`, `external_url` |
| Workflow | Multi-step process | `steps` (JSON array) |
| Automation | Set-and-forget | `steps` (JSON array) |
| Template | Ready-made asset | `description`, `external_url` |
| Skill | How-to tutorial | `description`, `steps` |
| Stack | Tool bundle | `is_stack`, `stack_total_monthly` |
