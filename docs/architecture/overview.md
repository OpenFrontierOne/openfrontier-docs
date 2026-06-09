# Architecture Overview

## System diagram

```
User's Browser (GPU/CPU)
├── Agent App (React + Vite, hosted on R2)
│   ├── Web Worker (off-main-thread inference)
│   │   ├── WebGPU runtime (GPU-accelerated, 60 tok/s)
│   │   └── WASM fallback (CPU, 10-20 tok/s)
│   ├── Model Cache (Cache Storage API, survives sessions)
│   ├── Result Storage (IndexedDB)
│   └── Optional: WebContainers (Node.js in browser)
│       ├── npm packages
│       ├── Build tools
│       └── CLI tools
├── Optional: Local Ollama (localhost:11434)
│   └── Full LLM inference (user's own models)
└── Optional: Service Worker (offline support)

Cloud Infrastructure (same as FAS)
├── Host Worker (*.freeagentstore.online → R2)
├── API Worker (api.freeagentstore.online)
│   ├── Auth (GitHub OAuth)
│   ├── KV storage
│   ├── Rooms (real-time)
│   └── Registry
├── Agent Worker (agent.freeagentstore.online)
│   └── VibeCode — AI builds agents from description
├── Publisher Worker (publish.freeagentstore.online)
├── Admin Worker (admin.freeagentstore.online)
├── Store Site (freeagentstore.online)
│   └── Static HTML from registry.json
├── D1 Database (routes, users, sessions)
├── R2 Bucket (fags-agents)
└── GitHub Org (freeagentstore-online → renamed to FreeAgentStore)
```

## Key principle: browser is the runtime

Unlike every other agent marketplace that charges for compute, our agents run on the user's hardware. The store's infrastructure only handles:

1. **Hosting** — serve the app's HTML/JS/CSS from R2 (pennies)
2. **Auth** — GitHub OAuth for creators (existing pattern)
3. **Registry** — which agents are published (existing pattern)
4. **Discovery** — store site with search/categories (existing pattern)

All AI inference happens client-side. The model downloads once and caches in Cache Storage (survives browser restarts). Subsequent uses are instant, offline-capable.

## Four runtime layers (all in-browser)

### Layer 1: AI Inference (WebGPU/WASM)

Core capability. Every agent runs at least one AI model client-side.

| Technology | Role | Performance |
|---|---|---|
| Transformers.js v4 | HuggingFace model runner | 60 tok/s (3B model, WebGPU) |
| ONNX Runtime Web | Generic ONNX inference | Near-native via WebGPU |
| WebLLM | Chat/text generation | 30-70 tok/s |
| kokoro-js | Text-to-speech | Real-time audio (proven in bepub) |

### Layer 2: Node.js Runtime (WebContainers)

Optional. For agents that need npm packages, build tools, or server-like logic.

| Technology | Role | Limitation |
|---|---|---|
| WebContainers (StackBlitz) | Full Node.js in browser | Needs SharedArrayBuffer (no Safari) |
| Nodebox (CodeSandbox) | Node.js alternative | Works in Safari, beta |

Use cases: code linting agents, build tool agents, test runner agents, file processing agents.

### Layer 3: Browser Automation (iframe DOM)

Optional. For agents that manipulate web content.

Instead of Playwright/Puppeteer (which need a server), agents load target content in an iframe and manipulate it directly via DOM APIs:

- `iframe.contentDocument` for same-origin content
- `postMessage` bridge for cross-origin communication
- MutationObserver for watching changes
- Direct click/fill/extract via JavaScript

This is how FAS Quality Reporter already works — a lightweight client-side "automation" layer via iframe + postMessage.

### Layer 4: Local LLM (Ollama)

Optional. For power users who run Ollama locally.

- Ollama exposes REST API at `localhost:11434`
- OpenAI-compatible API format
- Agent detects Ollama availability, offers enhanced features
- No server cost — user's own hardware
- CORS: user sets `OLLAMA_ORIGINS="*"`

## Data flow for a typical agent

```
User opens transcriber.freeagentstore.online
  ↓
Host Worker serves React app from R2 (< 500KB)
  ↓
App checks Cache Storage for Whisper model
  ├── Cached? → Ready instantly
  └── Not cached? → Download from HuggingFace CDN (~240MB, one-time)
      └── Show progress bar, cache for next time
  ↓
User drops audio file
  ↓
App sends audio to Web Worker
  ↓
Web Worker runs Whisper inference (WebGPU → WASM fallback)
  ↓
Transcription returned to main thread
  ↓
User sees result, can copy/download
  ↓
Optional: save to IndexedDB for later
```

Zero server calls for inference. Zero cost per user. Privacy preserved.
