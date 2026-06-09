# Free vs Pro Split

## Pattern: Different products (FWS/PWS model)

Like FWS (single-page HTML) vs PWS (knowledge-graph CMS), the agent stores are fundamentally different architectures sharing the same brand and user identity:

- **FAGS** = browser-only AI tools (static apps on R2)
- **PAGS** = server-powered agent runtime (Workers + D1 + DO + Workers AI)

## Feature comparison

| Capability | FAGS (Free) | PAGS (Pro) |
|---|---|---|
| **AI inference** | User's GPU/CPU (WebGPU/WASM) | Workers AI (any model, any size) |
| **Model size limit** | ~2-3GB (browser memory) | Unlimited (server-side) |
| **Storage** | IndexedDB/Cache Storage (local) | D1 database + R2 files (persistent, shared) |
| **Offline** | Yes (Service Worker) | No (needs server) |
| **Privacy** | Data never leaves device | Data processed on Cloudflare edge |
| **Cron/scheduling** | No | Yes (scheduled Workers) |
| **API access** | No (app only) | Yes (agent-as-a-service) |
| **Custom domain** | `agent.freeagentstore.online` | `agent.yourdomain.com` |
| **Multi-user** | Single user (local state) | Multi-user (shared D1) |
| **Real-time** | Rooms (32 peers, capped) | Rooms (uncapped) |
| **File processing** | In-memory only | R2 storage per agent |
| **Source license** | MIT required | Proprietary OK |
| **Monetization** | None (free forever) | $9/mo subscription, creator payouts |
| **Compute cost** | $0 (user's hardware) | Included in subscription |

## Natural upgrade paths

| Free agent | Limitation hit | Pro upgrade |
|---|---|---|
| Transcriber (Whisper in browser) | Can't batch-process 100 files | Cron + R2 + Workers AI |
| Audiobook Maker (Kokoro TTS) | Can't process full books overnight | Background Workers + R2 storage |
| Background Remover (SAM) | Can't offer API for e-commerce | API gateway + per-request billing |
| Translator (NLLB) | Can't preserve document formatting | Server-side DOCX/PDF processing |
| Code Reviewer (in-browser LLM) | Can't integrate with GitHub PRs | GitHub webhook + Workers AI |
| Data Analyzer (CSV → insights) | Can't connect to live databases | D1 + cron + scheduled reports |
| Meeting Notes (Whisper + summary) | Can't auto-process calendar events | Calendar API + cron + D1 |

## Economics

### FAGS

| Cost | Amount | Who pays |
|---|---|---|
| R2 hosting | ~$0.015/GB stored, free egress | Platform (negligible) |
| Model CDN | HuggingFace serves models | HuggingFace (free tier) |
| Auth/API Worker | <$5/mo for CF Workers | Platform |
| Total per user | ~$0 | Nobody |

### PAGS

| Cost | Amount | Who pays |
|---|---|---|
| Workers AI | Per-token, included in quota | $9/mo subscriber |
| D1 | 5M reads/day free, then $0.001/M | $9/mo subscriber |
| R2 | $0.015/GB stored | $9/mo subscriber |
| Durable Objects | $0.15/M requests | $9/mo subscriber |
| Platform fee | 10% of subscription pool | Platform |
| Creator payout | 90% of usage-weighted pool | Creator |

Same Spotify-style model as PAS/PGS.

## SDK relationship

```
@freeagentstore/sdk
├── useModel()           ← model download/cache/inference
├── useWorkerInference() ← Web Worker orchestration
├── useOllama()          ← local Ollama detection + API
├── auth.*               ← GitHub OAuth (shared with FAS)
├── kv.*                 ← per-user KV storage
├── rooms.*              ← real-time (capped)
└── (inherits FAS SDK primitives)

@proagentstore/sdk (extends free)
├── ai.*                 ← Workers AI (server-side inference)
├── db.*                 ← per-agent D1 database
├── storage.*            ← R2 file storage
├── cron.*               ← scheduled execution
├── api.*                ← agent-as-a-service endpoints
├── subscription.*       ← Stripe checkout/portal
├── license.*            ← license key validation
├── usage.*              ← usage tracking for payouts
├── rooms.*              ← real-time (uncapped)
└── (inherits all free SDK primitives)
```
