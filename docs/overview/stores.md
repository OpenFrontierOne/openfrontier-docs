# The 8 Stores

Four free-pro pairs. Free is always 100% free forever; Pro is a single $9/mo subscription that unlocks everything.

## Apps pair

### FAS — FreeAppStore (freeappstore.online)

PWA apps store. The flagship, most mature platform. 144 repos, ~44 live apps.

- **SDK:** `@freeappstore/sdk@0.14.11` — 11 modules (auth, kv, collections, counters, rooms, proxy, keys, roles, email, log, webhooks)
- **CLI:** `@freeappstore/cli@0.4.23` — init, check, publish, doctor, secrets, proxy, quality, screencheck
- **Companion services:** API, admin, agent (VibeCode), create, console, host, MCP, publisher
- **Compliance:** 20 checks (brand, PWA, bundle size, dark mode, no tracking)
- **Infrastructure:** D1 `fas`, R2 `fas-apps`, 11 CI workflows

### PAS — ProAppStore (proappstore.online)

Paid app marketplace. Extends FAS with server-side features. 28 repos, ~13 live apps.

- **SDK:** `@proappstore/sdk@1.16.10` — inherits FAS + db, subscription, license, storage, notifications, sms, ai, maps, tenant
- **CLI:** `@proappstore/cli@2.6.6`
- **Backend:** 25+ API routes (Stripe, subscriptions, provisioning, analytics, AI)
- **Compliance:** 42 checks (most comprehensive)
- **Marketplace:** $9/mo flat subscription, usage-based creator payouts via Stripe Connect
- **Infrastructure:** D1 `pas` (27 migrations), R2 `pas-storage`, 11 CI workflows

## Games pair

### FGS — FreeGameStore (freegamestore.online)

PWA games store. 80 repos, 50+ live games.

- **SDK:** `@freegamestore/games@0.14.0` — GameShell, GameTopbar, useAuth, useLeaderboard, useScore, useGameSounds
- **CLI:** `@freegamestore/cli@0.2.2` — init (8 templates), check, publish
- **Templates:** canvas, grid, 3d, cards, phaser, kaplay, pixi, babylon
- **Compliance:** 38 checks (game-specific: audio mute, viewport fit, no scroll)
- **Companion services:** admin, agent, auditor (Playwright), auth, console, host, leaderboard, MCP, publisher

### PGS — ProGameStore (progamestore.online)

Paid multiplayer games marketplace. Youngest store. 14 repos, 3 games.

- **SDK:** `@progamestore/games@0.2.1` — vendored from FGS, published via OIDC
- **CLI:** `@progamestore/cli@0.1.3`
- **Templates:** realtime, turn-based, 3d-persistent (Durable Objects)
- **Status:** Scaffold. CLI templates don't exist on GitHub yet. No host worker, no admin.

## Websites pair

### FWS — FreeWebStore (freewebstore.online)

AI-built single-page websites for small businesses. 14 repos.

- **How it works:** User describes business -> AI agent picks from 108 niche templates -> tailors HTML -> deploys to KV in <1 second
- **Tech:** Single-page static HTML with inlined CSS (UnoCSS). No React, no npm, no build step.
- **Platform:** pnpm monorepo (agent, api, create, freewebstore, host, mcp, template-generator)
- **Tests:** 192 (1.87:1 ratio — strong coverage)

### PWS — ProWebStore (prowebstore.online)

AI-operated knowledge-graph CMS for serious business sites. 1 repo.

- **Architecture (current):** Monolithic Worker + DO-per-site. Sites are data inside the system.
- **Architecture (target, decided 2026-06-07):** Per-site repos (like PAS pattern). Each site = own GitHub repo, own Worker, own D1, own agent.
- **Tech:** bun, 25 block types, entity/relationship modeling, 4 auth methods, MCP (27 tools)
- **Tests:** 398 (2.95:1 ratio — exceptional)

## Agents pair

### FAGS — FreeAgentStore (freeagentstore.online)

Browser-based AI tools. 52 repos, 53 registered agents.

- **Types:** Libraries (pure TS, 29), Models (ONNX, 14), Agents (user API key, 5+)
- **Key vault:** AES-256-GCM encrypted user API keys, proxy injection for 6 providers
- **Platform:** packages/{sdk, cli, compliance} + workers/{host, mcp}
- **Store auto-generation:** registry.json -> HTML via build-index.js + build-details.js

### PAGS — ProAgentStore (proagentstore.online)

Server-powered AI agents marketplace. 11 repos.

- **Architecture:** Agent templates (creator) + Agent instances (client, isolated DOs)
- **Agents:** 10 flagship (site-monitor, lead-qualifier, content-pipeline, competitor-intel, support-escalator, data-analyst, meeting-notes, seo-auditor, invoice-parser, email-drafter)
- **Backend:** 20 API routes, Durable Objects for conversation + memory + tasks
- **CLI:** pags init/check/publish, 6 compliance checks
