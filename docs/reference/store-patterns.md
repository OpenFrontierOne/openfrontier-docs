# Existing Store Patterns

Quick reference for how existing platform stores work, to inform new store design decisions.

## Store family

| Store | Domain | Content | GitHub Org | Doppler | R2 Bucket |
|---|---|---|---|---|---|
| FAS | freeappstore.online | PWA apps | freeappstore-online | `fas` | `fas-apps` |
| PAS | proappstore.online | Paid apps | proappstore-online | `pas` | — |
| FGS | freegamestore.online | PWA games | freegamestore-online | `fgs` | `fgs-games` |
| PGS | progamestore.online | Paid games | progamestore-online | `pgs` | — |
| FWS | freewebstore.online | One-page sites | freewebstore-online | `fws` | `fws-templates` |
| PWS | prowebstore.online | CMS sites | prowebstore-online | `pws` | `pws-media` |
| **FAGS** | freeagentstore.online | Browser AI tools | FreeAgentStore | `fags` | `fags-agents` |
| **PAGS** | proagentstore.online | Server AI agents | ProAgentStore | `pags` | `pags-agents` |
| **FIS** | freeideastore.serge-the-dev.workers.dev | Idea lab | FreeIdeaStore | `fis` | optional idea bodies/cache |
| **PIS** | proideastore.serge-the-dev.workers.dev | Opportunity dossiers | ProIdeaStore | `pis` | optional dossier assets |

## Standard infrastructure per store

Each store has:

1. **Platform monorepo** — `<org>/platform` on GitHub
   - `packages/sdk` — NPM package for app developers
   - `packages/cli` — NPM package with CLI binary
   - `packages/compliance` — Static analysis checks
   - `packages/backend` — API Worker
2. **Host Worker** — `*.<domain>` → D1 route lookup → R2 serve
3. **Store site** — static HTML built from `registry.json`
4. **Admin Worker** — provisioning (GitHub repo + R2 route + DNS + registry)
5. **Publisher Worker** — self-service publish portal
6. **VibeCode Agent** — AI builder (Durable Object + SSE)
7. **VibeCode UI (Create)** — React SPA for AI builder

## Provision flow (same across all stores)

```
fas publish / fgs publish / fags publish
  ↓
1. Create GitHub repo in org
2. Insert R2 hosting route in D1
3. Create custom domain (CF)
4. Create DNS CNAME
5. Add to registry.json
```

## Free vs Pro patterns

### Pattern A: Superset (FAS→PAS, FGS→PGS)
- Same product architecture
- Pro adds: D1 per app, R2 storage, Workers AI, cron, custom domains, uncapped rooms
- Pro adds: Stripe Connect, creator payouts, license keys
- Pro SDK extends Free SDK

### Pattern B: Different product (FWS→PWS)
- Different architectures sharing brand + auth
- FWS: single-page HTML, AI writes directly
- PWS: knowledge-graph CMS, AI edits typed data
- Share: agent loop, AI providers, auth, SSE streaming

### FAGS→PAGS follows Pattern B
- FAGS: browser-only AI tools (static on R2, models run client-side)
- PAGS: server-powered agents (Workers + D1 + DO + Workers AI)
- Share: auth, design system, brand, CLI patterns, compliance framework

## Key rules (from stores CLAUDE.md)

1. **Vendor, don't depend** — each store copies shared code, no cross-store npm deps
2. **One repo per store named `platform`**
3. **Only provision via admin/publisher API** — never manual `gh repo create`
4. **Push to main = auto-deploy** — no manual deploy commands
5. **Doppler is source of truth** for secrets
6. **Same design system** across all stores (fonts, spacing, dark mode; only accent color varies)
