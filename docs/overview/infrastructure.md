# Infrastructure

All stores run on Cloudflare's edge platform. Secrets managed in Doppler.

## OFO umbrella

OFO is the umbrella site over all stores.

| Surface | Local path | Deployment |
|---|---|---|
| Public OFO website | `landing/` | `openfrontier.pages.dev` |
| Platform knowledge base | `docs/` | `openfrontier-docs.pages.dev` |

`OpenFrontierOne` is the GitHub org for the OFO umbrella itself. Store repos stay in their existing store orgs unless a specific repo migration is explicitly requested.

## Hosting: Path B (R2)

Every store uses the same pattern:
1. App/game/site/agent source lives in its own GitHub repo
2. Push to main triggers GitHub Actions
3. Actions build -> upload to R2 bucket
4. Host Worker serves via wildcard subdomain (D1 route lookup -> R2 stream)

One host worker scales to thousands of subdomains without per-item CF Pages provisioning.

## Per-store infrastructure

| Store | D1 database | R2 bucket | Host worker | Doppler project |
|-------|-------------|-----------|-------------|-----------------|
| FAS | `fas` | `fas-apps` | `freeappstore-host` | `fas` |
| FGS | `fas` (shared, zone column) | `fgs-games` | `freegamestore-host` | `fgs` |
| PAS | `pas` | `pas-storage` | `proappstore-host` | `pas` |
| PGS | `pgs-auth` | — (CF Pages still) | — (missing) | `pgs` |
| FWS | — | `fws-templates` | `fws-host` (KV-based) | `fws` |
| PWS | `pws-platform` | `pws-media` | Built into worker | `pws` |
| FAGS | `fags` | `fags-agents` | `fags-host` | `fags` |
| PAGS | `pags` | `pags-agents` | `pags-host` | `pags` |

## Secrets (Doppler)

- **Source of truth** for all infra secrets
- 8 projects (one per store), each auto-syncs to its GitHub org
- Worker secrets need both Doppler AND `wrangler secret put`
- GitHub rejects `GITHUB_*` names — use `GH_*` or `OAUTH_*`
- Full inventory: `~/dev/stores/SECRETS.md`

```bash
doppler secrets --project <store> --config prd              # list
doppler secrets set KEY=value --project <store> --config prd # set
doppler secrets get KEY --project <store> --config prd --plain | ... # get (pipe only)
```

## Package managers & tooling

| Tool | Standard | Exception |
|------|----------|-----------|
| Package manager | pnpm 10.x | PWS uses bun |
| Linter | Biome 2.x | All stores |
| Test framework | Vitest 4.x | FGS/PGS still on 3.x |
| TypeScript | 5.7+ | All stores |
| Worker runtime | Wrangler 4.x | All stores |
| Node | >=22 | All stores |

## CI/CD

Push to main = auto-deploy. No manual deploy commands ever needed.

Each platform monorepo has GitHub Actions workflows for:
- CI (typecheck, lint, test)
- Deploy per-service (backend, admin, host, agent, MCP)
- Publish to npm (OIDC trusted publishing, no stored tokens)
- Quality/smoke tests
