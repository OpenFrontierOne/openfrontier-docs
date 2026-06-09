# Browser Runtime Capabilities

Comprehensive inventory of what runs client-side in 2026.

## AI Inference

### Models proven in-browser

| Model | Task | Size | Speed | Library |
|---|---|---|---|---|
| **Kokoro TTS** (82M) | Text-to-speech | ~160MB | Real-time | kokoro-js + ONNX RT |
| **Whisper tiny** | Speech-to-text | 40MB | ~1x realtime | Transformers.js |
| **Whisper small** | Speech-to-text (better) | 240MB | ~0.5x realtime | Transformers.js |
| **Moonshine tiny** (27M) | Speech-to-text | 50MB | Fast | ONNX RT |
| **Llama 3.2 1B** | Text generation | ~700MB | 60 tok/s (WebGPU) | Transformers.js v4 |
| **Llama 3.2 3B** | Text generation | ~1.8GB | 30 tok/s (WebGPU) | Transformers.js v4 |
| **Phi-3 mini** | Text generation | ~2GB | 20-40 tok/s | WebLLM |
| **Gemma 2B** | Text generation | ~1.5GB | 30-50 tok/s | WebLLM |
| **Stable Diffusion** | Image generation | ~2GB | 10-30s/image | WebGPU |
| **RMBG** | Background removal | ~50MB | <1s/image | Transformers.js |
| **SAM (ViT-B)** | Image segmentation | ~200MB | <2s/image | ONNX RT |
| **Florence-2** | Image captioning, OCR | ~500MB | <3s/image | Transformers.js |
| **NLLB-200** | Translation (200 langs) | ~400MB | <1s/sentence | Transformers.js |
| **Marian-MT** | Translation (specific pairs) | 100-200MB | Fast | Transformers.js |
| **BART-small** | Summarization | ~150MB | <2s/paragraph | Transformers.js |
| **T5-small** | Summarization/Q&A | ~120MB | <2s/paragraph | Transformers.js |
| **all-MiniLM-L6** | Embeddings/search | 23MB | <50ms/query | Transformers.js |
| **DistilBERT** | Sentiment/classification | 65MB | <100ms/text | Transformers.js |
| **YOLO** | Object detection | 20-50MB | <200ms/image | ONNX RT |
| **DPT** | Depth estimation | ~100MB | <1s/image | Transformers.js |
| **AST** | Audio classification | ~80MB | <500ms/clip | Transformers.js |

### Runtime backends

| Backend | When used | Performance | Browser support |
|---|---|---|---|
| **WebGPU** | GPU available | 3-10x faster than WASM | Chrome 113+, Edge, Firefox, Safari 18+ |
| **WASM (q8)** | CPU fallback | Usable for <1B models | All modern browsers |
| **WebNN** | Native AI accelerator | Fastest (where available) | Chrome 130+ (limited) |

### Model caching

Models download once from HuggingFace CDN and cache in **Cache Storage API**:

- Survives browser restarts
- Survives tab closes
- Per-origin (each agent caches independently, or shared via same origin)
- Typical cache life: indefinite until user clears browser data

**Shared model opportunity**: If multiple agents on `*.freeagentstore.online` need Whisper, the model can be cached once at the parent domain level and shared. This requires the host worker to serve a model-cache service worker.

## Node.js in Browser

### WebContainers (StackBlitz)

Full Node.js runtime compiled to WebAssembly. Runs inside the browser with:

- **Virtual file system** — read/write files
- **npm install** — install any package
- **TCP networking** — via ServiceWorker (local dev servers work)
- **Process spawning** — `child_process` works
- **Build tools** — webpack, vite, esbuild, tsc all run

**Requirements**: SharedArrayBuffer (needs COOP/COEP headers). Works in Chrome, Edge, Firefox. **Not Safari** (missing SharedArrayBuffer in cross-origin contexts).

**Use cases for agents**:

| Agent type | What WebContainers enables |
|---|---|
| Code linter | Run ESLint/Biome on pasted code |
| Code formatter | Run Prettier on pasted code |
| Test runner | Run vitest/jest on pasted tests |
| Build tool | Compile TypeScript, bundle with esbuild |
| Package analyzer | `npm audit`, dependency graph |
| Markdown processor | Run remark/unified pipelines |
| Data transformer | Run jq-like transforms via Node |
| Static site generator | Run Eleventy/Astro in browser |

