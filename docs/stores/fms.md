# FreeMarketingStore (FMS)

## Status: LIVE

| Field | Value |
|-------|-------|
| URL | freemarketingstore.pages.dev |
| GitHub | `serge-ivo/freemarketingstore-platform` |
| Tools | 21 |
| Theme | Light |
| Accent | TBD (energetic — orange/electric blue) |
| Deploy | CF Pages (GitHub Actions) |
| AI | User's own OpenAI key (opt-in) |

## Overview

Marketing tools that run in the browser. Campaign planning, social media content, SEO analysis, content creation. No signup, no word limits, no trials that expire. Part of [Open Frontier](https://openfrontier.one).

## Categories (4)

| Category | Count | Path | Description |
|----------|-------|------|-------------|
| Campaigns | 7 | `/campaigns/` | Planning, testing, tracking, launch checklists |
| Content | 6 | `/content/` | AI writing, headlines, personas, customer journeys |
| SEO | 4 | `/seo/` | Keywords, domains, meta tags, competitor analysis |
| Social | 4 | `/social/` | Post generation, scheduling, hashtags, bios |

## Campaign Tools (7)

| Tool | Description | Lines |
|------|-------------|-------|
| A/B Test Calculator | Statistical significance, confidence intervals, sample size calculator | - |
| Campaign Planner | Step wizard: goal, audience, channels, timeline. Pre-built templates. Export markdown | 599 |
| Content Calendar | Visual monthly calendar with drag-and-drop. Color-coded by platform. Export JSON/CSV | 850 |
| Launch Checklist | Pre-launch, launch day, post-launch. 5 templates. Track progress, export markdown | 454 |
| Pricing Page Generator | Build 2-4 tier pricing. Cards/table/slider layouts. Export HTML | 426 |
| SWOT Analysis | Strengths, Weaknesses, Opportunities, Threats. Auto-generate strategic actions | - |
| UTM Link Builder | Build tracked URLs. Platform presets, QR code, history. Copy to clipboard | - |

## Content Tools (6)

| Tool | Description | Lines |
|------|-------------|-------|
| AI Content Writer | Full article generation using user's own OpenAI API key. Multiple tones, SEO optimization | 1563 |
| Customer Journey Mapper | Touchpoints, emotions, opportunities across awareness/consideration/decision stages | - |
| Email Subject Line Tester | Score subject lines, predict open rates, compare variants | - |
| Headline Tester | A/B compare headlines, predict CTR, emotional analysis | 824 |
| Persona Builder | Demographics, psychographics, pain points, goals. Export as card | - |
| Value Proposition Canvas | Jobs-to-be-done, pains, gains mapped to product features | 379 |

## SEO Tools (4)

| Tool | Description | Lines |
|------|-------------|-------|
| Competitor Audit | Analyze any URL for SEO signals, tech stack, content structure | - |
| Domain Finder | Chrome AI + 34 TLD options, availability check simulation, brandability scoring | 1010 |
| Keyword Planner | Keyword suggestions, search volume estimates, difficulty scoring | - |
| Meta Generator | Title + description optimizer, character counts, SERP preview | - |

## Social Tools (4)

| Tool | Description | Lines |
|------|-------------|-------|
| Bio Generator | Platform-specific bios (X, LinkedIn, IG), tone options | - |
| Hashtag Research | Trending hashtags, niche suggestions, competitor analysis | - |
| Post Generator | 30+ templates for X, LinkedIn, IG. Tone control, emoji options, copy to clipboard | 762 |
| Social Scheduler | Visual weekly schedule, optimal posting times by platform | 499 |

## Technical Architecture

- **Single HTML files** — same pattern as simulation stores. No build, no dependencies
- **AI via user's key** — AI Content Writer uses the user's own OpenAI API key (entered in the tool, stored in localStorage). No server costs for the platform
- **Chrome AI** — Domain Finder uses Chrome's built-in AI (Gemini Nano) for name brainstorming
- **Light theme** — marketing people expect dashboards, not terminals
- **No API integrations on free** — all tools are planning/generation only. Actual posting/measurement requires Pro

## Key Technical Highlights

- AI Content Writer: 1563 lines, supports blog posts, social copy, emails, product descriptions. User enters their own OpenAI key. Includes tone selection, word count target, SEO keyword injection
- Domain Finder: 1010 lines, Chrome AI integration for creative suggestions, checks 34 TLDs, scores brandability, pronounceability, memorability
- Content Calendar: 850 lines, full drag-and-drop with month/week views, color-coded by platform (X=blue, IG=pink, LinkedIn=navy), export to JSON/CSV

## Pro Tier: ProMarketingStore (PMS)

| Field | Value |
|-------|-------|
| URL | promarketingstore.pages.dev (scaffolded) |
| Architecture | Console + Campaigns + Marketplace + Backend |
| Packages | `agent-teams`, `backend` (D1 + Workers), `sdk` |

### What Pro adds:

- **AI Campaign Agent** — autonomous: plan, create, schedule, post, measure, adapt
- **Marketer Marketplace** — hire humans for managed campaigns ($29-999/project)
- **Social integrations** — OAuth to X, LinkedIn, IG, TikTok for actual posting
- **Cron scheduling** — Workers schedule posts at optimal times
- **10% platform fee** on marketplace transactions
- **Agent team:** Marketing Director (PO) + Strategist + Content Creator + Scheduler + Analytics

### Current state:

- Console page (HTML): campaign management dashboard
- Campaigns page: active campaign overview
- Marketplace page: browse/hire marketers
- Backend: `schema.sql` (D1), `wrangler.toml`, src scaffolded
- `agent-teams/`: 5-agent pipeline (src scaffolded)

## Positioning

"The marketing toolkit that's actually free. Plan campaigns, write copy, research SEO, build personas. No signup, no word limits, no trial that expires."

## Contributing

One HTML file per tool. Follow the existing pattern in the platform repo.
