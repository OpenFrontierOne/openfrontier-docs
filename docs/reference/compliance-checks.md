# Compliance Checks

## FAGS-specific checks

| Check | Severity | Rule |
|---|---|---|
| `no-cloud-inference` | Error | Free agents must not call cloud AI APIs (fetch to openai.com, anthropic.com, etc.) |
| `web-worker-inference` | Error | AI model inference must run in Web Worker, not main thread |
| `model-size-warning` | Warning | Total model size > 2GB triggers warning (may not work on all devices) |
| `privacy-no-exfil` | Error | No user data sent to external services (model CDN download is OK) |
| `webgpu-wasm-fallback` | Error | If using WebGPU, must have WASM fallback path |
| `model-cache-required` | Error | Downloaded models must use Cache Storage API |
| `agent-manifest` | Error | Valid `agent.json` manifest (name, model, task, description, estimatedSize) |
| `offline-capable` | Warning | Should register Service Worker for offline use after model download |
| `desktop-mobile-gate` | Warning | If model > 500MB, should detect mobile and show desktop recommendation |

## Inherited from FAS (kept as-is)

| Check | Severity | Rule |
|---|---|---|
| `license-mit` | Error | MIT LICENSE file required |
| `brand-fonts` | Error | Must use Fraunces + Manrope from CDN |
| `brand-tokens` | Error | Color tokens must match palette |
| `bundle-size` | Error | App bundle < 1MB gzipped (excluding models) |
| `no-tracking` | Error | No Google Analytics, Mixpanel, Segment, etc. |
| `viewport-support` | Error | Mobile viewport meta tag |
| `dark-mode` | Error | Must support `prefers-color-scheme: dark` |
| `html-meta` | Error | Title, description, OpenGraph tags |
| `pwa-meta` | Warning | theme-color, manifest link |
| `pwa-offline` | Warning | Service Worker for offline |

## Dropped from FAS (not applicable)

| Check | Why dropped |
|---|---|
| `no-scroll` | Agents may need scrolling (long results) |
| `no-env-production` | Not relevant for agent builds |
| `no-placeholders` | Different template system |
| `text-selectable` | Agents should always allow text selection (results) |

## Agent manifest format

Every agent must include `agent.json` in the repo root:

```json
{
  "name": "Transcriber",
  "description": "Transcribe audio to text using Whisper, entirely in your browser",
  "version": "1.0.0",
  "task": "speech-to-text",
  "category": "audio",
  "models": [
    {
      "repo": "onnx-community/whisper-small",
      "size": "244MB",
      "backend": ["webgpu", "wasm"],
      "task": "automatic-speech-recognition"
    }
  ],
  "estimatedDownload": "244MB",
  "input": ["audio/wav", "audio/mp3", "audio/m4a", "audio/webm"],
  "output": ["text/plain", "application/json"],
  "requiresWebGPU": false,
  "requiresOllama": false,
  "requiresWebContainers": false,
  "offlineCapable": true,
  "desktopOnly": false
}
```

## PAGS-specific checks (Pro tier)

| Check | Severity | Rule |
|---|---|---|
| `api-auth-required` | Error | Public API endpoints must require authentication |
| `rate-limit-required` | Error | API endpoints must have rate limiting |
| `usage-tracking` | Warning | Should call `agent.usage.track()` for payout eligibility |
| `d1-migrations` | Error | D1 schema must have numbered migrations |
| `r2-size-limits` | Warning | Per-user R2 storage should be bounded |
| `stripe-webhook-verify` | Error | Stripe webhooks must verify signature |
