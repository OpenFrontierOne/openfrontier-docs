# Vision & Strategy

## Mission

**Democratize hard knowledge through interactive simulation.**

Every complex subject — from quantum physics to blockchain mechanics to orbital dynamics — should be learnable by anyone with a browser. No textbooks, no expensive software, no gatekeepers. Open a page, interact, understand.

## The Open Frontier Thesis

The best way to learn how something works is to build it yourself. Not read about it. Not watch a video. Actually manipulate parameters, break things on purpose, see what happens.

Traditional education gates hard subjects behind:

- Expensive equipment ($100K+ labs)
- Expensive software (Cadence, STK, Qiskit on real quantum hardware)
- Years of prerequisites (calc 1-3 before touching physics)
- Gatekeeping institutions (enrollment required)

We remove all of that. Anyone with a browser can now build a blockchain, design a CPU, simulate quantum teleportation, train robots via neuroevolution, or design satellite constellations. Free. Forever.

## Current State (June 2026)

### What's live and working

| Category | Stores | Items | Status |
|----------|--------|-------|--------|
| Apps & Games | FAS, PAS, FGS, PGS | 224+ apps/games | Production (real SDK, auth, deploy) |
| Simulations | FRS, FQS, FBS, FCS, FSS, FCRS | 166 interactive sims | Live on CF Pages, auto-deploy |
| Design Tools | FDS | 43 tools | Live on CF Pages |
| Marketing Tools | FMS | 21 tools | Live on CF Pages |
| Pro Design/Marketing | PDS, PMS | Console + backend scaffolded | Scaffolded |
| Websites | FWS, PWS | Hundreds of sites | Production CMS engine |
| AI Tools | FAGS, PAGS | 51 browser AI tools | Live |
| **Total** | **18 stores** | **500+ items** | |

#### Simulation stores breakdown

| Store | Items | Focus |
|-------|-------|-------|
| FRS (FreeRobotStore) | 44 sims | Robotics, neuroevolution, kinematics |
| FQS (FreeQuantumStore) | 27 sims | Quantum computing, teleportation, circuits |
| FCRS (FreeCryptoStore) | 25 sims | Blockchain, DeFi, smart contracts |
| FCS (FreeChipStore) | 26 sims | CPU design, logic gates, pipelines |
| FSS (FreeSpaceStore) | 24 sims | Orbital mechanics, constellations |
| FBS (FreeBioStore) | 20 sims | Protein folding, CRISPR, ecology |

#### Creation tools breakdown

| Store | Items | Focus |
|-------|-------|-------|
| FDS (FreeDesignStore) | 43 tools | Brand, images, templates, UI/UX |
| FMS (FreeMarketingStore) | 21 tools | Campaigns, social, content, SEO |
| FADS (FreeAdStore) | Planned (53 tools) | Ad creation, preview, budget, audience, compliance |
| PDS (ProDesignStore) | Console + backend | AI design agent + marketplace |
| PMS (ProMarketingStore) | Console + backend | Autonomous campaigns + marketplace |
| PADS (ProAdStore) | Planned | AI ad agent, cross-platform automation, marketplace |

### What's real vs demo

**Production-grade:** FAS, FGS, PAS — real SDKs on npm, real CLIs, real backend Workers, real auth, real CI/CD, Stripe payments wired.

**Live content stores:** FRS, FQS, FBS, FCS, FSS, FCRS — 166 working simulations with auto-deploy, community infrastructure, SEO optimization. Static HTML on CF Pages. No backend, no auth, no user accounts. Contribution model = PRs to GitHub.

**Live tool stores:** FDS (43 design tools), FMS (21 marketing tools) — browser-based, no signup. Same architecture as simulation stores. Chrome AI integration in FDS (ai-queue.js system).

**Planned tool stores:** FADS (FreeAdStore, 53 tools planned) — paid advertising toolkit. Ad creation, cross-platform previews, budget calculators, audience builders, compliance checkers. Same browser-only architecture.

