# Competitive Analysis

## Direct competitors (browser-based AI tools)

| Competitor | What it does | Our advantage |
|---|---|---|
| WebGPU.Studio | 12 AI tools in browser (STT, chat, bg removal) | No curation, no community, no ecosystem |
| Hugging Face Spaces | Open-source demos | Not curated for end-users; dev-oriented |
| NotebookLM | Text-to-podcast | Single tool, Google-locked, cloud-dependent |
| Poe | Multi-model bots | Cloud inference (not free), no browser-local |
| Replit Agent Market | Full agent apps | Charges for compute |

## Why existing agent marketplaces don't compete

| Their model | Why it doesn't work for us |
|---|---|
| Lists MCP servers | Nobody visits a URL; npm is the host |
| Lists Claude skills | GitHub/Anthropic's own marketplace wins |
| Lists prompt configs | It's just text; no value in hosting |
| Runs agents on cloud | Charges for compute; not free |

## Our positioning

**"Free AI tools that run in your browser"** — not an agent marketplace.

The word "agent" is in the domain for SEO and future positioning, but what users see is: a store of polished, single-purpose AI tools. Like an app store, but every app is AI-powered and free because it runs on your hardware.

## Differentiation matrix

| Dimension | GPT Store | Replit | WebGPU.Studio | **FreeAgentStore** |
|---|---|---|---|---|
| Runs in browser | No (cloud) | No (cloud) | Yes | **Yes** |
| Free inference | No | No | Yes | **Yes** |
| Curated quality | Weak | Yes | No | **Yes** |
| Revenue for creators | Planned | Yes | No | **Yes (Pro tier)** |
| Works offline | No | No | Partial | **Yes** |
| Privacy (data stays local) | No | No | Yes | **Yes** |
| App store UX | Yes | Yes | No | **Yes** |
| Server-side upgrade path | N/A | Built-in | No | **Yes (PAGS)** |

## NotebookLM comparison (key reference)

NotebookLM proved demand for "AI tool that does one specific thing well." People love:

- Upload docs → get podcast
- No config, no prompts, no complexity
- Just works

Our agents follow this pattern: **one input, one useful output, zero config.**

- Upload audio → get transcript (Whisper)
- Upload text → get audiobook (Kokoro TTS)
- Upload image → get clean cutout (SAM/RMBG)
- Upload PDF → get summary (BART/T5)
- Upload CSV → get analysis (in-browser LLM)
