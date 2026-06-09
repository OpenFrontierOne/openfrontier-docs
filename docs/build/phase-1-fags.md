# Phase 1: FAGS MVP

## Goal

Ship the minimum viable FreeAgentStore: a working store with 3-5 browser-based AI agents, a publish flow, and the foundation for growth.

## GitHub org

- **Org**: `FreeAgentStore` (https://github.com/FreeAgentStore)
- **Primary repo**: `FreeAgentStore/platform` (monorepo)

## Directory structure

```
~/dev/stores/fags/
├── platform/                    # Core monorepo (vendored from FAS)
│   ├── packages/
│   │   ├── sdk/                # @freeagentstore/sdk
│   │   ├── cli/                # @freeagentstore/cli (fags binary)
│   │   ├── compliance/         # Agent-specific compliance checks
│   │   ├── backend/            # CF Worker (api.freeagentstore.online)
│   │   └── quality/            # Agent quality reporter
│   ├── package.json
│   └── pnpm-workspace.yaml
│
├── freeagentstore/             # Store site (static HTML)
│   ├── index.html
│   ├── registry.json
│   └── build.js
│
├── host/                        # Host Worker (*.freeagentstore.online → R2)
├── admin/                       # Admin Worker (provisioning)
├── publisher/                   # Publisher Worker (self-service)
├── agent/                       # VibeCode agent builder
├── create/                      # VibeCode UI (React)
├── console/                     # Creator console
│
├── templates/
│   ├── template-agent-tts/      # Kokoro TTS template
│   ├── template-agent-whisper/  # Whisper STT template
│   ├── template-agent-vision/   # Image processing template
│   ├── template-agent-llm/      # Text generation template
│   └── template-agent-tools/    # Utility tools template
│
├── agents/                      # Published agents (cloned repos)
│   ├── audiobook/              # First agent (port from bepub)
│   ├── transcriber/            # Whisper-based transcription
│   └── bg-remover/             # Background removal
│
└── CLAUDE.md
```

## Step-by-step build order

### Step 1: Platform monorepo scaffold

1. Create `FreeAgentStore/platform` repo on GitHub
2. Vendor FAS platform structure (copy, don't depend)
3. Rename all `freeappstore` → `freeagentstore`, `fas` → `fags`
4. Set up pnpm workspace

### Step 2: SDK (`@freeagentstore/sdk`)

Start from FAS SDK, add agent-specific primitives:

```typescript
// New exports (agent-specific)
export { useModel } from './model';          // Model download + cache + inference
export { useWorkerInference } from './worker'; // Web Worker orchestration
export { useOllama } from './ollama';          // Local LLM detection + API
export { useModelCache } from './cache';       // Shared model caching
export { useResultStore } from './results';    // IndexedDB result persistence

// Inherited from FAS SDK
export { Auth, Kv, Rooms, ApiProxy, Roles } from './core';
```

### Step 3: Templates

Each template is a complete, buildable agent app:

**template-agent-tts** (port from bepub):
- Kokoro TTS pre-wired
- Web Worker with WebGPU/WASM fallback
- Model download progress UI
- Audio player component
- Text input with chapter splitting

**template-agent-whisper**:
- Whisper small pre-wired
- Audio file drop zone
- Real-time transcription progress
- Timestamp display
- Copy/download transcript

**template-agent-vision**:
- RMBG/SAM pre-wired
- Image drop zone
- Canvas-based result display
- Download processed image

### Step 4: Infrastructure

1. **Doppler project**: `fags` (auto-sync to GitHub org)
2. **R2 bucket**: `fags-agents`
3. **D1 database**: `fags`
4. **Host Worker**: deploy to `*.freeagentstore.online`
5. **API Worker**: deploy to `api.freeagentstore.online`
6. **DNS**: Cloudflare zone for `freeagentstore.online`

### Step 5: Compliance checks

Agent-specific checks (replace/extend FAS checks):

| Check | Rule |
|---|---|
| `no-cloud-inference` | Free agents must not call cloud AI APIs (OpenAI, Anthropic, etc.) |
| `web-worker-inference` | AI inference must run in Web Worker (not main thread) |
| `model-size-warning` | Warn if total model size > 2GB |
| `privacy-audit` | No data sent to external services (except model CDN download) |
| `webgpu-fallback` | Must have WASM fallback if using WebGPU |
| `model-cache` | Must use Cache Storage for downloaded models |
| `manifest-valid` | Agent manifest (name, model, task type) must be valid |
| `offline-capable` | Should work offline after first model download |
| `brand-fonts` | Same Fraunces + Manrope requirement |
| `brand-tokens` | Same color token system |
| `bundle-size` | App bundle < 1MB (excluding models) |
| `license-mit` | MIT required on free tier |

### Step 6: First agents

1. **Audiobook Maker** — port bepub's Kokoro TTS into template
2. **Transcriber** — Whisper small, drop audio get text
3. **Background Remover** — RMBG, drop image get cutout

### Step 7: Store site

Static HTML, same pattern as freeappstore.online:
- Agent cards with: name, description, task type, model used, download size
- Category filters
- Search
- "Open" button (not "Install" — it's a web app)

### Step 8: Publisher + Admin

Vendor from FAS, swap domains. Same provision flow:
1. Create GitHub repo in `FreeAgentStore` org
2. Insert R2 hosting route
3. Create custom domain + DNS
4. Add to registry.json

## Definition of done (Phase 1)

- [ ] Platform monorepo builds and tests pass
- [ ] SDK published to npm (`@freeagentstore/sdk`)
- [ ] CLI published to npm (`@freeagentstore/cli`)
- [ ] 3 templates available (TTS, Whisper, Vision)
- [ ] 3 agents live on store
- [ ] Store site at freeagentstore.online
- [ ] Publisher portal working
- [ ] Admin worker provisioning
- [ ] Host worker serving agents from R2
- [ ] Compliance checks passing for all agents
- [ ] Doppler + GitHub org secrets configured
