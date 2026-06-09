# Platform Maturity Report (2026-06-07)

## Scorecard

| Store | SDK ver | Source files | Tests | Test ratio | CI workflows | Compliance checks | D1 migrations | Stage |
|-------|---------|:---:|:---:|:---:|:---:|:---:|:---:|-------|
| **FAS** | 0.14.11 | 194 | 81 | 0.42 | 11 | 20 | ~10 | Production |
| **PAS** | 1.16.10 | 293 | 98 | 0.33 | 11 | 42 | 27 | Production |
| **FGS** | 0.14.0 | 119 | 31 | 0.26 | 4 | 38 | — | Post-beta |
| **FWS** | — | 103 | 192 | 1.87 | 7 | — | — | Production |
| **PWS** | — | 135 | 398 | 2.95 | 2 | — | — | Production (pivoting) |
| **FAGS** | 0.1.0 | 354 | 60 | 0.17 | 6 | 9 | — | Early beta |
| **PAGS** | 0.1.0 | 79 | 19 | 0.24 | 4 | 6 | 9 | Early beta |
| **PGS** | 0.1.0 | 112 | 31 | 0.28 | 4 | — | — | Scaffold |

## Per-Store Assessment

### FAS (FreeAppStore) — Production

**Strengths:**
- 11 CI workflows (deploy per-service, smoke, quality, publish, e2e)
- 20 compliance checks enforced on every app
- Real-time primitives (Durable Objects, rooms with caps)
- Enterprise-grade auth (GitHub OAuth, HMAC sessions)
- Automated infra (D1 backups, cron uptime monitoring, weekly compliance audit)
- 194 source files, clean 6-package workspace

**Gaps:**
- SDK still pre-1.0 (0.14.11) despite stable API
- No public CHANGELOG
- No API documentation site

**SDK modules (11):** auth, kv, collections, counters, rooms, proxy, keys, roles, email, log, webhooks
**React hooks:** useAuth, useVoiceInput + 18 UI components

---

### PAS (ProAppStore) — Production

**Strengths:**
- Most mature SDK (v1.16.10, post-1.0 stable)
- 42 compliance checks (most comprehensive)
- 27 D1 migrations (users, subscriptions, apps, listings, payouts, domains, webhooks, analytics)
- 31 backend API routes all tested
- Full marketplace mechanics (Stripe, usage-based payouts, license keys)
- Agent Teams (autonomous PO/BA/Dev/QA agents)

**Gaps:**
- Backend still versioned 0.0.0 (cosmetic)
- No e2e Playwright suite
- Agent Teams undocumented (prompt engineering, reliability)
- Data Worker is thin (2 files)

**Pro SDK additions (9):** db, subscription, license, storage, notifications, sms, ai, maps, tenant

---

### FGS (FreeGameStore) — Post-beta

**Strengths:**
- 38 compliance checks (second-most, game-specific: audio mute, viewport fit)
- 8 diverse game templates (canvas, grid, 3d, cards, phaser, kaplay, pixi, babylon)
- OIDC trusted publishing to npm
- Quality workflow (12-viewport Playwright screencheck)
- 50+ live games

**Gaps:**
- SDK components have ZERO unit tests (GameShell, GameTopbar, useAuth, etc.)
- Only 4 CI workflows in platform (companion repos have their own)
- No API types published for leaderboard/registry shape
- Light CLI test coverage (7 tests for 27 files)

**SDK exports (14):** GameShell, GameTopbar, GameAuth, GameButton, GameModal, GameOverScreen, GameConfirm, GameThemeToggle, GameTextSizeToggle, Leaderboard, useAuth, useLeaderboard, useGameSounds, useSound

---

### FWS (FreeWebStore) — Production

**Strengths:**
- High test coverage (1.87:1 ratio, 192 test assertions)
- 7 CI workflows (per-service deploys + smoke)
- 108 niche templates (programmatic SiteState generators)
- Sub-second deploys via KV writes
- MCP server (18 tools)
- Live and operational

**Gaps:**
- No numbered compliance checks (quality baked into agent, not extracted)
- Agent logic is complex (19 files) but monolithic
- No CHANGELOG or version tracking

---

### PWS (ProWebStore) — Production (Pivoting)

**Strengths:**
- Highest test ratio (2.95:1, 398 tests for 135 source files)
- Sophisticated architecture (DOs with SQLite, knowledge-graph CMS, 25 block types)
- 4 auth methods, rate limiting, HMAC signing
- Entity/relationship modeling
- MCP server (27 tools, OAuth 2.1)

**Architecture pivot decided (2026-06-07):**
- CURRENT: shared monolithic Worker + DO-per-site (sites are data)
- TARGET: per-site repos under prowebstore-online org (like PAS pattern)
- Each site = own GitHub repo, own Worker, own D1, own agent
- Current "church template" work becomes the SDK
- VISION.md and marketing need rewrite

**Gaps:**
- Only 2 CI workflows (lean but sufficient due to test coverage)
- Admin package still stubbed
- Mid-pivot — current architecture is being deprecated

---

### FAGS (FreeAgentStore) — Early Beta

**Strengths:**
- 53 registered agents (largest catalog)
- 58 agent directories in platform
- Store auto-generation pipeline (registry.json -> HTML)
- Key vault system (AES-256-GCM, 6 AI providers)
- 6 CI workflows (deploy-agents, deploy-store, deploy-host, deploy-mcp, ci, publish)

