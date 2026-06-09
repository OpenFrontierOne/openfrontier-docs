# FWS — FreeWebStore

**URL:** https://freewebstore.online
**Org:** https://github.com/freewebstore-online (~14 repos)
**Stage:** Production
**Doppler:** `fws`

## Vision

AI-built single-page websites for small businesses. User describes their business, AI picks from 108 niche templates, tailors HTML with real business info, deploys in <1 second. Free hosting forever on KV edge.

## Architecture

```
fws/
├── platform/          Monorepo (pnpm): 7 packages
│   ├── packages/agent           AI vibecoding agent (CF Worker + DOs, 25 iterations max)
│   ├── packages/api             Backend API
│   ├── packages/create          Create app (React chat UI + profile)
│   ├── packages/freewebstore    Store site (React)
│   ├── packages/host            Site serving worker (*.freewebstore.online -> KV)
│   ├── packages/mcp             MCP server (18 tools)
│   └── packages/template-generator  AI batch template generator
├── admin/             Designer template publish (GitHub App auth)
└── cli/               @freewebstore/cli (fws init/publish/login)
```

## How it works

1. User opens agent, describes business ("I run a yoga studio in Brooklyn")
2. Agent picks best niche template (108 available)
3. Tailors HTML with real business info (colors, sections, contact)
4. Runs compliance check, deploys to KV (<1 second)
5. Live at `<slug>.freewebstore.online`
6. User requests changes via chat, agent patches HTML instantly

## Tech

- Websites: single-page static HTML with inlined CSS (UnoCSS). No React, no npm, no build.
- Agent: CF Worker + Durable Objects, SSE streaming, 5 AI providers
- Hosting: Cloudflare Workers + KV (not R2 — HTML served from edge)
- Store: React + Tailwind on CF Pages
- 192 tests (1.87:1 ratio — strong)
- 7 CI workflows

## Gaps

- No extracted compliance checks (quality is in the agent's prompt, not a separate package)
- No CHANGELOG or version tracking
- Agent logic is monolithic (19 files in one package)

## Future direction

- Extract compliance checks from agent into a reusable package
- Template marketplace (designers publish templates via admin + CLI)
- Multi-page sites (stretch goal — may push toward PWS territory)
- Voice-first flow (describe business via voice, no typing)
