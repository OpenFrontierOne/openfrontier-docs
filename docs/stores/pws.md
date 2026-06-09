# PWS — ProWebStore

**URL:** https://prowebstore.online
**Org:** https://github.com/prowebstore-online (1 repo)
**Stage:** Production (mid-pivot)
**Doppler:** `pws`

## Vision

AI-operated knowledge-graph CMS for serious business websites. Not Squarespace. Not WordPress. A system where AI is the primary operator — it reads/writes typed CMS data (entities, schemas, relationships), and a built-in block renderer produces HTML.

## Architecture pivot (decided 2026-06-07)

**CURRENT (being deprecated):** Shared monolithic Worker + DO-per-site. Sites are data inside the system.

**TARGET (PAS pattern):** Per-site repos under prowebstore-online org.
- Each site = own GitHub repo, own Worker, own D1, own agent
- Template = project scaffold (not data seed)
- AI agents develop the site further (write code, not just data)
- Custom plugins, integrations, per-site testing
- Current "church template" work (entities, blocks, admin) becomes the SDK

FWS = Squarespace/Wix (one-page static). PWS = WordPress/Umbraco-class CMS.

## Current architecture

```
pws/platform/          Monorepo (bun >= 1.3)
├── packages/worker    CMS engine (agent loop, 25 block renderers, serving, forms, media)
├── packages/shared    Cross-package types + schemas (Zod)
├── packages/cli       Bun CLI (pws admin provision, pws agent chat)
├── packages/client    TypeScript SDK wrapper
├── packages/mcp       MCP server (27 tools, OAuth 2.1)
├── packages/admin     React admin portal (stubbed)
└── packages/marketing Astro marketing site (CF Pages)
```

## Key features

- 25 block types (hero, richtext, features, cards, testimonials, faq, team, pricing_table, form, gallery, entity_grid, etc.)
- Entity/relationship modeling (schemas, records, references, multi-page views)
- 4 auth methods: email+password (PBKDF2), Google OAuth, GitHub OAuth, magic link
- Theme system: CSS custom properties (colors, fonts, radius, shadow, spacing)
- 15+ agent tools for CRUD
- 398 tests (2.95:1 ratio — exceptional)

## Tech

- **bun** (not pnpm — intentional)
- Cloudflare Workers + Durable Objects (SiteDO with SQLite, SessionDO)
- KV render cache (version-keyed, 24h TTL)
- R2 media storage
- D1 for CMS source of truth

## Gaps

- Only 2 CI workflows (compensated by test coverage)
- Admin app still stubbed (Phase 3)
- Mid-pivot — marketing/VISION.md need rewrite
- No compliance checks

## Vision (from VISION.md)

Core principles:
- **The AI is the product.** The template is the starting point. The customer's site is theirs forever.
- **Templates are seeds, not subscriptions.** One-time TemplateBundle at provisioning; no ongoing updates pushed.
- **Admin portal evolves with site.** When AI adds entity types, AI evolves admin too (calendar for events, pipeline for leads — not generic CRUD).
- **AI adapts, platform doesn't.** Customer's AI evolves THEIR site. We don't add features to templates.
- **Guardrails, not limits.** HTML sanitizer, schema validator, block validator, storage caps, rate limiting, CSP nonces.

## Future direction (post-pivot)

1. Complete pivot to per-site repos (each site = GitHub repo + Worker + D1 + agent)
2. Extract SDK from current "church template" work (19 entities, 16 pages, 35 tests)
3. Rewrite VISION.md and marketing (remove "no deploys" claim)
4. 11 template-specific admin portals (blog, restaurant, real estate, etc.)
5. Per-site billing
6. Custom plugin system
7. Multi-tenant (agencies managing multiple client sites)
