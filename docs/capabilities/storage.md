# Storage & Persistence

## Available browser storage APIs

| API | Best for | Capacity | Persistence | Async |
|---|---|---|---|---|
| **Cache Storage** | AI models, large binary assets | Browser-managed (GBs) | Survives restarts | Yes |
| **IndexedDB** | Structured data, results, history | Browser-managed (GBs) | Survives restarts | Yes |
| **OPFS** | Large file processing, temp files | Browser-managed (GBs) | Survives restarts | Yes |
| **localStorage** | Small settings, preferences | 5-10MB | Survives restarts | No (sync) |
| **sessionStorage** | Temp state within tab | 5-10MB | Tab only | No (sync) |
| **File System Access API** | Read/write user's local files | Unlimited | User-granted | Yes |

## Cache Storage (for AI models)

Primary storage for downloaded AI models. This is how bepub caches Kokoro TTS.

```javascript
// Store a model
const cache = await caches.open('agent-models-v1');
await cache.put(
  'https://huggingface.co/onnx-community/whisper-small/resolve/main/model.onnx',
  modelResponse
);

// Retrieve cached model
const cached = await cache.match(modelUrl);
if (cached) {
  const buffer = await cached.arrayBuffer();
  // Load into ONNX runtime
}
```

### Shared model cache across agents

If multiple agents need the same model (e.g., Whisper), they can share a cache:

```javascript
// Model cache service (loaded by Host Worker's service worker)
const SHARED_CACHE = 'fags-shared-models';

async function getOrDownloadModel(modelUrl, onProgress) {
  const cache = await caches.open(SHARED_CACHE);
  const cached = await cache.match(modelUrl);
  if (cached) return cached;

  const response = await fetch(modelUrl);
  // Clone before caching (response can only be consumed once)
  cache.put(modelUrl, response.clone());
  return response;
}
```

## IndexedDB (for results and history)

Structured storage for agent outputs, user history, preferences.

```javascript
// Using idb-keyval (lightweight wrapper)
import { get, set, del, keys } from 'idb-keyval';

// Save transcription result
await set(`transcript:${audioHash}`, {
  text: transcriptText,
  timestamp: Date.now(),
  model: 'whisper-small',
  duration: audioDuration
});

// Retrieve history
const allKeys = await keys();
const transcriptKeys = allKeys.filter(k => k.startsWith('transcript:'));
```

## OPFS (Origin Private File System)

For agents that process large files (video, audio, datasets):

```javascript
const root = await navigator.storage.getDirectory();
const fileHandle = await root.getFileHandle('processing.wav', { create: true });
const writable = await fileHandle.createWritable();
await writable.write(audioData);
await writable.close();

// Read back
const file = await fileHandle.getFile();
const arrayBuffer = await file.arrayBuffer();
```

OPFS is faster than IndexedDB for large binary files and supports streaming writes.

## File System Access API

For agents that need to read/write files on the user's machine:

```javascript
// Open file picker
const [handle] = await window.showOpenFilePicker({
  types: [{ description: 'Audio', accept: { 'audio/*': ['.mp3', '.wav', '.m4a'] } }]
});
const file = await handle.getFile();

// Save result
const saveHandle = await window.showSaveFilePicker({
  suggestedName: 'transcript.txt',
  types: [{ description: 'Text', accept: { 'text/plain': ['.txt'] } }]
});
const writable = await saveHandle.createWritable();
await writable.write(transcriptText);
await writable.close();
```

## Offline support (Service Worker)

Agents can work completely offline after first load:

```javascript
// service-worker.js
const CACHE_NAME = 'agent-shell-v1';
const SHELL_FILES = ['/', '/index.html', '/main.js', '/style.css'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL_FILES)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

Combined with cached AI models in Cache Storage, an agent can:
1. Load instantly (cached shell)
2. Run inference (cached model)
3. Save results (IndexedDB)
4. All without any network connection

## Storage budget

Browsers manage storage quotas. Typical allowance:

| Browser | Default quota |
|---|---|
| Chrome | 60% of disk space (per origin) |
| Firefox | 50% of disk space (per origin) |
| Safari | 1GB default, prompts for more |

For a 200MB model + app shell + results cache, this is more than enough.

## SDK storage helpers

```typescript
// @freeagentstore/sdk
import { useModelCache, useResultStore, useOffline } from '@freeagentstore/sdk/hooks';

function MyAgent() {
  // Model management
  const { model, loading, progress, cached } = useModelCache('whisper-small');

  // Result persistence
  const { save, load, history } = useResultStore('transcriptions');

  // Offline status
  const { isOffline, canWorkOffline } = useOffline();

  // ...
}
```
