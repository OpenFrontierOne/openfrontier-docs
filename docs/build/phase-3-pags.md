# Phase 3: PAGS (ProAgentStore)

## Goal

Launch the pro tier for agents that need server-side power. Same relationship as PAS to FAS.

## GitHub org

- **Org**: `ProAgentStore` (https://github.com/ProAgentStore)
- **Primary repo**: `ProAgentStore/platform`

## Directory structure

```
~/dev/stores/pags/
├── platform/                    # Core monorepo (vendored from FAGS + PAS)
│   ├── packages/
│   │   ├── sdk/                # @proagentstore/sdk (extends FAGS SDK)
│   │   ├── cli/                # @proagentstore/cli (pags binary)
│   │   ├── compliance/         # Pro compliance checks
│   │   ├── backend/            # CF Worker (api.proagentstore.online)
│   │   ├── data-worker/        # Per-agent Hono worker (D1 access)
│   │   └── agent-runtime/      # Durable Object agent runtime
│   ├── package.json
│   └── pnpm-workspace.yaml
│
├── proagentstore/              # Store site
├── host/                        # Host Worker
├── admin/                       # Admin Worker
├── templates/
│   ├── template-pro-agent/     # Server-side agent with D1 + R2 + Workers AI
│   ├── template-pro-api/       # Agent-as-a-service (API endpoints)
│   └── template-pro-cron/      # Scheduled agent (cron + D1)
│
├── agents/                      # Published pro agents
│
└── CLAUDE.md
```

## What PAGS adds over FAGS

### Server-side agent runtime

Each Pro agent gets its own Durable Object:

```typescript
// Agent runtime (Durable Object)
export class AgentRuntime implements DurableObject {
  private state: DurableObjectState;
  private ai: Ai; // Workers AI binding
  private db: D1Database; // Per-agent D1
  private storage: R2Bucket; // Per-agent R2

  async fetch(request: Request) {
    // Handle API requests to this agent
    // Long-running state, persistent memory
  }

  async alarm() {
    // Scheduled execution (cron)
  }
}
```

### Agent-as-a-service (API)

Pro agents can expose API endpoints:

```
POST https://my-agent.proagentstore.online/api/transcribe
  Body: { audio_url: "https://example.com/meeting.mp3" }
  Response: { transcript: "...", duration: 3600, cost: 0.02 }
```

### Workers AI integration

```typescript
import { initPro } from '@proagentstore/sdk';

const agent = initPro({ agentId: 'my-agent' });

// Server-side inference (any model, any size)
const result = await agent.ai.run('@cf/meta/llama-3.1-70b-instruct', {
  messages: [{ role: 'user', content: prompt }]
});

// Whisper (server-side, batch processing)
const transcript = await agent.ai.run('@cf/openai/whisper', {
  audio: audioBuffer
});
```

### Persistent storage

```typescript
// D1 (SQL database)
await agent.db.exec('INSERT INTO conversations (user_id, message) VALUES (?, ?)', [userId, msg]);

// R2 (file storage)
await agent.storage.put(`results/${jobId}/transcript.txt`, transcriptText);

// KV (fast cache)
await agent.kv.set(`cache:${hash}`, result, { ttl: 86400 });
```

### Cron scheduling

```toml
# wrangler.toml
[triggers]
crons = ["0 */6 * * *"]  # Every 6 hours
```

```typescript
async scheduled(event: ScheduledEvent) {
  // Fetch new emails, process queue, generate reports, etc.
}
```

## Monetization

Same model as PAS:

- $9/mo platform subscription (shared across all Pro stores)
- Creator payouts: usage-weighted split of subscription pool
- 10% platform fee
- Usage tracking: API calls, inference tokens, storage bytes

## Two agent categories (mirrors PAS)

### Personal agents (fork-per-user)

- Each user gets their own agent instance
- Custom training data, preferences, history
- Example: personal email assistant, custom code reviewer

### Service agents (shared deployment)

- One running instance, many users
- API-first design
- Example: transcription service, image processing API

## Definition of done (Phase 3)

- [ ] Platform monorepo builds
- [ ] SDK published (`@proagentstore/sdk`)
- [ ] Agent runtime (Durable Object) working
- [ ] Workers AI integration tested
- [ ] Per-agent D1 + R2 provisioned
- [ ] Cron scheduling working
- [ ] API gateway with auth + rate limiting
- [ ] Stripe Connect integration (from PAS)
- [ ] 3 Pro agents live
- [ ] Store site at proagentstore.online