**Gaps:**
- Worst test ratio (0.17 — 354 source files, only 60 tests)
- SDK and CLI both at 0.1.0 (never bumped)
- Many agents are thin heuristic wrappers with zero testing
- Only 9 compliance checks (agent-specific)
- No Leaderboard/ranking for agents

---

### PAGS (ProAgentStore) — Early Beta

**Strengths:**
- Full marketplace backend (subscriptions, per-instance DOs, knowledge bases)
- 10 flagship agents (site-monitor, lead-qualifier, content-pipeline, competitor-intel, support-escalator, data-analyst, meeting-notes, seo-auditor, invoice-parser, email-drafter)
- 20 API routes with RBAC
- 9 D1 migrations (agents, instances, keys, profiles, notifications, analytics)
- WebSocket real-time chat

**Gaps:**
- Low test coverage (19 tests for 79 source files)
- SDK/CLI at 0.1.0
- Only 6 compliance checks
- Creator onboarding workflow missing
- Store HTML hand-coded (not auto-generated from registry)

---

### PGS (ProGameStore) — Scaffold (Broken)

**Strengths:**
- Clean vendored structure from FGS
- 3 Durable Object templates (realtime, turn-based, 3d-persistent)
- All 3 npm packages published via OIDC
- Google OAuth auth worker deployed

**Critical issues:**
- CLI templates reference repos that DON'T EXIST on GitHub → `gas init` fails
- No host worker (games on individual CF Pages, not Path B)
- No admin, console, publisher, leaderboard, or auditor
- No compliance checks
- Only store where developer workflow is completely broken

---

## Top Misalignments

### 1. PGS is broken (P0)
`gas init` fails because template repos (`progamestore-online/template-turn-based`, etc.) don't exist on GitHub. The only store where the developer workflow doesn't work at all.

**Fix:** Push the 3 template directories to GitHub as repos.

### 2. FAS SDK pre-1.0 while PAS SDK is 1.16 (P1)
PAS inherits from FAS. If PAS declares its API stable (1.x), FAS should too. The version gap signals API contract uncertainty to downstream consumers.

**Fix:** Bump FAS SDK to 1.0.0 (the API hasn't broken in months).

### 3. FGS SDK has zero component tests (P1)
GameShell and GameTopbar are used by 50+ live games. A regression cascades instantly to every game on the store.

**Fix:** Add Vitest + React Testing Library for the 10 exported components.

### 4. FAGS has worst test ratio (P2)
354 source files, 60 tests (0.17 ratio). The 53 agents ship with minimal verification. Browser-only code is hard to test, but at minimum each agent should have a smoke test.

**Fix:** Add per-agent smoke tests (import succeeds, core function returns expected type).

### 5. No compliance in FWS/PWS/FAGS/PAGS (P2)
These stores accept user content (websites, agents) without brand/quality enforcement checks. FAS/FGS/PAS enforce 20-42 checks; the others enforce 0-9.

**Fix:** Extract common compliance patterns (no tracking, bundle size, brand fonts) into a shared checklist.

### 6. PWS architecture pivot (P2)
PWS is mid-pivot from monolithic DO-per-site to per-site repos (PAS pattern). Current marketing and VISION.md claim "no deploys" which will be false post-pivot.

**Fix:** Complete the pivot, rewrite VISION.md, update marketing.

---

## Priority Action Plan

### Immediate (unblocks development)
1. Push PGS template repos to GitHub
2. Bump FAS SDK to 1.0.0

### Short-term (quality gates)
3. FGS SDK component tests (GameShell, GameTopbar, hooks)
4. FAGS per-agent smoke tests
5. Common compliance extraction (no-tracking, bundle-size for all stores)

### Medium-term (architecture)
6. PWS pivot execution (per-site repos, SDK extraction)
7. PGS host worker (Path B alignment)
8. PAGS store auto-generation (registry.json -> HTML like FAGS)

### Long-term (polish)
9. FAS/FGS API documentation sites
10. PAS e2e Playwright suite
11. FAGS/PAGS SDK bump past 0.1.0

---

## Store Pairs: Free vs Pro Alignment

| Pair | Free | Pro | Alignment |
|------|------|-----|-----------|
| Apps | FAS (production, 144 repos) | PAS (production, 28 repos) | Good — PAS inherits FAS SDK, both have compliance, both have 11 CI workflows |
| Games | FGS (post-beta, 80 repos) | PGS (scaffold, 14 repos) | **Bad** — PGS is 6+ months behind FGS. No host, no admin, broken CLI |
| Web | FWS (production, 14 repos) | PWS (pivoting, 1 repo) | **Diverging** — different architectures by design, but PWS pivot makes them more similar |
| Agents | FAGS (beta, 52 repos) | PAGS (beta, 11 repos) | Good — both at 0.1.0, FAGS has volume, PAGS has depth |

---

## Dependency Versions (verified 2026-06-07)

| Package | FAS | FGS | PAS | PGS |
|---------|-----|-----|-----|-----|
| hono | 4.12.23 | — | 4.12.23 | — |
| vitest | 4.1.8 | 3.2.4 | 3.2.4 | 3.2.4 |
| typescript | 5.7 | 5.7 | 5.7 | 5.7 |
| wrangler | 4.x | 4.x | 4.x | 4.x |
| pnpm | 10.30.3 | 10.11.0 | 10.30.3 | 10.11.0 |
| biome | 2.x | 2.x | 2.x | 2.x |

**Note:** FGS and PGS still on vitest 3.2.4 (3 critical CVEs). FAS was updated to 4.1.8 on 2026-06-06.
