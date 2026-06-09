# Platform Maturity Scorecard (2026-06-09 Snapshot)

## Overview

| Store | SDK ver | Source files | Tests | Test ratio | CI workflows | Compliance | D1 migrations | Stage |
|-------|---------|:---:|:---:|:---:|:---:|:---:|:---:|-------|
| **FAS** | 0.14.11 | 194 | 81 | 0.42 | 11 | 20 | ~10 | Production |
| **PAS** | 1.16.10 | 293 | 98 | 0.33 | 11 | 42 | 27 | Production |
| **FGS** | 0.14.0 | 119 | 31 | 0.26 | 4 | 38 | — | Post-beta |
| **FWS** | — | 103 | 192 | 1.87 | 7 | — | — | Production |
| **PWS** | — | 135 | 398 | 2.95 | 2 | — | — | Production (pivoting) |
| **FAGS** | 0.1.0 | 354 | 60 | 0.17 | 6 | 9 | — | Early beta |
| **PAGS** | 0.1.0 | 79 | 19 | 0.24 | 4 | 6 | 9 | Early beta |
| **PGS** | 0.1.0 | 112 | 31 | 0.28 | 4 | — | — | Scaffold |

## By dimension

### Test discipline (test ratio = tests / source files)

1. PWS: 2.95 (exceptional)
2. FWS: 1.87 (strong)
3. FAS: 0.42 (adequate)
4. PAS: 0.33 (adequate)
5. PGS: 0.28 (minimal)
6. FGS: 0.26 (minimal)
7. PAGS: 0.24 (weak)
8. FAGS: 0.17 (weak — worst ratio, largest codebase)

### CI/CD maturity (workflow count)

1. FAS: 11 (deploy per-service, smoke, quality, publish, e2e, deprecate)
2. PAS: 11 (same pattern)
3. FWS: 7 (per-service deploys + smoke)
4. FAGS: 6 (deploy-agents, deploy-store, deploy-host, deploy-mcp, ci, publish)
5. FGS: 4 (ci, publish, quality, prod-smoke) — companion repos have own CI
6. PGS: 4 (ci, prod-smoke, publish, quality)
7. PAGS: 4 (ci, deploy-api, deploy-host, publish)
8. PWS: 2 (ci + deploy — compensated by test coverage)

### Compliance enforcement

1. PAS: 42 checks
2. FGS: 38 checks
3. FAS: 20 checks
4. FAGS: 9 checks (agent-specific)
5. PAGS: 6 checks
6. FWS: 0 (baked into agent, not extracted)
7. PWS: 0
8. PGS: 0

### Database schema maturity (D1 migrations)

1. PAS: 27 migrations (users, subscriptions, apps, listings, payouts, domains, webhooks, analytics, services)
2. FAS: ~10 migrations (users, apps, kv, routes, logs, webhooks, roles, invitations)
3. PAGS: 9 migrations (agents, instances, keys, profiles, notifications, analytics)
4. PGS: 0 (auth worker has schema.sql but no migrations in platform)
5. FGS/FWS/PWS/FAGS: manage schema differently (DOs, KV, or separate repos)

## Maturity tiers

### Tier 1: Production (shipping, stable, iterated)
- **FAS** — flagship, 11 CI workflows, 20 compliance checks, real apps live
- **PAS** — most mature SDK (1.16.10), 42 compliance checks, Stripe live
- **FWS** — high test coverage, 108 templates, live AI agent

### Tier 2: Production with caveats
- **PWS** — exceptional tests but mid-architecture-pivot
- **FGS** — 50+ games live but SDK components untested

### Tier 3: Early beta (deployed, working, first users)
- **FAGS** — 53 agents live but weak test coverage
- **PAGS** — marketplace backend works but 0.1.0 SDK

### Tier 4: Scaffold (broken or incomplete)
- **PGS** — CLI fails, no host worker, missing infrastructure
