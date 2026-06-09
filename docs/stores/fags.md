# FAGS — FreeAgentStore

**URL:** https://freeagentstore.online
**Org:** https://github.com/FreeAgentStore (~52 repos)
**Stage:** Early beta
**Doppler:** `fags`

## Vision

A curated store of AI-powered tools that run free in the browser. Not a directory of configs. Real apps that do real work — transcription, TTS, background removal, code review — powered by client-side AI on the user's hardware.

Core thesis: Every useful AI tool people pay $20/mo for can be rebuilt to run entirely in the browser at zero marginal cost.

## Architecture

```
fags/
├── platform/          Monorepo (pnpm)
│   ├── packages/sdk       @freeagentstore/sdk
│   ├── packages/cli       @freeagentstore/cli (fags init/check/publish)
│   ├── packages/compliance 9 agent-specific checks
│   ├── packages/agents    48 agents (canonical source)
│   ├── workers/host       Host worker (store site, proxy, key vault)
│   └── workers/mcp        MCP server (11 tools)
├── freeagentstore/    Store HTML (static, auto-generated)
├── agents/            Legacy (1 agent, tts)
└── templates/         template-agent-tts
```

## Three types of items

| Type | Count | AI source | Cost to user |
|------|-------|-----------|-------------|
| Library | ~29 | Pure TS heuristics (LLM-evolved code) | Free forever |
| Model | ~14 | ONNX via Transformers.js (WebGPU/WASM) | Free forever |
| Agent | ~5+ | User's own API key via platform proxy | User pays provider |

## Key systems

- **Key vault:** AES-256-GCM encrypted user API keys for 6 providers (OpenAI, Anthropic, Google, Groq, OpenRouter, Together)
- **Proxy:** `/v1/proxy/{host}/{path}` injects keys server-side
- **Store generation:** registry.json -> build-index.js (cards) + build-details.js (detail pages)
- **OIDC publishing:** npm packages published via GitHub Actions trusted publisher

## Gaps

- **Worst test ratio (0.17)** — 354 source files, 60 tests
- SDK/CLI at 0.1.0 (never bumped)
- Many agents are thin wrappers with zero testing
- 9 compliance checks only (vs 20-42 in FAS/FGS/PAS)

## Future direction

- Per-agent smoke tests (import + core function check)
- Grow model catalog (target: 20+ models)
- Chrome Built-in AI integration (Gemini Nano, Prompt API)
- Agent composition (chain Library + Model + Agent)
- Evolved heuristic pipeline (user feedback -> re-evolution cycles)
