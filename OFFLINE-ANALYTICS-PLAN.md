# Offline Analytics Buffer — Roadmap

A short planning doc for an existing-and-planned platform feature. PAS has it now; PGS will get it when its platform repo is scaffolded.

## What it does

Each PWA's loader script runs an IndexedDB-backed event outbox that captures page-views and custom events while the user is offline. When the device comes back online, the outbox drains via a single batched POST. Each event carries a client-recorded timestamp so it lands on the day it actually happened in the creator dashboard, not the day it was flushed.

For a PWA that gets used heavily offline (a recipe app on the subway, a game on a plane, a notes app in the woods), this is the difference between "your stats undercount real usage by 30-50%" and "your stats reflect reality."

## Where it lives today

| Store | Status | Code |
|---|---|---|
| **PAS** (proappstore.online) | ✅ Shipped | `pas/platform/packages/backend/src/routes/analytics.ts` (server + loader JS). IDB store name `pasA`/`outbox`. Creator-facing API: `window.pasAnalytics.event(kind, props)`. |
| **PGS** (progamestore.online) | 📅 Planned | Will vendor the PAS loader once the org exists and the platform repo is scaffolded. |
| **FAS / FGS** (free tier) | ✅ Shipped, intentional | `fas/platform/packages/backend/src/routes/analytics.ts` has the same buffer code as PAS. **Decision 2026-05-21:** keep on FAS too. Pro's value lives in real-time rooms, the API key vault, custom domains, and the $9/mo payout pool — not in nickel-and-diming analytics fidelity. |

## How it works end-to-end

```
PWA <head>
  └── <script src="https://api.<store>.online/v1/analytics.js?app=<id>" defer>
        └── (response) loader JS, edge-cached 1h
              └── on every page view / SPA route change / custom event:
                  ├── try navigator.sendBeacon(eventBody)   ──┐
                  ├── if offline OR sendBeacon refuses:       │
                  │   └── put event into IDB outbox (max 200) │
                  └── on window 'online' + loader load:       │
                      └── drain outbox → POST {events:[...]}  │
                                                            ──┤
                                                              ▼
                                    /v1/analytics/event (Worker)
                                      ├── drop bots (UA classifier)
                                      ├── per-(app,IP,kind) sample cap (50/10s)
                                      ├── for each event:
                                      │    └── writeDataPoint to Analytics Engine
                                      │        - indexes: [appId]
                                      │        - blobs: [appId, kind, path, refHost, country, uaClass, propsJson]
                                      │        - doubles: [1, client_t_ms]   ◀── original event time
                                      │
                                      └── 204 No Content
```

Stats SQL uses `if(length(doubles) > 1, fromUnixTimestamp64Milli(toInt64(double2)), timestamp)` so replayed events bucket by their original day.

## PGS plan (when the org launches)

PGS games will be PWAs deployed as standalone CF Pages projects, mirroring FGS games. The platform repo `progamestore-online/platform` should follow the PAS layout — including a vendored copy of the analytics route.

**Step list when PGS exists:**

1. **Scaffold `pgs/platform`** following PAS conventions: `packages/{backend,sdk,cli,compliance}`. The `backend/src/routes/analytics.ts` file is a near-verbatim copy of PAS's, with:
   - Dataset name `pgs_app_analytics`
   - IDB outbox name `pgsA`
   - Creator-facing API: `window.pgsAnalytics.event(kind, props)`
   - API base: `https://api.progamestore.online`
2. **D1 migration `0001_app_analytics.sql`** matches the PAS schema (same column shape).
3. **Wrangler bindings**: `[[analytics_engine_datasets]] binding = "ANALYTICS" dataset = "pgs_app_analytics"`, plus the `INTERNAL_TOKEN`, `CF_ANALYTICS_API_TOKEN`, `CF_ACCOUNT_ID` secrets.
4. **Admin Worker step**: extend `fas/admin/src/publish.ts` `STORE_CONFIG` to add `games_pro` with the PGS zone + domain. The existing `provisionCfWebAnalytics()` step picks `BACKEND_PGS` (new service binding) for `req.store === 'games_pro'`.
5. **Game scaffold templates**: when PGS templates are created, they include `<script src="https://api.progamestore.online/v1/analytics.js?app=APPNAME" defer></script>` in `web/index.html` exactly like FAS/FGS/PAS templates do.
6. **In-platform dashboard**: PAS console already has the analytics UI; the equivalent PGS console (when built) can reuse the same `AnalyticsSection` shape, just pointed at `api.progamestore.online`.

**Why this works seamlessly:** the admin Worker is shared (it provisions all stores), the loader script is per-backend (vendored copy), and the dashboard pattern is established (PAS console). Adding PGS is mostly copy-paste-rename plus the migration.

## What we won't do (and why)

- **Service Worker precaching of the loader URL.** Tempting — would let beacons fire even on cold offline launches. But: the loader URL is on a different origin (`api.<store>.online`), Workbox's default glob doesn't cover it, and forcing it adds 4+ hours of staleness when owners change BYO tags. Browser HTTP cache + Worker Cache API already handle 99% of the win at zero coordination cost.
- **Sync the IDB outbox via a service-worker `sync` event.** Background Sync API has spotty support (Chrome/Edge only) and requires SW changes per-app. We get most of the value from the page-load drain + `online` event without it.
- **Encrypted outbox.** Events contain no PII (no IP, no full UA, only path/referrer-host/kind). Encryption at rest in IDB adds complexity for negligible privacy gain.

## Decided 2026-05-21 — Free tier keeps it

Offline buffering stays on FAS + FGS alongside PAS + PGS. Reasoning: it's a small, clean feature that benefits any PWA with sporadic offline use, and Pro's real value lives in real-time rooms, the centralized API key vault, custom domains, AI quotas, and the $9/mo subscriber-pool payouts. Stripping a niche-but-useful piece of plumbing from Free doesn't make Pro feel more valuable; it just makes Free feel worse for the small slice of apps that need it.

The previous version of this doc framed FAS-vs-PAS as an open question. It's not — both tiers get it, by design.

## Source of truth pointers

- PAS shipped version: `pas/platform/packages/backend/src/routes/analytics.ts` (look for `DB_NAME = "pasA"`, `function drain()`, `effectiveTimestamp()`).
- FAS mirror: `fas/platform/packages/backend/src/routes/analytics.ts` (same shape, `"fasA"`).
- Tests: `packages/backend/src/routes/analytics.test.ts` in both — 15 tests in FAS, 4 in PAS (PAS could use more coverage if we keep extending it).
- Workspace memory: `analytics-architecture.md` — the architecture overview.
- Go-live ops: `ANALYTICS-GO-LIVE.md` — deploy steps.