**Pro stores scaffolded:** PDS and PMS have console, agent, marketplace pages plus backend Workers with D1 schema and agent-teams packages. PADS (ProAdStore) planned as AI ad agent + marketplace. Not yet deployed.

**Infrastructure in place:** Doppler secrets, CF Pages deploy workflows, GitHub orgs (5/6 created), cross-store linking, sitemaps, OG tags, JSON-LD structured data.

**Not yet real:** Pro tiers for simulation stores, active communities (Discord servers exist but no organic members yet), npm-published SDKs, revenue ($0).

## Platform Architecture

```
Open Frontier (freeprostores.pages.dev)
├── Learn (simulation stores)
│   ├── FreeRobotStore (44 sims)
│   ├── FreeQuantumStore (27 sims)
│   ├── FreeCryptoStore (25 sims)
│   ├── FreeChipStore (26 sims)
│   ├── FreeSpaceStore (24 sims)
│   └── FreeBioStore (20 sims)
├── Build (creation stores)
│   ├── FreeAppStore / ProAppStore (apps)
│   ├── FreeGameStore / ProGameStore (games)
│   ├── FreeWebStore / ProWebStore (websites)
│   └── FreeAgentStore / ProAgentStore (AI tools)
├── Create (tool stores)
│   ├── FreeDesignStore (43 tools — logos, palettes, Tailwind, animations, UI)
│   ├── FreeMarketingStore (21 tools — campaigns, SEO, social, content)
│   ├── FreeAdStore (53 tools planned — ad creation, previews, budget, audience)
│   ├── ProDesignStore (AI design agent + designer marketplace)
│   ├── ProMarketingStore (autonomous campaigns + marketer marketplace)
│   └── ProAdStore (AI ad agent, cross-platform campaign automation)
├── Next
│   ├── FreeImageStore (standalone image generation + stock)
│   └── FreeDataStore (data visualization tools)
└── Grow (Pro tiers)
    └── $9/mo unlocks server-powered features per store
```

## Revenue Model

**Free tier:** Always free, always will be. No signup, no limits on usage. Open source (MIT).

**Pro tier ($9/mo per store):** Server-powered features that can't run in a browser — persistent state, real API integrations, larger compute, custom domains, team features.

| Store | Pro sells |
|-------|-----------|
| ProAppStore | AI, database, file storage, cron, custom domains |
| ProGameStore | Persistent worlds, uncapped multiplayer, cron events |
| ProWebStore | Full CMS, knowledge graph, AI agent, entities |
| ProDesignStore | AI design agent, designer marketplace, commercial assets |
| ProMarketingStore | Autonomous campaign execution, marketer marketplace |
| ProAdStore | AI ad agent, cross-platform campaign automation, media buyer marketplace |
| ProImageStore (planned) | High-res, commercial license, bulk API |

## Goals

### Q3 2026
- 200+ simulations across existing stores
- FreeDesignStore: SHIPPED (43 tools)
- FreeMarketingStore: SHIPPED (21 tools)
- ProDesignStore: SHIPPED (console + backend scaffolded)
- ProMarketingStore: SHIPPED (console + backend scaffolded)
- Launch FreeImageStore, FreeDataStore
- Custom domains for all simulation stores
- Google Search Console submission (all stores)
- First organic traffic

### Q4 2026
- First community contributors (external PRs)
- Pro tier for at least 1 new store
- Revenue > $0
- 1000+ daily unique visitors

### 2027
- "Khan Academy of interactive simulation" positioning
- Thousands of community-contributed simulations
- Sustainable revenue from Pro tiers
- New stores added by community demand

## Principles

1. **Free forever** — free tier never degrades
2. **No signup to use** — instant value, zero friction
3. **Single HTML files** — lowest possible contribution barrier
4. **Open source (MIT)** — fork anything, use anywhere
5. **Community owned** — anyone can contribute
6. **Composable** — simulations cross-reference and chain together
7. **One person can build a store** — the platform makes it possible
