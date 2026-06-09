# FAS — FreeAppStore

**URL:** https://freeappstore.online
**Org:** https://github.com/freeappstore-online (~144 repos)
**Stage:** Production
**Doppler:** `fas`

## Vision

The flagship free app store. Zero-cost PWA hosting with a complete SDK for building connected apps. Users get auth, storage, real-time rooms, and API proxy out of the box. Creators publish via CLI or VibeCode AI builder.

## Architecture

```
fas/
├── platform/          Monorepo (pnpm): backend, cli, sdk, compliance, quality, e2e
├── freeappstore/      Static storefront (registry.json -> HTML)
├── admin/             Provisioning + moderation worker
├── agent/             VibeCode AI app builder (Claude/OpenAI/Gemini)
├── create/            VibeCode React frontend
├── console/           Creator portal (roles, secrets, webhooks, logs, deploys)
├── host/              R2 host worker (*.freeappstore.online)
├── mcp/               MCP server (6 tools)
├── publisher/         Self-service publish worker
├── freeappstore-brand/ Brand guidelines
├── freeappstore-ops/  Ops docs (LIFECYCLE.md, SKILLS.md)
├── apps/              ~44 individual app repos
└── templates/         template-standalone
```

## SDK (v0.14.11)

11 modules: auth, kv (1MB/user), collections (10k docs), counters (1000/app), rooms (32 peers), proxy, keys (8 providers, AES-256-GCM), roles (RBAC), email (100/day), log, webhooks (5/app, HMAC).

React hooks: useAuth, useVoiceInput. UI: 18 components (Shell, Avatar, Modal, Tabs, etc.)

## CLI (v0.4.23)

`fas login|init|check|publish|doctor|list|secret|proxy|quality|screencheck`

## Infrastructure

- D1: `fas` (users, apps, kv, routes, logs, webhooks, roles, invitations)
- R2: `fas-apps` (app hosting) + `fas-backups` (daily D1 backups)
- Cron: 15min uptime checks, daily log prune, daily backup, weekly compliance audit
- 11 CI workflows

## Compliance (20 checks)

Brand fonts/tokens, bundle size, dark mode, PWA (manifest, offline, maskable icon), no tracking, no scroll, no .env.production, MIT license, text selectable, viewport support, store link.

## Future direction

- SDK 1.0 release (API is stable, version should reflect that)
- API documentation site
- Plugin system for community extensions
- More templates (connected apps, AI-powered apps)
