# ProDesignStore (PDS)

## Status: SCAFFOLDED (planning)

## The Model

AI-powered design marketplace. Three value streams:

1. **AI Design Agent** ��� chat-based, generates logos/kits/templates from prompts
2. **Creator Marketplace** — humans offer design services (AI-assisted)
3. **Prompt Design** — instant AI generation included in subscription

## Agent Team

| Agent | Role |
|-------|------|
| PO (Creative Director) | Understands brief, writes design tickets |
| Designer | Generates SVGs, palettes, layouts, mockups |
| QA (Brand Auditor) | Checks consistency, a11y, formats, guidelines |

## Marketplace Services

| Service | AI draft | Human polish | Price |
|---------|----------|--------------|-------|
| Logo design | 30s | 1-2 days | $15-100 |
| Full brand kit | 2min | 2-3 days | $50-300 |
| Social media pack | 1min | 1 day | $25-150 |
| UI/UX mockup | 1min | 2-5 days | $100-500 |

## Revenue

- $9/mo subscription (AI credits + marketplace access)
- 10% platform fee on marketplace transactions
- Creators set their own prices (min $5)

## Tech

- CF Workers + D1 + R2 + DOs + Workers AI + Stripe Connect
- Same pattern as PAS (agent-teams, ticket lifecycle, deploy stage)
