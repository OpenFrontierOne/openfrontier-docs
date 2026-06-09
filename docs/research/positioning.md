# Positioning

## One-liner

**FreeAgentStore: AI tools that run free in your browser.**

## Longer pitch

Every AI tool people pay $20/mo for — transcription, text-to-speech, translation, background removal, OCR, summarization — can run entirely in your browser using open-source models. No cloud, no API keys, no subscription. Your data never leaves your device.

FreeAgentStore is a curated collection of these tools, each doing one thing well. Like an app store, but every app is AI-powered and genuinely free.

## Why "free" is real (not a loss leader)

| Cost center | FreeAppStore | FreeAgentStore |
|---|---|---|
| Hosting | R2 (~$0) | R2 (~$0) — same static bundles |
| Compute | None (static apps) | None (models run on user's GPU) |
| Model serving | N/A | None (models cached in browser) |
| Bandwidth | R2 free egress | Model download once, then cached |

The economics are identical to FAS. An agent that loads a 200MB model once and caches it via Cache Storage costs essentially nothing to serve.

## Target users

| User | What they want | Current alternative | Price |
|---|---|---|---|
| Student | Transcribe lectures | Otter.ai | $17/mo |
| Podcaster | Generate show notes | NotebookLM / Descript | $24/mo |
| Photographer | Remove backgrounds | Remove.bg | $9/mo |
| Writer | Text-to-speech review | ElevenLabs | $5/mo |
| Small business | Translate website | DeepL Pro | $9/mo |
| Developer | Local code review | Codex / Copilot | $10/mo |
| Researcher | Summarize papers | Semantic Scholar Pro | $20/mo |
| Content creator | Generate images | Midjourney | $10/mo |

Every one of these can be replaced by a browser-based tool using open-source models.

## Why the store matters (not just individual tools)

Individual browser AI demos exist (WebGPU.Studio, HF Spaces). But they lack:

1. **Curation** — quality bar, compliance checks, consistent UX
2. **Discoverability** — categorized, searchable, reviewed
3. **Consistency** — same design system, same auth, same data patterns
4. **Composability** — agents can share models (download Whisper once, use in 5 agents)
5. **Upgrade path** — free browser tool → Pro server-powered version
6. **Creator ecosystem** — publish, get attribution, earn on Pro tier
