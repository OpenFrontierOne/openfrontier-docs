# Action Plan

Prioritized work items from the maturity audit. Reference when asking "what's next?"

## Immediate (unblocks development)

- [ ] **Push PGS template repos to GitHub** — `gas init` is completely broken without them
- [ ] **Bump FAS SDK to 1.0.0** — PAS already declares stable (1.x), FAS should match
- [ ] **Update vitest in FGS/PAS/PGS** — 3.2.4 has 3 critical CVEs (FAS already updated to 4.1.8)

## Short-term (quality gates)

- [ ] **FGS SDK component tests** — GameShell, GameTopbar, useAuth, useLeaderboard (affect 50+ games)
- [ ] **FAGS per-agent smoke tests** — import + core function check for all 53 agents
- [ ] **Common compliance extraction** — no-tracking + bundle-size + brand-fonts as shared baseline for all stores

## Medium-term (architecture)

- [ ] **PWS pivot execution** — per-site repos, SDK extraction from current "church template" work
- [ ] **PGS host worker** — move from individual CF Pages to Path B (R2 wildcard), align with all other stores
- [ ] **PAGS store auto-generation** — registry.json -> HTML (like FAGS, currently hand-coded)
- [ ] **PAS e2e suite** — Playwright tests for sign-up -> checkout -> use app -> payout flow

## Long-term (polish)

- [ ] **FAS/FGS API documentation sites** — published specs for leaderboard, registry, auth
- [ ] **FAGS/PAGS SDK bump past 0.1.0** — iterate based on first user feedback
- [ ] **PGS full infrastructure** — admin, console, publisher, leaderboard, auditor (match FGS)
- [ ] **Cross-store MCP federation** — single MCP endpoint that routes to all stores

## Completed (2026-06-06)

- [x] Cross-store consistency audit — all naming/branding bugs fixed
- [x] Store-level CLAUDE.md files expanded (original 8 platform stores)
- [x] FWS layout restructured (platform at correct level)
- [x] FAGS legacy host/mcp deleted
- [x] PGS storefront renamed to progamestore
- [x] Missing READMEs added (10 files)
- [x] FAS vitest 3.x -> 4.x + hono security update
- [x] FAS Room class observability improvements
- [x] PNG cleanup (49 orphan screenshots removed)
- [x] Stale docs removed (PLATFORM-IMPROVEMENTS.md, PAS working docs)
