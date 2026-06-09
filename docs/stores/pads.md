# ProAdStore (PADS)

## Status: PLANNING

## The Model

AI-powered advertising automation platform. You describe your product and goal — the agent plans, creates, launches, optimizes, and reports on your ad campaigns across every platform. $9/mo.

Three value streams:

1. **AI Ad Agent** — autonomous campaign management: strategy, creative generation, audience targeting, bid optimization, performance reporting, creative refresh
2. **Creator Marketplace** — media buyers and ad specialists offer services (AI-assisted to 10x their throughput)
3. **Prompt Campaigns** — "Sell 100 units of my SaaS this month with $500 budget" — full execution

## What Free Can't Do (Why Pro Exists)

FreeAdStore tools are self-contained browser apps — no API connections, no accounts, no live data. They help you **plan and create** ads. ProAdStore **runs** them.

| Capability | Free (FADS) | Pro (PADS) |
|-----------|-------------|------------|
| Write ad copy | In-browser generator | AI writes + tests + iterates based on live performance |
| **Generate ad images** | **Procedural: smart templates + Canvas API = 6 variants from a description** | **AI-generated: "latte in morning light" = real photographic ad image via Workers AI** |
| Preview ads | Static mockup | Live preview from connected ad account |
| Budget planning | Calculator with estimates | Real spend tracking, auto-pacing, budget reallocation |
| Audience targeting | Audience builder tool | Connected to live platform data, lookalike sync |
| A/B testing | Sample size calculator | Actually runs tests, picks winners, kills losers |
| Reporting | Manual input dashboard | Auto-pulls data from all platforms, unified dashboard |
| Creative refresh | Manual | AI detects fatigue, generates new creative, swaps automatically |
| Compliance | Policy checker | Pre-submission review + auto-fix before ad goes live |

### AI Image Generation (Pro)

The killer Pro feature. Advertisers describe what they want:

- "A Facebook ad for my coffee shop showing a steaming latte on a rustic wooden table, warm morning light, cozy atmosphere"
- "LinkedIn ad for our B2B SaaS — clean, professional, blue tones, showing a dashboard on a laptop"
- "Instagram Story for our fashion brand — model wearing our new summer collection, bright and colorful"

The AI generates the actual image. Not a template — a real, unique image. Using Workers AI (Stable Diffusion XL or equivalent) with ad-specific fine-tuning:

- Understands ad dimensions and safe zones (text areas, CTA placement)
- Generates at exact platform dimensions (1080x1080, 1200x628, etc.)
- Leaves space for headline/CTA overlay
- Matches brand color palette if provided
- Generates 4 variants per prompt for A/B testing
- Auto-applies text overlay, CTA button, brand logo after generation

**Prompt enhancement**: The AI ad agent rewrites the user's casual description into an optimized image generation prompt (adding lighting, composition, style terms).

## Agent Team

| Agent | Role |
|-------|------|
| PO (Ad Director) | Understands product + goal, defines campaign strategy |
| Media Planner | Picks platforms, allocates budget, defines audience |
| Creative Director | Generates ad copy + visuals, manages variants |
| Bid Manager | Sets bids, monitors pacing, optimizes cost per result |
| Analytics | Tracks conversions, calculates ROAS, generates reports |
| QA (Compliance) | Checks policy before submission, flags issues |

## Autonomous Flow

```
User prompt → Strategy → Creative → Target → Launch → Monitor → Optimize → Report → Loop
     |             |          |         |         |          |           |          |
   "Sell my    Platform   Copy +    Audience   Go live   Watch      A/B test   Weekly
    SaaS to    selection  images   segments    on Meta   metrics    winners    PDF to
    devs"      + budget   + video  + lookalike + Google  + pacing   + refresh  inbox
```

The campaign runs itself. User approves at gates or sets to full-auto.

## Platform Integrations

| Platform | API | What it does |
|----------|-----|-------------|
| Meta Ads | Marketing API | Create campaigns, manage budgets, pull reports |
| Google Ads | Ads API | Search + Display + Shopping + YouTube campaigns |
| LinkedIn Ads | Campaign Manager API | B2B targeting, Sponsored Content |
| TikTok Ads | Marketing API | In-feed, TopView, Spark Ads |
| X/Twitter Ads | Ads API | Promoted content, trends |
| Amazon Ads | Advertising API | Sponsored Products/Brands/Display |
| Pinterest Ads | Ads API | Shopping pins, idea pins |
| Snapchat Ads | Marketing API | Story ads, collection ads |
| Reddit Ads | Ads API | Promoted posts, community targeting |

All via OAuth 2.0 — user connects their ad accounts, agent manages on their behalf. Platform tokens stored encrypted (AES-256-GCM), same vault pattern as FAGS key vault.

## Marketplace Services

| Service | AI draft | Human managed | Price |
|---------|----------|--------------|-------|
| Campaign setup (1 platform) | Instant | 1 day review | $25-100 |
| Multi-platform launch | 2min plan | 2-3 days | $100-500 |
| Monthly ad management | Autopilot | Weekly oversight | $199-999/mo |
| Creative pack (20 variants) | 1min | 1 day polish | $50-200 |
| Ad audit + optimization | 5min analysis | 2 day report | $75-300 |
| Landing page + campaign | 2min draft | 2-5 days | $150-600 |

## Revenue

- $9/mo subscription (AI agent + scheduling + connected accounts + marketplace access)
- 10% platform fee on marketplace transactions
- Creators (media buyers, ad specialists) set their own prices (min $10)
- No per-platform surcharge — one subscription covers all platforms

## Key Differentiators

1. **Autonomous execution.** Every other tool (AdCreative.ai, Smartly.io, Revealbot) still requires you to create and manage. PADS does it for you.
2. **Cross-platform unified.** One agent manages Meta + Google + LinkedIn + TikTok instead of logging into 5 dashboards.
3. **$9/mo vs $99+/mo.** Competitors charge $99-500/mo. We're 10x cheaper because AI does the work, not humans.
4. **Marketplace for complex work.** When AI isn't enough, real media buyers are one click away — AI-assisted so they're faster and cheaper.

## Tech

- CF Workers + D1 + R2 + DOs + Cron Triggers + Workers AI
- OAuth 2.0 for all ad platform APIs
- Stripe Connect for marketplace payouts
- Same PAS architecture (agent-teams, ticket lifecycle, deploy stages)
- Encrypted credential vault for ad platform tokens
- Cron workers for: budget pacing, creative fatigue checks, daily reports, bid adjustments

## Competitive Landscape

| Tool | Price | What it does | Our advantage |
|------|-------|-------------|---------------|
| AdCreative.ai | $29-149/mo | AI creative generation | We also run campaigns, not just create |
| Smartly.io | Enterprise | Cross-platform automation | $9/mo vs enterprise pricing |
| Revealbot | $99-399/mo | Meta/Google automation | 10x cheaper, more platforms |
| Madgicx | $44-399/mo | Meta AI optimization | Cross-platform, not Meta-only |
| WordStream | $49-299/mo | Google Ads management | More platforms, AI-native |
| Optmyzr | $208-998/mo | Google/Microsoft Ads | 20x cheaper |
| Skai (Kenshoo) | Enterprise | Enterprise ad management | SMB-accessible |

**Positioning:** "Your $9/mo AI ad agency. Runs your campaigns on every platform. No minimums, no contracts, no agencies needed."
