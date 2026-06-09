# Free vs Pro Model

Free and Pro stores are **different products**, not feature gates.

## Available on Free (FAS, FGS, FWS, FAGS)

- Static hosting (R2 + host Worker) — unlimited
- GitHub Actions deploy to R2 (one repo per app/game/site/agent)
- Default subdomain (`appname.freeappstore.online`, etc.)
- Identity — sign in with GitHub (FAS/FGS) or Google (PGS)
- Per-user KV storage — 1MB/user, 100 keys, 64KB/value
- WebSocket rooms — 32 peers, 64 rooms/app, 4KB/msg, 24h idle eviction
- Weekly compliance audit + uptime monitoring
- Open source — MIT license required

## Unlocked on Pro (PAS, PGS, PWS, PAGS)

- **Server-side AI** — Workers AI tokens included
- **Custom domain** — bring `your-domain.com`
- **Cron / scheduled workers** — digests, reminders, daily challenges
- **File uploads + R2 storage** — per-app bucket
- **Per-app D1 database** — direct SQL
- **Higher KV** — 10MB/user, no user-count cap
- **Uncapped real-time rooms** — no 32-peer limit
- **Proprietary source allowed** — no MIT requirement
- **Marketplace payouts** — creators earn from subscription pool

## Monetization

Single **$9/mo platform subscription** unlocks every Pro app/game/site/agent. No per-item pricing.

Creators are paid monthly from the subscription pool (minus 10% platform fee) proportional to each subscriber's per-app usage that month (Spotify-style).

## Pattern A vs Pattern B (product relationship)

| Pair | Pattern | Description |
|------|---------|-------------|
| FAS/PAS | B (different products) | PAS adds server-side capabilities (D1, AI, Stripe) that FAS doesn't have |
| FGS/PGS | B (different products) | PGS adds Durable Objects, persistent worlds, server-authoritative state |
| FWS/PWS | B (different products) | FWS = one-page static HTML. PWS = full CMS engine with entities, admin, multi-page |
| FAGS/PAGS | B (different products) | FAGS = browser-only (WebGPU/WASM). PAGS = server-side (Workers AI, D1, cron) |

Growth path: users start on Free, graduate to Pro when they outgrow client-side limits.