### Nodebox (CodeSandbox)

Alternative to WebContainers. Different tradeoffs:

| | WebContainers | Nodebox |
|---|---|---|
| Safari support | No | Yes (beta) |
| SharedArrayBuffer | Required | Not required |
| npm install | Full | Full |
| Performance | Better | Good |
| TCP networking | Yes | Limited |
| Maturity | Production | Beta |

## Browser Automation (iframe-based)

### Same-origin automation

For content hosted on `*.freeagentstore.online`, agents have **full DOM access** via iframe:

```javascript
const iframe = document.createElement('iframe');
iframe.src = 'https://target.freeagentstore.online';
document.body.appendChild(iframe);

// Full DOM access (same origin)
const doc = iframe.contentDocument;
doc.querySelector('button').click();
doc.querySelector('input').value = 'hello';
const text = doc.querySelector('.result').textContent;
```

No Playwright needed. No Puppeteer needed. Just JavaScript.

### Cross-origin automation (with proxy)

For external content, options:

1. **CORS proxy** — host worker proxies external page, serves as same-origin
2. **postMessage bridge** — if target cooperates, communicate via messages
3. **Fetch + parse** — fetch HTML, parse in-browser via DOMParser (no JS execution)

### FAS Quality Reporter pattern

Already proven in production. The FAS Quality Reporter runs INSIDE an iframe and posts metrics to the parent via `postMessage`:

```javascript
// Inside iframe (agent being tested)
window.parent.postMessage({
  type: 'fas:quality',
  viewport: { width: 393, height: 852 },
  document: { scrollsX: false, scrollsY: false },
  clipping: []
}, '*');

// Parent dashboard
window.addEventListener('message', (e) => {
  if (e.data.type === 'fas:quality') {
    // Process metrics
  }
});
```

This pattern extends to agent-on-agent automation: one agent loads another in an iframe and orchestrates it.

### Puppeteer-in-browser

Puppeteer officially supports running from a browser context. The automation commands go to a **separate browser** with an open debugging port. This requires the user to have Chrome DevTools open, so it's a power-user feature, not a default path.

## Local LLM Connection (Ollama)

### How it works

1. User has Ollama installed locally (one-time setup)
2. Ollama runs at `http://localhost:11434`
3. User sets `OLLAMA_ORIGINS="*"` for CORS
4. Agent detects Ollama via `fetch('http://localhost:11434/api/tags')`
5. If available, agent uses local LLM for enhanced features

### API (OpenAI-compatible)

```javascript
// Check Ollama availability
const available = await fetch('http://localhost:11434/api/tags')
  .then(r => r.ok).catch(() => false);

// Chat completion
const response = await fetch('http://localhost:11434/v1/chat/completions', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama3.2',
    messages: [{ role: 'user', content: 'Summarize this text...' }]
  })
});
```

### What Ollama enables

| Without Ollama | With Ollama |
|---|---|
| Whisper transcribes audio | + LLM summarizes transcript |
| Background removal works | + LLM describes the removed object |
| OCR extracts text | + LLM answers questions about the document |
| Translation works | + LLM adapts tone/formality |
| Code linting finds issues | + LLM suggests fixes |

Ollama is a **power-user enhancement**, not a requirement. Every agent must work without it.

## Storage & Persistence

| API | Use case | Capacity | Persistence |
|---|---|---|---|
| **Cache Storage** | Model files | Unlimited* | Survives restarts |
| **IndexedDB** | Structured results, history | Unlimited* | Survives restarts |
| **OPFS** | Large file processing | Unlimited* | Survives restarts |
| **localStorage** | Small settings | 5-10MB | Survives restarts |
| **File System Access** | Read/write user's local files | User-granted | Session-based |
| **Clipboard API** | Copy results | N/A | N/A |

*"Unlimited" = browser-managed, typically multiple GB before the browser prompts the user.

## Offline capability

With Service Workers, agents can:

1. Cache the app shell (HTML/JS/CSS)
2. Cache the AI model
3. Run entirely offline after first load
4. Sync results when back online

This is better than any cloud-based agent tool.
