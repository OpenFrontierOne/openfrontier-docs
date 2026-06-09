# PAS — ProAppStore

**URL:** https://proappstore.online
**Org:** https://github.com/proappstore-online (~28 repos)
**Stage:** Production
**Doppler:** `pas`

## Vision

Paid app marketplace with a single $9/mo subscription. Two categories:

- **Tailored:** Each customer gets a forked, deployed instance (B2B back-office: CRM, invoicing, HR, ATS)
- **Ready:** One shared deployment per publisher, many customers sign up (events, marketplaces, scheduling)

Creators earn from usage-based splits (Spotify model) minus 10% platform fee.

## Architecture

```
pas/platform/          Monorepo (pnpm): 11 packages
├── packages/sdk       @proappstore/sdk v1.16.10
├── packages/cli       @proappstore/cli v2.6.6
├── packages/backend   API worker (Stripe, subscriptions, provisioning, analytics, AI)
├── packages/admin     Provisioning worker
├── packages/host      R2 host worker
├── packages/mcp       MCP server + Agent Teams tools
├── packages/compliance 42 compliance checks
├── packages/data-worker Per-app D1 fronting
├── packages/agent-teams Autonomous build (PO/BA/Dev/QA agents)
├── packages/build-core  Shared build logic
└── packages/kb-host   Knowledge base host
```

## SDK (v1.16.10)

Inherits FAS (auth, kv, counters, rooms, proxy, keys, roles, email, webhooks, log) + Pro additions: db (D1 SQL), subscription (Stripe), license, storage (R2), notifications (web push), sms (Twilio), ai (Workers AI), maps (OSM), tenant() (multi-tenant helpers).

React: useProAuth(), useProSubscription(), useProGate(), ProShell.

## Backend (25+ routes)

Auth, subscription, license, storage, provision, domains, analytics, AI, maps, notifications, SMS, webhooks, keys, secrets, proxy, email, payouts, submissions, connect, services, tools, usage, engagements, logs, payout-cron.

## Infrastructure

- D1: `pas` (27 migrations — richest schema)
- R2: `pas-storage`
- Workers AI: bound as env.AI
- 11 CI workflows
- Stripe live (webhooks, checkout, Connect)

## Compliance (42 checks)

Most comprehensive: all FAS checks + design system adherence, no-brand-overrides, workbox integration, PWA deep checks.

## Gaps

- Backend versioned 0.0.0 (cosmetic)
- No e2e Playwright suite
- Agent Teams undocumented
- Data Worker thin (2 files)

## Strategy (from STRATEGY.md)

Two app categories:

- **Tailored:** Per-customer fork with AI pairing. Best for B2B back-office (CRM, PSA, invoicing, HR, ATS, helpdesk, LMS). CRM is the prototype template.
- **Ready:** One shared deployment, many customers sign up. Best for network/marketplace shapes (events, listings) and coordination tools (scheduling, comms).

Services marketplace emerges naturally from Tailored templates (Salesforce/Shopify Partner pattern, but AI lowers customization floor).

## Future direction

1. D1 provisioning accepts `category` flag for per-fork D1
2. Strip specifics from CRM -> generic `pipeline` Tailored template
3. Storefront filtering (Tailored vs Ready UI)
4. Services block on publisher profiles (test consulting demand before payments)
5. E2e Playwright suite (sign-up -> checkout -> use -> payout)
6. Agent Teams documentation + reliability guarantees
7. Trust signals for Tailored templates (update cadence, security audits)
