# Phase 2: Templates + Agent Catalog

## Goal

Expand from 3 to 15+ agents. Build out all template types. Enable community contributions.

## New templates

### template-agent-translator
- NLLB-200 (200 languages)
- Language detection
- Side-by-side input/output
- Clipboard integration

### template-agent-summarizer
- BART-small or T5-small
- URL fetcher (via CORS proxy) or text paste
- Adjustable length
- Key points extraction

### template-agent-code
- WebContainers for tooling (ESLint, tsc, Prettier)
- Optional Ollama for LLM review
- Syntax highlighting (CodeMirror)
- Multi-file support

### template-agent-chat
- WebLLM (Llama 3.2 1B or Phi-3 mini)
- Conversation UI
- System prompt customization
- Optional Ollama backend

### template-agent-ocr
- Florence-2 or Tesseract.js
- Camera capture + image upload
- Structured output (JSON, text, table)
- PDF support via PDF.js

### template-agent-diffusion
- Stable Diffusion (WebGPU)
- Text prompt input
- Generation progress
- Gallery of results
- Download/share

### template-agent-embeddings
- all-MiniLM-L6 (23MB)
- Upload documents → build local search index
- Semantic search across documents
- IndexedDB persistence

### template-agent-data
- CSV/JSON parser
- Chart.js for visualization
- Small LLM for natural language queries
- Export results

## New agents (built from templates)

| Agent | Template | Unique features |
|---|---|---|
| **Translator** | agent-translator | Saved translations history |
| **Article Summarizer** | agent-summarizer | URL input, RSS feed support |
| **Code Linter** | agent-code | ESLint + Biome profiles |
| **Local ChatBot** | agent-chat | System prompt library |
| **Receipt Scanner** | agent-ocr | Expense categorization |
| **Image Creator** | agent-diffusion | Prompt suggestions |
| **Document Search** | agent-embeddings | Multi-document support |
| **CSV Analyzer** | agent-data | Auto-chart suggestions |
| **Sentiment Tracker** | Custom (DistilBERT) | Social media monitoring |
| **Flashcard Maker** | Custom (T5) | Spaced repetition |
| **Font Previewer** | Custom (no model) | Google Fonts integration |
| **Color Palette** | Custom (CLIP) | Image-to-palette |

## Community contribution flow

1. Developer runs `fags init my-agent --template agent-whisper`
2. Builds their agent locally
3. Runs `fags check` (compliance)
4. Runs `fags publish` (creates repo, provisions hosting)
5. Agent appears on store after admin approval

## Shared model cache (Phase 2 feature)

Service Worker at the store level that caches models across agents:

```
User opens Transcriber → downloads Whisper (240MB)
User opens Meeting Notes → Whisper already cached!
User opens Podcast Summarizer → Whisper already cached!
```

Reduces bandwidth and improves UX across the agent catalog.

## Definition of done (Phase 2)

- [ ] 8 templates available
- [ ] 15+ agents on store
- [ ] Shared model cache working
- [ ] Community publish flow documented
- [ ] VibeCode agent can build new agents from description
- [ ] Categories and search on store site
