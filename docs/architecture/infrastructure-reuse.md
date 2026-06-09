# Infrastructure Reuse from Existing Stores

## What we reuse from FAS (1:1)

| Component | FAS | FAGS | Changes |
|---|---|---|---|
| Host Worker | `*.freeappstore.online` → R2 | `*.freeagentstore.online` → R2 | Domain swap only |
| API Worker | `api.freeappstore.online` | `api.freeagentstore.online` | Domain swap + agent-specific routes |
| Agent (VibeCode) | `agent.freeappstore.online` | `agent.freeagentstore.online` | New system prompt + agent templates |
| Admin Worker | `admin.freeappstore.online` | `admin.freeagentstore.online` | Domain swap only |
| Publisher Worker | `publish.freeappstore.online` | `publish.freeagentstore.online` | Domain swap + agent categories |
| Console | `console.freeappstore.online` | `console.freeagentstore.online` | Domain swap only |
| Store Site | `freeappstore.online` | `freeagentstore.online` | New design + agent-specific cards |
| D1 Database | `fas` | `fags` | Same schema |
| R2 Bucket | `fas-apps` | `fags-agents` | Same structure |
| GitHub Org | `freeappstore-online` | `FreeAgentStore` | New org |
| Doppler | project `fas` | project `fags` | New project |
| Auth | GitHub OAuth | GitHub OAuth | Same flow |
| CLI | `fas` binary | `fags` binary | Rename + agent commands |
| Compliance | 20 checks | 20 checks (some swapped) | Agent-specific checks |
| Design System | Manrope + Fraunces | Same fonts | New accent color |

## What we reuse from FGS

| Component | FGS | FAGS | Why |
|---|---|---|---|
| Auditor | Playwright quality checks | WebGPU/model quality checks | Same pattern, different checks |
| Leaderboard | Game scores | Agent ratings/usage stats | Same D1 pattern |
| Game templates (8) | Canvas, 3D, grid, etc. | Agent templates (TTS, STT, vision, etc.) | Same scaffold pattern |

## What we reuse from PAS → PAGS

| Component | PAS | PAGS | Changes |
|---|---|---|---|
| Stripe Connect | Creator payouts | Creator payouts | Same integration |
| Subscription | $9/mo platform | $9/mo platform (shared pool) | Same Stripe webhooks |
| License keys | JWT + revocation | JWT + revocation | Same pattern |
| Per-app D1 | Data Worker | Per-agent D1 | Same pattern |
| Per-app R2 | File storage | Agent file storage | Same pattern |
| Workers AI | Server-side inference | Server-side inference | Same binding |
| Agent Teams | PO/BA/Dev/QA agents | Agent orchestration | Same DO pattern |

## What's new (agent-specific)

| Component | Purpose |
|---|---|
| `@freeagentstore/sdk` | Model loading, Web Worker inference, Ollama detection |
| Agent templates | Pre-wired with specific models (Whisper, Kokoro, SAM, etc.) |
| Model cache service | Shared Cache Storage across agents on same origin |
| Agent compliance checks | Model size limits, no cloud calls on free, privacy audit |
| WebContainers integration | Optional Node.js runtime for code/build agents |
| Ollama bridge | Optional local LLM detection and API |
| Agent store cards | Show model, task type, download size (not app screenshots) |

## Vendor, don't depend

Per stores convention: FAGS copies what it needs from FAS, doesn't npm-depend on it. Each store stands alone at runtime. Bug fixes propagate via manual PR ports.
