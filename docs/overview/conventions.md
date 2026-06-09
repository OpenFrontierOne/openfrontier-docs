# Cross-Store Conventions

What's standardized. Full reference: `~/dev/stores/PLATFORM-LAYOUT.md`.

## OFO first

Open Frontier One (OFO) is the umbrella over the stores. The OFO public website lives in `landing/`; the knowledge base lives in `docs/`.

Requests about "OFO", "Open Frontier", or the "umbrella site" mean the umbrella website/docs by default. They do not imply moving store repositories or changing remotes.

## Enforced

1. **One repo per store named `platform`** at `<store>-online/platform` on GitHub
2. **No cross-store npm dependencies.** Shared code is vendored (copied), not imported
3. **Admin Worker per store.** Each store owns its provisioning — no cross-store delegation
4. **Local layout:** `~/dev/stores/<store>/<repo>/` with platform/ as the monorepo
5. **Vendor-copy for cross-store learning.** Annotate source + date. Bug fixes via manual PR ports
6. **Visitor analytics:** Cloudflare Web Analytics auto-provisioned at publish (cookieless, no PII)
7. **RBAC:** Platform roles (user/creator/admin) + per-app roles (owner/member/moderator/editor/viewer)
8. **Repo creation gated:** Only through admin UI or CLI. `members_can_create_repositories: false` on all orgs

## Recommended (not enforced)

- Top-level docs: README.md, CLAUDE.md, DEPLOY.md, SECURITY.md, DEVELOPING.md
- Same fonts, sizing, spacing, controls, dark mode (only accent color varies)
- Biome for linting/formatting
- Vitest for testing

## NOT standardized (per-store decisions)

- Internal monorepo structure (packages/ vs workers/ vs flat)
- Package naming (backend vs worker vs api)
- Storefront placement (separate repo vs inside monorepo)
- Template count and type
- Compliance check count and specifics
