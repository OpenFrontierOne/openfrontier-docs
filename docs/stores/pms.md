# ProMarketingStore (PMS)

## Status: SCAFFOLDED (planning)

## The Model

AI-powered marketing automation marketplace. Three value streams:

1. **AI Campaign Agent** — autonomous: plan, create, schedule, post, measure, adapt
2. **Creator Marketplace** — marketers offer services (AI-assisted to 10x their capacity)
3. **Prompt Campaigns** — "Launch my SaaS in 30 days" → full execution

## Agent Team

| Agent | Role |
|-------|------|
| PO (Marketing Director) | Understands goals, defines strategy |
| Strategist | Plans channels, timeline, budget, themes |
| Content Creator | Writes platform-specific posts, emails, blogs |
| Scheduler | Picks times, queues via cron, manages calendar |
| Analytics | Tracks, reports, suggests optimizations |

## Autonomous Flow

```
User prompt → Strategy → Content → Schedule → Post → Measure → Adapt → Loop
```

The campaign runs itself. User approves at gates or sets to full-auto.

## Marketplace Services

| Service | AI draft | Human managed | Price |
|---------|----------|--------------|-------|
| 30-day content calendar | Instant | 1 day review | $25-100 |
| Social management (monthly) | Autopilot | Oversight | $99-500/mo |
| Full launch campaign | 2min plan | 2-3 days | $299-999 |
| SEO content (10 posts) | AI draft | Human edit | $100-400 |

## Integrations

X, LinkedIn, Instagram, TikTok, Mailgun/SES, Google Search Console, Plausible.

All via OAuth 2.0 — user connects their accounts, agent posts on their behalf.

## Revenue

- $9/mo subscription (AI agent + scheduling + marketplace access)
- 10% platform fee on marketplace transactions
- Creators set their own prices (min $10)

## Key Differentiator

**Autonomous execution, not just planning.** Every other tool (Buffer, HubSpot, Hootsuite) still requires YOU to create content and hit publish. PMS does it for you. The AI generates, schedules, posts, measures, and adapts — you just set the goal.

## Tech

- CF Workers + D1 + R2 + DOs + Cron Triggers + Workers AI
- OAuth 2.0 for social platforms
- Stripe Connect for marketplace payouts
- Same PAS architecture (agent-teams, tickets, deploy stage)
