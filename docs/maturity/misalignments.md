# Misalignments & Gaps

Things that are out of line or inconsistent across stores.

## Critical (blocks development)

### PGS templates don't exist on GitHub
`gas init` references `progamestore-online/template-turn-based`, `template-realtime`, `template-3d-persistent` — none exist as GitHub repos. The CLI is completely broken for new game creation.

**Fix:** Push the 3 template directories from `pgs/templates/` to GitHub.

## Structural

### FAS SDK pre-1.0 while PAS SDK is 1.16
PAS extends FAS via SDK inheritance. If PAS declares stable (1.x), FAS should too. Current gap signals API uncertainty.

**Fix:** Bump FAS SDK to 1.0.0 — the API hasn't broken in months.

### FGS SDK has zero component tests
GameShell and GameTopbar are used by 50+ live games. A regression cascades to everything.

**Fix:** Add Vitest + React Testing Library for the 10 exported components.

### FAGS has worst test ratio (0.17)
354 source files, only 60 tests. 53 agents ship with minimal verification.

**Fix:** Per-agent smoke tests (import + core function returns expected type).

### No compliance in FWS/PWS/FAGS/PAGS
These stores accept content without brand/quality enforcement. FAS/FGS/PAS enforce 20-42 checks.

**Fix:** Extract common compliance (no-tracking, bundle size, brand fonts) as shared baseline.

### PWS mid-pivot
Current architecture (monolithic Worker + DO-per-site) being replaced with per-site repos (PAS pattern). Marketing site and VISION.md claim "no deploys" — will be false.

**Fix:** Complete pivot, rewrite VISION.md, update marketing.

## Dependency drift

### vitest version split
- FAS: 4.1.8 (updated 2026-06-06, fixes 3 critical CVEs)
- FGS, PAS, PGS: still on 3.2.4 (vulnerable)

**Fix:** Update FGS/PAS/PGS to vitest 4.x.

### pnpm version split
- FAS, PAS, FWS: 10.30.3
- FGS, PGS: 10.11.0

### hono version
- FAS: 4.12.23 (4 CVEs fixed)
- PAS: 4.12.23
- Others: N/A or older

## Naming inconsistencies (resolved 2026-06-06)

All fixed in the cross-store audit:
- PGS `freegamestore-auth` -> `progamestore-auth`
- PGS compliance README `@freeappstore` -> `@progamestore`
- PGS storefront/ renamed to progamestore/
- FAGS legacy host/mcp deleted (canonical: platform/workers/)
- FWS restructured to proper layout (fws/platform/)
