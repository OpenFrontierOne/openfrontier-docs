# SDK Surface

## @freeagentstore/sdk

### Core (inherited from FAS)

```typescript
import { initAgent } from '@freeagentstore/sdk';

const agent = initAgent({ agentId: 'my-agent' });

// Auth
agent.auth.signIn('github');
agent.auth.signOut();
agent.auth.onAuthChange(callback);

// Per-user storage
agent.kv.set(key, value);
agent.kv.get(key);
agent.kv.delete(key);
agent.kv.list();

// Real-time (capped: 32 peers, 64 rooms)
agent.rooms.create(roomId);
agent.rooms.join(roomId);
agent.rooms.send(message);
agent.rooms.onMessage(callback);

// API proxy (secret injection)
agent.proxy.register(url, method);
agent.proxy.fetch(url, options);

// Roles
agent.roles.check(userId, role);
agent.roles.grant(userId, role);
```

### Agent-specific (new)

```typescript
import { useModel, useWorkerInference, useOllama, useModelCache, useResultStore }
  from '@freeagentstore/sdk/hooks';

// Model loading + inference
function MyAgent() {
  const { model, loading, progress, ready, error } = useModel({
    repo: 'onnx-community/whisper-small',
    task: 'automatic-speech-recognition',
    device: 'webgpu',       // auto-fallback to 'wasm'
    dtype: 'q8',             // quantization
  });

  // Web Worker inference
  const { run, result, running } = useWorkerInference({
    worker: '/inference-worker.js',
    onProgress: (p) => setProgress(p),
  });

  // Ollama detection + API
  const { available, models, chat, generate } = useOllama({
    fallbackMessage: 'Install Ollama for enhanced features',
  });

  // Shared model cache
  const { cached, cacheSize, clearCache } = useModelCache();

  // Result persistence
  const { save, load, history, clear } = useResultStore('my-results');
}
```

### UI Components

```typescript
import {
  AgentShell,      // Full-viewport wrapper (like GameShell)
  AgentTopbar,     // Platform chrome (back, title, settings)
  ModelDownload,   // Download progress UI
  FileDropZone,    // Drag-and-drop file input
  ResultViewer,    // Display agent output (text, image, audio)
  OllamaStatus,   // Ollama connection indicator
} from '@freeagentstore/sdk/ui';
```

## @proagentstore/sdk

Extends free SDK with server-side capabilities:

```typescript
import { initPro } from '@proagentstore/sdk';

const agent = initPro({ agentId: 'my-agent' });

// Everything from free SDK, plus:

// Workers AI (server-side inference)
agent.ai.run(model, input);
agent.ai.embed(model, text);

// Per-agent D1 database
agent.db.query(sql, params);
agent.db.batch(statements);

// R2 file storage
agent.storage.put(key, data);
agent.storage.get(key);
agent.storage.list(prefix);
agent.storage.delete(key);

// Stripe subscription
agent.subscription.checkout();
agent.subscription.portal();
agent.subscription.status();

// Usage tracking (for creator payouts)
agent.usage.track(event, metadata);

// Cron (declared in wrangler.toml, handled in code)
// No SDK method — just export a scheduled() handler

// API gateway
// No SDK method — just export a fetch() handler with routes

// Rooms (uncapped)
agent.rooms.create(roomId); // no peer/room limits
```
