# PAGS — ProAgentStore

**URL:** https://proagentstore.online
**Org:** https://github.com/ProAgentStore (~11 repos)
**Stage:** Early beta
**Doppler:** `pags`

## Vision

Marketplace for server-powered AI agents. Creators build agent templates (identity, knowledge, guardrails, tools); clients subscribe and get isolated instances running on their own data. Each instance is a Durable Object with its own conversation history, memory, tasks, and knowledge base.

## Architecture

```
pags/platform/         Monorepo (pnpm)
├── packages/sdk       @proagentstore/sdk
├── packages/cli       @proagentstore/cli (pags init/check/publish)
├── packages/compliance 6 checks
├── workers/api        Hono API (auth, agents, chat, instances, keys, analytics)
├── workers/host       Marketing site + console (store HTML)
├── workers/mcp        MCP server (10 tools)
├── agents/            10 flagship agents
├── templates/         3 templates (worker, cron, api)
└── store/             Store site HTML (hand-coded)
```

## Marketplace model

- **Agent Template** (creator): identity, knowledge, guardrails, tools, model config
- **Agent Instance** (client): isolated DO copy with template KB + client's own docs
- Subscribe -> copies template state + KB into new DO -> client chats/adds docs independently
- Creator never sees client data, client never sees template config

## 10 flagship agents

site-monitor, lead-qualifier, content-pipeline, competitor-intel, support-escalator, data-analyst, meeting-notes, seo-auditor, invoice-parser, email-drafter

## Agent DO capabilities

- Conversation history (last 50 in context)
- Memory (5 types: identity, knowledge, preference, skill, context)
- Tasks (pending/in_progress/blocked/complete)
- Knowledge base (docs injected into system prompt, 30KB cap)
- Guardrails (topic restrictions, blocked terms, response style)
- 10 tools for tool-capable models
- WebSocket real-time chat (hibernation-safe)
- Auto-heal deprecated models

## Infrastructure

- D1: `pags` (9 migrations: agents, instances, keys, profiles, notifications, analytics, versions, slack)
- R2: `pags-agents`
- Workers AI: bound as env.AI
- Durable Objects: AgentDO (one per template + one per instance)

## Gaps

- Low test coverage (19 tests for 79 source files)
- SDK/CLI at 0.1.0
- Store HTML hand-coded (not auto-generated from registry like FAGS)
- Creator onboarding workflow missing
- Only 6 compliance checks

## Future direction

- Store auto-generation (registry.json -> HTML like FAGS)
- Creator onboarding wizard
- Individual agent repos (move out of monorepo, like FAGS)
- SDK bump past 0.1.0 based on user feedback
- Stripe billing integration (per-instance subscriptions)
- Agent marketplace analytics (usage, retention, churn)
