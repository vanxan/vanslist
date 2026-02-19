# VansList — AI Tools for Every Trade

## Quick Start

### 1. Clone and install
```bash
git clone https://github.com/vanxan/vanslist.git
cd vanslist
npm install
```

### 2. Run it
```bash
npm run dev
```

Visit `http://localhost:3000` → click Plumber → see your listings.

## Project Structure

```
src/
  app/
    page.tsx                          # Homepage — trade grid + featured listings
    layout.tsx                        # Global layout, nav, footer
    globals.css                       # Tailwind imports
    ai-for-plumbers/
      page.tsx                        # Trade page with filters
      [slug]/page.tsx                 # Individual listing detail
    apps/page.tsx                     # AI apps directory
    browse/page.tsx                   # Browse trades by category
    leaderboard/page.tsx              # Top-voted listings
    submit/page.tsx                   # Builder submission form
    get-verified/page.tsx             # Verification flow
    sitemap.ts                        # Auto-generated sitemap
    robots.ts                         # Robots.txt config
  components/
    ListingCard.tsx                   # Card component for grid
    TradeCard.tsx                     # Trade category card
    RotatingHero.tsx                  # Animated hero text
    DynIcon.tsx                       # Dynamic Phosphor icon loader
  data/
    listings.ts                      # All listing data
    trades.ts                        # Trade categories + tags
    ai-apps.ts                       # AI apps directory data
    verification.ts                  # Verification check labels
  lib/
    jsonld.ts                        # JSON-LD structured data helpers
```

## Adding New Trades

Add a new entry to the `TRADES` array in `src/data/trades.ts`. It will auto-appear on the homepage and browse page.

## Adding New Listings

Add a new entry to the `LISTINGS` array in `src/data/listings.ts` with the appropriate trade, type, and tags.

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
